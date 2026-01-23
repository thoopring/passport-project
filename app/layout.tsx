import type { Metadata } from "next";
import "./globals.css";
// 👇 GTM (기존 유지)
import { GoogleTagManager } from '@next/third-parties/google';
// 👇 스크립트 추가를 위한 도구 가져오기
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Passport Power: South Korea",
  description: "Check visa requirements for South Korean citizens to 190+ countries.",
  verification: {
    // 구글 서치 콘솔 (기존 유지)
    google: "R31CCusp43HzLDTuTSiA9NnWNWi4KI2wGd4fKTEnF6I",
  },
  other: {
    // 🏨 2. 아고다 파트너 인증 태그 (여기 추가됨!)
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
      {/* GTM (기존 유지) */}
      <GoogleTagManager gtmId="GTM-TPRWDJ9X" />
      
      <body className="antialiased">
        {children}

        {/* ✈️ 1. 트래블페이아웃(Travelpayouts) 인증 스크립트 (여기 추가됨!) */}
        {/* Next.js 방식대로 최적화해서 넣었습니다. */}
        <Script 
          id="travelpayouts-verification"
          src="https://emrld.cc/NDkxNjEy.js?t=491612"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}