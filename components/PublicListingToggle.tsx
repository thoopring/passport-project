"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
  planId: string;
  initialPublicListed: boolean;
}

/**
 * Phase 0 of community sharing — an opt-in toggle that lets the buyer
 * publish their plan to the (eventually-shipped) public gallery. See
 * docs/COMMUNITY-SHARING-PLAN.md for the full plan.
 *
 * Default OFF. Privacy by default. The copy explicitly tells the buyer
 * what gets stripped (email, exact dates) and what shows publicly so
 * they can opt in with informed consent.
 *
 * Why ship the toggle before the gallery exists:
 *   - First buyers can opt in immediately. By the time the gallery
 *     ships in Phase 1, we'll have a non-empty launch set.
 *   - "Be one of the first" framing turns early buyers into brand
 *     ambassadors — they're featured first when the gallery launches.
 *
 * UX: a card that mirrors SavePlanCta + RegenerateForm visually so
 * the post-purchase tray reads as one consistent column of actions.
 * Optimistic UI: flip the local state immediately, fall back if the
 * server call fails. A 5-10 minute round-trip is unacceptable for a
 * trivial toggle.
 */
export default function PublicListingToggle({
  planId,
  initialPublicListed,
}: Props) {
  const t = useTranslations("plan.communityListing");
  const [enabled, setEnabled] = useState(initialPublicListed);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    if (submitting) return;
    const next = !enabled;
    setError(null);
    setEnabled(next); // optimistic
    setSubmitting(true);
    try {
      const res = await fetch(`/api/plan/${planId}/visibility`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_listed: next }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? `HTTP ${res.status}`);
      }
    } catch (err) {
      setEnabled(!next); // revert
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-body-md font-semibold text-[var(--text-primary)] mb-1">
            {t("headline")}
          </p>
          <p className="text-body-sm text-[var(--text-muted)]">
            {t("subtitle")}
          </p>
        </div>

        {/* Toggle switch — accessible button, not an actual <input
            type="checkbox"> because we want the satisfying click target
            and animated thumb without per-browser default styling
            getting in the way. role="switch" + aria-checked keeps
            screen-reader semantics correct. */}
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={t("toggleLabel")}
          onClick={handleToggle}
          disabled={submitting}
          className={`shrink-0 relative inline-flex h-7 w-12 items-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            enabled
              ? "bg-[var(--brand-primary)]"
              : "bg-[var(--border-light)]"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Privacy disclosure + first-mover framing — the two messages
          that drive opt-in confidence. Always visible (not gated on
          the toggle state) so undecided buyers see both before
          flipping. */}
      <div className="mt-4 space-y-2 text-caption text-[var(--text-muted)]">
        <p>· {t("privacyHidden")}</p>
        <p>· {t("privacyShown")}</p>
        <p>· {t("comingSoon")}</p>
      </div>

      {error && (
        <p className="mt-3 text-body-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
