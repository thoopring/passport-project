import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for gliddy. Learn how we handle your data.",
  alternates: { canonical: "https://checkvisamap.com/privacy" },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
          Legal
        </p>
        <h1 className="font-display text-display-lg text-[var(--text-primary)] mb-3">
          Privacy Policy
        </h1>
        <p className="text-body-sm text-[var(--text-muted)] mb-10">Last updated: April 17, 2026</p>

        <div className="prose prose-lg max-w-none text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)]">
          <h2>1. Information we collect</h2>
          <ul>
            <li>
              <strong>Trip plan inputs:</strong> When you order a plan, you provide a destination,
              duration, budget range, email, and a few preferences. We store this with the generated
              plan so we can re-deliver it to you.
            </li>
            <li>
              <strong>Email address:</strong> Required to deliver your plan. We do not add you to any
              marketing list unless you explicitly opt in.
            </li>
            <li>
              <strong>Analytics:</strong> Google Analytics 4 and Google Tag Manager collect anonymous
              usage data (pages visited, device type, geographic region). No PII is collected through
              analytics.
            </li>
            <li>
              <strong>Cookies:</strong> Essential cookies for locale preference and referral attribution.
              Third-party cookies from analytics and affiliate partners.
            </li>
          </ul>

          <h2>2. How we use your information</h2>
          <ul>
            <li>To generate and deliver the trip plan you ordered</li>
            <li>To process payment via LemonSqueezy</li>
            <li>To improve the site and the AI&apos;s output quality</li>
            <li>To credit referral rewards</li>
          </ul>

          <h2>3. Third-party services</h2>
          <ul>
            <li><strong>Anthropic (Claude API)</strong> — generates your plan from your inputs</li>
            <li><strong>Supabase</strong> — stores plans, referrals, promo codes</li>
            <li><strong>LemonSqueezy</strong> — processes payment</li>
            <li><strong>Resend</strong> — delivers your plan email</li>
            <li><strong>Mapbox</strong> — renders your route map</li>
            <li><strong>Google Analytics / Google Tag Manager</strong> — site analytics</li>
            <li><strong>Agoda, Aviasales, Airalo</strong> — affiliate partners (clicks may set tracking cookies)</li>
          </ul>

          <h2>4. Affiliate disclosure</h2>
          <p>
            This site contains affiliate links. When you click on these links and make a purchase,
            we may earn a commission at no additional cost to you.
          </p>

          <h2>5. Your rights</h2>
          <ul>
            <li>Request deletion of your plan and email by contacting us</li>
            <li>Opt out of analytics via browser Do Not Track</li>
            <li>Disable cookies in your browser</li>
          </ul>

          <h2>6. Data security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method
            of transmission over the Internet is 100% secure.
          </p>

          <h2>7. Children&apos;s privacy</h2>
          <p>
            Our service is not directed to children under 13. We do not knowingly collect personal
            information from children.
          </p>

          <h2>8. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. Changes will be posted here with an updated
            date.
          </p>

          <h2>9. Contact</h2>
          <p>
            For any questions, email{" "}
            <a href="mailto:hello@checkvisamap.com">hello@checkvisamap.com</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
