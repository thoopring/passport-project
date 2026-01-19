import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  // 🚨 여기도 진짜 주소로 바꿔주세요
  const baseUrl = 'https://passport-project.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}