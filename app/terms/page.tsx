import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { TERMS_CONTENT } from "./content";
import type { Locale } from "../../i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const c = TERMS_CONTENT[locale] ?? TERMS_CONTENT.en;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "https://checkvisamap.com/terms" },
  };
}

export default async function TermsPage() {
  const locale = (await getLocale()) as Locale;
  const c = TERMS_CONTENT[locale] ?? TERMS_CONTENT.en;
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
          {c.eyebrow}
        </p>
        <h1 className="font-display text-display-md sm:text-display-lg text-[var(--text-primary)] mb-3">
          {c.headline}
        </h1>
        <p className="text-body-sm text-[var(--text-muted)] mb-10">{c.lastUpdated}</p>

        <div className="prose prose-lg max-w-none text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)]">
          {c.sections.map((s) => (
            <div key={s.heading}>
              <h2>{s.heading}</h2>
              {/* Section 2 (Acceptance) and Section 9 (Refunds) have inline
                  links to other legal pages — render them specially. The rest
                  use the simple body/list shape. */}
              {s.heading === c.sections[1].heading ? (
                <p>
                  {c.acceptancePrefix}{" "}
                  <Link href="/privacy" className="text-[var(--brand-primary)]">{c.privacyLabel}</Link>
                  {c.acceptanceMid}{" "}
                  {c.acceptanceAnd}{" "}
                  <Link href="/refund" className="text-[var(--brand-primary)]">{c.refundLabel}</Link>
                  {c.acceptanceSuffix}
                </p>
              ) : s.heading === c.sections[8].heading ? (
                <p>
                  {c.refundsPrefix}{" "}
                  <Link href="/refund" className="text-[var(--brand-primary)]">/refund</Link>
                  {c.refundsSuffix}
                </p>
              ) : "body" in s && s.body ? (
                <p>{s.body}</p>
              ) : "bodies" in s ? (
                s.bodies.map((b, i) => <p key={i}>{b}</p>)
              ) : "list" in s ? (
                <ul>
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          <h2>{c.contactHeading}</h2>
          <p>
            {c.contactPrefix}{" "}
            <a href="mailto:gliddy@checkvisamap.com">gliddy@checkvisamap.com</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
