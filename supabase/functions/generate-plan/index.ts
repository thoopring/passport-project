// Supabase Edge Function — generate-plan
//
// Triggered by a Supabase Database Webhook when a row in `plans` is UPDATED
// with status='paid'. Orchestrates:
//   1. Idempotency claim (paid → generating)   — in request lifecycle
//   2. Return 200 immediately                   — so the HTTP caller doesn't
//      hit the Supabase 150s IDLE_TIMEOUT on the request itself
//   3. Background (EdgeRuntime.waitUntil): Claude generation → save →
//      email → referral credit. Errors flip status=failed with reason.
//
// Why background: Sonnet 4.5 with 8k tokens + locale translation can take
// 60-120s, and Supabase Edge requests are killed after 150s of idle bytes.
// EdgeRuntime.waitUntil keeps the worker alive past the HTTP response (up
// to the Edge wall-clock ceiling, ~400s on Pro).
//
// Required secrets (supabase secrets set):
//   ANTHROPIC_API_KEY
//   RESEND_API_KEY
//   RESEND_FROM_EMAIL
//   SITE_URL              (e.g. https://checkvisamap.com)
//   SUPABASE_URL          (auto-provided)
//   SUPABASE_SERVICE_ROLE_KEY  (auto-provided)

import { generateTripPlan } from "./generator.ts";
import { sendPlanReadyEmail } from "./email.ts";
import {
  claimPlanForGeneration,
  savePlanResult,
  setPlanFailed,
} from "./plans.ts";
import { awardCredit } from "./referrals.ts";
import type { PlanRequest } from "./types.ts";

interface DatabaseWebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  // deno-lint-ignore no-explicit-any
  record: any;
  // deno-lint-ignore no-explicit-any
  old_record: any;
}

Deno.serve(async (req) => {
  // Method check
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Parse payload
  let body: DatabaseWebhookPayload;
  try {
    body = (await req.json()) as DatabaseWebhookPayload;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Filter: only UPDATE events on the `plans` table
  if (body.type !== "UPDATE" || body.table !== "plans") {
    return new Response(
      JSON.stringify({ ok: true, ignored: `${body.type} on ${body.table}` }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }

  const record = body.record;
  const oldRecord = body.old_record;

  // Only fire on transition INTO paid (not stale events)
  if (record?.status !== "paid") {
    return json({ ok: true, ignored: `status=${record?.status}` });
  }
  if (oldRecord?.status === "paid") {
    return json({ ok: true, ignored: "already was paid before this event" });
  }

  const planId = record.id as string;
  if (!planId) {
    return new Response("record missing id", { status: 400 });
  }

  console.log(`[generate-plan] Claiming planId=${planId}`);

  // Idempotency claim — atomic paid → generating transition
  const claimed = await claimPlanForGeneration(planId).catch((err) => {
    console.error("claimPlanForGeneration threw", { planId, err });
    return null;
  });
  if (!claimed) {
    return json({ ok: true, skipped: "already claimed by another instance" });
  }

  const request = claimed.request as PlanRequest;
  const email = claimed.email as string;

  // Kick Claude generation into the background — the HTTP response returns
  // immediately below so we don't hit the 150s idle timeout.
  const work = (async () => {
    try {
      console.log(`[generate-plan] Generating for ${request.destination}`);
      const generated = await generateTripPlan(request);

      console.log(`[generate-plan] Saving result for planId=${planId}`);
      await savePlanResult(planId, generated);

      console.log(`[generate-plan] Sending email to ${email}`);
      await sendPlanReadyEmail({
        to: email,
        planId,
        destination: request.destination,
        locale: request.locale,
      });

      if (request.referredByCode) {
        await awardCredit(request.referredByCode, email).catch((err) => {
          console.error("awardCredit failed (non-fatal)", { planId, err });
        });
      }

      console.log(`[generate-plan] Complete for planId=${planId}`);
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      console.error("[generate-plan] FAILED", { planId, reason, err });
      await setPlanFailed(planId, reason).catch((e) =>
        console.error("setPlanFailed also threw", e)
      );
    }
  })();

  // EdgeRuntime is Supabase's runtime handle. waitUntil keeps the isolate
  // alive after the HTTP response is sent, up to the wall-clock ceiling.
  // deno-lint-ignore no-explicit-any
  const rt = (globalThis as any).EdgeRuntime;
  if (rt && typeof rt.waitUntil === "function") {
    rt.waitUntil(work);
  } else {
    console.warn("[generate-plan] EdgeRuntime.waitUntil unavailable — awaiting inline");
    await work;
  }

  return json({ ok: true, planId, status: "generating" });
});

// deno-lint-ignore no-explicit-any
function json(body: any, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
