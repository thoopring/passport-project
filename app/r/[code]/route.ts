import { NextRequest, NextResponse } from "next/server";
import { REFERRAL_COOKIE } from "../../../lib/referrals";

/**
 * GET /r/[code]
 *
 * Referral landing route. Sets the `ref_code` cookie (1 year) and redirects
 * to the home page. The /api/plan/draft route reads this cookie when a new
 * draft is created so we know who to credit on payment.
 *
 * We do NOT validate the code here — invalid codes still set the cookie and
 * redirect, and the validation happens at award time. This keeps the route
 * stateless and fast (no DB call).
 */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ code: string }> },
) {
  const { code } = await ctx.params;
  const sanitized = (code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://checkvisamap.com";
  const response = NextResponse.redirect(new URL("/", baseUrl));

  if (sanitized) {
    response.cookies.set(REFERRAL_COOKIE, sanitized, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      httpOnly: false, // client-side reads not currently needed but harmless
    });
  }

  return response;
}
