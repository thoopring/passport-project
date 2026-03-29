import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Passport Power - Check Visa Requirements for 190+ Countries";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a4d2e 0%, #2d7a4a 50%, #1a4d2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "#FFFBF0",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 10, display: "flex" }}>🌍</div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          Passport Power
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.9,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.5,
          }}
        >
          Check visa requirements for 190+ countries instantly
        </div>
        <div
          style={{
            marginTop: 40,
            background: "#ff9f1c",
            color: "#1a4d2e",
            padding: "16px 40px",
            borderRadius: 50,
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          checkvisamap.com
        </div>
      </div>
    ),
    { ...size }
  );
}
