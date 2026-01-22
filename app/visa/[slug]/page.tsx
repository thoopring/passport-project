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

// 🚨 핵심 수정: 이름이 너무 긴 불량 데이터는 아예 페이지를 안 만듭니다!
export async function generateStaticParams() {
  return visaData
    .filter((visa) => {
      // 1. 목적지 이름이 50글자 이상이면 불량 데이터로 간주 (각주 등)
      if (visa.destination.length > 50) return false;
      // 2. 혹시 모를 빈 데이터 제외
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

  const isVisaFree = visa.requirement.toLowerCase().includes("visa not required") || visa.requirement.toLowerCase().includes("visa free");
  const statusColor = isVisaFree ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block font-medium">
          &larr; Back to Country List
        </Link>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="bg-blue-600 px-6 py-8 sm:px-10">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {visa.origin} ✈️ {visa.destination}
            </h1>
            <p className="mt-2 text-blue-100 text-lg">
              Visa requirements for travelers
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            <div className={`rounded-xl p-6 ${statusColor} border border-opacity-20`}>
              <h2 className="text-lg font-bold uppercase tracking-wide opacity-70 mb-1">Visa Status</h2>
              <p className="text-2xl font-bold">{visa.requirement}</p>
              {visa.allowed_stay && (
                <p className="mt-2 text-lg font-medium">📅 Allowed Stay: {visa.allowed_stay}</p>
              )}
            </div>

            {visa.notes && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-gray-900 font-bold mb-2">📝 Important Notes</h3>
                <p className="text-gray-700 leading-relaxed">{visa.notes}</p>
              </div>
            )}

            {/* 여행 필수 정보 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">🌍 Travel Essentials for {visa.destination}</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Capital City</p>
                  <p className="font-medium text-gray-900 mt-1">{visa.capital || "Check details"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Currency</p>
                  <p className="font-medium text-gray-900 mt-1">{visa.currency || "Local Currency"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Region</p>
                  <p className="font-medium text-gray-900 mt-1">{visa.region || "Global"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Population</p>
                  <p className="font-medium text-gray-900 mt-1">{visa.population || "-"}</p>
                </div>
              </div>
            </div>

            {/* 광고 버튼 */}
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