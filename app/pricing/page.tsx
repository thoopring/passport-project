import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PRICING_CONTENT } from "./content";
import type { Locale } from "../../i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const c = PRICING_CONTENT[locale] ?? PRICING_CONTENT.en;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "https://checkvisamap.com/pricing" },
  };
}

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "gliddy trip plan",
  description:
    "Personalized, AI-generated trip plan delivered as a mobile-responsive web link plus a downloadable PDF.",
  offers: {
    "@type": "Offer",
    price: "4.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://checkvisamap.com/plan/new",
  },
};

export default async function PricingPage() {
  const locale = (await getLocale()) as Locale;
  const c = PRICING_CONTENT[locale] ?? PRICING_CONTENT.en;
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      <Header />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
          {c.eyebrow}
        </p>
        <h1 className="font-display text-display-md sm:text-display-lg text-[var(--text-primary)] leading-[1.06] mb-4">
          {c.headline}
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] max-w-xl mb-12">
          {c.intro}
        </p>

        {/* Price card */}
        <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-8 mb-12">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display text-[3.5rem] leading-none text-[var(--text-primary)] tracking-[-0.02em]">
              $4
            </span>
            <span className="text-body-md text-[var(--text-muted)]">
              {c.priceUnit}
            </span>
          </div>
          <p className="text-body-sm text-[var(--text-muted)] mb-6">
            {c.priceFootnote}
          </p>

          <ul className="space-y-3 mb-8">
            {c.features.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body-md text-[var(--text-primary)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5 text-[var(--brand-primary)]">
                  <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/plan/new"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white font-medium rounded-md hover:bg-black transition"
          >
            {c.ctaButton}
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* FAQ */}
        <h2 className="font-display text-display-sm text-[var(--text-primary)] mb-6">
          {c.faqHeading}
        </h2>
        <dl className="divide-y divide-[var(--border-subtle)]">
          {c.faqs.map(({ q, a }) => (
            <div key={q} className="py-5">
              <dt className="font-semibold text-body-md text-[var(--text-primary)] mb-1.5">{q}</dt>
              <dd className="text-body-sm text-[var(--text-secondary)] leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] text-body-sm text-[var(--text-muted)]">
          <p>
            {c.legalPrefix}{" "}
            <Link href="/terms" className="underline underline-offset-4">{c.termsLabel}</Link>{" · "}
            <Link href="/privacy" className="underline underline-offset-4">{c.privacyLabel}</Link>{" · "}
            <Link href="/refund" className="underline underline-offset-4">{c.refundLabel}</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
