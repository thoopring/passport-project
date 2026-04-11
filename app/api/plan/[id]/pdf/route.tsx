import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getPlan } from "../../../../../lib/plans";
import { PlanDocument } from "../../../../../lib/pdf/PlanDocument";
import { buildStaticMapUrl } from "../../../../../lib/map";

export const runtime = "nodejs";

/**
 * GET /api/plan/[id]/pdf
 *
 * Streams the trip plan as a PDF. Only works for completed plans.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const record = await getPlan(id);
  if (!record) {
    return new NextResponse("Not found", { status: 404 });
  }
  if (record.status !== "complete" || !record.plan) {
    return new NextResponse(`Plan not ready (status: ${record.status})`, { status: 409 });
  }

  const mapImageUrl = buildStaticMapUrl(record.plan);
  const buffer = await renderToBuffer(
    <PlanDocument plan={record.plan} mapImageUrl={mapImageUrl} />
  );

  // Convert Node Buffer to Uint8Array for NextResponse body compatibility
  const body = new Uint8Array(buffer);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="trip-plan-${record.plan.destination.toLowerCase().replace(/\s+/g, "-")}.pdf"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
