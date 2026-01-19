import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

// 1. 데이터 가져오기
function getVisaData() {
  const filePath = path.join(process.cwd(), 'visa_data.json');
  if (!fs.existsSync(filePath)) return [];
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

function cleanText(text: string) {
    if (!text || text === 'nan') return "";
    return text.replace(/\[.*?\]/g, '').trim(); 
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://passport-project.vercel.app'; 

  const data = getVisaData();

  // 1. 메인 페이지
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // 2. 200개 국가별 상세 페이지 자동 생성
  const visaRoutes = data.map((item: any) => {
    const destination = cleanText(item.destination);
    const slug = `south-korea-to-${destination.toLowerCase().replace(/ /g, '-')}`;
    
    return {
      url: `${baseUrl}/visa/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  return [...routes, ...visaRoutes];
}