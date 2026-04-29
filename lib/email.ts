import { Resend } from "resend";
import type { PlanLocale } from "../types/trip-plan";

/**
 * Email delivery via Resend.
 *
 * Required env:
 *   RESEND_API_KEY
 *   RESEND_FROM_EMAIL    e.g. "gliddy <plans@checkvisamap.com>"
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
    brandLine: "gliddy · checkvisamap.com",
  },
  ko: {
    subject: (d) => `${d} 여행 계획이 준비됐어요`,
    heading: (d) => `${d} 여행 계획이 준비됐어요`,
    intro: "주문해 주셔서 감사합니다! 맞춤형 일별 여행 일정이 도착했어요.",
    viewButton: "여행 계획 보기",
    orDownload: "또는 PDF를 바로 다운로드하세요:",
    bookmarkNote: "여행 중에 바로 열어보실 수 있게 위 링크를 즐겨찾기에 추가해두세요.",
    brandLine: "gliddy · checkvisamap.com",
  },
  ja: {
    subject: (d) => `${d}の旅程が完成しました`,
    heading: (d) => `${d}の旅程が完成しました`,
    intro: "ご注文ありがとうございます!あなただけの日別旅程が出来上がりました。",
    viewButton: "旅程を見る",
    orDownload: "PDFをそのままダウンロードする場合はこちら:",
    bookmarkNote: "旅行中すぐ開けるよう、上のリンクをブックマークしておくと便利です。",
    brandLine: "gliddy · checkvisamap.com",
  },
  zh: {
    subject: (d) => `您的 ${d} 行程已经准备好`,
    heading: (d) => `您的 ${d} 行程已经准备好`,
    intro: "感谢您的购买!您的专属每日行程已经准备好了。",
    viewButton: "查看您的行程",
    orDownload: "或直接下载 PDF:",
    bookmarkNote: "建议将上方链接加入书签,旅途中可以随时查看您的行程。",
    brandLine: "gliddy · checkvisamap.com",
  },
  fr: {
    subject: (d) => `Votre plan pour ${d} est prêt`,
    heading: (d) => `Votre plan pour ${d} est prêt`,
    intro: "Merci pour votre commande ! Votre itinéraire jour par jour personnalisé est prêt.",
    viewButton: "Voir votre plan",
    orDownload: "Ou téléchargez le PDF directement :",
    bookmarkNote: "Ajoutez le lien ci-dessus à vos favoris pour le retrouver pendant le voyage.",
    brandLine: "gliddy · checkvisamap.com",
  },
};

export async function sendPlanReadyEmail(args: PlanReadyArgs): Promise<void> {
  const client = getClient();
  const from = process.env.RESEND_FROM_EMAIL || "gliddy <plans@checkvisamap.com>";
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
    <a href="${planUrl}" style="display: inline-block; padding: 12px 22px; background: #D4442B; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">${copy.viewButton}</a>
  </div>
  <p style="font-size: 14px; color: #666;">${copy.orDownload}</p>
  <p style="font-size: 14px;"><a href="${pdfUrl}" style="color: #D4442B;">${pdfUrl}</a></p>
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

/* ========== Referral credit earned notification (N5) ========== */

interface CreditEarnedCopy {
  subject: string;
  heading: string;
  intro: string;
  bullet1: string;
  bullet2: string;
  cta: string;
  outro: string;
  brandLine: string;
}

