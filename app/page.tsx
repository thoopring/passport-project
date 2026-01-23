"use client"; // 👈 이게 있어야 클릭/검색이 작동합니다!

import { useState, useMemo } from "react";
import Link from "next/link";
import visaDataRaw from "../visa_data.json"; 

interface VisaData {
  origin: string;
  destination: string;
  requirement: string;
  allowed_stay?: string;
  notes?: string;
}

const visaData: VisaData[] = visaDataRaw as VisaData[];

// Slug 생성 함수 (URL 이동용)
function createSlug(destination: string, origin: string) {
  const p = origin.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const d = destination.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${p}-to-${d}`; 
}

export default function Home() {
  // 1. 상태 관리 (현재 선택된 여권 / 검색어)
  const [selectedOrigin, setSelectedOrigin] = useState("South Korea");
  const [searchTerm, setSearchTerm] = useState("");

  // 2. 데이터 필터링 로직 (여권 선택 & 검색어 & 불량 데이터 제거)
  const filteredData = useMemo(() => {
    return visaData.filter((visa) => {
      // (1) 쓰레기 데이터 제거
      if (visa.destination.length > 50) return false;
      if (!visa.destination || !visa.origin) return false;
      if (/^\d/.test(visa.destination)) return false; 

      // (2) 선택된 여권과 일치하는지 확인 (대소문자 무시 비교)
      const originMatch = visa.origin.toLowerCase() === selectedOrigin.toLowerCase();

      // (3) 검색어와 일치하는지 확인
      const searchMatch = visa.destination.toLowerCase().includes(searchTerm.toLowerCase());

      return originMatch && searchMatch;
    });
  }, [selectedOrigin, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="flex justify-center mb-4">
             <span className="text-4xl">🌍</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Passport Power
          </h1>
          <p className="text-lg text-gray-500">
            Check visa requirements for <span className="font-bold text-gray-900">{selectedOrigin}</span> Citizens.
          </p>

          {/* 🔘 여권 선택 버튼 (기능 활성화!) */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button 
              onClick={() => setSelectedOrigin("South Korea")}
              className={`px-6 py-2 rounded-full font-bold shadow-md transition-all ${
                selectedOrigin === "South Korea" 
                ? "bg-blue-600 text-white transform scale-105" 
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              🇰🇷 South Korea Passport
            </button>
            <button 
              onClick={() => setSelectedOrigin("United States")}
              className={`px-6 py-2 rounded-full font-bold shadow-md transition-all ${
                selectedOrigin === "United States" 
                ? "bg-blue-600 text-white transform scale-105" 
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              🇺🇸 USA Passport
            </button>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 🔍 검색창 (기능 활성화!) */}
        <div className="max-w-xl mx-auto mb-12">
          <input 
            type="text" 
            placeholder={`Search destination for ${selectedOrigin} citizens...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 입력할 때마다 검색 실행
            className="w-full px-5 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* 결과 카드 그리드 */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((visa, index) => {
              const cleanReq = visa.requirement.replace(/\[.*?\]/g, "").trim();
              const isVisaFree = cleanReq.toLowerCase().includes("visa not required") || cleanReq.toLowerCase().includes("visa free");
              const statusColor = isVisaFree ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
              const slug = createSlug(visa.destination, visa.origin);

              return (
                <Link href={`/visa/${slug}`} key={`${visa.origin}-${visa.destination}-${index}`} className="block group">
                  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {visa.destination}
                        </h2>
                        <span className="text-2xl text-gray-400 group-hover:scale-110 transition-transform">✈️</span>
                      </div>
                      
                      <div className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${statusColor} mb-2`}>
                        {cleanReq}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mt-4 flex items-center">
                      Click for details <span className="ml-1 text-xs">→</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No destinations found matching "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8 text-center">
        <p className="text-gray-400 text-sm">
          © 2026 Passport Power. Real-time Visa Data.
        </p>
      </footer>
    </div>
  );
}