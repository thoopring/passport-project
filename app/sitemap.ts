import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

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
  // ★ 파트너님의 진짜 주소
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

  // 2. 400개 국가별 페이지 자동 생성 (한국 + 미국)
  const visaRoutes = data.map((item: any) => {
    const destination = cleanText(item.destination);
    const destSlug = destination.toLowerCase().replace(/ /g, '-');
    
    // 출발지(Origin)에 따라 URL 앞부분을 다르게 만듭니다.
    const originSlug = (item.origin === 'United States') ? 'united-states' : 'south-korea';
    
    return {
      url: `${baseUrl}/visa/${originSlug}-to-${destSlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  return [...routes, ...visaRoutes];
}