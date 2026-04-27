"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSupabaseBrowser } from "../../lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
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
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: { emailRedirectTo: `${baseUrl}/auth/callback` },
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
            로그인 / 회원가입
          </p>
          <h1 className="font-fraunces text-[2.25rem] sm:text-[2.75rem] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] mb-3">
            이메일만 있으면 끝.
          </h1>
          <p className="text-body-md text-[var(--text-secondary)] mb-8">
            비밀번호 필요 없어요. 이메일로 보내드리는 링크 한 번 클릭하면
            로그인됩니다. 이전에 만드신 플랜이 있으면 자동으로 같은 이메일에
            연결돼요.
          </p>

          {status !== "sent" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder="you@example.com"
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
                {status === "sending" ? "보내는 중…" : "로그인 링크 받기"}
              </button>
              {status === "error" && (
                <p className="text-body-sm text-red-600">{errorMsg}</p>
              )}
            </form>
          ) : (
            <div className="bg-[var(--accent-soft)] border border-[var(--accent-primary)]/20 rounded-[12px] p-5">
              <p className="font-semibold text-[var(--text-primary)] mb-1">
                ✉️ 메일 보냈어요
              </p>
              <p className="text-body-sm text-[var(--text-secondary)]">
                <span className="font-medium">{email}</span> 으로 보냈어요. 링크
                클릭하시면 로그인되고 내 플랜 페이지로 이동합니다.
              </p>
              <p className="text-caption text-[var(--text-muted)] mt-3">
                메일이 안 보이면 스팸함도 확인해주세요.
              </p>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] text-center">
            <p className="text-body-sm text-[var(--text-muted)]">
              로그인 안 해도 플랜 구매는 가능해요.
            </p>
            <Link
              href="/plan/new"
              className="inline-block mt-2 text-body-sm text-[var(--brand-primary)] hover:underline underline-offset-4 font-medium"
            >
              회원가입 없이 바로 플랜 만들기 →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
