import { NextRequest, NextResponse } from "next/server";
import { PlanRequestSchema } from "../../../../types/trip-plan";
import { generateDayOneTeaser } from "../../../../lib/generator/teaser";
import { getActiveLocale } from "../../../../i18n/request";

/**
 * POST /api/plan/teaser
 *
 * Pre-checkout "real Day 1" preview. Takes the same wizard payload the review
 * screen would send to /api/plan/draft, generates a genuine Day 1 from it, and
 * returns it for the blur-unlock preview. No payment, NO DB write — this is a
 * stateless preview computed on the fly, so it never pollutes the plans table
 * with rows for buyers who don't pay. The real draft + full plan are created
 * later by /api/plan/draft + /api/checkout when the buyer commits.
 *
 * Returns { overview, hotelName, hotelArea, day1 } on success. On any failure
 * the client falls back to the static locked-route placeholder, so a teaser
 * error never blocks checkout.
 */
export const runtime = "nodejs";
// One fast Sonnet call (Day 1 only). The generator self-bounds at 35s; give
// the route a little headroom over that.
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.locale) {
      body.locale = await getActiveLocale();
    }

    const parsed = PlanRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const teaser = await generateDayOneTeaser(parsed.data);
    return NextResponse.json(teaser, { status: 200 });
  } catch (err) {
    console.error("teaser generation failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
