-- Trip Planner — free re-do tracking
--
-- Adds two columns to plans so we can offer "one free regenerate per
-- plan" without losing track of who's used theirs. Driven by user
-- interview feedback (2026-05-07): customers refuse to pay $4 because
-- they don't trust the AI will match their taste on the first shot.
-- One free re-do removes that risk-of-buyer's-remorse and turns "맘에
-- 안 들면 끝이라는 risk" into "마음에 안 들면 한 번 다시 짜드려요".
--
-- regen_used      — true when this plan has consumed its single free
--                   regenerate. We use a boolean (not a counter) because
--                   v1 only allows one free re-do; if we expand to paid
--                   re-dos later, swap to int.
-- regen_feedback  — the user's free-text "what should change" input,
--                   appended to the regen prompt as guidance. Kept on
--                   the row so we can audit prompt → output quality
--                   without log diving.
--
-- Run in Supabase Dashboard → SQL Editor → New query.
-- Or: supabase db push (CLI).

alter table public.plans
  add column if not exists regen_used boolean not null default false,
  add column if not exists regen_feedback text;
