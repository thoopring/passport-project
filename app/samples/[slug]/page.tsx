import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import PlanView from "../../../components/PlanView";
import { getSample, getSampleLocalized, listSamples } from "../../../lib/samples";
import { localizedAlternates } from "../../../lib/i18n/seo";
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
    alternates: localizedAlternates(`/samples/${slug}`),
    openGraph: {
      title,
      description: sample.tagline,
      url: `https://checkvisamap.com/samples/${slug}`,
      type: "article",
      siteName: "gliddy",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: sample.tagline,
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
    <div className="relative overflow-hidden bg-[var(--text-primary)] text-[var(--background)] rounded-3xl p-10 sm:p-14 text-center isolate">
      {/* Warm radial glow — vermilion at top fading down. Stays inside palette,
          gives the dark card a sunset feel without leaving the design system. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,68,43,0.28), transparent 65%)",
        }}
      />

      {/* Caption flanked by short vermilion rules — editorial flourish */}
      <p className="text-caption uppercase tracking-[0.22em] opacity-80 font-semibold inline-flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-[var(--brand-primary)]" />
        {t("sampleCtaTitle")}
        <span aria-hidden className="h-px w-8 bg-[var(--brand-primary)]" />
      </p>

      {/* Italic Fraunces with stylistic alternates — same flourish as the home hero EM */}
      <h2 className="font-display text-display-md mt-5 leading-[1.04] tracking-[-0.012em]">
        <em
          className="italic"
          style={{ fontFeatureSettings: '"ss01","ss02","ss03"' }}
        >
          {t("sampleCtaHeadline")}
        </em>
      </h2>

      <p className="text-body-md opacity-80 mt-4 max-w-md mx-auto leading-relaxed">
        {t("sampleCtaSubtitle")}
      </p>

      {/* Vermilion solid pill button with warm glow — replaces the white slab.
          Tactile lift + glow expansion on hover for a felt sense of motion. */}
      <Link
        href={`/plan/new?dest=${encodeURIComponent(sample.plan.destination)}&country=${encodeURIComponent(sample.plan.destinationCountry)}`}
        className="group relative inline-flex items-center gap-2.5 mt-8 px-9 py-4 bg-[var(--brand-primary)] text-white font-bold text-body-md rounded-full transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5 shadow-[0_10px_28px_-8px_rgba(212,68,43,0.55)] hover:shadow-[0_18px_36px_-8px_rgba(212,68,43,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--text-primary)]"
      >
        {t("sampleCtaButton")}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <p className="text-caption opacity-60 mt-5">{t("sampleCtaCaption")}</p>
    </div>
  );

  // Map the sample's human-readable audience string ("Couple · Midrange",
  // "Family with kids · Midrange", "Solo · Foodie") to the canonical
  // traveler type the wizard uses. Lets the sample page render the same
  // craftedFor tagline as a paid plan, so a /samples/tokyo-4d-couple
  // visitor sees "Crafted for the two of you" instead of the generic
  // default. Order matters — check more-specific phrases first.
  const audienceLower = sample.audience.toLowerCase();
  const sampleTravelerType = audienceLower.includes("family")
    ? "family-with-kids"
    : audienceLower.includes("friends") || audienceLower.includes("group")
      ? "group-of-friends"
      : audienceLower.includes("senior")
        ? "senior"
        : audienceLower.includes("couple")
          ? "couple"
          : audienceLower.includes("solo")
            ? "solo"
            : undefined;

  return (
    <PlanView
      plan={sample.plan}
      headerLabel={t("sampleHeader")}
      bottomCta={cta}
      backLink={{ href: "/samples", label: t("backToGallery") }}
      heroImage={sample.heroImage}
      triviaSeed={sample.slug}
      travelerType={sampleTravelerType}
    />
  );
}
