import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Passport Power',
    short_name: 'Passport',
    description: 'Check visa requirements for 8 major passports including South Korea, US, UK, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af', // 우리 사이트의 파란색 (blue-800)
    icons: [
      {
        src: '/icon-192.png', // 👇 나중에 이 이름으로 이미지 넣어주세요 (192x192)
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png', // 👇 나중에 이 이름으로 이미지 넣어주세요 (512x512)
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}