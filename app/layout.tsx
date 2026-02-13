import type { Metadata } from "next";
import "./globals.css";
// 👇 GTM과 GA4를 위한 도구 가져오기
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
// 👇 스크립트 추가를 위한 도구
import Script from 'next/script';

export const metadata: Metadata = {
  // ✅ 사이트 이름 업데이트 (로고와 통일)
  title: "Check Visa Map | Passport Power",
  description: "Check visa requirements for South Korean citizens to 190+ countries. Explore the world with confidence.",
  
  // ✅ 파비콘 설정 (여기에 추가됨!)
  icons: {
    icon: '/icon.png', // app 폴더 또는 public 폴더에 있는 icon.png를 참조
    shortcut: '/icon.png',
    apple: '/icon.png', // 아이폰 홈 화면 추가용 아이콘
  },

  verification: {
    // 🔍 구글 서치 콘솔 인증
    google: "R31CCusp43HzLDTuTSiA9NnWNWi4KI2wGd4fKTEnF6I",
  },
  other: {
    // 🏨 아고다 파트너 인증
    "agd-partner-manual-verification": "", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 🏷️ 1. 구글 태그 매니저 (GTM) */}
      <GoogleTagManager gtmId="GTM-TPRWDJ9X" />
      
      <body className="antialiased">
        {children}

        {/* ✈️ 2. 트래블페이아웃(Travelpayouts) 인증 스크립트 */}
        <Script 
          id="travelpayouts-verification"
          src="https://emrld.cc/NDkxNjEy.js?t=491612"
          strategy="afterInteractive"
        />

        {/* 📊 3. 구글 애널리틱스 (GA4) */}
        <GoogleAnalytics gaId="G-3LF8H03QZG" />
      </body>
    </html>
  );
}