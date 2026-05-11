import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, pickLocale, type Locale } from "./locales";

export { SUPPORTED_LOCALES, LOCALE_LABELS, DEFAULT_LOCALE, pickLocale } from "./locales";
export type { Locale } from "./locales";

/**
 * Resolve the active locale with the following precedence:
 *
 *   1. x-gliddy-locale request header — set by middleware.ts when the
 *      URL has a locale prefix like /ko/, /ja/, /zh/, /fr/. This is
 *      the SEO-critical path: first-visit /ko/blog renders Korean
 *      content on the SAME request, so Google sees a real translation
 *      (not a duplicate of /blog) and indexes the locale variant.
 *
 *      Without this header path, the middleware sets a response
 *      cookie but the SAME request can't see it (cookies live on the
 *      response side; request.cookies is read-only and was empty when
 *      the request arrived). Result: /ko/blog rendered English
 *      content, Google marked all locale URLs as duplicates, and
 *      indexing failed. Fixed 2026-05-11 after GSC surfaced
 *      "/ko/blog crawled, not indexed".
 *
 *   2. NEXT_LOCALE cookie — persists the user's choice across
 *      subsequent requests (internal Link navigation drops the URL
 *      prefix; cookie keeps content in the chosen language).
 *
 *   3. Accept-Language header — geo/browser hint for first visitors
 *      who haven't picked a locale.
 *
 *   4. Default (English).
 *
 * SERVER-ONLY — uses next/headers. Client code should use the locale
 * provided by NextIntlClientProvider via useLocale() instead.
 */
export async function getActiveLocale(): Promise<Locale> {
  const headerStore = await headers();

  // 1. Middleware-set header (URL-prefix routing)
  const middlewareLocale = headerStore.get("x-gliddy-locale");
  if (middlewareLocale) return pickLocale(middlewareLocale);

  // 2. User-set cookie (LocaleSwitcher, prior visits)
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  if (cookieLocale) return pickLocale(cookieLocale);

  // 3. Browser preference
  const accept = headerStore.get("accept-language");
  if (accept) {
    const first = accept.split(",")[0]?.trim();
    return pickLocale(first);
  }

  return DEFAULT_LOCALE;
}

export default getRequestConfig(async () => {
  const locale = await getActiveLocale();
  const messages = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages };
});
