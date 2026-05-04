import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
  Font,
} from "@react-pdf/renderer";
import fsSync from "node:fs";
import pathLib from "node:path";
import type { TripPlan } from "../../types/trip-plan";
import type { Locale } from "../../i18n/locales";
import { seededPickTrivia } from "../trivia";

// Noto Sans CJK KR — full CJK coverage (Korean + Japanese + Chinese
// Unified Ideographs, 20,976 Han chars + 11,172 Hangul). Pretendard covered
// Korean beautifully but was missing Japanese simplifications like 庁 used
// in Tokyo place names, producing garbled glyphs in the PDF.
//
// Registered as "Pretendard" and "Pretendard-Bold" family names purely so
// the existing StyleSheet definitions (fontFamily: "Pretendard-Bold")
// continue to work with zero call-site changes. The actual glyph data
// under the hood is Noto Sans CJK KR.
//
// Fonts bundled at /public/fonts/ and included in the PDF lambda via
// next.config's outputFileTracingIncludes. CDN hotlinking returns 403 in
// practice, so disk-backed loading is the only reliable path.
const FONT_DIR = pathLib.join(process.cwd(), "public", "fonts");
function loadFontAsDataUrl(filename: string): string {
  const buf = fsSync.readFileSync(pathLib.join(FONT_DIR, filename));
  return `data:font/otf;base64,${buf.toString("base64")}`;
}
Font.register({
  family: "Pretendard",
  src: loadFontAsDataUrl("NotoSansCJKkr-Regular.otf"),
});
Font.register({
  family: "Pretendard-Bold",
  src: loadFontAsDataUrl("NotoSansCJKkr-Bold.otf"),
});

/**
 * PlanDocument — react-pdf renderer for the printable trip plan PDF.
 *
 * Includes:
 *   - Cover page with destination, hotel, airport transit
 *   - Static map (rendered separately and passed in as URL)
 *   - One page per day with stops, times, descriptions
 *   - General tips and packing list at the end
 */

/**
 * Brand-aligned PDF palette — mirrors globals.css design tokens so the
 * offline keepsake reads as the same product as the in-browser plan.
 *
 * Earlier palette was an unrelated forest-green + amber stack
 * (`#1a4d2e` / `#ff9f1c`) inherited from a P14a draft and never
 * reconciled when the site shipped its warm-paper + coral aesthetic.
 * Side-by-side with the live site, the PDF read like a different
 * company's print template.
 *
 * Changes mapped to the in-browser tokens:
 *   brand   → --brand-primary (coral, the gliddy signature)
 *   accent  → --accent-primary (sky blue, secondary cue for tips)
 *   text    → --text-primary
 *   muted   → --text-secondary
 *   light   → --surface-secondary (cream card background)
 *   border  → --border-light
 *   bg      → --background (warm paper page surface)
 *
 * Map polyline colors (lib/map.ts) intentionally NOT touched here —
 * Mapbox static images use their own palette decisions, and a coral
 * polyline on a city map reads as warning/danger. Map color polish is
 * a separate workstream.
 */
