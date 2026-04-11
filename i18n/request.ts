import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, pickLocale, type Locale } from "./locales";

export { SUPPORTED_LOCALES, LOCALE_LABELS, DEFAULT_LOCALE, pickLocale } from "./locales";
export type { Locale } from "./locales";

/**
 * Read the user's preferred locale from cookie first, then Accept-Language
 * header, then default. Cookie wins because the user explicitly set it via
 * the LocaleSwitcher.
 *
 * SERVER-ONLY — uses next/headers. Client code should use the locale provided
 * by NextIntlClientProvider via useLocale() instead.
 */
export async function getActiveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  if (cookieLocale) return pickLocale(cookieLocale);

  const headerStore = await headers();
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
