// app/blog/[slug]/page.tsx
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
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
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
    publisher: {
      "@type": "Organization",
      name: "Passport Power",
      logo: { "@type": "ImageObject", url: "https://checkvisamap.com/logo.png" },
    },
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

  // Get related posts (same category, different slug)
  const relatedPosts = Object.entries(BLOG_POSTS)
    .filter(([s, p]) => p.category === post.category && s !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
           <Link href="/blog" className="text-gray-500 hover:text-blue-600 font-medium flex items-center gap-2"><span>←</span> All Posts</Link>
           <Link href="/" className="text-xs font-bold px-3 py-1 bg-black text-white rounded-full hover:bg-gray-800">Check Visa Map</Link>
        </div>
      </nav>
      <article className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        <header className="mb-12 text-center">
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase">{post.category}</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mt-4 mb-6 leading-tight">{post.title}</h1>
          <p className="text-gray-500 font-medium">{post.date}</p>
        </header>
        <div className="prose prose-lg prose-blue mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">You might also like</h3>
            <div className="grid gap-4">
              {relatedPosts.map(([s, p]) => (
                <Link key={s} href={`/blog/${s}`} className="block p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100">
                  <span className="text-xs font-bold text-blue-600 uppercase">{p.category}</span>
                  <h4 className="font-bold text-gray-900 mt-1">{p.title}</h4>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 text-center shadow-sm">
           <h3 className="text-2xl font-bold mb-4 text-gray-900">Where are you going next?</h3>
           <p className="text-gray-600 mb-8">Don&apos;t get rejected at the border. Check requirements on our live map.</p>
           <Link href="/" className="inline-block bg-blue-600 text-white font-bold px-10 py-4 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-200">Check My Passport Power</Link>
        </div>
      </article>
    </div>
  );
}