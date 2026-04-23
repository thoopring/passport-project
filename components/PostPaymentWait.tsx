"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import TravelTrivia from "./TravelTrivia";

/**
 * PostPaymentWait — the screen a buyer sees after returning from LemonSqueezy
 * checkout while the plan is still generating. Replaces the old "title +
 * refresh button" page that forced users to spam-click refresh.
 *
 * Responsibilities:
 *   1. Broadcast a `paid` event on BroadcastChannel("passport-plan-sync") on
 *      mount, so the opener tab (/plan/loading) can redirect itself away
 *      from the stale review-summary view.
 *   2. Poll /api/plan/[id]/status every 4s. When status === "complete", hard
 *      navigate to /plan/[id] (without ?paid=1) to render the final plan.
 *   3. Show fake-but-calibrated progress (0→95% over ~70s) + stage text
 *      ticking through believable milestones + rotating trivia cards so the
 *      wait doesn't feel dead.
 *
 * The 95% ceiling is intentional — we never tick to 100% from fake progress,
 * only on the real status transition to 'complete'.
 */

const STAGE_KEYS = ["checking", "routing", "sights", "polish", "almost"] as const;
const STAGE_TIMINGS = [0, 8, 22, 42, 58];

interface Props {
  planId: string;
  /** For the rotating trivia cards. Falls back to a generic set if absent. */
  destinationCountry?: string;
}

type Status = "paid" | "generating" | "complete" | "failed";

export default function PostPaymentWait({ planId, destinationCountry }: Props) {
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

  // Fake progress that approaches 95% asymptotically over ~70s.
  const progressPct = Math.min(95, Math.round((elapsed / 70) * 95));

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
    <div className="min-h-[80vh] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-caption uppercase tracking-[0.18em] font-semibold text-[var(--accent-primary)] mb-4">
          {t("paidBadge")}
        </p>

        <h1 className="font-display text-display-lg text-[var(--text-primary)] tracking-[-0.02em] mb-3">
          {t("headline")}
        </h1>

        {/* Rotating stage text */}
        <p className="text-body-md text-[var(--text-secondary)] mb-8 min-h-[1.5em] transition-opacity duration-300">
          {t(`stage.${stageKey}`)}
        </p>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-2">
          <div className="h-2 bg-[var(--surface-secondary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--brand-primary)] transition-all duration-1000 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mt-2 text-caption text-[var(--text-muted)] tabular-nums">
            {t("elapsed", { seconds: elapsed })}
          </p>
        </div>

        {/* Trivia for engagement */}
        <div className="mt-10 max-w-md mx-auto">
          <TravelTrivia destinationCountry={destinationCountry ?? "default"} />
        </div>

        <p className="text-caption text-[var(--text-muted)] mt-10">
          {t("emailHint")}
        </p>
        <p className="text-caption text-[var(--text-muted)] mt-1 font-mono">
          {t("planIdLabel")}: {planId.slice(0, 8)}
        </p>
      </div>
    </div>
  );
}
