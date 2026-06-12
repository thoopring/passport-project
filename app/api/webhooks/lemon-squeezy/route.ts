import { NextRequest, NextResponse, after } from "next/server";
import { verifyWebhookSignature } from "../../../../lib/lemonsqueezy";
import {
  getPlan,
  markPlanPaid,
  setPlanGenerating,
  savePlanResult,
  savePlanRoutePolylines,
  setPlanFailed,
} from "../../../../lib/plans";
import { generateTripPlan } from "../../../../lib/generator/claude";
import { computeRoutePolylines } from "../../../../lib/mapbox-directions";
import { sendPlanReadyEmail, sendReferralCreditEarnedEmail } from "../../../../lib/email";
import { ensureDestinationPhotos } from "../../../../lib/destinations/auto-fetch";
import { awardCredit, getRecentPlanLocale } from "../../../../lib/referrals";
import type { PlanLocale } from "../../../../types/trip-plan";

export const runtime = "nodejs";
// Bumped to 800 alongside /api/checkout — quality-first path uses
// max_tokens=64k for Korean/Japanese, optional Opus planner, etc.
// 8-10 min worst-case generation needs the Vercel Pro Fluid Compute
// ceiling.
export const maxDuration = 800;

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
    // Idempotency guard: LS retries webhooks on timeout/non-2xx responses,
    // and any duplicate delivery would otherwise fire a second Claude call
    // and overwrite the plan. markPlanPaid is an atomic draft → paid claim:
    // only the first caller wins (returns true). A false return means the
    // plan already passed the draft gate, so we skip the rest of the
    // pipeline. Distinguish a missing plan from a duplicate by reading once.
    const claimed = await markPlanPaid(planId, paymentId);
    if (!claimed) {
      const existing = await getPlan(planId);
      if (!existing) throw new Error(`Plan ${planId} not found`);
      console.warn("[webhook] duplicate delivery — skipping", {
        planId,
        currentStatus: existing.status,
      });
      return;
    }

    const plan = await getPlan(planId);
    if (!plan) throw new Error(`Plan ${planId} not found after payment`);

    await setPlanGenerating(planId);
    const generated = await generateTripPlan(plan.request);
    await savePlanResult(planId, generated);

    // Best-effort: compute Mapbox Directions polylines for the plan. Free
    // tier (100k req/month) covers ~3,300 plans/month at ~30 calls each.
    // Failure (rate-limit, bad coords, missing migration column) is logged
    // and the plan still ships — PlanMap falls back to straight lines.
    try {
      const allCoords = generated.days
        .flatMap((d) => d.stops)
        .map((s) => s.coords);
      const polylines = await computeRoutePolylines(allCoords);
      await savePlanRoutePolylines(planId, polylines);
    } catch (err) {
      console.warn("[webhook] polyline computation failed (non-fatal)", { planId, err });
    }

    // Cold-start photo fetch — for destinations not in the curated
    // /public/destinations catalog. Searches Unsplash, caches result.
    // Non-fatal; plan still ships if Unsplash is unavailable.
    try {
      await ensureDestinationPhotos(
        generated.destination,
        generated.days.length,
      );
    } catch (err) {
      console.warn("[webhook] cold-start photo fetch failed (non-fatal)", {
        planId,
        err,
      });
    }

    await sendPlanReadyEmail({
      to: plan.email,
      planId,
      destination: plan.request.destination,
      locale: plan.request.locale,
      travelerType: plan.request.travelerType,
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
