import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlanMap from "../components/PlanMap";
import { getSampleLocalized, listSamplesLocalized } from "../lib/samples";
import { localizedAlternates } from "../lib/i18n/seo";
import type { Locale } from "../i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates("/"),
  };
}

// SoftwareApplication schema for the home page — describes gliddy as a
// web travel app. Price is deliberately omitted (offers): the $4 figure
// lives only on /pricing per founder policy, so we don't expose it in
// home-page structured data.
const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "gliddy",
  applicationCategory: "TravelApplication",
  operatingSystem: "Web",
  url: "https://checkvisamap.com",
  description:
    "Tell gliddy where you're going and it designs the trip for you — day-by-day itinerary, a hotel pick matched to your airport, restaurants, and a route map. No subscription, no account.",
};

export default async function Home() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  // CJK (ko/ja/zh) typography: no uppercase / letter-spacing, taller line-box
  // (manifest §3 — kicker uppercase+자간 is en/fr only; CJK line-height 1.25 head / 1.7 body).
  const isCJK = locale === "ko" || locale === "ja" || locale === "zh";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <Header showCta={false} />

      {/* ===== Hero — Wanderlust full-bleed photographic (confirmed 2026-06-19) =====
           Source of truth: docs/gliddy_wanderlust_hero_wireframe_spec_20260619 §3·§7,
           hero_screen_plan §1·§2, hero_marketing_hook_guide §1. value-wedge → Wanderlust:
           one self-hosted travel photo (Unsplash hot-link forbidden per spec §7 —
           self-host /public + next/image), ink scrim for legibility, content bottom-left
           anchored. Visual hierarchy (screen_plan §1②): descriptor small < H1 large <
           sub medium. $4 is permitted ONLY in heroKicker (descriptor) + heroPrice —
           never in the H1 body (founder policy).

           H1 A/B (marketing_hook_guide §2): A = desire-led, LIVE. B = outcome-led,
           queued as the first A/B variant for cold channels (Pinterest/search),
           measured by 광진 — NOT live and deliberately NOT in messages (constraint):
             heroHeadline1 (B): "Type one city."
             heroHeadlineEm  (B): "Get the whole trip."  ===== */}
      <section className="relative flex items-end min-h-[92vh] sm:min-h-screen overflow-hidden text-white">
        {/* Full-bleed self-hosted photo — sense of place, bottom darker for scrim.
            center 38% crop per spec §3. */}
        <Image
          src="/hero/wanderlust-hero.webp"
          alt="Travel inspiration"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 38%" }}
        />
        {/* Nav scrim (manifest §2) — the Wanderlust hero's top is a bright
            sunset sky, which blows out the white nav glyphs. A dedicated
            top-only gradient (ink 0.35 → transparent by 24%) keeps the nav
            legible without darkening the full frame. */}
        <div
          className="absolute inset-x-0 top-0 h-[24%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,17,14,0.35) 0%, rgba(20,17,14,0) 100%)",
          }}
        />
        {/* Ink scrim — top + bottom darker, middle light (spec §3) so the
            bottom-anchored text stays legible without an AI-cliché color wash. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,17,14,0.46) 0%, rgba(20,17,14,0.12) 40%, rgba(20,17,14,0.86) 100%)",
          }}
        />

        <div className="relative z-[5] w-full max-w-6xl mx-auto px-5 sm:px-7 pb-11 sm:pb-16 pt-28">
          {/* kicker = service descriptor (screen_plan §1①) — Inter 600, uppercase,
              slightly larger than an eyebrow. Carries the "what is this" identity. */}
          <p
            className={`font-semibold text-[0.9375rem] text-white/90 mb-4 ${
              isCJK ? "" : "uppercase tracking-[0.08em]"
            }`}
          >
            {t("heroKicker")}
          </p>

          {/* H1 (A, live). max-w ~14ch forces "next?" onto its own italic line. */}
          <h1
            className={`font-fraunces font-semibold text-[2.5rem] sm:text-[3.75rem] lg:text-[4.625rem] mb-5 ${
              isCJK
                ? "leading-[1.25] tracking-normal max-w-[16ch]"
                : "leading-[1.03] tracking-[-0.022em] max-w-[14ch] lg:max-w-[16ch]"
            }`}
          >
            {t("heroHeadline1")}
            <br />
            <em
              className="italic font-medium text-[#FFD9CB] tracking-[-0.025em]"
              style={{ fontFeatureSettings: '"ss01", "ss02", "ss03"' }}
            >
              {t("heroHeadlineEm")}
            </em>
          </h1>

          <p
            className={`text-body-md sm:text-body-lg text-white/85 max-w-[46ch] mb-[clamp(1rem,2vh,1.5rem)] ${
              isCJK ? "leading-[1.7]" : ""
            }`}
          >
            {t("heroSubtitle")}
          </p>

          {/* planbar (spec §3) — server-rendered GET form, no JS required so it
              degrades gracefully. Submits the destination to /plan/new, which
              pre-fills the wizard and prompts for a city when empty (spec §6
              fallback). Mobile: input full-width, button wraps full-width below. */}
          <form
            action="/plan/new"
            method="get"
            className="flex flex-wrap gap-2.5 max-w-[34rem]"
          >
            <input
              type="text"
              name="dest"
              placeholder={t("heroSearchPlaceholder")}
              aria-label={t("heroSearchPlaceholder")}
              className="flex-1 min-w-[14rem] px-5 py-4 rounded-[12px] bg-white border border-white/20 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-body-md text-ellipsis outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/30"
            />
            <button
              type="submit"
              className="shrink-0 w-full sm:w-auto min-h-[48px] px-6 rounded-[12px] bg-[var(--brand-primary)] hover:bg-[var(--brand-dark)] text-white font-semibold inline-flex items-center justify-center gap-2 transition active:translate-y-px"
            >
              {t("heroSearchCta")}
              <span aria-hidden="true">→</span>
            </button>
          </form>

          {/* hero-note 3종 (marketing_hook_guide §3) — micro trust hooks in order:
              speed → quality → ownership ("빠르다·진짜다·내 거다"). */}
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-body-sm text-white/90">
            {[t("heroNote1"), t("heroNote2"), t("heroNote3")].map((note) => (
              <li key={note} className="inline-flex items-center gap-2">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]"
                  aria-hidden
                />
                {note}
              </li>
            ))}
          </ul>

          {/* price anchor — $4 exposure permitted here (spec §2). */}
          <p className="mt-5 text-body-sm text-white/80">{t("heroPrice")}</p>
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

            {/* Remaining 5 — horizontal snap carousel.
                The 2-col compact grid that lived here had two readability
                problems: each card was ~170px wide on a 375px viewport so
                destination type capped at 17px (cramped + low scan
                density), and 5 cards in a 2-col grid left the last row
                with a single orphaned card. The carousel fixes both:
                cards expand to ~78vw (~290px) so the destination heading
                lifts to 1.5rem with audience + Day-1 theme alongside,
                and a horizontal-swipe pattern adds motion variety to the
                otherwise vertical mobile scroll. The negative -mx-4
                breaks out of the section padding so cards visually
                bleed from edge to edge with peek of the next card on
                the right (a common gallery-discovery pattern). */}
            <div className="-mx-4 mt-2">
              <div
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory pl-4 pr-4 pb-3 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none" }}
              >
                {featured.slice(1).map((s) => {
                  const day1 = s.plan.days[0];
                  return (
                    <Link
                      key={s.slug}
                      href={`/samples/${s.slug}`}
                      className="group snap-start shrink-0 w-[78%] max-w-[320px] flex flex-col rounded-[14px] overflow-hidden border border-[var(--border-subtle)] bg-white"
                    >
                      <div className="relative aspect-[16/11] bg-[var(--surface-secondary)]">
                        <Image
                          src={s.heroImage}
                          alt={s.plan.destination}
                          fill
                          sizes="78vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-1.5">
                          {s.audience}
                        </p>
                        <h3 className="font-display font-bold text-[1.5rem] leading-tight text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-primary)] transition">
                          {s.plan.destination}
                        </h3>
                        <p className="text-body-sm text-[var(--text-muted)] mb-3">
                          {t("cardDaysCountry", {
                            count: s.plan.durationDays,
                            country: s.plan.destinationCountry,
                          })}
                        </p>
                        {day1 && (
                          <div className="border-t border-[var(--border-subtle)] pt-3 mt-auto">
                            <p className="text-caption uppercase tracking-[0.14em] text-[var(--brand-primary)] font-bold mb-1">
                              {t("previewDayLabel")}
                            </p>
                            <p className="text-body-sm text-[var(--text-secondary)] leading-snug line-clamp-2">
                              {day1.theme}
                            </p>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="px-4 mt-1 inline-flex items-center gap-1.5 text-caption text-[var(--text-muted)]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span>{t("samplesSwipeHint")}</span>
              </div>
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

              {/* Mobile gets the same compact treatment as PlanView:
                  time/type as an inline pill row above the content
                  block, no fixed 64px right-aligned column, no left
                  border rail. Desktop keeps the original two-column
                  rail layout for density. */}
              <ol className="space-y-4 sm:space-y-5">
                {previewStops.map((stop) => (
                  <li key={stop.order} className="flex flex-col sm:flex-row sm:gap-4">
                    <div className="shrink-0 sm:w-16 sm:text-right mb-1.5 sm:mb-0 flex items-baseline gap-2 sm:block">
                      <p className="font-semibold text-[var(--brand-primary)] text-body-sm">
                        {stop.time}
                      </p>
                      <p className="text-caption text-[var(--text-muted)] uppercase tracking-[0.1em]">
                        {stop.type}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0 sm:border-l sm:border-[var(--border-light)] sm:pl-4">
                      <p className="font-semibold text-body-md sm:text-body-sm text-[var(--text-primary)]">
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

      {/* ===== Conversion band — Wanderlust confirmed conversion devices =====
          Three levers, in funnel order, placed after the real-plan preview:
          (A) result-preview reassurance — "you've just seen a real plan",
          (B) human-alternative price anchor, (C) risk removal / refund.
          $4 is permitted here (anchor/pricing context) but never in the hero,
          per founder policy. Confirmed copy from 지평's Wanderlust conversion
          design (design/gliddy_hero_concepts_20260619/02_wanderlust_conversion.html). */}
      <section className="bg-[var(--surface-secondary)] border-t border-[var(--border-subtle)] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* A — result preview reassurance (ties back to the preview above) */}
          <div className="text-center mb-12 sm:mb-14">
            <p className="text-caption uppercase tracking-[0.18em] text-[var(--brand-primary)] font-bold mb-3">
              {t("convResultEyebrow")}
            </p>
            <h2 className="font-display font-bold text-display-md text-[var(--text-primary)] tracking-[-0.02em] mb-3">
              {t("convResultHeadline")}
            </h2>
            <p className="text-body-md text-[var(--text-secondary)] max-w-xl mx-auto mb-6">
              {t("convResultBody")}
            </p>
            <Link
              href="/samples/tokyo-4d-couple"
              className="inline-flex items-center gap-2 text-body-md font-semibold text-[var(--brand-primary)] underline underline-offset-4 hover:text-[var(--text-primary)] transition"
            >
              {t("convResultCta")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* B + C — price anchor + refund, side by side */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* B — human-alternative price anchor */}
            <div className="bg-white border border-[var(--border-subtle)] rounded-[14px] p-7">
              <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-3">
                {t("convAnchorEyebrow")}
              </p>
              <h3 className="font-display font-bold text-[1.75rem] text-[var(--text-primary)] tracking-[-0.02em] mb-3 leading-tight">
                {t("convAnchorHeadline")}
              </h3>
              <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {t("convAnchorBody")}
              </p>
              <p className="text-caption font-semibold text-[var(--text-primary)]">
                {t("convAnchorNote")}
              </p>
            </div>
            {/* C — refund / risk removal (reuses heroStatRating as the eyebrow) */}
            <div className="bg-white border border-[var(--border-subtle)] rounded-[14px] p-7">
              <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-3">
                {t("heroStatRating")}
              </p>
              <h3 className="font-display font-bold text-[1.75rem] text-[var(--text-primary)] tracking-[-0.02em] mb-3 leading-tight">
                {t("convRefundHeadline")}
              </h3>
              <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                {t("convRefundBody")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
