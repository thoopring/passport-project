import { NextRequest, NextResponse, after } from "next/server";
import {
  consumeRegen,
  savePlanResult,
  savePlanRoutePolylines,
  setPlanFailed,
} from "../../../../../lib/plans";
import { generateTripPlan } from "../../../../../lib/generator/claude";
import { computeRoutePolylines } from "../../../../../lib/mapbox-directions";
import { sendPlanReadyEmail } from "../../../../../lib/email";
import { ensureDestinationPhotos } from "../../../../../lib/destinations/auto-fetch";

export const runtime = "nodejs";
// Same ceiling as the webhook generator pipeline (Vercel Pro Fluid
// Compute). Regenerate runs the full Opus + Sonnet pipeline and can
// take 5-10 minutes for Korean/Japanese long plans.
export const maxDuration = 800;

/**
 * POST /api/plan/[id]/regenerate
 *
 * Customer-triggered "one free re-do" — regenerates the plan with new
 * user feedback as additional prompt context. Only allowed once per
 * plan (regen_used flips to true, atomic).
 *
 * Driven by user-interview feedback (2026-05-07): customers won't pay
 * $4 because they fear "맘에 안 들면 끝" — one re-do removes that
 * tail-risk and is teased on the review screen as a trust signal.
 *
 * Flow mirrors the webhook generator path:
 *   1. Validate body { feedback }
 *   2. Atomically consume regen + flip status to 'generating'
 *   3. Return 200 immediately so the client can router.refresh() and
 *      land on the existing wait UI (PostPaymentWait, triggered by
 *      status='generating' on /plan/[id])
 *   4. after() runs the actual regeneration in the background, exactly
 *      like the LS webhook does for first-pay generation
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let body: { feedback?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const feedback = (body.feedback ?? "").trim();
  if (feedback.length < 4 || feedback.length > 1000) {
    return NextResponse.json(
      { error: "Feedback must be 4-1000 characters" },
      { status: 400 },
    );
  }

  // Atomic consume — only succeeds if regen_used was false AND status
  // was 'complete'. Filters live in the SQL update, so two concurrent
  // submissions can't both win.
  const consumed = await consumeRegen(id, feedback).catch((err) => {
    console.error("[regenerate] consumeRegen threw", { id, err });
    return null;
  });
  if (!consumed) {
    return NextResponse.json(
      {
        error:
          "Plan can't be regenerated right now (already used, still generating, or failed).",
      },
      { status: 409 },
    );
  }

  // Background regen. Same pattern as the LS webhook so failures
  // can't kill the response.
  after(async () => {
    try {
      // Build a request that carries the user's "what should change"
      // input as supplementary notes. Kept as a labeled section so the
      // generator can distinguish original notes from regen guidance
      // and weight the feedback strongly.
      const originalNotes = consumed.request.notes?.trim() ?? "";
      const augmentedNotes = [
        originalNotes,
        `--- USER FEEDBACK ON PREVIOUS PLAN (regenerate) ---`,
        feedback,
        `--- Please address this feedback in the new plan ---`,
      ]
        .filter(Boolean)
        .join("\n\n");

      const augmentedRequest = {
        ...consumed.request,
        notes: augmentedNotes,
      };

      const regenerated = await generateTripPlan(augmentedRequest);
      await savePlanResult(id, regenerated);

      // Recompute polylines for the new plan (stops moved). Best-effort.
      try {
        const allCoords = regenerated.days
          .flatMap((d) => d.stops)
          .map((s) => s.coords);
        const polylines = await computeRoutePolylines(allCoords);
        await savePlanRoutePolylines(id, polylines);
      } catch (err) {
        console.warn("[regenerate] polyline recompute failed (non-fatal)", {
          id,
          err,
        });
      }

      // Cold-start photo fetch — destination didn't change, so this
      // hits the cache and short-circuits cheaply if already populated.
      try {
        await ensureDestinationPhotos(
          regenerated.destination,
          regenerated.days.length,
        );
      } catch (err) {
        console.warn("[regenerate] photo fetch failed (non-fatal)", {
          id,
          err,
        });
      }

      // Re-deliver the email so the buyer knows their refreshed plan
      // is ready. Same template as initial delivery — the link is the
      // same (plan UUID is stable), just the content underneath
      // changed.
      await sendPlanReadyEmail({
        to: consumed.email,
        planId: id,
        destination: regenerated.destination,
        locale: consumed.request.locale,
        travelerType: consumed.request.travelerType,
      }).catch((err) => {
        console.warn("[regenerate] email re-send failed (non-fatal)", {
          id,
          err,
        });
      });
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      console.error("[regenerate] generation failed", { id, reason });
      await setPlanFailed(id, reason).catch(() => undefined);
    }
  });

  return NextResponse.json({ ok: true });
}
