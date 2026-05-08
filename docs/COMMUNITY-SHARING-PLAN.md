# Community Sharing — Phased Build Plan

> **Status (2026-05-07):** Phase 0 shipped. Phase 1+ gated on first-customer funnel data.
>
> **Owner:** Founder direction; CC executes per phase.
>
> **How to reload this plan:**
> - In a future session, say: "Read docs/COMMUNITY-SHARING-PLAN.md and resume from the next pending phase."
> - Or shorter: "Resume community plan."
> - Memory entry [project_community_sharing.md](../../../.claude/projects/C--Users-kms-passport-project/memory/project_community_sharing.md) holds the pointer + current phase.

## Why we're building this

Founder thesis (2026-05-07): "다른 사람 꺼 그냥 보고 따라가야지 하는 유저들이 많이 들어올거 같아."

This solves the **timing problem** surfaced in user interviews (#11, #12 — "여행 예정 없음 = 안 산다"). A community gallery turns no-trip-planned visitors into **future buyers** instead of immediate bounces:

```
Before:  여행 예정 없음 → 사이트 떠남 → 안 옴
After:   여행 예정 없음 → 갤러리 둘러봄 → 마음에 듦 → 3개월 뒤 여행 결심 → 돌아와서 본인 plan 결제
```

It's the Pinterest pattern: discover → save → eventually act. The conversion bridge is the **"이 plan 시작점으로 내 거 만들기"** button (Phase 1) that prefills the wizard from a public plan's request.

## Hard constraints

1. **Privacy by default.** Public listing is opt-in. Default OFF on every plan.
2. **Strip private fields on publish.** Always strip: email, exact dates, child ages, hotel name (if booked). Keep: destination, day-by-day, traveler type, interests, budget tier.
3. **Don't dilute $4.** A public plan is someone else's exact trip. Buyers still need their own dates / airport / hotel / dietary needs covered. Sample plans (13 hand-curated) already exist publicly without killing conversion — community plans are the same model at scale.
4. **No accounts until Phase 3.** Magic-link auth exists but adding required login here kills opt-in rate. Anonymous browsing + URL-based ownership for Phase 0-2.
5. **Founder controls quality.** Phase 0-1 is curated, not algorithmic. Phase 2+ adds hearts. Phase 3+ adds comments with moderation.

---

## Phase 0 — Opt-in toggle (SHIPPED 2026-05-07)

**Status:** ✅ DONE

What we built:
- Migration `0007_plan_public_listed.sql` — adds `public_listed boolean default false` column to plans table.
- `setPlanPublicListed(id, public_listed)` in `lib/plans.ts`.
- `POST /api/plan/[id]/visibility` route — accepts `{public_listed}`, no auth (URL is the access token, same as everywhere else on /plan/[id]).
- `components/PublicListingToggle.tsx` — client-side toggle card on /plan/[id], directly below RegenerateForm.
- 5-locale strings (`plan.communityListing.*`).

User-facing copy on every paid plan:
> "이 plan을 갤러리에 공개할까요? — 갤러리 곧 출시 예정. 지금 옵트인하면 첫 사례로 소개해 드려요. 이메일·정확한 날짜는 안 보여요."

Why we shipped before having a gallery to point to:
- Cost is ~1 hour total (DB column + toggle UI + locales).
- First buyers can opt in immediately. By the time we hit Phase 1 we'll have actual plans to launch the gallery with — not an empty page.
- "Be one of the first" framing turns early buyers into brand ambassadors.

## Phase 1 — Public gallery (GATED on Phase 0 + 5 paid customers)

**Status:** Pending. Condition: ≥5 paid plans with `public_listed=true`.

Build:
- New page `/community` — anonymous browsing, no login required.
- Anonymous plan card grid (destination, duration, traveler type, day-1 theme, hero photo).
- Detail view at `/community/[id]` — same as `/plan/[id]` but with private fields stripped.
- Search by destination.
- **Critical conversion bridge:** "이 plan 시작점으로 내 거 만들기" button → prefills wizard with this plan's destination + duration + traveler type + interests + budget, leaves dates/airport/hotel/notes blank for the buyer.

Effort: 2-3 days.

When to start: as soon as 5 buyers have opted in. Don't launch with an empty grid.

### SEO prep ALREADY DONE (2026-05-08)

Sitemap helper + integration is pre-wired so Phase 1 can ship without
touching SEO infrastructure:

- `lib/community/listed-plans.ts` — `listPublicPlans()` queries Supabase
  for completed plans with `public_listed=true`. Already wired into
  `app/sitemap.ts`.
- Sitemap inclusion is feature-flagged behind
  `process.env.COMMUNITY_GALLERY_ENABLED === "true"` so the prep
  doesn't emit 404 URLs during the gating period.
- When Phase 1 ships:
  1. Build `/community` and `/community/[id]` pages.
  2. Set `COMMUNITY_GALLERY_ENABLED=true` in Vercel env.
  3. Sitemap automatically picks up `/community` + every public
     plan's `/community/[id]`, with hreflang siblings via
     `sitemapAlternates()`.
  4. No sitemap.ts edit needed at Phase 1 ship time.

This is "Task 5" in the 2026-05-08 SEO sprint — the sitemap is ready
to recognise community URLs the moment they exist.

## Phase 2 — Engagement signals (GATED on 20+ public plans)

Add:
- Hearts. Anonymous, 1 per IP+localStorage. No login.
- View counter. Server-side, debounced.
- Sort: 최신순 / 인기순 / "trending this week".

Effort: 2-3 days. Bot risk addressed by IP+localStorage gate; real moderation comes in Phase 3.

## Phase 3 — Real community (GATED on 50+ public plans)

- Magic-link login required to comment.
- Comments per plan with founder moderation (or simple AI first-pass filter).
- User profiles ("내 공개 plan 모음" page).
- Save / favorite other people's plans.

Effort: 1-2 weeks.

Hard requirement: spam moderation playbook. Don't ship without it.

## Phase 4 — Scale (much later)

Followers, feeds, trending, editor's picks, SEO long-tail tag pages ("한국인이 짜는 도쿄 plan", "비건 파리 plan", etc).

Effort: open-ended; depends on success of Phase 3.

---

## Decision criteria (when to escalate phases)

| From → To | Required signal |
|---|---|
| Phase 0 → 1 | ≥5 paid plans with `public_listed=true` |
| Phase 1 → 2 | ≥20 public plans rendered + ≥1k unique gallery visitors / 7d |
| Phase 2 → 3 | ≥50 public plans + sustained gallery DAU |
| Phase 3 → 4 | ≥100 active commenters / month + measurable engagement halo |

Don't escalate without the signal. Building gallery features without supply (public plans) or demand (gallery traffic) is wasted effort that competes with conversion fixes for time.

## Risk register

| Risk | Mitigation |
|---|---|
| Public plan exposes PII | Hard-coded strip list in publish renderer; never trust the schema not to grow new private fields. Every new field added to PlanRequest needs an explicit "is this public-safe?" review. |
| Spam comments (Phase 3) | Magic-link login + founder mod + AI first-pass filter. No commenting in Phase 0-2. |
| Heart bot (Phase 2) | IP + localStorage debounce. If abused, escalate to login-gated hearts. |
| Public plans dilute $4 product | Counter-argument: someone else's plan ≠ your plan (different airport, dates, hotel, dietary). Existing 13 samples already public without killing conversion. Watch the metric: if conversion rate drops after Phase 1, retreat. |
| Bad-quality plans on the front page | Founder-curated featured row in Phase 1. Algorithmic in Phase 2 (sorted by hearts). Manual takedown always available. |

## Engineering notes

- Plan UUID never changes across regenerations, so a `public_listed=true` plan that's regenerated stays public. Toggle is content-agnostic.
- `public_listed` is a single boolean. We do NOT add `published_at`, `view_count`, `heart_count`, etc. in Phase 0 — those columns land in Phase 2 alongside the features that consume them. Don't over-schema.
- Authorization model: URL is the access token, same as the existing /plan/[id] read path. Anyone with the link can toggle. Acceptable risk: a leaked link letting someone publish your plan. If this becomes a real problem, escalate to email-confirmation-on-toggle.
- Public plan render path will be a SEPARATE component from PlanView (don't reuse), because the strip logic is too important to bury inside a "if public, hide email" branch in the existing render.
