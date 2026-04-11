import { NextRequest, NextResponse } from "next/server";
import { PlanRequestSchema } from "../../../../types/trip-plan";
import { createDraftPlan } from "../../../../lib/plans";

/**
 * POST /api/plan/draft
 *
 * Creates a draft plan record from the form submission. No payment yet.
 * Returns the plan id so the client can navigate to /plan/[id]/preview
 * where the free teaser is shown.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
