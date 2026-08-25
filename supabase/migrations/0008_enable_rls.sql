-- 0008_enable_rls.sql
--
-- SECURITY FIX (2026-08-05) — Supabase alert `rls_disabled_in_public`.
--
-- Background:
--   0001_plans.sql shipped with "we do not enable RLS for the MVP because no
--   anon access is needed". That reasoning was wrong the moment we added
--   magic-link auth: lib/supabase-browser.ts publishes
--   NEXT_PUBLIC_SUPABASE_ANON_KEY into the client bundle, so the anon key is
--   readable by anyone who views source. With RLS off, Supabase's default
--   grants let that key read AND write every table in `public`.
--
--   Verified live on 2026-08-05 with the key scraped from the production
--   bundle: GET plans -> 206 (37 rows), referrals -> 5, promo_codes -> 3,
--   destination_photo_cache -> 2; PATCH and DELETE both returned 204.
--   i.e. any visitor could dump every buyer email + paid plan, or wipe them.
--
-- Why enabling RLS with zero policies is safe here:
--   Every server-side read/write goes through getSupabaseAdmin() (service
--   role) or the Edge Function's service-role client, and service_role
--   bypasses RLS. The browser client only ever calls auth.* — never .from()
--   on a public table (checked across app/, components/, lib/). So "RLS on,
--   no policies" locks out anon/authenticated while leaving the app intact.
--
--   Access control for buyers is unchanged: plans are reachable only via the
--   unguessable UUID in /plan/[id], served by our own routes.
--
-- Loop over every table rather than naming the five we know about, so tables
-- created ad hoc in the dashboard (not represented in this migrations dir)
-- are covered too. Re-running this is a no-op.

do $$
declare
  r record;
begin
  for r in
    select schemaname, tablename
      from pg_tables
     where schemaname = 'public'
  loop
    execute format(
      'alter table %I.%I enable row level security', r.schemaname, r.tablename);
    -- Defence in depth: even if RLS is ever toggled off again, the grants
    -- are gone, so PostgREST returns 401/403 instead of the whole table.
    execute format(
      'revoke all on table %I.%I from anon, authenticated', r.schemaname, r.tablename);
  end loop;

  -- Views cannot carry RLS; revoking the grant is the only lever.
  for r in
    select schemaname, viewname
      from pg_views
     where schemaname = 'public'
  loop
    execute format(
      'revoke all on table %I.%I from anon, authenticated', r.schemaname, r.viewname);
  end loop;
end $$;

-- Future tables created by this role start locked down too. Note this only
-- applies to objects created by the role that runs it (postgres), which is
-- what both the SQL editor and the CLI use.
alter default privileges in schema public
  revoke all on tables from anon, authenticated;
