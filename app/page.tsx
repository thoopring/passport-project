import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlanWizardStep1 from "./plan/new/PlanWizardStep1";
import { SAMPLE_PLANS } from "../lib/samples";

export const metadata: Metadata = {
  title: "AI trip plans from $4",
  description:
    "Answer three questions and get a full trip plan in minutes — hotel, airport transit, day-by-day itinerary, restaurants, and a route map. $4 per plan.",
  alternates: { canonical: "https://checkvisamap.com" },
};

export default function Home() {
  const featured = SAMPLE_PLANS.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header showCta={false} />

      {/* ===== Hero (X) — the form IS the hero ===== */}
      <section className="pt-14 sm:pt-20 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-[2.25rem] sm:text-[3rem] font-semibold tracking-tight text-[var(--text-primary)] leading-[1.08] mb-4">
              Your trip, planned in minutes.
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-md mx-auto">
              Answer three questions. Our AI writes your full itinerary — hotel, transit,
              day-by-day stops, and a route map. $4.
            </p>
          </div>

          <PlanWizardStep1
            defaultDestination=""
            defaultCountry=""
            defaultOrigin=""
            autoFocus={false}
          />

          <p className="text-center text-caption uppercase tracking-[0.16em] text-[var(--text-muted)] mt-6">
            No signup · Delivered by email · Offline PDF
          </p>
        </div>
      </section>

      {/* ===== Sample cards (Y) — shown at mid-page ===== */}
      <section className="border-t border-[var(--border-subtle)] py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">
              Sample plans
            </p>
            <h2 className="text-[1.375rem] sm:text-display-sm font-semibold text-[var(--text-primary)]">
              What your plan looks like.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {featured.map((s) => (
              <Link
                key={s.slug}
                href={`/samples/${s.slug}`}
                className="group block bg-white border border-[var(--border-light)] hover:border-[var(--brand-primary)] p-5 rounded-md transition"
              >
                <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2">
                  {s.audience}
                </p>
                <h3 className="text-body-lg font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--brand-primary)] transition">
                  {s.plan.destination}
                </h3>
                <p className="text-body-sm text-[var(--text-muted)] mb-3">
                  {s.plan.durationDays} days · {s.plan.destinationCountry}
                </p>
                <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                  {s.tagline}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
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
