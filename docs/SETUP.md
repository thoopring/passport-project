# Trip Planner Setup Guide

This is the setup guide for the AI trip planner on `checkvisamap.com`. Follow it
top-to-bottom to provision every third-party account, install dependencies, run
database migrations, and deploy.

If you have to set up the project on a fresh machine, this is the document.

---

## Table of contents

1. [Prerequisites](#1-prerequisites)
2. [Local development](#2-local-development)
3. [Anthropic — Claude API](#3-anthropic--claude-api)
4. [Supabase — database](#4-supabase--database)
5. [LemonSqueezy — payments](#5-lemonsqueezy--payments)
6. [Resend — email delivery](#6-resend--email-delivery)
7. [Mapbox — maps](#7-mapbox--maps)
8. [Vercel — hosting](#8-vercel--hosting)
9. [Affiliate signups (optional)](#9-affiliate-signups-optional)
10. [Environment variables checklist](#10-environment-variables-checklist)
11. [Smoke test](#11-smoke-test)

---

## 1. Prerequisites

- Node 18+ and npm
- A GitHub account (for Vercel auto-deploy)
- A credit card for Anthropic, LemonSqueezy fees, and Vercel Pro
- The domain `checkvisamap.com` already pointed at Vercel

---

## 2. Local development

```bash
git clone <this-repo>
cd passport-project
npm install
cp .env.example .env.local   # if .env.example exists; otherwise create .env.local
# fill in env vars from §10 below
npm run dev
```

Site runs at `http://localhost:3000`.

---

## 3. Anthropic — Claude API

The trip planner uses **Claude Sonnet 4.5** to generate the itineraries. Cost
is roughly **$0.10–0.30 per plan** for the main generation pass plus another
**~$0.01 per day** for the route-optimization second pass. So a 5-day plan
costs ~$0.15–0.35 in API fees.

### Setup

1. Go to <https://console.anthropic.com> and sign up.
2. Add a payment method and load $20 of credit (enough for ~100 plans).
3. Settings → API Keys → Create Key. Name it `passport-prod`.
4. Copy the key (it starts with `sk-ant-...`).
5. Set the env var:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
   ```

The model is hardcoded to `claude-sonnet-4-5` in `lib/generator/claude.ts`.
Bump it to a newer Sonnet release as Anthropic ships them.

---

## 4. Supabase — database

Used for storing draft and completed plans, referrals, and promo codes.
**Free tier is enough for v1** (500MB DB, 50k monthly active users).

### Setup

1. Go to <https://supabase.com> and sign up.
2. New project → name it `checkvisamap`, pick a region close to your users
   (Tokyo/Singapore for Asia, Frankfurt for Europe).
3. Wait ~2 minutes for provisioning.
4. Settings → API → copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`
     ⚠️ NEVER expose this in client code. It bypasses RLS.
5. Run the migrations: SQL Editor → New query → paste each file in order:
   - `supabase/migrations/0001_plans.sql`
   - `supabase/migrations/0002_referrals.sql`
   - `supabase/migrations/0003_promo_codes.sql`
   Run each.
6. Verify: Table Editor should show `plans`, `referrals`, `plan_credits`,
   `promo_codes`.

### Inserting promo codes

There's no admin UI in v1. Insert codes manually in the SQL editor:

```sql
insert into promo_codes (code, discount_type, max_redemptions, expires_at)
values ('LAUNCH50', 'free', 50, now() + interval '30 days');
```

Then share `https://checkvisamap.com/plan/new?promo=LAUNCH50` in marketing
campaigns.

---

## 5. LemonSqueezy — payments

Hosted checkout. Fee is **5% + $0.50 per sale**, so a $4 plan nets ~$3.30.

### Setup

1. Go to <https://app.lemonsqueezy.com> and sign up.
2. Create a Store (name: gliddy).
3. Products → New → Single payment, $4 USD.
   - Name: "Trip Plan"
   - Price: $4 USD
   - Variant: Default
4. Note the **Store ID** and **Variant ID** (URL bar after creating).
5. Settings → API → Create API key. Copy.
6. Settings → Webhooks → Create webhook:
   - URL: `https://checkvisamap.com/api/webhooks/lemon-squeezy`
   - Events: check `order_created`
   - Signing secret: copy
7. Set env vars:
   ```
   LEMON_SQUEEZY_API_KEY=lscat_xxx
   LEMON_SQUEEZY_STORE_ID=12345
   LEMON_SQUEEZY_VARIANT_ID=67890
   LEMON_SQUEEZY_WEBHOOK_SECRET=whsec_xxx
   ```

### Test mode vs production

LemonSqueezy supports a Test Mode toggle in the dashboard. Use it for the
smoke test. Test mode uses the same API key but returns fake order IDs.

---

## 6. Resend — email delivery

For sending the "your plan is ready" email after generation. Free tier:
**3,000 emails/month** + 100/day. Enough for v1.

### Setup

1. Go to <https://resend.com> and sign up.
2. Domains → Add domain → enter `checkvisamap.com`.
3. Resend gives you DKIM and SPF DNS records. Add them in your domain
   registrar (Cloudflare, Namecheap, etc.) as TXT records.
4. Wait for verification (usually <30 min).
5. API Keys → Create API Key → name it `passport-prod`. Copy.
6. Set env vars:
   ```
   RESEND_API_KEY=re_xxx
   RESEND_FROM_EMAIL=gliddy <plans@checkvisamap.com>
   ```

The from-address must be on the verified domain. `plans@checkvisamap.com`
doesn't need to be a real inbox — Resend sends without receiving.

---

## 7. Mapbox — maps

Used for the interactive plan map (`react-map-gl` + Mapbox GL JS) and the
static map image embedded in the PDF. Free tier: **50k map loads/month** for
the JS map and unlimited static images. Enough for v1.

### Setup

1. Go to <https://account.mapbox.com> and sign up.
2. Tokens → Create a token:
   - Name: `passport-prod`
   - Public scopes: `styles:read`, `fonts:read`, `tiles:read`
   - URL restrictions: add `https://checkvisamap.com/*` and `localhost:*`
3. Copy the token (it starts with `pk.eyJ...`).
4. Set env var:
   ```
   MAPBOX_TOKEN=pk.eyJ...
   # OR (same value, exposed to the client):
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ...
   ```

Both env names work — `lib/map.ts` checks both.

---

## 8. Vercel — hosting

The project is deployed on Vercel. **Pro plan ($20/month) is required for
v1** because the LemonSqueezy webhook runs Claude generation synchronously
(20–60s per plan), and the free tier caps function execution at 10 seconds.

### Setup

1. Go to <https://vercel.com> and sign up.
2. New Project → Import the GitHub repo for `checkvisamap.com`.
3. Framework Preset: Next.js (auto-detected).
4. Build settings: defaults are fine.
5. Environment variables: paste every var from §10. Set scope to "Production",
   "Preview", and "Development" as needed.
6. Deploy.
7. After deploy: Settings → Domains → add `checkvisamap.com` and
   `www.checkvisamap.com`. Vercel handles the SSL cert automatically.
8. Upgrade to Pro: Account → Plans → Pro.

### Why Pro is required

`app/api/webhooks/lemon-squeezy/route.ts` declares `maxDuration = 300`
(5 minutes). Vercel Hobby caps function execution at 10 seconds, which is
not enough for the Claude Sonnet generation pipeline. Pro raises the cap to
300 seconds.

If you really want to stay on Hobby, you'd need to refactor the webhook to
queue the generation work to an external worker (e.g. a Supabase Edge
Function or a separate Cron route) and have the webhook return immediately.
Out of scope for v1.

---

## 9. Affiliate signups (optional)

The affiliate sidebar in `components/PlanAffiliateBar.tsx` uses these
partners. Several IDs are still placeholder — sign up and replace them in
`lib/affiliates/index.ts` and `components/AffiliateSection.tsx`.

| Partner | URL | Status | Reward |
|---|---|---|---|
| Agoda | <https://partners.agoda.com> | ✅ Active (cid:1956855) | ~5% commission |
| Travelpayouts (Aviasales) | <https://www.travelpayouts.com> | ✅ Active (marker:491612) | Per-booking |
| Airalo | <https://airalo.com/partners> | ✅ Active (pxf.io link) | Per eSIM sold |
| Klook | <https://affiliate.klook.com> | ❌ TODO | 3-5% per booking |
| Viator | <https://partnernetwork.viator.com> | ❌ TODO (placeholder) | 8% per tour |
| Insubuy | <https://www.insubuy.com/affiliate> | ❌ TODO (placeholder) | Per policy |

---

## 10. Environment variables checklist

Copy this block into `.env.local` (development) and Vercel env vars
(production).

```bash
# Anthropic (Claude generator)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx

# Supabase (plans, referrals, promos)
SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxx

# LemonSqueezy (payments)
LEMON_SQUEEZY_API_KEY=lscat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LEMON_SQUEEZY_STORE_ID=12345
LEMON_SQUEEZY_VARIANT_ID=67890
LEMON_SQUEEZY_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Resend (email)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=gliddy <plans@checkvisamap.com>

# Mapbox (maps + PDF static map)
MAPBOX_TOKEN=pk.eyJ1xxxxxxxxxxxxxxxxxxxxxxxxxxxx
# Optional: also expose to the client
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Site config
NEXT_PUBLIC_SITE_URL=https://checkvisamap.com
```

---

## 11. Smoke test

After deploying, walk through the full pipeline once with a real (test mode)
LemonSqueezy charge:

1. Open `https://checkvisamap.com` — confirm the planner hero is the
   primary CTA.
2. Click "Plan my trip — $4" → land on `/plan/new`.
3. Fill in destination/duration/budget → click "Start AI analysis".
4. Land on `/plan/loading` → confirm rolling labor-illusion logs.
5. Answer all 6–9 popup questions.
6. Confirm redirect to LemonSqueezy hosted checkout.
7. Complete the test charge with a Stripe-style test card (or trigger the
   webhook manually from the LS dashboard).
8. Confirm webhook fires and plan generation runs (visible in Supabase
   `plans` table — status should go draft → paid → generating → complete).
9. Confirm email arrives.
10. Click the email link → confirm `/plan/[id]` renders with the
    interactive map and the "Did you know?" callouts in the PDF.
11. Click "Download PDF" → confirm PDF downloads with day-by-day pages,
    map image, and trivia callouts.
12. Test the language switcher in the top-right corner.
13. Test the geo-IP banner: `curl -H "x-vercel-ip-country: KR" https://checkvisamap.com/`
    and confirm the response sets a `SUGGEST_LOCALE=ko` cookie.
14. Test the referral link: copy the share link from `/plan/[id]`, open it
    in an incognito window, and confirm the cookie gets set.
15. Insert a test promo code via Supabase SQL editor and use it via
    `/plan/new?promo=TEST10` → confirm the checkout skips LemonSqueezy.

If all 15 pass, you're live.
