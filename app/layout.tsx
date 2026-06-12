import type { Metadata } from "next";
import "./globals.css";
import { Inter, Bricolage_Grotesque, Fraunces } from "next/font/google";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import LocaleSuggestionBanner from "../components/LocaleSuggestionBanner";
import AnalyticsProvider from "../components/AnalyticsProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

// Fraunces — modern serif for marketing headlines. Adds warmth + travel-
// editorial character to the cleaner Pretendard body. Used via the
// `.font-fraunces` utility class and inherited by `.prose h1/h2/h3`.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const SITE_URL = "https://checkvisamap.com";
const SITE_NAME = "gliddy — AI trip plans, sorted";
const SITE_DESCRIPTION =
  "Tell us where you're going and we'll design the trip for you. Day-by-day itinerary, hotel pick matched to your airport, restaurants, and a route map. No subscription, no account.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | gliddy",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI trip planner",
    "personalized travel itinerary",
    "travel planning AI",
    "trip itinerary generator",
    "custom travel plan",
    "Tokyo itinerary",
    "Paris itinerary",
    "Bangkok itinerary",
    "Seoul itinerary",
    "travel route map",
    "gliddy",
  ],
  authors: [{ name: "gliddy", url: SITE_URL }],
  creator: "gliddy",
  publisher: "gliddy",
  icons: { icon: "/icon.png", shortcut: "/icon.png", apple: "/icon.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    // Other supported locales served at /ko, /ja, /zh, /fr — signal them
    // to crawlers so the right localized card surfaces per market.
    alternateLocale: ["ko_KR", "ja_JP", "zh_CN", "fr_FR"],
    url: SITE_URL,
    siteName: "gliddy",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    // og:image is auto-injected from app/opengraph-image.tsx (the file
    // convention) — no explicit URL here so it can't drift to a 404.
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    // twitter:image likewise comes from app/opengraph-image.tsx.
  },
  alternates: {
    canonical: SITE_URL,
    // hreflang signals — every supported locale's home URL plus an
    // x-default fallback. Without this Google indexes only one locale
    // and ignores the other 4 even though middleware serves them at
    // /ko/, /ja/, /zh/, /fr/. See lib/i18n/seo.ts for path conventions.
    languages: {
      en: SITE_URL,
      ko: `${SITE_URL}/ko`,
      ja: `${SITE_URL}/ja`,
      zh: `${SITE_URL}/zh`,
      fr: `${SITE_URL}/fr`,
      "x-default": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "R31CCusp43HzLDTuTSiA9NnWNWi4KI2wGd4fKTEnF6I",
    // Bing Webmaster + Naver Search Advisor verification meta tags. Set
    // BING_SITE_VERIFICATION and NAVER_SITE_VERIFICATION in Vercel env
    // after registering the site at:
    //   - https://www.bing.com/webmasters
    //   - https://searchadvisor.naver.com
    // Each platform offers meta-tag, HTML-file, or DNS-TXT verification.
    // Pick meta-tag and paste the content value via env so re-verifying
    // doesn't require a code redeploy.
    other: {
      ...(process.env.BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
        : {}),
      ...(process.env.NAVER_SITE_VERIFICATION
        ? { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION }
        : {}),
    },
  },
  other: { "agd-partner-manual-verification": "" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "gliddy",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  contactPoint: {
    "@type": "ContactPoint",
    email: "gliddy@checkvisamap.com",
    contactType: "customer service",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "gliddy",
  url: SITE_URL,
  // SearchAction points at the real wizard entry — /plan/new reads the
  // `dest` query param (app/plan/new/page.tsx) and prefills step 1. No
  // fake search endpoint; this is the live, working path.
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/plan/new?dest={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${bricolage.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <GoogleTagManager gtmId="GTM-TPRWDJ9X" />

      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AnalyticsProvider>
            <LocaleSuggestionBanner />
            {children}
          </AnalyticsProvider>
        </NextIntlClientProvider>

        <Script
          id="travelpayouts-verification"
          src="https://emrld.cc/NDkxNjEy.js?t=491612"
          strategy="afterInteractive"
        />

        <GoogleAnalytics gaId="G-3LF8H03QZG" />
      </body>
    </html>
  );
}
