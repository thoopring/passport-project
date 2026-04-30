import { ImageResponse } from "next/og";
import { getPlan } from "../../../lib/plans";

export const runtime = "nodejs";
export const alt = "gliddy trip plan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Per-plan OG image for paid plans. When a buyer shares the secret plan
 * URL on KakaoTalk / iMessage / Slack / Twitter, the preview now shows
 * destination + Day 1 theme — buyer-shareworthy proof that the plan is
 * a real artifact, not a chat log. Plan UUIDs are unguessable so this is
 * safe to render publicly: anyone who has the link is meant to see it.
 *
 * Node runtime (not Edge) so the existing Supabase client works without
 * a parallel implementation. Generation cost is one-time per plan; Vercel
 * caches OG output by URL.
 */
export default async function Image({ params }: Props) {
  const { id } = await params;

  let plan: Awaited<ReturnType<typeof getPlan>> = null;
  try {
    plan = await getPlan(id);
  } catch (err) {
    console.warn("[og] failed to load plan", id, err);
  }

  // Fallback: plan unknown / not yet generated → generic gliddy card.
  if (!plan || !plan.plan) {
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
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: "-0.04em",
          }}
        >
          gliddy
        </div>
      ),
      { ...size },
    );
  }

  const tripPlan = plan.plan;
  const day1 = tripPlan.days[0];
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
            {tripPlan.durationDays}-Day Itinerary
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
            {tripPlan.destination}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#525252",
              fontWeight: 500,
            }}
          >
            {tripPlan.destinationCountry}
          </div>
        </div>

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
