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
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // User already chose a locale — nothing to suggest.
  if (request.cookies.get("NEXT_LOCALE")) return response;
  // User already dismissed the suggestion — don't bug them.
  if (request.cookies.get("SUGGEST_DISMISSED")) return response;

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

  // Set the suggestion cookie. Short-lived (10 minutes) — just to bridge from
  // edge middleware to the next client render. The banner will read it and
  // either set NEXT_LOCALE (accept) or SUGGEST_DISMISSED (decline).
  response.cookies.set("SUGGEST_LOCALE", suggestedLocale, {
    path: "/",
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    // Run on all paths except static files and API routes
    "/((?!_next/static|_next/image|api/|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$|.*\\.ico$|.*\\.txt$|.*\\.xml$|.*\\.json$).*)",
  ],
};
