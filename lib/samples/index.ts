import type { TripPlan } from "../../types/trip-plan";
import type { Locale } from "../../i18n/locales";
import tokyo4dCouple from "./tokyo-4d-couple";
import paris3dFamily from "./paris-3d-family";
import bangkok4dSolo from "./bangkok-4d-solo";
import seoul3dFoodie from "./seoul-3d-foodie";
import osaka3dFoodie from "./osaka-3d-foodie";
import nyc4dCouple from "./nyc-4d-couple";
import bali5dCouple from "./bali-5d-couple";
import taipei3dSolo from "./taipei-3d-solo";
import hanoi4dSolo from "./hanoi-4d-solo";
import london4dCouple from "./london-4d-couple";
import reykjavik4dCouple from "./reykjavik-4d-couple";
import cusco5dCouple from "./cusco-5d-couple";
import dubai4dCouple from "./dubai-4d-couple";
import { applyTranslation, loadLocaleTranslations } from "./i18n";

/**
 * Sample plan registry. Each entry is a hand-curated TripPlan that doubles
 * as marketing content (/samples gallery) and as the quality bar the AI
 * generator should match. Add new samples here.
 */

export interface SampleMeta {
  slug: string;
  plan: TripPlan;
  /** One-line teaser for the gallery card. */
  tagline: string;
  /** Traveler profile for the gallery card. */
  audience: string;
  /** Hex hero color for the gallery card accent (legacy, retained for data shape). */
  heroColor: string;
  /** Unsplash hero photo URL for cards + detail page banner. */
  heroImage: string;
}

// Unsplash photo URLs (stable IDs; rendered via next/image with remotePatterns).
const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

