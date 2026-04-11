# Pivot Plan — checkvisamap.com → AI Trip Planner

> **Resume-safe document.** This is the source of truth for the pivot. If a session
> is interrupted, the next session should re-read this file, run `git status`, and
> pick up from the first unchecked phase.
>
> Mirror copy: also written to `PIVOT_PLAN.md` in repo root once approved.

---

## 1. Context

`checkvisamap.com` is currently a visa info site (190+ countries, 8 passports). The
user is pivoting to a **paid AI trip planner** as the core revenue product. Visa
pages remain as the SEO funnel, but the money product is now: traveler answers a
few questions → AI generates a detailed personalized itinerary → user pays **$4**
→ receives a **mobile-responsive secret web link** (with interactive map) **plus a
downloadable PDF** for offline use.

A previous session built ~70% of the scaffold (Claude generator, LemonSqueezy
checkout, Supabase persistence, PDF renderer, Mapbox map, webhook delivery, email).
That session terminated mid-pivot. **All of that scaffold is sound and will be
reused** — see Inventory below. This plan covers (a) the gaps, (b) UX restructure
to match the user's 18 requirements, and (c) launch checklist.

**Domain stays `checkvisamap.com`** for now. New domain optional later.

---

## 2. Requirements → Status Map

The user provided 18 requirements. Each is mapped to current state.

| # | Requirement | Status | Phase |
|---|---|---|---|
| 1 | Pivot from visa-only to trip planner | ⚠️ 70% built, needs finish | All |
| 2 | $4 plan: secret mobile web link + PDF download | ⚠️ Built at $3, bump to $4 | P0 |
| 3 | i18n: English / 中文 / 한국어 / 日本語 | ❌ Not started | P4 |
| 4 | Geo-IP language detection + "switch language?" prompt | ❌ Not started | P5 |
| 5 | Progressive disclosure: 3 questions → mid-load popup for rest | ❌ Single-page form exists | P2 |
| 6 | Required inputs: companions, kids/strollers/age, budget, hotel-status, dates, airport+terminal | ✅ All in current form | (verify P2) |
| 7 | No free trial — instead, **sample plan gallery** | ❌ Currently shows live teaser; remove + replace | P1 |
| 8 | Referral system (invite → earn next plan free) | ❌ Not started | P9 |
| 9 | Promo / free-use codes for marketing | ❌ Not started | P10 |
| 10 | Route visualization (numbered markers + polyline) + AI route optimization | ✅ Markers/polyline done; ❌ optimization not | P6 |
| 11 | Guide on which APIs to pay for | ❌ Doc needed | P12 |
| 12 | Loading screen with "labor illusion" + travel tips | ❌ Not started | P3 |
| 13 | Fun travel facts inside PDF | ❌ Generator doesn't request facts | P8 |
| 14 | Cover transit, hotels, food, sights, rest stops | ✅ Schema covers all | (P6 polish) |
| 15 | Affiliate links naturally embedded, low pressure | ⚠️ Visa-side links exist; not in plan output | P7 |
| 16 | Deploy to `checkvisamap.com` (full overhaul OK) | ✅ Same repo, same domain | P13 |
| 17 | Resume-safe plan document | ✅ This file | (this) |
| 18 | Payment via LemonSqueezy | ✅ Built | P0 (price bump) |

---

## 3. Inventory — What Already Exists

Source: full audit of uncommitted work in `app/api/`, `app/plan/`, `lib/`, `supabase/`, `types/`.

