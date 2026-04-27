import { NextRequest, NextResponse } from "next/server";

/**
 * Geo-IP locale suggestion middleware (P5).
 *
 * Reads the visitor's country from Vercel Edge (`x-vercel-ip-country` header
 * or `request.geo.country`), and if their country maps to a non-English
 * supported locale, sets a SUGGEST_LOCALE cookie that the client-side
 * LocaleSuggestionBanner picks up to ask "한국어로 보시겠어요?".
 *
 * RULES:
 *   - Never auto-redirect. Always ask first (Req 4 explicit).
 *   - Don't suggest if user already set NEXT_LOCALE.
 *   - Don't re-suggest if user previously dismissed (SUGGEST_DISMISSED cookie).
 *   - Skip the API routes and static assets — banner only matters on pages.
 */

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
