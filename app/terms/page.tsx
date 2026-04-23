import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Passport Power — a one-time $4 AI trip planner. What you're buying, what we promise, and what we don't.",
  alternates: { canonical: "https://checkvisamap.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
          Legal
        </p>
        <h1 className="font-display text-display-lg text-[var(--text-primary)] mb-3">
          Terms of Service
        </h1>
        <p className="text-body-sm text-[var(--text-muted)] mb-10">Last updated: April 23, 2026</p>

        <div className="prose prose-lg max-w-none text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)]">
          <h2>1. What Passport Power is</h2>
          <p>
            Passport Power is a digital product. You provide a destination, duration, and a few
            preferences; we generate a personalized trip itinerary using Anthropic&apos;s Claude
            language model and deliver it to your email as a private web link plus a downloadable
            PDF. Each $4 purchase buys one plan. There is no subscription, no recurring charge,
            and no account.
          </p>

          <h2>2. Acceptance</h2>
          <p>
            By using this site, placing an order, or opening a generated plan, you agree to these
            Terms, our{" "}
            <Link href="/privacy" className="text-[var(--brand-primary)]">Privacy Policy</Link>{", "}
            and our{" "}
            <Link href="/refund" className="text-[var(--brand-primary)]">Refund Policy</Link>. If
            you do not agree, do not use the service.
          </p>

          <h2>3. Eligibility</h2>
          <p>
            You must be at least 18 years old (or the age of majority in your jurisdiction) to
            make a purchase. If you are using the service on behalf of someone else, you represent
            that you have authority to do so and to bind them to these Terms.
          </p>

          <h2>4. Price, billing, and currency</h2>
          <p>
            The price per plan is USD $4.00. Payment is processed by LemonSqueezy. Your statement
            will show a charge from <strong>Lemon Squeezy · Passport Power</strong>. LemonSqueezy
            handles local currency conversion where applicable; the USD-equivalent amount is what
            you owe.
          </p>

          <h2>5. Delivery</h2>
          <p>
            Plans are delivered to the email address you provide at checkout, typically within
            60–120 seconds of successful payment. Check your spam folder if you do not see it
            within 5 minutes. The web link in the email is the canonical delivery — you can return
            to it any time. The PDF is a convenience copy for offline use.
          </p>

          <h2>6. What a plan is and isn&apos;t</h2>
          <ul>
            <li>
              A plan is a <strong>thoughtful starting point</strong>. Real travel always requires
              verification — opening hours, ticket availability, weather, closures, reservations.
              We expect you to check before you go.
            </li>
            <li>
              A plan is <strong>not a booking</strong>. We do not reserve hotels, flights, transit,
              tickets, or tables. You are responsible for all bookings and any fees or liabilities
              that result from them.
            </li>
            <li>
              A plan is <strong>not professional advice</strong> — medical, legal, visa, or
              otherwise. We do not advise on visa requirements or the safety of travel to a given
              destination.
            </li>
          </ul>

          <h2>7. Your responsibilities</h2>
          <ul>
            <li>Provide accurate inputs (destination, duration, interests).</li>
            <li>Do not resell or redistribute your plan as your own work.</li>
            <li>Do not attempt to reverse-engineer, scrape, or abuse the service.</li>
            <li>Do not use the service for any purpose prohibited by law.</li>
          </ul>

          <h2>8. Intellectual property</h2>
          <p>
            Your generated plan is licensed to you for personal travel use. The site design, brand,
            system prompts, and underlying sample library remain the property of Passport Power.
            You may share your plan link with travel companions; you may not repost it as public
            content without attribution.
          </p>

          <h2>9. Refunds</h2>
          <p>
            Our full refund policy is at{" "}
            <Link href="/refund" className="text-[var(--brand-primary)]">/refund</Link>. In short:
            we refund for technical failures and for plans that include clearly hallucinated
            places. We do not refund based on taste preferences.
          </p>

          <h2>10. Third-party services</h2>
          <p>
            We rely on Anthropic (AI model), Supabase (storage), LemonSqueezy (payment), Resend
            (email), Mapbox (maps), and Vercel (hosting). Issues with any of these can affect the
            service. We make reasonable efforts to route around provider outages but cannot
            guarantee uptime.
          </p>

          <h2>11. Disclaimers</h2>
          <p>
            The service is provided <strong>&quot;as is&quot; and &quot;as available&quot;</strong>, without warranty
            of any kind, express or implied. We disclaim all warranties including merchantability,
            fitness for a particular purpose, and non-infringement, to the maximum extent
            permitted by law.
          </p>

          <h2>12. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Passport Power&apos;s total liability to you
            for any claim arising from the service is limited to the amount you paid for the
            affected plan (typically $4 USD). We are not liable for indirect, incidental, special,
            consequential, or punitive damages, including lost profits, loss of data, or travel
            disruption.
          </p>

          <h2>13. Indemnification</h2>
          <p>
            You agree to indemnify and hold Passport Power harmless from any claim arising out of
            your use of the service, your breach of these Terms, or your violation of applicable
            law.
          </p>

          <h2>14. Changes to the service or the Terms</h2>
          <p>
            We may change the service or these Terms at any time. Material changes will be
            reflected here with an updated &quot;Last updated&quot; date. Continued use after a change
            means you accept the updated Terms.
          </p>

          <h2>15. Governing law</h2>
          <p>
            These Terms are governed by the laws of the Republic of Korea, without regard to
            conflict-of-law principles. Disputes will be resolved exclusively in the courts of
            Seoul, Republic of Korea.
          </p>

          <h2>16. Contact</h2>
          <p>
            Questions about these Terms? Email{" "}
            <a href="mailto:hello@checkvisamap.com">hello@checkvisamap.com</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
