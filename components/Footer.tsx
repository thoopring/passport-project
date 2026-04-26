import Link from "next/link";
import BrandMark from "./BrandMark";
import BetaBadge from "./BetaBadge";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-6">
          <div className="flex items-baseline gap-3 flex-wrap">
            <BrandMark size={22} />
            <BetaBadge variant="regular" />
            <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
              AI trip plans · $4
            </span>
          </div>

          <nav aria-label="Footer" className="flex flex-col sm:flex-row sm:items-baseline gap-x-8 gap-y-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Product
              </span>
              <Link href="/plan/new" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                Plan a trip
              </Link>
              <Link href="/pricing" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                Pricing
              </Link>
              <Link href="/samples" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                Sample plans
              </Link>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
                About
              </span>
              <Link href="/about" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                Our story
              </Link>
              <Link href="/blog" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                Journal
              </Link>
              <a href="mailto:hello@checkvisamap.com" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                Contact
              </a>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Legal
              </span>
              <Link href="/terms" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                Privacy Policy
              </Link>
              <Link href="/refund" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                Refund Policy
              </Link>
              <Link href="/disclaimer" className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                Disclaimer
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-caption text-[var(--text-muted)]">© 2026 gliddy · hello@checkvisamap.com</p>
          <p className="text-caption text-[var(--text-muted)]">
            Plans are AI-generated starting points. Verify details before travel.
          </p>
        </div>
      </div>
    </footer>
  );
}
