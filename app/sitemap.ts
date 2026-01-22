import { MetadataRoute } from 'next';
// 👇 데이터 파일 경로 (app 폴더 상위에 있는 경우)
import visaDataRaw from '../visa_data.json'; 

interface VisaData {
  origin: string;
  destination: string;
}

const visaData: VisaData[] = visaDataRaw as VisaData[];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://passport-project.vercel.app';

  // 1. 메인 페이지
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // 2. 비자 상세 페이지 자동 생성
  // 🚨 page.tsx와 로직을 100% 일치시켜야 404 에러가 안 납니다!
  const visaRoutes = visaData
    .filter((visa) => {
      // 이름이 너무 긴 불량 데이터 제외 (page.tsx와 동일하게)
      if (visa.destination.length > 50) return false;
      if (!visa.destination || !visa.origin) return false;
      return true;
    })
    .map((visa) => {
      // 슬러그 생성 로직 (특수문자 제거 등 page.tsx와 동일하게)
      const p = visa.origin.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const d = visa.destination.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const slug = `${p}-to-${d}`;

      return {
        url: `${baseUrl}/visa/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    });

  return [...routes, ...visaRoutes];
}