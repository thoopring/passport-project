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

  // Filename header must be ASCII (HTTP ByteString). For non-ASCII
  // destinations (e.g. "도쿄"), Claude often returns the destination field in
  // the user's locale, so we use a locale-agnostic ASCII filename and supply
  // the localized name via RFC 5987 `filename*=UTF-8''` for modern browsers.
  const asciiName = `passport-power-${id.slice(0, 8)}.pdf`;
  const utf8Name = encodeURIComponent(
    `passport-power-${record.plan.destination}.pdf`,
  ).replace(/'/g, "%27");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${asciiName}"; filename*=UTF-8''${utf8Name}`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
