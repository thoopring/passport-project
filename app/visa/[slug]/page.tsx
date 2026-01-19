import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

// ==========================================
// 💰 [수익화 설정]
// ==========================================
const AFFILIATE_LINKS = {
  airalo: "https://www.airalo.com", 
  agoda: "https://www.agoda.com",   
  ivisa: "https://www.ivisa.com"    
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

// 1. 메타데이터 생성 (SEO)
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const slugParts = slug.split('-to-');
  if (slugParts.length < 2) return { title: 'Visa Information' };

  // URL에서 출발지(Origin)와 도착지(Dest) 알아내기
  const originSlug = slugParts[0]; // 'south-korea' or 'united-states'
  const destSlug = slugParts[1];
  
  const originName = originSlug === 'united-states' ? 'United States' : 'South Korea';
  const targetCountry = destSlug.replace(/-/g, ' '); 

  return {
    title: `${originName} to ${targetCountry}: Visa Requirements (2026)`,
    description: `Do ${originName} citizens need a visa for ${targetCountry}? Check entry rules, eSIM, and hotels.`,
  };
}

// 2. 페이지 내용 빌드
export default async function VisaDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getVisaData();
  
  // URL 분석: 예) united-states-to-japan
  const slugParts = slug.split('-to-');
  if (slugParts.length < 2) return notFound();

  const originSlug = slugParts[0]; 
  const targetDestSlug = slugParts[1]; 

  // ★ 핵심: 출발지(Origin)가 어디인지 결정
  const originName = originSlug === 'united-states' ? 'United States' : 'South Korea';

  // 데이터 찾기 (출발지와 도착지가 모두 맞아야 함)
  const item = data.find((d: any) => {
    const d_dest = cleanText(d.destination).toLowerCase().replace(/ /g, '-');
    const d_origin = d.origin || 'South Korea'; // 없을 경우 한국 기본값
    return d_dest === targetDestSlug && d_origin === originName;
  });

  if (!item) return notFound();

  const destination = cleanText(item.destination);
  const requirement = cleanText(item.requirement);
  const notes = cleanText(item.notes);
  
  // 비자 면제 여부 판단
  const isFree = requirement.toLowerCase().includes('not required') || 
                 requirement.toLowerCase().includes('visa free') ||
                 requirement.toLowerCase().includes('freedom of movement') ||
                 requirement.toLowerCase().includes('esta') || // 미국은 ESTA도 사실상 무비자 취급
                 requirement.toLowerCase().includes('electronic travel authority');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <a href="/" className="mb-8 text-gray-500 hover:text-blue-600 font-medium">← Back to World Map</a>

      <article className="bg-white max-w-2xl w-full shadow-xl rounded-3xl overflow-hidden border border-gray-100">
        
        {/* 헤더: 국기/색상 표시 */}
        <div className={`${isFree ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-800 to-indigo-900'} p-10 text-white text-center`}>
          <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">
             Passport: {originName} 🇺🇸🇰🇷
          </div>
          <h1 className="text-4xl font-extrabold mb-3 drop-shadow-md">
             To ✈️ {destination}
          </h1>
          <p className="text-xl opacity-90 font-light">
            Status: <span className="font-bold border-b-2 border-white/30 pb-1">{requirement}</span>
          </p>
        </div>

        <div className="p-8 space-y-8">
          
          {/* 요약 정보 */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner">
            <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
              📌 Entry Details for {originName} Citizens
            </h3>
            <p className="text-gray-800 leading-relaxed">{notes || "Check with the nearest embassy for details."}</p>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Travel FAQ</h2>
            <div className="space-y-3">
              <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:ring-2 open:ring-blue-100 transition-all" open>
                <summary className="font-semibold cursor-pointer p-4 hover:bg-gray-50 flex justify-between items-center text-gray-800">
                  Do {originName} citizens need a visa?
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-4 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  Currently, for <strong>{originName}</strong> passport holders, the status is: <strong>{requirement}</strong>.
                </div>
              </details>
            </div>
          </div>

          {/* 수익화 섹션 */}
          <div className="pt-6 border-t border-gray-100">
             <h3 className="text-lg font-bold mb-4 text-center text-gray-800">Travel Essentials for {destination}</h3>
             
             <div className="space-y-3">
                <a href={AFFILIATE_LINKS.airalo} target="_blank" rel="nofollow noopener" 
                   className="flex items-center justify-between w-full bg-gray-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition shadow-lg transform hover:-translate-y-1">
                   <div className="flex flex-col text-left">
                     <span className="text-xs text-gray-400 font-normal">Data Roaming</span>
                     <span>📲 Get {destination} eSIM (Instant)</span>
                   </div>
                   <span className="text-2xl">→</span>
                </a>

                {isFree ? (
                   <a href={AFFILIATE_LINKS.agoda} target="_blank" rel="nofollow noopener" 
                      className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition shadow-md">
                      <div className="flex flex-col text-left">
                        <span className="text-xs text-blue-200 font-normal">Accommodation</span>
                        <span>🏨 Top Hotels in {destination}</span>
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
             <p className="mt-6 text-xs text-center text-gray-400">*Affiliate Disclaimer included.</p>
          </div>

        </div>
      </article>
    </div>
  );
}