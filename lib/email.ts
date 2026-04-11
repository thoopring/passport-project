import { Resend } from "resend";
import type { PlanLocale } from "../types/trip-plan";

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
  /** Locale to send the email in. Defaults to English. */
  locale?: PlanLocale;
}

interface LocalizedCopy {
  subject: (destination: string) => string;
  heading: (destination: string) => string;
  intro: string;
  viewButton: string;
  orDownload: string;
  bookmarkNote: string;
  brandLine: string;
}

const COPY: Record<PlanLocale, LocalizedCopy> = {
  en: {
    subject: (d) => `Your ${d} trip plan is ready`,
    heading: (d) => `Your ${d} trip plan is ready`,
    intro: "Thanks for your order! Your personalized day-by-day itinerary is now live.",
    viewButton: "View your plan",
    orDownload: "Or download the PDF directly:",
    bookmarkNote: "Bookmark the link above so you can pull up your itinerary on the trip.",
    brandLine: "Passport Power · checkvisamap.com",
  },
  ko: {
    subject: (d) => `${d} 여행 계획이 준비되었습니다`,
    heading: (d) => `${d} 여행 계획이 준비되었습니다`,
    intro: "주문해 주셔서 감사합니다! 맞춤형 일별 여행 일정이 준비되었습니다.",
    viewButton: "여행 계획 보기",
    orDownload: "또는 PDF를 직접 다운로드하세요:",
    bookmarkNote: "여행 중에 일정을 바로 열어보실 수 있도록 위 링크를 즐겨찾기에 추가하세요.",
    brandLine: "Passport Power · checkvisamap.com",
  },
  ja: {
    subject: (d) => `${d}の旅程が完成しました`,
    heading: (d) => `${d}の旅程が完成しました`,
    intro: "ご注文ありがとうございます!パーソナライズされた日別の旅程が準備できました。",
    viewButton: "旅程を見る",
    orDownload: "またはPDFを直接ダウンロード:",
    bookmarkNote: "旅行中にすぐ開けるよう、上記リンクをブックマークしてください。",
    brandLine: "Passport Power · checkvisamap.com",
  },
  zh: {
    subject: (d) => `您的${d}行程已准备好`,
    heading: (d) => `您的${d}行程已准备好`,
    intro: "感谢您的订购!您的个性化每日行程现已就绪。",
    viewButton: "查看您的行程",
    orDownload: "或直接下载 PDF:",
    bookmarkNote: "请将上方链接加入书签,以便旅途中随时查看您的行程。",
    brandLine: "Passport Power · checkvisamap.com",
  },
};

export async function sendPlanReadyEmail(args: PlanReadyArgs): Promise<void> {
  const client = getClient();
  const from = process.env.RESEND_FROM_EMAIL || "Passport Power <plans@checkvisamap.com>";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://checkvisamap.com";
  const planUrl = `${baseUrl}/plan/${args.planId}`;
  const pdfUrl = `${baseUrl}/api/plan/${args.planId}/pdf`;
  const copy = COPY[args.locale ?? "en"];

  const subject = copy.subject(args.destination);

  const html = `<!doctype html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
  <h1 style="font-size: 24px; margin: 0 0 16px;">${escapeHtml(copy.heading(args.destination))}</h1>
  <p style="font-size: 15px; line-height: 1.6; color: #555;">${copy.intro}</p>
  <div style="margin: 28px 0;">
    <a href="${planUrl}" style="display: inline-block; padding: 12px 22px; background: #1a4d2e; color: #fff; text-decoration: none; border-radius: 10px; font-weight: 600;">${copy.viewButton}</a>
  </div>
  <p style="font-size: 14px; color: #666;">${copy.orDownload}</p>
  <p style="font-size: 14px;"><a href="${pdfUrl}" style="color: #1a4d2e;">${pdfUrl}</a></p>
  <hr style="border: 0; border-top: 1px solid #eee; margin: 32px 0;" />
  <p style="font-size: 13px; color: #999;">${copy.bookmarkNote}</p>
  <p style="font-size: 13px; color: #999;">${copy.brandLine}</p>
</body>
</html>`;

  const text = `${copy.heading(args.destination)}\n\n${copy.viewButton}: ${planUrl}\nPDF: ${pdfUrl}\n\n${copy.brandLine}`;

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
