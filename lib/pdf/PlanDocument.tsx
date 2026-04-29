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
import { pickTrivia } from "../trivia";

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

const colors = {
  brand: "#1a4d2e",
  accent: "#ff9f1c",
  text: "#1a1a1a",
  muted: "#666666",
  light: "#f5f5f0",
  border: "#e5e5e0",
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Pretendard",
    fontSize: 11,
    color: colors.text,
    backgroundColor: "#FFFBF0",
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
    fontSize: 26,
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
    backgroundColor: "#fff7e6",
    border: `0.5pt solid ${colors.accent}`,
    borderRadius: 6,
    padding: 10,
    marginTop: 14,
  },
  triviaLabel: {
    fontSize: 9,
    fontFamily: "Pretendard-Bold",
    color: colors.accent,
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
  mapImageUrl?: string;
}

export function PlanDocument({ plan, mapImageUrl }: Props) {
  return (
    <Document
      title={`${plan.destination} trip plan`}
      author="gliddy"
      subject="Personalized trip itinerary"
    >
      {/* Cover */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>gliddy · Trip Plan</Text>
          <Text style={styles.h1}>{plan.destination}</Text>
          <Text style={styles.muted}>
            {plan.durationDays}-day itinerary · {plan.destinationCountry}
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
        // Pick a deterministic-ish trivia fact per day so the same plan
        // renders the same facts on every download. We use day index modulo
        // the available pool, after picking a shuffled set of facts for the
        // country.
        const triviaPool = pickTrivia(plan.destinationCountry, plan.days.length + 2);
        const triviaForDay = triviaPool[dayIdx % triviaPool.length];

        return (
          <Page key={day.dayNumber} size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.brand}>
                Day {day.dayNumber} of {plan.durationDays}
              </Text>
              <Text style={styles.h1}>{day.theme}</Text>
              <Text style={styles.muted}>{day.summary}</Text>
            </View>

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
                <Text style={styles.triviaLabel}>Did you know?</Text>
                <Text style={styles.triviaText}>{triviaForDay}</Text>
              </View>
            )}

            <Text style={styles.footer}>checkvisamap.com</Text>
          </Page>
        );
      })}

      {/* Tips page (optional) */}
      {(plan.packingTips?.length || plan.generalTips?.length || plan.budgetEstimate) && (
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
