/**
 * Cold-start photo orchestrator.
 *
 * Called from the plan-generation pipeline AFTER the AI returns a plan.
 * Decides whether the destination needs photos sourced from Unsplash
 * (catalog miss), fetches them in one shot, caches the result, and
 * returns the resolved photo set. Returns null when nothing was fetched
 * (catalog already has full coverage, or Unsplash returned no results).
 *
 * Flow per call:
 *   1. Check destination_photo_cache by slug → cache hit returns immediately
 *   2. Determine what's needed: hero? days? both?
 *   3. Search Unsplash for the right number of photos
 *   4. Trigger download endpoint pings (fire-and-forget, per API guidelines)
 *   5. Persist result to cache
 *   6. Return the cached entry
 *
 * All failures are non-fatal — plan generation never blocks on Unsplash
 * availability or our cache writes. Plan still ships with whatever
 * photos the catalog provides (if any) and a clean text-only fallback
 * for the rest.
 */

import {
  searchPhotos,
  triggerDownload,
  type UnsplashPhoto,
} from "../unsplash";
import {
  getCachedPhotos,
  setCachedPhotos,
  type CachedDestinationPhotos,
  type CachedPhotoEntry,
} from "./photo-cache";
import { getDestinationHeroUrl } from "./heroes";
import { pickDayPhotos } from "./day-photos";

function toEntry(p: UnsplashPhoto): CachedPhotoEntry {
  return {
    url: p.url,
    photoId: p.photoId,
    photoLink: p.photoLink,
    photographerName: p.photographerName,
    photographerUsername: p.photographerUsername,
  };
}

/**
 * Returns true when the curated hero catalog has a photo for this
 * destination. Used to decide whether to skip the hero half of the
 * Unsplash search.
 */
function catalogHasHero(destination: string): boolean {
  return getDestinationHeroUrl(destination) !== null;
}

/**
 * Returns true when the curated day-photo catalog covers this
 * destination. The picker returns an empty array on catalog miss; any
 * non-empty result means there's day coverage.
 */
function catalogHasDayPhotos(destination: string): boolean {
  return pickDayPhotos(destination, 1, "probe").length > 0;
}

/**
 * Ensure photos exist for a destination, fetching from Unsplash if the
 * catalog doesn't cover it. Idempotent + cached — calling this twice for
 * the same destination only hits Unsplash on the first call.
 *
 * Returns the cached entry (existing or freshly written), or null if
 * nothing needed fetching (catalog covers everything).
 */
export async function ensureDestinationPhotos(
  destination: string,
  dayCount: number,
): Promise<CachedDestinationPhotos | null> {
  if (!destination) return null;

  // Cache hit: skip the API entirely.
  const cached = await getCachedPhotos(destination);
  if (cached) return cached;

  const needsHero = !catalogHasHero(destination);
  const needsDays = !catalogHasDayPhotos(destination) && dayCount > 0;

  if (!needsHero && !needsDays) {
    // Catalog already covers this destination — no API call needed.
    return null;
  }

  // One Unsplash search returns up to (1 + dayCount) photos. The first
  // is reserved for hero (if needed); the rest fill day slots. When
  // hero is in catalog but days aren't, we pull `dayCount` photos and
  // skip the hero slot.
  const wantedCount = (needsHero ? 1 : 0) + (needsDays ? dayCount : 0);
  if (wantedCount === 0) return null;

  // Use destination as the search query. This keeps the hero/day
  // photos thematically consistent (same city, same vibe). Per-day
  // theme-based queries (e.g. "Tokyo shibuya neon" for Day 1) would
  // be richer but require AI to suggest queries — deferred to v2 of
  // this pipeline.
  const results = await searchPhotos(destination, wantedCount);

  if (results.length === 0) {
    // Unsplash returned nothing or errored. Don't cache an empty row —
    // a future dogfood with the same destination might find results
    // (popular destinations sometimes have momentary indexing gaps).
    return null;
  }

  // Trigger download pings for the photos we'll display. Required by
  // Unsplash API guidelines whenever a photo is "used". Fire-and-forget;
  // we don't block plan generation on these.
  for (const photo of results) {
    triggerDownload(photo.downloadLocation).catch(() => {
      /* logged inside triggerDownload */
    });
  }

  // Slice the results into hero + days according to which slots we
  // actually need filled.
  let cursor = 0;
  const heroEntry =
    needsHero && results[cursor] ? toEntry(results[cursor++]) : null;
  const dayEntries: CachedPhotoEntry[] = [];
  if (needsDays) {
    while (cursor < results.length && dayEntries.length < dayCount) {
      dayEntries.push(toEntry(results[cursor++]));
    }
  }

  await setCachedPhotos({
    destination,
    hero: heroEntry,
    days: dayEntries,
  });

  // Re-read so callers get the canonical row shape (with fetched_at).
  return getCachedPhotos(destination);
}

/**
 * Convenience reader used by render-time code (PlanView, PDF route,
 * email). Just wraps getCachedPhotos so callers don't import from two
 * places. Never triggers a fetch — render-time is too late for that
 * (the customer is already looking at their plan).
 */
export async function readDestinationPhotos(
  destination: string,
): Promise<CachedDestinationPhotos | null> {
  return getCachedPhotos(destination);
}
