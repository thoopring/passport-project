# Launch Checklist

The pivot work (P0–P12) is code-complete. This checklist is what you the
human need to do to actually go live. None of these steps can be done by
an automated agent — they require real accounts, real credit cards, real
DNS, and real testing on a production deploy.

Print this. Tick boxes. Don't skip.

---

## Phase A — Account provisioning (~1 hour)

Follow `docs/SETUP.md` end-to-end and provision every account:

- [ ] **Anthropic** key created, $20 credit loaded → `ANTHROPIC_API_KEY` set
- [ ] **Supabase** project created in correct region → `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set
- [ ] **Supabase migrations** all 3 SQL files run in order:
  - [ ] `supabase/migrations/0001_plans.sql`
  - [ ] `supabase/migrations/0002_referrals.sql`
  - [ ] `supabase/migrations/0003_promo_codes.sql`
- [ ] **LemonSqueezy** store + $4 product variant + webhook configured → 4 env vars set
- [ ] **Resend** domain verified (DKIM/SPF in DNS) → `RESEND_API_KEY` and `RESEND_FROM_EMAIL` set
- [ ] **Mapbox** token created with URL restrictions → `MAPBOX_TOKEN` set
- [ ] **Vercel Pro** activated (NOT free — webhook needs maxDuration=300)
- [ ] All env vars copied into Vercel project settings (Production scope)
- [ ] `NEXT_PUBLIC_SITE_URL=https://checkvisamap.com` set
- [ ] First production deploy succeeds (green build in Vercel dashboard)

## Phase B — Smoke test in TEST mode (~30 min)

Run in LemonSqueezy Test Mode so you don't pay real money. Use the Stripe
test card `4242 4242 4242 4242` if asked for a card.

- [ ] Visit `https://checkvisamap.com` — confirm planner hero is the primary CTA
- [ ] Click "Plan my trip — $4" → land on `/plan/new` with 3-question form
- [ ] Fill in: Tokyo, 4 days, mid-range → click "Start AI analysis"
- [ ] Land on `/plan/loading` — confirm rolling labor-illusion logs appear
- [ ] Confirm popup questions appear in sequence (travelers, kids if family, airport, hotel booked, interests, pace, email)
- [ ] After email, confirm redirect to LemonSqueezy hosted checkout
- [ ] Complete test charge with `4242 4242 4242 4242`
- [ ] LS dashboard shows the order
- [ ] Vercel logs show webhook fired and verified
- [ ] Supabase `plans` table shows status `complete`
- [ ] Email arrives at your inbox (check spam folder)
- [ ] Click email link → `/plan/[id]` renders the full plan
- [ ] Interactive map shows numbered waypoints + polylines (no Mapbox token errors)
- [ ] Click "Download PDF" → PDF downloads
- [ ] PDF includes: cover page, hotel card, transit, day pages with stops, "Did you know?" callouts, tips page
- [ ] PDF static map image renders (not blank)
- [ ] Plan view shows the "Travel toolkit" affiliate sidebar
- [ ] Plan view shows the "Share this site, get your next plan free" referral card
- [ ] Click copy button on referral card → URL copied to clipboard

## Phase C — i18n + geo testing (~15 min)

- [ ] Click the LocaleSwitcher (top-right) → switch to 한국어
- [ ] Page reloads in Korean — wizard, samples, plan view all translated
- [ ] Switch to 日本語 → reload — Japanese
- [ ] Switch to 中文 → reload — Chinese
- [ ] Switch back to English
- [ ] Test geo banner: open Vercel Edge function logs OR set the cookie manually:
      ```
      curl -H "x-vercel-ip-country: KR" https://checkvisamap.com/ -c -
      ```
      Confirm `SUGGEST_LOCALE=ko` cookie in the response
- [ ] Open browser, set `SUGGEST_LOCALE=ko` cookie via DevTools, reload home
- [ ] Banner appears: "한국어로 보시겠어요? [전환] [괜찮아요]"
- [ ] Click 전환 → page reloads in Korean
- [ ] Open new incognito, set cookie again, click 괜찮아요 → banner disappears
- [ ] Reload — banner stays gone (SUGGEST_DISMISSED cookie)

