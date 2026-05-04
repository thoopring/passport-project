/**
 * Per-day photo catalog for the plan view body.
 *
 * The destination hero (lib/destinations/heroes.ts) lands the FIRST
 * emotional anchor when the customer opens their plan. Per-day photos
 * land the ONGOING emotional anchor — each day card opens with a
 * destination-flavored shot before the functional content (mini-map,
 * stops list, trivia). Reading down the plan feels like flipping
 * through a magazine, not a flat list.
 *
 * Design decisions:
 *   - Photos are pulled from a per-destination POOL (5-8 candidates).
 *     pickDayPhotos shuffles deterministically by seed, so the same
 *     plan always shows the same photos in the same order — site and
 *     PDF stay in sync, regenerations are stable.
 *   - Same Unsplash CDN we use for heroes; same auto-format crop.
 *   - Cold-start destinations (not in catalog) return empty array;
 *     PlanView and PDF skip the photo block. Wrong photo > no photo.
 *
 * Coverage (v1 — top 4 most-likely destinations):
 *   Tokyo (Japan), Paris (France), Reykjavik (Iceland), Bali (Indonesia)
 *
 * Expansion path: copy a pool block and add new aliases. Each pool
 * needs 5+ entries so a 5-day plan has at least one distinct photo
 * per day. Photo style: signature scene, daylight, no tourist crowds,
 * horizontal aspect. Avoid duplicating the hero photo for the same
 * destination so the eye doesn't see the same image twice.
 */

import type { DestinationHero } from "./heroes";

interface DayPhotoPool {
  /** Aliases matched against destination string (any of 5 locales). */
  aliases: string[];
  /** Unsplash photo IDs. 5+ recommended so a long plan has variety. */
  photoIds: string[];
}

const POOLS: DayPhotoPool[] = [
  {
    aliases: ["tokyo", "도쿄", "東京", "东京"],
    photoIds: [
      "photo-1480796927426-f609979314bd", // Tokyo street with cherry blossoms
      "photo-1503899036084-c55cdd92da26", // Tokyo crossing
      "photo-1493976040374-85c8e12f0c0e", // Tokyo neon alley
      "photo-1554797589-7241bb691973", // Senso-ji at dusk
      "photo-1551353777-9bcc7ba2c0c2", // Tokyo Tower red
      "photo-1505765050516-f72dcac9c60a", // Shinjuku alley with lanterns
    ],
  },
  {
    aliases: ["paris", "파리", "パリ", "巴黎"],
    photoIds: [
      "photo-1502602898657-3e91760cbb34", // Eiffel Tower from afar
      "photo-1431274172761-fca41d930114", // Louvre pyramid
      "photo-1520939817895-060bdaf4fe1b", // Paris café terrace
      "photo-1431915525049-e493bb586d3e", // Notre Dame
      "photo-1522093007474-d86e9bf7ba6f", // Montmartre stairs
      "photo-1546412414-e1885259563a", // Seine bridge at golden hour
    ],
  },
  {
    aliases: ["reykjavik", "레이캬비크", "레이캬빅", "レイキャビク", "雷克雅未克"],
    photoIds: [
      // Pool trimmed to confirmed-working IDs only (2026-05-04 dogfood).
      // Two of the original 6 silently 404'd in production:
      //   - photo-1486021071694-e4a2f53dd1c5 (black sand beach)
      //   - photo-1539634936668-3f34dcfaa6cf (glacier lagoon)
      // A third (photo-1517299321609 geothermal pool) was never
      // verified, so removed defensively to avoid a third "X box"
      // report. Pool size is now 3 — exact-fit for a 3-day Reykjavik
      // plan, cycles for 4+ day plans (acceptable trade-off vs broken
      // images). Re-expand only after each new ID is verified loading
      // in production.
      "photo-1500380804539-4e1e8c1e7118", // Iceland waterfall
      "photo-1531366936337-7c912a4589a7", // Northern lights over fjord
      "photo-1520967824495-b529aeba26df", // Reykjavik Hallgrimskirkja
    ],
  },
  {
    aliases: ["bali", "발리", "バリ", "巴厘", "巴厘岛", "ubud", "denpasar"],
    photoIds: [
      "photo-1537996194471-e657df975ab4", // Bali rice terrace
      "photo-1518509562904-e7ef99cddc85", // Uluwatu cliff temple
      "photo-1577717903315-1691ae25ab3f", // Bali beach with parasols
      "photo-1519482816300-1490fdf2c2bd", // Bali jungle pool
      "photo-1604999333679-b86d54738315", // Tanah Lot temple
      "photo-1604567935069-65eaf4d33e4f", // Bali surfer at sunset
    ],
  },
];

/** Build a 900px Unsplash URL — narrower than the hero (1600) since
 *  per-day photos render smaller and we want page weight under control
 *  on mobile (multiple photos per plan add up). */
function dayPhotoUrl(id: string): string {
  return `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;
}

/* Same Mulberry32 + hashString approach as lib/trivia/index.ts so the
   per-day photo selection is stable across renders. Same plan UUID →
   same photo on Day 1, same on Day 2, etc., across site and PDF. */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h;
}

/**
 * Return one photo URL per day, deterministic by seed. Returns empty
 * array when the destination isn't in the catalog — caller should
 * skip the photo block entirely rather than fall back to a generic
 * stand-in.
 */
export function pickDayPhotos(
  destination: string,
  dayCount: number,
  seed: string,
): string[] {
  if (!destination || dayCount < 1) return [];
  const norm = destination.toLowerCase().trim();
  const pool = POOLS.find((p) => p.aliases.some((a) => a.toLowerCase() === norm));
  if (!pool) return [];

  const rng = mulberry32(hashString(seed));
  const ids = [...pool.photoIds];
  // Fisher-Yates with seeded RNG.
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  // Cycle the pool when there are more days than photos so a 7-day
  // plan with 6 candidate photos still gets a Day 7 photo (one repeat
  // is acceptable; ZERO photo on Day 7 would look broken).
  const result: string[] = [];
  for (let i = 0; i < dayCount; i++) {
    result.push(dayPhotoUrl(ids[i % ids.length]));
  }
  return result;
}

// Re-export the hero type so callers can import both from one path.
export type { DestinationHero };
