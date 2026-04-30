import type { Locale } from "../../i18n/locales";

export type TermsSection =
  | { heading: string; body: string }
  | { heading: string; bodies: string[] }
  | { heading: string; list: string[] };

export interface TermsContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  lastUpdated: string;
  acceptancePrefix: string;
  acceptanceMid: string;
  acceptanceAnd: string;
  acceptanceSuffix: string;
  refundsPrefix: string;
  refundsSuffix: string;
  privacyLabel: string;
  refundLabel: string;
  sections: TermsSection[];
  contactHeading: string;
  contactPrefix: string;
}

export const TERMS_CONTENT: Record<Locale, TermsContent> = {
  en: {
    metaTitle: "Terms of Service",
    metaDescription:
      "Terms of Service for gliddy — a one-time $4 AI trip planner. What you're buying, what we promise, and what we don't.",
    eyebrow: "Legal",
    headline: "Terms of Service",
    lastUpdated: "Last updated: April 23, 2026",
    privacyLabel: "Privacy Policy",
    refundLabel: "Refund Policy",
    acceptancePrefix: "By using this site, placing an order, or opening a generated plan, you agree to these Terms, our",
    acceptanceMid: ",",
    acceptanceAnd: "and our",
    acceptanceSuffix: ". If you do not agree, do not use the service.",
    refundsPrefix: "Our full refund policy is at",
    refundsSuffix:
      ". In short: we refund for technical failures and for plans that include clearly hallucinated places. We do not refund based on taste preferences.",
    sections: [
      {
        heading: "1. What gliddy is",
        body: "gliddy is a digital product. You provide a destination, duration, and a few preferences; we generate a personalized trip itinerary using Anthropic's Claude language model and deliver it to your email as a private web link plus a downloadable PDF. Each $4 purchase buys one plan. There is no subscription, no recurring charge, and no account.",
      },
      { heading: "2. Acceptance", body: "" },
      {
        heading: "3. Eligibility",
        body: "You must be at least 18 years old (or the age of majority in your jurisdiction) to make a purchase. If you are using the service on behalf of someone else, you represent that you have authority to do so and to bind them to these Terms.",
      },
      {
        heading: "4. Price, billing, and currency",
        body: "The price per plan is USD $4.00. Payment is processed by LemonSqueezy. Your statement will show a charge from Lemon Squeezy · gliddy. LemonSqueezy handles local currency conversion where applicable; the USD-equivalent amount is what you owe.",
      },
      {
        heading: "5. Delivery",
        body: "Plans are delivered to the email address you provide at checkout, typically within 5-10 minutes of successful payment. Check your spam folder if you do not see it within 15 minutes. The web link in the email is the canonical delivery — you can return to it any time. The PDF is a convenience copy for offline use.",
      },
      {
        heading: "6. What a plan is and isn't",
        list: [
          "A plan is a thoughtful starting point. Real travel always requires verification — opening hours, ticket availability, weather, closures, reservations. We expect you to check before you go.",
          "A plan is not a booking. We do not reserve hotels, flights, transit, tickets, or tables. You are responsible for all bookings and any fees or liabilities that result from them.",
          "A plan is not professional advice — medical, legal, visa, or otherwise. We do not advise on visa requirements or the safety of travel to a given destination.",
        ],
      },
      {
        heading: "7. Your responsibilities",
        list: [
          "Provide accurate inputs (destination, duration, interests).",
          "Do not resell or redistribute your plan as your own work.",
          "Do not attempt to reverse-engineer, scrape, or abuse the service.",
          "Do not use the service for any purpose prohibited by law.",
        ],
      },
      {
        heading: "8. Intellectual property",
        body: "Your generated plan is licensed to you for personal travel use. The site design, brand, system prompts, and underlying sample library remain the property of gliddy. You may share your plan link with travel companions; you may not repost it as public content without attribution.",
      },
      { heading: "9. Refunds", body: "" },
      {
        heading: "10. Third-party services",
        body: "We rely on Anthropic (AI model), Supabase (storage), LemonSqueezy (payment), Resend (email), Mapbox (maps), and Vercel (hosting). Issues with any of these can affect the service. We make reasonable efforts to route around provider outages but cannot guarantee uptime.",
      },
      {
        heading: "11. Disclaimers",
        body: 'The service is provided "as is" and "as available", without warranty of any kind, express or implied. We disclaim all warranties including merchantability, fitness for a particular purpose, and non-infringement, to the maximum extent permitted by law.',
      },
      {
        heading: "12. Limitation of liability",
        body: "To the maximum extent permitted by law, gliddy's total liability to you for any claim arising from the service is limited to the amount you paid for the affected plan (typically $4 USD). We are not liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, loss of data, or travel disruption.",
      },
      {
        heading: "13. Indemnification",
        body: "You agree to indemnify and hold gliddy harmless from any claim arising out of your use of the service, your breach of these Terms, or your violation of applicable law.",
      },
      {
        heading: "14. Changes to the service or the Terms",
        body: "We may change the service or these Terms at any time. Material changes will be reflected here with an updated \"Last updated\" date. Continued use after a change means you accept the updated Terms.",
      },
      {
        heading: "15. Governing law",
        body: "These Terms are governed by the laws of the Republic of Korea, without regard to conflict-of-law principles. Disputes will be resolved exclusively in the courts of Seoul, Republic of Korea.",
      },
    ],
    contactHeading: "16. Contact",
    contactPrefix: "Questions about these Terms? Email",
  },
  ko: {
    metaTitle: "이용약관",
    metaDescription:
      "gliddy 이용약관 — 1회 결제 $4 AI 여행 플래너. 무엇을 구매하시는지, 무엇을 약속하고 무엇은 약속하지 않는지.",
    eyebrow: "법적 고지",
    headline: "이용약관",
    lastUpdated: "최종 수정: 2026년 4월 23일",
    privacyLabel: "개인정보 처리방침",
    refundLabel: "환불 정책",
    acceptancePrefix: "본 사이트를 이용하거나 주문하거나 생성된 플랜을 열람하시는 행위는 본 약관,",
    acceptanceMid: ",",
    acceptanceAnd: "그리고",
    acceptanceSuffix: "에 동의하시는 것입니다. 동의하지 않으시면 서비스를 이용하지 마세요.",
    refundsPrefix: "전체 환불 정책은",
    refundsSuffix:
      "에 있습니다. 요약: 기술적 실패와 명백히 환각된 장소가 포함된 플랜은 환불해 드립니다. 취향 차이는 환불해 드리지 않습니다.",
    sections: [
      {
        heading: "1. gliddy란",
        body: "gliddy는 디지털 상품입니다. 회원님이 목적지·기간·몇 가지 선호사항을 입력하시면, Anthropic의 Claude 언어 모델로 개인 맞춤 여행 일정을 생성해 비공개 웹 링크와 다운로드 가능한 PDF로 이메일에 보내드립니다. 결제 1회당 플랜 1개. 구독·반복 결제·계정 가입 없음.",
      },
      { heading: "2. 동의", body: "" },
      {
        heading: "3. 이용 자격",
        body: "구매를 위해서는 만 18세 이상(또는 본인 관할권의 성년 연령)이어야 합니다. 다른 사람을 대신해 서비스를 이용하시는 경우, 해당인을 본 약관에 구속할 권한이 있다고 진술하시는 것입니다.",
      },
      {
        heading: "4. 가격·결제·통화",
        body: "플랜 1건당 가격은 USD $4.00입니다. LemonSqueezy가 결제를 처리합니다. 명세서에는 Lemon Squeezy · gliddy 로 표시됩니다. 해당 시 LemonSqueezy가 현지 통화 환산을 처리하며, USD 환산액이 청구됩니다.",
      },
      {
        heading: "5. 전달",
        body: "결제 시 입력하신 이메일로 보통 결제 성공 후 5-10분 안에 플랜이 도착합니다. 15분 안에 보이지 않으시면 스팸함을 확인해 주세요. 메일의 웹 링크가 정식 전달본이며 언제든 다시 열람하실 수 있습니다. PDF는 오프라인 사용을 위한 사본입니다.",
      },
      {
        heading: "6. 플랜이 무엇이고 무엇이 아닌지",
        list: [
          "플랜은 사려 깊은 출발점입니다. 실제 여행은 항상 확인이 필요합니다 — 운영 시간, 입장권, 날씨, 휴무, 예약. 출발 전 직접 확인하실 것으로 기대합니다.",
          "플랜은 예약이 아닙니다. 호텔·항공·교통·티켓·테이블을 대신 예약하지 않습니다. 모든 예약과 그로 인한 비용·책임은 회원님께 있습니다.",
          "플랜은 의료·법률·비자 등 전문 자문이 아닙니다. 비자 요건이나 특정 목적지로의 여행 안전성에 대한 자문은 제공하지 않습니다.",
        ],
      },
      {
        heading: "7. 회원님의 책임",
        list: [
          "정확한 입력값을 제공해 주세요(목적지·기간·관심사).",
          "본인 작업처럼 플랜을 재판매·재배포하지 마세요.",
          "서비스를 리버스 엔지니어링·스크래핑·악용하려 하지 마세요.",
          "법으로 금지된 목적으로 서비스를 이용하지 마세요.",
        ],
      },
      {
        heading: "8. 지적재산권",
        body: "생성된 플랜은 개인 여행용으로 라이선스가 부여됩니다. 사이트 디자인·브랜드·시스템 프롬프트·기반 샘플 라이브러리는 gliddy의 자산으로 유지됩니다. 동행자에게는 플랜 링크를 공유하실 수 있으나, 출처 표기 없이 공개 콘텐츠로 재게시하실 수 없습니다.",
      },
      { heading: "9. 환불", body: "" },
      {
        heading: "10. 제3자 서비스",
        body: "Anthropic(AI 모델), Supabase(저장소), LemonSqueezy(결제), Resend(이메일), Mapbox(지도), Vercel(호스팅)에 의존합니다. 이들 중 어느 곳의 문제도 서비스에 영향을 줄 수 있습니다. 제공자 장애 우회를 위해 합리적으로 노력하지만 가동시간을 보장할 수 없습니다.",
      },
      {
        heading: "11. 면책 고지",
        body: "본 서비스는 \"있는 그대로\" 그리고 \"이용 가능한 형태로\" 명시적·묵시적 어떠한 보증도 없이 제공됩니다. 상품성·특정 목적 적합성·비침해를 포함한 모든 보증을 법이 허용하는 최대 범위에서 부인합니다.",
      },
      {
        heading: "12. 책임 제한",
        body: "법이 허용하는 최대 범위에서, gliddy의 회원님에 대한 서비스 관련 청구 총액 책임은 해당 플랜 결제 금액(보통 USD $4)으로 제한됩니다. 일실이익·데이터 손실·여행 차질을 포함한 간접·우발·특별·결과적·징벌적 손해에 대해 책임지지 않습니다.",
      },
      {
        heading: "13. 면책 보장",
        body: "회원님의 서비스 이용, 본 약관 위반, 또는 적용 법률 위반으로 발생하는 어떠한 청구로부터도 gliddy를 면책하고 손해를 입히지 않으실 것에 동의하십니다.",
      },
      {
        heading: "14. 서비스 또는 약관 변경",
        body: "서비스 또는 본 약관은 언제든 변경될 수 있습니다. 중대한 변경은 \"최종 수정\" 날짜와 함께 본 페이지에 반영됩니다. 변경 후 계속 이용하시는 것은 변경된 약관에 동의하시는 것입니다.",
      },
      {
        heading: "15. 준거법",
        body: "본 약관은 대한민국 법률에 따라 해석되며, 법 적용 충돌 원칙은 적용되지 않습니다. 분쟁은 대한민국 서울 소재 법원의 전속 관할에 따릅니다.",
      },
    ],
    contactHeading: "16. 문의",
    contactPrefix: "본 약관에 대한 문의가 있으시면 다음으로 메일 주세요:",
  },
  ja: {
    metaTitle: "利用規約",
    metaDescription:
      "gliddy 利用規約 — 1回払い$4のAI旅行プランナー。何を購入していただくか、何を約束し、何を約束しないか。",
    eyebrow: "法的事項",
    headline: "利用規約",
    lastUpdated: "最終更新: 2026年4月23日",
    privacyLabel: "プライバシーポリシー",
    refundLabel: "返金ポリシー",
    acceptancePrefix: "本サイトの利用、ご注文、生成されたプランの閲覧は、本規約、",
    acceptanceMid: "、",
    acceptanceAnd: "および",
    acceptanceSuffix: "にご同意いただいたことになります。同意されない場合は、サービスをご利用にならないでください。",
    refundsPrefix: "返金ポリシー全文は",
    refundsSuffix:
      "にあります。要約:技術的失敗と明らかに架空の場所を含むプランは返金いたします。好みの違いによる返金はいたしません。",
    sections: [
      {
        heading: "1. gliddyとは",
        body: "gliddyはデジタル商品です。お客様が目的地、期間、いくつかの好みを入力すると、AnthropicのClaude言語モデルを使って個人向けの旅行日程を生成し、非公開ウェブリンクとダウンロード可能なPDFとしてメールでお送りします。$4のお支払いごとにプラン1つ。サブスクなし、定期課金なし、アカウント登録なし。",
      },
      { heading: "2. 同意", body: "" },
      {
        heading: "3. 利用資格",
        body: "ご購入には満18歳以上(またはお住まいの管轄地域での成人年齢以上)である必要があります。他人のためにサービスをご利用される場合、その方を本規約に拘束する権限があると表明されることになります。",
      },
      {
        heading: "4. 価格・請求・通貨",
        body: "プラン1件あたりの価格はUSD $4.00です。決済はLemonSqueezyが処理します。明細にはLemon Squeezy · gliddyからの請求として表示されます。該当する場合、LemonSqueezyが現地通貨の換算を処理します。USD換算額がお支払い金額となります。",
      },
      {
        heading: "5. 配信",
        body: "プランは決済時にご提供いただいたメールアドレスに、決済成功から通常5〜10分以内にお届けします。15分以内に届かない場合は迷惑メールフォルダをご確認ください。メール内のウェブリンクが正式な配信物で、いつでもアクセスできます。PDFはオフライン使用のための便利なコピーです。",
      },
      {
        heading: "6. プランとは何か、何でないか",
        list: [
          "プランは思慮深い出発点です。実際の旅行には常に確認が必要です — 営業時間、チケットの空き状況、天気、休業、予約。出発前にご確認いただくことを期待しています。",
          "プランは予約ではありません。ホテル、航空券、交通、チケット、テーブルの予約代行はしません。すべての予約とそれに伴う費用や責任はお客様にあります。",
          "プランは医療、法律、ビザ、その他の専門的な助言ではありません。ビザ要件や特定の目的地への旅行の安全性については助言しません。",
        ],
      },
      {
        heading: "7. お客様の責任",
        list: [
          "正確な入力情報の提供(目的地、期間、興味)。",
          "プランをご自身の作品として再販または再配布しないこと。",
          "サービスをリバースエンジニアリング、スクレイピング、悪用しようとしないこと。",
          "法律で禁止された目的でサービスを使用しないこと。",
        ],
      },
      {
        heading: "8. 知的財産権",
        body: "生成されたプランは、個人の旅行用途に対してお客様にライセンスされます。サイトデザイン、ブランド、システムプロンプト、基盤となるサンプルライブラリは引き続きgliddyの財産です。プランリンクは旅行同行者と共有できますが、出典表示なしに公開コンテンツとして再投稿することはできません。",
      },
      { heading: "9. 返金", body: "" },
      {
        heading: "10. 第三者サービス",
        body: "Anthropic(AIモデル)、Supabase(ストレージ)、LemonSqueezy(決済)、Resend(メール)、Mapbox(地図)、Vercel(ホスティング)に依存しています。これらのいずれかに問題があるとサービスに影響することがあります。プロバイダーの障害を回避するよう合理的に努力しますが、稼働時間を保証できません。",
      },
      {
        heading: "11. 免責",
        body: "本サービスは、明示的・黙示的いかなる種類の保証もなく、「現状有姿」かつ「利用可能な形」で提供されます。商品性、特定目的への適合性、非侵害を含むすべての保証を、法律で許される最大限の範囲で否認します。",
      },
      {
        heading: "12. 責任の制限",
        body: "法律で許される最大限の範囲において、サービスから生じるいかなる請求に対するgliddyの総責任は、影響を受けたプランのお支払い金額(通常USD $4)に制限されます。逸失利益、データ損失、旅行の混乱を含む間接的、付随的、特別、結果的、または懲罰的損害については責任を負いません。",
      },
      {
        heading: "13. 補償",
        body: "サービスのご利用、本規約への違反、または適用法令への違反から生じるいかなる請求からも、gliddyを補償し損害を与えないことに同意していただきます。",
      },
      {
        heading: "14. サービスまたは規約の変更",
        body: "サービスまたは本規約はいつでも変更される場合があります。重要な変更は「最終更新」日付とともに本ページに反映されます。変更後も継続してご利用いただくことは、更新された規約への同意を意味します。",
      },
      {
        heading: "15. 準拠法",
        body: "本規約は、抵触法の原則を考慮することなく大韓民国法に準拠します。紛争は大韓民国ソウルの裁判所で専属的に解決されます。",
      },
    ],
    contactHeading: "16. お問い合わせ",
    contactPrefix: "本規約についてご不明な点があれば、次へメールをお送りください:",
  },
  zh: {
    metaTitle: "服务条款",
    metaDescription:
      "gliddy 服务条款 — 一次性付费 $4 的 AI 行程规划工具。您购买的是什么、我们承诺什么、不承诺什么。",
    eyebrow: "法律事项",
    headline: "服务条款",
    lastUpdated: "最后更新: 2026年4月23日",
    privacyLabel: "隐私政策",
    refundLabel: "退款政策",
    acceptancePrefix: "使用本网站、下单或打开生成的计划,即表示您同意本条款、我们的",
    acceptanceMid: ",",
    acceptanceAnd: "以及我们的",
    acceptanceSuffix: "。如果您不同意,请勿使用本服务。",
    refundsPrefix: "我们的完整退款政策见",
    refundsSuffix: "。简而言之:我们对技术故障以及包含明显虚构地点的计划退款。我们不基于口味偏好退款。",
    sections: [
      {
        heading: "1. gliddy 是什么",
        body: "gliddy 是一款数字产品。您提供目的地、时长和一些偏好;我们使用 Anthropic 的 Claude 语言模型生成个性化的行程,并以私人网页链接加可下载 PDF 的形式发送到您的邮箱。每次 $4 购买一份计划。无订阅、无定期收费、无需账户。",
      },
      { heading: "2. 接受", body: "" },
      {
        heading: "3. 资格",
        body: "您必须年满 18 岁(或您所在司法管辖区的成年年龄)才能购买。如果您代表他人使用本服务,您声明拥有相应授权并将其约束于本条款。",
      },
      {
        heading: "4. 价格、计费和币种",
        body: "每份计划的价格为 USD $4.00。付款由 LemonSqueezy 处理。您的账单将显示来自 Lemon Squeezy · gliddy 的扣费。LemonSqueezy 在适用时处理当地货币转换;您应支付的是美元等值金额。",
      },
      {
        heading: "5. 交付",
        body: "计划将发送至您在结账时提供的邮箱,通常在成功付款后 5-10 分钟内到达。如果 15 分钟内未看到,请检查垃圾邮件文件夹。邮件中的网页链接是正式交付 — 您可以随时访问。PDF 是为离线使用提供的便利副本。",
      },
      {
        heading: "6. 计划是什么,不是什么",
        list: [
          "计划是经过深思熟虑的起点。实际旅行始终需要核实 — 营业时间、票务情况、天气、关闭、预订。我们期望您出行前进行检查。",
          "计划不是预订。我们不为您预订酒店、航班、交通、票务或餐桌。所有预订及由此产生的费用或责任由您承担。",
          "计划不是专业建议 — 医疗、法律、签证或其他。我们不就签证要求或前往某目的地的旅行安全性提供建议。",
        ],
      },
      {
        heading: "7. 您的责任",
        list: [
          "提供准确的输入信息(目的地、时长、兴趣)。",
          "不要将您的计划作为自己的作品转售或转发。",
          "不要尝试逆向工程、抓取或滥用本服务。",
          "不要将本服务用于法律禁止的任何目的。",
        ],
      },
      {
        heading: "8. 知识产权",
        body: "您生成的计划仅授权您用于个人旅行用途。网站设计、品牌、系统提示和底层样例库仍属 gliddy 所有。您可以与同行者分享计划链接;未经署名,不得作为公开内容转发。",
      },
      { heading: "9. 退款", body: "" },
      {
        heading: "10. 第三方服务",
        body: "我们依赖 Anthropic(AI 模型)、Supabase(存储)、LemonSqueezy(支付)、Resend(邮件)、Mapbox(地图)和 Vercel(托管)。其中任何一个出现问题都可能影响服务。我们尽合理努力绕过提供商的中断,但无法保证正常运行时间。",
      },
      {
        heading: "11. 免责声明",
        body: "本服务按\"原样\"和\"可用\"提供,不附任何明示或暗示的保证。在法律允许的最大范围内,我们否认所有保证,包括适销性、特定用途适用性和非侵权性。",
      },
      {
        heading: "12. 责任限制",
        body: "在法律允许的最大范围内,gliddy 对您因服务产生的任何索赔的总责任,以您为受影响的计划支付的金额(通常为 USD $4)为限。我们不对包括利润损失、数据丢失或旅行中断在内的间接、附带、特殊、后果性或惩罚性损害承担责任。",
      },
      {
        heading: "13. 赔偿",
        body: "您同意就因您使用本服务、违反本条款或违反适用法律而引起的任何索赔,免除 gliddy 的责任并使其免受损害。",
      },
      {
        heading: "14. 服务或条款的变更",
        body: "我们可以随时更改服务或本条款。重要变更将在此处反映,并附有更新的\"最后更新\"日期。变更后继续使用即表示您接受更新后的条款。",
      },
      {
        heading: "15. 适用法律",
        body: "本条款受大韩民国法律管辖,不考虑法律冲突原则。争议将专属在大韩民国首尔的法院解决。",
      },
    ],
    contactHeading: "16. 联系我们",
    contactPrefix: "对本条款有疑问?发送邮件至",
  },
  fr: {
    metaTitle: "Conditions d'utilisation",
    metaDescription:
      "Conditions d'utilisation pour gliddy — un planificateur de voyage IA à 4 $ unique. Ce que vous achetez, ce que nous promettons et ce que nous ne promettons pas.",
    eyebrow: "Mentions légales",
    headline: "Conditions d'utilisation",
    lastUpdated: "Dernière mise à jour : 23 avril 2026",
    privacyLabel: "Politique de confidentialité",
    refundLabel: "Politique de remboursement",
    acceptancePrefix: "En utilisant ce site, en passant une commande ou en ouvrant un plan généré, vous acceptez ces Conditions, notre",
    acceptanceMid: ",",
    acceptanceAnd: "et notre",
    acceptanceSuffix: ". Si vous n'êtes pas d'accord, n'utilisez pas le service.",
    refundsPrefix: "Notre politique de remboursement complète est sur",
    refundsSuffix:
      ". En bref : nous remboursons pour les échecs techniques et pour les plans qui incluent des lieux manifestement hallucinés. Nous ne remboursons pas en fonction des préférences de goût.",
    sections: [
      {
        heading: "1. Qu'est-ce que gliddy",
        body: "gliddy est un produit numérique. Vous fournissez une destination, une durée et quelques préférences ; nous générons un itinéraire de voyage personnalisé en utilisant le modèle de langage Claude d'Anthropic et le livrons à votre e-mail sous forme de lien web privé plus un PDF téléchargeable. Chaque achat à 4 $ achète un plan. Pas d'abonnement, pas de frais récurrents, pas de compte.",
      },
      { heading: "2. Acceptation", body: "" },
      {
        heading: "3. Éligibilité",
        body: "Vous devez avoir au moins 18 ans (ou l'âge de la majorité dans votre juridiction) pour effectuer un achat. Si vous utilisez le service au nom de quelqu'un d'autre, vous déclarez avoir l'autorité pour le faire et pour les lier à ces Conditions.",
      },
      {
        heading: "4. Prix, facturation et devise",
        body: "Le prix par plan est de 4,00 USD. Le paiement est traité par LemonSqueezy. Votre relevé affichera un débit de Lemon Squeezy · gliddy. LemonSqueezy gère la conversion de devise locale le cas échéant ; le montant équivalent en USD est ce que vous devez.",
      },
      {
        heading: "5. Livraison",
        body: "Les plans sont livrés à l'adresse e-mail que vous fournissez au paiement, généralement dans les 5 à 10 minutes suivant le paiement réussi. Vérifiez votre dossier spam si vous ne le voyez pas dans les 15 minutes. Le lien web dans l'e-mail est la livraison canonique — vous pouvez y revenir à tout moment. Le PDF est une copie pratique pour utilisation hors ligne.",
      },
      {
        heading: "6. Ce qu'est un plan et ce qu'il n'est pas",
        list: [
          "Un plan est un point de départ réfléchi. Le voyage réel nécessite toujours une vérification — horaires d'ouverture, disponibilité des billets, météo, fermetures, réservations. Nous attendons que vous vérifiez avant de partir.",
          "Un plan n'est pas une réservation. Nous ne réservons pas d'hôtels, de vols, de transports, de billets ou de tables. Vous êtes responsable de toutes les réservations et de tous les frais ou responsabilités qui en résultent.",
          "Un plan n'est pas un conseil professionnel — médical, juridique, visa ou autre. Nous ne conseillons pas sur les exigences de visa ou la sécurité du voyage vers une destination donnée.",
        ],
      },
      {
        heading: "7. Vos responsabilités",
        list: [
          "Fournir des entrées précises (destination, durée, intérêts).",
          "Ne pas revendre ou redistribuer votre plan comme votre propre travail.",
          "Ne pas tenter de faire de la rétro-ingénierie, de scraper ou d'abuser du service.",
          "Ne pas utiliser le service à des fins interdites par la loi.",
        ],
      },
      {
        heading: "8. Propriété intellectuelle",
        body: "Votre plan généré vous est concédé sous licence pour un usage personnel de voyage. La conception du site, la marque, les invites système et la bibliothèque d'exemples sous-jacente restent la propriété de gliddy. Vous pouvez partager votre lien de plan avec des compagnons de voyage ; vous ne pouvez pas le republier comme contenu public sans attribution.",
      },
      { heading: "9. Remboursements", body: "" },
      {
        heading: "10. Services tiers",
        body: "Nous nous appuyons sur Anthropic (modèle d'IA), Supabase (stockage), LemonSqueezy (paiement), Resend (e-mail), Mapbox (cartes) et Vercel (hébergement). Les problèmes avec l'un d'entre eux peuvent affecter le service. Nous faisons des efforts raisonnables pour contourner les pannes de fournisseurs mais ne pouvons garantir le temps de fonctionnement.",
      },
      {
        heading: "11. Avertissements",
        body: 'Le service est fourni "tel quel" et "selon disponibilité", sans garantie d\'aucune sorte, expresse ou implicite. Nous déclinons toute garantie, y compris la qualité marchande, l\'adéquation à un usage particulier et la non-contrefaçon, dans la mesure maximale permise par la loi.',
      },
      {
        heading: "12. Limitation de responsabilité",
        body: "Dans la mesure maximale permise par la loi, la responsabilité totale de gliddy envers vous pour toute réclamation découlant du service est limitée au montant que vous avez payé pour le plan affecté (généralement 4 USD). Nous ne sommes pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris la perte de profits, la perte de données ou la perturbation du voyage.",
      },
      {
        heading: "13. Indemnisation",
        body: "Vous acceptez d'indemniser et de tenir gliddy à l'abri de toute réclamation découlant de votre utilisation du service, de votre violation de ces Conditions ou de votre violation de la loi applicable.",
      },
      {
        heading: "14. Modifications du service ou des Conditions",
        body: "Nous pouvons modifier le service ou ces Conditions à tout moment. Les changements importants seront reflétés ici avec une date \"Dernière mise à jour\" actualisée. L'utilisation continue après un changement signifie que vous acceptez les Conditions mises à jour.",
      },
      {
        heading: "15. Loi applicable",
        body: "Ces Conditions sont régies par les lois de la République de Corée, sans égard aux principes de conflit de lois. Les litiges seront résolus exclusivement devant les tribunaux de Séoul, République de Corée.",
      },
    ],
    contactHeading: "16. Contact",
    contactPrefix: "Des questions sur ces Conditions ? Écrivez à",
  },
};
