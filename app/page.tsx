import fs from 'fs';
import path from 'path';
import Link from 'next/link'; // Link 컴포넌트 추가

// ... (상단 getVisaData 함수는 동일) ...
async function getVisaData() {
  const filePath = path.join(process.cwd(), 'visa_data.json');
  if (!fs.existsSync(filePath)) return [];
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

function cleanText(text: string) {
    if (!text || text === 'nan') return "";
    return text.replace(/\[.*?\]/g, '').trim(); 
}

export default async function Home() {
  const data = await getVisaData();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            🌏 Passport Power: <span className="text-blue-600">South Korea</span>
          </h1>
          <p className="text-xl text-gray-600">
            Check visa requirements for {data.length} destinations instantly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item: any, index: number) => {
            const requirement = cleanText(item.requirement);
            const destination = cleanText(item.destination);
            const notes = cleanText(item.notes);

            // 주소 생성 (Slug): south-korea-to-vietnam
            const slug = `south-korea-to-${destination.toLowerCase().replace(/ /g, '-')}`;
            
            // 상태별 색상 로직 수정
            const isFree = requirement.toLowerCase().includes('not required') || 
                           requirement.toLowerCase().includes('visa free');
            
            // 색상 결정
            let statusColor = "bg-orange-100 text-orange-800"; // 기본: 비자 필요
            if (isFree) statusColor = "bg-green-100 text-green-800";
            if (requirement.includes("banned") || requirement.includes("Refused")) statusColor = "bg-red-100 text-red-800";

            return (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-bold text-gray-800 truncate">
                      {destination}
                    </h2>
                    <span className="text-2xl">
                        {/* 국기는 나중에 추가 */}
                        ✈️ 
                    </span>
                  </div>
                  
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${statusColor}`}>
                    {requirement}
                  </span>
                  
                  <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
                    {notes || "Click for details..."}
                  </p>
                </div>
                
                {/* 여기가 핵심: 상세 페이지로 이동하는 버튼 */}
                <Link 
                  href={`/visa/${slug}`}
                  className="mt-4 w-full block text-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition"
                >
                  View Details &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}