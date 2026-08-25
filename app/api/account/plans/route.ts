import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdmin, PLANS_TABLE } from "../../../../lib/supabase";
import { listActiveCredits } from "../../../../lib/referrals";

export const runtime = "nodejs";

/**
 * GET /api/account/plans
 *
 * Lists the current user's plans. Auth: user passes the JWT access token
 * via the Authorization header; we verify it against Supabase Auth (using
 * the public anon key + getUser) and then fetch plans matching their email.
 *
 * The service-role admin client filters by the verified email. RLS is on for
 * every public table (migration 0008) with no policies; service_role bypasses
 * it, so this route is the only path to a user's rows.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const token = auth.slice("Bearer ".length);

  // Verify the JWT against Supabase Auth using the anon key (server side).
  const supaUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supaUrl || !anonKey) {
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }
  const verifier = createClient(supaUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userErr } = await verifier.auth.getUser(token);
  if (userErr || !userData.user?.email) {
    return NextResponse.json({ error: "invalid token" }, { status: 401 });
  }
  const email = userData.user.email;

  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from(PLANS_TABLE)
    .select("id, status, paid_at, generated_at, request, plan, failure_reason")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Trim payloads — only what the account page needs to render rows.
  const trimmed = (data ?? []).map((p) => ({
    id: p.id,
    status: p.status,
    paidAt: p.paid_at,
    generatedAt: p.generated_at,
    destination: (p.request as { destination?: string })?.destination ?? "—",
    destinationCountry:
      (p.request as { destinationCountry?: string })?.destinationCountry ?? "",
    durationDays: (p.request as { durationDays?: number })?.durationDays ?? null,
    failureReason: p.failure_reason,
  }));

  // Active (unused, non-expired) plan credits for the celebration banner +
  // balance card on the account page (N5). Failure here is non-fatal — the
  // page still renders plans without credits.
  const credits = await listActiveCredits(email).catch((err) => {
    console.error("listActiveCredits failed (non-fatal)", err);
    return [];
  });

  return NextResponse.json({ email, plans: trimmed, credits });
}
