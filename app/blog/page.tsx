import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BLOG_POSTS } from "./data";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes, field reports, and writing from Passport Power.",
  alternates: { canonical: "https://checkvisamap.com/blog" },
  openGraph: {
    title: "Journal | Passport Power",
    description: "Notes, field reports, and writing from Passport Power.",
    url: "https://checkvisamap.com/blog",
    type: "website",
    siteName: "Passport Power",
  },
};

export default function BlogHome() {
  const posts = Object.entries(BLOG_POSTS)
    .map(([slug, post]) => ({ slug, ...post }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
          Journal
        </p>
        <h1 className="font-display text-display-lg text-[var(--text-primary)] mb-4 leading-tight">
          Notes from the road.
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] mb-14">
          Field reports, planning tips, and short writing about the places our plans are built for.
        </p>

        {posts.length === 0 ? (
          <div className="border-t border-[var(--border-subtle)] pt-14 text-center">
            <p className="text-body-md text-[var(--text-muted)] mb-6">
              The journal is being rebuilt. Check back soon — or go make a plan.
            </p>
            <Link
              href="/plan/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-primary)] text-white font-medium rounded-md hover:opacity-90 transition"
            >
              Plan a trip — $4
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-6 bg-[var(--surface-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-light)] rounded-lg hover-lift"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {post.category}
                  </span>
                  <span className="text-caption text-[var(--text-muted)]">·</span>
                  <span className="text-caption text-[var(--text-muted)]">{post.date}</span>
                </div>
                <h2 className="font-display text-display-sm text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-primary)] transition">
                  {post.title}
                </h2>
                <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
