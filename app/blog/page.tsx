import Link from 'next/link';
import { BLOG_POSTS } from './data';

export const metadata = {
  title: 'Travel Visa Guide & Tips',
  description: 'Real stories, visa warnings, scam alerts, and money-saving tips for smart travelers. Guides for digital nomads and frequent flyers.',
  alternates: { canonical: 'https://checkvisamap.com/blog' },
  openGraph: {
    title: 'Travel Visa Guide & Tips | Passport Power',
    description: 'Real stories, visa warnings, and tips for smart travelers.',
    url: 'https://checkvisamap.com/blog',
    type: 'website',
    siteName: 'Passport Power',
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Destinations": "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100 dark:border-blue-900",
  "Visa Run Guide": "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 border-orange-100 dark:border-orange-900",
  "Horror Story": "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border-red-100 dark:border-red-900",
  "Lifestyle": "bg-pink-50 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400 border-pink-100 dark:border-pink-900",
  "Tips": "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-100 dark:border-green-900",
  "Culture": "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400 border-purple-100 dark:border-purple-900",
};

export default function BlogHome() {
  const posts = Object.entries(BLOG_POSTS)
    .map(([slug, post]) => ({ slug, ...post }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Nav */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center gap-2 text-body-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Back to Map
          </Link>
          <Link href="/" className="text-body-sm font-bold text-[var(--text-primary)]">Passport Power</Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-display-lg text-[var(--text-primary)] mb-3">Travel Stories & Guides</h1>
          <p className="text-body-lg text-[var(--text-secondary)]">
            Real experiences, visa hacks, and practical tips from the road.
          </p>
        </div>

        {/* Featured Post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-12">
            <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-950 dark:to-brand-900/20 border border-brand-100 dark:border-brand-900 rounded-2xl p-8 hover-lift">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-caption font-semibold border ${CATEGORY_COLORS[featured.category] || "bg-gray-50 text-gray-700 border-gray-100"}`}>
                {featured.category}
              </span>
              <h2 className="text-display-sm md:text-display-md text-[var(--text-primary)] mt-4 mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                {featured.title}
              </h2>
              <p className="text-body-md text-[var(--text-secondary)] line-clamp-2 mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3">
                <span className="text-caption text-[var(--text-muted)]">{featured.date}</span>
                <span className="text-caption font-semibold text-brand-600 dark:text-brand-400">Read story &rarr;</span>
              </div>
            </div>
          </Link>
        )}

        {/* Post Grid */}
        <div className="grid gap-4">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-xl hover:border-[var(--text-muted)] hover:shadow-card transition-all duration-200"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-caption font-semibold border ${CATEGORY_COLORS[post.category] || "bg-gray-50 text-gray-700 border-gray-100"}`}>
                    {post.category}
                  </span>
                  <span className="text-caption text-[var(--text-muted)]">{post.date}</span>
                </div>
                <h2 className="font-semibold text-body-md text-[var(--text-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition mb-1">
                  {post.title}
                </h2>
                <p className="text-body-sm text-[var(--text-secondary)] line-clamp-1">{post.excerpt}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition hidden sm:block">
                <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