### 3.1 Solid, reuse as-is
- **`types/trip-plan.ts`** — Complete Zod schemas: `PlanRequest`, `TripPlan`, `Hotel`, `AirportTransit`, `Stop`, `Day`, `PlanRecord`, `PlanStatus`. Status lifecycle: draft → paid → generating → complete/failed/refunded.
- **`supabase/migrations/0001_plans.sql`** — `plans` table (UUID pk, JSONB request/plan, indexes, updated_at trigger). No RLS — secret-UUID auth model.
- **`lib/supabase.ts`** — Service-role singleton (server-only).
- **`lib/plans.ts`** — Repository: `createDraftPlan`, `getPlan`, `markPlanPaid`, `setPlanGenerating`, `savePlanResult`, `setPlanFailed`.
- **`lib/generator/claude.ts`** — `generateTripPlan(req)` calls Claude Sonnet 4.5, validates against Zod, retries once on parse error. ~$0.10–0.30/plan. **Strong system prompt enforcing real places, kid-friendly logic, geo-clustered stops, airport-aware hotel.** Also has `generateTeaserDay(req)` (~$0.03) — will be removed in P1.
- **`lib/lemonsqueezy.ts`** — `createCheckoutUrl()` (POST to LS v1/checkouts with `custom_data.plan_id`), `verifyWebhookSignature()` (HMAC-SHA256 timing-safe).
- **`lib/email.ts`** — Resend integration with HTML+text templates linking to `/plan/[id]` and `/api/plan/[id]/pdf`.
- **`lib/pdf/PlanDocument.tsx`** — `@react-pdf/renderer` cover + per-day pages + tips; embeds Mapbox static image.
- **`lib/map.ts`** — Helpers: `flattenStops`, `computeBounds`, `buildStaticMapUrl`.
- **`components/PlanMap.tsx`** — Interactive `react-map-gl` with numbered colored markers, day-grouped polyline, popups, fit-bounds. Graceful fallback if no Mapbox token.
- **`app/api/plan/draft/route.ts`** — Validates `PlanRequestSchema`, inserts draft, returns id.
- **`app/api/plan/[id]/pdf/route.tsx`** — On-demand PDF render.
- **`app/api/checkout/route.ts`** — Validates plan is in draft state, creates LS checkout.
- **`app/api/webhooks/lemon-squeezy/route.ts`** — Verifies signature, marks paid, fires generation in background, returns 200 immediately. `runtime = nodejs`, `maxDuration = 300`.
- **`app/plan/[id]/page.tsx`** — Full-plan view (only shown when status=complete). Draft → redirect to preview. Paid/generating → polling state. Has download-PDF link.
- **`components/TripPlannerCTA.tsx`** — Hero + compact CTAs to `/plan/new?dest=&country=&origin=`.
- **Modified `app/visa/[slug]/page.tsx`** — Already wires `TripPlannerCTA` into visa detail pages.
- **Modified `components/AffiliateSection.tsx`** — Refactored to use `AffiliateLink` (GA tracking).

### 3.2 Needs change/removal
- **`app/plan/new/PlanForm.tsx`** — Single-page form with all fields. **Refactor to progressive 3-question wizard** (P2).
- **`app/plan/[id]/preview/page.tsx`** + **`CheckoutButton.tsx`** — Currently shows live free teaser before checkout. **Remove free teaser**, redirect form-submit → labor-illusion loading → checkout (P1, P3).
- **Pricing** — Hardcoded $3 in CheckoutButton GA event, system prompt copy, preview page CTA copy. **Bump to $4** (P0).

### 3.3 Dependencies already installed
`@anthropic-ai/sdk@0.87`, `@supabase/supabase-js@2.103`, `@react-pdf/renderer@4.4`, `mapbox-gl@3.21`, `react-map-gl@8.1`, `resend@6.10`, `zod@4.3.6`. Will add: `next-intl`, `@vercel/edge` (for geo), `nanoid` (referral codes).

---

## 4. Architecture (Locked)

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 App Router | Existing |
| Styling | Tailwind 3 + CSS vars | Existing palette `#1a4d2e`/`#ff9f1c`/`#FFFBF0` |
| LLM | **Claude Sonnet 4.5** via `@anthropic-ai/sdk` | Existing |
| Structured output | Zod post-validation, retry-once on parse error | Existing |
| Payment | **LemonSqueezy** hosted checkout | Existing; webhook-driven generation |
| DB | **Supabase** Postgres (single `plans` table, no RLS, secret UUIDs) | Existing |
| Email | **Resend** (HTML + text) | Existing |
| Maps (interactive) | **Mapbox GL** via `react-map-gl` | Existing |
| Maps (PDF) | **Mapbox Static Images API** | Existing |
| PDF | `@react-pdf/renderer` (server render) | Existing |
| i18n | **`next-intl`** with `[locale]` segment | New (P4) |
| Geo detection | **Vercel Edge** `request.geo.country` (free) | New (P5) |
| Route optimization | Claude in-context reordering (cheap) — no Google Distance Matrix needed for v1 | New (P6) |
| Promo / referral | DB-backed codes table | New (P9, P10) |
| Analytics | GA4 (existing `G-3LF8H03QZG`) | Existing |

**Cost per plan (worst case):**
- Claude Sonnet 4.5 generation: ~$0.30
- Mapbox static image: free tier covers MVP
- Resend email: free tier covers MVP
- Supabase: free tier covers MVP
- LS fee: 5% + $0.50 ≈ $0.70 on $4
- **Margin per plan: ~$3.00**

---

## 5. APIs the User Must Sign Up For (delivered as P12 doc)

| Service | Plan | Why | Required by |
|---|---|---|---|
| **Anthropic** | Pay-as-you-go | Generation | Day 1 |
| **Supabase** | Free | DB | Day 1 |
| **LemonSqueezy** | Free (5% + $0.50/sale) | Payment | Day 1 |
| **Resend** | Free (3k emails/mo) | Email delivery | Day 1 |
| **Mapbox** | Free (50k loads/mo) | Maps | Day 1 |
| **Vercel** | Hobby or Pro | Hosting; Pro needed for `maxDuration=300` on webhook | Day 1 (Pro for prod) |
| **Domain `checkvisamap.com`** | Already owned | — | — |

