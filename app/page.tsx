import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlanWizardStep1 from "./plan/new/PlanWizardStep1";
import { SAMPLE_PLANS, HOME_HERO_IMAGE } from "../lib/samples";

export const metadata: Metadata = {
  title: "AI trip plans from $4",
  description:
    "Tell us your destination and budget. We design a day-by-day trip for you — hotel, airport transit, restaurants, and a route map. Delivered in minutes.",
  alternates: { canonical: "https://checkvisamap.com" },
};

export default function Home() {
  const featured = SAMPLE_PLANS.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header showCta={false} />

      {/* ===== Hero — left: text + form / right: photo ===== */}
      <section className="px-4 sm:px-6 pt-10 sm:pt-16 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
          {/* LEFT */}
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

          {/* RIGHT — travel photo */}
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

      {/* ===== Sample cards ===== */}
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

          <div className="mt-8 text-center">
            <Link
              href="/samples"
              className="text-body-sm font-medium text-[var(--brand-primary)] hover:underline underline-offset-4"
            >
              See all sample plans →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
