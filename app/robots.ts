import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // 파트너님의 실제 도메인
  const baseUrl = 'https://checkvisamap.com';
 
  return {
    rules: {
      userAgent: '*', // 모든 로봇 환영
      allow: '/',     // 모든 페이지 접근 허용
    },
    sitemap: `${baseUrl}/sitemap.xml`, // 지도 위치 알려줌
  }
}