const colors = {
  brand: "#FF6B6B",
  accent: "#4DA8DA",
  text: "#161615",
  muted: "#5A5751",
  light: "#FBF7EE",
  border: "#EDE6D6",
  bg: "#FFFCF7",
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Pretendard",
    fontSize: 11,
    color: colors.text,
    backgroundColor: colors.bg,
  },
  header: {
    borderBottom: `1.5pt solid ${colors.brand}`,
    paddingBottom: 8,
    marginBottom: 16,
  },
  brand: {
    fontSize: 9,
    color: colors.brand,
    fontFamily: "Pretendard-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  h1: {
    /* Bumped from 26 → 32 pt so the destination title lands as a
       confident first-page anchor. Matches the in-browser display
       hierarchy where the h1 is intentionally large + bold. Korean
       cities like "레이캬비크" stay single-line at this size. */
    fontSize: 32,
    fontFamily: "Pretendard-Bold",
    marginTop: 6,
    color: colors.text,
  },
  h2: {
    fontSize: 16,
    fontFamily: "Pretendard-Bold",
    marginTop: 18,
    marginBottom: 6,
    color: colors.brand,
  },
  h3: {
    fontSize: 13,
    fontFamily: "Pretendard-Bold",
    marginTop: 10,
    marginBottom: 4,
  },
  body: { fontSize: 11, lineHeight: 1.5, color: colors.text },
  muted: { fontSize: 10, color: colors.muted },
  card: {
    backgroundColor: colors.light,
    border: `0.5pt solid ${colors.border}`,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  row: { flexDirection: "row", marginBottom: 4 },
  label: {
    width: 80,
    fontFamily: "Pretendard-Bold",
    fontSize: 10,
    color: colors.muted,
    textTransform: "uppercase",
  },
  value: { flex: 1, fontSize: 11 },
  stop: { marginBottom: 12, paddingBottom: 10, borderBottom: `0.3pt solid ${colors.border}` },
  stopHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  stopTime: { fontFamily: "Pretendard-Bold", fontSize: 12, color: colors.brand },
  stopName: { fontFamily: "Pretendard-Bold", fontSize: 12, color: colors.text, flex: 1, marginLeft: 10 },
  stopType: { fontSize: 9, color: colors.muted, textTransform: "uppercase" },
  stopDesc: { fontSize: 10, color: colors.text, lineHeight: 1.5, marginTop: 3 },
  stopMeta: { fontSize: 9, color: colors.muted, marginTop: 3 },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    fontSize: 9,
    color: colors.muted,
    textAlign: "center",
    borderTop: `0.3pt solid ${colors.border}`,
    paddingTop: 8,
  },
  mapImg: {
    width: "100%",
    height: 280,
    objectFit: "cover",
    borderRadius: 6,
    marginVertical: 10,
  },
  heroImg: {
    /* Cinematic letterbox above the destination title. Width fills the
       page, height tuned so the cover stays single-page on A4 even with
       a long overview paragraph. */
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 6,
    marginBottom: 16,
  },
  /* ─── Cover page (poster mood) ────────────────────────────────────── */
  coverPage: {
    /* Full-bleed cover — no padding so the hero photo fills edge-to-edge.
       Text block sits below in its own padded container. */
    padding: 0,
    fontFamily: "Pretendard",
    color: colors.text,
    backgroundColor: colors.bg,
  },
  coverHero: {
    /* ~55% of A4 height (842pt total → ~460pt). Big enough to feel like
       a poster, small enough to leave room for the text block below
       without forcing a second page. */
    width: "100%",
    height: 460,
    objectFit: "cover",
  },
  coverHeroFallback: {
    /* When no hero photo is available (cold-start destination), show a
       cream fill panel of the same height so the cover layout doesn't
       collapse. Brand stays text-led. */
    width: "100%",
    height: 460,
    backgroundColor: colors.light,
  },
  coverText: {
    padding: "32 48",
  },
  coverBrand: {
    fontSize: 11,
    color: colors.brand,
    fontFamily: "Pretendard-Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  coverDestination: {
    /* Larger than the in-flow h1 because the cover is the hero moment.
       Korean place names like "레이캬비크" still fit; longer city names
       fall back to wrapping which is fine on a poster. */
    fontSize: 56,
    fontFamily: "Pretendard-Bold",
    color: colors.text,
    lineHeight: 1.05,
    marginBottom: 12,
  },
  coverSubtitle: {
    fontSize: 16,
    color: colors.muted,
    marginBottom: 24,
  },
  coverTagline: {
    /* Italic-not-available with Pretendard/NotoSans CJK fallback, so we
       lean on color (coral) + size (medium) for the personalized voice. */
    fontSize: 14,
    color: colors.brand,
    fontFamily: "Pretendard-Bold",
    marginBottom: 24,
  },
  coverFooter: {
    fontSize: 9,
    color: colors.muted,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: "auto",
  },
  dayMapImg: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 14,
  },
  dayPhotoImg: {
    /* Per-day destination photo — emotional anchor at top of each day
       page, sits above the functional mini-map. Wider than tall to
       feel like a magazine spread rather than a square thumbnail. */
    width: "100%",
    height: 220,
    objectFit: "cover",
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 8,
  },
  pill: {
    backgroundColor: colors.brand,
    color: "#fff",
    fontSize: 9,
    fontFamily: "Pretendard-Bold",
    padding: "3 8",
    borderRadius: 10,
    marginRight: 4,
  },
  triviaCard: {
    /* Subtle card matching the in-browser trivia callout: cream
       surface + thin gray border. Earlier amber-on-orange combo
       pulled too much attention and didn't read as gliddy. The label
       below carries the brand color (coral); the card stays calm. */
    backgroundColor: colors.light,
    border: `0.5pt solid ${colors.border}`,
    borderRadius: 6,
    padding: 10,
    marginTop: 14,
  },
  triviaLabel: {
    fontSize: 9,
    fontFamily: "Pretendard-Bold",
    color: colors.brand,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  triviaText: {
    // Pretendard has no italic variant; relying on color contrast instead.
    fontSize: 10,
    color: colors.text,
    lineHeight: 1.5,
  },
});

