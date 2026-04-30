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
    url: SITE_URL,
    siteName: "gliddy",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "gliddy — AI trip plans, sorted",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: { canonical: SITE_URL },
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
