import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-[1.25rem] text-[var(--text-primary)]">
            Passport Power
          </span>
          <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
            AI trip plans · $4
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-body-sm text-[var(--text-secondary)]">
          <Link href="/samples" className="hover:text-[var(--text-primary)] transition">Samples</Link>
          <Link href="/blog" className="hover:text-[var(--text-primary)] transition">Journal</Link>
          <Link href="/about" className="hover:text-[var(--text-primary)] transition">About</Link>
          <Link href="/privacy" className="hover:text-[var(--text-primary)] transition">Privacy</Link>
          <Link href="/disclaimer" className="hover:text-[var(--text-primary)] transition">Disclaimer</Link>
        </nav>

        <p className="text-caption text-[var(--text-muted)]">© 2026 Passport Power</p>
      </div>
    </footer>
  );
}
