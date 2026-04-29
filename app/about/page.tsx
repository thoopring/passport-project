import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why we built gliddy — an AI trip planner that writes a real itinerary in minutes.",
  alternates: { canonical: "https://checkvisamap.com/about" },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About gliddy",
  description:
    "Why we built gliddy — an AI trip planner that writes a real itinerary in minutes.",
  url: "https://checkvisamap.com/about",
  mainEntity: { "@type": "Organization", name: "gliddy", email: "hello@checkvisamap.com" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <Header />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-6">
          About
        </p>
        <h1 className="font-display text-display-lg text-[var(--text-primary)] mb-10 leading-[1.04]">
          Trip planning should take minutes, not weekends.
        </h1>

        <div className="prose prose-lg max-w-none text-[var(--text-secondary)] prose-p:leading-relaxed prose-strong:text-[var(--text-primary)]">
          <p>
            We built gliddy because a short trip still eats a whole weekend to plan.
            You open thirty tabs, save twenty restaurants, cross-check them against a hotel
            that has not been booked yet, then get to the destination and walk backwards twice.
          </p>
          <p>
            We made one small tool that fixes one part of that. Answer a few questions,
            and our AI returns a day-by-day plan with a real route map — hotels near transit,
            restaurants near each stop, opening hours and kid-friendliness accounted for.
            You get a link you can open on your phone, and a PDF you can keep offline.
          </p>
          <p>
            <strong>One plan, one fixed price.</strong> No signup, no subscription. If the plan
            fails or the AI returns something wrong, we refund you.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-4">
          <Value
            title="Clear over clever"
            desc="We don't generate poetry. We give you opening hours, addresses, and short walks."
          />
          <Value
            title="Real places"
            desc="The AI is grounded in a curated place library. No hallucinated restaurants."
          />
          <Value
            title="Honest pricing"
            desc="One fixed price, no upsells. Refund if the plan is broken."
          />
        </div>

        <div className="mt-16 pt-10 border-t border-[var(--border-subtle)] text-center">
          <Link
            href="/plan/new"
            className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white font-medium px-6 py-3 rounded-md hover:opacity-90 transition"
          >
            Plan a trip
            <span aria-hidden="true">→</span>
          </Link>
          <p className="text-caption text-[var(--text-muted)] mt-6">
            Contact: hello@checkvisamap.com
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Value({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-5 bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-lg">
      <h3 className="text-body-md text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
    </div>
  );
}
