// Minimal referral credit handler for the Edge Function.
// Only awardCredit is needed — other referral ops stay in the Next.js app.

import { getSupabase } from "./plans.ts";

const REFERRALS_TABLE = "referrals";
const CREDITS_TABLE = "plan_credits";

interface ReferralRow {
  id: string;
  code: string;
  owner_email: string;
  redeemed_count: number;
  credits_earned: number;
}

async function getReferralByCode(code: string): Promise<ReferralRow | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(REFERRALS_TABLE)
    .select("id, code, owner_email, redeemed_count, credits_earned")
    .eq("code", code.toUpperCase())
    .maybeSingle();
  if (error) throw new Error(`getReferralByCode failed: ${error.message}`);
  return (data as ReferralRow | null) ?? null;
}

/**
 * Award a referral credit to the owner of `code` because `buyerEmail` just
 * paid. No-op if buyer is the owner (self-referral) or code is unknown.
 */
export async function awardCredit(
  code: string,
  buyerEmail: string,
): Promise<void> {
  const supabase = getSupabase();
  const normalizedBuyer = buyerEmail.trim().toLowerCase();

  const referral = await getReferralByCode(code);
  if (!referral) return;
  if (referral.owner_email === normalizedBuyer) return; // self-referral guard

  // Credit row expires in 1 year
  const expiresAt = new Date(
    Date.now() + 365 * 24 * 60 * 60 * 1000,
  ).toISOString();

  const { error: creditErr } = await supabase.from(CREDITS_TABLE).insert({
    email: referral.owner_email,
    source: "referral",
    source_ref: referral.code,
    expires_at: expiresAt,
  });
  if (creditErr) {
    throw new Error(`insert plan_credit failed: ${creditErr.message}`);
  }

  const { error: updateErr } = await supabase
    .from(REFERRALS_TABLE)
    .update({
      redeemed_count: referral.redeemed_count + 1,
      credits_earned: referral.credits_earned + 1,
    })
    .eq("id", referral.id);
  if (updateErr) {
    throw new Error(
      `update referral counters failed: ${updateErr.message}`,
    );
  }
}
