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
  // 1. 사이트 제목과 설명을 우리 프로젝트에 맞게 수정했습니다.
  title: "Passport Power: South Korea",
  description: "Check visa requirements for South Korean citizens to 190+ countries.",
  
  // 2. 구글 소유권 확인 코드 (파트너님이 주신 코드)
  verification: {
    google: "R31CCusp43HzLDTuTSiA9NnWNWi4KI2wGd4fKTEnF6I",
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