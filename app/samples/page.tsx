import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { listSamples } from "../../lib/samples";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("samples");
  return {
    title: `${t("metaTitle")} — gliddy`,
    description: t("metaDescription"),
    alternates: { canonical: "https://checkvisamap.com/samples" },
    openGraph: {
      title: `${t("metaTitle")} — gliddy`,
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
        <div className="text-center mb-14">
          <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
            {t("badge")}
          </p>
          <h1 className="font-display text-display-lg md:text-display-xl text-[var(--text-primary)] leading-[1.04] mb-4">
            {t("headline")}
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            {t("subtitle")}
          </p>
          <p className="text-caption uppercase tracking-[0.14em] text-[var(--accent-primary)] font-semibold max-w-xl mx-auto mt-5 inline-block px-3 py-1 rounded-full bg-[var(--accent-soft)]">
            🌐 {t("languageNote")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {samples.map((sample) => (
            <Link
              key={sample.slug}
              href={`/samples/${sample.slug}`}
              className="group block rounded-[10px] overflow-hidden border border-[var(--border-subtle)] bg-white hover-lift"
            >
              <div className="relative aspect-[16/10] bg-[var(--surface-secondary)]">
                <Image
                  src={sample.heroImage}
                  alt={`${sample.plan.destination} — sample trip plan`}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2">
                  {sample.audience}
                </p>
                <h2 className="font-display text-[1.75rem] leading-tight text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-primary)] transition">
                  {sample.plan.destination}
                </h2>
                <p className="text-body-sm text-[var(--text-muted)] mb-3">
                  {sample.plan.durationDays} days · {sample.plan.destinationCountry}
                </p>
                <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {sample.tagline}
                </p>
                <span className="text-body-sm font-medium text-[var(--brand-primary)] inline-flex items-center gap-1.5">
                  {t("readSample")}
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

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
