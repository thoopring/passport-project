/**
 * Affiliate URL builders. Pure functions returning tracked URLs for each
 * partner. Reuse the IDs from existing components/AffiliateSection.tsx.
 *
 * IMPORTANT: Several IDs are still placeholder/generic. Sign up for the
 * partner programs and replace before launch:
 *   - Klook (sign-up needed)
 *   - Viator (real ID needed)
 *   - Insubuy (real ID needed)
 */

const AGODA_CID = "1956855";
const TRAVELPAYOUTS_MARKER = "491612";

export interface AffiliateLink {
  provider: string;
  url: string;
  label: string;
}

/** Build a tracked Agoda search URL for a destination city. */
export function buildAgodaUrl(city: string): AffiliateLink {
  const q = encodeURIComponent(city);
  return {
    provider: "agoda",
    label: "Check rates on Agoda",
    url: `https://www.agoda.com/partners/partnersearch.aspx?cid=${AGODA_CID}&pcs=1&hl=en-us&city=${q}`,
  };
}

/** Aviasales (Travelpayouts) flight search to a destination IATA or city. */
export function buildAviasalesUrl(destination: string): AffiliateLink {
  const q = encodeURIComponent(destination);
  return {
    provider: "aviasales",
    label: "Find cheap flights",
    url: `https://aviasales.tpx.lu/M1CWAKTJ?marker=${TRAVELPAYOUTS_MARKER}&destination=${q}`,
  };
}

/** Airalo eSIM by country. */
export function buildAiraloUrl(country: string): AffiliateLink {
  // Airalo's pxf.io link is generic — they don't currently support country
  // params on the affiliate link. Country parameter is preserved for analytics.
  void country;
  return {
    provider: "airalo",
    label: "Get a local eSIM",
    url: "https://airalo.pxf.io/2anR7A",
  };
}

/**
 * Klook activities for a city. Sign-up still pending — placeholder URL.
 * Replace KLOOK_AID once registered.
 */
export function buildKlookUrl(city: string): AffiliateLink {
  const q = encodeURIComponent(city);
  return {
    provider: "klook",
    label: "Browse tours & passes",
    url: `https://www.klook.com/search/result/?query=${q}`,
  };
}

/**
 * Viator tours for a city. Real affiliate ID still pending.
 * Replace `pid=` with the real Viator partner ID once registered.
 */
export function buildViatorUrl(city: string): AffiliateLink {
  const q = encodeURIComponent(city);
  return {
    provider: "viator",
    label: "Tours & experiences",
    url: `https://www.viator.com/search/${q}`,
  };
}

/** Build the standard "travel toolkit" link bundle for a destination. */
export function buildTravelToolkit(
  destination: string,
  destinationCountry: string,
): AffiliateLink[] {
  return [
    buildAgodaUrl(destination),
    buildAviasalesUrl(destination),
    buildKlookUrl(destination),
    buildAiraloUrl(destinationCountry),
  ];
}
