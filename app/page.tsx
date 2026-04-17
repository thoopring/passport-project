import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SAMPLE_PLANS } from "../lib/samples";

export const metadata: Metadata = {
  title: "AI trip plans from $4",
  description:
    "Answer a few questions and our AI writes your full itinerary — hotel, airport transit, day-by-day stops, and a route map. Delivered in minutes.",
  alternates: { canonical: "https://checkvisamap.com" },
};

export default function Home() {
  const featured = SAMPLE_PLANS.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      {/* ===== Hero ===== */}
      <section className="pt-20 pb-24 sm:pt-28 sm:pb-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-8">
            AI trip planner · $4 per plan
          </p>
          <h1 className="font-display text-display-lg md:text-display-xl text-[var(--text-primary)] leading-[1.05] mb-6">
            Your trip,
            <br />
            <em className="italic font-normal">planned in minutes.</em>
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-10">
            Answer a few questions. Our AI writes a day-by-day itinerary — hotel,
            airport transit, restaurants, and a route map you carry on your phone.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/plan/new"
              className="inline-flex items-center justify-center px-7 py-3 bg-[var(--brand-primary)] text-white font-medium rounded-md hover:opacity-90 transition min-w-[200px]"
            >
              Plan my trip — $4
            </Link>
            <Link
              href="/samples"
              className="inline-flex items-center justify-center px-1 py-3 text-[var(--text-primary)] font-medium border-b border-[var(--text-primary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition"
            >
              See sample plans
            </Link>
          </div>
          <p className="text-caption text-[var(--text-muted)] mt-6">
            No signup · Delivered by email · Works offline as PDF
          </p>
        </div>
      </section>

      {/* ===== Sample cards ===== */}
      <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-24">
        <div className="mb-10 text-center">
          <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
            Sample plans
          </p>
          <h2 className="font-display text-display-md text-[var(--text-primary)]">
            What your plan looks like.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((s) => (
            <Link
              key={s.slug}
              href={`/samples/${s.slug}`}
              className="group block bg-[var(--surface-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-light)] p-7 rounded-lg hover-lift"
            >
              <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-4">
                {s.audience}
              </p>
              <h3 className="font-display text-display-sm text-[var(--text-primary)] mb-3 group-hover:text-[var(--brand-primary)] transition">
                {s.plan.destination} · {s.plan.durationDays} days
              </h3>
              <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {s.tagline}
              </p>
              <span className="text-body-sm font-medium text-[var(--brand-primary)] inline-flex items-center gap-1.5">
                View plan
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
