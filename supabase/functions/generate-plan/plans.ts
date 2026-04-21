// Supabase DB helpers for plan lifecycle operations in the Edge Function.
// Deno-native via npm: specifier.

import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2";
import type { PlanRecord, TripPlan } from "./types.ts";

const PLANS_TABLE = "plans";

let cached: SupabaseClient | null = null;
export function getSupabase(): SupabaseClient {
  if (cached) return cached;
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

/**
 * Atomic transition from 'paid' → 'generating'. Returns the row if we
 * successfully claimed the work; null if another instance already did.
 * This is the core idempotency guard.
 */
export async function claimPlanForGeneration(
  planId: string,
): Promise<PlanRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(PLANS_TABLE)
    .update({
      status: "generating",
      updated_at: new Date().toISOString(),
    })
    .eq("id", planId)
    .eq("status", "paid")
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(`claimPlanForGeneration failed: ${error.message}`);
  }
  return (data as PlanRecord | null) ?? null;
}

export async function savePlanResult(
  planId: string,
  plan: TripPlan,
): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from(PLANS_TABLE)
    .update({
      plan,
      status: "complete",
      generated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", planId);

  if (error) {
    throw new Error(`savePlanResult failed: ${error.message}`);
  }
}

export async function setPlanFailed(
  planId: string,
  reason: string,
): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from(PLANS_TABLE)
    .update({
      status: "failed",
      failure_reason: reason,
      updated_at: new Date().toISOString(),
    })
    .eq("id", planId);

  if (error) {
    console.error("setPlanFailed (non-fatal):", error.message);
  }
}
