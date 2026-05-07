import { getSupabaseAdmin, PLANS_TABLE } from "./supabase";
import type {
  PlanRecord,
  PlanRequest,
  PlanStatus,
  TripPlan,
} from "../types/trip-plan";

/**
 * Plan repository — all plan reads/writes go through here.
 *
 * Schema (Supabase plans table):
 *   id                uuid primary key default gen_random_uuid()
 *   email             text not null
 *   request           jsonb not null
 *   plan              jsonb
 *   status            text not null default 'draft'
 *   payment_id        text
 *   paid_at           timestamptz
 *   generated_at     timestamptz
 *   failure_reason    text
 *   created_at        timestamptz not null default now()
 *   updated_at        timestamptz not null default now()
 */

export async function createDraftPlan(request: PlanRequest): Promise<PlanRecord> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(PLANS_TABLE)
    .insert({
      email: request.email,
      request,
      status: "draft" as PlanStatus,
    })
    .select()
    .single();

  if (error) throw new Error(`createDraftPlan failed: ${error.message}`);
  return data as PlanRecord;
}

export async function getPlan(id: string): Promise<PlanRecord | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(PLANS_TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`getPlan failed: ${error.message}`);
  return (data as PlanRecord | null) ?? null;
}

export async function markPlanPaid(id: string, paymentId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from(PLANS_TABLE)
    .update({
      status: "paid" as PlanStatus,
      payment_id: paymentId,
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(`markPlanPaid failed: ${error.message}`);
}

export async function setPlanGenerating(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from(PLANS_TABLE)
    .update({
      status: "generating" as PlanStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(`setPlanGenerating failed: ${error.message}`);
}

export async function savePlanResult(id: string, plan: TripPlan): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from(PLANS_TABLE)
    .update({
      plan,
      status: "complete" as PlanStatus,
      generated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(`savePlanResult failed: ${error.message}`);
}

/**
 * Persists Mapbox Directions polylines for the plan. Best-effort — if the
 * column doesn't exist yet (migration 0004 not applied), or the write
 * fails for any other reason, we log and continue. Plan still works
 * with the existing straight-line fallback in PlanMap.
 */
export async function savePlanRoutePolylines(
  id: string,
  polylines: unknown,
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from(PLANS_TABLE)
    .update({ route_polylines: polylines, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    // Most common cause: migration 0004 not yet applied. Don't throw —
    // the plan itself is fine; only the visual upgrade is missing.
    console.warn(
      `[plans] savePlanRoutePolylines best-effort failed (${error.message}); plan still valid without polylines`,
    );
  }
}

/**
 * Maps a raw error message to a sanitized, customer-safe category.
 *
 * Pre-launch debug mode: when DEBUG_RAW_FAILURES=true, the raw error
 * message is preserved (truncated) so the founder can diagnose without
 * needing Vercel function logs. Default falls back to the curated
 * categories below for production.
 *
 * The raw message can contain stack-trace fragments, Supabase column
 * names, internal IDs, or third-party API details — that's the point
 * during debug, exactly what we don't want in production.
 */
function sanitizeFailureReason(reason: string): string {
  if (process.env.DEBUG_RAW_FAILURES === "true") {
    return reason.slice(0, 500); // truncate just in case
  }
  const m = reason.toLowerCase();
  if (m.includes("timeout") || m.includes("timed out")) {
    return "Generation timed out. A refund will be issued automatically.";
  }
  if (m.includes("rate") && (m.includes("limit") || m.includes("exceeded"))) {
    return "Service was temporarily busy. A refund will be issued automatically.";
  }
  if (m.includes("invalid") || m.includes("schema") || m.includes("parse")) {
    return "Plan generation returned an unexpected format. A refund will be issued automatically.";
  }
  if (m.includes("not found")) {
    return "Plan record could not be located. Please contact support.";
  }
  return "Plan generation failed. A refund will be issued automatically.";
}

/**
 * Atomically consume the plan's single free re-do allowance.
 *
 * Returns the updated PlanRecord on success, or null if the regen was
 * NOT consumed because:
 *   - regen_used was already true (someone clicked twice / race), or
 *   - status was not 'complete' (plan still generating, or failed)
 *
 * Caller treats null as "tell the user this plan can't be regenerated
 * right now". The atomic .eq() filters guarantee no double-consume even
 * under concurrent submission.
 *
 * Side effects on success: regen_used → true, regen_feedback stored,
 * status flipped back to 'generating' so the existing /plan/[id] page
 * routes to the wait UI without any extra wiring.
 */
export async function consumeRegen(
  id: string,
  feedback: string,
): Promise<PlanRecord | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(PLANS_TABLE)
    .update({
      regen_used: true,
      regen_feedback: feedback,
      status: "generating" as PlanStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("regen_used", false)
    .eq("status", "complete")
    .select()
    .maybeSingle();

  if (error) throw new Error(`consumeRegen failed: ${error.message}`);
  return (data as PlanRecord | null) ?? null;
}

export async function setPlanFailed(id: string, reason: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const safeReason = sanitizeFailureReason(reason);
  const { error } = await supabase
    .from(PLANS_TABLE)
    .update({
      status: "failed" as PlanStatus,
      failure_reason: safeReason,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(`setPlanFailed failed: ${error.message}`);
}
