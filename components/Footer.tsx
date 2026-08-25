import Link from "next/link";
import { useTranslations } from "next-intl";
import BrandMark from "./BrandMark";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="mt-auto">
      {/* Top brand band — gives the footer real presence on mobile instead
          of just a list of links. Vermilion-tinted warm panel with the
          brand mark, a single value-prop line, and a primary CTA. On
          desktop this collapses into a left-anchored brand block paired
          with the link grid on the right. */}
      <div className="bg-[var(--text-primary)] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-10">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-white">
                  <BrandMark size={28} />
                </span>
              </div>
              <p className="font-fraunces text-[1.625rem] sm:text-[2rem] leading-[1.15] tracking-[-0.02em] text-white">
                {t("pitch")}
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-3">
              <Link
                href="/plan/new"
                className="inline-flex items-center justify-center px-6 min-h-[52px] rounded-full bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition w-full sm:w-auto"
              >
                {t("cta")}
                <span aria-hidden className="ml-2">→</span>
              </Link>
              <p className="text-caption text-white/60">{t("ctaHint")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Link grid — single-column vertical stack on mobile (each section
          at full width with a thin divider between groups), 3-column
          horizontal layout on sm+. The previous 2-col mobile layout
          with Product spanning 2 cols and About/Legal sharing the row
          below produced uneven column widths that read as misaligned;
          stacking them all gives identical width and a clean rhythm. */}
      <div className="bg-[var(--background)] border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <nav aria-label="Footer" className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 gap-x-6">
            <div>
              <p className="text-caption uppercase tracking-[0.16em] text-[var(--text-muted)] font-semibold mb-3">
                {t("groupProduct")}
              </p>
              <ul className="flex flex-col">
                <li>
                  <Link href="/plan/new" className="block py-2 text-body-md text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition">
                    {t("linkPlanTrip")}
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="block py-2 text-body-md text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition">
                    {t("linkPricing")}
                  </Link>
                </li>
                <li>
                  <Link href="/samples" className="block py-2 text-body-md text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition">
                    {t("linkSamplePlans")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-caption uppercase tracking-[0.16em] text-[var(--text-muted)] font-semibold mb-3">
                {t("groupAbout")}
              </p>
              <ul className="flex flex-col">
                <li>
                  <Link href="/about" className="block py-2 text-body-md text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition">
                    {t("linkOurStory")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="block py-2 text-body-md text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition">
                    {t("linkJournal")}
                  </Link>
                </li>
                <li>
                  <a href="mailto:gliddy@checkvisamap.com" className="block py-2 text-body-md text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition">
                    {t("linkContact")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-caption uppercase tracking-[0.16em] text-[var(--text-muted)] font-semibold mb-3">
                {t("groupLegal")}
              </p>
              <ul className="flex flex-col">
                <li>
                  <Link href="/terms" className="block py-2 text-body-md text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition">
                    {t("linkTerms")}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="block py-2 text-body-md text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition">
                    {t("linkPrivacy")}
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="block py-2 text-body-md text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition">
                    {t("linkRefund")}
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="block py-2 text-body-md text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition">
                    {t("linkDisclaimer")}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between gap-3">
            <p className="text-caption text-[var(--text-muted)]">
              {t("copyright")} · gliddy@checkvisamap.com ·{" "}
              {/* Studio credit. Intentionally dofollow (no rel) — DANU
                  Technologies is the studio behind gliddy, not a paid
                  placement. Untranslated: the studio name is a proper noun. */}
              <a
                href="https://trafficpumplab.com"
                className="hover:text-[var(--brand-primary)] transition"
              >
                Made by DANU Technologies
              </a>
            </p>
            <p className="text-caption text-[var(--text-muted)] sm:max-w-md sm:text-right">
              {t("disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
