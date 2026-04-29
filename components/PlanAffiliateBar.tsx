import { useTranslations } from "next-intl";
import AffiliateLink from "./AffiliateLink";
import { buildTravelToolkit } from "../lib/affiliates";

interface PlanAffiliateBarProps {
  destination: string;
  destinationCountry: string;
}

/**
 * "Travel toolkit" sidebar shown on the plan view. Subtle, low-pressure
 * affiliate placement (Req 15 — feels like helpful concierge, not a pitch).
 *
 * NOT rendered in the PDF — Req says PDF affiliate CTR is bad and we want
 * to keep the PDF clean. PDF gets only a small QR section instead.
 *
 * Server Component — embeds the existing client AffiliateLink wrapper for
 * GA4 click tracking.
 */
export default function PlanAffiliateBar({
  destination,
  destinationCountry,
}: PlanAffiliateBarProps) {
  const t = useTranslations("affiliate");
  const links = buildTravelToolkit(destination, destinationCountry);

  return (
    <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-5 mb-6">
      <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-wider mb-4">
        {t("toolkitFor", { destination })}
      </p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.provider}>
            <AffiliateLink
              href={link.url}
              category="plan_toolkit"
              label={link.provider}
              className="group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--background)] transition"
            >
              <span className="text-body-sm font-medium text-[var(--text-primary)]">
                {link.label}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 opacity-30 group-hover:opacity-70 transition -translate-x-1 group-hover:translate-x-0"
              >
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </AffiliateLink>
          </li>
        ))}
      </ul>
      <p className="text-caption text-[var(--text-muted)] mt-3 leading-relaxed">
        {t("disclosure")}
      </p>
    </div>
  );
}
