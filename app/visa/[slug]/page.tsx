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
  plug_type?: string;
  emergency_number?: string;
  greeting?: string;
  best_time_to_visit?: string;
}

const visaData: VisaData[] = visaDataRaw as VisaData[];

// 🔥 인기 여행지 리스트
const POPULAR_DESTINATIONS = {
  "South Korea": ["Japan", "Vietnam", "Thailand", "Philippines", "Taiwan", "Guam"],
  "United States": ["Mexico", "Canada", "United Kingdom", "Italy", "France", "Japan"]
};

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

  // 거미줄 로직
  const nearbyVisas = visaData
    .filter((v) => v.origin === visa.origin && v.region === visa.region && v.destination !== visa.destination && v.destination.length < 50)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const targetPopularList = POPULAR_DESTINATIONS[visa.origin as keyof typeof POPULAR_DESTINATIONS] || [];
  const popularVisas = visaData
    .filter((v) => v.origin === visa.origin && targetPopularList.includes(v.destination) && v.destination !== visa.destination)
    .slice(0, 4);

  // 🏨 [수익화 1] 호텔 검색 링크 (Hotellook)
  // 파트너님의 ID (Marker)
  const affiliateID = "491612"; 
  const hotelLink = `https://search.hotellook.com/hotels?marker=${affiliateID}&language=en&location=${visa.destination}`;

  // 🎡 [수익화 2] 투어 검색 링크 (Viator) - 승인 전에는 검색 결과로 이동
  const tourLink = `https://www.viator.com/searchResults/all?text=${visa.destination}`;

  // 🛡️ [수익화 3] 보험 링크 (Insubuy) - 승인 전에는 메인으로 이동
  const insuranceLink = "https://www.insubuy.com/";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/" className="text-gray-500 hover:text-blue-600 mb-6 inline-flex items-center font-medium transition-colors">
          <span className="mr-2">←</span> Back to Country List
        </Link>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-10 sm:px-10 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 shadow-sm">
              {visa.origin} ✈️ {visa.destination}
            </h1>
            <p className="text-blue-100 text-lg font-medium opacity-90">
              Essential Travel Guide & Visa Info
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            
            {/* 비자 상태 */}
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

            {/* 여행 필수 정보 */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                <span className="text-xl">🌍</span>
                <h3 className="text-lg font-bold text-gray-900">Travel Essentials for {visa.destination}</h3>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Capital</p>
                  <p className="font-semibold text-gray-900">{visa.capital || "Check details"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Currency</p>
                  <p className="font-semibold text-gray-900">{visa.currency || "Local Currency"}</p>
                </div>
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

            {/* 👇 [수익화 핵심] 여행 준비 4단 콤보 (eSIM + Hotel + Tours + Insurance) */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-2">🎒</span> Trip Planner for {visa.destination}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Airalo (eSIM) - 데이터 */}
                <div className="bg-gray-900 rounded-xl p-5 text-center shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-200 flex flex-col justify-between">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-black opacity-100 z-0"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">📶</span>
                      <h3 className="text-white font-bold text-lg">Internet</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Don't pay roaming fees.</p>
                    <a 
                      href="https://airalo.pxf.io/2anR7A" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                      Get eSIM 📲
                    </a>
                  </div>
                </div>

                {/* 2. Hotel (Booking.com via Hotellook) - 숙소 */}
                <div className="bg-blue-50 rounded-xl p-5 text-center shadow-md border border-blue-100 hover:scale-[1.02] transition-transform duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">🏨</span>
                      <h3 className="text-gray-900 font-bold text-lg">Hotel</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">Best places to stay.</p>
                  </div>
                  <a 
                    href={hotelLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Find Hotels 🛏️
                  </a>
                </div>

                {/* 3. Viator (Tours) - 투어 & 액티비티 */}
                <div className="bg-green-50 rounded-xl p-5 text-center shadow-md border border-green-100 hover:scale-[1.02] transition-transform duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">🎡</span>
                      <h3 className="text-gray-900 font-bold text-lg">Tours</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">Top rated activities.</p>
                  </div>
                  <a 
                    href={tourLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500 transition-colors"
                  >
                    Find Activities 🎫
                  </a>
                </div>

                 {/* 4. Insurance (Insubuy) - 여행자 보험 */}
                 <div className="bg-orange-50 rounded-xl p-5 text-center shadow-md border border-orange-100 hover:scale-[1.02] transition-transform duration-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">🛡️</span>
                      <h3 className="text-gray-900 font-bold text-lg">Insurance</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">Safe travel requirement.</p>
                  </div>
                  <a 
                    href={insuranceLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-400 transition-colors"
                  >
                    Get Insured 🏥
                  </a>
                </div>

              </div>
            </div>

            {/* 거미줄 추천 (Nearby) */}
            {nearbyVisas.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">📍 Nearby Destinations in {visa.region}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {nearbyVisas.map((v) => (
                    <Link 
                      key={v.destination} 
                      href={`/visa/${createSlug(v.destination, v.origin)}`}
                      className="block group bg-gray-50 rounded-xl p-4 hover:bg-blue-50 hover:shadow-md transition-all border border-gray-100"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-gray-800 group-hover:text-blue-700">{v.destination}</span>
                        <span className="text-xl">✈️</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 font-medium bg-white inline-block px-2 py-1 rounded border border-gray-200">
                        {v.requirement.replace(/\[.*?\]/g, "").slice(0, 15)}...
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 인기 국가 추천 */}
            {popularVisas.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">🔥 Popular with {visa.origin} Travelers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {popularVisas.map((v) => (
                    <Link 
                      key={v.destination} 
                      href={`/visa/${createSlug(v.destination, v.origin)}`}
                      className="block group bg-white rounded-xl p-4 hover:shadow-md transition-all border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-gray-800 group-hover:text-blue-700">{v.destination}</span>
                        <span className="text-xl">🌟</span>
                      </div>
                      <div className="mt-2 text-xs text-blue-600 font-bold">
                        View Requirements →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}