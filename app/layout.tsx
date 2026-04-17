import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import LocaleSuggestionBanner from "../components/LocaleSuggestionBanner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const SITE_URL = "https://checkvisamap.com";
const SITE_NAME = "Passport Power — AI trip plans from $4";
const SITE_DESCRIPTION =
  "Answer three questions and get a full trip plan in minutes. Hotel, airport transit, day-by-day itinerary, restaurants, and a route map. $4 per plan.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Passport Power",
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
  ],
  authors: [{ name: "Passport Power Team", url: SITE_URL }],
  creator: "Passport Power",
  publisher: "Passport Power",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Passport Power",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Passport Power — AI trip plans from $4",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
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
  },
  other: {
    "agd-partner-manual-verification": "",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Passport Power",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@checkvisamap.com",
    contactType: "customer service",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Passport Power",
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
    <html lang={locale} className={inter.variable}>
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
          <LocaleSuggestionBanner />
          {children}
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
