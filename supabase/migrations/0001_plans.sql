-- Trip Planner — plans table
--
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Or via supabase CLI: supabase db push
--
-- Access pattern:
--   - All reads/writes happen through our API routes using the SERVICE ROLE key.
--   - Plan IDs are unguessable UUIDs and act as access tokens.
--   - We do not enable RLS for the MVP because no anon access is needed.

create extension if not exists "pgcrypto";

create table if not exists public.plans (
  id              uuid primary key default gen_random_uuid(),
  email           text not null,
  request         jsonb not null,
  plan            jsonb,
  status          text not null default 'draft'
                  check (status in ('draft','paid','generating','complete','failed','refunded')),
  payment_id      text,
  paid_at         timestamptz,
  generated_at    timestamptz,
  failure_reason  text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists plans_email_idx on public.plans (email);
create index if not exists plans_status_idx on public.plans (status);
create index if not exists plans_created_at_idx on public.plans (created_at desc);

-- Auto-update updated_at on row update
create or replace function public.tg_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists plans_set_updated_at on public.plans;
create trigger plans_set_updated_at
  before update on public.plans
  for each row execute function public.tg_set_updated_at();