// Photo selection rule: prefer vibrant, daylight, recognizable landmark or
// signature scene. Avoid moody/grey/empty photos. Each Unsplash ID below
// is hand-picked for color + travel-aspiration vibe.
export const SAMPLE_PLANS: SampleMeta[] = [
  {
    slug: "tokyo-4d-couple",
    plan: tokyo4dCouple,
    tagline: "Four days for a couple — shrines, sushi, and a Kamakura sunset.",
    audience: "Couple · Midrange",
    heroColor: "#FF6B6B",
    // Shibuya scramble at twilight — neon, motion, the iconic Tokyo image
    heroImage: UNSPLASH("photo-1542051841857-5f90071e7989"),
  },
  {
    slug: "osaka-3d-foodie",
    plan: osaka3dFoodie,
    tagline: "Three days in Japan's kitchen — takoyaki, okonomiyaki, and one Kyoto day.",
    audience: "Solo · Foodie · Midrange",
    heroColor: "#F4A261",
    // Tsutenkaku Tower at twilight, framed by traditional Shinsekai shop signs
    // (replaces photo-1554189097 which Unsplash silently swapped to a pink
    // sunset photo unrelated to Osaka — verified visually on 2026-04-29)
    heroImage: UNSPLASH("photo-1590559899731-a382839e5549"),
  },
  {
    slug: "seoul-3d-foodie",
    plan: seoul3dFoodie,
    tagline: "Three days for a foodie — markets, BBQ, dry-aged hanwoo, and Han River chicken.",
    audience: "Solo · Foodie",
    heroColor: "#A8DADC",
    // Seoul cityscape with N Seoul Tower at twilight (replaces broken
    // photo-1538485399081 which Unsplash returns 404 on as of 2026-04-29)
    heroImage: UNSPLASH("photo-1517154421773-0529f29ea451"),
  },
  {
    slug: "taipei-3d-solo",
    plan: taipei3dSolo,
    tagline: "Three days solo — night markets, Taipei 101, and a Jiufen lantern day.",
    audience: "Solo · Budget",
    heroColor: "#4DA8DA",
    // Jiufen tea house alley with red lanterns at dusk
    heroImage: UNSPLASH("photo-1470004914212-05527e49370b"),
  },
  {
    slug: "bangkok-4d-solo",
    plan: bangkok4dSolo,
    tagline: "Four days solo on a budget — temples, street food, and an Ayutthaya day trip.",
    audience: "Solo · Budget",
    heroColor: "#FFB627",
    // Wat Arun temple at golden hour against the river
    heroImage: UNSPLASH("photo-1508009603885-50cf7c579365"),
  },
  {
    slug: "hanoi-4d-solo",
    plan: hanoi4dSolo,
    tagline: "Four days solo — Old Quarter pho crawl and a Halong Bay day out.",
    audience: "Solo · Budget",
    heroColor: "#52B788",
    // Halong Bay limestone karsts in emerald water
    heroImage: UNSPLASH("photo-1528127269322-539801943592"),
  },
  {
    slug: "bali-5d-couple",
    plan: bali5dCouple,
    tagline: "Five days for a couple — Ubud rice terraces, Seminyak beach, Uluwatu sunset.",
    audience: "Couple · Relaxation · Midrange",
    heroColor: "#52B788",
    // Tegallalang rice terraces under bright sunlight
    heroImage: UNSPLASH("photo-1573790387438-4da905039392"),
  },
  {
    slug: "paris-3d-family",
    plan: paris3dFamily,
    tagline: "Three days with two kids — the Eiffel Tower, the Louvre, and one full Disney day.",
    audience: "Family with kids · Midrange",
    heroColor: "#FF6B6B",
    // Eiffel Tower from Trocadéro at golden hour with cotton-candy sky
    heroImage: UNSPLASH("photo-1499856871958-5b9627545d1a"),
  },
  {
    slug: "london-4d-couple",
    plan: london4dCouple,
    tagline: "Four days for a couple — British Museum, Borough Market, and an Oxford day.",
    audience: "Couple · Midrange",
    heroColor: "#4DA8DA",
    // Tower Bridge with double-decker red bus crossing
    heroImage: UNSPLASH("photo-1513635269975-59663e0ac1ad"),
  },
  {
    slug: "nyc-4d-couple",
    plan: nyc4dCouple,
    tagline: "Four days for a couple — Midtown icons, Brooklyn Bridge, Broadway, and The Met.",
    audience: "Couple · Midrange",
    heroColor: "#FFB627",
    // Brooklyn Bridge with Manhattan skyline at sunset
    heroImage: UNSPLASH("photo-1496442226666-8d4d0e62e6e9"),
  },
  {
    slug: "reykjavik-4d-couple",
    plan: reykjavik4dCouple,
    tagline: "Four days for a couple — Golden Circle, South Coast waterfalls, Blue Lagoon.",
    audience: "Couple · Midrange",
    heroColor: "#A8DADC",
    // Fjaðrárgljúfur canyon — mossy basalt walls + glacial river, iconic Iceland
    heroImage: UNSPLASH("photo-1531168556467-80aace0d0144"),
  },
  {
    slug: "cusco-5d-couple",
    plan: cusco5dCouple,
    tagline: "Five days for a couple — acclimatize in Cusco, Sacred Valley, then Machu Picchu.",
    audience: "Couple · Midrange",
    heroColor: "#52B788",
    // Machu Picchu emerging from morning fog over the Andes
    heroImage: UNSPLASH("photo-1526392060635-9d6019884377"),
  },
  {
    slug: "dubai-4d-couple",
    plan: dubai4dCouple,
    tagline: "Four days for a couple — Burj Khalifa, Old Dubai souks, desert safari, the Palm.",
    audience: "Couple · Luxe-leaning",
    heroColor: "#F4A261",
    // Burj Khalifa skyline at sunset, Sheikh Zayed Road interchanges below
    heroImage: UNSPLASH("photo-1512453979798-5ea266f8880c"),
  },
];

