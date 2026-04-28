"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getSupabaseBrowser } from "../lib/supabase-browser";

interface SavePlanCtaProps {
  planEmail: string;
  planId: string;
}

type State = "loading" | "anon" | "matched" | "different";

/**
 * Post-payment "save your plan to your account" CTA. Renders one of three
 * states based on the visitor's Supabase session:
 *  - anon: no session → show primary save-with-email button → /login prefill
 *  - matched: session email == plan email → show "saved" confirmation + /account link
 *  - different: session email != plan email → ask user to switch accounts
 *
 * Plans are anonymous-by-UUID at purchase time, but the /api/account/plans
 * endpoint already filters by `email`, so once a user logs in with the same
 * email used at checkout, the plan automatically appears in their library.
 * No DB migration required.
 */
export default function SavePlanCta({ planEmail, planId }: SavePlanCtaProps) {
  const t = useTranslations("plan");
  const [state, setState] = useState<State>("loading");
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = getSupabaseBrowser();
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      const email = data.session?.user?.email ?? null;
      if (!email) {
        setState("anon");
      } else if (email.toLowerCase() === planEmail.toLowerCase()) {
        setSessionEmail(email);
        setState("matched");
      } else {
        setSessionEmail(email);
        setState("different");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [planEmail]);

  // Reserve vertical space while we read the session — avoids CLS jolt.
  if (state === "loading") {
    return (
      <div
        aria-hidden
        className="rounded-[20px] border border-[var(--border-light)] bg-[var(--surface-secondary)] h-[180px]"
      />
    );
  }

  if (state === "matched") {
    return (
      <div className="rounded-[20px] border border-[var(--accent-primary)]/25 bg-gradient-to-br from-[var(--accent-soft)] to-white p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-fraunces text-[1.375rem] font-semibold text-[var(--text-primary)] tracking-[-0.012em]">
              {t("saveSavedTitle")}
            </h3>
            <p className="text-body-sm text-[var(--text-secondary)] mt-1 break-words">
              {t("saveSavedSubtitle", { email: sessionEmail ?? planEmail })}
            </p>
            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 mt-3 text-body-sm text-[var(--accent-dark)] hover:underline underline-offset-4 font-semibold"
            >
              {t("saveSavedLink")} →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // anon + different both render the prompt CTA, with different copy.
  const loginHref = `/login?email=${encodeURIComponent(planEmail)}&next=${encodeURIComponent(
    `/plan/${planId}`,
  )}`;
  const isDifferent = state === "different";

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[var(--border-light)] bg-gradient-to-br from-[var(--brand-soft)] via-white to-[var(--accent-soft)] p-6 sm:p-8 shadow-card">
      <div
        aria-hidden
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[var(--brand-primary)] opacity-10"
      />
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-caption font-bold uppercase tracking-[0.14em] text-[var(--brand-primary)] mb-4">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          {t("saveBadge")}
        </div>

        <h3 className="font-fraunces text-[1.5rem] sm:text-[1.75rem] font-semibold text-[var(--text-primary)] leading-tight tracking-[-0.012em]">
          {t("saveTitle")}
        </h3>
        <p className="text-body-md text-[var(--text-secondary)] mt-2 max-w-lg break-words">
          {isDifferent
            ? t("saveDifferentSubtitle", {
                sessionEmail: sessionEmail ?? "",
                planEmail,
              })
            : t("saveSubtitle")}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href={loginHref}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-dark)] text-white font-semibold rounded-[10px] transition text-body-sm"
          >
            {isDifferent ? t("saveSwitchButton") : t("saveButton")}
          </Link>
          <p className="text-caption text-[var(--text-muted)]">
            {t("saveNoPassword")}
          </p>
        </div>
      </div>
    </div>
  );
}
