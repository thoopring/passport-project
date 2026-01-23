// app/blog/page.tsx
import Link from 'next/link';
import { BLOG_POSTS } from './data';

export const metadata = {
  title: 'Travel Visa Guide & Tips | Passport Power',
  description: 'Real stories, visa warnings, and tips for smart travelers.',
};

export default function BlogHome() {
  const posts = Object.entries(BLOG_POSTS)
    .map(([slug, post]) => ({ slug, ...post }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-flex items-center gap-2 font-medium">
          <span>←</span> Back to Map
        </Link>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Travel & Visa Blog 🌍</h1>
        <p className="text-gray-600 mb-12 text-lg">No AI fluff. Just real stories and visa hacks.</p>
        
        <div className="grid gap-8">
          {posts.map((post) => (
            <div key={post.slug} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full uppercase">{post.category}</span>
                <span className="text-sm text-gray-400">{post.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group">
                <Link href={`/blog/${post.slug}`} className="group-hover:text-blue-600 transition-colors">{post.title}</Link>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">Read Story →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}