import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PRIVACY_CONTENT } from "./content";
import type { Locale } from "../../i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const c = PRIVACY_CONTENT[locale] ?? PRIVACY_CONTENT.en;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "https://checkvisamap.com/privacy" },
  };
}

export default async function PrivacyPolicy() {
  const locale = (await getLocale()) as Locale;
  const c = PRIVACY_CONTENT[locale] ?? PRIVACY_CONTENT.en;
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
          {c.eyebrow}
        </p>
        <h1 className="font-display text-display-lg text-[var(--text-primary)] mb-3">
          {c.headline}
        </h1>
        <p className="text-body-sm text-[var(--text-muted)] mb-10">{c.lastUpdated}</p>

        <div className="prose prose-lg max-w-none text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)]">
          {c.sections.map((s) => (
            <div key={s.heading}>
              <h2>{s.heading}</h2>
              {"body" in s ? (
                <p>{s.body}</p>
              ) : (
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
            {c.contactPrefix}{" "}
            <a href="mailto:gliddy@checkvisamap.com">gliddy@checkvisamap.com</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
