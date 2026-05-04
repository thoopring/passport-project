import { Resend } from "resend";
import type { PlanLocale } from "../types/trip-plan";
import { getDestinationHeroUrl } from "./destinations/heroes";

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
  /** Optional traveler type from the wizard (solo / couple / family-with-
   *  kids / group-of-friends / senior). Drives the personalized tagline
   *  under the headline so the email echoes the buyer's actual inputs.
   *  Falls back to a generic line when missing or unmapped. */
  travelerType?: string;
}

type TravelerKey =
  | "default"
  | "solo"
  | "couple"
  | "family"
  | "friends"
  | "senior";

interface LocalizedCopy {
  subject: (destination: string) => string;
  preheader: string;
  heading: (destination: string) => string;
  /** Personalized tagline below the heading, keyed by traveler type. */
  craftedFor: Record<TravelerKey, string>;
  intro: string;
  viewButton: string;
  orDownload: string;
  pdfLinkLabel: string;
  bookmarkNote: string;
  brandTagline: string;
  brandLine: string;
}

const COPY: Record<PlanLocale, LocalizedCopy> = {
  en: {
    subject: (d) => `Your ${d} trip plan is ready`,
    preheader: "Open the plan, download the PDF, and start packing.",
    heading: (d) => `Your ${d} trip plan is ready`,
    craftedFor: {
      default: "Crafted for you",
      solo: "Built around your solo pace",
      couple: "Crafted for the two of you",
      family: "Tuned for the whole family",
      friends: "Made for the group",
      senior: "Paced gently — every step easy",
    },
    intro:
      "Thanks for your order. The full day-by-day plan is now live, with a route map, hotel pick, airport transit, and restaurant notes you'll actually use.",
    viewButton: "View your plan",
    orDownload: "Prefer offline? Download the PDF:",
    pdfLinkLabel: "Download PDF",
    bookmarkNote:
      "Bookmark the plan link so you can pull it up on your phone during the trip — it's mobile-ready.",
    brandTagline: "A traveled-in plan, ready before you pack.",
    brandLine: "gliddy · checkvisamap.com",
  },
  ko: {
    subject: (d) => `${d} 여행 계획이 준비됐어요`,
    preheader: "플랜 열어보고, PDF 다운받고, 짐 싸기 시작하세요.",
    heading: (d) => `${d} 여행 계획이 준비됐어요`,
    craftedFor: {
      default: "당신을 위해 다듬은 플랜",
      solo: "혼자만의 페이스에 맞춘 플랜",
      couple: "두 분을 위해 다듬은 플랜",
      family: "온 가족을 위해 조율된 플랜",
      friends: "친구들과 함께하기 좋게 짠 플랜",
      senior: "여유롭게 즐길 수 있도록 다듬은 플랜",
    },
    intro:
      "주문해 주셔서 감사해요. 동선 지도, 호텔 추천, 공항 이동, 식당 메모까지 — 진짜 들고 다닐 일별 일정으로 만들어 드렸어요.",
    viewButton: "여행 계획 열어보기",
    orDownload: "오프라인으로 보고 싶으시면 PDF로 받으세요:",
    pdfLinkLabel: "PDF 다운로드",
    bookmarkNote:
      "여행 중 폰에서 바로 열 수 있도록 플랜 링크를 즐겨찾기에 추가해 두세요. 모바일에서 깔끔하게 열려요.",
    brandTagline: "다녀온 사람이 짠 듯한 플랜, 짐 싸기 전에 도착해요.",
    brandLine: "gliddy · checkvisamap.com",
  },
  ja: {
    subject: (d) => `${d}の旅程が完成しました`,
    preheader: "プランを開いて、PDFを保存して、荷造りを始めましょう。",
    heading: (d) => `${d}の旅程が完成しました`,
    craftedFor: {
      default: "あなたのために仕立てた旅程",
      solo: "ひとり旅のペースに合わせた旅程",
      couple: "おふたりのために仕立てた旅程",
      family: "ご家族みんなに合わせて整えた旅程",
      friends: "仲間と過ごす時間にフィットした旅程",
      senior: "ゆったり歩めるよう調整した旅程",
    },
    intro:
      "ご注文ありがとうございます。動線マップ、ホテル選び、空港アクセス、レストランメモまで、実際に持ち歩ける日別の旅程に仕上げました。",
    viewButton: "旅程を開く",
    orDownload: "オフラインで読みたい方はPDFをどうぞ:",
    pdfLinkLabel: "PDFをダウンロード",
    bookmarkNote:
      "旅行中にスマホですぐ開けるよう、リンクをブックマークしておくと便利です。モバイルで快適に表示されます。",
    brandTagline: "旅した人が書いたようなプラン。荷造り前にお手元へ。",
    brandLine: "gliddy · checkvisamap.com",
  },
  zh: {
    subject: (d) => `您的 ${d} 行程已经准备好`,
    preheader: "打开计划,下载 PDF,开始打包行李吧。",
    heading: (d) => `您的 ${d} 行程已经准备好`,
    craftedFor: {
      default: "为您量身打造的行程",
      solo: "贴合您独自旅行的节奏",
      couple: "为两位精心安排的行程",
      family: "为全家人调整的行程",
      friends: "贴合朋友同行的安排",
      senior: "舒缓步调,每一步都轻松",
    },
    intro:
      "感谢您的购买。从路线地图、酒店推荐、机场接送到餐厅备注 — 我们把它们整合成一份真正能带着上路的日程。",
    viewButton: "查看您的行程",
    orDownload: "想离线查看?直接下载 PDF:",
    pdfLinkLabel: "下载 PDF",
    bookmarkNote:
      "建议把链接加入书签,旅途中用手机就能随时打开,移动端阅读体验已优化。",
    brandTagline: "像旅行过的人写的行程,打包前就送到手中。",
    brandLine: "gliddy · checkvisamap.com",
  },
  fr: {
    subject: (d) => `Votre plan pour ${d} est prêt`,
    preheader: "Ouvrez le plan, téléchargez le PDF, et préparez vos valises.",
    heading: (d) => `Votre plan pour ${d} est prêt`,
    craftedFor: {
      default: "Conçu pour vous",
      solo: "Construit autour de votre rythme solo",
      couple: "Pensé pour vous deux",
      family: "Calibré pour toute la famille",
      friends: "Pour le groupe, ensemble",
      senior: "Au rythme tranquille, chaque pas facile",
    },
    intro:
      "Merci pour votre commande. La carte d'itinéraire, l'hôtel, le trajet aéroport et les notes de restaurants — tout est rassemblé dans un planning jour par jour que vous pourrez réellement emporter.",
    viewButton: "Voir votre plan",
    orDownload: "Vous préférez hors ligne ? Téléchargez le PDF :",
    pdfLinkLabel: "Télécharger le PDF",
    bookmarkNote:
      "Ajoutez le lien à vos favoris pour le retrouver depuis votre téléphone pendant le voyage — l'affichage mobile est soigné.",
    brandTagline: "Un plan vécu, prêt avant que vous fassiez vos valises.",
    brandLine: "gliddy · checkvisamap.com",
  },
};

