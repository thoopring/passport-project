"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface ActiveCredit {
  id: string;
  source: string;
  source_ref: string | null;
  expires_at: string | null;
  created_at: string;
}

interface Props {
  credits: ActiveCredit[];
  /** Used to namespace the localStorage acknowledgment key so two users on
   *  the same device don't see each other's celebrations. */
  email: string;
}

/**
 * Credit balance card + first-view celebration.
 *
 * Shows the user how many free-plan credits they've earned (referral or
 * promo). On the very first /account visit after a new credit is awarded,
 * fires a CSS-confetti animation — the 🎉 moment from the N5 spec.
 *
 * Acknowledgment is tracked in localStorage (per email key). This is
 * device-local: a user who earns a credit on phone, then opens /account
 * on laptop, will see the celebration twice. Acceptable v1 tradeoff —
 * a celebration is a delight, not a security boundary, and the alternative
 * (DB column for ack state) would add a migration for one UI flourish.
 */
export default function CreditCelebration({ credits, email }: Props) {
  const t = useTranslations("account.credits");
  const [confettiOn, setConfettiOn] = useState(false);

  useEffect(() => {
    if (credits.length === 0) return;
    const key = `gliddy:ack_credits:${email.toLowerCase()}`;
    let acked: string[] = [];
    try {
      const raw = localStorage.getItem(key);
      if (raw) acked = JSON.parse(raw);
    } catch {
      acked = [];
    }
    const fresh = credits.filter((c) => !acked.includes(c.id));
    if (fresh.length === 0) return;

    setConfettiOn(true);
    const ackTimer = setTimeout(() => {
      try {
        const next = Array.from(new Set([...acked, ...credits.map((c) => c.id)]));
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // localStorage disabled / private mode — silently skip; user gets
        // the celebration again next visit, which is harmless.
      }
    }, 200);
    const offTimer = setTimeout(() => setConfettiOn(false), 4500);
    return () => {
      clearTimeout(ackTimer);
      clearTimeout(offTimer);
    };
  }, [credits, email]);

  if (credits.length === 0) return null;

  const count = credits.length;
  const expiringSoon = credits.find(
    (c) =>
      c.expires_at &&
      new Date(c.expires_at).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000,
  );

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[var(--brand-primary)]/25 bg-gradient-to-br from-[var(--brand-soft)] via-white to-[var(--accent-soft)] p-6 sm:p-8 mb-6 shadow-card">
      {confettiOn && <Confetti />}

      <div className="relative flex items-start gap-4">
        <div className="shrink-0 text-[2.5rem] leading-none" aria-hidden>
          🎉
        </div>
        <div className="flex-1 min-w-0">
          <p className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur text-caption font-bold uppercase tracking-[0.14em] text-[var(--brand-primary)] mb-2">
            {t("badge")}
          </p>
          <h3 className="font-fraunces text-[1.5rem] sm:text-[1.75rem] font-semibold text-[var(--text-primary)] leading-tight tracking-[-0.012em]">
            {count === 1 ? t("titleOne") : t("titleMany", { count })}
          </h3>
          <p className="text-body-md text-[var(--text-secondary)] mt-2 max-w-lg">
            {t("subtitle")}
          </p>
          {expiringSoon?.expires_at && (
            <p className="text-caption text-[var(--text-muted)] mt-2">
              {t("expiresHint", {
                date: new Date(expiringSoon.expires_at).toLocaleDateString(),
              })}
            </p>
          )}
          <Link
            href="/plan/new"
            className="inline-flex items-center justify-center gap-1.5 mt-4 px-5 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-dark)] text-white font-semibold rounded-[10px] transition text-body-sm"
          >
            {t("useNowCta")}
          </Link>
        </div>
      </div>
    </div>
  );
}

/** 24 colored squares falling with random horizontal positions and delays.
 *  Pure CSS — no library. Animation is defined in app/globals.css under
 *  the `.confetti-piece` keyframes. */
function Confetti() {
  // Pre-computed deterministic positions — keeps SSR/CSR markup matching.
  const pieces = [
    { left: 4, delay: 0.0, color: "#FF6B6B" },
    { left: 9, delay: 0.5, color: "#4DA8DA" },
    { left: 14, delay: 1.1, color: "#F4A261" },
    { left: 19, delay: 0.2, color: "#FFB627" },
    { left: 24, delay: 0.8, color: "#52B788" },
    { left: 29, delay: 1.6, color: "#A8DADC" },
    { left: 34, delay: 0.3, color: "#FF6B6B" },
    { left: 39, delay: 1.0, color: "#4DA8DA" },
    { left: 44, delay: 0.6, color: "#F4A261" },
    { left: 49, delay: 1.4, color: "#FFB627" },
    { left: 54, delay: 0.1, color: "#52B788" },
    { left: 59, delay: 0.9, color: "#A8DADC" },
    { left: 64, delay: 1.7, color: "#FF6B6B" },
    { left: 69, delay: 0.4, color: "#4DA8DA" },
    { left: 74, delay: 1.2, color: "#F4A261" },
    { left: 79, delay: 0.7, color: "#FFB627" },
    { left: 84, delay: 1.5, color: "#52B788" },
    { left: 89, delay: 0.0, color: "#A8DADC" },
    { left: 94, delay: 1.3, color: "#FF6B6B" },
    { left: 12, delay: 1.9, color: "#4DA8DA" },
    { left: 32, delay: 1.8, color: "#F4A261" },
    { left: 52, delay: 2.0, color: "#FFB627" },
    { left: 72, delay: 2.1, color: "#52B788" },
    { left: 92, delay: 2.2, color: "#A8DADC" },
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece absolute top-0 w-2 h-3 rounded-[1px]"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