interface Props {
  plan: TripPlan;
  /** Overview map for the cover page. City-zoomed, transit (airport) stops
   *  excluded so the bounds don't blow out to a 70-km square. */
  mapImageUrl?: string;
  /** Cinematic destination hero photo at the top of the cover. Same source
   *  the site uses (lib/destinations/heroes), so the offline keepsake
   *  starts with the same emotional anchor as the in-browser plan view.
   *  Falls back gracefully when the destination is not in the catalog —
   *  the cover stays clean and text-led. */
  heroImageUrl?: string;
  /** Per-day mini-maps (one entry per `plan.days`, in order). Each is a
   *  tight zoom on that day's stops + the hotel as an anchor pin. Length
   *  must equal plan.days.length when supplied; missing entries skip the
   *  map for that day instead of misaligning. */
  dayMapUrls?: string[];
  /** Per-day destination photos from lib/destinations/day-photos. Same
   *  seeded picker the site uses, so site/PDF for one plan show the
   *  same photo on the same day. Empty entry = skip the photo for that
   *  day (cold-start destinations or pool exhaustion). */
  dayPhotoUrls?: string[];
  /** Locale for trivia content selection. Defaults to "en" — the PDF
   *  was previously English-only because pickTrivia didn't take a locale,
   *  which broke the language consistency of every non-English plan. */
  locale?: Locale;
  /** Localized "Did you know?" header text for the trivia card. Passed
   *  in from the route handler since react-pdf can't access the i18n
   *  client hooks. */
  triviaLabel?: string;
  /** Stable seed for the trivia shuffle. Plan UUID for paid plans, sample
   *  slug for samples. Same seed → same trivia order, so the site and the
   *  PDF for one plan show the same fact on Day 1, the same on Day 2, etc.
   *  Without a seed, falls back to destination + duration so the document
   *  is at least stable across regenerations of identical input. */
  triviaSeed?: string;
  /** Localized "Crafted for the two of you" tagline. Same copy thread the
   *  in-browser plan view shows under the destination h1. The route
   *  handler resolves the locale + travelerType lookup and passes the
   *  finished string here. */
  craftedForLine?: string;
  /** Pre-formatted "Generated DD MMM YYYY" line shown at the bottom of
   *  the cover page. The route handler formats with the user's locale
   *  so a Korean reader sees "2026년 5월 4일" and a French reader sees
   *  "4 mai 2026". */
  generatedAtLine?: string;
  /** Localized "n-day itinerary · Country" subtitle. */
  subtitleLine?: string;
  /** Localized "Trip overview" header used on page 2. */
  overviewHeader?: string;
}

