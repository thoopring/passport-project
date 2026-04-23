# Migration: Sync Webhook → Async Edge Function

> ## ⚠️ NOT ADOPTED (as of 2026-04-23)
>
> This migration was attempted and **blocked** on the Supabase **Free** tier.
> We measured the real Anthropic latency for a 3-day Korean plan at ~137s
> (hits the 8000-token ceiling). Adding the optimize pass (~15-20s) lands
> total generation at ~155s, which exceeds Supabase Free's **150s wall-clock
> ceiling** per Edge Function invocation — the isolate is killed mid-run.
>
> `EdgeRuntime.waitUntil()` does not help, because the wall clock is a
> runtime limit, not a request-idle limit: the isolate itself is bounded.
>
> Economics:
>
> | Path                 | $/mo | Code       | Quality | Status                 |
> |----------------------|-----:|------------|---------|------------------------|
> | Vercel Pro (adopted) |  $20 | zero delta | 100%    | **launched**           |
> | Supabase Pro         |  $25 | this dir   | 100%    | worse economics        |
> | Edge Free + shrink   |   $0 | this dir   | degraded| rejected on quality    |
>
> The scaffold is kept in-repo for a possible v1.1 revisit if we ever pay
> for Supabase Pro (400s wall clock) — at which point the code below is
> still the correct deploy path. **Do not redeploy `generate-plan` on Free
> tier** — the DB webhook will race the Vercel webhook and waste quota.
>
> `supabase/functions/` is excluded from `tsconfig.json` so the Deno-style
> npm-prefix imports don't break the Next.js build.
>
> ---

Moving Claude plan generation off the Vercel webhook and onto a Supabase
Edge Function. This lets us stay on Vercel **Hobby** ($0) instead of Pro
($20/mo), and gives us proper queue-style retry/observability.

## Architecture

```
LS payment webhook
  ↓
Vercel webhook (fast, <3s)  ←── refactored: just verify + markPlanPaid
  ↓ UPDATE plans.status='paid'
  │
  │  [Supabase DB Webhook fires]
  ↓
Supabase Edge Function (Deno, up to 150s)  ←── does the heavy lifting
  · claim (paid → generating, idempotent)
  · Claude generation
  · savePlanResult
  · sendPlanReadyEmail (Resend)
  · awardCredit (referrals)
```

Already-written code lives in `supabase/functions/generate-plan/`.

## Prerequisites

- Supabase CLI installed. Check:
  ```bash
  supabase --version
  ```
  If missing: https://supabase.com/docs/guides/local-development/cli/getting-started

  Windows: `scoop install supabase` or `npm install -g supabase`
  macOS/Linux: `brew install supabase/tap/supabase`

- Logged in: `supabase login` (opens browser)

- Project linked: `supabase link --project-ref <PROJECT-REF>`
  Find ref in Supabase dashboard URL: `https://supabase.com/dashboard/project/<REF>`

## Step 1 — Set Edge Function secrets

Edge Functions can't read `.env.local`. Set them once per project:

```bash
supabase secrets set ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxx"
supabase secrets set RESEND_API_KEY="re_xxxxxxxxxxxx"
supabase secrets set RESEND_FROM_EMAIL="gliddy <plans@checkvisamap.com>"
supabase secrets set SITE_URL="https://checkvisamap.com"
```

Note: `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are auto-injected — don't set them.

Verify:
```bash
supabase secrets list
```

## Step 2 — Deploy the function

From the repo root:

```bash
supabase functions deploy generate-plan
```

First deploy takes ~30s. Output looks like:
```
Deploying generate-plan (project ref: xxxxx)
Bundling generate-plan
Deploying Function
Function generate-plan deployed at https://xxxxx.supabase.co/functions/v1/generate-plan
```

**Note the URL** — you'll paste it into the DB webhook config.

## Step 3 — Configure Supabase Database Webhook

Dashboard UI path:

1. https://supabase.com/dashboard/project/<REF>/database/hooks
2. **Create a new hook**
3. Fill in:
   - **Name**: `trigger-plan-generation`
   - **Table**: `plans`
   - **Events**: ✅ UPDATE (leave INSERT/DELETE unchecked)
   - **Type**: **Supabase Edge Functions**
   - **Edge Function**: `generate-plan` (from dropdown)
   - **HTTP method**: POST (default)
   - **HTTP headers**: `Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>` is auto-added
4. **Create webhook**

The Edge Function payload will contain the full updated row, including the
`request` JSON. Our function filters: only acts when `record.status='paid'`
and `old_record.status != 'paid'`.

## Step 4 — Test the Edge Function in isolation

Pick any existing plan in the `plans` table (or create a test row):

```sql
-- Run in Supabase SQL Editor
-- 1) Insert a dummy draft plan
insert into public.plans (email, request, status)
values (
  'your-test-email@gmail.com',
  '{
    "destination": "Tokyo",
    "destinationCountry": "Japan",
    "durationDays": 3,
    "arrivalAirport": "NRT",
    "travelerType": "solo",
    "adults": 1,
    "interests": ["food", "culture"],
    "budgetTier": "midrange",
    "pace": "balanced",
    "email": "your-test-email@gmail.com",
    "locale": "en"
  }'::jsonb,
  'draft'
)
returning id;
-- Note the returned id.

