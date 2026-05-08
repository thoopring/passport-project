import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from "../../i18n/locales";

const SITE_URL = "https://checkvisamap.com";

/**
 * Build a path-with-locale-prefix for the given locale. Default locale
 * (English) stays at the root path; non-default locales get a `/ko/`,
 * `/ja/`, `/zh/`, `/fr/` prefix.
 *
 * The middleware (middleware.ts) handles the inverse — strips the
 * prefix on incoming requests, sets NEXT_LOCALE cookie, and rewrites
 * to the existing root-level page. So `/ko/about` serves the Korean
 * version of `/about` without requiring an `app/[locale]/` restructure.
 *
 * Why "as-needed" prefixing (default at root, others prefixed):
 *   - Existing English URLs (the indexed ones) keep working unchanged
 *   - No 301 redirect chain on any current Google result
 *   - Smaller URL surface for the dominant audience
 */
export function localizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return cleanPath;
  // Avoid double-slashing the root: /ko/ + / → /ko/, /ko + /about → /ko/about
  if (cleanPath === "/") return `/${locale}`;
  return `/${locale}${cleanPath}`;
}

/**
 * Build a fully-qualified URL with locale prefix.
 */
export function localizedUrl(path: string, locale: Locale): string {
  return `${SITE_URL}${localizedPath(path, locale)}`;
}

/**
 * Build the `alternates` block for a Next.js `Metadata` object so each
 * page declares its hreflang siblings + canonical. This is the single
 * largest piece of multi-locale SEO infrastructure — without it Google
 * has no way to know that `/about` and `/ko/about` are the same content
 * in different languages.
 *
 * Pass the language-neutral path (e.g. `/about`, `/samples/tokyo-4d`).
 * Returns an alternates object with:
 *   - canonical: the default-locale URL (English root)
 *   - languages: a record mapping every supported locale to its
 *     localized URL, plus `x-default` pointing back to the canonical
 *
 * `x-default` tells Google which version to serve when no language
 * matches the user's preference (the global fallback).
 */
export function localizedAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    languages[locale] = localizedUrl(path, locale);
  }
  languages["x-default"] = localizedUrl(path, DEFAULT_LOCALE);

  return {
    canonical: localizedUrl(path, DEFAULT_LOCALE),
    languages,
  };
}

/**
 * Sitemap-side alternate-language declaration. Mirrors the per-page
 * `alternates.languages` but in the shape Next.js `MetadataRoute.Sitemap`
 * accepts (top-level `alternates` field on each entry).
 */
export function sitemapAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    languages[locale] = localizedUrl(path, locale);
  }
  return { languages };
}

export { SITE_URL };
