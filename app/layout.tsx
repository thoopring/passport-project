import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import LocaleSwitcher from "../components/LocaleSwitcher";
import LocaleSuggestionBanner from "../components/LocaleSuggestionBanner";

const SITE_URL = "https://checkvisamap.com";
const SITE_NAME = "Check Visa Map | Passport Power";
const SITE_DESCRIPTION = "Check visa requirements for 190+ countries instantly. Interactive visa map for 8 major passports. Free travel tool for digital nomads and travelers.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Passport Power",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "visa requirements", "passport power", "visa free countries", "travel visa check",
    "visa map", "digital nomad visa", "visa on arrival", "e-visa",
    "travel requirements 2026", "passport index", "visa checker",
    "South Korea visa", "US visa", "Japan visa", "UK visa",
  ],
  authors: [{ name: "Passport Power Team", url: SITE_URL }],
  creator: "Passport Power",
  publisher: "Passport Power",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
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
        alt: "Passport Power - Check Visa Requirements for 190+ Countries",
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

// JSON-LD Organization Schema
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

// JSON-LD WebSite Schema (enables sitelinks search box in Google)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Passport Power",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?search={search_term_string}`,
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
    <html lang={locale}>
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
          <div className="fixed top-4 right-4 z-40">
            <LocaleSwitcher />
          </div>
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