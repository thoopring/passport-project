"use client";

import { useLocale } from "next-intl";
import { trackLegacy } from "../lib/analytics";

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  category: string;
  label: string;
}

export default function AffiliateLink({ href, children, className = "", category, label }: AffiliateLinkProps) {
  const locale = useLocale();
  const handleClick = () => {
    trackLegacy("affiliate_click", {
      event_category: category,
      event_label: label,
      affiliate_url: href,
      value: 1,
      locale,
    });
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
