/**
 * Pure locale constants — safe to import from both client and server code.
 *
 * KEEP THIS FILE FREE OF SERVER-ONLY IMPORTS (no next/headers, no fs, etc.)
 * The server-side request config lives in i18n/request.ts.
 */

export const SUPPORTED_LOCALES = ["en", "ko", "ja", "zh"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  zh: "中文",
};

/** Pick a Locale from a raw cookie/header value, falling back to default. */
export function pickLocale(raw: string | undefined | null): Locale {
  if (!raw) return DEFAULT_LOCALE;
  // Strip BCP-47 region (e.g. en-US -> en, zh-CN -> zh)
  const base = raw.toLowerCase().split("-")[0];
  if ((SUPPORTED_LOCALES as readonly string[]).includes(base)) {
    return base as Locale;
  }
  return DEFAULT_LOCALE;
}
