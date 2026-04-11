import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase admin client — server-only.
 *
 * Uses the service-role key, so this MUST never be imported into a client
 * component. The plans table relies on URL-secret UUIDs for access; we don't
 * use RLS for the MVP because all reads/writes go through our own API routes.
 *
 * Required env vars:
 *   SUPABASE_URL              project URL
 *   SUPABASE_SERVICE_ROLE_KEY service-role secret (NOT the anon key)
 */

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export const PLANS_TABLE = "plans";
