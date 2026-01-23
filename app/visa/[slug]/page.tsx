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
  // 👇 새로 추가된 여행 데이터 타입 정의
  plug_type?: string;
  emergency_number?: string;
  greeting?: string;
  best_time_to_visit?: string;
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
    description: `Check visa requirements, power plugs, emergency numbers, and best time to visit ${visa.destination}.`,
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

  // 데이터 청소
  const cleanRequirement = visa.requirement.replace(/\[.*?\]/g, "").trim();
  const isVisaFree = cleanRequirement.toLowerCase().includes("visa not required") || cleanRequirement.toLowerCase().includes("visa free");
  const statusColor = isVisaFree ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  const statusIcon = isVisaFree ? "✅" : "⚠️";
  const cleanNotes = (visa.notes && visa.notes.toLowerCase() !== "nan") ? visa.notes.replace(/\[.*?\]/g, "").trim() : null;
  const cleanPopulation = (visa.population && visa.population !== '0') ? visa.population : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto"> {/* 폭을 좀 더 넓혔습니다 (3xl -> 4xl) */}
        
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
              Essential Travel Guide & Visa Info
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            
            {/* 1. 비자 상태 */}
            <div className={`rounded-2xl p-6 ${statusColor} border border-opacity-20 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm`}>
              <div className="text-4xl">{statusIcon}</div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider opacity-70 mb-1">Visa Requirement</h2>
                <p className="text-3xl font-bold tracking-tight">{cleanRequirement}</p>
                {visa.allowed_stay && (
                  <p className="mt-2 text-lg font-medium inline-block bg-white bg-opacity-60 px-3 py-1 rounded-lg">
                    📅 Allowed Stay: {visa.allowed_stay}
                  </p>
                )}
              </div>
            </div>

            {/* 중요 노트 */}
            {cleanNotes && (
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 flex gap-4">
                <div className="text-2xl">📝</div>
                <div>
                  <h3 className="text-gray-900 font-bold mb-1">Important Notes</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{cleanNotes}</p>
                </div>
              </div>
            )}

            {/* 2. [업그레이드] 여행 필수 정보 (8개 항목 그리드) */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                <span className="text-xl">🌍</span>
                <h3 className="text-lg font-bold text-gray-900">Travel Essentials for {visa.destination}</h3>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
                
                {/* 기존 정보 */}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Capital</p>
                  <p className="font-semibold text-gray-900">{visa.capital || "Check details"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Currency</p>
                  <p className="font-semibold text-gray-900">{visa.currency || "Local Currency"}</p>
                </div>
                
                {/* 👇 신규 추가 정보 (아이콘 강조) */}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">🔌 Plug & Voltage</p>
                  <p className="font-semibold text-gray-900 text-sm">{visa.plug_type || "Check Adapter"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">📞 Emergency</p>
                  <p className="font-semibold text-gray-900 text-sm">{visa.emergency_number || "112 (GSM)"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">☀️ Best Season</p>
                  <p className="font-semibold text-gray-900 text-sm">{visa.best_time_to_visit || "Check Season"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">🗣️ Say Hello</p>
                  <p className="font-semibold text-gray-900 text-sm">{visa.greeting || "Hello"}</p>
                </div>

                {/* 나머지 기존 정보 */}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Region</p>
                  <p className="font-semibold text-gray-900">{visa.region || "Global"}</p>
                </div>
                {cleanPopulation && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Population</p>
                    <p className="font-semibold text-gray-900">{cleanPopulation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* eSIM 광고 */}
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
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}