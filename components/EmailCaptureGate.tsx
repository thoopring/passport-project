"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Full-screen inline email capture shown between the Step-1 wizard and the
 * /plan/loading screen. Framed as "where we'll send your finished plan" — a
 * delivery mechanism, not a paywall gate — so we capture the address BEFORE
 * the long generation wait. This is the only abandoned-funnel recovery
 * channel: it replaces the old end-of-queue email popup that captured nobody
 * who dropped off before the very last question.
 */
export default function EmailCaptureGate({
  onSubmit,
  onBack,
}: {
  onSubmit: (email: string) => void;
  onBack?: () => void;
}) {
  const t = useTranslations("wizard.emailCapture");
  const [email, setEmail] = useState("");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] flex flex-col items-center justify-center px-4 sm:px-6 animate-in fade-in duration-300">
      <div className="w-full max-w-md text-center">
        <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
          {t("badge")}
        </p>
        <h1 className="font-display font-bold text-display-md sm:text-display-lg text-[var(--text-primary)] leading-[1.05] mb-3 tracking-[-0.02em]">
          {t("headline")}
        </h1>
        <p className="text-body-md text-[var(--text-secondary)] mb-8 max-w-sm mx-auto">
          {t("subtitle")}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) onSubmit(email.trim());
          }}
          className="space-y-3 text-left"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder")}
            autoFocus
            autoComplete="email"
            className="w-full px-4 py-3.5 bg-white border border-[var(--border-light)] rounded-md text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
          />
          <button
            type="submit"
            disabled={!valid}
            className="w-full px-6 py-3.5 bg-[#1A1A1A] text-white font-medium rounded-md hover:bg-black transition disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {t("submit")}
            <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className="text-caption text-[var(--text-muted)] mt-4">{t("privacyNote")}</p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-6 text-body-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
          >
            ← {t("back")}
          </button>
        )}
      </div>
    </div>
  );
}
