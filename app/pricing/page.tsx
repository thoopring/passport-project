import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "gliddy is a single-purchase trip planner — $4 per plan. No subscription, no hidden fees, no account required.",
  alternates: { canonical: "https://checkvisamap.com/pricing" },
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "gliddy trip plan",
  description:
    "Personalized, AI-generated trip plan delivered as a mobile-responsive web link plus a downloadable PDF.",
  offers: {
    "@type": "Offer",
    price: "4.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://checkvisamap.com/plan/new",
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      <Header />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
          Pricing
        </p>
        <h1 className="font-display text-display-lg text-[var(--text-primary)] leading-[1.06] mb-4">
          One plan. $4. That&apos;s it.
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] max-w-xl mb-12">
          No subscription. No hidden fees. No account required. Pay once, receive one
          complete trip plan by email within a few minutes.
        </p>

        {/* Price card */}
        <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-8 mb-12">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-display text-[3.5rem] leading-none text-[var(--text-primary)] tracking-[-0.02em]">
              $4
            </span>
            <span className="text-body-md text-[var(--text-muted)]">
              USD · per plan · one-time
            </span>
          </div>
          <p className="text-body-sm text-[var(--text-muted)] mb-6">
            Local currency equivalent shown at checkout.
          </p>

          <ul className="space-y-3 mb-8">
            {[
              "Day-by-day itinerary tuned to your pace and interests",
              "A hotel pick matched to your arrival airport",
              "Airport → hotel transit with real cost and duration",
              "Route map with numbered stops you can open on your phone",
              "Restaurant picks with why-here notes, not just names",
              "Downloadable PDF for offline use while you travel",
              "Delivered to your email in ~60 seconds after payment",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-body-md text-[var(--text-primary)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5 text-[var(--brand-primary)]">
                  <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/plan/new"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white font-medium rounded-md hover:bg-black transition"
          >
            Plan my trip — $4
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* FAQ */}
        <h2 className="font-display text-display-sm text-[var(--text-primary)] mb-6">
          Frequently asked
        </h2>
        <dl className="divide-y divide-[var(--border-subtle)]">
          {[
            {
              q: "Is this a subscription?",
              a: "No. It's a single $4 charge for one plan. If you want another plan later, you pay $4 again. We don't store your card and we don't auto-renew.",
            },
            {
              q: "Do I need an account?",
              a: "No. We email you a private link to your plan. Keep the email, keep the plan. If you lose it, email us and we'll resend.",
            },
            {
              q: "What payment methods are accepted?",
              a: "All major credit cards via LemonSqueezy (our payment processor), plus Apple Pay and Google Pay where available. LemonSqueezy handles local currency conversion.",
            },
            {
              q: "Can I get a refund?",
              a: (
                <>
                  Yes, for two cases: (1) technical failure to generate, and (2) a plan that
                  contains a clearly hallucinated place. See our{" "}
                  <Link href="/refund" className="text-[var(--brand-primary)] underline underline-offset-4">
                    refund policy
                  </Link>{" "}
                  for details.
                </>
              ),
            },
            {
              q: "Why so cheap?",
              a: "Because we think a good itinerary shouldn't cost $50 or be locked inside a $15/mo subscription. The per-plan compute cost is a small fraction of $4 and the rest keeps the site running.",
            },
            {
              q: "What if I want the same destination twice?",
              a: "Each purchase generates a fresh plan from your inputs. Change the duration, traveler type, interests, or budget tier and you'll get a different itinerary.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="py-5">
              <dt className="font-semibold text-body-md text-[var(--text-primary)] mb-1.5">{q}</dt>
              <dd className="text-body-sm text-[var(--text-secondary)] leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] text-body-sm text-[var(--text-muted)]">
          <p>
            Full terms:{" "}
            <Link href="/terms" className="underline underline-offset-4">Terms of Service</Link>{" · "}
            <Link href="/privacy" className="underline underline-offset-4">Privacy Policy</Link>{" · "}
            <Link href="/refund" className="underline underline-offset-4">Refund Policy</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
