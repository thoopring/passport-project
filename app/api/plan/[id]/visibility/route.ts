import { NextRequest, NextResponse } from "next/server";
import { getPlan, setPlanPublicListed } from "../../../../../lib/plans";

export const runtime = "nodejs";

/**
 * POST /api/plan/[id]/visibility
 *
 * Toggle whether the plan is opted into the public community gallery
 * (Phase 0 of community-sharing — see docs/COMMUNITY-SHARING-PLAN.md).
 *
 * Body: { public_listed: boolean }
 *
 * Authorization model: URL is the access token. Anyone with the plan
 * link can read it (server component on /plan/[id] does not gate),
 * and by symmetry anyone with the link can toggle visibility. The
 * UUID is unguessable; treating it as the auth token is consistent
 * with the rest of /plan/[id]'s behavior. If link-leak abuse becomes
 * a real problem, escalate to an email-confirmation challenge here.
 *
 * Only completed plans are valid targets — toggling visibility on a
 * draft / generating / failed plan would publish a plan that doesn't
 * exist yet. Returns 409 in that case.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let body: { public_listed?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.public_listed !== "boolean") {
    return NextResponse.json(
      { error: "public_listed must be a boolean" },
      { status: 400 },
    );
  }

  const record = await getPlan(id).catch(() => null);
  if (!record) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }
  if (record.status !== "complete") {
    return NextResponse.json(
      {
        error: `Plan is not ready for publishing (status: ${record.status})`,
      },
      { status: 409 },
    );
  }

  await setPlanPublicListed(id, body.public_listed);

  return NextResponse.json({ ok: true, public_listed: body.public_listed });
}
