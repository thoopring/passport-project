# Status — gliddy launch prep

> **Last updated:** 2026-04-29 (master-prompt sweep complete)
> **Branch:** main
> **Latest commit:** `89da363` — sample CTA redesign (Phase 2)
> **Working tree:** clean

Quick-resume document. After /compact or new session, read this first to
understand current state, decisions made, and next priority action.

---

## 🎯 Current Phase: Launch Prep (post-design, pre-deploy)

Design + content are essentially complete. The remaining work is
operational (deploy, analytics, email validation) plus 5-locale
translations of the 3 newest samples.

```
████████████████████ 100% (codebase + design + content)
█████████████████░░░  ~85% (launch readiness)
```

**Immediate blocker:** Lemon Squeezy approval — founder is sending response
email to Ankith TODAY (2026-04-29) with both demo videos attached.
Approval = real money flow unlocked. ETA 3-7 business days.

---

## ✅ What's Done

### Auth + Account (N1 / N2 / N3 / N5)
- Magic-link only (Supabase OTP). N4 password DEFERRED (data first).
- `/login`, `/auth/callback`, `/account` all i18n in 5 langs.
- Post-payment SavePlanCta on `/plan/[id]` funnels to magic-link.
- `/login?email=&next=` prefill + safe-redirect on callback.
- Referral celebration on /account (CSS confetti + sendReferralCreditEarnedEmail in 5 langs).

### Sample plans (E1 / E2 / E3 / D2 / D2-i18n)
- 13 hand-curated samples in EN at marketing-grade depth:
  - Tokyo, Osaka, Seoul, Taipei, Bangkok, Hanoi, Bali, Paris, London, NYC
  - **+ Reykjavik (4d couple), Cusco (5d couple), Dubai (4d couple)** — added 2026-04-29
- ko/ja/zh/fr translations COMPLETE for ALL 13 samples (D2-i18n done 2026-04-29).
- Color diversity for new 3: icy Iceland / Andean Cusco / gold Dubai.

### Master-prompt sweep (2026-04-29 evening)
- **P1**: removed `priceTier: "$$$"` rendering from PlanView, home Tokyo card,
  PDF — read as raw garbage in non-USD locales. Schema field retained.
- **P3**: stripped `$4` and quantitative time refs from all marketing
  surfaces. messages/{en,ko,ja,zh,fr}.json wizard submit/payButton/badge,
  account CTAs, heroStatSpeed (60s → "Map included" / 지도 포함 /
  含路线地图 / 地図付き / Carte incluse). brand.ts, layout, manifest,
  opengraph-image, about/blog, plan/new metadata, plan/loading referral
  banner, TripPlannerCTA. /pricing and /terms keep $4 (legal/explicit
  price). Sample data retained (real local item prices like $4 mango).
- **P4**: localized hardcoded EN in Header (5 nav + aria), Footer (3
  groups + 11 links + disclaimer + copyright), PlanView (`{n}-day
  itinerary · {country}` template + `Tip:`), PlanAffiliateBar
  (toolkit/disclosure), LaborIllusionLog (25-key wait.log namespace
  with all branches), QuestionPopup (progress labels — emoji-free per
  memory). All 5 locales translated.
- **P5**: gliddy identity + USD-only — removed last 'in minutes'
  claims on /about, USD-only billing already messaged on /pricing.
- **P2**: redesigned sample-page bottom CTA — vermilion radial glow,
  italic Fraunces headline with ss01/02/03 swash, vermilion pill
  button replacing white slab, hover lift+glow. Stays inside the
  Layla-lean palette (no indigo/purple gradient).

### Design (D1 — multiple iterations)
- Variant-E hybrid hero: Live chip (pulsing dot) + italic-Fraunces 'sorted' + HomeWizard input + 4-pill stat strip + sample destination links.
- 6 lifestyle hero photos (founder hand-picked):
  Thai boats / Times Square / vintage camera / Kyoto kimono /
  Trevi selfie / sunset silhouettes. (Slots 1, 5 are Unsplash+ premium; founder has subscription.)
- Sample card format upgraded to mockup-E style: photo + Day 1 theme + first 4 stops listed.
- Featured 3 on home: Tokyo + Paris + Bali (global mix, not all Asia).
- Italic Fraunces with ss01/02/03 swash on hero EM for 설레임.

### Copy
- All quantitative time refs removed from marketing surfaces ("1분 / minute / 分 / 秒 / minute").
- $4 stripped from hero, footer, title, samples page, samples CTA buttons. KEPT only on `/pricing`.
- Samples page subtitle + languageNote rewritten to service-receiving tone (was: defensive "no free trials" + commanding "click and read like yours" + outdated "samples in English only").
- Hero subtitle 5 langs rewritten in marketing-grade voice.
- New i18n keys across 5 langs: heroLiveChip, heroStatSpeed/Rating/NoAccount/Offline, heroTrySample.

### Image fixes
- Seoul sample heroImage replaced (Unsplash silently rotated old URL to broken content).
- Osaka sample heroImage replaced (same issue — was showing pink sunset; now Tsutenkaku Tower).
- All 13 sample heroImages verified live 2026-04-29.

### Legal pages (LS readiness)
- `/terms` (16 sections, governing law: Republic of Korea), `/privacy` (9), `/refund` (6), `/disclaimer`.
- Footer with all 4 links rendered globally.
- `/pricing` page with $4 + FAQ + Schema.org Product/Offer markup.

---

## ⏳ What's Pending

