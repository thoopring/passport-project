"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import TravelTrivia from "./TravelTrivia";
import WaitHeroCarousel from "./WaitHeroCarousel";
import WaitSampleShowcase, { type ShowcaseSample } from "./WaitSampleShowcase";

/**
 * PostPaymentWait — post-checkout screen the buyer sees while their plan
 * generates.
 *
 * Quality-first launch: the pipeline runs Sonnet at max_tokens=64000 with
 * an optional Opus planner stage. Real wall-clock for a packed-pace
 * Korean/Japanese plan can be 5-10 minutes. The previous text-only
 * design (red eyebrow + headline + stage text + progress bar + tiny
 * trivia card) felt broken for a wait that long.
 *
 * This redesign:
 *   - Full-bleed photo carousel up top (visible motion every 12s)
 *   - Stage messages still rotate but live underneath the photo
 *   - Calibrated for ~10 minutes (progress bar over 240s, premium-care
 *     stage messages start at 180s)
 *   - Reassurance card honestly says "5-10 minutes" — no "1 minute"
 *     copy anywhere on the site
 *   - Sample showcase grid below gives the buyer something to actively
 *     do during the wait (open a curated plan in another tab)
 *
 * Responsibilities:
 *   1. Broadcast a `paid` event so the opener tab (/plan/loading)
 *      redirects away from the stale review screen.
 *   2. Poll /api/plan/[id]/status every 4s. Auto-redirect on complete.
 *   3. Drive the visual: stage text + progress bar + photo carousel.
 *
 * The 95% progress ceiling is intentional — fake progress never hits
 * 100%, only the real status transition to 'complete' does.
 */

const STAGE_KEYS = [
  "checking",
  "routing",
  "sights",
  "polish",
  "almost",
  // Premium-tone messages for users who stick around past 3 minutes.
  // The framing flips from "we're working" to "we're investing extra
  // care for YOU" — turns a long wait into anticipation.
  "premiumCare", // 180s+
  "premiumGem", // 240s+
  "premiumFinal", // 360s+
] as const;
// Stage thresholds calibrated for the quality-first pipeline (5-10 min).
// Values are seconds elapsed at which we promote to the next message.
const STAGE_TIMINGS = [0, 30, 75, 130, 180, 240, 360, 480];
// Asymptotic ceiling for the fake progress bar. Ticks toward 95% over
// PROGRESS_DURATION_S seconds. Past the ceiling the bar plateaus and
// the premium stage messages take over the engagement load.
const PROGRESS_DURATION_S = 240;

interface Props {
  planId: string;
  /** For the rotating trivia cards. Falls back to a generic set if absent. */
  destinationCountry?: string;
  /** Curated sample plans shown in the bottom showcase grid. Server-fetched
   *  in /plan/[id]/page.tsx so we get the user's locale applied. */
  showcaseSamples?: ShowcaseSample[];
}

type Status = "paid" | "generating" | "complete" | "failed";

