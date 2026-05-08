import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { REFUND_CONTENT } from "./content";
import { localizedAlternates } from "../../lib/i18n/seo";
import type { Locale } from "../../i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const c = REFUND_CONTENT[locale] ?? REFUND_CONTENT.en;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localizedAlternates("/refund"),
  };
}

export default async function RefundPage() {
  const locale = (await getLocale()) as Locale;
  const c = REFUND_CONTENT[locale] ?? REFUND_CONTENT.en;
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
          <h2>{c.summaryHeading}</h2>
          <ul>
            {c.summaryList.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          {c.sections.map((s) => (
            <div key={s.heading}>
              <h2>{s.heading}</h2>
              {"body" in s && <p>{s.body}</p>}
              {"bodies" in s && s.bodies.map((b, i) => <p key={i}>{b}</p>)}
              {"list" in s && (
                <ul>
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <h2>{c.contactHeading}</h2>
          <p>
            {c.contactBody}{" "}
            <a href="mailto:gliddy@checkvisamap.com">gliddy@checkvisamap.com</a>. {c.contactSeeAlso}{" "}
            <Link href="/terms" className="text-[var(--brand-primary)]">{c.termsLabel}</Link>
            {" · "}
            <Link href="/privacy" className="text-[var(--brand-primary)]">{c.privacyLabel}</Link>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
