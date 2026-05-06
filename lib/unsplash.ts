/**
 * Unsplash API wrapper for cold-start destination photos.
 *
 * Used by lib/destinations/auto-fetch.ts when a paid plan's destination
 * isn't in the curated /public/destinations catalog. We search Unsplash
 * for fresh photos, hotlink them directly (per Unsplash Production API
 * guidelines), and cache the URLs + photographer attribution in
 * destination_photo_cache.
 *
 * Two endpoints used:
 *   1. GET /search/photos?query=...  — discover photos for a destination
 *   2. GET /photos/{id}/download     — required ping when a photo is
 *      "used" in our app (analytics, not the actual file)
 *
 * UTM params: Unsplash guidelines require profile + photo links to
 * include `?utm_source=gliddy&utm_medium=referral` so they can attribute
 * referral traffic. Image hotlink URLs do NOT need UTM params.
 *
 * Failure mode: every helper returns gracefully on missing API key,
 * network error, or non-200 response. Plan generation never blocks on
 * Unsplash availability.
 */

const UNSPLASH_API = "https://api.unsplash.com";
const UTM_PARAMS = "utm_source=gliddy&utm_medium=referral";

/** A search result reduced to just what we cache + render. */
export interface UnsplashPhoto {
  /** Photo UUID-ish ID (also the slug in CDN URL). */
  photoId: string;
  /** Base CDN URL with no size params. Append `?w=N&q=80&fit=crop` at
   *  render time to control delivered size. */
  url: string;
  /** Unsplash's photo page URL — landing page for the photo, with UTM. */
  photoLink: string;
  /** Display name shown in the attribution caption. */
  photographerName: string;
  /** Username — combined with utm to build photographer profile link. */
  photographerUsername: string;
  /** API URL we must hit to register a "use" of this photo. Server-only. */
  downloadLocation: string;
}

function authHeaders(): Record<string, string> | null {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return null;
  return {
    Authorization: `Client-ID ${key}`,
    "Accept-Version": "v1",
  };
}

function appendUtm(url: string): string {
  if (!url) return url;
  return url.includes("?") ? `${url}&${UTM_PARAMS}` : `${url}?${UTM_PARAMS}`;
}

/**
 * Search Unsplash for photos matching a query. Returns up to `count`
 * results, ordered by relevance. Empty array on missing key, network
 * error, no results, or any non-200 response. Logs warnings — never
 * throws so callers (plan generation) keep moving.
 */
export async function searchPhotos(
  query: string,
  count: number,
): Promise<UnsplashPhoto[]> {
  const headers = authHeaders();
  if (!headers) {
    console.warn("[unsplash] UNSPLASH_ACCESS_KEY not set, skipping search");
    return [];
  }
  if (!query.trim() || count < 1) return [];

  const url = `${UNSPLASH_API}/search/photos?query=${encodeURIComponent(
    query,
  )}&per_page=${Math.min(count, 30)}&orientation=landscape&content_filter=high`;

  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(10_000) });
    if (!res.ok) {
      console.warn(`[unsplash] search failed: HTTP ${res.status} for "${query}"`);
      return [];
    }
    const body = (await res.json()) as {
      results?: Array<{
        id: string;
        urls?: { raw?: string };
        links?: { html?: string; download_location?: string };
        user?: { name?: string; username?: string };
      }>;
    };
    const results = body.results ?? [];
    return results
      .map((r): UnsplashPhoto | null => {
        if (
          !r.id ||
          !r.urls?.raw ||
          !r.links?.html ||
          !r.links?.download_location ||
          !r.user?.name ||
          !r.user?.username
        ) {
          return null;
        }
        return {
          photoId: r.id,
          url: r.urls.raw,
          photoLink: appendUtm(r.links.html),
          photographerName: r.user.name,
          photographerUsername: r.user.username,
          downloadLocation: r.links.download_location,
        };
      })
      .filter((p): p is UnsplashPhoto => p !== null);
  } catch (err) {
    console.warn("[unsplash] search threw", err);
    return [];
  }
}

/**
 * Build the photographer profile URL with required UTM params. Unsplash
 * Production guidelines require the username profile to be linkable
 * directly from the attribution caption.
 */
export function photographerProfileUrl(username: string): string {
  return appendUtm(`https://unsplash.com/@${username}`);
}

/**
 * Build the Unsplash homepage link with UTM, for the "on Unsplash" half
 * of the attribution caption.
 */
export function unsplashHomeUrl(): string {
  return appendUtm("https://unsplash.com");
}

/**
 * Trigger Unsplash's download endpoint for a photo. Required by the API
 * guidelines whenever a photo is "used" (rendered, downloaded, etc.).
 * It's a tracking ping, not an actual file fetch — register-the-use.
 *
 * Fire-and-forget: logs failures but never throws. Caller shouldn't
 * await this on the critical path.
 */
export async function triggerDownload(downloadLocation: string): Promise<void> {
  const headers = authHeaders();
  if (!headers || !downloadLocation) return;
  try {
    const res = await fetch(downloadLocation, {
      headers,
      signal: AbortSignal.timeout(5_000),
    });
    if (!res.ok) {
      console.warn(`[unsplash] download trigger failed: HTTP ${res.status}`);
    }
  } catch (err) {
    console.warn("[unsplash] download trigger threw", err);
  }
}

/**
 * Build a renderable image URL from the cached `url` (which is the raw
 * CDN URL with no size params). Adds width + quality + crop params
 * appropriate for the surface (hero / day photo / email).
 */
export function renderableImageUrl(rawUrl: string, width: number): string {
  if (!rawUrl) return "";
  // Hotlink rule: leave the path alone, only add Unsplash's documented
  // image-processing query params.
  const sep = rawUrl.includes("?") ? "&" : "?";
  return `${rawUrl}${sep}w=${width}&q=80&fit=crop&auto=format`;
}
