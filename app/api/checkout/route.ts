import { NextRequest, NextResponse } from "next/server";
import { getPlan } from "../../../lib/plans";
import { createCheckoutUrl } from "../../../lib/lemonsqueezy";

/**
 * POST /api/checkout
 * body: { planId: string }
 *
 * Creates a Lemon Squeezy checkout session for the given draft plan and
 * returns the hosted checkout URL for the client to redirect to.
 */
export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();
    if (!planId || typeof planId !== "string") {
      return NextResponse.json({ error: "planId required" }, { status: 400 });
    }

    const plan = await getPlan(planId);
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
    if (plan.status !== "draft") {
      return NextResponse.json(
        { error: `Plan is in '${plan.status}' state, cannot pay again` },
        { status: 409 }
      );
    }

    const url = await createCheckoutUrl({
      planId: plan.id,
      email: plan.email,
      destination: plan.request.destination,
    });

    return NextResponse.json({ url });
  } catch (err) {
    console.error("checkout failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