/** Hero photos for the home rotating banner. The cross-fading quatrefoil is
 *  THE site's signature, so the photos must be sharp, dynamic, and
 *  exciting — never blurry, gloomy, or static. Cross-fade every ~3s with
 *  a Ken Burns zoom (1.0 → 1.12).
 *
 *  This set was hand-picked by the founder on 2026-04-29 — leaning toward
 *  TRAVELER LIFESTYLE moments rather than postcard destinations (boats +
 *  Times Square + Kyoto kimono + Trevi selfie + travel-planning flat-lay).
 *  Stronger marketing hook for an AI travel-planner than pure landmarks.
 *
 *  Source URLs use w=2400 so retina 520×520 quatrefoils get 2x crisp
 *  detail. Each URL below was visually verified on 2026-04-29.
 *
 *  Slots 1 and 5 are Unsplash+ premium photos — covered by the founder's
 *  active Unsplash+ subscription (verified 2026-04-29).
 */
const HERO_W = 2400;

export const HOME_HERO_IMAGES = [
  // 1) Long-tail boats lined on a Thai beach, aerial view, emerald water (Unsplash+)
  `https://plus.unsplash.com/premium_photo-1730035378488-4ce8edd1761b?w=${HERO_W}&q=85&auto=format&fit=crop`,
  // 2) Times Square NYC at night — neon billboards, pure urban motion
  `https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=${HERO_W}&q=85&auto=format&fit=crop`,
  // 3) Traveler with vintage camera — lifestyle, anticipation
  `https://images.unsplash.com/photo-1776345021290-cdf1099204ca?w=${HERO_W}&q=85&auto=format&fit=crop`,
  // 4) Kyoto kimono pair with paper umbrellas in a stone alley — Japan iconic
  `https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=${HERO_W}&q=85&auto=format&fit=crop`,
  // 5) Selfie at Trevi Fountain, Rome — joyful summer traveler (Unsplash+)
  `https://plus.unsplash.com/premium_photo-1683141023289-49fdc6fa7506?w=${HERO_W}&q=85&auto=format&fit=crop`,
  // 6) Family silhouettes against a sunset gradient — emotional travel moment
  //    (replaces map+glasses flat-lay; founder pick 2026-04-29)
  `https://images.unsplash.com/photo-1623501387383-1e19e63f17b9?w=${HERO_W}&q=85&auto=format&fit=crop`,
];

/** Legacy single-image export retained so existing samples links don't break. */
export const HOME_HERO_IMAGE = HOME_HERO_IMAGES[0];

export function getSample(slug: string): SampleMeta | undefined {
  return SAMPLE_PLANS.find((s) => s.slug === slug);
}

export function listSamples(): SampleMeta[] {
  return SAMPLE_PLANS;
}

/**
 * Locale-aware sample lookup. Returns the SampleMeta with `plan` swapped
 * for the locale-translated variant where one exists; falls back to the
 * canonical English plan otherwise. Use this in pages instead of
 * getSample() when rendering plan content.
 */
export async function getSampleLocalized(
  slug: string,
  locale: Locale,
): Promise<SampleMeta | undefined> {
  const meta = getSample(slug);
  if (!meta) return undefined;
  if (locale === "en") return meta;
  const translations = await loadLocaleTranslations(locale);
  const t = translations[slug];
  if (!t) return meta;
  return {
    ...meta,
    plan: applyTranslation(meta.plan, t),
    ...(t.tagline !== undefined && { tagline: t.tagline }),
    ...(t.audience !== undefined && { audience: t.audience }),
  };
}

/**
 * Locale-aware bulk lookup. Returns the gallery list with each entry's
 * tagline/audience/destination/country swapped for translated variants
 * where they exist. Use on the home + /samples gallery pages.
 */
export async function listSamplesLocalized(locale: Locale): Promise<SampleMeta[]> {
  if (locale === "en") return SAMPLE_PLANS;
  const translations = await loadLocaleTranslations(locale);
  return SAMPLE_PLANS.map((meta) => {
    const t = translations[meta.slug];
    if (!t) return meta;
    return {
      ...meta,
      plan: applyTranslation(meta.plan, t),
      ...(t.tagline !== undefined && { tagline: t.tagline }),
      ...(t.audience !== undefined && { audience: t.audience }),
    };
  });
}
