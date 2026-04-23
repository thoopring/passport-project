import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund policy for gliddy — when we refund, when we don't, and how to request one. 14-day window, no-questions refunds for technical failures.",
  alternates: { canonical: "https://checkvisamap.com/refund" },
};

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
          Legal
        </p>
        <h1 className="font-display text-display-lg text-[var(--text-primary)] mb-3">
          Refund Policy
        </h1>
        <p className="text-body-sm text-[var(--text-muted)] mb-10">Last updated: April 23, 2026</p>

        <div className="prose prose-lg max-w-none text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)]">
          <h2>Summary</h2>
          <ul>
            <li>
              <strong>Automatic refund</strong> if we fail to generate your plan within 10 minutes
              of payment for any technical reason.
            </li>
            <li>
              <strong>Refund on request</strong> within 14 days if your plan includes a clearly
              hallucinated place (a restaurant, hotel, or attraction that does not actually exist
              at the stated location).
            </li>
            <li>
              <strong>No refund</strong> for taste preferences (liking or disliking a
              recommendation), for changes to your travel dates after purchase, or after the plan
              has been downloaded as a PDF and 14 days have passed.
            </li>
          </ul>

          <h2>1. Technical failure refund</h2>
          <p>
            If our system fails to deliver a plan within 10 minutes of a successful charge — for
            example, Claude times out, our email delivery fails, or the plan is marked{" "}
            <code>failed</code> in our system — we initiate an automatic refund through
            LemonSqueezy to your original payment method. You do not need to contact us; we see
            the failure in logs and process it.
          </p>
          <p>
            Refunds typically appear on your statement within 5–10 business days depending on your
            card issuer. If you have not received the refund after 10 business days, email{" "}
            <a href="mailto:hello@checkvisamap.com">hello@checkvisamap.com</a> with your
            LemonSqueezy order number.
          </p>

          <h2>2. Hallucination refund</h2>
          <p>
            AI-generated plans can occasionally include a place that does not exist at the stated
            location, or a place that has permanently closed. We work hard to prevent this with
            strict prompt rules and a curated place library, but no generation is perfect.
          </p>
          <p>
            If you open your plan and find a hallucinated place, reply to your plan delivery email
            within 14 days of purchase with the stop name and your best evidence (a search result
            showing the place does not exist at that address, etc.). We will refund the plan in
            full.
          </p>

          <h2>3. What we do not refund</h2>
          <ul>
            <li>
              <strong>Taste preferences.</strong> If a restaurant is a real place but you did not
              enjoy it, that is a subjective judgment we cannot refund against. We recommend
              real, well-known spots; we do not promise you will like every one.
            </li>
            <li>
              <strong>Travel changes.</strong> If your trip is cancelled, postponed, or
              rescheduled after you buy the plan, the plan itself was still generated and
              delivered. We cannot refund for that.
            </li>
            <li>
              <strong>Closed places that were open at generation time.</strong> Businesses close.
              If a restaurant shut down last month, we cannot refund for that — the information
              was current in our training data at generation.
            </li>
            <li>
              <strong>Weather or external disruption.</strong> Typhoons, strikes, flight
              cancellations — these are outside the scope of the plan.
            </li>
            <li>
              <strong>Plans opened more than 14 days ago</strong> unless the reason qualifies
              under section 1 or 2.
            </li>
          </ul>

          <h2>4. How to request a refund</h2>
          <p>
            Reply to the original plan delivery email (subject line will match your destination)
            with the word <strong>REFUND</strong> at the top and the reason. If you cannot find
            the email, email{" "}
            <a href="mailto:hello@checkvisamap.com">hello@checkvisamap.com</a> with your
            LemonSqueezy order number (from your payment receipt) and your destination. We reply
            within 2 business days and issue the refund through LemonSqueezy.
          </p>

          <h2>5. Chargebacks</h2>
          <p>
            If you open a chargeback with your card issuer without first contacting us, we will
            contest it with evidence of delivery. We much prefer you just email us — we refund
            quickly for qualifying reasons and the process is less stressful for everyone.
          </p>

          <h2>6. Contact</h2>
          <p>
            Refund questions, order problems, or anything unclear:{" "}
            <a href="mailto:hello@checkvisamap.com">hello@checkvisamap.com</a>. See also our{" "}
            <Link href="/terms" className="text-[var(--brand-primary)]">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[var(--brand-primary)]">Privacy Policy</Link>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
