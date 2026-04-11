import type { Metadata } from "next";
import Link from "next/link";
import { listSamples } from "../../lib/samples";

export const metadata: Metadata = {
  title: "Sample trip plans — Passport Power",
  description:
    "Browse hand-curated sample trip plans for Tokyo, Paris, Bangkok, and Seoul. See exactly what you'll get when you order yours for $4.",
  alternates: { canonical: "https://checkvisamap.com/samples" },
  openGraph: {
    title: "Sample trip plans — Passport Power",
    description:
      "Hand-curated sample trip plans for Tokyo, Paris, Bangkok, and Seoul. The quality bar for every $4 plan.",
    url: "https://checkvisamap.com/samples",
    type: "website",
  },
};

export default function SamplesGalleryPage() {
  const samples = listSamples();

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-caption font-semibold text-brand-700 dark:text-brand-300 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse-slow" />
            Sample plans · See the quality before you buy
          </p>
          <h1 className="text-display-lg text-[var(--text-primary)] mb-3">
            What a $4 plan actually looks like.
          </h1>
          <p className="text-body-md text-[var(--text-secondary)] max-w-xl mx-auto">
            We don&rsquo;t do free trials. Instead, here are four real, full-length sample plans.
            Click any one to read it the way you&rsquo;ll read your own.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {samples.map((sample) => (
            <Link
              key={sample.slug}
              href={`/samples/${sample.slug}`}
              className="group block bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl overflow-hidden hover:border-[var(--text-muted)] transition"
            >
              {/* Color hero */}
              <div
                className="h-32 relative"
                style={{
                  background: `linear-gradient(135deg, ${sample.heroColor} 0%, ${sample.heroColor}cc 100%)`,
                }}
              >
                <div className="absolute inset-0 flex items-end p-5">
                  <div className="text-white">
                    <p className="text-caption uppercase tracking-wider font-semibold opacity-80">
                      {sample.audience}
                    </p>
                    <h2 className="text-display-sm font-bold mt-1">{sample.plan.destination}</h2>
                    <p className="text-body-sm opacity-90">
                      {sample.plan.durationDays} days · {sample.plan.destinationCountry}
                    </p>
                  </div>
                </div>
              </div>
              {/* Body */}
              <div className="p-5">
                <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                  {sample.tagline}
                </p>
                <p className="text-caption text-brand-600 dark:text-brand-400 font-semibold mt-3 group-hover:underline">
                  Read full sample →
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-[var(--text-primary)] text-[var(--background)] rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-display-md font-bold">Like what you see?</h2>
          <p className="text-body-md opacity-80 mt-3 max-w-md mx-auto">
            Get a plan like this for any city, tailored to your dates, group, and budget.
          </p>
          <Link
            href="/plan/new"
            className="inline-block mt-6 px-7 py-3.5 bg-white text-[var(--text-primary)] font-bold rounded-xl hover:opacity-90 transition"
          >
            Plan my trip — $4
          </Link>
          <p className="text-caption opacity-60 mt-4">Mobile web link + PDF · Delivered in minutes</p>
        </div>
      </div>
    </div>
  );
}
