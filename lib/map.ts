import type { TripPlan, Stop, Day, Hotel } from "../types/trip-plan";

/**
 * Map helpers — Mapbox static and interactive map data shaping.
 *
 * Two outputs:
 *   1. Static image URLs for the PDF (Mapbox Static Images API)
 *   2. Flattened stop list with sequential numbering for the interactive map
 *
 * The PDF gets two flavors of static map:
 *   - Overview (whole plan, transit stops excluded so the city zoom isn't
 *     destroyed by a distant airport pin)
 *   - Per-day mini-map (just that day's stops + hotel anchor)
 *
 * The exclusion is necessary because most international destinations have
 * the arrival airport 30-70 km from the city center. A single auto-fit map
 * including both crushes the city stops into a single overlapping cluster.
 */

const DAY_COLORS = [
  "1a4d2e", "ff9f1c", "0ea5e9", "8b5cf6", "ef4444",
  "10b981", "f59e0b", "06b6d4", "ec4899", "84cc16",
];

export interface FlatStop {
  globalIndex: number;
  dayNumber: number;
  dayColor: string;
  stop: Stop;
}

export function flattenStops(plan: TripPlan): FlatStop[] {
  const flat: FlatStop[] = [];
  let i = 1;
  for (const day of plan.days) {
    const color = DAY_COLORS[(day.dayNumber - 1) % DAY_COLORS.length];
    for (const stop of day.stops) {
      flat.push({ globalIndex: i++, dayNumber: day.dayNumber, dayColor: color, stop });
    }
  }
  return flat;
}

/**
 * Mapbox pin labels are a single alphanumeric char. Map our 1-N numbering
 * to: digits 1-9, then letters a-z for 10-35, then label-less for 36+.
 * Returns the pin "marker" segment ready to drop into a static-images URL,
 * including the leading hyphen when there's a label.
 */
function pinSuffix(num: number): string {
  if (num <= 9) return `-${num}`;
  if (num <= 35) return `-${String.fromCharCode(96 + (num - 9))}`;
  return "";
}

/**
 * Build a Mapbox Static Images URL for an OVERVIEW of the whole plan.
 * Excludes type=transit stops (per system-prompt rule 12 these are airport
 * arrival/departure markers; including them collapses the city zoom).
 *
 * Capped at 99 stops because the static API has URL-length limits.
 */
export function buildOverviewMapUrl(plan: TripPlan, width = 800, height = 500): string {
  const token = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) return "";

  const flat = flattenStops(plan)
    .filter((f) => f.stop.type !== "transit")
    .slice(0, 99);
  if (!flat.length) return "";

  const overlays: string[] = [];

  // Polyline connecting the non-transit stops in their natural order.
  if (flat.length >= 2) {
    overlays.push(
      `path-3+1a4d2e-0.6(${encodePolylineCoords(flat.map((f) => f.stop.coords))})`,
    );
  }

  // Numbered pins, color-coded by day so the visual reads as a multi-day plan.
  for (const f of flat) {
    const num = f.globalIndex;
    overlays.push(
      `pin-s${pinSuffix(num)}+${f.dayColor}(${f.stop.coords[0]},${f.stop.coords[1]})`,
    );
  }

  const overlayStr = overlays.join(",");
  const style = "mapbox/streets-v12";
  // IMPORTANT: Do NOT add `.png` to the path — Mapbox's Static Images API
  // returns 404 for `/WxH@2x.png`. Format is negotiated via the response
  // Content-Type header. react-pdf detects image format from the response
  // bytes (PNG magic number), not the URL path, so the extension-free URL
  // is fine for it too.
  return `https://api.mapbox.com/styles/v1/${style}/static/${overlayStr}/auto/${width}x${height}@2x?access_token=${token}`;
}

/**
 * Build a Mapbox Static Images URL for a SINGLE day's stops, plus the hotel
 * as an anchor pin in a neutral color. This is the per-day mini-map shown
 * at the top of each day's PDF page.
 *
 * Auto-fit naturally produces a tight zoom because all stops cluster in the
 * day's anchor neighborhood (system-prompt rule 9). The hotel pin extends
 * the bounds slightly so the user can orient "I leave from here".
 *
 * Numbering restarts at 1 per day, matching `Stop.order` in the printed list.
 */
export function buildDayMapUrl(
  day: Day,
  hotel: Hotel,
  width = 700,
  height = 240,
): string {
  const token = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) return "";

  const stops = day.stops.filter((s) => s.type !== "transit");
  if (!stops.length) return "";

  const dayColor = DAY_COLORS[(day.dayNumber - 1) % DAY_COLORS.length];
  const overlays: string[] = [];

  // Polyline through the day's non-transit stops.
  if (stops.length >= 2) {
    overlays.push(
      `path-3+${dayColor}-0.7(${encodePolylineCoords(stops.map((s) => s.coords))})`,
    );
  }

  // Hotel pin — small, neutral gray, label "h" so it's distinguishable from
  // numbered stops at a glance. Must come BEFORE stops in the overlay list
  // so its z-order sits below them when stops are nearby.
  overlays.push(`pin-s-h+666666(${hotel.coords[0]},${hotel.coords[1]})`);

  // Day stop pins (1, 2, 3 within this day; falls back to letters past 9).
  stops.forEach((s, idx) => {
    const num = idx + 1;
    overlays.push(
      `pin-s${pinSuffix(num)}+${dayColor}(${s.coords[0]},${s.coords[1]})`,
    );
  });

  const overlayStr = overlays.join(",");
  const style = "mapbox/streets-v12";
  return `https://api.mapbox.com/styles/v1/${style}/static/${overlayStr}/auto/${width}x${height}@2x?access_token=${token}`;
}

/**
 * Backward-compatible alias. Pre-existing callers (PDF route) used a single
 * static map URL — now they get the overview variant by default. New callers
 * should reference buildOverviewMapUrl explicitly.
 */
export const buildStaticMapUrl = buildOverviewMapUrl;

/**
 * Polyline encoding (Google polyline format) — Mapbox supports both raw
 * coords and Google polyline format. Raw coords blow up the URL fast, so
 * we use the compact polyline format.
 */
function encodePolylineCoords(coords: [number, number][]): string {
  const points = coords.map(([lng, lat]) => [lat, lng]); // lat, lng for polyline
  let lat = 0;
  let lng = 0;
  let result = "";
  for (const [pLat, pLng] of points) {
    const dLat = Math.round(pLat * 1e5) - lat;
    const dLng = Math.round(pLng * 1e5) - lng;
    lat += dLat;
    lng += dLng;
    result += encodeNum(dLat) + encodeNum(dLng);
  }
  return encodeURIComponent(result);
}

function encodeNum(n: number): string {
  let v = n < 0 ? ~(n << 1) : n << 1;
  let out = "";
  while (v >= 0x20) {
    out += String.fromCharCode((0x20 | (v & 0x1f)) + 63);
    v >>= 5;
  }
  out += String.fromCharCode(v + 63);
  return out;
}

/**
 * Compute the bounding box of all stops, used to fit the interactive map.
 */
export function computeBounds(plan: TripPlan): [[number, number], [number, number]] | null {
  const flat = flattenStops(plan);
  if (!flat.length) return null;
  let minLng = Infinity,
    minLat = Infinity,
    maxLng = -Infinity,
    maxLat = -Infinity;
  for (const f of flat) {
    const [lng, lat] = f.stop.coords;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}