**Optional (later):**
- Cloudflare Turnstile (free) — captcha to prevent draft spam (P13 if needed)
- PostHog or Plausible (paid) — better funnel analytics

---

## 6. Implementation Phases

> Each phase is **independently shippable**. Mark a phase complete by ticking
> the box and committing with the phase tag (e.g. `pivot(P0): bump price to $4`).

### ☑ P0 — Reconcile current scaffold + price bump (DONE 2026-04-11)

**Goal:** Get the existing scaffold to a runnable state, bump price $3 → $4, commit so we have a clean baseline.

Files:
- `lib/generator/claude.ts:38` — System prompt mentions "$3"; change to "$4".
- `app/plan/[id]/preview/page.tsx` — All "$3" copy → "$4".
- `app/plan/[id]/preview/CheckoutButton.tsx` — `gtag('event', 'begin_checkout', { value: 4, currency: 'USD' })`.
- `app/plan/new/PlanForm.tsx:351` — "$3" copy.
- Verify env vars all set in `.env.local` (see §5).
- `npm install` — make sure new deps from package.json hydrate.
- `npm run build` — must pass before P1 starts.

Verify: `npm run dev`, manually walk through `/plan/new` → submit → redirect to `/plan/[id]/preview` (the preview page works for now even though it'll be removed in P1).

**Commit point:** `pivot(P0): baseline scaffold + price $3→$4`

---

### ☑ P1 — Sample plans gallery (DONE 2026-04-11; deletions deferred to P3)

> **Deviation:** Deletion of `app/plan/[id]/preview/*` and `generateTeaserDay()`
> was deferred from P1 to P3. Reason: P1's deletion would break the form-submit
> flow (PlanForm currently redirects to `/preview`). Keeping preview alive until
> P3's labor-illusion loading screen replaces it makes every commit shippable
> in isolation. PlanView extraction and samples gallery (the additive parts of
> P1) shipped clean.

**Goal:** Replace the live free teaser (Req 7 says no free trial) with a curated **sample plan gallery** users can browse to gauge quality. Form submit → straight to checkout (via labor-illusion loading from P3).

**Sample plans = static data, not AI-generated on the fly.** They're hand-picked, verified-perfect example plans for top destinations. They are also the AI's quality target, so they must be excellent.

Files to create:
- `lib/samples/index.ts` — Exports `SAMPLE_PLANS: Record<string, TripPlan>` keyed by slug.
- `lib/samples/tokyo-5d-couple.ts` — One full `TripPlan` object (Tokyo, 5 days, couple, midrange).
- `lib/samples/paris-4d-family.ts` — Paris family-with-kids sample.
- `lib/samples/bangkok-7d-solo.ts` — Bangkok solo budget.
- `lib/samples/seoul-3d-foodie.ts` — Seoul food-focused.
- (Start with 4 — add more later.)
- `app/samples/page.tsx` — Gallery grid linking to each sample.
- `app/samples/[slug]/page.tsx` — Renders sample using **the same** `<PlanView>` component as the real plan view, with a "This is a free sample. Get yours for $4 →" CTA.
- Refactor: extract the plan rendering JSX from `app/plan/[id]/page.tsx` into `components/PlanView.tsx` so both real plans and samples share it.

Files to delete/modify:
- `app/plan/[id]/preview/page.tsx` — **Delete** (no more pre-payment preview).
- `app/plan/[id]/preview/CheckoutButton.tsx` — **Move** to a new location: the labor-illusion screen will own checkout (P3).
- `lib/generator/claude.ts:208-253` — **Delete** `generateTeaserDay()` and `TeaserPlan`. Frees ~50 lines.
- `app/plan/new/PlanForm.tsx` — `router.push(\`/plan/${id}/preview\`)` → `router.push(\`/plan/${id}/loading\`)` (loading page from P3 owns the checkout transition).

Verify: `/samples` lists 4 cards. Each `/samples/tokyo-5d-couple` renders a beautiful, real-looking plan with map + days + tips. Form-submit no longer shows the old preview page.

**Commit point:** `pivot(P1): sample gallery replaces free teaser`

---

### ☐ P2 — Progressive disclosure form (3 questions → wizard)

**Goal:** First screen asks ONLY: destination, duration, budget. Hit "Start AI analysis" → enter labor-illusion screen (P3) → between fake-loading steps, popup the remaining questions one at a time.

Files to create:
- `app/plan/new/page.tsx` — Now renders `<PlanWizardStep1>` (3 questions only).
- `app/plan/new/PlanWizardStep1.tsx` — Destination, duration, budget. Validates locally, then `router.push('/plan/loading?dest=…&days=…&budget=…')` (no draft created yet — we collect more first).

Files to refactor:
- `app/plan/new/PlanForm.tsx` — Becomes the **mid-loading popup form** triggered from the loading screen (P3). Renders one question at a time as a modal sequence:
  1. Travelers (solo/couple/family/group/senior)
  2. If family-with-kids: number of children + ages + stroller? + age-2-or-under?
  3. Arrival airport + terminal
  4. Have you booked a hotel? (yes/no — if yes, name optional)
  5. Start date / day of week
  6. Interests (chip multi-select)
  7. Pace
  8. Email (last)
- The loading screen calls `POST /api/plan/draft` only after question #8 (email) is answered, so all data lands in one insert.
- Add `strollerNeeded?: boolean`, `hasInfant?: boolean`, `hotelBooked?: boolean`, `hotelName?: string` to `PlanRequestSchema` in `types/trip-plan.ts`.
- Update Claude system prompt in `lib/generator/claude.ts` to honor stroller/infant logic and skip hotel recs if already booked.

UX rule: **the popup must feel like a fun mid-loading "20 questions"**, not a chore. Each question is one tap (chips). No long forms. Skip-allowed for optional fields.

Verify: Browser walk-through. Land on `/plan/new`, see only 3 fields. Click start. Loading screen appears. Within 5–10s, first popup question pops up. Answer 8 questions. Final answer triggers draft creation + checkout redirect.

**Commit point:** `pivot(P2): progressive disclosure form`

---

### ☐ P3 — Labor illusion loading screen

**Goal:** Between "Start AI analysis" and "redirect to LemonSqueezy checkout", show a screen that **feels like real AI work** with rolling progress logs and travel content. Mid-load, popup the questions from P2.

Files to create:
- `app/plan/loading/page.tsx` — Client component. Reads URL params (dest, days, budget). Manages state: question queue, current question, fake log queue. After all questions answered, calls `POST /api/plan/draft` → `POST /api/checkout` → `window.location = checkoutUrl`.
- `components/LaborIllusionLog.tsx` — Animated rolling log lines. Examples (parameterized by destination):
  - "Analyzing 240 restaurants in Ueno district…"
  - "Optimizing stroller-friendly routes…"
  - "Matching hotels to {airport} Terminal {terminal}…"
  - "Sequencing day {n} stops by walking distance…"
  - "Cross-referencing 18 travel guides for {destination}…"
- `components/TravelTrivia.tsx` — Side card with rotating fun facts about the destination, randomly served from a small static dataset for the top destinations (`lib/trivia/index.ts`). Acts as content while fake-loading.
- `lib/trivia/index.ts` — `Record<countrySlug, string[]>` with 5–10 facts each for top 20 countries. Used here AND in P8 (PDF facts).
- `components/QuestionPopup.tsx` — Centered modal that pops up over the loading screen. Single-question UI with chip selectors. Closes when answered, next pops up after 2–3s (more fake loading in between).

UX timeline:
```
t=0   "Start AI analysis" pressed
t=0   loading screen mounts, log line 1 appears
t=2s  log line 2; popup Q1 (Travelers) appears
t=5s  Q1 answered → popup closes; log lines 3–4 stream
t=7s  popup Q2 (Kids? Stroller?) — only if family
t=10s popup Q3 (Airport)
…
t=35s popup Q8 (Email)
t=36s POST /api/plan/draft, POST /api/checkout
t=38s redirect to LS checkout
```

Files to delete:
- `app/plan/[id]/preview/` (already removed in P1).

Verify: Use the browse skill or `/qa` skill to walk this end-to-end. Confirm logs roll smoothly, popups pop in sequence, and final redirect lands on a real LS checkout URL.

**Commit point:** `pivot(P3): labor illusion loading + popup wizard`

---

### ☐ P4 — i18n (en / zh / ko / ja)

**Goal:** All UI strings localized; AI-generated plans output in user's chosen language.

Stack: **`next-intl`** (mature, App Router native).

Files to create:
- `i18n/request.ts` — next-intl config.
- `messages/en.json`, `messages/zh.json`, `messages/ko.json`, `messages/ja.json` — UI strings.
- `middleware.ts` — next-intl locale middleware (handles `[locale]` segment).
- Restructure `app/` → `app/[locale]/`:
  - `app/[locale]/layout.tsx` (with `NextIntlClientProvider`)
  - `app/[locale]/page.tsx` (home)
  - `app/[locale]/plan/new/...`
  - `app/[locale]/plan/loading/...`
  - `app/[locale]/plan/[id]/...`
  - `app/[locale]/samples/...`
  - `app/[locale]/visa/[slug]/...`
  - `app/[locale]/blog/...` etc.
- Update `lib/generator/claude.ts`:
  - Add `locale` to `PlanRequest` (`'en'|'zh'|'ko'|'ja'`).
  - Add `outputLanguage` instruction to system prompt: "Write all user-visible strings (overview, day theme, stop description, tips) in {locale}. Place names stay in their native script + Latin transliteration."
  - The Zod schema doesn't change — only the contents are localized text.
- Update `lib/email.ts` — Localized email subject/body per `request.locale`.
- Update `lib/pdf/PlanDocument.tsx` — Localized labels (Day, Hotel, Tips, etc.) via a small embedded translations map (no next-intl in PDF render).

URL strategy: `/en/...`, `/zh/...`, `/ko/...`, `/ja/...`. Default `/` → redirect via P5 logic.

Translation scope (MVP): UI chrome only. Sample plans stay in English for v1; localized samples come later.

Verify: `/ko/plan/new` loads in Korean. Fill form → final plan generated in Korean. Visa pages also localized.

**Commit point:** `pivot(P4): i18n via next-intl`

---

### ☐ P5 — Geo-IP language prompt

**Goal:** First-visit users land in English, but if their IP is in JP/CN/TW/HK/KR, show a non-intrusive top banner: "한국어로 보시겠어요? [Switch] [No thanks]".

Files to create:
- `middleware.ts` — Already exists from P4 for next-intl. Extend it to read `request.geo?.country` (Vercel Edge populates this for free). If country ∈ {KR, JP, CN, TW, HK} AND no `NEXT_LOCALE` cookie set AND user is on `/en/...`, set a header `x-suggested-locale=ko|ja|zh`.
- `components/LocaleSuggestionBanner.tsx` — Top banner that reads the suggested locale from a cookie (set by middleware) or from a server component prop. Renders the prompt. On accept: sets `NEXT_LOCALE` cookie + redirects to `/{locale}/...`. On dismiss: sets a "dismissed" cookie so it doesn't show again.
- Wire into `app/[locale]/layout.tsx`.

Defaults: English is primary. We never auto-redirect — always **ask first** (Req 4 explicit).

Verify: Use a VPN or set `x-vercel-ip-country=KR` header in dev. Confirm banner shows. Click "Switch" → URL changes to `/ko/...`. Click "No thanks" → banner disappears, doesn't return.

**Commit point:** `pivot(P5): geo-IP locale suggestion banner`

---

### ☐ P6 — Route optimization (auto-reorder waypoints)

**Goal:** Currently the system prompt tells Claude to "cluster geographically" but doesn't explicitly run an optimization pass. Strengthen this so days never zigzag.

Approach (cheap, no Google Distance Matrix needed for v1): **Two-pass Claude.**

Files to modify:
- `lib/generator/claude.ts`:
  - After `generateTripPlan()` returns, run a lightweight second pass: for each `Day`, send Claude the stops with their coords and ask "reorder these N stops to minimize total walking distance, keep meal times reasonable (lunch ~12-13h, dinner ~18-20h), output JSON array of new order indices". Apply the reorder, then renumber `order` and recompute `time` slots.
  - Extract a helper `optimizeDayRoute(day: Day): Promise<Day>`.
  - Cost: ~$0.01 per day per plan (cheap).
- Alternative we explicitly **rejected** for v1: Google Distance Matrix API. Adds latency, billing complexity, and Claude's geo-reasoning is good enough on famous places. Revisit in v2 if quality issues surface.

Strengthen system prompt — add explicit example of bad zigzag and how to fix.

Verify: Generate a 5-day Tokyo plan. Check `PlanMap` for any day where the polyline visibly crosses itself. Should not happen.

**Commit point:** `pivot(P6): route optimization second pass`

---

### ☐ P7 — Affiliate integration in plan output (natural placement)

**Goal:** Embed affiliate links in the generated plan **subtly** — feels like helpful concierge, not a sales pitch (Req 15).

Where to inject (post-generation, NOT in Claude prompt — keeps plan generation deterministic):
- **Hotel card** → "Check rates on Agoda" button (Agoda affiliate, existing `cid:1956855`).
- **Airport transit** → If method involves train, "Book Klook airport transfer" link (Klook affiliate — sign up needed).
- **Each meal stop** with `bookingTip` containing "reservation needed" → no link (don't risk junk).
- **General tips footer** → Standard travel toolkit links: eSIM (Airalo, existing pxf.io), insurance (Insubuy, existing — need actual ID), tours (Viator, existing — need ID).
- **Plan view sidebar** (web only, not PDF — Req says PDF affiliate CTR is bad) → Sticky "Travel toolkit" card with the 4 main affiliates.

Files to create:
- `lib/affiliates/index.ts` — `buildAgodaUrl(city)`, `buildKlookUrl(city)`, `buildAiraloUrl(country)`, `buildViatorUrl(city)` — pure functions returning tracked URLs. Reuse existing IDs from `components/AffiliateSection.tsx`.
- `components/PlanAffiliateBar.tsx` — Sticky sidebar component for `PlanView`.

Files to modify:
- `components/PlanView.tsx` (created in P1) — Render affiliate bar in sidebar slot.
- `lib/pdf/PlanDocument.tsx` — Add ONE small "Travel essentials" QR code section at the back (QR codes for toolkit links). PDF affiliates kept minimal per Req 15.

User memory note: Several affiliate IDs are still placeholders (Viator, NordVPN, Insubuy, Rail Europe). When this phase runs, also flag the user that these still need real IDs from the partner programs.

Verify: Plan view shows affiliate sidebar, clicks fire GA `affiliate_click` event with provider label.

**Commit point:** `pivot(P7): natural affiliate integration in plan output`

---

### ☐ P8 — Fun travel facts in PDF

**Goal:** Each PDF day page includes 1 fun fact about a stop or the city (Req 13).

Two options:
- **A) Static facts from `lib/trivia/index.ts`** (created in P3). Pick 1 fact per day at PDF render time. Cheap, deterministic, no extra Claude cost. **Chosen for v1.**
- B) Ask Claude to generate facts inline. Adds tokens, risks hallucination. Skip.

