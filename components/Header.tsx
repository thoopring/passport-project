import Link from "next/link";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import BrandMark from "./BrandMark";
import BetaBadge from "./BetaBadge";

interface HeaderProps {
  showCta?: boolean;
}

export default function Header({ showCta = true }: HeaderProps) {
  const t = useTranslations("header");
  return (
    <header className="w-full border-b border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition inline-flex items-center gap-2"
          aria-label="gliddy — home"
        >
          <BrandMark size={26} />
          <BetaBadge variant="compact" />
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/samples"
            className="hidden sm:inline-block px-3 py-1.5 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            {t("navSamples")}
          </Link>
          <Link
            href="/pricing"
            className="hidden sm:inline-block px-3 py-1.5 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            {t("navPricing")}
          </Link>
          <Link
            href="/about"
            className="hidden sm:inline-block px-3 py-1.5 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            {t("navAbout")}
          </Link>
          <Link
            href="/account"
            aria-label={t("navAccount")}
            className="hidden sm:inline-flex items-center justify-center px-2.5 py-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
          <div className="ml-1 sm:ml-2">
            <LocaleSwitcher />
          </div>
          {showCta && (
            <Link
              href="/plan/new"
              className="ml-2 px-4 py-2 bg-[var(--brand-primary)] text-white text-body-sm font-medium rounded-md hover:opacity-90 transition"
            >
              {t("cta")}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
