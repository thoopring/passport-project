"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { initPosthog, setAnalyticsLocale, analytics } from "../lib/analytics";

/**
 * Initializes PostHog (graceful no-op when key is missing) and fires a
 * locale-tagged page_view on every route change. GA4 is initialized at the
 * `<GoogleAnalytics>` boundary in app/layout.tsx; this provider just makes
 * sure every event we send has the active locale attached.
 *
 * Mounts inside NextIntlClientProvider so useLocale() resolves correctly.
 */
export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const pathname = usePathname();

  // One-time init + locale super-property registration.
  useEffect(() => {
    initPosthog({
      key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
    setAnalyticsLocale(locale);
  }, [locale]);

  // Locale-tagged page_view per route change.
  useEffect(() => {
    if (!pathname) return;
    analytics.pageView({ path: pathname, locale });
  }, [pathname, locale]);

  return <>{children}</>;
}