Files to modify:
- `lib/pdf/PlanDocument.tsx` — On each day page, add a "Did you know?" callout pulling a random fact from `lib/trivia` keyed by `destinationCountry`.
- `lib/trivia/index.ts` — Expand from P3. Goal: 10+ facts per top 20 countries. Manual curation.

Verify: Generate Tokyo plan PDF. Day 2 has "Did you know? Shibuya Crossing has up to 3,000 people cross at once."

**Commit point:** `pivot(P8): fun facts in PDF`

---

### ☐ P9 — Referral program

**Goal:** Each user gets a referral link. When a friend signs up + buys their first plan, the referrer gets a free plan credit.

Schema:
- New table `referrals`: `id`, `code` (8-char nanoid), `owner_email`, `redeemed_count`, `credits_earned`, `created_at`.
- New table `plan_credits`: `id`, `email`, `source` (referral|promo|admin), `used_at NULL`, `expires_at`, `created_at`.
- Migration: `supabase/migrations/0002_referrals.sql`.

Flow:
1. After a successful purchase, generate (or look up) a referral code for the buyer's email. Show on `/plan/[id]` view: "Share this link, get your next plan free: `checkvisamap.com/r/{code}`".
2. `/r/[code]` route → sets a `ref_code` cookie → redirects to `/`.
3. When a new draft is created (`POST /api/plan/draft`), if `ref_code` cookie present, save `referred_by_code` on the plan.
4. On webhook order_created, if plan has `referred_by_code` AND the buyer's email != owner_email of that code:
   - Increment `redeemed_count` and `credits_earned` on the referral.
   - Insert a `plan_credits` row for the referrer.
