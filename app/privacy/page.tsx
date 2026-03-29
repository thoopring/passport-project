import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Check Visa Map (Passport Power). Learn how we handle your data.",
  alternates: { canonical: "https://checkvisamap.com/privacy" },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-flex items-center gap-2 font-medium">
          <span>←</span> Back to Home
        </Link>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: March 29, 2026</p>

        <div className="prose prose-lg prose-gray max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            <strong>Check Visa Map</strong> (&quot;Passport Power&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy. We collect minimal information:
          </p>
          <ul>
            <li><strong>Analytics Data:</strong> We use Google Analytics 4 and Google Tag Manager to collect anonymous usage data including pages visited, time spent, device type, and geographic region. No personally identifiable information is collected through analytics.</li>
            <li><strong>Email Address:</strong> If you voluntarily subscribe to our newsletter, we collect your email address solely for sending travel updates and deals.</li>
            <li><strong>Cookies:</strong> We use essential cookies for site functionality (dark mode preference) and third-party cookies from Google Analytics and our advertising partners.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To improve our website and user experience</li>
            <li>To send newsletter updates (only if subscribed)</li>
            <li>To analyze traffic patterns and optimize content</li>
            <li>To display relevant advertisements through Google AdSense</li>
          </ul>

          <h2>3. Third-Party Services</h2>
          <p>We use the following third-party services that may collect data:</p>
          <ul>
            <li><strong>Google Analytics / Google Tag Manager</strong> - Website analytics</li>
            <li><strong>Google AdSense</strong> - Display advertising</li>
            <li><strong>Agoda, Aviasales, Airalo, Viator</strong> - Affiliate partnerships (clicking links may set tracking cookies)</li>
            <li><strong>Travelpayouts</strong> - Affiliate network tracking</li>
          </ul>

          <h2>4. Affiliate Disclosure</h2>
          <p>
            This website contains affiliate links. When you click on these links and make a purchase, we may earn a commission at no additional cost to you. This helps us keep the site free for all travelers.
          </p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Opt out of analytics tracking (use browser Do Not Track setting)</li>
            <li>Unsubscribe from our newsletter at any time</li>
            <li>Request deletion of your data by contacting us</li>
            <li>Disable cookies in your browser settings</li>
          </ul>

          <h2>6. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2>7. Children&apos;s Privacy</h2>
          <p>
            Our service is not directed to children under 13. We do not knowingly collect personal information from children.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            For any questions about this Privacy Policy, contact us at: <a href="mailto:hello@checkvisamap.com" className="text-blue-600">hello@checkvisamap.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
