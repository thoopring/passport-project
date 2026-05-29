import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { BLOG_POSTS } from "../data";
import { localizedAlternates } from "../../../lib/i18n/seo";

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];
  if (!post) return { title: "Post not found" };

  const url = `https://checkvisamap.com/blog/${slug}`;
  // Pin the post's hero photo as og:image when one is set so Pinterest /
  // Reddit / X show the travel photo rather than the site-wide OG card.
  const ogImages = post.heroImage
    ? [{ url: post.heroImage, width: 1600, height: 1067, alt: post.title }]
    : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: localizedAlternates(`/blog/${slug}`),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      siteName: "gliddy",
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.heroImage ? { images: [post.heroImage] } : {}),
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "gliddy", url: "https://checkvisamap.com" },
    publisher: {
      "@type": "Organization",
      name: "gliddy",
      logo: { "@type": "ImageObject", url: "https://checkvisamap.com/logo.png" },
    },
    mainEntityOfPage: `https://checkvisamap.com/blog/${slug}`,
    articleSection: post.category,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />

      <article className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {post.category}
            </span>
            <span className="text-caption text-[var(--text-muted)]">·</span>
            <span className="text-caption text-[var(--text-muted)]">{post.date}</span>
          </div>
          <h1 className="font-display text-display-md sm:text-display-lg md:text-display-xl text-[var(--text-primary)] leading-[1.04] mb-4">
            {post.title}
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)]">{post.excerpt}</p>
        </header>

        <div className="w-12 h-px bg-[var(--border-light)] mb-12" />

        <div
          className="prose prose-lg max-w-none
            prose-headings:text-[var(--text-primary)]
            prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
            prose-a:text-[var(--brand-primary)] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[var(--text-primary)]
            prose-li:text-[var(--text-secondary)]
            prose-blockquote:border-[var(--accent-primary)] prose-blockquote:text-[var(--text-secondary)]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-10 border-t border-[var(--border-subtle)] text-center">
          <h3 className="font-display text-display-sm text-[var(--text-primary)] mb-3">
            Plan a trip next.
          </h3>
          <p className="text-body-sm text-[var(--text-secondary)] mb-6">
            Personalized itinerary, sorted. Hotel, transit, day-by-day stops, route map.
          </p>
          <Link
            href="/plan/new"
            className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white font-medium px-6 py-3 rounded-md hover:opacity-90 transition"
          >
            Plan a trip
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
