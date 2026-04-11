import { getSupabaseAdmin } from "./supabase";

/**
 * Promo code validation + redemption (P10).
 *
 * v1 only supports `discount_type = 'free'` (which skips LemonSqueezy via
 * the same path as a referral credit). Percent/fixed discounts are wired
 * into the schema but consumed via LemonSqueezy preset discounts in the LS
 * dashboard, not via this code.
 *
 * Race-safety: redeemPromoCode does an atomic increment-and-check via the
 * RPC pattern (a single update with a WHERE clause that includes the
 * remaining-redemptions guard). We rely on a single round-trip update
 * returning the affected row count.
 */

const PROMO_TABLE = "promo_codes";

export interface PromoCodeRow {
  code: string;
  discount_type: "free" | "percent" | "fixed";
  discount_value: number;
  max_redemptions: number | null;
  redeemed_count: number;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Look up a promo code and verify it's currently valid (not expired and
 * has remaining redemptions). Returns the row if valid, null otherwise.
 */
export async function validatePromoCode(rawCode: string): Promise<PromoCodeRow | null> {
  const code = rawCode.trim().toUpperCase();
  if (!code) return null;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(PROMO_TABLE)
    .select("*")
    .eq("code", code)
    .maybeSingle();

  if (error) throw new Error(`validatePromoCode failed: ${error.message}`);
  if (!data) return null;

  const row = data as PromoCodeRow;

  if (row.expires_at && new Date(row.expires_at) < new Date()) return null;
  if (row.max_redemptions !== null && row.redeemed_count >= row.max_redemptions) return null;

  return row;
}

/**
 * Atomically redeem a promo code: increment redeemed_count, but only if
 * still under the max. Returns true on success, false if the code was
 * exhausted between validation and redemption (race condition).
 */
export async function redeemPromoCode(code: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const normalized = code.trim().toUpperCase();

  // Fetch current state to compute the new value
  const { data: row, error: fetchErr } = await supabase
    .from(PROMO_TABLE)
    .select("redeemed_count, max_redemptions")
    .eq("code", normalized)
    .maybeSingle();
  if (fetchErr) throw new Error(`promo fetch failed: ${fetchErr.message}`);
  if (!row) return false;

  const current = row as { redeemed_count: number; max_redemptions: number | null };
  if (current.max_redemptions !== null && current.redeemed_count >= current.max_redemptions) {
    return false;
  }

  // Race-safe update: only increment if redeemed_count is still what we read.
  const { data: updated, error: updateErr } = await supabase
    .from(PROMO_TABLE)
    .update({ redeemed_count: current.redeemed_count + 1 })
    .eq("code", normalized)
    .eq("redeemed_count", current.redeemed_count)
    .select("redeemed_count");

  if (updateErr) throw new Error(`promo redemption failed: ${updateErr.message}`);
  return Array.isArray(updated) && updated.length > 0;
}