export default function PostPaymentWait({
  planId,
  destinationCountry,
  showcaseSamples = [],
}: Props) {
  const t = useTranslations("plan.wait");
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] = useState<Status>("paid");
  const [failureReason, setFailureReason] = useState<string | null>(null);
  const startedAt = useRef(Date.now());

  // 1) Broadcast paid → opener tab (loading page) listens and redirects.
  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) return;
    const ch = new BroadcastChannel("passport-plan-sync");
    ch.postMessage({ type: "paid", planId });
    return () => ch.close();
  }, [planId]);

  // 2) 1Hz tick for the progress/stage UI.
  useEffect(() => {
    const h = setInterval(() => {
      setElapsed(Math.round((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => clearInterval(h);
  }, []);

  // 3) Poll status every 4s. Stop on terminal states.
  useEffect(() => {
    let cancelled = false;
    let handle: ReturnType<typeof setTimeout> | null = null;

    const tick = async () => {
      try {
        const res = await fetch(`/api/plan/${planId}/status`, {
          cache: "no-store",
        });
        if (cancelled) return;
        if (res.ok) {
          const body = (await res.json()) as {
            status: Status;
            failureReason: string | null;
          };
          setStatus(body.status);
          if (body.failureReason) setFailureReason(body.failureReason);
          if (body.status === "complete") {
            window.location.href = `/plan/${planId}`;
            return;
          }
          if (body.status === "failed") return;
        }
      } catch {
        // Transient — just retry on next tick.
      }
      handle = setTimeout(tick, 4000);
    };

    tick();
    return () => {
      cancelled = true;
      if (handle) clearTimeout(handle);
    };
  }, [planId]);

  // Pick the latest stage whose threshold we've crossed.
  const stageIndex = Math.max(
    0,
    STAGE_TIMINGS.findLastIndex((s) => elapsed >= s),
  );
  const stageKey = STAGE_KEYS[stageIndex];

  // Progress bar approaches 95% asymptotically over PROGRESS_DURATION_S.
  const progressPct = Math.min(
    95,
    Math.round((elapsed / PROGRESS_DURATION_S) * 95),
  );

  // Format elapsed as M:SS for the pill — "8:42" reads better than "522".
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const elapsedDisplay = `${minutes}:${String(seconds).padStart(2, "0")}`;

  if (status === "failed") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <p className="text-caption uppercase tracking-[0.18em] text-red-600 mb-3">
            {t("failedBadge")}
          </p>
          <h1 className="font-display text-display-md text-[var(--text-primary)] mb-3">
            {t("failedTitle")}
          </h1>
          <p className="text-body-sm text-[var(--text-muted)]">
            {failureReason || t("failedGeneric")}
          </p>
          <p className="text-body-sm text-[var(--text-muted)] mt-4">
            {t("failedRefund")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Hero photo carousel — the wait page's anchor visual. The wait
            screen used to feel "broken" because nothing on it moved
            without text changing. Now there's always a fading photo. */}
        <WaitHeroCarousel />

        {/* Status pill row — paid badge on the left, elapsed time on
            the right. Concrete numbers so the user knows the system is
            tracking the wait, not frozen. */}
        <div className="flex items-center justify-between mt-6 mb-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent-dark)] text-caption font-bold uppercase tracking-[0.14em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
            {t("paidBadge")}
          </span>
          <span className="text-caption text-[var(--text-muted)] tabular-nums">
            {t("elapsedPill", { time: elapsedDisplay })}
          </span>
        </div>

        <h1 className="font-display text-display-md sm:text-display-lg text-[var(--text-primary)] tracking-[-0.02em] leading-[1.05]">
          {t("headline")}
        </h1>

        {/* Stage text — rotates as the user crosses thresholds. */}
        <p className="text-body-md text-[var(--text-secondary)] mt-3 mb-6 min-h-[1.5em] transition-opacity duration-300">
          {t(`stage.${stageKey}`)}
        </p>

        {/* Progress bar — asymptotic to 95%, closes only on real complete. */}
        <div className="mb-2">
          <div className="h-2 bg-[var(--surface-secondary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--brand-primary)] transition-all duration-1000 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Reassurance card — honest 5-10 min framing, prominent placement
            (not a tiny footer caption). Many users will close this tab
            and check email; we want them to feel safe doing so. */}
        <div className="mt-8 bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-[14px] px-5 py-4 flex items-start gap-3">
          <div className="shrink-0 w-9 h-9 rounded-full bg-[var(--accent-soft)] flex items-center justify-center mt-0.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--accent-primary)]"
              aria-hidden
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-body-sm font-semibold text-[var(--text-primary)]">
              {t("leaveTitle")}
            </p>
            <p className="text-caption text-[var(--text-secondary)] mt-0.5 leading-relaxed">
              {t("leaveSubtitle")}
            </p>
          </div>
        </div>

        {/* Trivia for engagement — country-aware when we have facts for it. */}
        <div className="mt-8">
          <TravelTrivia destinationCountry={destinationCountry ?? "default"} />
        </div>

        {/* Sample showcase — give the buyer something productive to do
            while waiting. Each card opens in a new tab so the polling
            on this tab continues uninterrupted. */}
        <WaitSampleShowcase samples={showcaseSamples} />

        <p className="text-caption text-[var(--text-muted)] mt-10 font-mono text-center">
          {t("planIdLabel")}: {planId.slice(0, 8)}
        </p>
      </div>
    </div>
  );
}