### 🔥 Top priority (currently in progress)
- **LS1** — LemonSqueezy approval response email. Founder sending TODAY with:
  - Demo video long: https://youtu.be/a_XRvGR9leA
  - Demo video short: https://youtu.be/b2bQ4fBMmAs
  - LinkedIn: https://www.linkedin.com/in/민수-김-670a70258/
  - GitHub: https://github.com/thoopring
  - Personal email: thoopring@gmail.com
  - Site email: hello@checkvisamap.com
  - Final email body drafted in conversation history; founder is sending now.

### 🚀 Big work after LS approval
- **L4** — Vercel env + DNS + Resend domain + LS webhook URL update (founder).
  - Required env vars listed in `.env.example`. Critical: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (added 2026-04-28).
- ~~**D2-i18n**~~ ✅ Done 2026-04-29 — Reykjavik / Cusco / Dubai translated to ko/ja/zh/fr (12 sparse overrides).
- ~~**Master-prompt sweep**~~ ✅ Done 2026-04-29 — P1 priceTier, P3 $4/time strip, P4 i18n, P5 brand, P2 CTA redesign.
- **L2** — GA4/PostHog locale-tagged analytics. Needs: `page_view`, `wizard_started`, `checkout_started`, `checkout_completed`, `account_signup`, `account_visit`, `referral_shared`, `credit_used`. ~3-4h.

### 💎 Medium
- **L1** — Test confirmation email delivery in 5 langs (after L4 deploy). Founder.
- **LS2** — Real $4 production purchase test after LS approves. Founder.

### 🧊 Nice-to-have
- **L3** — "Send to phone" QR code on PC plan page (cross-device convenience).
- **D3+** — More design-shotgun passes if needed (Wizard, Plan view, Account).

### Launch+ (data-driven)
- Kakao social login (if Korean traffic is high).
- Passkey/WebAuthn (if Western tech-forward).
- N4 password (if account adoption > 30% AND login friction tickets surface).
- Africa / Oceania samples (Cape Town, Sydney) for continent coverage.

---

## 📋 Key Decisions Log

| Decision | Reason | Status |
|---|---|---|
| Magic-link only (no password) | Service positioning + 1-person support burden + 95% buyers don't need account; data will tell | DEFERRED N4 |
| $4 only on /pricing, not hero/footer/title | Price-feel varies by reader + future-proof if price changes | EXECUTED |
| No quantitative time in marketing copy | "1분/under a minute" reads as non-marketing | EXECUTED |
| Lifestyle hero photos > postcard destinations | Stronger marketing hook; people not landmarks | EXECUTED |
| Featured 3 = Tokyo+Paris+Bali (global mix) | Diversity over Asian-heavy slice(0,3) | EXECUTED |
| 13 samples (added Reykjavik+Cusco+Dubai) | Color + continent diversity | EXECUTED |
| Italic Fraunces swash for 'sorted' EM | Editorial flourish, more 설레임 | EXECUTED |
| Skip Lisbon/Marrakech/Mexico City (warm-tones) | Color similarity rejected by founder | REJECTED |

---

## 🗂️ File Layout (recent additions)

```
lib/samples/
  index.ts                           ← 13 entries, HERO_W=2400 hero URLs
  reykjavik-4d-couple.ts             ← NEW 2026-04-29
  cusco-5d-couple.ts                 ← NEW 2026-04-29
  dubai-4d-couple.ts                 ← NEW 2026-04-29
  i18n/
    ko.ts                            ← 10 sample retrofits done
    ja.ts                            ← 10 sample retrofits done
    zh.ts                            ← 10 sample retrofits done (older session)
    fr.ts                            ← 10 sample retrofits done (older session)

components/
  CreditCelebration.tsx              ← Referral 셀러브레이션 (N5)
  SavePlanCta.tsx                    ← Post-payment save (N2)

app/
  account/page.tsx                   ← i18n done
  login/page.tsx                     ← i18n done + email/next prefill
  auth/callback/page.tsx             ← i18n done + safe redirect
  page.tsx                           ← Home with variant-E hybrid hero

messages/
  {en,ko,ja,zh,fr}.json              ← All 5 langs synced through 2026-04-29
```

---

## 🛠️ Useful Commands

```bash
npm run build        # ~8s, ~30 routes
npm run dev          # localhost:3000
npx tsc --noEmit     # type-check
git log --oneline -20
git status --short
```

```bash
# Live photo URL test
curl -s -o /dev/null -w "%{http_code}" \
  "https://images.unsplash.com/photo-XXX?w=400&q=80"
```

---

## 🔄 Resume Prompt (for new session after compact)

```
Continue gliddy launch prep. Read STATUS.md for current state.
Most recent commit: 4c8b3f4. Just shipped: 3 new EN samples
(Reykjavik/Cusco/Dubai). LS approval email sent (waiting on Ankith).

Next priorities (pick one, or tell me which):
A) D2-i18n — start translating Reykjavik to ko (then ja/zh/fr)
B) L2 — GA4/PostHog locale-tagged analytics setup
C) L4 — Vercel env + DNS + webhook deploy support
D) Wait for LS response, then resume.
```

---

## 📞 Contacts & URLs

```
Site:                 https://checkvisamap.com
Site email:           hello@checkvisamap.com
Founder email:        thoopring@gmail.com
LinkedIn:             https://www.linkedin.com/in/민수-김-670a70258/
GitHub:               https://github.com/thoopring
GitHub repo:          https://github.com/thoopring/passport-project
Demo video (long):    https://youtu.be/a_XRvGR9leA
Demo video (short):   https://youtu.be/b2bQ4fBMmAs
LS reviewer:          Ankith @ Lemon Squeezy
```
