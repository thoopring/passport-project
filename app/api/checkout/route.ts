import { NextRequest, NextResponse, after } from "next/server";
import { getPlan, markPlanPaid, setPlanGenerating, savePlanResult, setPlanFailed } from "../../../lib/plans";
import { createCheckoutUrl } from "../../../lib/lemonsqueezy";
import { consumePlanCredit, REFERRAL_COOKIE } from "../../../lib/referrals";
import { validatePromoCode, redeemPromoCode } from "../../../lib/promo";
import { generateTripPlan } from "../../../lib/generator/claude";
import { sendPlanReadyEmail } from "../../../lib/email";

// Promo path runs the full generator pipeline inside this route via
// after(). Founder direction (2026-04-30): quality > speed. With
// max_tokens bumped to 64k for Korean/Japanese plans and the optional
// Opus planner, the worst-case wall-clock can comfortably exceed 5
// minutes. Vercel Pro supports up to 800s on Fluid Compute, which
// gives room for 8-10 minute generations on the rare dense plan.
// If Vercel rejects 800 (plan tier), the deploy will surface the
// error and we cap at the actual ceiling.
export const runtime = "nodejs";
export const maxDuration = 800;

/**
 * LS discount code (pre-configured in the LS dashboard) that gives 25% off
 * the plan. Auto-applied at LS checkout when:
 *   - The buyer arrived via /r/CODE (referral cookie set), OR
 *   - The buyer has an unused 25%-off coupon on file (earned via someone
 *     else using their /r/CODE link).
 * Override per-environment via env so test stores can use a separate code.
 */
const REFERRAL_DISCOUNT_CODE =
  process.env.LEMON_SQUEEZY_REFERRAL_DISCOUNT_CODE || "REFERRAL25";

/**
 * POST /api/checkout
 * body: { planId: string }
 *
 * Discount paths:
 *   1. PROMO (100% off) — admin-issued promo with discount_type=free skips
 *      LS entirely. Used for marketing campaigns and comp plans.
 *   2. REFERRAL CREDIT (25% off) — buyer has earned a coupon from someone
 *      using their /r/CODE link. Routes through LS with REFERRAL25 applied.
 *   3. REFERRAL COOKIE (25% off) — first-time visitor arrived via /r/CODE.
 *      Routes through LS with REFERRAL25 applied.
 *   4. NORMAL — full price ($4) through LS.
 *
 * Paths 2 and 3 don't stack: one REFERRAL25 per checkout. If both apply,
 * the credit is consumed (precedence) and the cookie is unused.
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

    // 1. Promo code path — admin-issued 100% off codes (marketing/comp).
    //    Bypasses LS entirely. Non-free promos fall through to LS where
    //    they would need an LS-side discount code mirror (not used today).
    if (plan.request.promoCode) {
      const promo = await validatePromoCode(plan.request.promoCode);
      if (promo && promo.discount_type === "free") {
        const redeemed = await redeemPromoCode(plan.request.promoCode);
        if (redeemed) {
          await markPlanPaid(planId, `promo:${plan.request.promoCode}`);
          // Run generation after the response is sent. A bare
          // fire-and-forget Promise gets killed by Vercel as soon as the
          // serverless isolate returns — same trap the webhook route
          // hit on 2026-04-23. after() uses waitUntil under the hood
          // and keeps the function alive up to maxDuration (300s).
          after(async () => {
            try {
              await generateAndDeliver(planId);
            } catch (err) {
              console.error("Promo generation pipeline failed", { planId, err });
            }
          });
          const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://checkvisamap.com";
          return NextResponse.json({
            url: `${baseUrl}/plan/${planId}?paid=1`,
            // Signal to the client that LS was bypassed — caller should
            // redirect the current tab rather than opening a new one
            // (the new-tab pattern only makes sense for the external
            // LS hosted checkout).
            bypassedLS: true,
          });
        }
      }
    }

    // 2. Referral credit (25% off) — earned from a referee's purchase.
    //    Consume the credit and apply REFERRAL25 to LS.
    const consumedCredit = await consumePlanCredit(plan.email, planId);

    // 3. Referral cookie (25% off) — first-time visitor via /r/CODE.
    //    Only honored if no credit was consumed (credits take precedence,
    //    one discount per checkout — LS doesn't stack codes).
    const referralCookie = req.cookies.get(REFERRAL_COOKIE)?.value;

    const discountCode =
      consumedCredit || referralCookie ? REFERRAL_DISCOUNT_CODE : undefined;

    const url = await createCheckoutUrl({
      planId: plan.id,
      email: plan.email,
      destination: plan.request.destination,
      discountCode,
    });

    return NextResponse.json({
      url,
      referralApplied: Boolean(discountCode),
      creditApplied: consumedCredit,
    });
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
      travelerType: plan.request.travelerType,
    });
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error("credit generateAndDeliver failed", { planId, reason });
    await setPlanFailed(planId, reason).catch(() => undefined);
  }
}
