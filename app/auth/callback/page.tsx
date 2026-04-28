"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getSupabaseBrowser } from "../../../lib/supabase-browser";

/**
 * Magic-link callback. Supabase appends `code` (PKCE) or `access_token`
 * (implicit) to the redirect URL. We exchange/parse the session and bounce
 * to `?next=` (forwarded by /login when the user clicked Save-this-plan
 * from a post-payment screen) or fall back to /account.
 *
 * Errors land here too — show them with a "try again" link rather than
 * eat them silently.
 */
export default function AuthCallback() {
  return (
    <Suspense fallback={null}>
      <CallbackInner />
    </Suspense>
  );
}

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    // detectSessionInUrl is true on the browser client, so getSession() will
    // read whatever Supabase parsed out of the URL fragment. PKCE flow needs
    // exchangeCodeForSession explicitly; check for ?code= in URL.
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    // Only allow same-origin relative paths to prevent open-redirect abuse.
    const rawNext = searchParams.get("next");
    const safeNext =
      rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//")
        ? rawNext
        : "/account";

    const finish = async () => {
      try {
        if (code) {
          const { error: ex } = await supabase.auth.exchangeCodeForSession(code);
          if (ex) {
            setError(ex.message);
            return;
          }
        }
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          router.replace(safeNext);
        } else {
          setError("로그인 세션을 만들지 못했어요. 다시 시도해 주세요.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Auth failed");
      }
    };
    finish();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header showCta={false} />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="text-center max-w-md">
          {error ? (
            <>
              <h1 className="font-fraunces text-[1.75rem] text-[var(--text-primary)] mb-3">
                로그인에 실패했어요
              </h1>
              <p className="text-body-sm text-[var(--text-muted)] mb-6">
                {error}
              </p>
              <a
                href="/login"
                className="inline-block px-5 py-2.5 bg-[var(--brand-primary)] text-white rounded-[10px] font-medium"
              >
                다시 시도
              </a>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full border-2 border-[var(--brand-primary)] border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-body-md text-[var(--text-secondary)]">
                로그인 처리 중…
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
