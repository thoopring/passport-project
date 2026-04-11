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

export async function setPlanFailed(id: string, reason: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from(PLANS_TABLE)
    .update({
      status: "failed" as PlanStatus,
      failure_reason: reason,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(`setPlanFailed failed: ${error.message}`);
}
