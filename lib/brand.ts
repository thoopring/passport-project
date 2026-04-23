/**
 * Central brand constants. Every surface that shows the product name, the
 * tagline, the support email, or related strings should pull from here
 * instead of hardcoding them — so a future rename (or a tagline A/B test)
 * stays a single-file change.
 */

export const BRAND = {
  /** The wordmark as shown in logos and headlines. Lowercase intentional. */
  name: "gliddy",
  /** Title case for metadata and sentence-start usage. */
  nameTitle: "Gliddy",
  /** One-liner tagline used in metadata, footer chips, etc. */
  tagline: "Your next trip, sorted.",
  /** Product category/positioning used in metadata and about pages. */
  descriptor: "AI trip plans · $4",
  /** Longer description for metadata (OG, Twitter, meta description). */
  longDescription:
    "Tell us your destination and budget, and we'll design a trip for you. Day-by-day itinerary with hotel, airport transit, restaurants, and a route map. $4 per plan.",
  /** Support email — shown everywhere users might need help. */
  supportEmail: "hello@checkvisamap.com",
  /** The operational domain users visit — unchanged during rebrand. */
  domain: "checkvisamap.com",
  siteUrl: "https://checkvisamap.com",
  /** Display name used on payment receipts and plan emails. */
  senderDisplayName: "gliddy",
  senderFromEmail: "plans@checkvisamap.com",
  /** Copyright string footer. */
  copyright: "© 2026 gliddy",
} as const;