5. At checkout, if buyer's email has an unused credit, **skip LemonSqueezy entirely** — mark plan as paid directly and consume the credit.

Files:
- `supabase/migrations/0002_referrals.sql`
- `lib/referrals.ts` — `getOrCreateReferralCode(email)`, `applyReferralCookie(ctx)`, `consumePlanCredit(email)`, `awardCredit(refCode, buyerEmail)`.
- `app/r/[code]/route.ts` — Cookie + redirect.
- `app/api/checkout/route.ts` — Check for unused credit before creating LS checkout. If credit exists, mark paid and trigger generation directly.
- `app/api/webhooks/lemon-squeezy/route.ts` — Award credits after order_created.
- `components/PlanView.tsx` (or `app/plan/[id]/page.tsx`) — Render share-this-link card.

Verify: Two test emails. A buys plan, gets code. A's link → cookie → B opens, fills form, buys. B's purchase fires credit to A. A starts a new plan → checkout skipped, marked paid directly.

**Commit point:** `pivot(P9): referral program`

---

### ☐ P10 — Promo / free-use codes

**Goal:** Marketing codes that grant free or discounted plans (Req 9).

Schema (extends P9):
- New table `promo_codes`: `code` (varchar pk), `discount_type` (free|percent|fixed), `discount_value` (numeric), `max_redemptions`, `redeemed_count`, `expires_at`, `created_at`.
- Migration: `supabase/migrations/0003_promo_codes.sql`.

