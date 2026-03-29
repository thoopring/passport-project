"use client";

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  category: string;
  label: string;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export default function AffiliateLink({ href, children, className = "", category, label }: AffiliateLinkProps) {
  const handleClick = () => {
    // GA4 custom event for affiliate click tracking
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "affiliate_click", {
        event_category: category,
        event_label: label,
        affiliate_url: href,
        value: 1,
      });
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
