import Link from 'next/link';

export const metadata = {
  title: 'Travel Visa Guide & Tips | Passport Power',
  description: 'Latest travel tips, visa policy changes, and guides for digital nomads.',
};

// 나중에 여기 데이터를 늘려가면 됩니다.
const BLOG_POSTS = [
  {
    slug: 'visa-free-countries-for-koreans-2026',
    title: 'Top 10 Visa-Free Destinations for South Koreans in 2026',
    excerpt: 'Discover the best travel spots where you don\'t need a visa with a KR passport.',
    date: '2026-01-23',
  },
  {
    slug: 'digital-nomad-visa-guide',
    title: 'Complete Guide to Digital Nomad Visas in Asia',
    excerpt: 'How to work remotely from Thailand, Vietnam, and Bali legally.',
    date: '2026-02-01',
  },
];

export default function BlogHome() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">← Back to Home</Link>
        
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Travel & Visa Blog 📰</h1>
        
        <div className="grid gap-6">
          {BLOG_POSTS.map((post) => (
            <div key={post.slug} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600">{post.excerpt}</p>
              <Link href="#" className="text-blue-500 font-medium mt-4 inline-block hover:underline">
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}