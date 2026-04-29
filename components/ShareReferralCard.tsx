"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { analytics } from "../lib/analytics";

interface ShareReferralCardProps {
  shareUrl: string;
}

/**
 * Share-your-referral card. Marketing-grade visual: warm gradient with
 * decorative postcard motif (gift icon + dotted path), clear value prop
 * ("you get a free plan"), prominent copy button. Replaces the prior
 * black-on-white box that looked like a server error message.
 */
export default function ShareReferralCard({ shareUrl }: ShareReferralCardProps) {
  const t = useTranslations("plan");
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  const fireShared = (method: "copy" | "native_share") => {
    // Pull plan id out of the share URL — last segment of /r/{code} or /plan/{id}.
    const planId = shareUrl.split("/").filter(Boolean).pop() || "unknown";
    analytics.referralShared({ locale, plan_id: planId, method });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      fireShared("copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        fireShared("copy");
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Silent fail
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[var(--border-light)] bg-gradient-to-br from-[var(--brand-soft)] via-[var(--surface-secondary)] to-[var(--accent-soft)] p-6 sm:p-8 shadow-card">
      {/* Decorative coral blob top-right */}
      <div
        aria-hidden
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[var(--brand-primary)] opacity-15"
      />
      {/* Decorative blue ring bottom-left */}
      <div
        aria-hidden
        className="absolute -bottom-20 -left-12 w-44 h-44 rounded-full border-[20px] border-[var(--accent-primary)] opacity-10"
      />

      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-caption font-bold uppercase tracking-[0.14em] text-[var(--brand-primary)] mb-4">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect x="2" y="7" width="20" height="5" />
            <line x1="12" y1="22" x2="12" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
          Free plan inside
        </div>

        <h3 className="font-fraunces text-[1.5rem] sm:text-[1.75rem] font-semibold text-[var(--text-primary)] leading-tight tracking-[-0.012em]">
          {t("shareTitle")}
        </h3>
        <p className="text-body-md text-[var(--text-secondary)] mt-2 max-w-md">
          {t("shareSubtitle")}
        </p>

        <div className="mt-5 flex flex-col sm:flex-row items-stretch gap-2 bg-white border border-[var(--border-light)] rounded-[14px] p-2 shadow-soft">
          <code className="flex-1 px-3 py-2.5 text-body-sm text-[var(--text-secondary)] truncate font-mono">
            {shareUrl}
          </code>
          <button
            onClick={handleCopy}
            className="shrink-0 px-5 py-2.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-dark)] text-white text-body-sm font-semibold rounded-[10px] transition inline-flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12l5 5L20 7" />
                </svg>
                {t("shareCopied")}
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {t("shareCopy")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
