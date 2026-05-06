/**
 * destination_photo_cache table reader/writer.
 *
 * Cold-start photos are fetched from Unsplash once per destination and
 * cached here so subsequent plans for the same destination skip the
 * external API hit entirely. Read latency is one indexed-PK SELECT.
 *
 * The slug is normalized: lowercase, trimmed, non-alphanumeric →
 * hyphens, collapsed runs of hyphens. So "Lhasa, Tibet", "lhasa", and
 * "  LHASA " all map to the same cache row.
 */

import {
  getSupabaseAdmin,
  DESTINATION_PHOTO_CACHE_TABLE,
} from "../supabase";

export interface CachedPhotoEntry {
  url: string;
  photoId: string;
  photoLink: string;
  photographerName: string;
  photographerUsername: string;
}

export interface CachedDestinationPhotos {
  slug: string;
  destinationName: string;
  hero: CachedPhotoEntry | null;
  days: CachedPhotoEntry[];
  fetchedAt: string;
}

export function slugifyDestination(destination: string): string {
  return destination
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    // Keep CJK characters intact — they're already a unique ID. Replace
    // everything that's NOT a letter, digit, or CJK with a hyphen.
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    // Cap length so absurdly long destination strings don't blow the
    // primary key. 80 chars is plenty for any real city/country combo.
    .slice(0, 80);
}

/**
 * Look up a destination's cached photos by slug. Returns null on cache
 * miss (caller should trigger a fetch). Returns null on DB error too —
 * callers treat absence as "no cache" and fall back to text-only render.
 */
export async function getCachedPhotos(
  destination: string,
): Promise<CachedDestinationPhotos | null> {
  const slug = slugifyDestination(destination);
  if (!slug) return null;

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from(DESTINATION_PHOTO_CACHE_TABLE)
      .select("slug, destination_name, hero, days, fetched_at")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.warn(`[photo-cache] read error for ${slug}:`, error.message);
      return null;
    }
    if (!data) return null;

    return {
      slug: data.slug,
      destinationName: data.destination_name,
      hero: (data.hero as CachedPhotoEntry | null) ?? null,
      days: (data.days as CachedPhotoEntry[] | null) ?? [],
      fetchedAt: data.fetched_at,
    };
  } catch (err) {
    console.warn("[photo-cache] read threw:", err);
    return null;
  }
}

/**
 * Write a cache entry for a destination. UPSERT on slug — re-running for
 * the same destination overwrites the previous cache (e.g., when
 * manually re-fetching after a reported off-brand photo).
 */
export async function setCachedPhotos(args: {
  destination: string;
  hero: CachedPhotoEntry | null;
  days: CachedPhotoEntry[];
}): Promise<void> {
  const slug = slugifyDestination(args.destination);
  if (!slug) return;

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from(DESTINATION_PHOTO_CACHE_TABLE)
      .upsert(
        {
          slug,
          destination_name: args.destination,
          hero: args.hero,
          days: args.days,
          fetched_at: new Date().toISOString(),
        },
        { onConflict: "slug" },
      );
    if (error) {
      console.warn(`[photo-cache] write error for ${slug}:`, error.message);
    }
  } catch (err) {
    console.warn("[photo-cache] write threw:", err);
  }
}
