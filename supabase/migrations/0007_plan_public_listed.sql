-- Trip Planner — public listing opt-in
--
-- Phase 0 of the community-sharing plan (docs/COMMUNITY-SHARING-PLAN.md).
-- Adds an opt-in flag so paid plans can show up in a public gallery.
-- The gallery itself ships in Phase 1, after we have ≥5 plans with
-- public_listed=true. Shipping the toggle first lets every paid buyer
-- opt in immediately and gives Phase 1 a non-empty gallery to launch.
--
-- Default OFF — privacy by default. The /plan/[id] view never publishes
-- a plan implicitly; the buyer has to flip the toggle.
--
-- We do NOT add published_at, view_count, or heart_count yet. Those
-- columns land alongside the features that consume them (Phase 2).
-- Don't over-schema before shipping.
--
-- Run in Supabase Dashboard → SQL Editor → New query.
-- Or: supabase db push (CLI).

alter table public.plans
  add column if not exists public_listed boolean not null default false;

create index if not exists plans_public_listed_idx
  on public.plans (public_listed) where public_listed = true;
-- Partial index: queries are always "where public_listed = true ORDER
-- BY created_at desc" for the gallery feed. A partial index on the
-- truthy rows keeps the index small (most rows will stay false).
