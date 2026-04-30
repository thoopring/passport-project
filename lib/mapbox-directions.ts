/**
 * Mapbox Directions API helper.
 *
 * Strategy: compute walking polylines between consecutive plan stops ONCE
 * at plan-generation time, persist to plans.route_polylines (jsonb), then
 * read from DB on every page view. This keeps us inside the 100k/month
 * Mapbox Directions free tier even at meaningful traffic.
 *
 * Failure mode: any API call that errors returns null for that segment.
 * The PlanMap component falls back to a straight-line for null segments,
 * so a partial Directions failure degrades gracefully instead of blanking
 * the whole map.
 *
 * Cost path (when we outgrow free tier):
 *   - 100k requests/month free
 *   - $0.50 / 1k requests after
 *   - At ~30 requests/plan, free tier supports ~3,300 plans/month
 *   - Beyond that, ~$15 per 1,000 plans of polyline cost
 *   - Tracked in docs/POSTHOG-AND-SEO-EXPLAINER.md and STATUS.md
 */

const TOKEN = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const BASE = "https://api.mapbox.com/directions/v5/mapbox/walking";

export interface RouteSegment {
  /** Polyline as [lng, lat] coordinate tuples in path order. */
  coords: [number, number][];
}

/**
 * Walking polyline between two points. Returns null on any failure (no
 * token, network error, non-200, malformed JSON, no route found). The
 * caller is expected to fall back to a straight line for null segments.
 */
async function fetchSegment(
  from: [number, number],
  to: [number, number],
): Promise<RouteSegment | null> {
  if (!TOKEN) return null;
  const coordStr = `${from[0]},${from[1]};${to[0]},${to[1]}`;
  const url = `${BASE}/${coordStr}?geometries=geojson&overview=simplified&access_token=${TOKEN}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      routes?: { geometry?: { coordinates?: [number, number][] } }[];
    };
    const coords = data.routes?.[0]?.geometry?.coordinates;
    if (!coords?.length) return null;
    return { coords };
  } catch {
    return null;
  }
}

/**
 * For an ordered list of [lng, lat] coordinates, compute a Directions
 * segment between every consecutive pair. Returned array has length
 * coords.length - 1; each entry is either a RouteSegment or null.
 *
 * Concurrency: batches of CONCURRENCY parallel fetches. The Directions
 * API allows 300 req/min per token; one plan does ~30 calls so a 5-wide
 * burst is well under the per-token rate limit even with several plans
 * generating simultaneously. Going fully parallel would risk 429s when
 * launch traffic spikes.
 *
 * Originally sequential — that put 30-60s on the user-visible wait,
 * dominating the post-Claude pipeline. Batched parallel cuts that to
 * 6-12s while staying inside Mapbox's free-tier limits.
 */
export async function computeRoutePolylines(
  coords: [number, number][],
): Promise<(RouteSegment | null)[]> {
  if (coords.length < 2) return [];
  const CONCURRENCY = 5;
  const pairs: [number, [number, number], [number, number]][] = [];
  for (let i = 0; i < coords.length - 1; i++) {
    pairs.push([i, coords[i], coords[i + 1]]);
  }
  const segments: (RouteSegment | null)[] = new Array(pairs.length).fill(null);
  for (let start = 0; start < pairs.length; start += CONCURRENCY) {
    const batch = pairs.slice(start, start + CONCURRENCY);
    const results = await Promise.all(
      batch.map(([, from, to]) => fetchSegment(from, to)),
    );
    batch.forEach(([idx], j) => {
      segments[idx] = results[j];
    });
  }
  return segments;
}