## Phase D — Referral + promo testing (~15 min)

- [ ] In Supabase SQL editor, insert a test promo code:
      ```sql
      insert into promo_codes (code, discount_type, max_redemptions, expires_at)
      values ('TESTLAUNCH', 'free', 100, now() + interval '7 days');
      ```
- [ ] Visit `/plan/new?promo=TESTLAUNCH`
- [ ] Complete the wizard
- [ ] Confirm checkout SKIPS LemonSqueezy and goes straight to `/plan/[id]?paid=1`
- [ ] Plan generates and email arrives (no charge made)
- [ ] In Supabase, verify `promo_codes.redeemed_count` for TESTLAUNCH is now 1
- [ ] On the completed plan, copy the share link from the referral card
- [ ] Open the share link in incognito → land on home with `ref_code` cookie set
- [ ] Complete a new test purchase as a different email
- [ ] Verify webhook awarded a credit:
      ```sql
      select * from plan_credits where source = 'referral' order by created_at desc limit 5;
      ```
- [ ] Use the original email to start a new plan → checkout skips LS (credit consumed)

## Phase E — Lighthouse + perf (~10 min)

- [ ] Run Lighthouse on `https://checkvisamap.com` (Chrome DevTools → Lighthouse)
  - [ ] Performance ≥ 85
  - [ ] SEO ≥ 95
  - [ ] Accessibility ≥ 90
- [ ] Run Lighthouse on `/plan/new`
- [ ] Run Lighthouse on `/samples/tokyo-4d-couple`
- [ ] If Performance < 85, check Vercel function logs for slow responses

## Phase F — Final flips (~10 min)

- [ ] LemonSqueezy: switch from Test Mode to Live Mode
- [ ] Remove the `TESTLAUNCH` promo code (or set max_redemptions to 0)
- [ ] Submit the new sitemap to Google Search Console:
      `https://checkvisamap.com/sitemap.xml`
- [ ] Verify GA4 events are firing:
  - `plan_wizard_started`
  - `plan_draft_created`
  - `begin_checkout`
  - `affiliate_click`
- [ ] Post launch announcement on whichever channels you use
- [ ] Set up an alert for failed plans:
      ```sql
      select count(*) from plans where status = 'failed' and created_at > now() - interval '24 hours';
      ```
      Run this daily for the first week.

## Phase G — Affiliate ID cleanup (post-launch, ~30 min)

These IDs are still placeholder/generic in the code. Sign up and replace
when you have the bandwidth.

- [ ] Sign up for Klook affiliate program → get your AID → update `lib/affiliates/index.ts:buildKlookUrl`
- [ ] Sign up for Viator affiliate program → get your `pid` → update `lib/affiliates/index.ts:buildViatorUrl`
- [ ] Sign up for Insubuy affiliate program (if doing travel insurance)

## Known issues (NOT blockers)

1. **Lint errors in legacy code**: 4 pre-existing errors in `app/page.tsx` (dark mode init), `app/visa/[slug]/page.tsx` (Math.random), `components/TravelFortune.tsx` (unescaped quotes). These predate the pivot and don't block builds. Fix when convenient.
2. **All pages are server-rendered** (not statically prerendered) because the root layout reads `cookies()` for locale detection. This is the documented trade-off in PIVOT_PLAN.md P4. Vercel CDN absorbs the impact via aggressive caching.
3. **Sample plans are English-only**. The chrome around them localizes; the content does not. Plan content from Claude is fully localized for paying customers.
4. **Home page (`/`) is not localized**. The visa-map giant client component still renders English. Defer to a v1.1 refactor.
5. **PDF labels are English**. Claude-generated content inside the PDF will be in the user's locale, but the chrome labels (Hotel, Day, Did you know?) stay English in v1.

---

When all of A–F are ticked, the pivot is live. Ship it.
