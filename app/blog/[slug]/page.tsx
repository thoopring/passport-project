import Link from 'next/link';
import { notFound } from 'next/navigation';

// 1. 블로그 글 데이터 (나중에는 DB나 CMS에서 가져오게 됩니다)
const BLOG_POSTS = {
  'visa-free-countries-for-koreans-2026': {
    title: 'Top 10 Visa-Free Destinations for South Koreans in 2026',
    date: '2026-01-23',
    content: `
      <p>South Korean passport holders enjoy one of the most powerful passports in the world...</p>
      <h2>1. Japan</h2>
      <p>Japan is the top destination for Koreans. It's visa-free for up to 90 days.</p>
      <div class="my-8 p-6 bg-blue-50 rounded-xl text-center border border-blue-100">
         <h3 class="font-bold text-xl mb-2">Planning a trip to Japan?</h3>
         <a href="https://search.hotellook.com/hotels?marker=491612&language=en&location=Japan" target="_blank" class="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition">Find Best Hotels in Japan 🏨</a>
      </div>
      <h2>2. Vietnam</h2>
      <p>Vietnam allows 45 days visa-free entry. Perfect for a long vacation.</p>
    `,
  },
  'digital-nomad-visa-guide': {
    title: 'Complete Guide to Digital Nomad Visas in Asia',
    date: '2026-02-01',
    content: `
      <p>Remote work is the new normal. Here are the best countries for digital nomads...</p>
      <h2>Thailand (LTR Visa)</h2>
      <p>Thailand offers a Long Term Resident visa for qualified nomads.</p>
    `,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: post.title,
    description: `Read about ${post.title} on Passport Power Blog.`,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 상단 네비게이션 */}
      <div className="max-w-3xl mx-auto px-4 py-6">
         <Link href="/blog" className="text-blue-600 hover:underline font-medium">← Back to Blog List</Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <p className="text-gray-500 text-sm mb-2">{post.date}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
            {post.title}
          </h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </header>

        {/* 본문 내용 (HTML 렌더링) */}
        <div 
          className="prose prose-lg prose-blue mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* 하단 CTA (Call To Action) - 돈 버는 버튼 */}
        <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
           <h3 className="text-2xl font-bold mb-2">Ready to travel?</h3>
           <p className="text-gray-600 mb-6">Check visa requirements for your next destination.</p>
           <Link href="/" className="inline-block bg-gray-900 text-white font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform">
             Check My Passport Power 🚀
           </Link>
        </div>
      </article>
    </div>
  );
}