// app/blog/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '../data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
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
        <div className="mt-24 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 text-center shadow-sm">
           <h3 className="text-2xl font-bold mb-4 text-gray-900">Where are you going next? ✈️</h3>
           <p className="text-gray-600 mb-8">Don't get rejected at the border. Check requirements on our live map.</p>
           <Link href="/" className="inline-block bg-blue-600 text-white font-bold px-10 py-4 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-200">Check My Passport Power 🚀</Link>
        </div>
      </article>
    </div>
  );
}