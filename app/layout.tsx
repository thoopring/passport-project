import type { Metadata } from "next";
import "./globals.css";
// 👇 GTM은 그대로 유지!
import { GoogleTagManager } from '@next/third-parties/google'

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
      {/* 👇 GTM ID는 파트너님 것으로 유지 */}
      <GoogleTagManager gtmId="GTM-TPRWDJ9X" />
      
      {/* 폰트 설정 제거하고 깔끔하게 유지 */}
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}