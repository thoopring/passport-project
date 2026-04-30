/**
 * Affiliate URL builders. Pure functions returning tracked URLs for each
 * partner.
 *
 * Strategy (founder direction 2026-04-30): natural placement only —
 * appear when the user has an actual reason to act, never as a generic
 * grid of "stuff for sale". Tier 1 partners appear inline next to the
 * decision they support (Agoda under hotel card, KiwiTaxi under airport
 * transit card, etc.). Tier 2 stays in the sidebar toolkit. Tier 3 is
 * defined here for future use but not surfaced anywhere yet.
 *
 * Tracking IDs:
 *   - AGODA_CID — Agoda partner search (deep-linkable)
 *   - tpx.lu URLs — TravelPayouts redirect links, one per partner.
 *     These don't accept deep-link params; they always land on the
 *     partner's homepage with our tracking applied. Use as-is.
 *   - AMAZON_TAG — Amazon Associates US store (golfootd-20). Append
 *     ?tag=golfootd-20 to any amazon.com product or search URL.
 */

const AGODA_CID = "1956855";
const AMAZON_TAG = "golfootd-20";

export interface AffiliateLink {
  provider: string;
  url: string;
  label: string;
}

// ────────────────────────────────────────────────────
// Tier 1 — high recognition, inline placement
// ────────────────────────────────────────────────────

/**
 * Agoda search deep-linked to a destination + optional hotel name.
 * The partnersearch endpoint supports a `hotelName` param so we can
 * land the user directly on rate comparison for the recommended hotel.
 * Falls back to a city search when hotelName is omitted.
 */
export function buildAgodaUrl(city: string, hotelName?: string): AffiliateLink {
  const params = new URLSearchParams({
    cid: AGODA_CID,
    pcs: "1",
    hl: "en-us",
    city,
  });
  if (hotelName) params.set("hotelName", hotelName);
  return {
    provider: "agoda",
    label: "Compare rates on Agoda",
    url: `https://www.agoda.com/partners/partnersearch.aspx?${params.toString()}`,
  };
}

/** Aviasales (Travelpayouts) flight search. tpx.lu redirect — generic landing. */
export function buildAviasalesUrl(_destination?: string): AffiliateLink {
  return {
    provider: "aviasales",
    label: "Find cheap flights",
    url: "https://aviasales.tpx.lu/TjgQZ7nH",
  };
}

/** Klook activities — tours, passes, attraction tickets. */
export function buildKlookUrl(_city?: string): AffiliateLink {
  return {
    provider: "klook",
    label: "Browse tours & tickets",
    url: "https://klook.tpx.lu/8zESLHIk",
  };
}

/** Airalo eSIM — works in 200+ countries. */
export function buildAiraloUrl(_country?: string): AffiliateLink {
  return {
    provider: "airalo",
    label: "Get a local eSIM",
    url: "https://airalo.tpx.lu/DgqlOWVA",
  };
}

// ────────────────────────────────────────────────────
// Tier 2 — contextual, surfaced when relevant
// ────────────────────────────────────────────────────

/** KiwiTaxi airport-to-hotel transfer (fixed-price taxi booking). */
export function buildKiwiTaxiUrl(): AffiliateLink {
  return {
    provider: "kiwitaxi",
    label: "Reserve airport transfer",
    url: "https://kiwitaxi.tpx.lu/wv5SLV16",
  };
}

/** RadicalStorage — luggage storage between checkout and flight. */
export function buildRadicalStorageUrl(): AffiliateLink {
  return {
    provider: "radicalstorage",
    label: "Store luggage hourly",
    url: "https://radicalstorage.tpx.lu/RYxei4ri",
  };
}

/** Auto Europe — car rental, strong in Europe. */
export function buildAutoEuropeUrl(): AffiliateLink {
  return {
    provider: "autoeurope",
    label: "Rent a car",
    url: "https://autoeurope.tpx.lu/jyHN4YF3",
  };
}

/** AirHelp — flight delay / cancellation compensation claims. */
export function buildAirHelpUrl(): AffiliateLink {
  return {
    provider: "airhelp",
    label: "Claim flight compensation",
    url: "https://airhelp.tpx.lu/odmFiOA6",
  };
}

/** Wegotrip — guided audio tours & tickets. */
export function buildWegotripUrl(): AffiliateLink {
  return {
    provider: "wegotrip",
    label: "Audio tours & tickets",
    url: "https://wegotrip.tpx.lu/aFB35t22",
  };
}

/** TicketNetwork — concert / sport / theater tickets (US-strong). */
export function buildTicketNetworkUrl(): AffiliateLink {
  return {
    provider: "ticketnetwork",
    label: "Event tickets",
    url: "https://ticketnetwork.tpx.lu/uKThqUym",
  };
}

/** Amazon US — search with our Associates tag. Useful for packing items. */
export function buildAmazonSearchUrl(query: string): AffiliateLink {
  const q = encodeURIComponent(query);
  return {
    provider: "amazon",
    label: `Find on Amazon`,
    url: `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG}`,
  };
}

// ────────────────────────────────────────────────────
// Tier 3 — defined but not surfaced (cost: nothing to keep ready)
// ────────────────────────────────────────────────────

/** Compensair — flight delay claims (AirHelp competitor). */
export function buildCompensairUrl(): AffiliateLink {
  return {
    provider: "compensair",
    label: "Flight delay refund",
    url: "https://compensair.tpx.lu/tyFe8x5l",
  };
}

/** GetTransfer — airport transfer (KiwiTaxi alternative). */
export function buildGetTransferUrl(): AffiliateLink {
  return {
    provider: "gettransfer",
    label: "Reserve transfer",
    url: "https://gettransfer.tpx.lu/PSzfAvuo",
  };
}

/** EconomyBookings — car rental aggregator. */
export function buildEconomyBookingsUrl(): AffiliateLink {
  return {
    provider: "economybookings",
    label: "Compare car rentals",
    url: "https://economybookings.tpx.lu/9BGP8bdi",
  };
}

/** BikesBooking — bike & scooter rentals. */
export function buildBikesBookingUrl(): AffiliateLink {
  return {
    provider: "bikesbooking",
    label: "Rent a bike",
    url: "https://bikesbooking.tpx.lu/mnTUncOq",
  };
}

/** SeaRadar — yacht / boat rentals. Niche. */
export function buildSeaRadarUrl(): AffiliateLink {
  return {
    provider: "searadar",
    label: "Yacht rentals",
    url: "https://searadar.tpx.lu/6TivNaET",
  };
}

// ────────────────────────────────────────────────────
// Plan-view sidebar bundle — Tier 1 + 1 contextual extra
// ────────────────────────────────────────────────────

/**
 * Standard "travel toolkit" bundle for the plan-view sidebar. Curated
 * to the four highest-recognition partners + RadicalStorage as a
 * legit utility (luggage storage on departure day is a real pain
 * solved by the affiliate). Order is the order they render.
 */
export function buildTravelToolkit(
  destination: string,
  destinationCountry: string,
): AffiliateLink[] {
  return [
    buildAgodaUrl(destination),
    buildAviasalesUrl(destination),
    buildKlookUrl(destination),
    buildAiraloUrl(destinationCountry),
    buildRadicalStorageUrl(),
  ];
}
