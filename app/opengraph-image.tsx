import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "gliddy — A real day-by-day trip plan. $4. No subscription.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5EFE4",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "#141517",
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
            color: "#141517",
          }}
        >
          gliddy
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: "#141517",
            textAlign: "center",
            maxWidth: 1000,
            lineHeight: 1.3,
            marginBottom: 40,
          }}
        >
          A real day-by-day trip plan. $4. No subscription.
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
          AI itinerary in your inbox in 5–10 min
        </div>
      </div>
    ),
    { ...size },
  );
}
