import { customAlphabet } from "nanoid";
import { getSupabaseAdmin } from "./supabase";

/**
 * Referral program (P9).
 *
 * Two tables:
 *   - referrals: one per buyer email, with a unique 8-char code
 *   - plan_credits: unused credit rows that bypass LemonSqueezy at checkout
 *
 * Flow:
 *   buyer A purchases → getOrCreateReferralCode(A.email) returns code XYZ
 *   A shares /r/XYZ → /r route sets `ref_code` cookie on visitor B
 *   B creates draft → request.referredByCode is set from cookie
 *   B pays → awardCredit(XYZ, B.email) inserts a plan_credit row for A
 *   A starts a new plan → /api/checkout calls consumePlanCredit(A.email)
 *     which finds an unused credit and marks it used, returning true
 *     (meaning skip LS, mark plan paid directly)
 */

export const REFERRAL_COOKIE = "ref_code";
const codeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion
const generateCode = customAlphabet(codeAlphabet, 8);

const REFERRALS_TABLE = "referrals";
const CREDITS_TABLE = "plan_credits";

interface ReferralRow {
  id: string;
  code: string;
  owner_email: string;
  redeemed_count: number;
  credits_earned: number;
  created_at: string;
  updated_at: string;
}

/**
 * Get or create a referral code for the given email. Idempotent — calling
 * twice for the same email returns the same code.
 */
export async function getOrCreateReferralCode(email: string): Promise<string> {
  const supabase = getSupabaseAdmin();
  const normalized = email.trim().toLowerCase();

  const { data: existing, error: lookupErr } = await supabase
    .from(REFERRALS_TABLE)
    .select("code")
    .eq("owner_email", normalized)
    .maybeSingle();

  if (lookupErr) throw new Error(`lookup referral failed: ${lookupErr.message}`);
  if (existing) return (existing as { code: string }).code;

  // Try a few times in case of code collision (vanishingly rare with 32^8 space)
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    const { error: insertErr } = await supabase
      .from(REFERRALS_TABLE)
      .insert({ code, owner_email: normalized });

    if (!insertErr) return code;

    // Unique constraint violation on code? Retry. Anything else? Bail.
    if (!insertErr.message.toLowerCase().includes("duplicate")) {
      throw new Error(`insert referral failed: ${insertErr.message}`);
    }
  }
  throw new Error("Could not generate a unique referral code after 5 attempts");
}

/** Look up a referral by its public code. Returns null if unknown. */
export async function getReferralByCode(code: string): Promise<ReferralRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(REFERRALS_TABLE)
    .select("*")
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
  const supabase = getSupabaseAdmin();
  const normalizedBuyer = buyerEmail.trim().toLowerCase();

  const referral = await getReferralByCode(code);
  if (!referral) return;
  if (referral.owner_email === normalizedBuyer) return; // self-referral guard

  // Insert the credit row
  const { error: creditErr } = await supabase.from(CREDITS_TABLE).insert({
    email: referral.owner_email,
    source: "referral",
    source_ref: referral.code,
    expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  });
  if (creditErr) throw new Error(`insert plan_credit failed: ${creditErr.message}`);

  // Bump the counters on the referral row
  const { error: updateErr } = await supabase
    .from(REFERRALS_TABLE)
    .update({
      redeemed_count: referral.redeemed_count + 1,
      credits_earned: referral.credits_earned + 1,
    })
    .eq("id", referral.id);
  if (updateErr) throw new Error(`update referral counters failed: ${updateErr.message}`);
}

/**
 * Try to consume an unused credit for `email`. Returns true if a credit was
 * consumed (caller should skip LemonSqueezy and mark the plan paid directly).
 * Marks the credit row as used and stamps `used_for_plan_id`.
 */
export async function consumePlanCredit(
  email: string,
  planId: string,
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const normalized = email.trim().toLowerCase();

  // Find the oldest unused, non-expired credit for this email
  const { data: credit, error: lookupErr } = await supabase
    .from(CREDITS_TABLE)
    .select("id, expires_at")
    .eq("email", normalized)
    .is("used_at", null)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (lookupErr) throw new Error(`lookup credit failed: ${lookupErr.message}`);
  if (!credit) return false;

  // Expired?
  const c = credit as { id: string; expires_at: string | null };
  if (c.expires_at && new Date(c.expires_at) < new Date()) return false;

  const { error: updateErr } = await supabase
    .from(CREDITS_TABLE)
    .update({
      used_at: new Date().toISOString(),
      used_for_plan_id: planId,
    })
    .eq("id", c.id)
    .is("used_at", null); // race-safe: only update if still unused

  if (updateErr) throw new Error(`consume credit failed: ${updateErr.message}`);
  return true;
}
