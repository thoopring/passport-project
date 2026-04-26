import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";
import BrandMark from "./BrandMark";
import BetaBadge from "./BetaBadge";

interface HeaderProps {
  showCta?: boolean;
}

export default function Header({ showCta = true }: HeaderProps) {
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
            Samples
          </Link>
          <Link
            href="/pricing"
            className="hidden sm:inline-block px-3 py-1.5 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="hidden sm:inline-block px-3 py-1.5 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            About
          </Link>
          <div className="ml-1 sm:ml-2">
            <LocaleSwitcher />
          </div>
          {showCta && (
            <Link
              href="/plan/new"
              className="ml-2 px-4 py-2 bg-[var(--brand-primary)] text-white text-body-sm font-medium rounded-md hover:opacity-90 transition"
            >
              Plan my trip
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
