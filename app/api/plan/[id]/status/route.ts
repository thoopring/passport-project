import { NextRequest, NextResponse } from "next/server";
import { getPlan } from "../../../../../lib/plans";

export const runtime = "nodejs";

/**
 * GET /api/plan/[id]/status
 *
 * Lightweight status probe used by the post-payment wait screen to poll for
 * generation completion. Returns only what the client needs to decide whether
 * to redirect, without shipping the full plan JSON over the wire every 4s.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const record = await getPlan(id);
  if (!record) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(
    {
      status: record.status,
      failureReason: record.failure_reason,
    },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}
