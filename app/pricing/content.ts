import type { Locale } from "../../i18n/locales";

export interface PricingContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: string;
  priceUnit: string;
  priceFootnote: string;
  features: string[];
  ctaButton: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  legalPrefix: string;
  termsLabel: string;
  privacyLabel: string;
  refundLabel: string;
}

export const PRICING_CONTENT: Record<Locale, PricingContent> = {
  en: {
    metaTitle: "Pricing",
    metaDescription:
      "gliddy is a single-purchase trip planner — $4 per plan. No subscription, no hidden fees, no account required.",
    eyebrow: "Pricing",
    headline: "One plan. $4. That's it.",
    intro:
      "No subscription. No hidden fees. No account required. Pay once, receive one carefully crafted trip plan by email — typically within 5-10 minutes.",
    priceUnit: "USD · per plan · one-time",
    priceFootnote: "Local currency equivalent shown at checkout.",
    features: [
      "Day-by-day itinerary tuned to your pace and interests",
      "A hotel pick matched to your arrival airport",
      "Airport → hotel transit with real cost and duration",
      "Route map with numbered stops you can open on your phone",
      "Restaurant picks with why-here notes, not just names",
      "Downloadable PDF for offline use while you travel",
      "Delivered to your email in 5-10 minutes after payment",
    ],
    ctaButton: "Plan my trip — $4",
    faqHeading: "Frequently asked",
    faqs: [
      {
        q: "Is this a subscription?",
        a: "No. It's a single $4 charge for one plan. If you want another plan later, you pay $4 again. We don't store your card and we don't auto-renew.",
      },
      {
        q: "Do I need an account?",
        a: "No. We email you a private link to your plan. Keep the email, keep the plan. If you lose it, email us and we'll resend.",
      },
      {
        q: "What payment methods are accepted?",
        a: "All major credit cards via LemonSqueezy (our payment processor), plus Apple Pay and Google Pay where available. LemonSqueezy handles local currency conversion.",
      },
      {
        q: "Can I get a refund?",
        a: "Yes, for two cases: (1) technical failure to generate, and (2) a plan that contains a clearly hallucinated place. See our refund policy below for details.",
      },
      {
        q: "Why so cheap?",
        a: "Because we think a good itinerary shouldn't cost $50 or be locked inside a $15/mo subscription. The per-plan compute cost is a small fraction of $4 and the rest keeps the site running.",
      },
      {
        q: "What if I want the same destination twice?",
        a: "Each purchase generates a fresh plan from your inputs. Change the duration, traveler type, interests, or budget tier and you'll get a different itinerary.",
      },
    ],
    legalPrefix: "Full terms:",
    termsLabel: "Terms of Service",
    privacyLabel: "Privacy Policy",
    refundLabel: "Refund Policy",
  },
  ko: {
    metaTitle: "요금",
    metaDescription:
      "gliddy는 1회 결제 여행 플래너예요 — 플랜 1건 $4. 구독·숨은 비용·계정 가입 없음.",
    eyebrow: "요금",
    headline: "플랜 한 권, $4. 끝.",
    intro:
      "구독 없음. 숨은 비용 없음. 가입도 필요 없어요. 한 번 결제하시면 정성껏 다듬은 여행 플랜이 보통 5-10분 안에 메일로 도착합니다.",
    priceUnit: "USD · 플랜 1건 · 1회 결제",
    priceFootnote: "결제 시 현지 통화로 환산된 금액이 표시돼요.",
    features: [
      "여행 속도와 관심사에 맞춘 일자별 일정",
      "도착 공항에 맞춘 호텔 추천",
      "공항 → 호텔 이동 수단 (실제 비용·소요 시간 포함)",
      "번호 매긴 코스를 휴대폰에서 바로 보는 동선 지도",
      "왜 이 식당인지 이유까지 적힌 식당 추천",
      "여행 중 오프라인 사용을 위한 PDF 다운로드",
      "결제 후 5-10분 안에 메일 도착",
    ],
    ctaButton: "내 여행 계획하기 — $4",
    faqHeading: "자주 묻는 질문",
    faqs: [
      {
        q: "구독인가요?",
        a: "아니요. 플랜 1건당 $4 단발 결제예요. 다음 플랜이 필요하시면 또 $4 결제하시면 됩니다. 카드 정보는 저장하지 않고 자동 갱신도 없어요.",
      },
      {
        q: "계정이 필요한가요?",
        a: "아니요. 회원님 전용 링크를 메일로 보내드려요. 메일만 보관하시면 플랜은 계속 보실 수 있습니다. 메일을 잃어버리시면 저희에게 알려주세요, 다시 보내드려요.",
      },
      {
        q: "결제 수단은 어떤 게 되나요?",
        a: "주요 신용카드 전부 (LemonSqueezy 결제 시스템을 통해), 그리고 Apple Pay·Google Pay (지원 지역에 한해). 현지 통화 환산은 LemonSqueezy가 처리합니다.",
      },
      {
        q: "환불 가능한가요?",
        a: "두 가지 경우에 가능해요: (1) 기술적 생성 실패, (2) 실제로 존재하지 않는 장소가 포함된 플랜. 자세한 내용은 아래 환불 정책을 봐주세요.",
      },
      {
        q: "왜 이렇게 저렴한가요?",
        a: "좋은 여행 일정이 $50씩 하거나 월 $15 구독에 갇혀 있을 필요는 없다고 봐요. 플랜 1건당 들어가는 비용은 $4의 일부고, 나머지는 사이트 운영에 씁니다.",
      },
      {
        q: "같은 목적지로 또 만들고 싶으면요?",
        a: "결제할 때마다 입력값으로 새로 만듭니다. 기간·동행·관심사·예산 중 하나만 바꿔도 다른 일정이 나와요.",
      },
    ],
    legalPrefix: "전체 약관:",
    termsLabel: "이용약관",
    privacyLabel: "개인정보 처리방침",
    refundLabel: "환불 정책",
  },
  ja: {
    metaTitle: "料金",
    metaDescription:
      "gliddyは単発購入型の旅行プランナー — プラン1つ$4。サブスクなし、隠れた費用なし、登録不要。",
    eyebrow: "料金",
    headline: "プラン1つ、$4。それだけ。",
    intro:
      "サブスクなし。隠れた費用なし。登録不要。一度のお支払いで、丁寧に作り上げた旅行プランが通常5〜10分でメールに届きます。",
    priceUnit: "USD · プラン1つ · 1回払い",
    priceFootnote: "決済時に現地通貨での金額が表示されます。",
    features: [
      "旅のペースと興味に合わせた日別の日程",
      "到着空港に合わせたホテル選び",
      "空港 → ホテルの移動手段(実際の費用・所要時間付き)",
      "番号付きスポットをスマホで開ける動線マップ",
      "なぜここ?の理由まで書いたレストラン推薦",
      "旅行中のオフライン用PDFダウンロード",
      "決済後5〜10分でメールに到着",
    ],
    ctaButton: "旅行を計画する — $4",
    faqHeading: "よくあるご質問",
    faqs: [
      {
        q: "サブスクですか?",
        a: "いいえ。プラン1つにつき$4の単発払いです。次のプランが必要なら、また$4。カード情報は保存せず、自動更新もありません。",
      },
      {
        q: "アカウント登録は必要ですか?",
        a: "いいえ。お客様のプラン専用リンクをメールでお送りします。メールを保管していただければプランはずっと閲覧できます。メールを紛失されたら、ご連絡いただければ再送します。",
      },
      {
        q: "決済方法は?",
        a: "主要なクレジットカード(LemonSqueezy経由)、Apple Pay・Google Pay(対応地域)。現地通貨の換算はLemonSqueezyが行います。",
      },
      {
        q: "返金できますか?",
        a: "次の2つの場合に可能です:(1)技術的な生成失敗、(2)明らかに架空の場所が含まれたプラン。詳細は下記の返金ポリシーをご覧ください。",
      },
      {
        q: "なぜこんなに安いのですか?",
        a: "良い旅程が$50したり、月額$15のサブスクに閉じ込められる必要はないと考えています。プラン1件あたりの計算コストは$4のごく一部で、残りはサイト運営に使われます。",
      },
      {
        q: "同じ目的地でもう一度作りたい場合は?",
        a: "購入のたびに、入力内容から新しいプランを生成します。日数・同行者タイプ・興味・予算のどれか一つを変えるだけで、別の日程になります。",
      },
    ],
    legalPrefix: "詳細条件:",
    termsLabel: "利用規約",
    privacyLabel: "プライバシーポリシー",
    refundLabel: "返金ポリシー",
  },
  zh: {
    metaTitle: "定价",
    metaDescription:
      "gliddy 是一次性购买的旅行规划工具 — 每份 $4。无订阅、无隐藏费用、无需注册。",
    eyebrow: "定价",
    headline: "一份计划。$4。仅此而已。",
    intro:
      "无订阅。无隐藏费用。无需注册。一次付款,精心打磨的旅行计划通常在 5-10 分钟内通过邮件送达。",
    priceUnit: "USD · 每份计划 · 一次性",
    priceFootnote: "结账时显示当地货币等值金额。",
    features: [
      "按节奏和兴趣调整的每日行程",
      "匹配到达机场的酒店推荐",
      "机场 → 酒店的交通方式(含实际费用和时长)",
      "可在手机打开的编号景点路线地图",
      "带推荐理由的餐厅推荐,不只是名字",
      "可下载的 PDF,旅途中可离线使用",
      "付款后 5-10 分钟送达邮箱",
    ],
    ctaButton: "规划我的行程 — $4",
    faqHeading: "常见问题",
    faqs: [
      {
        q: "这是订阅吗?",
        a: "不是。每份计划单次收费 $4。下次需要再支付 $4。我们不保存您的卡信息,也不会自动续费。",
      },
      {
        q: "需要注册账号吗?",
        a: "不需要。我们会通过邮件发送您计划的私人链接。保留邮件即可永久查看。如果丢失邮件,联系我们重发。",
      },
      {
        q: "支持哪些付款方式?",
        a: "所有主要信用卡(通过 LemonSqueezy 处理),以及 Apple Pay 和 Google Pay(支持地区)。LemonSqueezy 处理当地货币转换。",
      },
      {
        q: "可以退款吗?",
        a: "两种情况可以:(1)技术生成失败,(2)计划包含明显虚构的地点。详情见下方退款政策。",
      },
      {
        q: "为什么这么便宜?",
        a: "因为我们认为好的行程不应该卖 $50,也不应该被锁在每月 $15 的订阅里。每份计划的计算成本只占 $4 的一小部分,其余用于维持网站运营。",
      },
      {
        q: "如果想为同一目的地再来一次怎么办?",
        a: "每次购买都会根据您的输入重新生成。修改时长、同行类型、兴趣或预算等级,就会得到不同的行程。",
      },
    ],
    legalPrefix: "完整条款:",
    termsLabel: "服务条款",
    privacyLabel: "隐私政策",
    refundLabel: "退款政策",
  },
  fr: {
    metaTitle: "Tarifs",
    metaDescription:
      "gliddy est un planificateur de voyage à achat unique — 4 $ par plan. Pas d'abonnement, pas de frais cachés, pas de compte requis.",
    eyebrow: "Tarifs",
    headline: "Un plan. 4 $. C'est tout.",
    intro:
      "Pas d'abonnement. Pas de frais cachés. Pas de compte requis. Payez une fois, recevez un plan de voyage complet par e-mail en quelques minutes.",
    priceUnit: "USD · par plan · paiement unique",
    priceFootnote: "Équivalent en devise locale affiché au paiement.",
    features: [
      "Itinéraire jour par jour adapté à votre rythme et à vos centres d'intérêt",
      "Hôtel sélectionné en fonction de votre aéroport d'arrivée",
      "Trajet aéroport → hôtel avec coût et durée réels",
      "Carte d'itinéraire avec étapes numérotées, à ouvrir sur votre téléphone",
      "Sélection de restaurants avec explications, pas juste des noms",
      "PDF téléchargeable pour utilisation hors ligne pendant le voyage",
      "Livré dans votre boîte mail en 5 à 10 minutes après le paiement",
    ],
    ctaButton: "Planifier mon voyage — 4 $",
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "Est-ce un abonnement ?",
        a: "Non. C'est un paiement unique de 4 $ pour un plan. Si vous voulez un autre plan plus tard, vous payez 4 $ à nouveau. Nous ne stockons pas votre carte et nous ne renouvelons pas automatiquement.",
      },
      {
        q: "Ai-je besoin d'un compte ?",
        a: "Non. Nous vous envoyons par e-mail un lien privé vers votre plan. Gardez l'e-mail, gardez le plan. Si vous le perdez, contactez-nous et nous le renverrons.",
      },
      {
        q: "Quels modes de paiement sont acceptés ?",
        a: "Toutes les principales cartes de crédit via LemonSqueezy (notre processeur de paiement), ainsi qu'Apple Pay et Google Pay là où c'est disponible. LemonSqueezy gère la conversion de devise.",
      },
      {
        q: "Puis-je obtenir un remboursement ?",
        a: "Oui, dans deux cas : (1) échec technique de génération, et (2) un plan contenant un lieu manifestement halluciné. Voir notre politique de remboursement ci-dessous pour les détails.",
      },
      {
        q: "Pourquoi si peu cher ?",
        a: "Parce que nous pensons qu'un bon itinéraire ne devrait pas coûter 50 $ ni être enfermé dans un abonnement à 15 $/mois. Le coût de calcul par plan est une petite fraction de 4 $ et le reste fait tourner le site.",
      },
      {
        q: "Et si je veux la même destination deux fois ?",
        a: "Chaque achat génère un nouveau plan à partir de vos entrées. Changez la durée, le type de voyageur, les centres d'intérêt ou la gamme de budget, et vous obtiendrez un itinéraire différent.",
      },
    ],
    legalPrefix: "Conditions complètes :",
    termsLabel: "Conditions d'utilisation",
    privacyLabel: "Politique de confidentialité",
    refundLabel: "Politique de remboursement",
  },
};
