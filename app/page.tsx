import Image from "next/image";
import Link from "next/link";
import visaDataRaw from "../visa_data.json"; // 👈 데이터 파일 경로

interface VisaData {
  origin: string;
  destination: string;
  requirement: string;
  allowed_stay?: string;
  notes?: string;
}

const visaData: VisaData[] = visaDataRaw as VisaData[];

// Slug 생성 함수 (URL 만들 때 사용)
function createSlug(destination: string, origin: string) {
  const p = origin.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const d = destination.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${p}-to-${d}`; 
}

export default function Home() {
  // 🧹 [데이터 청소] 이름이 너무 길거나 이상한 데이터는 화면에 안 보여줌
  const cleanData = visaData.filter((visa) => {
    // 1. 이름이 50글자 이상이면 각주(설명글)로 보고 제외
    if (visa.destination.length > 50) return false;
    // 2. 혹시라도 비어있는 데이터 제외
    if (!visa.destination || !visa.origin) return false;
    // 3. 각주 번호(숫자)로 시작하는 데이터 제외 (예: "1 British...")
    if (/^\d/.test(visa.destination)) return false; 
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 헤더 섹션 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="flex justify-center mb-4">
             {/* 로고 대신 텍스트나 아이콘 사용 */}
             <span className="text-4xl">🌍</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Passport Power
          </h1>
          <p className="text-lg text-gray-500">
            Check visa requirements for <span className="font-bold text-gray-900">South Korea & USA</span> Citizens.
          </p>

          {/* 여권 선택 버튼 (나중에 기능 추가 가능) */}
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-700 transition">
              🇰🇷 South Korea Passport
            </button>
            <button className="bg-white text-gray-700 px-6 py-2 rounded-full font-bold border border-gray-300 shadow-sm hover:bg-gray-50 transition">
              🇺🇸 USA Passport
            </button>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 (국가 리스트) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 검색창 디자인 (기능은 추후 구현) */}
        <div className="max-w-xl mx-auto mb-12">
          <input 
            type="text" 
            placeholder="Search destination (e.g., Japan, France)..." 
            className="w-full px-5 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cleanData.map((visa, index) => {
            // 각주([1], [2] 등) 제거 후 텍스트 정리
            const cleanReq = visa.requirement.replace(/\[.*?\]/g, "").trim();
            const isVisaFree = cleanReq.toLowerCase().includes("visa not required") || cleanReq.toLowerCase().includes("visa free");
            const statusColor = isVisaFree ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
            const slug = createSlug(visa.destination, visa.origin);

            return (
              <Link href={`/visa/${slug}`} key={index} className="block group">
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