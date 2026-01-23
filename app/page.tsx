"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import visaDataRaw from "../visa_data.json"; 

// 1. 데이터 타입 정의
interface VisaData {
  origin: string;
  destination: string;
  requirement: string;
  allowed_stay?: string;
  notes?: string;
}

const visaData: VisaData[] = visaDataRaw as VisaData[];

// 2. 지원하는 8개 여권 목록 (플래그 포함)
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

  // 3. 실시간 필터링 및 통계 계산
  const { filteredData, stats } = useMemo(() => {
    const filtered = visaData.filter((visa) => {
      // 쓰레기 데이터 제거
      if (visa.destination.length > 50) return false;
      if (!visa.destination || !visa.origin) return false;
      if (/^\d/.test(visa.destination)) return false; 
      // 여권 일치 확인
      const originMatch = visa.origin.toLowerCase() === selectedOrigin.toLowerCase();
      // 검색어 일치 확인
      const searchMatch = visa.destination.toLowerCase().includes(searchTerm.toLowerCase());

      return originMatch && searchMatch;
    });

    // 통계 계산 (현재 선택된 여권 기준)
    const statsData = visaData.filter(v => v.origin.toLowerCase() === selectedOrigin.toLowerCase());
    const visaFree = statsData.filter(v => v.requirement.toLowerCase().includes("visa not required") || v.requirement.toLowerCase().includes("visa free")).length;
    const visaOnArrival = statsData.filter(v => v.requirement.toLowerCase().includes("visa on arrival")).length;
    const eSim = statsData.filter(v => v.requirement.toLowerCase().includes("electronic") || v.requirement.toLowerCase().includes("evisa")).length;
    const required = statsData.length - (visaFree + visaOnArrival + eSim);

    return { filteredData: filtered, stats: { visaFree, visaOnArrival, eSim, required } };
  }, [selectedOrigin, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 🟦 헤더 섹션 (그라데이션 & 통계) */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white pb-20 pt-12 px-4 shadow-lg rounded-b-[3rem]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-4 animate-bounce">🌍</div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Passport Power Rank
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover where you can travel visa-free with your 
            <span className="font-bold text-yellow-300 mx-2">{selectedOrigin}</span> 
            passport.
          </p>

          {/* 🔘 여권 선택 슬라이더 (8개국) */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {ORIGIN_COUNTRIES.map((country) => (
              <button 
                key={country.name}
                onClick={() => setSelectedOrigin(country.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold transition-all duration-300 ${
                  selectedOrigin === country.name 
                  ? "bg-white text-blue-900 shadow-xl transform scale-110 ring-4 ring-blue-300" 
                  : "bg-blue-800 text-blue-200 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <span className="text-xl">{country.flag}</span>
                <span className="hidden sm:inline">{country.name}</span>
                <span className="sm:hidden">{country.code}</span>
              </button>
            ))}
          </div>

          {/* 📊 대시보드 통계 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-green-300">{stats.visaFree}</div>
              <div className="text-sm text-blue-100">Visa Free</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-yellow-300">{stats.visaOnArrival}</div>
              <div className="text-sm text-blue-100">Visa on Arrival</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-cyan-300">{stats.eSim}</div>
              <div className="text-sm text-blue-100">e-Visa</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-red-300">{stats.required}</div>
              <div className="text-sm text-blue-100">Visa Required</div>
            </div>
          </div>
        </div>
      </div>

      {/* 🏳️ 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
        
        {/* 🔍 검색창 (공중에 떠있는 효과) */}
        <div className="max-w-2xl mx-auto mb-12 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <input 
              type="text" 
              placeholder={`Where does ${selectedOrigin} want to go? (e.g., Japan, France)...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative w-full px-6 py-4 text-lg rounded-2xl border-none shadow-2xl focus:ring-4 focus:ring-blue-500/50 outline-none text-gray-800 placeholder-gray-400"
            />
            <span className="absolute right-6 top-4 text-2xl text-gray-400">🔍</span>
          </div>
        </div>

        {/* 📦 결과 카드 그리드 */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((visa, index) => {
              const cleanReq = visa.requirement.replace(/\[.*?\]/g, "").trim();
              
              // 상태별 색상 디자인
              let statusStyle = "bg-gray-100 text-gray-800";
              let icon = "🔒";
              const reqLower = cleanReq.toLowerCase();

              if (reqLower.includes("visa not required") || reqLower.includes("visa free")) {
                statusStyle = "bg-green-100 text-green-700 border-green-200";
                icon = "✨";
              } else if (reqLower.includes("visa on arrival")) {
                statusStyle = "bg-yellow-100 text-yellow-800 border-yellow-200";
                icon = "🛬";
              } else if (reqLower.includes("electronic") || reqLower.includes("evisa")) {
                statusStyle = "bg-cyan-100 text-cyan-800 border-cyan-200";
                icon = "💻";
              } else if (reqLower.includes("banned") || reqLower.includes("admission refused")) {
                statusStyle = "bg-red-100 text-red-800 border-red-200";
                icon = "🚫";
              } else {
                 statusStyle = "bg-orange-50 text-orange-800 border-orange-100";
                 icon = "📝";
              }

              const slug = createSlug(visa.destination, visa.origin);

              return (
                <Link href={`/visa/${slug}`} key={`${visa.origin}-${visa.destination}-${index}`} className="block group">
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {visa.destination}
                        </h2>
                        <span className="text-2xl">{icon}</span>
                      </div>
                      
                      <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${statusStyle} mb-2`}>
                        {cleanReq}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                      <span>View details</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <span className="text-6xl block mb-4">🤔</span>
            <p className="text-xl text-gray-500 font-medium">
              No results for "{searchTerm}"
            </p>
            <p className="text-gray-400 mt-2">Try searching for a different country.</p>
          </div>
        )}
      </div>

      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-100 mt-12 py-10 text-center">
        <p className="text-gray-400 font-medium">
          © 2026 Passport Power.
        </p>
        <p className="text-xs text-gray-300 mt-2">
          Empowering travelers from 🇰🇷 🇺🇸 🇬🇧 🇨🇦 🇦🇺 🇩🇪 🇫🇷 🇯🇵
        </p>
      </footer>
    </div>
  );
}