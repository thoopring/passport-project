import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
// 👇 데이터 파일 가져오기
import visaDataRaw from "../../../visa_data.json"; 

// 1. 데이터 타입 정의 (수정됨: passport -> origin)
interface VisaData {
  origin: string;      // 👈 여기가 핵심! (데이터에 맞춰 이름 변경)
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

// JSON 데이터를 TypeScript 타입으로 변환
const visaData: VisaData[] = visaDataRaw as VisaData[];

// 2. Slug 만드는 함수 (수정됨: origin 사용)
function createSlug(destination: string, origin: string) {
  const p = origin.toLowerCase().replace(/\s+/g, "-");
  const d = destination.toLowerCase().replace(/\s+/g, "-");
  return `${p}-to-${d}`; 
}

// 3. 미리 페이지 경로 생성
export async function generateStaticParams() {
  return visaData.map((visa) => ({
    slug: createSlug(visa.destination, visa.origin), // 👈 passport -> origin
  }));
}

// 4. 메타데이터 생성
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  const visa = visaData.find(
    (v) => createSlug(v.destination, v.origin) === resolvedParams.slug
  );

  if (!visa) return { title: "Visa Info Not Found" };

  return {
    title: `${visa.origin} to ${visa.destination}: Visa Requirements`,
    description: `Do ${visa.origin} citizens need a visa for ${visa.destination}? Check the latest requirements, allowed stay, and travel essentials like currency and capital.`,
  };
}

// 5. 실제 페이지 화면 그리기
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  const visa = visaData.find(
    (v) => createSlug(v.destination, v.origin) === resolvedParams.slug
  );

  if (!visa) {
    notFound();
  }

  // 비자 상태에 따른 색상 설정
  const isVisaFree = visa.requirement.toLowerCase().includes("visa not required") || visa.requirement.toLowerCase().includes("visa free");
  const statusColor = isVisaFree ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* 🔙 뒤로가기 버튼 */}
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block font-medium">
          &larr; Back to Country List
        </Link>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          
          {/* 헤더 섹션 */}
          <div className="bg-blue-600 px-6 py-8 sm:px-10">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {visa.origin} ✈️ {visa.destination}
            </h1>
            <p className="mt-2 text-blue-100 text-lg">
              Visa requirements for travelers
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            
            {/* 1. 비자 상태 카드 */}
            <div className={`rounded-xl p-6 ${statusColor} border border-opacity-20`}>
              <h2 className="text-lg font-bold uppercase tracking-wide opacity-70 mb-1">Visa Status</h2>
              <p className="text-2xl font-bold">{visa.requirement}</p>
              {visa.allowed_stay && (
                <p className="mt-2 text-lg font-medium">📅 Allowed Stay: {visa.allowed_stay}</p>
              )}
            </div>

            {/* 2. 추가 정보 (Notes) */}
            {visa.notes && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-gray-900 font-bold mb-2">📝 Important Notes</h3>
                <p className="text-gray-700 leading-relaxed">{visa.notes}</p>
              </div>
            )}

            {/* 3. 여행 필수 정보 섹션 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">🌍 Travel Essentials for {visa.destination}</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4">
                {/* 수도 */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Capital City</p>
                  <p className="font-medium text-gray-900 mt-1">{visa.capital || "Check details"}</p>
                </div>
                {/* 화폐 */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Currency</p>
                  <p className="font-medium text-gray-900 mt-1">{visa.currency || "Local Currency"}</p>
                </div>
                {/* 지역 */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Region</p>
                  <p className="font-medium text-gray-900 mt-1">{visa.region || "Global"}</p>
                </div>
                {/* 인구 */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Population</p>
                  <p className="font-medium text-gray-900 mt-1">{visa.population || "-"}</p>
                </div>
              </div>
            </div>

            {/* 4. eSIM 광고 버튼 */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-center shadow-lg transform transition hover:scale-[1.02] duration-200">
                <h3 className="text-white font-bold text-xl mb-2">Don't lose connection in {visa.destination}!</h3>
                <p className="text-gray-300 mb-6">Get high-speed data at local rates with an eSIM.</p>
                <a 
                  href="https://airalo.pxf.io/2anR7A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors"
                >
                  Get {visa.destination} eSIM 📲
                </a>
                <p className="text-xs text-gray-500 mt-4">* Use code <strong>PASSPORT10</strong> for discount</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}