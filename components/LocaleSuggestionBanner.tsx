"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { LOCALE_LABELS, type Locale, SUPPORTED_LOCALES } from "../i18n/locales";

/**
 * Geo-IP language suggestion banner. Reads the SUGGEST_LOCALE cookie set by
 * middleware.ts and shows a non-intrusive top bar offering to switch.
 *
 * Behavior:
 *   - Mounts client-side and reads document.cookie (no SSR rendering — banner
 *     simply absent on first paint, fades in after hydration)
 *   - Hides if user is already on the suggested locale
 *   - "Switch" sets NEXT_LOCALE cookie + clears suggestion + reloads
 *   - "No thanks" sets SUGGEST_DISMISSED cookie (1 year) + clears suggestion
 */
export default function LocaleSuggestionBanner() {
  const currentLocale = useLocale() as Locale;
  const [suggested, setSuggested] = useState<Locale | null>(null);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)SUGGEST_LOCALE=([^;]+)/);
    if (!match) return;
    const raw = match[1] as Locale;
    if (!SUPPORTED_LOCALES.includes(raw)) return;
    if (raw === currentLocale) {
      // Already on it — clear suggestion silently
      document.cookie = "SUGGEST_LOCALE=; path=/; max-age=0";
      return;
    }
    setSuggested(raw);
  }, [currentLocale]);

  if (!suggested) return null;

  const accept = () => {
    document.cookie = `NEXT_LOCALE=${suggested}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    document.cookie = "SUGGEST_LOCALE=; path=/; max-age=0";
    window.location.reload();
  };

  const dismiss = () => {
    document.cookie = `SUGGEST_DISMISSED=1; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    document.cookie = "SUGGEST_LOCALE=; path=/; max-age=0";
    setSuggested(null);
  };

  // Use the suggested locale's native label so the user understands the prompt
  // even before switching.
  const promptText = SUGGEST_PROMPTS[suggested];
  const switchLabel = SUGGEST_BUTTON_SWITCH[suggested];
  const dismissLabel = SUGGEST_BUTTON_DISMISS[suggested];

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-[var(--text-primary)] text-[var(--background)] py-2.5 px-4 shadow-lg animate-in slide-in-from-top duration-300">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
        <p className="text-body-sm font-medium">
          {promptText} <span className="opacity-60">({LOCALE_LABELS[suggested]})</span>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={accept}
            className="px-3 py-1.5 bg-white text-[var(--text-primary)] text-caption font-bold rounded-full hover:opacity-90 transition"
          >
            {switchLabel}
          </button>
          <button
            onClick={dismiss}
            className="px-3 py-1.5 text-caption opacity-70 hover:opacity-100 transition"
          >
            {dismissLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// These are static — we want to show the prompt in the SUGGESTED language, not
// the current one, since the user is being asked if they want to switch TO it.
const SUGGEST_PROMPTS: Record<Locale, string> = {
  en: "View this site in English?",
  ko: "한국어로 보시겠어요?",
  ja: "日本語で表示しますか?",
  zh: "切换为中文?",
};

const SUGGEST_BUTTON_SWITCH: Record<Locale, string> = {
  en: "Switch",
  ko: "전환",
  ja: "切り替え",
  zh: "切换",
};

const SUGGEST_BUTTON_DISMISS: Record<Locale, string> = {
  en: "No thanks",
  ko: "괜찮아요",
  ja: "結構です",
  zh: "不用",
};
