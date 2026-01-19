'use client';

import { useState } from 'react';
import Link from 'next/link';
import visaData from '../visa_data.json'; 

export default function Home() {
  const [passport, setPassport] = useState('South Korea'); // 기본값: 한국
  const [searchTerm, setSearchTerm] = useState('');

  // 선택된 여권 데이터만 필터링
  const filteredData = visaData.filter((item: any) => {
    const origin = item.origin || 'South Korea';
    const dest = item.destination || '';
    return origin === passport && dest.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-[family-name:var(--font-geist-sans)]">
      
      {/* 헤더 & 여권 선택기 */}
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">
          🌍 Passport Power
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Check visa requirements for <strong>{passport}</strong> Citizens.
        </p>

        {/* 탭 버튼 */}
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => setPassport('South Korea')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              passport === 'South Korea' 
              ? 'bg-blue-600 text-white shadow-lg scale-105' 
              : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            🇰🇷 South Korea Passport
          </button>
          <button 
            onClick={() => setPassport('United States')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              passport === 'United States' 
              ? 'bg-blue-800 text-white shadow-lg scale-105' 
              : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            🇺🇸 USA Passport
          </button>
        </div>

        {/* 검색창 */}
        <input
          type="text"
          placeholder={`Search destination (e.g., Japan, France)...`}
          className="w-full max-w-lg px-6 py-4 rounded-xl border border-gray-200 shadow-sm text-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      {/* 국가 리스트 */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item: any, index: number) => {
          const dest = item.destination.replace(/\[.*?\]/g, '').trim();
          const req = item.requirement.replace(/\[.*?\]/g, '').trim();
          const isFree = req.toLowerCase().includes('not required') || req.toLowerCase().includes('visa free');
          
          // URL 생성 로직
          const originSlug = passport === 'United States' ? 'united-states' : 'south-korea';
          const destSlug = dest.toLowerCase().replace(/ /g, '-');

          return (
            <Link 
              key={index} 
              href={`/visa/${originSlug}-to-${destSlug}`}
              className="group block bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 hover:border-blue-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                  {dest}
                </h2>
                <span className="text-2xl">✈️</span>
              </div>
              
              <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${
                isFree ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {isFree ? 'Visa Free ✅' : 'Visa Required ⚠️'}
              </div>
              
              <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                Click for details...
              </p>
            </Link>
          );
        })}
      </main>
      
      <footer className="mt-16 text-center text-gray-400 text-sm">
        © 2026 Passport Power. Real-time Visa Data.
      </footer>
    </div>
  );
}