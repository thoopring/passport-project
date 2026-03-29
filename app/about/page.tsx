"use client";

import Link from "next/link";

export default function AboutPage() {
  // JSON-LD for About page
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Passport Power",
    description: "We built Passport Power because we were scared at the airport. A free visa checker for travelers worldwide.",
    url: "https://checkvisamap.com/about",
    mainEntity: {
      "@type": "Organization",
      name: "Passport Power",
      email: "hello@checkvisamap.com",
    },
  };
  return (
    <div className="min-h-screen bg-[#FFFBF0] dark:bg-gray-900 text-[#1a4d2e] dark:text-gray-100 font-sans transition-colors duration-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      {/* 1. 네비게이션 (심플하게 홈으로 가는 버튼) */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-black font-serif tracking-tighter hover:text-[#ff9f1c] transition">
          Passport Power 🌍
        </Link>
        <Link href="/" className="text-sm font-bold border-2 border-[#1a4d2e] dark:border-gray-100 px-4 py-2 rounded-full hover:bg-[#1a4d2e] hover:text-white dark:hover:bg-gray-100 dark:hover:text-black transition">
          ← Back to Map
        </Link>
      </nav>

      {/* 2. 히어로 섹션 */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <span className="text-[#ff9f1c] font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
        <h1 className="text-5xl md:text-6xl font-black font-serif mb-8 leading-tight">
          We built this because we were <br/>
          <span className="text-red-500 underline decoration-wavy decoration-[#ff9f1c]">scared at the airport.</span>
        </h1>
        <p className="text-xl opacity-70 leading-relaxed max-w-2xl mx-auto">
          Traveling should be about freedom, not bureaucracy. <br/>
          We are digital nomads who got tired of confusing visa rules.
        </p>
      </div>

      {/* 3. 스토리텔링 섹션 */}
      <div className="bg-white dark:bg-gray-800 py-20 px-6 my-12 transform -skew-y-2">
        <div className="max-w-3xl mx-auto transform skew-y-2">
          <h2 className="text-3xl font-bold mb-6 font-serif">The "Visa Panic" Moment 😱</h2>
          <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
            <p className="mb-4">
              It happened in 2024. I was standing at the check-in counter, ready to board my flight to Vietnam. 
              The airline staff looked at my passport and shook her head.
            </p>
            <p className="mb-4 italic border-l-4 border-[#ff9f1c] pl-4">
              "Sir, your e-visa has a typo in your middle name. You cannot board."
            </p>
            <p className="mb-8">
              Panic set in. My flight was leaving in 2 hours. I lost $400 that day and missed my trip.
              That's when I realized: <strong>Official government websites are confusing, and Wikipedia is often outdated.</strong>
            </p>
            <p>
              So, I decided to build <strong>Passport Power</strong>. 
              A simple, visual tool to check visa requirements instantly. 
              No legal jargon, just clear "Go" or "No Go" answers.
            </p>
          </div>
        </div>
      </div>

      {/* 4. 미션 & 가치 */}
      <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12 text-center">
        <div className="p-6 rounded-2xl bg-[#ff9f1c]/10 border border-[#ff9f1c]/20">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2">Speed First</h3>
          <p className="opacity-70 text-sm">We verify rules so you don't have to read 10-page PDF files.</p>
        </div>
        <div className="p-6 rounded-2xl bg-blue-100/50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">Real Experience</h3>
          <p className="opacity-70 text-sm">We add tips from real travelers, not just copy-pasting laws.</p>
        </div>
        <div className="p-6 rounded-2xl bg-green-100/50 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="text-xl font-bold mb-2">Always Free</h3>
          <p className="opacity-70 text-sm">This tool will always be free for travelers. We survive on coffee & affiliate support.</p>
        </div>
      </div>

      {/* 5. 하단 CTA (Call to Action) */}
      <div className="text-center pb-32 pt-10">
        <h2 className="text-3xl font-bold mb-8">Ready to explore?</h2>
        <Link href="/" className="inline-block bg-[#1a4d2e] text-[#FFFBF0] dark:bg-[#ff9f1c] dark:text-[#1a4d2e] font-bold py-4 px-10 rounded-full hover:scale-105 transition shadow-xl">
          Check Visa Map 🗺️
        </Link>
        <div className="mt-12 text-sm opacity-50">
          <p>Contact us: hello@checkvisamap.com</p>
          <p>© 2026 Passport Power Project</p>
        </div>
      </div>
    </div>
  );
}