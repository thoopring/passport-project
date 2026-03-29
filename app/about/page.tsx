import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "We built Passport Power because we were scared at the airport. A free visa checker for travelers worldwide.",
  alternates: { canonical: "https://checkvisamap.com/about" },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Passport Power",
  description: "We built Passport Power because we were scared at the airport.",
  url: "https://checkvisamap.com/about",
  mainEntity: { "@type": "Organization", name: "Passport Power", email: "hello@checkvisamap.com" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      {/* Nav */}
      <nav className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-body-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Home
        </Link>
        <Link href="/" className="text-body-sm font-bold text-[var(--text-primary)]">Passport Power</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-16">
          <span className="text-caption font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-4 block">Our Story</span>
          <h1 className="text-display-lg md:text-display-xl text-[var(--text-primary)] mb-6 leading-tight">
            We built this because we panicked at the airport.
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed">
            Traveling should be about freedom, not bureaucracy. We are digital nomads who got tired of confusing visa rules.
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-lg max-w-none mb-16
          prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
          prose-strong:text-[var(--text-primary)]
          prose-blockquote:border-brand-500 prose-blockquote:text-[var(--text-secondary)]
        ">
          <p>
            It happened in 2024. Standing at the check-in counter, ready to board a flight to Vietnam.
            The airline staff looked at the passport and shook her head.
          </p>
          <blockquote>
            <p>&ldquo;Your e-visa has a typo in your middle name. You cannot board.&rdquo;</p>
          </blockquote>
          <p>
            Panic. Flight leaving in 2 hours. $400 lost. Trip missed.
            That&apos;s when we realized: <strong>official government websites are confusing, and Wikipedia is often outdated.</strong>
          </p>
          <p>
            So we built <strong>Passport Power</strong> &mdash; a simple, visual tool to check visa requirements instantly.
            No legal jargon. Just clear &ldquo;Go&rdquo; or &ldquo;No Go&rdquo; answers.
          </p>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {[
            { title: "Speed First", desc: "We verify rules so you don't have to read 10-page PDFs." },
            { title: "Real Experience", desc: "Tips from real travelers, not copy-pasted law text." },
            { title: "Always Free", desc: "This tool is free forever. We survive on affiliate support." },
          ].map((v) => (
            <div key={v.title} className="p-5 bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-xl">
              <h3 className="font-semibold text-body-md text-[var(--text-primary)] mb-2">{v.title}</h3>
              <p className="text-body-sm text-[var(--text-secondary)]">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center py-12 border-t border-[var(--border-light)]">
          <h2 className="text-display-sm text-[var(--text-primary)] mb-6">Ready to explore?</h2>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-soft"
          >
            Check Visa Map
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <p className="text-caption text-[var(--text-muted)] mt-8">
            Contact: hello@checkvisamap.com
          </p>
        </div>
      </div>
    </div>
  );
}