Flow:
1. On `/plan/loading` (or in popup wizard), add an optional "Have a code?" field at the email step.
2. Validate the code against `promo_codes` (active, not expired, has redemptions left).
3. If valid + free → skip LS, mark paid directly (same path as P9 credit).
4. If valid + percent/fixed → pass discount to LS via `checkout_options.discount` (LS supports preset discount codes — easier path: create the discount in LS dashboard, just reference its code).
5. Increment `redeemed_count` on success.

Files:
- `supabase/migrations/0003_promo_codes.sql`
- `lib/promo.ts` — `validatePromoCode(code)`, `applyPromoCode(planId, code)`.
- `app/api/checkout/route.ts` — Accept optional `promoCode` in body.
- `app/plan/loading/page.tsx` — Promo code input field.
- (Optional admin: `app/admin/promo/page.tsx` — protected by basic auth, list/create codes. Defer to v1.1.)

Verify: Manually insert a free code via SQL. Use it in checkout. Plan marked paid without payment.

**Commit point:** `pivot(P10): promo codes`

---

### ☐ P11 — Visa site funnel rewire

**Goal:** Visa pages drive traffic to the planner. Audit existing CTAs and tighten copy.

Files to modify:
- `app/[locale]/visa/[slug]/page.tsx` — Already has `TripPlannerCTA`. Confirm placement is above-the-fold-secondary (not buried). A/B-able later.
- `app/[locale]/page.tsx` (home) — Hero changes from "Check visa requirements" to **"Plan your perfect trip in 60 seconds — $4"** with the visa map as a secondary section below.
- `app/[locale]/blog/[slug]/page.tsx` — Add inline planner CTA mid-article.
- `components/AffiliateSection.tsx` — Demote affiliate banner; promote planner CTA above it.
- `app/[locale]/sitemap.ts` — Add `/samples/*` and `/plan/new` to sitemap. Exclude `/plan/[id]` (private).
- `app/[locale]/layout.tsx` — Update meta title/description: "AI Trip Planner — Personalized Itineraries from $4".

