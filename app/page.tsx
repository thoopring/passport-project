import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlanWizardStep1 from "./plan/new/PlanWizardStep1";
import { SAMPLE_PLANS, HOME_HERO_IMAGE, getSample } from "../lib/samples";

export const metadata: Metadata = {
  title: "Trip plans from $4",
  description:
    "Tell us your destination and budget. We design a day-by-day trip for you — hotel, airport transit, restaurants, and a route map. Delivered in minutes.",
  alternates: { canonical: "https://checkvisamap.com" },
};

export default function Home() {
  const featured = SAMPLE_PLANS.slice(0, 3);
  const tokyo = getSample("tokyo-4d-couple");
  const day1 = tokyo?.plan.days[0];
  const previewStops = day1?.stops.slice(0, 3) ?? [];
  const remainingStops = (day1?.stops.length ?? 0) - previewStops.length;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header showCta={false} />

      {/* ===== Hero — left: text + form / right: photo ===== */}
      <section className="px-4 sm:px-6 pt-10 sm:pt-16 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
          <div className="order-2 lg:order-1">
            <h1 className="font-display font-semibold text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] text-[var(--text-primary)] leading-[1.02] tracking-[-0.028em] mb-5">
              Your trip.
              <br />
              Planned in minutes.
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-md mb-8">
              Tell us your destination and budget. We design a day-by-day trip for you —
              hotel, transit, restaurants, and a route map.
            </p>

            <div className="max-w-md">
              <PlanWizardStep1
                defaultDestination=""
                defaultCountry=""
                defaultOrigin=""
                autoFocus={false}
              />
            </div>

            <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mt-6">
              No signup · Delivered by email · Offline PDF
            </p>
          </div>

          <div className="order-1 lg:order-2 lg:sticky lg:top-20">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-[18px] overflow-hidden bg-[var(--surface-secondary)]">
              <Image
                src={HOME_HERO_IMAGE}
                alt="A passport on a map — your next trip"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Sample cards — three curated teasers ===== */}
      <section className="border-t border-[var(--border-subtle)] py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
              Sample plans
            </p>
            <h2 className="font-display font-semibold text-display-md text-[var(--text-primary)]">
              What your plan looks like.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((s) => (
              <Link
                key={s.slug}
                href={`/samples/${s.slug}`}
                className="group block rounded-[14px] overflow-hidden border border-[var(--border-subtle)] bg-white hover-lift"
              >
                <div className="relative aspect-[4/3] bg-[var(--surface-secondary)]">
                  <Image
                    src={s.heroImage}
                    alt={`${s.plan.destination} — sample trip plan`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2">
                    {s.audience}
                  </p>
                  <h3 className="font-display font-semibold text-[1.375rem] leading-tight text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-primary)] transition">
                    {s.plan.destination}
                  </h3>
                  <p className="text-body-sm text-[var(--text-muted)] mb-3">
                    {s.plan.durationDays} days · {s.plan.destinationCountry}
                  </p>
                  <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                    {s.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Inline plan preview — real Tokyo content, no click-through needed ===== */}
      {tokyo && day1 && (
        <section className="border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)] py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10 text-center">
              <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
                A real plan, unlocked
              </p>
              <h2 className="font-display font-semibold text-display-md text-[var(--text-primary)] leading-tight">
                Tokyo. Four days.
              </h2>
              <p className="text-body-md text-[var(--text-secondary)] mt-3 max-w-xl mx-auto">
                A real plan we made for a couple on a mid-range budget. Read the first
                chunks below — no login, no card.
              </p>
            </div>

            {/* Overview */}
            <div className="bg-white border border-[var(--border-subtle)] rounded-[12px] p-6 mb-4">
              <p className="text-body-md text-[var(--text-primary)] leading-relaxed">
                {tokyo.plan.overview}
              </p>
            </div>

            {/* Hotel + Airport transit */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white border border-[var(--border-subtle)] rounded-[12px] p-6">
                <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-[0.14em] mb-2">
                  Hotel
                </p>
                <h3 className="font-display font-semibold text-[1.25rem] text-[var(--text-primary)] leading-snug">
                  {tokyo.plan.hotel.name}{" "}
                  <span className="text-[var(--text-muted)] font-normal text-body-md">
                    {tokyo.plan.hotel.priceTier}
                  </span>
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
                  Airport transit
                </p>
                <h3 className="font-display font-semibold text-[1.25rem] text-[var(--text-primary)] leading-snug">
                  {tokyo.plan.airportTransit.method}
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)] mt-1">
                  {tokyo.plan.airportTransit.duration} · {tokyo.plan.airportTransit.cost}
                </p>
              </div>
            </div>

            {/* Day 1 with first 3 stops */}
            <div className="bg-white border border-[var(--border-subtle)] rounded-[12px] p-6 mb-4">
              <div className="mb-4">
                <p className="text-caption uppercase font-semibold text-[var(--brand-primary)] tracking-[0.18em]">
                  Day 1
                </p>
                <h3 className="font-display font-semibold text-[1.5rem] text-[var(--text-primary)] leading-tight mt-1">
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
                  …and {remainingStops} more stops on Day 1, plus Days 2–4 with restaurants,
                  a packing list, and a route map.
                </p>
              )}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/samples/tokyo-4d-couple"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#1A1A1A] text-white font-medium hover:bg-black transition"
              >
                Read the full Tokyo plan
                <span aria-hidden="true">→</span>
              </Link>
              <p className="text-caption text-[var(--text-muted)] mt-4">
                Or see{" "}
                <Link href="/samples" className="underline underline-offset-4 hover:text-[var(--text-primary)]">
                  three more samples
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
