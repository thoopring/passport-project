import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import visaDataRaw from "../../../visa_data.json"; 

interface VisaData {
  origin: string;
  destination: string;
  requirement: string;
  allowed_stay?: string;
  notes?: string;
  capital?: string;
  currency?: string;
  region?: string;
  population?: string;
  languages?: string;
}

const visaData: VisaData[] = visaDataRaw as VisaData[];

function createSlug(destination: string, origin: string) {
  const p = origin.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const d = destination.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${p}-to-${d}`; 
}

export async function generateStaticParams() {
  return visaData
    .filter((visa) => {
      if (visa.destination.length > 50) return false;
      if (!visa.destination || !visa.origin) return false;
      return true;
    })
    .map((visa) => ({
      slug: createSlug(visa.destination, visa.origin),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  const visa = visaData.find(
    (v) => createSlug(v.destination, v.origin) === resolvedParams.slug
  );

  if (!visa) return { title: "Visa Info Not Found" };

  return {
    title: `${visa.origin} to ${visa.destination}: Visa Requirements`,
    description: `Do ${visa.origin} citizens need a visa for ${visa.destination}? Check the latest requirements, allowed stay, and travel essentials.`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  const visa = visaData.find(
    (v) => createSlug(v.destination, v.origin) === resolvedParams.slug
  );

  if (!visa) {
    notFound();
  }

  // 🧹 [데이터 대청소] 🧹
  
  // 1. 각주 제거 ([1], [2] 등 삭제)
  const cleanRequirement = visa.requirement.replace(/\[.*?\]/g, "").trim();

  // 2. 비자 상태에 따른 색상 설정 (청소된 텍스트 기준)
  const isVisaFree = cleanRequirement.toLowerCase().includes("visa not required") || cleanRequirement.toLowerCase().includes("visa free");
  const statusColor = isVisaFree ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  const statusIcon = isVisaFree ? "✅" : "⚠️";

  // 3. 'nan' 노트 제거
  const cleanNotes = (visa.notes && visa.notes.toLowerCase() !== "nan") ? visa.notes.replace(/\[.*?\]/g, "").trim() : null;
  
  // 4. 인구 0명 제거
  const cleanPopulation = (visa.population && visa.population !== '0') ? visa.population : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        <Link href="/" className="text-gray-500 hover:text-blue-600 mb-6 inline-flex items-center font-medium transition-colors">
          <span className="mr-2">←</span> Back to Country List
        </Link>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-10 sm:px-10 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 shadow-sm">
              {visa.origin} ✈️ {visa.destination}
            </h1>
            <p className="text-blue-100 text-lg font-medium opacity-90">
              Updated Visa Requirements for Travelers
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            
            {/* 비자 상태 (이제 [2] 같은 숫자 안 나옴!) */}
            <div className={`rounded-2xl p-6 ${statusColor} border border-opacity-20 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm`}>
              <div className="text-4xl">{statusIcon}</div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider opacity-70 mb-1">Current Status</h2>
                {/* 👇 깨끗해진 텍스트 표시 */}
                <p className="text-3xl font-bold tracking-tight">{cleanRequirement}</p>
                {visa.allowed_stay && (
                  <p className="mt-2 text-lg font-medium inline-block bg-white bg-opacity-60 px-3 py-1 rounded-lg">
                    📅 Allowed Stay: {visa.allowed_stay}
                  </p>
                )}
              </div>
            </div>

            {/* 노트 */}
            {cleanNotes && (
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 flex gap-4">
                <div className="text-2xl">📝</div>
                <div>
                  <h3 className="text-gray-900 font-bold mb-1">Important Notes</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{cleanNotes}</p>
                </div>
              </div>
            )}

            {/* 여행 정보 */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                <span className="text-xl">🌍</span>
                <h3 className="text-lg font-bold text-gray-900">Travel Essentials for {visa.destination}</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-y-8 gap-x-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Capital City</p>
                  <p className="font-semibold text-gray-900 text-lg">{visa.capital || "Check details"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Currency</p>
                  <p className="font-semibold text-gray-900 text-lg">{visa.currency || "Local Currency"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Region</p>
                  <p className="font-semibold text-gray-900 text-lg">{visa.region || "Global"}</p>
                </div>
                {cleanPopulation && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Population</p>
                    <p className="font-semibold text-gray-900 text-lg">{cleanPopulation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* eSIM 광고 (가짜 쿠폰 코드는 삭제함) */}
            <div className="mt-8 pt-6">
              <div className="bg-gray-900 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-black opacity-100 z-0"></div>
                
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-2xl mb-3">
                    Need Internet in {visa.destination}?
                  </h3>
                  <p className="text-gray-300 mb-8 text-lg">
                    Avoid roaming charges. Get an eSIM instantly.
                  </p>
                  
                  <a 
                    href="https://airalo.pxf.io/2anR7A" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block w-full sm:w-auto bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-500 hover:shadow-lg transition-all transform hover:-translate-y-1"
                  >
                    Get eSIM for {visa.destination} 📲
                  </a>
                  
                  {/* 👇 나중에 진짜 코드 받으면 주석 풀고 수정하세요! */}
                  {/* <p className="text-sm text-gray-400 mt-6 bg-gray-800 inline-block px-4 py-1 rounded-full border border-gray-700">
                    Use code <span className="text-yellow-400 font-bold">PASSPORT10</span> for 10% OFF
                  </p> 
                  */}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}