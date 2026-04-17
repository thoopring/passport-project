-- Trip Planner — promo_codes table (P10)
--
-- Run this in the Supabase SQL editor AFTER 0002_referrals.sql.
--
-- Marketing free-codes for the trip planner. v1 supports only the "free"
-- discount type — code redemption skips LemonSqueezy entirely and credits
-- a free plan via the same path as referrals.
--
-- Percent/fixed discounts are wired up in the schema but not yet consumed
-- by the checkout route — those would route through LemonSqueezy preset
-- discount codes which the user creates in the LS dashboard.
--
-- Admin: insert codes manually via Supabase SQL editor:
--   insert into promo_codes (code, discount_type, max_redemptions, expires_at)
--   values ('LAUNCH50', 'free', 50, now() + interval '30 days');

create table if not exists public.promo_codes (
  code              text primary key,
  discount_type     text not null
                    check (discount_type in ('free','percent','fixed')),
  discount_value    numeric not null default 0,
  max_redemptions   integer,
  redeemed_count    integer not null default 0,
  expires_at        timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Note: `code` is PRIMARY KEY so lookups by code are already O(log n).
-- A partial index with `expires_at > now()` is rejected by Postgres
-- (functions in index predicates must be IMMUTABLE; now() is STABLE),
-- and redundant with the PK anyway. Expiry is filtered at query time.

drop trigger if exists promo_codes_set_updated_at on public.promo_codes;
create trigger promo_codes_set_updated_at
  before update on public.promo_codes
  for each row execute function public.tg_set_updated_at();
