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

- **Direction:** Layla-exact — palette + typography extracted from live layla.ai
  via direct HTML/CSS inspection. Photo-forward travel utility with a
  sophisticated aubergine-on-warm-gray identity. NOT cream (rejected), NOT pure
  white (rejected).
- **Decoration level:** Intentional — photography carries emotion, typography
  carries trust, mauve accent carries differentiation.
- **Mood:** Fresh and crisp but warm-human. Aubergine text is the signature move —
  it separates the product from every generic white/black SaaS.
- **Reference site:** [layla.ai](https://layla.ai) — direct match of bg, text
  color family, font family, accent.
- **First 3 seconds:** "Oh — someone actually thought about this." Quiet
  confidence, not wow-pretty.

## Typography

- **Display/Hero:** **Bricolage Grotesque** (Google Fonts, free, variable weight).
  Modern geometric grotesk. Closest OSS match to Layla's proprietary FigGrotesk.
- **Body / UI / Labels:** **Inter** (Google Fonts, free) — neutral, multiscript.
- **Data / Tables:** Inter with `font-variant-numeric: tabular-nums`.
- **Scale (text-* tokens):** Bricolage for display-xl/lg/md/sm, Inter for body/caption.
  - `display-xl` 4.25rem / 1.02 / -0.025em / weight 600
  - `display-lg` 3rem / 1.06 / -0.022em / 600
  - `display-md` 2.125rem / 1.1 / -0.018em / 600
  - `display-sm` 1.5rem / 1.22 / -0.012em / 600
  - `body-lg` 17px / `body-md` 15px / `body-sm` 13px
  - `caption` 11px / tracking 0.14em (always uppercase)
- **Loading:** `next/font/google` with `display: swap`, CSS variables
  `--font-sans` (Inter) + `--font-display` (Bricolage Grotesque).

## Color

Extracted from layla.ai HTML inspection on 2026-04-21, then corrected after
direct screenshot comparison revealed `#EAE8EA` was an element color (card/
footer), not the page background.

- **Approach:** Restrained. One mauve accent. Photography supplies color variety.
- **Background:** `#FFFFFF` — pure white. Layla's actual page background.
- **Surface secondary:** `#FAF9FA` — subtle warm-tinted off-white for nested surfaces.
- **Ink (primary text):** `#0A0A0A` — near-black. Layla's text reads as pure
  black in side-by-side comparison; aubergine was an earlier misread.
- **Ink secondary:** `#525252` — muted gray for supporting text.
- **Text muted (weakest):** `#9A9A9A` — captions, tertiary labels.
- **Mauve (primary accent):** `#815652` — dusty rose / mauve, Layla's button
  and link accent. Used sparingly — 1–2 times per view.
- **Lavender soft:** `#EFE6FF` — for subtle backgrounds / focus states
  (Layla's suggestion pill background family).
- **Lavender:** `#CDB3FF` — for stronger emphasis (Layla's pill hover / active).
- **Border light:** `#E8E4EA`
- **Border subtle:** `#F2EFF3`
- **Dark mode:** Not supported in v1.

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

- **Shared shell:** `<Header />` + `<Footer />`. Brand wordmark in Bricolage Grotesque bold.
- **Photo hero:** `next/image` with `priority` on above-the-fold images, `sizes`
  set for responsive delivery.
- **Wizard form:** `<PlanWizardStep1 />` — destination / days / budget. Focus
  rings in mauve at 20% alpha.
- **Cards:** Photo top + white surface bottom with hairline border. `hover-lift`
  class for subtle interaction.

## Anti-patterns (never do this)

- Purple/violet/indigo gradient anything (aubergine is our color, not gradient).
- 3-column icon-in-colored-circle feature grid.
- Centered everything on every section.
- Uniform bubbly border-radius on all elements.
- Decorative blobs, floating circles, wavy SVG dividers.
- Emoji as design elements.
- Generic hero copy ("Welcome to X", "Unlock the power of Y").
- Gradient buttons.
- Cream background (rejected in P14a + P15).
- Pure white background on marketing pages (rejected in P14d).

## Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-04-21 | **Layla-exact palette via direct HTML extraction** | After 3 aesthetic rounds (cream+serif, white+cobalt, cream+serif+photos), user asked to MATCH Layla literally. Extracted palette + fonts directly from layla.ai HTML source. |
| 2026-04-21 | **Bricolage Grotesque replaces Instrument Serif** | Discovered Layla uses FigGrotesk (sans), not serif. Earlier screenshot read-through was wrong. Bricolage Grotesque is closest OSS match on Google Fonts. |
| 2026-04-21 | **Correction: bg = white, ink = near-black** | User provided side-by-side screenshot (`public/vs.png`). Revealed `#EAE8EA` was an element color, not the page bg; text was near-black, not aubergine. Corrected in P17. |
| 2026-04-21 | **Correction: hero = left-text / right-photo grid** | Layla's side-by-side composition was missed. P17 home now uses `grid lg:grid-cols-[1.15fr_1fr]` with photo sticky on desktop, stacked on mobile. |
| 2026-04-21 | Chat-style natural language input deferred to v1.1 | Layla uses a single free-text input instead of 3 separate form fields. Requires backend AI parsing. Kept 3-field wizard for launch. |
| 2026-04-21 | Keep photography as core ingredient | Validated across P15, P16, P17 — photos are non-negotiable for this aesthetic. |
