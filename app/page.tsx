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
  // Hand-picked featured 6 — six continents/regions in two rows of three.
  // Row 1 (anchor trio): Tokyo (East Asia), Paris (Europe), Bali (SE Asia tropical).
  // Row 2 (color/region diversity): Reykjavik (Nordic ice), Cusco (Andes), Dubai (Gulf gold).
  // Order matters — rows alternate climate/mood for visual variety.
  const featuredSlugs = [
    "tokyo-4d-couple",
    "paris-3d-family",
    "bali-5d-couple",
    "reykjavik-4d-couple",
    "cusco-5d-couple",
    "dubai-4d-couple",
  ];
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
           input). No $4 in the hero per founder direction.

           Mobile-tuned: headline drops from 44px to 36px so the Korean
           "정리됐어요." flourish doesn't crowd a 375px viewport, the
           quatrefoil photo caps at 320px so it doesn't dominate, and the
           sample-destination chips wrap as discrete pills instead of a
           dot-separated run-on line that breaks ugly at narrow widths.

           3rd-pass mobile: photo bleeds edge-to-edge on mobile (full
           viewport width via -mx negation) so the brand opens with a
           strong travel-mood image instead of a constrained card. Desktop
           keeps the quatrefoil intact in the right column. ===== */}
      <section className="px-4 sm:px-6 pt-12 sm:pt-24 pb-16 sm:pb-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            {/* Live status chip — pulsing dot signals an active product without
                claiming a fake stat. */}
            <div className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-primary)]/20">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]"></span>
              </span>
              <span className="text-caption font-semibold text-[var(--accent-dark)] tracking-[0.05em]">
                {t("heroLiveChip")}
              </span>
            </div>

            <h1 className="font-fraunces font-semibold text-[2.25rem] sm:text-[3.5rem] lg:text-[4rem] text-[var(--text-primary)] leading-[1.05] sm:leading-[1.0] tracking-[-0.022em] mb-5 sm:mb-6">
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
            <p className="text-body-md sm:text-body-lg text-[var(--text-secondary)] max-w-md mb-6 sm:mb-8">
              {t("heroSubtitle")}
            </p>

            <div className="max-w-lg">
              <HomeWizard />
            </div>

            {/* Trust-signal chip strip — subtle pills replacing the plain text badge. */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-5 sm:mt-6">
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

            {/* Inline sample destinations — switched from a "·"-separated text
                run to a pill row. The text version wrapped ugly on mobile
                (city break mid-line, dots stranded on their own line); pills
                each get their own pill width and wrap cleanly. */}
            <div className="mt-5">
              <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2">
                {t("heroTrySample")}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  { slug: "tokyo-4d-couple", label: "Tokyo" },
                  { slug: "paris-3d-family", label: "Paris" },
                  { slug: "bali-5d-couple", label: "Bali" },
                  { slug: "reykjavik-4d-couple", label: "Reykjavik" },
                  { slug: "cusco-5d-couple", label: "Cusco" },
                  { slug: "dubai-4d-couple", label: "Dubai" },
                ].map((c) => (
                  <Link
                    key={c.slug}
                    href={`/samples/${c.slug}`}
                    className="inline-flex items-center px-3 min-h-[40px] rounded-full border border-[var(--border-light)] bg-[var(--surface-primary)] text-body-sm text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 -mx-4 sm:mx-0">
            {/* Mobile: full-bleed rectangular photo with vermilion accent
                rule above (breaks the centered-card monotony). Desktop:
                preserve the original quatrefoil shape in the right column.
                Two layers, mobile-vs-desktop swapped via class visibility. */}
            <div className="block sm:hidden">
              <div className="relative w-full aspect-[16/11] bg-[var(--surface-secondary)] overflow-hidden">
                {HOME_HERO_IMAGES.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt="Travel inspiration"
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className={`object-cover absolute inset-0 hero-fade-${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="quatrefoil relative w-full aspect-square max-w-[320px] sm:max-w-[440px] lg:max-w-[520px] mx-auto bg-[var(--surface-secondary)] overflow-hidden">
                {HOME_HERO_IMAGES.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt="Travel inspiration"
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 440px, 520px"
                    className={`object-cover absolute inset-0 hero-fade-${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Sample cards =====
          Mobile: first card is a hero-sized "featured" card (photo +
          overlay caption + Day-1 preview block below) and the remaining
          five cards collapse into a 2-column compact grid (photo +
          destination only). This kills the 6-identical-cards-stacked
          pattern that read as monotonous on mobile, and lets the eye land
          on one striking lead before scanning the rest. Desktop falls
          back to the previous symmetric 3-column grid for density. */}
      <section className="border-t border-[var(--border-subtle)] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-12 text-center">
            <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
              {t("samplesEyebrow")}
            </p>
            <h2 className="font-display font-bold text-display-md text-[var(--text-primary)] tracking-[-0.02em]">
              {t("samplesHeadline")}
            </h2>
          </div>

          {/* Mobile-only featured + compact grid */}
          <div className="sm:hidden space-y-4">
            {featured.length > 0 && (() => {
              const lead = featured[0];
              const lDay1 = lead.plan.days[0];
              const lStops = lDay1?.stops?.slice(0, 3) ?? [];
              return (
                <Link
                  href={`/samples/${lead.slug}`}
                  className="group block rounded-[14px] overflow-hidden border border-[var(--border-subtle)] bg-white"
                >
                  <div className="relative aspect-[5/6] bg-[var(--surface-secondary)]">
                    <Image
                      src={lead.heroImage}
                      alt={lead.plan.destination}
                      fill
                      priority
                      sizes="100vw"
                      className="object-cover"
                    />
                    {/* Bottom-anchored caption gradient — gives the lead
                        card the editorial-cover feel desktop can't. */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-12">
                      <p className="text-caption uppercase tracking-[0.18em] text-white/80 mb-1.5">
                        {lead.audience}
                      </p>
                      <h3 className="font-display font-bold text-[1.875rem] leading-[1.05] text-white tracking-[-0.02em]">
                        {lead.plan.destination}
                      </h3>
                      <p className="text-body-sm text-white/80 mt-1">
                        {t("cardDaysCountry", {
                          count: lead.plan.durationDays,
                          country: lead.plan.destinationCountry,
                        })}
                      </p>
                    </div>
                  </div>
                  {lDay1 && (
                    <div className="p-5">
                      <p className="text-caption uppercase tracking-[0.14em] text-[var(--brand-primary)] font-bold mb-2.5">
                        {t("previewDayLabel")} · {lDay1.theme}
                      </p>
                      <ul className="space-y-1.5">
                        {lStops.map((stop) => (
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
                </Link>
              );
            })()}

            {/* Remaining 5 in 2-col compact grid */}
            <div className="grid grid-cols-2 gap-3">
              {featured.slice(1).map((s) => (
                <Link
                  key={s.slug}
                  href={`/samples/${s.slug}`}
                  className="group flex flex-col rounded-[12px] overflow-hidden border border-[var(--border-subtle)] bg-white"
                >
                  <div className="relative aspect-[4/5] bg-[var(--surface-secondary)]">
                    <Image
                      src={s.heroImage}
                      alt={s.plan.destination}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-display font-bold text-[1.0625rem] leading-tight text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition">
                      {s.plan.destination}
                    </h3>
                    <p className="text-caption text-[var(--text-muted)] mt-0.5">
                      {t("cardDaysCountry", {
                        count: s.plan.durationDays,
                        country: s.plan.destinationCountry,
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop 3-col grid (unchanged) */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((s, i) => {
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
                      priority={i < 3}
                      sizes="(max-width: 1024px) 50vw, 340px"
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

      {/* ===== Why gliddy — thesis section =====
          Editorial numbered pillars. Killed the 3-icon-in-circle pattern
          (classic AI-slop SaaS layout) in favor of oversized serif numerals
          (01/02/03) inline with each claim. The numerals double as a visual
          rhythm that reads down the page on mobile and across on desktop.
          Cream surface (--surface-secondary) sets it apart from the white
          samples gallery above and the cream Tokyo preview below — proper
          background alternation instead of one long beige scroll. */}
      <section className="bg-[var(--surface-secondary)] border-t border-[var(--border-subtle)] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 sm:mb-14 text-center">
            <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
              {t("thesisEyebrow")}
            </p>
            <h2 className="font-display font-bold text-display-md text-[var(--text-primary)] tracking-[-0.02em]">
              {t("thesisHeadline")}
            </h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              { n: "01", titleKey: "thesisPillar1Title", bodyKey: "thesisPillar1Body" },
              { n: "02", titleKey: "thesisPillar2Title", bodyKey: "thesisPillar2Body" },
              { n: "03", titleKey: "thesisPillar3Title", bodyKey: "thesisPillar3Body" },
            ].map((p, i, arr) => (
              <li
                key={p.n}
                className={`relative pt-6 ${
                  i < arr.length - 1
                    ? "border-b border-[var(--border-subtle)] pb-8 md:border-b-0 md:pb-0"
                    : "pb-2"
                }`}
              >
                {/* Top accent rule with the numeral — replaces the
                    icon-in-circle. The rule sits flush with the top of
                    each pillar, the numeral hangs over it in vermilion. */}
                <span className="absolute top-0 left-0 right-0 h-px bg-[var(--brand-primary)]/30" />
                <div className="font-fraunces italic text-[3rem] sm:text-[3.5rem] leading-none text-[var(--brand-primary)] mb-4 tracking-[-0.02em]">
                  {p.n}
                </div>
                <h3 className="font-display font-bold text-[1.25rem] sm:text-[1.375rem] text-[var(--text-primary)] mb-2 leading-tight">
                  {t(p.titleKey)}
                </h3>
                <p className="text-body-sm sm:text-body-md text-[var(--text-secondary)] leading-relaxed">
                  {t(p.bodyKey)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Inline plan preview — real Tokyo content =====
          Stays on paper bg so it alternates with the cream thesis section
          above (paper → cream → paper → dark-footer-band) instead of two
          cream sections in a row that read as one long block. */}
      {tokyo && day1 && (
        <section className="border-t border-[var(--border-subtle)] py-16 sm:py-24 px-4 sm:px-6">
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
