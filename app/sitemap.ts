import { MetadataRoute } from 'next';
import visaDataRaw from '../visa_data.json';
import { BLOG_POSTS } from './blog/data'; // 👈 블로그 데이터 가져오기

interface VisaData {
  origin: string;
  destination: string;
}

const visaData: VisaData[] = visaDataRaw as VisaData[];

function createSlug(destination: string, origin: string) {
  const p = origin.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const d = destination.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${p}-to-${d}`; 
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ⚠️ 본인의 배포 도메인으로 꼭 확인하세요!
  const baseUrl = 'https://checkvisamap.com/'; 

  // 1. 고정 페이지
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/plan/new`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/samples`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/samples/tokyo-4d-couple`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/samples/paris-3d-family`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/samples/bangkok-4d-solo`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/samples/seoul-3d-foodie`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  // 2. 블로그 상세 페이지들 (새로 추가된 부분!) 👇
  const blogRoutes = Object.keys(BLOG_POSTS).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(), // 혹은 BLOG_POSTS[slug].date 사용 가능
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. 비자 데이터 페이지들
  const visaRoutes = visaData
    .filter((visa) => {
      if (visa.destination.length > 50) return false;
      if (!visa.destination || !visa.origin) return false;
      if (/^\d/.test(visa.destination)) return false;
      return true;
    })
    .map((visa) => {
      const slug = createSlug(visa.destination, visa.origin);
      return {
        url: `${baseUrl}/visa/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5, // 블로그보다 우선순위 살짝 낮춤
      };
    });

  return [...staticRoutes, ...blogRoutes, ...visaRoutes];
}