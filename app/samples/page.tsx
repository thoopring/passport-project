import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { listSamples } from "../../lib/samples";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("samples");
  return {
    title: `${t("metaTitle")} — Passport Power`,
    description: t("metaDescription"),
    alternates: { canonical: "https://checkvisamap.com/samples" },
    openGraph: {
      title: `${t("metaTitle")} — Passport Power`,
      description: t("metaDescription"),
      url: "https://checkvisamap.com/samples",
      type: "website",
    },
  };
}

export default async function SamplesGalleryPage() {
  const t = await getTranslations("samples");
  const samples = listSamples();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
            {t("badge")}
          </p>
          <h1 className="font-display text-display-lg md:text-display-xl text-[var(--text-primary)] mb-4 leading-tight">
            {t("headline")}
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {samples.map((sample) => (
            <Link
              key={sample.slug}
              href={`/samples/${sample.slug}`}
              className="group block bg-[var(--surface-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-light)] p-7 rounded-lg hover-lift"
            >
              <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-4">
                {sample.audience}
              </p>
              <h2 className="font-display text-display-sm text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-primary)] transition">
                {sample.plan.destination}
              </h2>
              <p className="text-body-sm text-[var(--text-muted)] mb-4">
                {sample.plan.durationDays} days · {sample.plan.destinationCountry}
              </p>
              <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                {sample.tagline}
              </p>
              <span className="text-body-sm font-medium text-[var(--brand-primary)] inline-flex items-center gap-1.5">
                {t("readSample")}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 border-t border-[var(--border-subtle)] pt-12 text-center">
          <h2 className="font-display text-display-md text-[var(--text-primary)] mb-3">
            {t("ctaHeadline")}
          </h2>
          <p className="text-body-md text-[var(--text-secondary)] max-w-md mx-auto mb-7">
            {t("ctaSubtitle")}
          </p>
          <Link
            href="/plan/new"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[var(--brand-primary)] text-white font-medium rounded-md hover:opacity-90 transition"
          >
            {t("ctaButton")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
