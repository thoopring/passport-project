import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import PlanView from "../../../components/PlanView";
import { getSample, getSampleLocalized, listSamples } from "../../../lib/samples";
import type { Locale } from "../../../i18n/locales";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return listSamples().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // Metadata uses the canonical English plan — search engines see one
  // canonical version regardless of viewer locale.
  const sample = getSample(slug);
  if (!sample) return {};

  const title = `${sample.plan.destination} sample plan — ${sample.plan.durationDays} days`;
  return {
    title: `${title} · gliddy`,
    description: sample.tagline,
    alternates: { canonical: `https://checkvisamap.com/samples/${slug}` },
    openGraph: {
      title,
      description: sample.tagline,
      url: `https://checkvisamap.com/samples/${slug}`,
      type: "article",
    },
  };
}

export default async function SamplePlanPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  // Locale-aware lookup: returns the translated variant when one exists
  // (lib/samples/i18n/{locale}.ts), otherwise the canonical English plan.
  const sample = await getSampleLocalized(slug, locale);
  if (!sample) notFound();
  const t = await getTranslations("samples");

  const cta = (
    <div className="bg-[var(--text-primary)] text-[var(--background)] rounded-2xl p-8 sm:p-10 text-center">
      <p className="text-caption uppercase tracking-wider opacity-70 font-semibold">
        {t("sampleCtaTitle")}
      </p>
      <h2 className="font-display text-display-md mt-2">{t("sampleCtaHeadline")}</h2>
      <p className="text-body-md opacity-80 mt-3 max-w-md mx-auto">{t("sampleCtaSubtitle")}</p>
      <Link
        href={`/plan/new?dest=${encodeURIComponent(sample.plan.destination)}&country=${encodeURIComponent(sample.plan.destinationCountry)}`}
        className="inline-block mt-6 px-7 py-3.5 bg-white text-[var(--text-primary)] font-bold rounded-xl hover:opacity-90 transition"
      >
        {t("sampleCtaButton")}
      </Link>
      <p className="text-caption opacity-60 mt-4">{t("sampleCtaCaption")}</p>
    </div>
  );

  return (
    <PlanView
      plan={sample.plan}
      headerLabel={t("sampleHeader")}
      bottomCta={cta}
      backLink={{ href: "/samples", label: t("backToGallery") }}
      heroImage={sample.heroImage}
    />
  );
}
