"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface ShareReferralCardProps {
  shareUrl: string;
}

/**
 * Share-your-referral-link card shown to buyers on /plan/[id]. Displays the
 * full /r/{code} URL with a click-to-copy button. Pure client-side — the
 * share URL is computed by the parent server component.
 */
export default function ShareReferralCard({ shareUrl }: ShareReferralCardProps) {
  const t = useTranslations("plan");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail in some browser contexts — fall back to a
      // selection-based copy.
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Give up silently
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="bg-gradient-to-br from-brand-50 to-amber-50 dark:from-brand-950/30 dark:to-amber-950/20 border border-brand-200 dark:border-brand-900 rounded-2xl p-6">
      <h3 className="text-body-lg font-bold text-[var(--text-primary)]">{t("shareTitle")}</h3>
      <p className="text-body-sm text-[var(--text-secondary)] mt-1.5">{t("shareSubtitle")}</p>
      <div className="mt-4 flex items-center gap-2 bg-[var(--background)] border border-[var(--border-light)] rounded-xl p-2.5">
        <code className="flex-1 text-body-sm text-[var(--text-secondary)] truncate font-mono">
          {shareUrl}
        </code>
        <button
          onClick={handleCopy}
          className="shrink-0 px-4 py-2 bg-[var(--text-primary)] text-[var(--background)] text-caption font-bold rounded-lg hover:opacity-90 transition"
        >
          {copied ? t("shareCopied") : t("shareCopy")}
        </button>
      </div>
    </div>
  );
}
