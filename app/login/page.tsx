"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSupabaseBrowser } from "../../lib/supabase-browser";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const t = useTranslations("account.login");
  const searchParams = useSearchParams();
  const prefillEmail = searchParams.get("email") ?? "";
  const next = searchParams.get("next") ?? "";

  const [email, setEmail] = useState(prefillEmail);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const supabase = getSupabaseBrowser();
      const baseUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : "https://checkvisamap.com";
      // Forward `next` through the auth callback so the user lands back
      // on the page they came from (e.g. their just-purchased plan) after
      // the magic link round-trip, instead of always /account.
      const callback = next
        ? `${baseUrl}/auth/callback?next=${encodeURIComponent(next)}`
        : `${baseUrl}/auth/callback`;
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: { emailRedirectTo: callback },
      });
      if (error) {
        setErrorMsg(error.message);
        setStatus("error");
      } else {
        setStatus("sent");
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send link");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header showCta={false} />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="w-full max-w-md">
          <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
            {t("eyebrow")}
          </p>
          <h1 className="font-fraunces text-[2.25rem] sm:text-[2.75rem] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] mb-3">
            {t("title")}
          </h1>
          <p className="text-body-md text-[var(--text-secondary)] mb-8">
            {t("subtitle")}
          </p>

          {status !== "sent" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "sending"}
                className="w-full px-5 py-4 bg-white border border-[var(--border-light)] rounded-[12px] text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition disabled:opacity-50"
                autoFocus
              />
              <button
                type="submit"
                disabled={!email.trim() || status === "sending"}
                className="w-full px-6 py-3.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-dark)] text-white font-semibold rounded-[10px] transition disabled:opacity-40"
              >
                {status === "sending" ? t("sendingButton") : t("sendButton")}
              </button>
              {status === "error" && (
                <p className="text-body-sm text-red-600">{errorMsg}</p>
              )}
            </form>
          ) : (
            <div className="bg-[var(--accent-soft)] border border-[var(--accent-primary)]/20 rounded-[12px] p-5">
              <p className="font-semibold text-[var(--text-primary)] mb-1">
                {t("sentTitle")}
              </p>
              <p className="text-body-sm text-[var(--text-secondary)]">
                {next ? t("sentToReturn", { email }) : t("sentToLibrary", { email })}
              </p>
              <p className="text-caption text-[var(--text-muted)] mt-3">
                {t("sentSpamHint")}
              </p>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] text-center">
            <p className="text-body-sm text-[var(--text-muted)]">
              {t("noLoginPrompt")}
            </p>
            <Link
              href="/plan/new"
              className="inline-block mt-2 text-body-sm text-[var(--brand-primary)] hover:underline underline-offset-4 font-medium"
            >
              {t("noLoginCta")}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