const CREDIT_COPY: Record<PlanLocale, CreditEarnedCopy> = {
  en: {
    subject: "🎉 You earned 25% off your next plan",
    heading: "You earned 25% off",
    intro:
      "Someone just bought their first plan with your referral link — thank you for sharing gliddy.",
    bullet1: "25% off your next plan added to your account",
    bullet2: "We'll apply it automatically at checkout",
    cta: "Open my account",
    outro: "Discount expires one year from today.",
    brandLine: "gliddy · checkvisamap.com",
  },
  ko: {
    subject: "🎉 다음 플랜 25% 할인 적립됐어요",
    heading: "25% 할인이 적립됐어요",
    intro:
      "추천 링크로 누군가 첫 플랜을 구매했어요 — gliddy를 공유해 주셔서 감사합니다.",
    bullet1: "다음 플랜에 사용 가능한 25% 할인 크레딧 추가",
    bullet2: "결제 시 자동으로 적용돼요",
    cta: "내 계정 열기",
    outro: "할인은 1년 동안 사용 가능해요.",
    brandLine: "gliddy · checkvisamap.com",
  },
  ja: {
    subject: "🎉 次のプラン25%オフが付与されました",
    heading: "25%オフが付与されました",
    intro:
      "あなたの紹介リンクから初めての購入がありました — gliddyをシェアしてくださりありがとうございます。",
    bullet1: "次のプランで使える25%オフクーポンを追加",
    bullet2: "決済時に自動で適用されます",
    cta: "マイアカウントを開く",
    outro: "クーポンの有効期限は1年です。",
    brandLine: "gliddy · checkvisamap.com",
  },
  zh: {
    subject: "🎉 您获得了下一份行程 25% 折扣",
    heading: "您获得了 25% 折扣",
    intro:
      "有人通过您的推荐链接购买了第一份行程 — 感谢您分享 gliddy。",
    bullet1: "下一份行程 25% 折扣券已加入您的账户",
    bullet2: "付款时自动应用",
    cta: "打开我的账户",
    outro: "折扣有效期为一年。",
    brandLine: "gliddy · checkvisamap.com",
  },
  fr: {
    subject: "🎉 Vous avez gagné 25 % sur votre prochain plan",
    heading: "Vous avez gagné 25 % de réduction",
    intro:
      "Quelqu'un vient d'acheter son premier plan via votre lien — merci d'avoir partagé gliddy.",
    bullet1: "25 % de réduction sur votre prochain plan ajoutés à votre compte",
    bullet2: "On l'applique automatiquement au paiement",
    cta: "Ouvrir mon compte",
    outro: "La réduction expire un an après son attribution.",
    brandLine: "gliddy · checkvisamap.com",
  },
};

interface CreditEarnedArgs {
  to: string;
  locale?: PlanLocale;
}

export async function sendReferralCreditEarnedEmail(
  args: CreditEarnedArgs,
): Promise<void> {
  const client = getClient();
  const from = process.env.RESEND_FROM_EMAIL || "gliddy <plans@checkvisamap.com>";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://checkvisamap.com";
  const accountUrl = `${baseUrl}/account`;
  const copy = CREDIT_COPY[args.locale ?? "en"];

  const html = `<!doctype html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
  <h1 style="font-size: 26px; margin: 0 0 16px;">${escapeHtml(copy.heading)}</h1>
  <p style="font-size: 15px; line-height: 1.6; color: #555;">${escapeHtml(copy.intro)}</p>
  <ul style="font-size: 15px; line-height: 1.7; color: #1a1a1a; padding-left: 18px; margin: 20px 0;">
    <li>${escapeHtml(copy.bullet1)}</li>
    <li>${escapeHtml(copy.bullet2)}</li>
  </ul>
  <div style="margin: 28px 0;">
    <a href="${accountUrl}" style="display: inline-block; padding: 12px 22px; background: #FF6B6B; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">${escapeHtml(copy.cta)}</a>
  </div>
  <hr style="border: 0; border-top: 1px solid #eee; margin: 32px 0;" />
  <p style="font-size: 13px; color: #999;">${escapeHtml(copy.outro)}</p>
  <p style="font-size: 13px; color: #999;">${escapeHtml(copy.brandLine)}</p>
</body>
</html>`;

  const text = `${copy.heading}\n\n${copy.intro}\n\n• ${copy.bullet1}\n• ${copy.bullet2}\n\n${copy.cta}: ${accountUrl}\n\n${copy.outro}\n${copy.brandLine}`;

  await client.emails.send({
    from,
    to: args.to,
    subject: copy.subject,
    html,
    text,
  });
}
