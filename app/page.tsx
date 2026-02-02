"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import visaDataRaw from "../visa_data.json"; 
import WorldMap from "../components/WorldMap"; 
import TravelFortune from "../components/TravelFortune"; 
import AffiliateSection from "../components/AffiliateSection"; // ✅ 1. 돈 버는 섹션 추가

// 1. 데이터 타입 정의
interface VisaData {
  origin: string;
  destination: string;
  requirement: string;
  allowed_stay?: string;
  notes?: string;
}

const visaData: VisaData[] = visaDataRaw as VisaData[];

// 2. 지원하는 8개 여권 목록
const ORIGIN_COUNTRIES = [
  { name: "South Korea", flag: "🇰🇷", code: "KR" },
  { name: "United States", flag: "🇺🇸", code: "US" },
  { name: "United Kingdom", flag: "🇬🇧", code: "UK" },
  { name: "Canada", flag: "🇨🇦", code: "CA" },
  { name: "Australia", flag: "🇦🇺", code: "AU" },
  { name: "Germany", flag: "🇩🇪", code: "DE" },
  { name: "France", flag: "🇫🇷", code: "FR" },
  { name: "Japan", flag: "🇯🇵", code: "JP" },
];

function createSlug(destination: string, origin: string) {
  const p = origin.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const d = destination.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${p}-to-${d}`; 
}

export default function Home() {
  const [selectedOrigin, setSelectedOrigin] = useState("South Korea");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // 다크 모드 로직
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  // 3. 실시간 필터링 및 통계 계산
  const { filteredData, stats } = useMemo(() => {
    const filtered = visaData.filter((visa) => {
      if (visa.destination.length > 50) return false;
      if (!visa.destination || !visa.origin) return false;
      if (/^\d/.test(visa.destination)) return false; 
      
      const originMatch = visa.origin.toLowerCase() === selectedOrigin.toLowerCase();
      const searchMatch = visa.destination.toLowerCase().includes(searchTerm.toLowerCase());

      return originMatch && searchMatch;
    });

    const statsData = visaData.filter(v => v.origin.toLowerCase() === selectedOrigin.toLowerCase());
    const visaFree = statsData.filter(v => v.requirement.toLowerCase().includes("visa not required") || v.requirement.toLowerCase().includes("visa free")).length;
    const visaOnArrival = statsData.filter(v => v.requirement.toLowerCase().includes("visa on arrival")).length;
    const eSim = statsData.filter(v => v.requirement.toLowerCase().includes("electronic") || v.requirement.toLowerCase().includes("evisa")).length;
    const required = statsData.length - (visaFree + visaOnArrival + eSim);

    return { filteredData: filtered, stats: { visaFree, visaOnArrival, eSim, required } };
  }, [selectedOrigin, searchTerm]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-[#FFFBF0] text-[#1a4d2e]'}`}>
      
      {/* 🌙 다크모드 토글 */}
      <button 
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* 1. HERO SECTION */}
      <div className="relative bg-[#1a4d2e] text-[#FFFBF0] pt-24 pb-32 px-6 overflow-hidden rounded-b-[4rem] shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#ff9f1c] text-[#ff9f1c] text-sm font-bold tracking-widest uppercase animate-fade-in">
            Travel Smarter, Not Harder
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight font-serif leading-tight">
            Don't Just Travel.<br/>
            <span className="text-[#ff9f1c]">Travel Smarter.</span>
          </h1>
          
          <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Check visa rules instantly, discover hidden gems, and unlock your passport's full potential.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#map-section" className="bg-[#ff9f1c] text-[#1a4d2e] font-bold py-4 px-10 rounded-full hover:bg-[#ffbf69] transition shadow-lg transform hover:-translate-y-1">
              Explore the Map 🗺️
            </a>
            <Link href="/blog" className="border-2 border-[#FFFBF0] text-[#FFFBF0] font-bold py-4 px-10 rounded-full hover:bg-[#FFFBF0] hover:text-[#1a4d2e] transition">
              Read Survival Guides 📖
            </Link>
          </div>

          {/* 여권 선택 슬라이더 */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 inline-block max-w-4xl w-full">
            <p className="text-sm text-white/60 mb-4 uppercase tracking-wider font-bold">Select Your Passport</p>
            <div className="flex flex-wrap justify-center gap-3">
              {ORIGIN_COUNTRIES.map((country) => (
                <button 
                  key={country.name}
                  onClick={() => setSelectedOrigin(country.name)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold transition-all duration-300 ${
                    selectedOrigin === country.name 
                    ? "bg-[#ff9f1c] text-[#1a4d2e] shadow-lg transform scale-105" 
                    : "bg-[#1a4d2e]/50 border border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="hidden sm:inline">{country.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. FUN SECTION: Travel Fortune */}
      <section className="-mt-16 mb-20 relative z-20 px-4">
        <TravelFortune />
      </section>

      {/* 3. MAP & STATS SECTION */}
      <div id="map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-[#1a4d2e] dark:text-[#ff9f1c]">
            Where can <span className="underline decoration-[#ff9f1c]">{selectedOrigin}</span> take you?
          </h2>
          <p className="text-lg opacity-70">
             Explore visa requirements on the interactive map below.
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">{stats.visaFree}</div>
            <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Visa Free</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-yellow-500">
            <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">{stats.visaOnArrival}</div>
            <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">On Arrival</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-cyan-500">
            <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">{stats.eSim}</div>
            <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">e-Visa</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
            <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-1">{stats.required}</div>
            <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Visa Required</div>
          </div>
        </div>

        {/* 지도 */}
        <div className="shadow-2xl rounded-3xl overflow-hidden border-4 border-white dark:border-gray-700 bg-[#aed9e0]/20 dark:bg-gray-800">
           <WorldMap selectedOrigin={selectedOrigin} visaData={visaData} />
        </div>
      </div>

      {/* ✅ 2. [추가] 수익화 섹션 (지도 바로 아래 배치) */}
      <AffiliateSection />

      {/* 4. SEARCH & LIST SECTION */}
      <div className="bg-white dark:bg-gray-900 py-20 px-4 rounded-t-[3rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto">
          
          {/* 검색창 */}
          <div className="max-w-2xl mx-auto mb-16 relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-[#1a4d2e] to-[#ff9f1c] rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-200"></div>
             <input 
               type="text" 
               placeholder={`Search destination (e.g., Vietnam, Italy)...`}
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="relative w-full px-8 py-5 text-xl rounded-2xl border-none shadow-2xl focus:ring-4 focus:ring-[#ff9f1c]/50 outline-none text-gray-800 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400"
             />
             <span className="absolute right-6 top-5 text-2xl text-gray-400">🔍</span>
          </div>

          {/* 결과 그리드 */}
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData.map((visa, index) => {
                const cleanReq = visa.requirement.replace(/\[.*?\]/g, "").trim();
                let statusStyle = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
                let icon = "🔒";
                const reqLower = cleanReq.toLowerCase();
                if (reqLower.includes("visa not required") || reqLower.includes("visa free")) {
                  statusStyle = "bg-green-100 text-green-800 border-green-200";
                  icon = "✨";
                } else if (reqLower.includes("visa on arrival")) {
                  statusStyle = "bg-yellow-100 text-yellow-800 border-yellow-200";
                  icon = "🛬";
                } else if (reqLower.includes("electronic") || reqLower.includes("evisa")) {
                  statusStyle = "bg-cyan-100 text-cyan-800 border-cyan-200";
                  icon = "💻";
                } else if (reqLower.includes("banned") || reqLower.includes("refused")) {
                  statusStyle = "bg-red-100 text-red-800 border-red-200";
                  icon = "🚫";
                }

                const slug = createSlug(visa.destination, visa.origin);

                return (
                  // ✅ 3. [수정] 카드 구조 변경 (호텔 버튼 추가를 위해 div로 감쌈)
                  <div key={`${visa.origin}-${visa.destination}-${index}`} className="flex flex-col justify-between bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#ff9f1c] h-full">
                    
                    {/* 상단: 비자 상세 페이지 링크 */}
                    <Link href={`/visa/${slug}`} className="block group flex-grow">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#1a4d2e] dark:group-hover:text-[#ff9f1c] transition-colors line-clamp-1">
                            {visa.destination}
                          </h2>
                          <span className="text-2xl">{icon}</span>
                        </div>
                        <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${statusStyle} mb-2`}>
                          {cleanReq}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-400 font-medium">
                        <span>View details</span>
                        <span className="text-[#ff9f1c] group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </Link>

                    {/* ✅ 4. [추가] 아고다 호텔 예약 버튼 */}
                    <a 
                      href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1956855&hl=en-us" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block w-full text-center py-3 rounded-xl bg-[#ff9f1c]/10 text-[#ff9f1c] font-bold text-sm hover:bg-[#ff9f1c] hover:text-white transition shadow-sm border border-[#ff9f1c]/20"
                    >
                      🏨 Check Hotels in {visa.destination}
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">🤔</span>
              <p className="text-xl text-gray-500 font-medium">No results found.</p>
            </div>
          )}
        </div>
      </div>

      {/* 5. BLOG TEASER SECTION */}
      <div className="bg-[#FFFBF0] dark:bg-gray-900 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a4d2e] dark:text-[#ff9f1c] font-serif mb-4">
              Latest Survival Guides
            </h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Real stories, scam warnings, and money-saving tips from the road.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/blog/thailand-cambodia-visa-run-guide-2026" className="group cursor-pointer">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white text-4xl">🏃‍♂️</div>
                <div className="p-6">
                  <div className="text-xs font-bold text-[#ff9f1c] mb-2 uppercase tracking-wide">Visa Run</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-[#1a4d2e] dark:group-hover:text-[#ff9f1c] transition">
                    Bangkok to Poipet Visa Run Guide (2026)
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    Don't get scammed at the border. Here is the exact cost breakdown and map of the "Fake Consulate".
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/blog/secondary-inspection-interrogation-story" className="group cursor-pointer">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-r from-gray-700 to-black flex items-center justify-center text-white text-4xl">👮‍♂️</div>
                <div className="p-6">
                  <div className="text-xs font-bold text-red-500 mb-2 uppercase tracking-wide">Horror Story</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-[#1a4d2e] dark:group-hover:text-[#ff9f1c] transition">
                    My 2 Hours in the Airport Interrogation Room
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    I did nothing wrong, but I said the wrong thing. Here are the 3 words you should NEVER say to immigration.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/blog/digital-nomad-dating-visa-love" className="group cursor-pointer">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white text-4xl">💘</div>
                <div className="p-6">
                  <div className="text-xs font-bold text-pink-500 mb-2 uppercase tracking-wide">Lifestyle</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-[#1a4d2e] dark:group-hover:text-[#ff9f1c] transition">
                    Digital Nomad Dating & Visas
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    Which country has the best visa for finding love? We analyzed Bali, Lisbon, and Mexico City.
                  </p>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-16">
            <Link href="/blog" className="inline-block px-8 py-4 border-2 border-[#1a4d2e] text-[#1a4d2e] dark:border-[#ff9f1c] dark:text-[#ff9f1c] font-bold rounded-full hover:bg-[#1a4d2e] hover:text-white dark:hover:bg-[#ff9f1c] dark:hover:text-black transition uppercase tracking-widest text-sm">
              View All Guides →
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a4d2e] text-[#FFFBF0] mt-0 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-4xl mb-6">🌍</div>
          <h3 className="text-2xl font-serif font-bold mb-4">Passport Power Project</h3>
          <p className="opacity-70 mb-8">
            Empowering travelers to cross borders with confidence.<br/>
            Built by nomads, for nomads.
          </p>
          <div className="flex justify-center gap-6 text-sm font-bold opacity-80">
            <Link href="/blog" className="hover:text-[#ff9f1c] transition">Blog</Link>
            <Link href="#" className="hover:text-[#ff9f1c] transition">About</Link>
            <Link href="#" className="hover:text-[#ff9f1c] transition">Disclaimer</Link>
          </div>
          <p className="text-xs opacity-40 mt-12">
            © 2026 Passport Power. Not affiliated with any government agency.
          </p>
        </div>
      </footer>
    </div>
  );
}