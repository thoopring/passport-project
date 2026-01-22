import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// 👇 1. GoogleTagManager 불러오기
import { GoogleTagManager } from '@next/third-parties/google'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Passport Power: South Korea",
  description: "Check visa requirements for South Korean citizens to 190+ countries.",
  verification: {
    google: "R31CCusp43HzLDTuTSiA9NnWNWi4KI2wGd4fKTEnF6I",
  },
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
      {/* 👇 2. GTM ID 심기 (복잡한 script 태그 대신 이거 한 줄이면 끝입니다!) */}
      <GoogleTagManager gtmId="GTM-TPRWDJ9X" />
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}