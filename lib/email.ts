import { Resend } from "resend";

/**
 * Email delivery via Resend.
 *
 * Required env:
 *   RESEND_API_KEY
 *   RESEND_FROM_EMAIL    e.g. "Passport Power <plans@checkvisamap.com>"
 *
 * The sender domain must be verified in Resend before production use.
 */

let cached: Resend | null = null;
function getClient(): Resend {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  cached = new Resend(key);
  return cached;
}

interface PlanReadyArgs {
  to: string;
  planId: string;
  destination: string;
}

export async function sendPlanReadyEmail(args: PlanReadyArgs): Promise<void> {
  const client = getClient();
  const from = process.env.RESEND_FROM_EMAIL || "Passport Power <plans@checkvisamap.com>";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://checkvisamap.com";
  const planUrl = `${baseUrl}/plan/${args.planId}`;
  const pdfUrl = `${baseUrl}/api/plan/${args.planId}/pdf`;

  const subject = `Your ${args.destination} trip plan is ready`;

  const html = `<!doctype html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
  <h1 style="font-size: 24px; margin: 0 0 16px;">Your ${escapeHtml(args.destination)} trip plan is ready</h1>
  <p style="font-size: 15px; line-height: 1.6; color: #555;">Thanks for your order! Your personalized day-by-day itinerary is now live.</p>
  <div style="margin: 28px 0;">
    <a href="${planUrl}" style="display: inline-block; padding: 12px 22px; background: #1a4d2e; color: #fff; text-decoration: none; border-radius: 10px; font-weight: 600;">View your plan</a>
  </div>
  <p style="font-size: 14px; color: #666;">Or download the PDF directly:</p>
  <p style="font-size: 14px;"><a href="${pdfUrl}" style="color: #1a4d2e;">${pdfUrl}</a></p>
  <hr style="border: 0; border-top: 1px solid #eee; margin: 32px 0;" />
  <p style="font-size: 13px; color: #999;">Bookmark the link above so you can pull up your itinerary on the trip.</p>
  <p style="font-size: 13px; color: #999;">Passport Power · checkvisamap.com</p>
</body>
</html>`;

  const text = `Your ${args.destination} trip plan is ready.\n\nView: ${planUrl}\nPDF: ${pdfUrl}\n\nPassport Power`;

  await client.emails.send({
    from,
    to: args.to,
    subject,
    html,
    text,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
