// components/AffiliateSection.tsx
import Link from 'next/link';

export default function AffiliateSection() {
  // ✅ 파트너님의 수익화 링크 적용 완료!
  const LINKS = {
    flight: "https://aviasales.tpx.lu/M1CWAKTJ",
    hotel: "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1956855&hl=en-us",
    vpn: "#" 
  };

  return (
    <div className="bg-[#FFFBF0] dark:bg-gray-900 py-20 px-4 border-y border-[#1a4d2e]/10 dark:border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a4d2e] dark:text-[#ff9f1c] font-serif mb-4">
            Travel Smart, Save More 💸
          </h2>
          <p className="opacity-70 max-w-2xl mx-auto">
            We partnered with the best to help you save money. Book through these links to support our project!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* ✈️ 1. 항공권 (Aviasales) */}
          <a href={LINKS.flight} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-blue-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-white">
            <div className="absolute top-0 right-0 opacity-10 text-9xl -mr-10 -mt-10 rotate-12">✈️</div>
            <div className="relative z-10">
              <div className="text-4xl mb-4 bg-white/20 w-16 h-16 flex items-center justify-center rounded-full backdrop-blur-md">✈️</div>
              <h3 className="text-2xl font-bold mb-2">Cheap Flights Scanner</h3>
              <p className="opacity-90 mb-6">Compare hundreds of airlines instantly. Find the absolute lowest fares for your visa run.</p>
              <span className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg group-hover:bg-yellow-300 group-hover:text-blue-900 transition-colors">
                Search Lowest Fares →
              </span>
            </div>
          </a>

          {/* 🏨 2. 숙소 (Agoda) */}
          <a href={LINKS.hotel} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden bg-[#ff9f1c] rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-[#1a4d2e]">
            <div className="absolute top-0 right-0 opacity-10 text-9xl -mr-10 -mt-10 rotate-12">🏨</div>
            <div className="relative z-10">
              <div className="text-4xl mb-4 bg-white/20 w-16 h-16 flex items-center justify-center rounded-full backdrop-blur-md">🏨</div>
              <h3 className="text-2xl font-bold mb-2">Up to 80% Off Hotels</h3>
              <p className="opacity-90 mb-6">Agoda usually has the best rates in Asia & Europe. Grab secret deals before they are gone.</p>
              <span className="inline-block bg-[#1a4d2e] text-white font-bold py-3 px-8 rounded-full shadow-lg group-hover:bg-white group-hover:text-[#1a4d2e] transition-colors">
                Find Hotel Deals →
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}