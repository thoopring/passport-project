import { NextRequest, NextResponse, after } from "next/server";
import { verifyWebhookSignature } from "../../../../lib/lemonsqueezy";
import {
  getPlan,
  markPlanPaid,
  setPlanGenerating,
  savePlanResult,
  setPlanFailed,
} from "../../../../lib/plans";
import { generateTripPlan } from "../../../../lib/generator/claude";
import { sendPlanReadyEmail, sendReferralCreditEarnedEmail } from "../../../../lib/email";
import { awardCredit, getRecentPlanLocale } from "../../../../lib/referrals";
import type { PlanLocale } from "../../../../types/trip-plan";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * POST /api/webhooks/lemon-squeezy
 *
 * Lemon Squeezy webhook receiver.
 *
 *   1. Verify HMAC signature
 *   2. On `order_created`: extract plan_id from custom data, mark paid
 *   3. Generate the plan via Claude (synchronous — Sonnet takes 20-40s)
 *   4. Persist + email the link
 *
 * If generation fails, mark the plan as failed so a manual refund can happen.
 *
 * NOTE: Lemon Squeezy expects a 200 response within ~30s on the webhook.
 * Sonnet generation takes 60-120s. We respond 200 immediately and run the
 * generation via Next.js `after()` — which uses Vercel's waitUntil under the
 * hood to keep the serverless function alive past the response, up to
 * maxDuration (Pro plan required for the 300s ceiling).
 *
 * DO NOT replace `after()` with a bare fire-and-forget promise — Vercel
 * terminates the isolate as soon as the response is sent, and the background
 * work silently dies (observed 2026-04-23: plan stuck at status=paid with
 * no generating transition).
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let event: {
    meta?: { event_name?: string; custom_data?: { plan_id?: string } };
    data?: { id?: string };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const eventName = event?.meta?.event_name;
  const planId = event?.meta?.custom_data?.plan_id;
  const paymentId = event?.data?.id ?? "unknown";

  if (eventName !== "order_created") {
    return NextResponse.json({ ok: true, ignored: eventName });
  }

  if (!planId) {
    return NextResponse.json(
      { error: "Missing plan_id in custom_data" },
      { status: 400 }
    );
  }

  // Run generation after the 200 response is sent. `after()` keeps the
  // serverless function alive via waitUntil; without it, Vercel kills the
  // isolate and a bare fire-and-forget promise never completes.
  after(async () => {
    try {
      await generateAndDeliver(planId, paymentId);
    } catch (err) {
      console.error("Plan generation pipeline failed", { planId, err });
    }
  });

  return NextResponse.json({ ok: true });
}

async function generateAndDeliver(planId: string, paymentId: string): Promise<void> {
  try {
    await markPlanPaid(planId, paymentId);

    const plan = await getPlan(planId);
    if (!plan) throw new Error(`Plan ${planId} not found after payment`);

    await setPlanGenerating(planId);
    const generated = await generateTripPlan(plan.request);
    await savePlanResult(planId, generated);

    await sendPlanReadyEmail({
      to: plan.email,
      planId,
      destination: plan.request.destination,
      locale: plan.request.locale,
    });

    // Award referral credit if this purchase came from a /r/[code] click (P9)
    // and notify the inviter via email (N5). Email failures are non-fatal —
    // the credit is already in the inviter's account, they'll see it next
    // time they visit /account.
    if (plan.request.referredByCode) {
      const ownerEmail = await awardCredit(
        plan.request.referredByCode,
        plan.email,
      ).catch((err) => {
        console.error("awardCredit failed (non-fatal)", { planId, err });
        return null;
      });
      if (ownerEmail) {
        const ownerLocale =
          (await getRecentPlanLocale(ownerEmail).catch(() => null)) ?? "en";
        await sendReferralCreditEarnedEmail({
          to: ownerEmail,
          locale: ownerLocale as PlanLocale,
        }).catch((err) => {
          console.error("sendReferralCreditEarnedEmail failed (non-fatal)", {
            planId,
            err,
          });
        });
      }
    }
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error("generateAndDeliver failed", { planId, reason });
    await setPlanFailed(planId, reason).catch(() => undefined);
  }
}
