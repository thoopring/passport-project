import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 여기가 사이트의 '주민등록증' 정보입니다.
export const metadata: Metadata = {
  title: "Passport Power: South Korea",
  description: "Check visa requirements for South Korean citizens to 190+ countries.",
  
  verification: {
    // 1. 구글 인증 (기존 유지)
    google: "R31CCusp43HzLDTuTSiA9NnWNWi4KI2wGd4fKTEnF6I",
  },
  
  // 2. 아고다 인증 (수동 인증 태그 추가)
  // verification 속성 대신 'other'를 사용해서 강제로 집어넣습니다.
  other: {
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}