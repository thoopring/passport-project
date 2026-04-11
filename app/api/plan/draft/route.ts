import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PlanRequestSchema } from "../../../../types/trip-plan";
import { createDraftPlan } from "../../../../lib/plans";
import { getActiveLocale } from "../../../../i18n/request";
import { REFERRAL_COOKIE } from "../../../../lib/referrals";

/**
 * POST /api/plan/draft
 *
 * Creates a draft plan record from the loading-screen wizard submission. No
 * payment yet. The user's active locale (from cookie/Accept-Language) is
 * captured here so the generator emits content in the right language.
 * Returns the plan id so the client can immediately POST /api/checkout.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Inject the user's active locale unless the client already specified one.
    if (!body.locale) {
      body.locale = await getActiveLocale();
    }

    // Capture the referral cookie if present (P9)
    if (!body.referredByCode) {
      const cookieStore = await cookies();
      const refCode = cookieStore.get(REFERRAL_COOKIE)?.value;
      if (refCode) body.referredByCode = refCode;
    }

    const parsed = PlanRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const record = await createDraftPlan(parsed.data);
    return NextResponse.json({ id: record.id }, { status: 201 });
  } catch (err) {
    console.error("draft plan failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