Verify: Lighthouse SEO check. Confirm visa pages still rank for visa keywords AND prominently surface planner CTA.

**Commit point:** `pivot(P11): visa site funnel rewire`

---

### ☐ P12 — API setup guide doc

**Goal:** Single doc the user (and future you) can follow to provision all third-party accounts.

File to create:
- `docs/SETUP.md`:
  1. **Anthropic** — sign up at console.anthropic.com → create API key → add credit → set `ANTHROPIC_API_KEY`.
  2. **Supabase** — new project → run `supabase/migrations/*.sql` in SQL editor → copy URL + service_role key → set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
  3. **LemonSqueezy** — create store → create $4 product variant → copy IDs + create webhook (URL: `https://checkvisamap.com/api/webhooks/lemon-squeezy`, secret) → set 4 env vars.
  4. **Resend** — sign up → verify domain `checkvisamap.com` (DKIM/SPF DNS records) → API key → set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`.
  5. **Mapbox** — sign up → create token (URL-restricted to `checkvisamap.com`) → set `MAPBOX_TOKEN`.
  6. **Vercel** — import GitHub repo → upgrade to Pro (needed for `maxDuration=300`) → paste env vars → assign domain.
  7. **Affiliate signups** (optional, for Req 15): Klook, Viator (real IDs), Insubuy (real IDs).
- Include the env-var checklist as a copy-paste block at the end.

**Commit point:** `pivot(P12): SETUP.md`

---

### ☐ P13 — QA, polish, launch

**Goal:** Pre-launch checklist. Use existing skills heavily.

Steps:
1. `/qa-only` on a Vercel preview deploy — generates a structured QA report.
2. Fix any P0/P1 bugs.
3. `/design-review` — designer's-eye QA on each major page (home, samples, samples/[slug], plan/new, plan/loading, plan/[id], visa/[slug]). Fix issues.
4. `/review` — pre-landing PR review focused on SQL safety, webhook validation, secrets handling.
5. `/cso` — security audit (LemonSqueezy webhook, Supabase service-role exposure, env var hygiene).
6. End-to-end test with REAL $4 charge using test card → confirm full path: form → checkout → webhook → generation → email → PDF download → web view → map renders.
7. Test in 4 locales.
8. Test referral + promo flows.
9. `/canary` post-deploy monitoring for 24h.
10. Lighthouse: Performance ≥85, SEO ≥95, A11y ≥90.

**Commit point:** `pivot(P13): launch`

---

## 7. File Tree After Pivot (target state)

```
app/
  [locale]/
    layout.tsx                        # next-intl provider, locale banner
    page.tsx                          # home (planner-first)
    samples/
      page.tsx                        # gallery
      [slug]/page.tsx                 # sample plan view
    plan/
      new/page.tsx                    # P2 wizard step 1 (3 questions)
      new/PlanWizardStep1.tsx
      loading/page.tsx                # P3 labor illusion + popup wizard
      [id]/page.tsx                   # full plan view (status=complete)
    visa/[slug]/page.tsx              # existing, with TripPlannerCTA
    blog/...                          # existing
    about/page.tsx                    # existing
    privacy/page.tsx                  # existing
    disclaimer/page.tsx               # existing
  api/
    plan/
      draft/route.ts                  # POST: validate + insert draft
      [id]/pdf/route.tsx              # GET: render PDF
    checkout/route.ts                 # POST: LS checkout OR free-credit path
    webhooks/lemon-squeezy/route.ts   # POST: signature, generate, email
  r/[code]/route.ts                   # P9 referral cookie
  sitemap.ts
  robots.ts
  manifest.ts
components/
  PlanView.tsx                        # P1, shared by /plan/[id] + /samples/[slug]
  PlanMap.tsx                         # existing
  PlanAffiliateBar.tsx                # P7
  TripPlannerCTA.tsx                  # existing
  AffiliateSection.tsx                # existing
  LaborIllusionLog.tsx                # P3
  TravelTrivia.tsx                    # P3
  QuestionPopup.tsx                   # P3
  LocaleSuggestionBanner.tsx          # P5
  WorldMap.tsx                        # existing (visa map)
  ...
