import Link from "next/link";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ABOUT_CONTENT } from "./content";
import type { Locale } from "../../i18n/locales";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const c = ABOUT_CONTENT[locale] ?? ABOUT_CONTENT.en;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: "https://checkvisamap.com/about" },
  };
}

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About gliddy",
  description:
    "Why we built gliddy — an AI trip planner that writes a real itinerary, sorted.",
  url: "https://checkvisamap.com/about",
  mainEntity: { "@type": "Organization", name: "gliddy", email: "gliddy@checkvisamap.com" },
};

export default async function AboutPage() {
  const locale = (await getLocale()) as Locale;
  const c = ABOUT_CONTENT[locale] ?? ABOUT_CONTENT.en;
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <Header />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-6">
          {c.eyebrow}
        </p>
        <h1 className="font-display text-display-md sm:text-display-lg text-[var(--text-primary)] mb-10 leading-[1.04]">
          {c.headline}
        </h1>

        <div className="prose prose-lg max-w-none text-[var(--text-secondary)] prose-p:leading-relaxed prose-strong:text-[var(--text-primary)]">
          {c.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>
            <strong>{c.bodyClosing}</strong>
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-4">
          {c.values.map((v) => (
            <Value key={v.title} title={v.title} desc={v.desc} />
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-[var(--border-subtle)] text-center">
          <Link
            href="/plan/new"
            className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white font-medium px-6 py-3 rounded-md hover:opacity-90 transition"
          >
            {c.ctaButton}
            <span aria-hidden="true">→</span>
          </Link>
          <p className="text-caption text-[var(--text-muted)] mt-6">
            {c.contactLine}
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