/** Map TripPlan request.travelerType to the COPY.craftedFor sub-key.
 *  Mirrors the in-browser plan view's travelerKeyFor() so the email
 *  tagline matches what the buyer sees on the site. */
function travelerKeyFor(travelerType?: string): TravelerKey {
  switch (travelerType) {
    case "solo":
      return "solo";
    case "couple":
      return "couple";
    case "family-with-kids":
      return "family";
    case "group-of-friends":
      return "friends";
    case "senior":
      return "senior";
    default:
      return "default";
  }
}

export async function sendPlanReadyEmail(args: PlanReadyArgs): Promise<void> {
  const client = getClient();
  const from = process.env.RESEND_FROM_EMAIL || "gliddy <plans@checkvisamap.com>";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://checkvisamap.com";
  const planUrl = `${baseUrl}/plan/${args.planId}`;
  const pdfUrl = `${baseUrl}/api/plan/${args.planId}/pdf`;
  const copy = COPY[args.locale ?? "en"];
  const travelerKey = travelerKeyFor(args.travelerType);
  const taglineText = copy.craftedFor[travelerKey];

  // Hero photo from the same destination catalog the site/PDF use.
  // Skipped when the destination isn't in the curated set so the email
  // doesn't show a broken image (better: clean text-only header).
  // Email <img src> needs ABSOLUTE URLs — relative paths don't resolve
  // in a mail client. The catalog returns "/destinations/..." for
  // self-hosted entries; we prefix with the public site URL so the
  // mail client fetches from the same Vercel CDN the site uses.
  const rawHeroUrl = getDestinationHeroUrl(args.destination, 1200);
  const heroUrl = rawHeroUrl?.startsWith("/")
    ? `${baseUrl}${rawHeroUrl}`
    : rawHeroUrl;

  const subject = copy.subject(args.destination);

  // Brand tokens — must be inline literal hex; email clients strip
  // <style> blocks and CSS variables.
  const TOKEN = {
    bg: "#FFFCF7", // warm paper
    text: "#161615",
    muted: "#5A5751",
    brand: "#FF6B6B", // coral
    border: "#EDE6D6",
    surface: "#FBF7EE",
  };

  // Layout uses outer <table> for Outlook compat — Outlook on Windows
  // ignores div widths and renders email-content full-bleed without it.
  // Inner content uses divs since they render fine in modern clients.
  // Hidden preheader text is the snippet shown in inbox preview lists.
  const html = `<!doctype html>
<html lang="${args.locale ?? "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${TOKEN.surface};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Pretendard Variable',Pretendard,Inter,'Helvetica Neue',Arial,sans-serif;color:${TOKEN.text};">
  <!-- Preheader: hidden text shown in inbox preview row -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${TOKEN.surface};">
    ${escapeHtml(copy.preheader)}
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${TOKEN.surface};">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:${TOKEN.bg};border:1px solid ${TOKEN.border};border-radius:12px;overflow:hidden;">
          <!-- Brand header -->
          <tr>
            <td style="padding:20px 28px;border-bottom:1px solid ${TOKEN.border};">
              <div style="font-weight:800;font-size:22px;letter-spacing:-0.02em;color:${TOKEN.text};">gliddy</div>
            </td>
          </tr>
          ${
            heroUrl
              ? `<!-- Hero photo (destination) -->
          <tr>
            <td style="padding:0;">
              <img src="${heroUrl}" alt="${escapeHtml(args.destination)}" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0;" />
            </td>
          </tr>`
              : ""
          }
          <!-- Content -->
          <tr>
            <td style="padding:28px 28px 8px;">
              <h1 style="margin:0 0 8px;font-size:26px;line-height:1.15;letter-spacing:-0.02em;color:${TOKEN.text};">
                ${escapeHtml(copy.heading(args.destination))}
              </h1>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.4;font-style:italic;color:${TOKEN.brand};">
                ${escapeHtml(taglineText)}
              </p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${TOKEN.muted};">
                ${escapeHtml(copy.intro)}
              </p>
            </td>
          </tr>
          <!-- Primary CTA — table-wrapped so it stays a button on Outlook -->
          <tr>
            <td style="padding:0 28px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="${TOKEN.brand}" style="border-radius:8px;">
                    <a href="${planUrl}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
                      ${escapeHtml(copy.viewButton)} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Secondary: PDF download -->
          <tr>
            <td style="padding:24px 28px 8px;">
              <p style="margin:0 0 6px;font-size:14px;color:${TOKEN.muted};">
                ${escapeHtml(copy.orDownload)}
              </p>
              <a href="${pdfUrl}" style="font-size:14px;color:${TOKEN.brand};text-decoration:underline;">
                ${escapeHtml(copy.pdfLinkLabel)}
              </a>
            </td>
          </tr>
          <!-- Bookmark note -->
          <tr>
            <td style="padding:20px 28px 28px;">
              <p style="margin:0;padding:14px 16px;font-size:13px;line-height:1.5;color:${TOKEN.muted};background:${TOKEN.surface};border-radius:8px;">
                ${escapeHtml(copy.bookmarkNote)}
              </p>
            </td>
          </tr>
          <!-- Brand band footer -->
          <tr>
            <td style="padding:20px 28px;background:${TOKEN.text};color:#ffffff;border-radius:0 0 12px 12px;">
              <div style="font-size:14px;font-weight:600;color:#ffffff;margin-bottom:4px;">gliddy</div>
              <div style="font-size:13px;color:rgba(255,255,255,0.7);line-height:1.5;">
                ${escapeHtml(copy.brandTagline)}
              </div>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:12px;color:${TOKEN.muted};">
          ${escapeHtml(copy.brandLine)}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `${copy.heading(args.destination)}\n${taglineText}\n\n${copy.intro}\n\n${copy.viewButton}: ${planUrl}\n${copy.pdfLinkLabel}: ${pdfUrl}\n\n${copy.bookmarkNote}\n\n${copy.brandLine}`;

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
