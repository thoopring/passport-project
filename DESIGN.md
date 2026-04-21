# Design System — Passport Power

> Always read this file before making any visual or UI decisions. All font
> choices, colors, spacing, and aesthetic direction live here. Do not deviate
> without explicit user approval.

## Product Context

- **What this is:** AI trip planner. User inputs destination, duration, and budget; AI
  generates a day-by-day itinerary with hotel pick, airport transit, restaurants, and a
  route map. Delivered via email + PDF.
- **Who it's for:** Global travelers, mostly mobile, ages 20–60, non-technical.
- **Space:** Travel + AI utility hybrid. Competing with Wanderlog, Layla, Hopper.
- **Project type:** Hybrid — marketing home + product pages (wizard, plan, samples).
- **Price:** $4 per plan. One-time. No subscription.

## Aesthetic Direction

- **Direction:** Editorial-warm travel utility. Calibrated against Layla.ai —
  photo-forward, serif-headlined, warm-paper background, clean utility underneath.
- **Decoration level:** Intentional — photography carries emotion, typography
  carries trust, everything else restrained.
- **Mood:** Aspirational but grounded. Like opening a well-designed travel magazine
  that happens to also take your booking. NOT luxury (too precious for $4), NOT
  generic SaaS (forgettable).
- **Reference sites:** [layla.ai](https://layla.ai), [wanderlog.com](https://wanderlog.com)
- **First 3 seconds:** "Oh — someone actually thought about this." Quiet
  confidence, not wow-pretty.

## Typography

- **Display/Hero:** **Instrument Serif** (Google Fonts, free) — sharp contemporary
  serif with editorial authority. Used for headlines, destination names, section
  titles, brand wordmark. Italics allowed for rhythm.
- **Body / UI / Labels:** **Inter** (Google Fonts, free) — neutral, multiscript,
  proven workhorse.
- **Data / Tables:** Inter with `font-variant-numeric: tabular-nums`.
- **Scale (text-* tokens):**
  - `display-xl` 4.5rem / 1.02 leading / -0.02em tracking / weight 400 (serif)
  - `display-lg` 3.25rem / 1.06 / -0.018em / 400 (serif)
  - `display-md` 2.25rem / 1.1 / -0.015em / 400 (serif)
  - `display-sm` 1.625rem / 1.2 / -0.01em / 500 (serif)
  - `body-lg` 17px
  - `body-md` 15px
  - `body-sm` 13px
  - `caption` 11px / tracking 0.14em (always uppercase)
- **Loading:** `next/font/google` with `display: swap`, CSS variables
  `--font-sans`, `--font-display`.

## Color

- **Approach:** Restrained. One warm accent. Photography supplies color variety.
- **Paper (background):** `#F5EFE4` — warm cream, reads like uncoated magazine paper.
- **Surface (cards):** `#FFFFFF` — white as a material, not default.
- **Ink (primary text):** `#141517` — near-black, whisper of blue.
- **Ink muted:** `#6E6B64` — warm graphite, for secondary text and hairlines.
- **Text muted (weakest):** `#9B978D` — captions, tertiary labels.
- **Vermilion (primary accent):** `#D4442B` — warm coral/vermilion, hanko-stamp
  red. CTAs, primary links, brand emphasis. Used sparingly — 1–2 times per view.
- **Border light:** `#E5DFD4`
- **Border subtle:** `#EEE8DC`
- **Surface secondary:** `#F9F4EB` — slightly warmer than paper, for nested surfaces.
- **Dark mode:** Not supported in v1. Warm-paper identity does not translate.

## Spacing

- **Base unit:** 4px. All spacing is a multiple of 4.
- **Density:** Comfortable. Not compact, not airy.
- **Scale:** 2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80.

## Layout

- **Approach:** Hybrid — grid-disciplined for product pages, left-aligned
  editorial for marketing.
- **Max content width:** 1080px (wide) / 720px (reading) / 512px (form).
- **Border radius scale:** `sm` 2px / `md` 6px / `lg` 10px / `xl` 14px / `2xl` 20px.
  Never uniform bubbly radius on everything.
- **Photography:** Required on home, samples gallery, sample detail pages.
  Sourced from Unsplash (free tier) via `next/image` with `images.unsplash.com`
  allowed in `next.config.ts`.

## Motion

- **Approach:** Minimal-functional. Only transitions that aid comprehension.
- **Easing:** `ease-out` for entering, `ease-in` for exiting, `cubic-bezier(0.16, 1, 0.3, 1)` for smooth lift.
- **Duration:** micro 100ms / short 200ms / medium 300ms.
- **No:** scroll-linked animations, parallax, page transitions, decorative blobs.

## Components

- **Shared shell:** `<Header />` + `<Footer />`. Brand wordmark in Instrument Serif.
- **Photo hero:** `next/image` with `priority` on above-the-fold images, `sizes`
  set for responsive delivery.
- **Wizard form:** `<PlanWizardStep1 />` — destination / days / budget. Focus
  rings in vermilion at 20% alpha.
- **Cards:** Photo top + white surface bottom with hairline border. `hover-lift`
  class for subtle interaction.

## Anti-patterns (never do this)

- Purple/violet/indigo gradient anything.
- 3-column icon-in-colored-circle feature grid.
- Centered everything on every section.
- Uniform bubbly border-radius on all elements.
- Decorative blobs, floating circles, wavy SVG dividers.
- Emoji as design elements (rocket emoji in headlines, etc.).
- Generic hero copy ("Welcome to X", "Unlock the power of Y").
- Gradient buttons.

## Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-04-21 | Layla-lean direction (cream + serif + photography + vermilion) confirmed | User saw editorial-luxury P14a fail (no photography) and utility-minimal P14d fail (no character). Layla reference provides the missing recipe: photography as emotional anchor, serif as trust anchor. |
| 2026-04-21 | Instrument Serif over Fraunces | Fraunces rejected in P14a. Instrument Serif is sharper / more contemporary / less soft. |
| 2026-04-21 | Vermilion `#D4442B` over gold or cobalt | Warm accent to pair with warm-paper bg. Gold (P14a) too luxury. Cobalt (P14d) too cold. Vermilion hanko-stamp red anchors the travel-editorial mood. |
| 2026-04-21 | Unsplash photography over AI-generated | Free, stable, curated. AI generation requires separate workflow and risks looking off. |
