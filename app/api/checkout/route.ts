import { NextRequest, NextResponse } from "next/server";
import { getPlan, markPlanPaid, setPlanGenerating, savePlanResult, setPlanFailed } from "../../../lib/plans";
import { createCheckoutUrl } from "../../../lib/lemonsqueezy";
import { consumePlanCredit } from "../../../lib/referrals";
import { generateTripPlan } from "../../../lib/generator/claude";
import { sendPlanReadyEmail } from "../../../lib/email";

/**
 * POST /api/checkout
 * body: { planId: string }
 *
 * Two paths:
 *   1. NORMAL — create a Lemon Squeezy checkout session and return its URL.
 *   2. CREDIT — if the buyer's email already has an unused plan credit
 *      (referral or promo), skip Lemon Squeezy entirely, mark the plan paid,
 *      kick off generation in the background, and return a redirect URL
 *      pointing at /plan/[id]?paid=1.
 */
export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();
    if (!planId || typeof planId !== "string") {
      return NextResponse.json({ error: "planId required" }, { status: 400 });
    }

    const plan = await getPlan(planId);
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
    if (plan.status !== "draft") {
      return NextResponse.json(
        { error: `Plan is in '${plan.status}' state, cannot pay again` },
        { status: 409 }
      );
    }

    // Check for an unused plan credit on this email (P9 referrals + P10 promos)
    const consumed = await consumePlanCredit(plan.email, planId);
    if (consumed) {
      // Skip LemonSqueezy entirely. Mark paid + kick off generation.
      await markPlanPaid(planId, "credit:" + planId);

      // Fire-and-forget generation pipeline so we can return quickly
      generateAndDeliver(planId).catch((err) => {
        console.error("Free credit generation pipeline failed", { planId, err });
      });

      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://checkvisamap.com";
      return NextResponse.json({ url: `${baseUrl}/plan/${planId}?paid=1` });
    }

    // Normal Lemon Squeezy flow
    const url = await createCheckoutUrl({
      planId: plan.id,
      email: plan.email,
      destination: plan.request.destination,
    });

    return NextResponse.json({ url });
  } catch (err) {
    console.error("checkout failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Generation pipeline used by the credit path. The webhook path has its own
 * copy in app/api/webhooks/lemon-squeezy/route.ts. Kept inline rather than
 * extracted to avoid an extra import boundary that would force `runtime`
 * declarations on this route.
 */
async function generateAndDeliver(planId: string): Promise<void> {
  try {
    const plan = await getPlan(planId);
    if (!plan) throw new Error(`Plan ${planId} not found after credit redemption`);

    await setPlanGenerating(planId);
    const generated = await generateTripPlan(plan.request);
    await savePlanResult(planId, generated);

    await sendPlanReadyEmail({
      to: plan.email,
      planId,
      destination: plan.request.destination,
      locale: plan.request.locale,
    });
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error("credit generateAndDeliver failed", { planId, reason });
    await setPlanFailed(planId, reason).catch(() => undefined);
  }
}
