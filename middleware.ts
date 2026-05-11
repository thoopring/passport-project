import { NextRequest, NextResponse } from "next/server";

/**
 * Two-stage middleware:
 *
 *   STAGE 1 — Locale-prefix URL routing (SEO).
 *   When a request comes in for /ko/, /ja/, /zh/, or /fr/ paths, set
 *   the NEXT_LOCALE cookie and rewrite the URL to strip the prefix.
 *   The existing root-level page (e.g. app/about/page.tsx) then renders
 *   in the chosen locale via i18n/request.ts (which reads the cookie).
 *   Browser URL stays at /ko/about because rewrite() doesn't change
 *   the visible URL — Google indexes /ko/about as the Korean version.
 *
 *   English (default locale) stays unprefixed at root paths. So
 *   /about is English, /ko/about is Korean. Only one URL per locale,
 *   no redirect chains, and existing English URLs that Google has
 *   already indexed don't 301 anywhere.
 *
 *   STAGE 2 — Geo-IP locale suggestion (P5).
 *   On a no-cookie first visit, infer locale from x-vercel-ip-country
 *   and set NEXT_LOCALE so a Korean visitor lands on Korean content
 *   even at /. This stage runs only when stage 1 didn't fire.
 *
 * RULES:
 *   - Stage 1 is server-side rewrite, not redirect — preserves the
 *     prefixed URL for SEO indexing.
 *   - Stage 2 never auto-redirects, only sets cookie. The user's manual
 *     LocaleSwitcher choice (which goes through stage 1) always wins
 *     because they get a real prefixed URL the cookie matches.
 *   - Skip API routes, static assets, and private plan/[id] UUIDs.
 */

const SUPPORTED_PREFIX_LOCALES = ["ko", "ja", "zh", "fr"] as const;

const COUNTRY_TO_LOCALE: Record<string, string> = {
  KR: "ko",
  JP: "ja",
  CN: "zh",
  TW: "zh",
  HK: "zh",
  MO: "zh",
  SG: "zh", // Singapore — Chinese is one of the official languages
  FR: "fr",
  BE: "fr", // Belgium — French is a primary official language
  CH: "fr", // Switzerland — French in Romandy region
  LU: "fr", // Luxembourg
  MC: "fr", // Monaco
  // Skip CA on purpose — majority anglophone; suggesting French to a Toronto
  // user is more annoying than helpful. Quebec users can switch manually.
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── STAGE 1: locale-prefix URL routing ───
  // Detect /ko/, /ja/, /zh/, /fr/ at the start of the path.
  const segments = pathname.split("/");
  const maybeLocale = segments[1] ?? "";
  if (
    (SUPPORTED_PREFIX_LOCALES as readonly string[]).includes(maybeLocale)
  ) {
    // Strip the locale prefix to get the underlying app route.
    const remainder = "/" + segments.slice(2).join("/");
    const finalPath = remainder === "/" ? "/" : remainder.replace(/\/$/, "");

    // Don't apply locale routing to private/UUID surfaces. /ko/plan/[id]
    // would just confuse the renderer without adding SEO value (those
    // pages are robots-disallowed). /ko/api/* would route the API call
    // through a locale shell it doesn't need. /ko/r/* is just a redirect.
    const skip =
      finalPath.startsWith("/api/") ||
      finalPath.startsWith("/_next/") ||
      finalPath.startsWith("/plan/") ||
      finalPath.startsWith("/r/");

    if (skip) {
      // Just rewrite without setting cookie — these aren't user-facing
      // SEO surfaces, and we don't want to silently flip locale based
      // on what was just an accidentally-prefixed URL.
      const url = request.nextUrl.clone();
      url.pathname = finalPath;
      return NextResponse.rewrite(url);
    }

    // Propagate the locale to the downstream handler via a request
    // header AND set a response cookie. Both matter:
    //
    //   x-gliddy-locale header → i18n/request.ts reads it on THIS
    //     request via next/headers, so the FIRST visit to /ko/blog
    //     renders Korean immediately. Without this header, the
    //     response-side cookie isn't visible to the same request
    //     (cookies are set on the response, but i18n/request.ts
    //     reads from request.cookies — empty on first hit). Symptom
    //     before the fix: Google crawls /ko/blog, sees English
    //     content, marks /ko/blog as duplicate of /blog → refuses
    //     to index any locale variant. Confirmed via GSC 2026-05-11.
    //
    //   NEXT_LOCALE cookie → persists locale for subsequent
    //     navigations within the session (user clicks internal Link
    //     to /samples — cookie keeps content in chosen language even
    //     though URL drops the prefix).
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-gliddy-locale", maybeLocale);

    const url = request.nextUrl.clone();
    url.pathname = finalPath;
    const rewritten = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    rewritten.cookies.set("NEXT_LOCALE", maybeLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return rewritten;
  }

  // ─── STAGE 2: geo-IP locale suggestion ───
  const response = NextResponse.next();

  // User already chose a locale — cookie wins, nothing to do.
  if (request.cookies.get("NEXT_LOCALE")) return response;

  // Vercel Edge populates this header on every request in production.
  // In dev / non-Vercel envs it may be missing — skip silently.
  const country =
    request.headers.get("x-vercel-ip-country") ??
    // @ts-expect-error — `geo` exists on NextRequest in some Vercel runtimes
    request.geo?.country ??
    null;

  if (!country) return response;

  const suggestedLocale = COUNTRY_TO_LOCALE[country.toUpperCase()];
  if (!suggestedLocale) return response;

  // Per design feedback (priority: 1) IP country, 2) cookie): on a first-
  // ever visit (no NEXT_LOCALE cookie), AUTO-SET the locale to the IP-based
  // mapping rather than just suggesting via banner. Once set, the cookie
  // wins on every subsequent request, so the user's manual choice via the
  // language switcher always takes priority.
  response.cookies.set("NEXT_LOCALE", suggestedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  // Also clear any stale SUGGEST_LOCALE — we already auto-applied so the
  // banner shouldn't fire.
  response.cookies.set("SUGGEST_LOCALE", "", { path: "/", maxAge: 0 });

  return response;
}

export const config = {
  matcher: [
    // Run on all paths except static files and API routes
    "/((?!_next/static|_next/image|api/|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$|.*\\.ico$|.*\\.txt$|.*\\.xml$|.*\\.json$).*)",
  ],
};
