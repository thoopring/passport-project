import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

// ==========================================
// 💰 [수익화 설정] 여기가 파트너님의 지갑입니다.
// 나중에 승인 메일 오면 여기 주소만 바꾸면 됩니다.
// ==========================================
const AFFILIATE_LINKS = {
  airalo: "https://www.airalo.com", // 나중에 ?ref=파트너ID 붙이기
  agoda: "https://www.agoda.com",   // 나중에 파트너 링크로 교체
  ivisa: "https://www.ivisa.com"    // 나중에 파트너 링크로 교체
};

async function getVisaData() {
  const filePath = path.join(process.cwd(), 'visa_data.json');
  if (!fs.existsSync(filePath)) return [];
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

function cleanText(text: string) {
  if (!text || text === 'nan') return "No additional details available.";
  return text.replace(/\[.*?\]/g, '').trim();
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = await getVisaData();
  const targetCountry = slug.split('-to-')[1]?.replace(/-/g, ' '); 
  
  if (!targetCountry) return { title: 'Visa Information' };

  const item = data.find((d: any) => 
    d.destination.toLowerCase().replace(/\[.*?\]/g, '').trim() === targetCountry
  );
  const destName = item ? cleanText(item.destination) : targetCountry;

  return {
    title: `South Korea to ${destName}: Visa & Entry Rules (2026)`,
    description: `Do South Koreans need a visa for ${destName}? Check latest entry requirements, eSIM prices, and hotel deals.`,
  };
}

export default async function VisaDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getVisaData();
  
  const slugParts = slug.split('-to-');
  if (slugParts.length < 2) return notFound();

  const targetDestSlug = slugParts[1]; 

  const item = data.find((d: any) => {
    const destSlug = cleanText(d.destination).toLowerCase().replace(/ /g, '-');
    return destSlug === targetDestSlug;
  });

  if (!item) return notFound();

  const destination = cleanText(item.destination);
  const requirement = cleanText(item.requirement);
  const notes = cleanText(item.notes);
  
  const isFree = requirement.toLowerCase().includes('not required') || 
                 requirement.toLowerCase().includes('visa free') ||
                 requirement.toLowerCase().includes('freedom of movement');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <a href="/" className="mb-8 text-gray-500 hover:text-blue-600 font-medium">← Back to World Map</a>

      <article className="bg-white max-w-2xl w-full shadow-xl rounded-3xl overflow-hidden border border-gray-100">
        
        {/* 헤더: 비자 상태에 따라 색상 변경 */}
        <div className={`${isFree ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-800 to-indigo-900'} p-10 text-white text-center`}>
          <h1 className="text-4xl font-extrabold mb-3 drop-shadow-md">
            South Korea ✈️ {destination}
          </h1>
          <p className="text-xl opacity-90 font-light">
            Visa Status: <span className="font-bold border-b-2 border-white/30 pb-1">{requirement}</span>
          </p>
        </div>

        <div className="p-8 space-y-8">
          
          {/* 1. 요약 정보 */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner">
            <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
              📌 Entry Details
            </h3>
            <p className="text-gray-800 leading-relaxed">{notes}</p>
          </div>

          {/* 2. FAQ (SEO용) */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Travel FAQ</h2>
            <div className="space-y-3">
              <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:ring-2 open:ring-blue-100 transition-all" open>
                <summary className="font-semibold cursor-pointer p-4 hover:bg-gray-50 flex justify-between items-center text-gray-800">
                  Do South Korean citizens need a visa?
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-4 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  Currently, the status is <strong>{requirement}</strong>.
                  {isFree ? " You can enter without a visa! Enjoy your trip." : " You must apply for a visa before traveling."}
                </div>
              </details>
            </div>
          </div>

          {/* 3. 수익화 섹션 (Affiliate Buttons) */}
          <div className="pt-6 border-t border-gray-100">
             <h3 className="text-lg font-bold mb-4 text-center text-gray-800">Essential Travel Checklist</h3>
             
             <div className="space-y-3">
                {/* A. eSIM (가장 중요 - 검은색 프리미엄 버튼) */}
                <a href={AFFILIATE_LINKS.airalo} target="_blank" rel="nofollow noopener" 
                   className="flex items-center justify-between w-full bg-gray-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition shadow-lg transform hover:-translate-y-1">
                   <div className="flex flex-col text-left">
                     <span className="text-xs text-gray-400 font-normal">Data Roaming</span>
                     <span>📲 Get {destination} eSIM (5% OFF)</span>
                   </div>
                   <span className="text-2xl">→</span>
                </a>

                {/* B. 호텔 or 비자 (상황별 버튼) */}
                {isFree ? (
                   <a href={AFFILIATE_LINKS.agoda} target="_blank" rel="nofollow noopener" 
                      className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition shadow-md">
                      <div className="flex flex-col text-left">
                        <span className="text-xs text-blue-200 font-normal">Accommodation</span>
                        <span>🏨 Check Hotel Prices</span>
                      </div>
                   </a>
                ) : (
                   <a href={AFFILIATE_LINKS.ivisa} target="_blank" rel="nofollow noopener" 
                      className="flex items-center justify-between w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition shadow-md">
                      <div className="flex flex-col text-left">
                        <span className="text-xs text-orange-100 font-normal">Paperwork</span>
                        <span>🛂 Apply for Visa Online</span>
                      </div>
                   </a>
                )}
             </div>

             {/* 법적 고지 (필수) */}
             <p className="mt-6 text-xs text-center text-gray-400">
               *This page contains affiliate links. We may earn a commission at no extra cost to you.
             </p>
          </div>

        </div>
      </article>
    </div>
  );
}