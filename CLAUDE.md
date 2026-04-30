# gliddy (AI Trip Planner)

## Project Overview
- **URL**: https://checkvisamap.com
- **Product**: Personalized AI trip plans for $4 — hotel, airport transit, day-by-day
  itinerary, restaurants, and a route map. Delivered by email + PDF.
- **Tech Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3,
  Supabase, LemonSqueezy, Resend, Mapbox, react-pdf, next-intl,
  Anthropic Claude Sonnet 4.5
- **Deploy Target**: Vercel Pro (webhook needs `maxDuration=300`)

## Architecture
```
app/
  layout.tsx          - Root layout (next/font Inter+Fraunces, GA/GTM, Locale provider)
  page.tsx            - Home (server component: hero + 3 sample cards + footer)
  about/page.tsx      - About / story
  blog/page.tsx       - Journal index (empty-state after visa content scrub)
  blog/[slug]/page.tsx - Journal post detail
  blog/data.ts        - Blog post data (currently empty)
  samples/page.tsx    - Sample plans gallery
  samples/[slug]/page.tsx - Sample plan detail (PlanView)
  plan/new/           - 3-question wizard entry (PlanWizardStep1)
  plan/loading/       - Labor-illusion loading + popup orchestrator
  plan/[id]/          - Paid plan detail (PlanView + ShareReferralCard)
  api/                - Draft, checkout, webhook, PDF routes
  r/[code]/           - Referral redirect
  privacy/ disclaimer/ - Legal pages
  sitemap.ts robots.ts manifest.ts
components/
  Header.tsx Footer.tsx     - Shared minimal shell
  PlanView.tsx              - Shared plan renderer (paid + sample)
  PlanMap.tsx               - Mapbox route map
  PlanAffiliateBar.tsx      - Sidebar affiliate toolkit on plan pages
  QuestionPopup.tsx         - Single-question modal (wizard)
  LaborIllusionLog.tsx      - Fake progress log during generation
  TravelTrivia.tsx          - Rotating trivia cards
  ShareReferralCard.tsx     - Share link + credit copy
  LocaleSwitcher.tsx        - Top-right language toggle
  LocaleSuggestionBanner.tsx - Geo-IP suggestion banner
  TripPlannerCTA.tsx        - Reusable CTA button
  AffiliateLink.tsx         - Tracked outbound link
lib/
  generator/claude.ts       - Claude Sonnet 4.5 generator (locale + route optimization)
  samples/                  - Hand-curated sample plans (Tokyo/Paris/Bangkok/Seoul)
  affiliates/index.ts       - Affiliate URL builders (Agoda, Aviasales, Airalo, Klook, Viator)
  plans.ts referrals.ts promo.ts email.ts  - DB + email helpers
i18n/ messages/             - next-intl config + en/ko/ja/zh translations
supabase/migrations/        - 0001_plans, 0002_referrals, 0003_promo_codes
```

## Design System
See **DESIGN.md** in the repo root for the full design system. Always read it before
making visual or UI decisions. Summary:
- Layla-lean aesthetic (photo-forward travel editorial + clean utility)
- **Palette:** warm paper `#F5EFE4` bg, ink `#141517`, vermilion accent `#D4442B`
- **Fonts:** Instrument Serif (display) + Inter (body), via `next/font/google`
- **No dark mode**
- Photography from Unsplash (free) — required on marketing surfaces

## Key Conventions
- Slug format: `{destination}-{days}d-{audience}` for samples (e.g. `tokyo-4d-couple`)
- Affiliate links must use `rel="noopener noreferrer sponsored"`
- Blog content is HTML stored in TypeScript objects in `app/blog/data.ts`
- All paid plans have unguessable UUIDs as access tokens (no login in v1)
- Plan data flow: `/plan/new` → draft → `/plan/loading` → `/api/checkout` →
  LemonSqueezy → webhook → generation → email → `/plan/[id]`

## Revenue Streams
1. **Trip plans**: $4 per plan via LemonSqueezy (primary)
2. **Affiliate Programs**: Agoda, Aviasales, Airalo embedded in plan output (`PlanAffiliateBar`)
3. **Referrals**: Buyer shares `/r/{code}` → referee gets 25% off immediately at LS (REFERRAL25 code auto-applied). After referee pays, referrer earns a 25% off coupon for their next plan (consumed by routing through LS with REFERRAL25, not bypass)
4. **Promos**: `/plan/new?promo=CODE` → 100% off promos (admin-issued, e.g. `LAUNCH100`) bypass LS entirely. Used for marketing/comp.

## SEO Setup
- OpenGraph + Twitter cards on all pages
- JSON-LD schemas: Organization, WebSite, AboutPage
- Dynamic metadata with `generateMetadata()` on dynamic routes
- XML sitemap (`app/sitemap.ts`) covers home, plan/new, samples, samples/*, blog, blog/*, about, privacy, disclaimer
- Google Search Console verified (see `layout.tsx` verification)

## Development Commands
```bash
npm run dev      # Local development
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

## Env Vars (see docs/SETUP.md + .env.example)
`ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
`LEMON_SQUEEZY_API_KEY`, `LEMON_SQUEEZY_STORE_ID`, `LEMON_SQUEEZY_VARIANT_ID`,
`LEMON_SQUEEZY_WEBHOOK_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
`MAPBOX_TOKEN` (or `NEXT_PUBLIC_MAPBOX_TOKEN`), `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_POSTHOG_KEY` (optional — graceful no-op when unset)

## Analytics
Locale-tagged events fire to **GA4 (`G-3LF8H03QZG`) + PostHog** through a
single typed wrapper at `lib/analytics.ts`. Every event carries a `locale`
property (super-property registered on PostHog) so funnels can be sliced
by language. PostHog is initialized in `components/AnalyticsProvider.tsx`,
mounted inside `NextIntlClientProvider` in `app/layout.tsx`.

Catalog (typed in `lib/analytics.ts:AnalyticsEvents`):
- `page_view` — fires on every route change
- `wizard_started` — Home wizard or `/plan/new` form first interaction
- `checkout_started` — user clicks "Build my plan" on `/plan/loading`
- `checkout_completed` — buyer lands on completed `/plan/[id]` (deduped via localStorage)
- `account_signup` — first-ever magic-link verification on `/auth/callback`
- `account_visit` — `/account` page load (with `has_plans`, `credits` count)
- `referral_shared` — copy-link from `<ShareReferralCard>`
- `credit_used` — promo code or referral credit applied at checkout

Use the typed helpers from `lib/analytics.ts`:
```ts
import { analytics } from "@/lib/analytics";
analytics.wizardStarted({ locale, destination, source: "home" });
```
Legacy events (affiliate_click, plan_draft_created) flow through `trackLegacy()`.

## Content Strategy
- Sample plans in `lib/samples/*.ts` are the AI quality bar (the generator should
  produce plans at least as good as these)
- Blog (`/blog`) currently empty after pivot; future non-visa journal content TBD

## Important Notes
- Home page is now a server component (removed client-side state after pivot)
- Sample plan pages use `generateStaticParams()` for SSG
- Webhook route declares `export const maxDuration = 300` — requires Vercel Pro
- Google Analytics: `G-3LF8H03QZG` | GTM: `GTM-TPRWDJ9X`