export function PlanDocument({
  plan,
  mapImageUrl,
  heroImageUrl,
  dayMapUrls,
  dayPhotoUrls,
  locale = "en",
  triviaLabel = "Did you know?",
  triviaSeed,
  craftedForLine,
  generatedAtLine,
  subtitleLine,
  overviewHeader = "Trip overview",
}: Props) {
  // Hoist trivia selection out of the per-day loop. The earlier pattern
  // called pickTrivia inside the loop and used dayIdx % length as the
  // index, but pickTrivia uses Math.random so each call returned a freshly
  // shuffled pool — meaning Day 1 / Day 2 / Day 3 could (and did) all
  // surface the same fact by luck of the shuffle. Hoisting + seedeing
  // gives N distinct facts in stable order for the same plan.
  const triviaPool = seededPickTrivia(
    plan.destinationCountry,
    locale,
    plan.days.length,
    triviaSeed ?? `${plan.destination}-${plan.durationDays}`,
  );
  return (
    <Document
      title={`${plan.destination} trip plan`}
      author="gliddy"
      subject="Personalized trip itinerary"
    >
      {/* ─── Cover page (poster) ───────────────────────────────────────
          Big hero photo + destination + traveler tagline + generation
          date. Single visual moment the customer encounters when they
          open the PDF. No detail, no map — just emotional anchor.
          Page 2 picks up the practical orientation. */}
      <Page size="A4" style={styles.coverPage}>
        {heroImageUrl ? (
          <Image src={heroImageUrl} style={styles.coverHero} />
        ) : (
          <View style={styles.coverHeroFallback} />
        )}
        <View style={styles.coverText}>
          <Text style={styles.coverBrand}>gliddy · Trip Plan</Text>
          <Text style={styles.coverDestination}>{plan.destination}</Text>
          <Text style={styles.coverSubtitle}>
            {subtitleLine ??
              `${plan.durationDays}-day itinerary · ${plan.destinationCountry}`}
          </Text>
          {craftedForLine && (
            <Text style={styles.coverTagline}>{craftedForLine}</Text>
          )}
          {generatedAtLine && (
            <Text style={styles.coverFooter}>{generatedAtLine}</Text>
          )}
        </View>
      </Page>

      {/* ─── Page 2: Orientation ─────────────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>{overviewHeader}</Text>
          <Text style={styles.h1}>{plan.destination}</Text>
          <Text style={styles.muted}>
            {subtitleLine ??
              `${plan.durationDays}-day itinerary · ${plan.destinationCountry}`}
          </Text>
        </View>

        <Text style={styles.body}>{plan.overview}</Text>

        {mapImageUrl && <Image src={mapImageUrl} style={styles.mapImg} />}

        <Text style={styles.h2}>Hotel</Text>
        <View style={styles.card}>
          <Text style={{ fontFamily: "Pretendard-Bold", fontSize: 13 }}>
            {plan.hotel.name}
          </Text>
          <Text style={styles.muted}>
            {plan.hotel.area} · {plan.hotel.address}
          </Text>
          {plan.hotel.estimatedNightlyRate && (
            <Text style={styles.muted}>{plan.hotel.estimatedNightlyRate}</Text>
          )}
          <Text style={[styles.body, { marginTop: 6 }]}>{plan.hotel.rationale}</Text>
        </View>

        <Text style={styles.h2}>Airport → Hotel</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Method</Text>
            <Text style={styles.value}>{plan.airportTransit.method}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Duration</Text>
            <Text style={styles.value}>{plan.airportTransit.duration}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cost</Text>
            <Text style={styles.value}>{plan.airportTransit.cost}</Text>
          </View>
          <Text style={[styles.body, { marginTop: 6 }]}>
            {plan.airportTransit.instructions}
          </Text>
        </View>

        {(plan.currencyTip || plan.languageTip || plan.emergencyNumber) && (
          <View style={[styles.card, { marginTop: 6 }]}>
            {plan.currencyTip && (
              <View style={styles.row}>
                <Text style={styles.label}>Currency</Text>
                <Text style={styles.value}>{plan.currencyTip}</Text>
              </View>
            )}
            {plan.languageTip && (
              <View style={styles.row}>
                <Text style={styles.label}>Language</Text>
                <Text style={styles.value}>{plan.languageTip}</Text>
              </View>
            )}
            {plan.emergencyNumber && (
              <View style={styles.row}>
                <Text style={styles.label}>Emergency</Text>
                <Text style={styles.value}>{plan.emergencyNumber}</Text>
              </View>
            )}
          </View>
        )}

        <Text style={styles.footer}>
          Generated by checkvisamap.com · Not affiliated with any government
        </Text>
      </Page>

      {/* Days */}
      {plan.days.map((day, dayIdx) => {
        const triviaForDay = triviaPool[dayIdx];
        const dayMapUrl = dayMapUrls?.[dayIdx];
        const dayPhotoUrl = dayPhotoUrls?.[dayIdx];

        return (
          <Page key={day.dayNumber} size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.brand}>
                Day {day.dayNumber} of {plan.durationDays}
              </Text>
              <Text style={styles.h1}>{day.theme}</Text>
              <Text style={styles.muted}>{day.summary}</Text>
            </View>

            {/* Per-day destination photo — emotional anchor before the
                functional content. Skipped when the destination isn't
                in lib/destinations/day-photos catalog. */}
            {dayPhotoUrl && <Image src={dayPhotoUrl} style={styles.dayPhotoImg} />}

            {/* Day mini-map — tight zoom on this day's stops + hotel anchor.
                Solves the airport-far-from-city problem the overview map
                hits: each day's stops cluster in one neighborhood, so the
                auto-fit zoom stays at street-readable scale. */}
            {dayMapUrl && <Image src={dayMapUrl} style={styles.dayMapImg} />}

            {day.stops.map((stop) => (
              <View key={stop.order} style={styles.stop} wrap={false}>
                <View style={styles.stopHeader}>
                  <Text style={styles.stopTime}>{stop.time}</Text>
                  <Text style={styles.stopName}>{stop.name}</Text>
                  <Text style={styles.stopType}>{stop.type}</Text>
                </View>
                {stop.area && <Text style={styles.muted}>{stop.area}</Text>}
                <Text style={styles.stopDesc}>{stop.description}</Text>
                <Text style={styles.stopMeta}>
                  {stop.duration}
                  {stop.estimatedCost ? ` · ${stop.estimatedCost}` : ""}
                  {stop.transitFromPrev ? ` · ${stop.transitFromPrev}` : ""}
                </Text>
                {stop.bookingTip && (
                  <Text
                    style={[
                      styles.stopMeta,
                      { color: colors.accent, fontFamily: "Pretendard-Bold" },
                    ]}
                  >
                    Tip: {stop.bookingTip}
                  </Text>
                )}
              </View>
            ))}

            {triviaForDay && (
              <View style={styles.triviaCard} wrap={false}>
                <Text style={styles.triviaLabel}>{triviaLabel}</Text>
                <Text style={styles.triviaText}>{triviaForDay}</Text>
              </View>
            )}

            <Text style={styles.footer}>checkvisamap.com</Text>
          </Page>
        );
      })}

      {/* Tips page (optional) */}
      {(plan.packingTips?.length ||
        plan.generalTips?.length ||
        plan.budgetEstimate ||
        plan.bestSeasonNote) && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.brand}>Practical info</Text>
            <Text style={styles.h1}>Tips & estimates</Text>
          </View>

          {plan.budgetEstimate && (
            <>
              <Text style={styles.h2}>Budget</Text>
              <Text style={styles.body}>{plan.budgetEstimate}</Text>
            </>
          )}

          {plan.bestSeasonNote && (
            <>
              <Text style={styles.h2}>Best season</Text>
              <Text style={styles.body}>{plan.bestSeasonNote}</Text>
            </>
          )}

          {plan.packingTips?.length ? (
            <>
              <Text style={styles.h2}>Packing tips</Text>
              {plan.packingTips.map((t, i) => (
                <Text key={i} style={[styles.body, { marginBottom: 3 }]}>
                  - {t}
                </Text>
              ))}
            </>
          ) : null}

          {plan.generalTips?.length ? (
            <>
              <Text style={styles.h2}>General tips</Text>
              {plan.generalTips.map((t, i) => (
                <Text key={i} style={[styles.body, { marginBottom: 3 }]}>
                  - {t}
                </Text>
              ))}
            </>
          ) : null}

          <View style={{ marginTop: 30 }}>
            <Text style={styles.muted}>
              Trip plan generated for you by gliddy. Have a great trip.
            </Text>
            <Link src="https://checkvisamap.com" style={{ fontSize: 10, color: colors.brand, marginTop: 4 }}>
              checkvisamap.com
            </Link>
          </View>
        </Page>
      )}
    </Document>
  );
}