-- 2) Flip to 'paid' — this fires the webhook → Edge Function
update public.plans
set status='paid', paid_at=now()
where id = '<THE-ID>';
```

Then:
- Watch Edge Function logs: `supabase functions logs generate-plan --tail`
- OR: Dashboard → Functions → `generate-plan` → Logs

Expected log sequence:
```
[generate-plan] Claiming planId=...
[generate-plan] Generating for Tokyo
[generate-plan] Saving result for planId=...
[generate-plan] Sending email to your-test-email@gmail.com
[generate-plan] Complete for planId=...
```

Takes ~30-60s total. Email arrives shortly after.

If the plan row ends at `status='complete'` and the email arrives: 🎉 **done.**

If it fails:
- Row will be `status='failed'` with `failure_reason` populated
- Logs show the stack trace
- Fix, delete the failed row, retry

## Step 5 — Refactor the Vercel webhook (ONLY AFTER step 4 passes)

**Warning:** doing this step before the Edge Function works will break production.

Replace `app/api/webhooks/lemon-squeezy/route.ts` contents with the code
block below. Remove all Claude/email/referral calls — the Edge Function now
owns them.

```typescript
import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "../../../../lib/lemonsqueezy";
import { getPlan, markPlanPaid } from "../../../../lib/plans";

export const runtime = "nodejs";
// Can drop back from 300 → 60. Pro no longer required.
export const maxDuration = 60;

/**
 * POST /api/webhooks/lemon-squeezy
 *
 * Refactored to async: we just verify the payment and flip the row to
 * 'paid'. A Supabase Database Webhook detects the status change and
 * invokes the `generate-plan` Edge Function to do the heavy work.
 *
 * See docs/MIGRATE_TO_ASYNC.md for the full architecture.
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let event: {
    meta?: { event_name?: string; custom_data?: { plan_id?: string } };
    data?: { id?: string };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const eventName = event?.meta?.event_name;
  const planId = event?.meta?.custom_data?.plan_id;
  const paymentId = event?.data?.id ?? "unknown";

  if (eventName !== "order_created") {
    return NextResponse.json({ ok: true, ignored: eventName });
  }

  if (!planId) {
    return NextResponse.json(
      { error: "Missing plan_id in custom_data" },
      { status: 400 }
    );
  }

  // Fast path: just record payment. Edge Function takes it from here.
  try {
    const plan = await getPlan(planId);
    if (!plan) {
      return NextResponse.json(
        { error: `Plan ${planId} not found` },
        { status: 404 }
      );
    }
    await markPlanPaid(planId, paymentId);
  } catch (err) {
    console.error("markPlanPaid failed", { planId, err });
    return NextResponse.json(
      { error: "Failed to record payment" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, planId, queuedForGeneration: true });
}
```

After saving: `git commit -m "refactor(webhook): move generation to Supabase Edge Function"` and `git push origin main`.

Vercel auto-deploys. The next real payment will flow:
1. LS → Vercel webhook (<2s) → `status='paid'`
2. Supabase DB webhook fires → Edge Function
3. Edge Function generates + emails

## Rollback plan

If something breaks in production:

1. Revert the webhook commit: `git revert HEAD && git push`
2. The old sync code comes back
3. Upgrade to Vercel Pro temporarily
4. Debug the Edge Function separately (log analysis)
5. Re-attempt migration

The Edge Function itself stays deployed (harmless if not triggered). Just
disable the DB Webhook in the Supabase dashboard if needed.

## Cost impact

- Vercel: stays on Hobby (**$0/mo**)
- Supabase Edge Functions: free tier **500k invocations/mo** (we'll hit ~30/day
  at launch = ~900/mo, negligible)
- Anthropic: same as before (~$0.15 per plan)
- Resend: same (~free at our volume)

**Net savings: $20/mo = $240/year.**

## Notes

- The Edge Function uses `npm:` specifier imports (Deno 1.28+ feature). All
  pinned to the same versions as the Next.js app's `package.json` to keep
  behavior identical.
- Idempotency is enforced by an atomic UPDATE with `WHERE status='paid'`.
  Duplicate webhook deliveries (Supabase retries) are safe.
- Failed generations leave the row at `status='failed'` with a reason —
  manually refundable / retryable.
- PDF generation stays on Vercel (rendered on demand at `/api/plan/[id]/pdf`).
