import { NextRequest, NextResponse } from "next/server";
import { getPlan, setPlanFailed } from "../../../../../lib/plans";

export const runtime = "nodejs";

/**
 * If a plan stays in 'paid' or 'generating' for longer than this without
 * advancing, the generator pipeline almost certainly died (Vercel killed
 * the function at maxDuration, network hiccup, etc.). The polling client
 * would otherwise wait forever staring at a frozen progress bar. We
 * proactively flip the plan to 'failed' on the next status check so the
 * client sees a real terminal state and can show the refund message.
 *
 * Threshold = maxDuration (300s) + a generous buffer for any background
 * post-processing. Set to 10 minutes — long enough that we never kill a
 * still-running pipeline, short enough that an abandoned plan doesn't
 * keep a buyer staring for 30+ minutes.
 */
const STALE_PLAN_MS = 10 * 60 * 1000;

/**
 * GET /api/plan/[id]/status
 *
 * Lightweight status probe used by the post-payment wait screen to poll for
 * generation completion. Returns only what the client needs to decide whether
 * to redirect, without shipping the full plan JSON over the wire every 4s.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const record = await getPlan(id);
  if (!record) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  // Stale-plan rescue. Fire-and-forget the DB write; even if it races with
  // a recovering pipeline, setPlanFailed only flips status — savePlanResult
  // would still overwrite to 'complete' if the generator somehow comes back.
  if (record.status === "paid" || record.status === "generating") {
    const reference = record.updated_at || record.paid_at || record.created_at;
    const ageMs = Date.now() - new Date(reference).getTime();
    if (ageMs > STALE_PLAN_MS) {
      console.warn("[status] auto-failing stale plan", { planId: id, ageMs });
      await setPlanFailed(id, "Generation exceeded the time limit").catch(
        (err) => console.error("[status] auto-fail write failed", err),
      );
      return NextResponse.json(
        {
          status: "failed",
          failureReason: "Plan generation timed out. A refund will be issued automatically.",
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
  }

  return NextResponse.json(
    {
      status: record.status,
      failureReason: record.failure_reason,
    },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}
