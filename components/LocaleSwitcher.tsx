"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { LOCALE_LABELS, SUPPORTED_LOCALES, type Locale } from "../i18n/locales";

/**
 * Simple language switcher. Sets the NEXT_LOCALE cookie via a tiny API call
 * (or document.cookie) and refreshes the page so the server reads the new
 * value via getActiveLocale().
 */
export default function LocaleSwitcher() {
  const currentLocale = useLocale() as Locale;
  const [pending, startTransition] = useTransition();

  const setLocale = (locale: Locale) => {
    // Cookie write is a deliberate side effect inside an event handler.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <div className="inline-flex items-center gap-1 bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-full p-1">
      {SUPPORTED_LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          disabled={pending}
          onClick={() => setLocale(loc)}
          className={`px-3 py-1 text-caption font-semibold rounded-full transition ${
            currentLocale === loc
              ? "bg-[var(--text-primary)] text-[var(--background)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
          aria-current={currentLocale === loc ? "true" : undefined}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
