import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for Check Visa Map (Passport Power). Important information about visa data accuracy and affiliate relationships.",
  alternates: { canonical: "https://checkvisamap.com/disclaimer" },
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-flex items-center gap-2 font-medium">
          <span>←</span> Back to Home
        </Link>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Disclaimer</h1>
        <p className="text-gray-500 mb-8">Last updated: March 29, 2026</p>

        <div className="prose prose-lg prose-gray max-w-none">
          <h2>General Disclaimer</h2>
          <p>
            The information provided on <strong>Check Visa Map</strong> (checkvisamap.com) is for general informational purposes only.
            While we strive to keep the information up to date and accurate, we make no representations or warranties
            of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the
            information contained on this website.
          </p>

          <h2>Not Government Affiliated</h2>
          <p>
            <strong>Passport Power is NOT affiliated with any government agency or embassy.</strong> Visa requirements
            can change without notice. Always verify current requirements with the official embassy or consulate of
            your destination country before traveling.
          </p>

          <h2>Visa Information Accuracy</h2>
          <p>
            Visa regulations are complex and change frequently. The data on this site is compiled from public sources
            and may not reflect the most recent changes. We recommend:
          </p>
          <ul>
            <li>Checking the official embassy website of your destination</li>
            <li>Consulting with a qualified immigration attorney for complex cases</li>
            <li>Verifying requirements at least 2-4 weeks before your travel date</li>
            <li>Carrying printed copies of any e-visa or approval documents</li>
          </ul>

          <h2>Affiliate Disclosure</h2>
          <p>
            This website participates in affiliate programs with Agoda, Aviasales, Airalo, Viator, NordVPN,
            Insubuy, Rail Europe, and other travel services. This means we may earn a commission when you click
            on affiliate links and make a purchase. <strong>This comes at no additional cost to you.</strong>
          </p>
          <p>
            Our affiliate relationships do not influence our visa information or travel recommendations.
            We only recommend services we believe are genuinely useful for travelers.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Passport Power be liable for any loss or damage including without limitation,
            indirect or consequential loss or damage, arising from the use of information on this website.
            Travel decisions should be made based on official sources and professional advice.
          </p>

          <h2>External Links</h2>
          <p>
            This website contains links to external sites. We have no control over the content and nature of
            these sites and are not responsible for their content or privacy practices.
          </p>

          <h2>Contact</h2>
          <p>
            If you have concerns about any information on this site, please contact us at{" "}
            <a href="mailto:hello@checkvisamap.com" className="text-blue-600">hello@checkvisamap.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
