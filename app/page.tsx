import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeWizard from "../components/HomeWizard";
import PlanMap from "../components/PlanMap";
import { HOME_HERO_IMAGES, getSampleLocalized, listSamplesLocalized } from "../lib/samples";
import type { Locale } from "../i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "https://checkvisamap.com" },
  };
}

export default async function Home() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const allSamples = await listSamplesLocalized(locale);
  // Hand-pick the home featured 3 for global diversity (Asia + Europe + tropical SEA)
  // instead of slice(0,3) which would be Tokyo+Osaka+Seoul — three Asian cities and
  // two of them in Japan. Order matters for visual variety in the row.
  const featuredSlugs = ["tokyo-4d-couple", "paris-3d-family", "bali-5d-couple"];
  const featured = featuredSlugs
    .map((slug) => allSamples.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const tokyo = await getSampleLocalized("tokyo-4d-couple", locale);
  const day1 = tokyo?.plan.days[0];
  const previewStops = day1?.stops.slice(0, 3) ?? [];
  const remainingStops = (day1?.stops.length ?? 0) - previewStops.length;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header showCta={false} />

      {/* ===== Hero — trust signals + chat input on left, quatrefoil photo on right.
           Variant E direction (live chip + stat chips + sample links) blended with the
           current airy travel feel (cross-fade quatrefoil photo + simple HomeWizard
           input). No $4 in the hero per founder direction. ===== */}
      <section className="px-4 sm:px-6 pt-16 sm:pt-24 pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            {/* Live status chip — pulsing dot signals an active product without
                claiming a fake stat. */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-primary)]/20">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]"></span>
              </span>
              <span className="text-caption font-semibold text-[var(--accent-dark)] tracking-[0.05em]">
                {t("heroLiveChip")}
              </span>
            </div>

            <h1 className="font-fraunces font-semibold text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] text-[var(--text-primary)] leading-[1.0] tracking-[-0.022em] mb-6">
              {t("heroHeadline1")}
              <br />
              {/* The hero EM is THE flourish moment — italic Fraunces with
                  swash stylistic alternates (ss03) gives the headline a
                  hand-set editorial flourish, more anticipation than the
                  earlier flat colored text. */}
              <em
                className="italic font-medium text-[var(--brand-primary)] tracking-[-0.025em]"
                style={{ fontFeatureSettings: '"ss01", "ss02", "ss03"' }}
              >
                {t("heroHeadlineEm")}
              </em>
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-md mb-8">
              {t("heroSubtitle")}
            </p>

            <div className="max-w-lg">
              <HomeWizard />
            </div>

            {/* Trust-signal chip strip — subtle pills replacing the plain text badge. */}
            <div className="flex flex-wrap items-center gap-2 mt-6">
              {[
                t("heroStatSpeed"),
                t("heroStatRating"),
                t("heroStatNoAccount"),
                t("heroStatOffline"),
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center px-2.5 py-1 rounded-full border border-[var(--border-light)] bg-[var(--surface-primary)] text-caption font-medium text-[var(--text-secondary)]"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Inline sample destinations link — directs the curious to a free preview
                without forcing them through the wizard first. */}
            <p className="text-body-sm text-[var(--text-muted)] mt-5">
              {t("heroTrySample")}{" "}
              <Link
                href="/samples/tokyo-4d-couple"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4 mx-1"
              >
                Tokyo
              </Link>
              ·
              <Link
                href="/samples/paris-3d-family"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4 mx-1"
              >
                Paris
              </Link>
              ·
              <Link
                href="/samples/bali-5d-couple"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4 mx-1"
              >
                Bali
              </Link>
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="quatrefoil relative w-full aspect-square max-w-[520px] mx-auto bg-[var(--surface-secondary)] overflow-hidden">
              {HOME_HERO_IMAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="Travel inspiration"
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className={`object-cover absolute inset-0 hero-fade-${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Sample cards ===== */}
      <section className="border-t border-[var(--border-subtle)] py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
              {t("samplesEyebrow")}
            </p>
            <h2 className="font-display font-bold text-display-md text-[var(--text-primary)] tracking-[-0.02em]">
              {t("samplesHeadline")}
            </h2>
          </div>

          {/* Mockup-E inspired card: photo + destination + Day 1 first 4 stops as
              proof of detail. Replaces the slim tagline-only card. priority loading
              on all 3 cards because they're above the fold and Next.js dev mode is
              slow to optimize Unsplash images otherwise. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((s) => {
              const day1 = s.plan.days[0];
              const day1Stops = day1?.stops?.slice(0, 4) ?? [];
              return (
                <Link
                  key={s.slug}
                  href={`/samples/${s.slug}`}
                  className="group flex flex-col rounded-[14px] overflow-hidden border border-[var(--border-subtle)] bg-white hover-lift"
                >
                  <div className="relative aspect-[16/10] bg-[var(--surface-secondary)]">
                    <Image
                      src={s.heroImage}
                      alt={s.plan.destination}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2">
                      {s.audience}
                    </p>
                    <h3 className="font-display font-bold text-[1.375rem] leading-tight text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-primary)] transition">
                      {s.plan.destination}
                    </h3>
                    <p className="text-body-sm text-[var(--text-muted)] mb-4">
                      {t("cardDaysCountry", {
                        count: s.plan.durationDays,
                        country: s.plan.destinationCountry,
                      })}
                    </p>
                    {day1 && (
                      <div className="border-t border-[var(--border-subtle)] pt-4 mt-auto">
                        <p className="text-caption uppercase tracking-[0.14em] text-[var(--brand-primary)] font-bold mb-2.5">
                          {t("previewDayLabel")} · {day1.theme}
                        </p>
                        <ul className="space-y-1.5">
                          {day1Stops.map((stop) => (
                            <li
                              key={stop.order}
                              className="flex items-start gap-2 text-body-sm text-[var(--text-secondary)]"
                            >
                              <span className="shrink-0 mt-[7px] inline-block w-1 h-1 rounded-full bg-[var(--brand-primary)]" />
                              <span className="line-clamp-1">{stop.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Inline plan preview — real Tokyo content ===== */}
      {tokyo && day1 && (
        <section className="border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)] py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
                {t("previewEyebrow")}
              </p>
              <h2 className="font-display font-bold text-display-md text-[var(--text-primary)] leading-tight tracking-[-0.02em]">
                {t("previewHeadline")}
              </h2>
              <p className="text-body-md text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
                {t("previewSubtitle")}
              </p>
            </div>

            <div className="bg-white border border-[var(--border-subtle)] rounded-[12px] p-6 mb-4">
              <p className="text-body-md text-[var(--text-primary)] leading-relaxed">
                {tokyo.plan.overview}
              </p>
            </div>

            {/* Live Tokyo route map — numbered stops */}
            <div className="mb-4">
              <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-[0.14em] mb-3">
                {t("previewRouteLabel")}
              </p>
              <PlanMap plan={tokyo.plan} height={360} />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-[var(--border-subtle)] rounded-[12px] p-6">
                <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-[0.14em] mb-2">
                  {t("previewHotel")}
                </p>
                <h3 className="font-display font-bold text-[1.25rem] text-[var(--text-primary)] leading-snug">
                  {tokyo.plan.hotel.name}
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)] mt-1">
                  {tokyo.plan.hotel.area} · {tokyo.plan.hotel.estimatedNightlyRate}
                </p>
                <p className="text-body-sm text-[var(--text-secondary)] mt-3 leading-relaxed line-clamp-3">
                  {tokyo.plan.hotel.rationale}
                </p>
              </div>

              <div className="bg-white border border-[var(--border-subtle)] rounded-[12px] p-6">
                <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-[0.14em] mb-2">
                  {t("previewAirport")}
                </p>
                <h3 className="font-display font-bold text-[1.25rem] text-[var(--text-primary)] leading-snug">
                  {tokyo.plan.airportTransit.method}
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)] mt-1">
                  {tokyo.plan.airportTransit.duration} · {tokyo.plan.airportTransit.cost}
                </p>
              </div>
            </div>

            <div className="bg-white border border-[var(--border-subtle)] rounded-[12px] p-6 mb-4">
              <div className="mb-4">
                <p className="text-caption uppercase font-semibold text-[var(--brand-primary)] tracking-[0.18em]">
                  {t("previewDayLabel")}
                </p>
                <h3 className="font-display font-bold text-[1.5rem] text-[var(--text-primary)] leading-tight mt-1">
                  {day1.theme}
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {day1.summary}
                </p>
              </div>

              <ol className="space-y-5">
                {previewStops.map((stop) => (
                  <li key={stop.order} className="flex gap-4">
                    <div className="shrink-0 w-16 text-right">
                      <p className="font-semibold text-[var(--brand-primary)] text-body-sm">
                        {stop.time}
                      </p>
                      <p className="text-caption text-[var(--text-muted)] uppercase tracking-[0.1em]">
                        {stop.type}
                      </p>
                    </div>
                    <div className="flex-1 border-l border-[var(--border-light)] pl-4">
                      <p className="font-semibold text-body-sm text-[var(--text-primary)]">
                        {stop.name}
                      </p>
                      {stop.area && (
                        <p className="text-caption text-[var(--text-muted)]">{stop.area}</p>
                      )}
                      <p className="text-body-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                        {stop.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {remainingStops > 0 && (
                <p className="text-body-sm text-[var(--text-muted)] mt-6 pt-5 border-t border-[var(--border-subtle)]">
                  {t("previewMoreStops", { count: remainingStops })}
                </p>
              )}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/samples/tokyo-4d-couple"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#1A1A1A] text-white font-medium hover:bg-black transition"
              >
                {t("previewCtaButton")}
                <span aria-hidden="true">→</span>
              </Link>
              <p className="text-caption text-[var(--text-muted)] mt-4">
                {t("previewSecondaryPrefix")}{" "}
                <Link
                  href="/samples"
                  className="underline underline-offset-4 hover:text-[var(--text-primary)]"
                >
                  {t("previewSecondaryLink")}
                </Link>
                {t("previewSecondarySuffix")}
              </p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
