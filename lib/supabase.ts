import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase admin client — server-only.
 *
 * Uses the service-role key, so this MUST never be imported into a client
 * component. All reads/writes go through our own API routes; buyer-facing
 * access to a plan is still gated by the unguessable UUID in /plan/[id].
 *
 * RLS is ENABLED on every public table (migration 0008) and there are no
 * policies, so anon/authenticated get nothing. This client works because
 * service_role bypasses RLS. If you ever need the browser to read a table
 * directly, add an explicit policy — do not disable RLS.
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
export const DESTINATION_PHOTO_CACHE_TABLE = "destination_photo_cache";
