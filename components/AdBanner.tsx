"use client";

import { useEffect } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({ slot, format = "auto", responsive = true, className = "" }: AdBannerProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  return (
    <div className={`ad-container my-6 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
