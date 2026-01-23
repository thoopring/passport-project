import { MetadataRoute } from 'next';
import visaDataRaw from '../visa_data.json'; 

interface VisaData {
  origin: string;
  destination: string;
}

const visaData: VisaData[] = visaDataRaw as VisaData[];

// 🛠️ page.tsx와 100% 동일한 슬러그 생성 함수 (중요!)
function createSlug(destination: string, origin: string) {
  const p = origin.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const d = destination.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${p}-to-${d}`; 
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ⚠️ 실제 배포된 도메인 주소 (마지막에 슬래시 / 없어야 함)
  const baseUrl = 'https://passport-project.vercel.app';

  // 1. 고정 페이지 (메인, 블로그)
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`, // 👈 블로그 메인도 검색엔진에 알려줍니다.
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // 2. 비자 상세 페이지 자동 생성 (동적)
  const visaRoutes = visaData
    .filter((visa) => {
      // 🚨 page.tsx의 필터링 로직과 동일해야 404 에러가 안 납니다.
      if (visa.destination.length > 50) return false;      // 너무 긴 이름 제외
      if (!visa.destination || !visa.origin) return false; // 데이터 없는 경우 제외
      if (/^\d/.test(visa.destination)) return false;      // 숫자로 시작하는 오타 데이터 제외
      return true;
    })
    .map((visa) => {
      const slug = createSlug(visa.destination, visa.origin);

      return {
        url: `${baseUrl}/visa/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    });

  return [...staticRoutes, ...visaRoutes];
}