import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

// 1. 데이터 가져오기 (공통 함수)
async function getVisaData() {
  const filePath = path.join(process.cwd(), 'visa_data.json');
  if (!fs.existsSync(filePath)) return [];
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

// 2. 텍스트 청소기
function cleanText(text: string) {
  if (!text || text === 'nan') return "No additional details available.";
  return text.replace(/\[.*?\]/g, '').trim();
}

// 타입 정의 (Next.js 15 대응: Promise로 변경)
type Props = {
  params: Promise<{ slug: string }>;
};

// 3. 메타데이터 생성 (SEO 핵심)
export async function generateMetadata({ params }: Props) {
  // ★ 중요: 여기서 params를 먼저 기다려야 함
  const { slug } = await params;
  
  const data = await getVisaData();
  const targetCountry = slug.split('-to-')[1]?.replace(/-/g, ' '); 
  
  if (!targetCountry) return { title: 'Visa Information' };

  const item = data.find((d: any) => 
    d.destination.toLowerCase().replace(/\[.*?\]/g, '').trim() === targetCountry
  );

  const destName = item ? cleanText(item.destination) : targetCountry;

  return {
    title: `Do South Koreans need a visa for ${destName}? (2026 Update)`,
    description: `Check the latest visa requirements for South Korean citizens traveling to ${destName}. Real-time entry rules and costs.`,
  };
}

// 4. 페이지 빌드 (공장 가동)
export default async function VisaDetailPage({ params }: Props) {
  // ★ 중요: 여기서도 params를 먼저 기다림 (Next.js 15 필수 변경 사항)
  const { slug } = await params;

  const data = await getVisaData();
  
  // URL 파싱
  const slugParts = slug.split('-to-');
  if (slugParts.length < 2) return notFound();

  const targetDestSlug = slugParts[1]; // vietnam

  // 데이터 매칭
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
      <a href="/" className="mb-8 text-gray-500 hover:text-blue-600">← Back to World Map</a>

      <article className="bg-white max-w-2xl w-full shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <div className={`${isFree ? 'bg-green-600' : 'bg-blue-900'} p-8 text-white text-center`}>
          <h1 className="text-3xl font-bold mb-2">
            South Korea ✈️ {destination}
          </h1>
          <p className="text-lg opacity-90">
            Visa Status: <strong>{requirement}</strong>
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-2">📌 Entry Details</h3>
            <p className="text-gray-800">{notes}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="group open:bg-blue-50 p-2 rounded" open>
                <summary className="font-semibold cursor-pointer text-blue-800">
                  Do South Korean citizens need a visa?
                </summary>
                <p className="mt-2 text-gray-600 p-2">
                  Currently, the status is <strong>{requirement}</strong>. 
                  {isFree ? " You can enter without a visa!" : " You must apply for a visa before traveling."}
                </p>
              </details>
              <details className="group p-2 rounded">
                <summary className="font-semibold cursor-pointer text-blue-800">
                  Is it safe to travel to {destination}?
                </summary>
                <p className="mt-2 text-gray-600 p-2">
                  Always check the latest travel advisories before booking your flight to {destination}.
                </p>
              </details>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
             {isFree ? (
               <div className="text-center">
                 <p className="mb-2 text-sm text-gray-500">Don't pay strictly roaming charges!</p>
                 <a href="https://airalo.com" target="_blank" className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition shadow-md">
                   📲 Get {destination} eSIM (5% OFF)
                 </a>
               </div>
             ) : (
               <div className="text-center">
                 <p className="mb-2 text-sm text-gray-500">Need help with paperwork?</p>
                 <a href="https://ivisa.com" target="_blank" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-md">
                   🛂 Apply for {destination} Visa
                 </a>
               </div>
             )}
             
             <a href="https://agoda.com" target="_blank" className="block mt-3 text-center text-blue-500 hover:underline text-sm">
               🏨 Check Hotel Prices in {destination}
             </a>
          </div>

        </div>
      </article>
    </div>
  );
}