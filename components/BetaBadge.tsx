"use client";

import { useTranslations } from "next-intl";

interface Props {
  /** Render larger pill suitable for hero/footer placement. Default is compact for header. */
  variant?: "compact" | "regular";
}

/**
 * Small "Open Beta" indicator. Lives next to the brand mark in the header so
 * customers immediately understand the service is new. Subtle styling — not
 * alarming, just transparent.
 *
 * Tooltip text gives the polite "feedback welcome" framing in the user's
 * locale via `common.betaTooltip`.
 */
export default function BetaBadge({ variant = "compact" }: Props) {
  const t = useTranslations("common");
  const label = t("beta");
  const tooltip = t("betaTooltip");

  if (variant === "regular") {
    return (
      <span
        title={tooltip}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--lavender-soft)] text-[var(--brand-primary)] text-caption font-semibold tracking-wide"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
        {label}
      </span>
    );
  }

  return (
    <span
      title={tooltip}
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-[var(--brand-primary)] text-[var(--brand-primary)] text-[0.625rem] font-bold uppercase tracking-[0.08em] leading-none align-middle"
    >
      {label}
    </span>
  );
}
