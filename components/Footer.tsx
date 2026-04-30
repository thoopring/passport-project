import Link from "next/link";
import { useTranslations } from "next-intl";
import BrandMark from "./BrandMark";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="border-t border-[var(--border-subtle)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-6">
          <div className="flex items-baseline gap-3 flex-wrap">
            <BrandMark size={22} />
            <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {t("tagline")}
            </span>
          </div>

          <nav aria-label="Footer" className="flex flex-col sm:flex-row sm:items-baseline gap-x-8 gap-y-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {t("groupProduct")}
              </span>
              <Link href="/plan/new" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                {t("linkPlanTrip")}
              </Link>
              <Link href="/pricing" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                {t("linkPricing")}
              </Link>
              <Link href="/samples" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                {t("linkSamplePlans")}
              </Link>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {t("groupAbout")}
              </span>
              <Link href="/about" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                {t("linkOurStory")}
              </Link>
              <Link href="/blog" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                {t("linkJournal")}
              </Link>
              <a href="mailto:gliddy@checkvisamap.com" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                {t("linkContact")}
              </a>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {t("groupLegal")}
              </span>
              <Link href="/terms" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                {t("linkTerms")}
              </Link>
              <Link href="/privacy" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                {t("linkPrivacy")}
              </Link>
              <Link href="/refund" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                {t("linkRefund")}
              </Link>
              <Link href="/disclaimer" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                {t("linkDisclaimer")}
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-caption text-[var(--text-muted)]">{t("copyright")} · gliddy@checkvisamap.com</p>
          <p className="text-caption text-[var(--text-muted)]">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