lib/
  supabase.ts                         # existing
  plans.ts                            # existing
  lemonsqueezy.ts                     # existing
  email.ts                            # existing
  map.ts                              # existing
  generator/
    claude.ts                         # existing + P6 optimizeDayRoute
  pdf/
    PlanDocument.tsx                  # existing + P8 fun facts
  samples/
    index.ts                          # P1
    tokyo-5d-couple.ts                # P1
    paris-4d-family.ts                # P1
    bangkok-7d-solo.ts                # P1
    seoul-3d-foodie.ts                # P1
  trivia/
    index.ts                          # P3 + P8
  affiliates/
    index.ts                          # P7
  referrals.ts                        # P9
  promo.ts                            # P10
i18n/request.ts                       # P4
messages/
  en.json                             # P4
  zh.json
  ko.json
  ja.json
middleware.ts                         # P4 next-intl + P5 geo-IP
supabase/migrations/
  0001_plans.sql                      # existing
  0002_referrals.sql                  # P9
  0003_promo_codes.sql                # P10
types/trip-plan.ts                    # existing + P2 stroller/infant fields
docs/SETUP.md                         # P12
PIVOT_PLAN.md                         # mirror of this file
```

---

## 8. Verification — Acceptance Criteria

The pivot is "done" when ALL of these pass:

- [ ] `npm run build` clean.
- [ ] Lighthouse: Performance ≥85, SEO ≥95, A11y ≥90 on home + plan/new + samples/[slug].
- [ ] `/samples` shows ≥4 gallery cards. Each renders a beautiful sample plan.
- [ ] `/plan/new` shows ONLY 3 questions on first screen.
- [ ] After "Start AI analysis", labor-illusion screen shows rolling logs + popup questions.
- [ ] All 8 popup questions captured. Final answer triggers checkout redirect.
- [ ] LemonSqueezy checkout for $4 USD opens.
- [ ] Real test purchase with test card → webhook fires → plan generated → email arrives → PDF downloadable → web view renders with interactive map.
- [ ] Map polylines do not visibly zigzag on a 5-day plan.
- [ ] Korean / Japanese / Chinese / English UI all render correctly. Generated plan content matches selected locale.
- [ ] KR-IP visit shows "한국어로 보시겠어요?" banner.
- [ ] Referral: A buys → A gets code → B uses code → B buys → A's next plan free.
- [ ] Promo: free-code redemption path skips LS and marks paid.
- [ ] PDF includes a "Did you know?" callout per day.
- [ ] Visa pages still rank, still show planner CTA above the fold.
- [ ] `docs/SETUP.md` exists and is followable by someone unfamiliar with the project.

---

## 9. Out of Scope (v2)

These were considered and explicitly deferred:
- User accounts / login (secret-UUID model is enough for v1).
- Localized sample plans (English samples for v1).
- Stripe/PayPal as a LemonSqueezy alternative.
- Google Distance Matrix for route optimization (Claude reorder is sufficient).
- Auto-retry queue for failed generations (manual ops for v1).
- Refund webhook handler (manual for v1).
- Admin dashboard for promo codes (SQL-driven for v1).
- Cloudflare Turnstile captcha (only if spam materializes).
- Real-time generation status via WebSocket (poll-on-refresh fine for v1).

---

## 10. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Claude hallucinates closed restaurants | System prompt forbids; samples set the quality bar; manual spot-check first 50 plans |
| Webhook lost / not delivered | LS retries; admin can manually re-trigger via SQL `update plans set status='paid'` |
| Mapbox token leaked client-side | URL-restrict the public token to `checkvisamap.com` referer |
| Service-role Supabase key leaked | Server-only; never imported from `components/`; verify in `/cso` audit |
| LS pricing change requires redeploy | Variant ID is env var, swap without code change |
| User expects refund on bad plan | Auto-refund policy: failed status → manual LS refund within 24h |
| i18n routing breaks existing visa SEO | Use 301 from `/visa/...` → `/en/visa/...`; submit new sitemap to Google Search Console |
| Vercel free tier `maxDuration` cap (10s) kills webhook generation | Vercel Pro required (P12 mentions this) |

---

## 11. Resume Instructions (for future sessions)

If you (Claude) are reading this in a fresh session:

1. **Don't re-plan.** This file is the plan. Read it top to bottom.
2. Run `git log --oneline -20` and look for `pivot(Pn):` commit tags. The highest committed phase is your starting point.
3. Run `git status` to see uncommitted work in the active phase.
4. Resume at the first unchecked box in §6.
5. Memory check: read `MEMORY.md` for any user feedback that might have changed scope.
6. If the user changed their mind on something, **update this file first**, then implement.

---
