import { ImageResponse } from "next/og";
import { getSample } from "../../../lib/samples";

export const runtime = "edge";
export const alt = "gliddy sample plan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Per-sample OG image. When a sample link gets shared on Twitter/Slack/KakaoTalk
 * it now renders with destination + day-1 theme baked in, instead of the
 * generic site-wide OG. Stays in the Layla palette: warm-paper bg, ink type,
 * vermilion accents, no photo (Edge runtime can't load remote images cleanly).
 *
 * Uses the canonical English plan for OG rendering — locale-specific OGs
 * could be added later but most platforms cache aggressively, so a single
 * canonical preview is the safest default.
 */
export default async function Image({ params }: Props) {
  const { slug } = await params;
  const sample = getSample(slug);
  if (!sample) {
    // Fallback to a minimal generic card if slug is unknown.
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FFFCF7",
            color: "#141517",
            fontSize: 80,
            fontWeight: 900,
          }}
        >
          gliddy
        </div>
      ),
      { ...size },
    );
  }

  const day1 = sample.plan.days[0];
  const stops = day1?.stops?.slice(0, 3).map((s) => s.name) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFFCF7",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "70px 80px",
          position: "relative",
          fontFamily: "sans-serif",
          color: "#141517",
        }}
      >
        {/* Vermilion accent blob top-right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 380,
            height: 380,
            background: "#FF6B6B",
            opacity: 0.12,
            borderRadius: 9999,
            transform: "translate(110px, -110px)",
            display: "flex",
          }}
        />

        {/* Top: gliddy wordmark */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: "#141517",
            display: "flex",
          }}
        >
          gliddy
        </div>

        {/* Middle: destination + duration */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 80,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#FF6B6B",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {sample.plan.durationDays}-Day Itinerary
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              color: "#141517",
              marginBottom: 18,
            }}
          >
            {sample.plan.destination}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#525252",
              fontWeight: 500,
            }}
          >
            {sample.plan.destinationCountry}
          </div>
        </div>

        {/* Bottom: Day 1 stops as proof */}
        {day1 && stops.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "auto",
              paddingTop: 30,
              borderTop: "1px solid #E5E1D8",
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: "#FF6B6B",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 10,
                display: "flex",
              }}
            >
              Day 1 · {day1.theme}
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#3C3C3C",
                fontWeight: 500,
                display: "flex",
              }}
            >
              {stops.join(" · ")}
            </div>
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
