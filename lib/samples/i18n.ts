/**
 * Sample plan translations — sparse override structure.
 *
 * Each translation file (./i18n/{locale}.ts) exports a Record<slug,
 * TripPlanI18n>. The values contain ONLY the human-readable strings that
 * differ from the canonical English; structural data (coords, prices, types,
 * day/stop indexing) lives in the base sample and stays English-or-numeric.
 *
 * At render time, `applyTranslation(base, override)` deep-merges the override
 * onto the base, returning a fully-formed TripPlan in the target locale.
 *
 * Why sparse: keeping translations to text-only fields means a 600-line
 * sample can be translated with a 200-line override, four times faster, and
 * the diff between locales is small enough to spot drift.
 */

import type { TripPlan, Day, Stop } from "../../types/trip-plan";
import type { Locale } from "../../i18n/locales";

export interface TripPlanI18n {
  destination?: string;
  destinationCountry?: string;
  overview?: string;
  bestSeasonNote?: string;
  currencyTip?: string;
  languageTip?: string;
  emergencyNumber?: string;
  hotel?: {
    name?: string;
    area?: string;
    address?: string;
    rationale?: string;
    estimatedNightlyRate?: string;
  };
  airportTransit?: {
    method?: string;
    duration?: string;
    cost?: string;
    instructions?: string;
  };
  /**
   * Parallel-indexed array of day overrides. days[i] override applies to
   * base.days[i]. To skip a day, pass an empty object {}.
   */
  days?: Array<{
    theme?: string;
    summary?: string;
    /** Same parallel-indexed pattern for stops within a day. */
    stops?: Array<{
      name?: string;
      area?: string;
      address?: string;
      duration?: string;
      description?: string;
      estimatedCost?: string;
      bookingTip?: string;
      transitFromPrev?: string;
    }>;
  }>;
  packingTips?: string[];
  budgetEstimate?: string;
  generalTips?: string[];
}

/**
 * Deep-merge an i18n override onto a base plan, returning a new TripPlan.
 * Falls back to the base value for any field the override omits — partial
 * translations are safe to ship and just leave English fragments visible.
 */
export function applyTranslation(base: TripPlan, t: TripPlanI18n): TripPlan {
  const days: Day[] = base.days.map((day, i) => {
    const dayT = t.days?.[i] ?? {};
    const stops: Stop[] = day.stops.map((stop, j) => {
      const stopT = dayT.stops?.[j] ?? {};
      return {
        ...stop,
        ...(stopT.name !== undefined && { name: stopT.name }),
        ...(stopT.area !== undefined && { area: stopT.area }),
        ...(stopT.address !== undefined && { address: stopT.address }),
        ...(stopT.duration !== undefined && { duration: stopT.duration }),
        ...(stopT.description !== undefined && { description: stopT.description }),
        ...(stopT.estimatedCost !== undefined && { estimatedCost: stopT.estimatedCost }),
        ...(stopT.bookingTip !== undefined && { bookingTip: stopT.bookingTip }),
        ...(stopT.transitFromPrev !== undefined && { transitFromPrev: stopT.transitFromPrev }),
      };
    });
    return {
      ...day,
      ...(dayT.theme !== undefined && { theme: dayT.theme }),
      ...(dayT.summary !== undefined && { summary: dayT.summary }),
      stops,
    };
  });

  return {
    ...base,
    ...(t.destination !== undefined && { destination: t.destination }),
    ...(t.destinationCountry !== undefined && { destinationCountry: t.destinationCountry }),
    ...(t.overview !== undefined && { overview: t.overview }),
    ...(t.bestSeasonNote !== undefined && { bestSeasonNote: t.bestSeasonNote }),
    ...(t.currencyTip !== undefined && { currencyTip: t.currencyTip }),
    ...(t.languageTip !== undefined && { languageTip: t.languageTip }),
    ...(t.emergencyNumber !== undefined && { emergencyNumber: t.emergencyNumber }),
    hotel: {
      ...base.hotel,
      ...(t.hotel?.name !== undefined && { name: t.hotel.name }),
      ...(t.hotel?.area !== undefined && { area: t.hotel.area }),
      ...(t.hotel?.address !== undefined && { address: t.hotel.address }),
      ...(t.hotel?.rationale !== undefined && { rationale: t.hotel.rationale }),
      ...(t.hotel?.estimatedNightlyRate !== undefined && {
        estimatedNightlyRate: t.hotel.estimatedNightlyRate,
      }),
    },
    airportTransit: {
      ...base.airportTransit,
      ...(t.airportTransit?.method !== undefined && { method: t.airportTransit.method }),
      ...(t.airportTransit?.duration !== undefined && { duration: t.airportTransit.duration }),
      ...(t.airportTransit?.cost !== undefined && { cost: t.airportTransit.cost }),
      ...(t.airportTransit?.instructions !== undefined && {
        instructions: t.airportTransit.instructions,
      }),
    },
    days,
    ...(t.packingTips !== undefined && { packingTips: t.packingTips }),
    ...(t.budgetEstimate !== undefined && { budgetEstimate: t.budgetEstimate }),
    ...(t.generalTips !== undefined && { generalTips: t.generalTips }),
  };
}

/**
 * Top-level translation registry. Each locale lazy-loads its overrides,
 * keyed by sample slug. Looking up a slug+locale that doesn't exist returns
 * undefined and the caller falls back to the base English plan.
 */
export type LocaleTranslations = Record<string, TripPlanI18n>;

let cached: Partial<Record<Locale, LocaleTranslations>> = {};

export async function loadLocaleTranslations(
  locale: Locale,
): Promise<LocaleTranslations> {
  if (cached[locale]) return cached[locale]!;
  if (locale === "en") {
    cached[locale] = {};
    return {};
  }
  try {
    // Static imports per locale so Next bundles them; switch lets us avoid
    // dynamic import paths that confuse the bundler.
    let mod: { default: LocaleTranslations };
    switch (locale) {
      case "ko":
        mod = await import("./i18n/ko");
        break;
      case "ja":
        mod = await import("./i18n/ja");
        break;
      case "zh":
        mod = await import("./i18n/zh");
        break;
      case "fr":
        mod = await import("./i18n/fr");
        break;
      default:
        mod = { default: {} };
    }
    cached[locale] = mod.default;
    return mod.default;
  } catch {
    cached[locale] = {};
    return {};
  }
}
