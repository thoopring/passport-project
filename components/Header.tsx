"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import BrandMark from "./BrandMark";

interface HeaderProps {
  showCta?: boolean;
}

export default function Header({ showCta = true }: HeaderProps) {
  const t = useTranslations("header");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-[var(--border-subtle)] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition inline-flex items-center gap-2"
          aria-label="gliddy — home"
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark size={26} />
        </Link>

        {/* Desktop nav — hidden on mobile, replaced by the hamburger drawer below */}
        <nav className="hidden sm:flex items-center gap-1">
          <Link
            href="/samples"
            className="inline-block px-3 py-1.5 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            {t("navSamples")}
          </Link>
          <Link
            href="/pricing"
            className="inline-block px-3 py-1.5 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            {t("navPricing")}
          </Link>
          <Link
            href="/about"
            className="inline-block px-3 py-1.5 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            {t("navAbout")}
          </Link>
          <Link
            href="/account"
            aria-label={t("navAccount")}
            className="inline-flex items-center justify-center px-2.5 py-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
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

        {/* Mobile right-side cluster — locale switcher + CTA + hamburger.
            The CTA is the only nav element visible on mobile because it's the
            primary user task; everything else lives in the drawer. */}
        <div className="flex sm:hidden items-center gap-2">
          <LocaleSwitcher />
          {showCta && (
            <Link
              href="/plan/new"
              className="px-3 py-2 bg-[var(--brand-primary)] text-white text-caption font-semibold rounded-md hover:opacity-90 transition whitespace-nowrap"
              onClick={() => setMenuOpen(false)}
            >
              {t("cta")}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="w-10 h-10 inline-flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded-md transition"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer — full-width slide-down with the same nav links the
          desktop bar shows. Click any link to dismiss. Designed flat (no
          card stack) so it reads as part of the header rather than a
          floating panel. */}
      {menuOpen && (
        <nav
          aria-label="Mobile menu"
          className="sm:hidden absolute left-0 right-0 top-full z-30 bg-[var(--background)] border-b border-[var(--border-subtle)] shadow-lg"
        >
          <div className="px-4 py-2 flex flex-col">
            <Link
              href="/samples"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-body-md text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded-md transition"
            >
              {t("navSamples")}
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-body-md text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded-md transition"
            >
              {t("navPricing")}
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-body-md text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded-md transition"
            >
              {t("navAbout")}
            </Link>
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-body-md text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded-md transition inline-flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {t("navAccount")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
