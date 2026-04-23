"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { LOCALE_LABELS, SUPPORTED_LOCALES, type Locale } from "../i18n/locales";

/**
 * Layla-style language picker — a single compact button in the header
 * that opens a modal with a flag-annotated grid of supported languages.
 *
 * Replaces the previous 4-pill inline switcher, which ate horizontal space
 * and didn't scale as we add locales (Hindi, Russian, Arabic planned).
 *
 * Behavior:
 * - Closed: shows a globe icon + current language native name.
 * - Open: centered modal with backdrop, 2-column grid on sm+, 1-column on
 *   very narrow screens. ESC closes, outside click closes, same-language
 *   click closes without a reload.
 * - On select: writes the NEXT_LOCALE cookie and reloads so the server
 *   picks up the new preference.
 */

const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇺🇸",
  ko: "🇰🇷",
  ja: "🇯🇵",
  zh: "🇨🇳",
};

const LOCALE_ENGLISH: Record<Locale, string> = {
  en: "English",
  ko: "Korean",
  ja: "Japanese",
  zh: "Chinese",
};

export default function LocaleSwitcher() {
  const currentLocale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const select = (loc: Locale) => {
    if (loc === currentLocale) {
      setOpen(false);
      return;
    }
    document.cookie = `NEXT_LOCALE=${loc}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={pending}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-caption font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-primary)] transition disabled:opacity-50"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{LOCALE_LABELS[currentLocale]}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Choose language"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            ref={dialogRef}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-[1.25rem] text-[var(--text-primary)]">
                Choose language
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-full text-[var(--text-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)] transition inline-flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-2">
              {SUPPORTED_LOCALES.map((loc) => {
                const isActive = loc === currentLocale;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => select(loc)}
                    disabled={pending}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl border text-left transition ${
                      isActive
                        ? "bg-[var(--surface-secondary)] border-[var(--text-primary)]"
                        : "bg-white border-[var(--border-light)] hover:border-[var(--text-secondary)]"
                    } disabled:opacity-50`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="text-[1.5rem] leading-none" aria-hidden="true">
                      {LOCALE_FLAGS[loc]}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-body-sm text-[var(--text-primary)] truncate">
                        {LOCALE_LABELS[loc]}
                      </span>
                      <span className="text-caption text-[var(--text-muted)] truncate">
                        {LOCALE_ENGLISH[loc]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
