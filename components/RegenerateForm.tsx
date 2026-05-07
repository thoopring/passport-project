"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
  planId: string;
  regenUsed: boolean;
}

/**
 * Client-side form for the "one free re-do" feature.
 *
 * Driven by user-interview feedback (2026-05-07): the most common
 * no-buy reason was "맘에 안 들면 다시 결제해야 하나" (re-do friction).
 * One free regenerate per plan removes that risk and is teased on
 * the review screen as a trust signal.
 *
 * UX:
 *   - Hidden when regen_used is already true (or omitted prop) so
 *     repeat visits don't tempt a second click.
 *   - Submission flips plan.status to 'generating' server-side, then
 *     router.refresh() lets the existing /plan/[id] page route to the
 *     PostPaymentWait UI on its own — no new wait page needed.
 *   - 4-char minimum on feedback so we don't waste an Opus run on
 *     "asdf"; 1000-char max is handled server-side.
 */
export default function RegenerateForm({ planId, regenUsed }: Props) {
  const t = useTranslations("plan.regenerate");
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (regenUsed) {
    return (
      <div className="rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-5">
        <p className="text-body-sm text-[var(--text-muted)]">
          {t("alreadyUsed")}
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/plan/${planId}/regenerate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback: feedback.trim() }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? `HTTP ${res.status}`);
      }
      // Plan status is now 'generating' — refresh to land on the wait UI.
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-5"
    >
      <p className="text-body-md font-semibold text-[var(--text-primary)] mb-1">
        {t("headline")}
      </p>
      <p className="text-body-sm text-[var(--text-muted)] mb-3">
        {t("subtitle")}
      </p>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder={t("placeholder")}
        rows={3}
        maxLength={1000}
        disabled={submitting}
        className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border-subtle)] rounded-[10px] text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none transition mb-3"
      />
      {error && (
        <p className="text-body-sm text-red-700 mb-3" role="alert">
          {error}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <p className="text-caption text-[var(--text-muted)]">
          {t("oneTimeNote")}
        </p>
        <button
          type="submit"
          disabled={submitting || feedback.trim().length < 4}
          className="px-5 py-2.5 bg-[#1A1A1A] text-white text-body-sm font-medium rounded-md hover:bg-black transition disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {submitting ? t("submitting") : t("submit")}
          {!submitting && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}
