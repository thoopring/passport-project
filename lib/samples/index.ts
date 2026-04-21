import type { TripPlan } from "../../types/trip-plan";
import tokyo4dCouple from "./tokyo-4d-couple";
import paris3dFamily from "./paris-3d-family";
import bangkok4dSolo from "./bangkok-4d-solo";
import seoul3dFoodie from "./seoul-3d-foodie";

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

export const SAMPLE_PLANS: SampleMeta[] = [
  {
    slug: "tokyo-4d-couple",
    plan: tokyo4dCouple,
    tagline: "Four days for a couple — shrines, sushi, and a Kamakura sunset.",
    audience: "Couple · Midrange",
    heroColor: "#d62728",
    heroImage: UNSPLASH("photo-1540959733332-eab4deabeeaf"),
  },
  {
    slug: "paris-3d-family",
    plan: paris3dFamily,
    tagline: "Three days with two kids — the Eiffel Tower, the Louvre, and one full Disney day.",
    audience: "Family with kids · Midrange",
    heroColor: "#2563eb",
    heroImage: UNSPLASH("photo-1502602898657-3e91760cbb34"),
  },
  {
    slug: "bangkok-4d-solo",
    plan: bangkok4dSolo,
    tagline: "Four days solo on a budget — temples, street food, and an Ayutthaya day trip.",
    audience: "Solo · Budget",
    heroColor: "#f59e0b",
    heroImage: UNSPLASH("photo-1563492065599-3520f775eeed"),
  },
  {
    slug: "seoul-3d-foodie",
    plan: seoul3dFoodie,
    tagline: "Three days for a foodie — markets, BBQ, dry-aged hanwoo, and Han River chicken.",
    audience: "Solo · Foodie",
    heroColor: "#10b981",
    heroImage: UNSPLASH("photo-1517154421773-0529f29ea451"),
  },
];

/** Hero photo for the home banner (universal travel mood). */
export const HOME_HERO_IMAGE = UNSPLASH("photo-1488646953014-85cb44e25828");

export function getSample(slug: string): SampleMeta | undefined {
  return SAMPLE_PLANS.find((s) => s.slug === slug);
}

export function listSamples(): SampleMeta[] {
  return SAMPLE_PLANS;
}
