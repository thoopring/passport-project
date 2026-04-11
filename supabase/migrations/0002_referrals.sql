-- Trip Planner — referrals + plan_credits tables (P9)
--
-- Run this in the Supabase SQL editor AFTER 0001_plans.sql.
--
-- Flow:
--   1. Buyer A purchases a plan. We auto-create a `referrals` row keyed by
--      A's email with a unique 8-char code.
--   2. A shares /r/{code}. The /r/[code] route sets a `ref_code` cookie on
--      visitor B and redirects to /.
--   3. When B creates a draft (POST /api/plan/draft) we read the cookie and
--      stash `referred_by_code` on the plan record (in `request.referredByCode`).
--   4. On B's successful payment webhook, if `referred_by_code` is set AND
--      the buyer's email != owner_email of that code, we increment the
--      referrals row counters AND insert a `plan_credits` row for A.
--   5. When A starts their next plan and reaches checkout, /api/checkout
--      checks for an unused plan_credit on their email. If one exists, we
--      skip Lemon Squeezy entirely, mark the plan paid, and consume the
--      credit.

create table if not exists public.referrals (
  id              uuid primary key default gen_random_uuid(),
  code            text not null unique,
  owner_email     text not null,
  redeemed_count  integer not null default 0,
  credits_earned  integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create unique index if not exists referrals_code_idx on public.referrals (code);
create index if not exists referrals_owner_email_idx on public.referrals (owner_email);

drop trigger if exists referrals_set_updated_at on public.referrals;
create trigger referrals_set_updated_at
  before update on public.referrals
  for each row execute function public.tg_set_updated_at();

create table if not exists public.plan_credits (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  source      text not null check (source in ('referral','promo','admin')),
  source_ref  text, -- referral code or promo code that issued this credit
  used_at     timestamptz,
  used_for_plan_id uuid references public.plans(id),
  expires_at  timestamptz,
  created_at  timestamptz not null default now()
);

create index if not exists plan_credits_email_idx on public.plan_credits (email);
create index if not exists plan_credits_unused_idx
  on public.plan_credits (email)
  where used_at is null;
