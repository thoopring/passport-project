import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "gliddy — AI trip plans, sorted";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAFA",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "#0A0A0A",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Subtle accent blob top-right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 400,
            height: 400,
            background: "#D4442B",
            opacity: 0.08,
            borderRadius: 9999,
            transform: "translate(120px, -120px)",
          }}
        />
        <div
          style={{
            fontSize: 128,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            marginBottom: 28,
            color: "#0A0A0A",
          }}
        >
          gliddy
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#525252",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.35,
            marginBottom: 40,
          }}
        >
          Your next trip, sorted. Day-by-day itinerary, hotel pick, route map.
        </div>
        <div
          style={{
            background: "#D4442B",
            color: "#FFFFFF",
            padding: "16px 40px",
            borderRadius: 10,
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          One plan, no subscription
        </div>
      </div>
    ),
    { ...size },
  );
}
