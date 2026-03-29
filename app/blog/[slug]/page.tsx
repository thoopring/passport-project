import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '../data';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];
  if (!post) return { title: 'Post Not Found' };

  const url = `https://checkvisamap.com/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      siteName: "Passport Power",
      images: [{ url: "https://checkvisamap.com/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
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
    author: { "@type": "Organization", name: "Passport Power", url: "https://checkvisamap.com" },
    publisher: { "@type": "Organization", name: "Passport Power", logo: { "@type": "ImageObject", url: "https://checkvisamap.com/logo.png" } },
    mainEntityOfPage: `https://checkvisamap.com/blog/${slug}`,
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://checkvisamap.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://checkvisamap.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://checkvisamap.com/blog/${slug}` },
    ],
  };

  const relatedPosts = Object.entries(BLOG_POSTS)
    .filter(([s, p]) => p.category === post.category && s !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Nav */}
      <nav className="sticky top-0 z-10 glass border-b border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-body-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            All Posts
          </Link>
          <Link href="/" className="text-body-sm font-bold text-[var(--text-primary)] hover:text-brand-600 dark:hover:text-brand-400 transition">
            Passport Power
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-caption font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">{post.category}</span>
            <span className="text-caption text-[var(--text-muted)]">{post.date}</span>
          </div>
          <h1 className="text-display-lg md:text-display-xl text-[var(--text-primary)] mb-4 leading-tight">{post.title}</h1>
          <p className="text-body-lg text-[var(--text-secondary)]">{post.excerpt}</p>
        </header>

        {/* Separator */}
        <div className="w-12 h-px bg-[var(--border-light)] mb-12" />

        {/* Content */}
        <div className="prose prose-lg max-w-none
          prose-headings:text-[var(--text-primary)] prose-headings:font-bold
          prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
          prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[var(--text-primary)]
          prose-li:text-[var(--text-secondary)]
          prose-blockquote:border-brand-500 prose-blockquote:text-[var(--text-secondary)]
          prose-code:text-brand-700 dark:prose-code:text-brand-300
        " dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[var(--border-light)]">
            <h3 className="text-body-md font-semibold text-[var(--text-primary)] mb-4">You might also like</h3>
            <div className="grid gap-3">
              {relatedPosts.map(([s, p]) => (
                <Link
                  key={s}
                  href={`/blog/${s}`}
                  className="flex items-center justify-between p-4 bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-xl hover:border-[var(--text-muted)] transition group"
                >
                  <div className="min-w-0">
                    <span className="text-caption font-semibold text-brand-600 dark:text-brand-400 uppercase">{p.category}</span>
                    <h4 className="font-semibold text-body-sm text-[var(--text-primary)] mt-0.5 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">{p.title}</h4>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 p-8 bg-[var(--surface-secondary)] rounded-2xl border border-[var(--border-light)] text-center">
          <h3 className="text-display-sm text-[var(--text-primary)] mb-3">Check your destination</h3>
          <p className="text-body-sm text-[var(--text-secondary)] mb-6">
            Verify visa requirements before you book your trip.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-soft"
          >
            Open Visa Map
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </article>
    </div>
  );
}
