"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CreditCelebration from "../../components/CreditCelebration";
import { getSupabaseBrowser } from "../../lib/supabase-browser";

interface PlanRow {
  id: string;
  status: string;
  paidAt: string | null;
  generatedAt: string | null;
  destination: string;
  destinationCountry: string;
  durationDays: number | null;
  failureReason: string | null;
}

interface ActiveCredit {
  id: string;
  source: string;
  source_ref: string | null;
  expires_at: string | null;
  created_at: string;
}

export default function AccountPage() {
  const router = useRouter();
  const t = useTranslations("account.dashboard");
  const locale = useLocale();
  const [email, setEmail] = useState<string | null>(null);
  const [plans, setPlans] = useState<PlanRow[] | null>(null);
  const [credits, setCredits] = useState<ActiveCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabaseBrowser();
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!session) {
        router.replace("/login");
        return;
      }
      setEmail(session.user.email ?? null);
      try {
        const res = await fetch("/api/account/plans", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error || `HTTP ${res.status}`);
        }
        const j = await res.json();
        setPlans(j.plans);
        setCredits(Array.isArray(j.credits) ? j.credits : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  const signOut = async () => {
    await getSupabaseBrowser().auth.signOut();
    router.replace("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header showCta={false} />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-12">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">
              {t("eyebrow")}
            </p>
            <h1 className="font-fraunces text-[2rem] sm:text-[2.5rem] leading-tight text-[var(--text-primary)]">
              {t("title")}
            </h1>
            {email && (
              <p className="text-body-sm text-[var(--text-muted)] mt-1">{email}</p>
            )}
          </div>
          <button
            onClick={signOut}
            className="text-body-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] underline underline-offset-4"
          >
            {t("signOut")}
          </button>
        </div>

        {loading && (
          <div className="bg-white border border-[var(--border-light)] rounded-[12px] p-6 text-center">
            <div className="w-6 h-6 rounded-full border-2 border-[var(--brand-primary)] border-t-transparent animate-spin mx-auto mb-3" />
            <p className="text-body-sm text-[var(--text-muted)]">{t("loading")}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-[12px] p-4 text-body-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && email && (
          <CreditCelebration credits={credits} email={email} />
        )}

        {!loading && !error && plans && plans.length === 0 && (
          <div className="bg-white border border-[var(--border-light)] rounded-[14px] p-8 text-center">
            <p className="text-[2.5rem] mb-3">✈️</p>
            <h2 className="font-fraunces text-[1.5rem] text-[var(--text-primary)] mb-2">
              {t("emptyTitle")}
            </h2>
            <p className="text-body-sm text-[var(--text-secondary)] mb-5">
              {t("emptySubtitle")}
            </p>
            <Link
              href="/plan/new"
              className="inline-block px-6 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-dark)] text-white font-semibold rounded-[10px] transition"
            >
              {t("emptyCta")}
            </Link>
          </div>
        )}

        {!loading && !error && plans && plans.length > 0 && (
          <ul className="space-y-3">
            {plans.map((p) => {
              const statusLabel =
                p.status === "complete"
                  ? t("statusComplete")
                  : p.status === "generating"
                    ? t("statusGenerating")
                    : p.status === "paid"
                      ? t("statusPaid")
                      : p.status === "failed"
                        ? t("statusFailed")
                        : p.status === "draft"
                          ? t("statusDraft")
                          : p.status;
              const statusColor =
                p.status === "complete"
                  ? "bg-[var(--accent-soft)] text-[var(--accent-dark)]"
                  : p.status === "failed"
                    ? "bg-red-50 text-red-700"
                    : p.status === "draft"
                      ? "bg-[var(--surface-secondary)] text-[var(--text-muted)]"
                      : "bg-[var(--brand-soft)] text-[var(--brand-dark)]";

              const isClickable =
                p.status === "complete" ||
                p.status === "generating" ||
                p.status === "paid";

              const Card = (
                <div className="bg-white border border-[var(--border-light)] rounded-[14px] p-5 hover:border-[var(--text-secondary)] transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-fraunces text-[1.375rem] text-[var(--text-primary)] leading-tight">
                        {p.destination}
                      </h3>
                      <p className="text-body-sm text-[var(--text-muted)] mt-0.5">
                        {p.destinationCountry}
                        {p.durationDays
                          ? ` · ${t("daysSuffix", { count: p.durationDays })}`
                          : ""}
                      </p>
                      <p className="text-caption text-[var(--text-muted)] mt-2">
                        {p.paidAt
                          ? new Date(p.paidAt).toLocaleDateString(locale)
                          : new Date().toLocaleDateString(locale)}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-caption font-bold uppercase tracking-wide ${statusColor}`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                  {p.failureReason && (
                    <p className="text-caption text-red-600 mt-2 truncate">
                      {p.failureReason}
                    </p>
                  )}
                </div>
              );

              return (
                <li key={p.id}>
                  {isClickable ? (
                    <Link href={`/plan/${p.id}`} className="block">
                      {Card}
                    </Link>
                  ) : (
                    Card
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] text-center">
          <Link
            href="/plan/new"
            className="inline-block px-6 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-dark)] text-white font-semibold rounded-[10px] transition"
          >
            {t("newPlanCta")}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
