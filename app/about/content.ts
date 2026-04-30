import type { Locale } from "../../i18n/locales";

export interface AboutContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  body: string[];
  bodyClosing: string;
  values: { title: string; desc: string }[];
  ctaButton: string;
  contactLine: string;
}

export const ABOUT_CONTENT: Record<Locale, AboutContent> = {
  en: {
    metaTitle: "About",
    metaDescription:
      "Why we built gliddy — an AI trip planner that writes a real itinerary, sorted.",
    eyebrow: "About",
    headline: "Trip planning shouldn't eat your weekend.",
    body: [
      "We built gliddy because a short trip still eats a whole weekend to plan. You open thirty tabs, save twenty restaurants, cross-check them against a hotel that has not been booked yet, then get to the destination and walk backwards twice.",
      "We made one small tool that fixes one part of that. Answer a few questions, and our AI returns a day-by-day plan with a real route map — hotels near transit, restaurants near each stop, opening hours and kid-friendliness accounted for. You get a link you can open on your phone, and a PDF you can keep offline.",
    ],
    bodyClosing:
      "One plan, one fixed price. No signup, no subscription. If the plan fails or the AI returns something wrong, we refund you.",
    values: [
      {
        title: "Clear over clever",
        desc: "We don't generate poetry. We give you opening hours, addresses, and short walks.",
      },
      {
        title: "Real places",
        desc: "The AI is grounded in a curated place library. No hallucinated restaurants.",
      },
      {
        title: "Honest pricing",
        desc: "One fixed price, no upsells. Refund if the plan is broken.",
      },
    ],
    ctaButton: "Plan a trip",
    contactLine: "Contact: gliddy@checkvisamap.com",
  },
  ko: {
    metaTitle: "소개",
    metaDescription:
      "우리가 gliddy를 만든 이유 — 실제 동선까지 짜주는 AI 여행 플래너.",
    eyebrow: "소개",
    headline: "여행 계획 짜는 데 주말을 다 쓸 필요는 없어요.",
    body: [
      "짧은 여행 한 번 가려고 해도 주말이 통째로 사라지더라고요. 탭 서른 개 열고, 식당 스무 곳 저장하고, 아직 잡지도 않은 호텔이랑 동선 맞춰보고, 막상 도착해서는 같은 길을 두 번 왕복하고.",
      "그래서 그 일부만 해결하는 작은 도구를 만들었어요. 몇 가지만 답하시면 AI가 실제 동선이 그려진 일정표를 만들어드려요. 교통이 편한 호텔, 동선 가까이 있는 식당, 운영 시간과 아이 동반 여부까지 다 따져서요. 휴대폰에서 바로 열 수 있는 링크 + 오프라인용 PDF로 보내드립니다.",
    ],
    bodyClosing:
      "한 번 결제, 한 권의 플랜. 가입도 구독도 없어요. 플랜이 안 만들어지거나 AI가 이상한 답을 내놓으면 환불해 드려요.",
    values: [
      {
        title: "꾸미지 않고 명확하게",
        desc: "시처럼 멋낸 문장이 아니라, 운영 시간·주소·짧은 도보 동선을 드려요.",
      },
      {
        title: "실재하는 장소만",
        desc: "AI는 직접 검수한 장소 DB 위에서만 작동해요. 지어낸 식당은 없습니다.",
      },
      {
        title: "정직한 가격",
        desc: "정가 한 가지, 추가 결제 없음. 플랜이 망가지면 환불해 드려요.",
      },
    ],
    ctaButton: "내 여행 계획하기",
    contactLine: "문의: gliddy@checkvisamap.com",
  },
  ja: {
    metaTitle: "私たちについて",
    metaDescription:
      "なぜgliddyを作ったのか — 実際の動線まで設計するAI旅行プランナー。",
    eyebrow: "私たちについて",
    headline: "旅行の計画に週末を使い切る必要はありません。",
    body: [
      "短い旅行でも、計画だけで週末を全部使ってしまいます。タブを30個開き、レストランを20店保存し、まだ予約していないホテルと照らし合わせ、現地に着いたら同じ道を2回行き来する。",
      "その一部分だけを解決する小さなツールを作りました。いくつかの質問に答えれば、AIが実際のルートマップ付きの日程表を作ってくれます。交通機関の近くにあるホテル、各スポットの近くにあるレストラン、営業時間や子連れ対応まで考慮済み。スマホで開けるリンク + オフライン用PDFでお届けします。",
    ],
    bodyClosing:
      "一回の購入、一つのプラン。登録もサブスクもありません。プラン生成に失敗したり、AIが間違った内容を返した場合は返金します。",
    values: [
      {
        title: "凝るより明確に",
        desc: "詩的な文章ではなく、営業時間、住所、短い徒歩ルートをお伝えします。",
      },
      {
        title: "実在する場所だけ",
        desc: "AIはキュレーションされた場所データベース上で動作。架空のレストランはありません。",
      },
      {
        title: "誠実な価格",
        desc: "固定価格一つ、追加料金なし。プランが壊れていたら返金。",
      },
    ],
    ctaButton: "旅行を計画する",
    contactLine: "お問い合わせ: gliddy@checkvisamap.com",
  },
  zh: {
    metaTitle: "关于我们",
    metaDescription:
      "我们为什么打造 gliddy — 一个真正规划路线的 AI 行程规划工具。",
    eyebrow: "关于我们",
    headline: "规划一次旅行,不该耗掉整个周末。",
    body: [
      "一次短途旅行,光是计划就能耗掉整个周末。打开三十个标签页、保存二十家餐厅、跟还没订的酒店反复核对,到了目的地还要走重复的路两遍。",
      "我们做了一个小工具,只解决其中一部分。回答几个问题,AI 会生成一份带真实路线图的日程表 —— 靠近交通的酒店、每站附近的餐厅、营业时间和亲子友好程度都已考虑。给您一个手机上能直接打开的链接,加一份可离线使用的 PDF。",
    ],
    bodyClosing:
      "一次付费、一份计划。无需注册、无需订阅。如果计划失败或 AI 给出错误结果,我们退款。",
    values: [
      {
        title: "清晰胜过花哨",
        desc: "我们不写散文。我们给您营业时间、地址和短距步行路线。",
      },
      {
        title: "真实的地点",
        desc: "AI 基于精选的地点库运行。绝无虚构的餐厅。",
      },
      {
        title: "诚实的定价",
        desc: "固定一价,无追加销售。计划有问题就退款。",
      },
    ],
    ctaButton: "规划我的行程",
    contactLine: "联系我们: gliddy@checkvisamap.com",
  },
  fr: {
    metaTitle: "À propos",
    metaDescription:
      "Pourquoi nous avons créé gliddy — un planificateur de voyage IA qui écrit un vrai itinéraire.",
    eyebrow: "À propos",
    headline: "Planifier un voyage ne devrait pas dévorer votre week-end.",
    body: [
      "Nous avons créé gliddy parce qu'un court voyage prend encore tout un week-end à planifier. Vous ouvrez trente onglets, sauvegardez vingt restaurants, les vérifiez par rapport à un hôtel pas encore réservé, puis arrivés sur place vous faites deux fois le même trajet.",
      "Nous avons fait un petit outil qui résout une partie du problème. Répondez à quelques questions, et notre IA renvoie un planning jour par jour avec une vraie carte d'itinéraire — hôtels près des transports, restaurants près de chaque étape, horaires d'ouverture et adapté aux enfants pris en compte. Vous obtenez un lien à ouvrir sur votre téléphone, et un PDF à garder hors ligne.",
    ],
    bodyClosing:
      "Un plan, un prix fixe. Pas d'inscription, pas d'abonnement. Si le plan échoue ou l'IA renvoie quelque chose de faux, nous vous remboursons.",
    values: [
      {
        title: "Clair plutôt qu'astucieux",
        desc: "Nous n'écrivons pas de poésie. Nous donnons les horaires, les adresses et les courts trajets.",
      },
      {
        title: "Lieux réels",
        desc: "L'IA est ancrée dans une bibliothèque de lieux sélectionnés. Aucun restaurant inventé.",
      },
      {
        title: "Prix honnête",
        desc: "Un prix fixe, aucune vente additionnelle. Remboursement si le plan est cassé.",
      },
    ],
    ctaButton: "Planifier un voyage",
    contactLine: "Contact : gliddy@checkvisamap.com",
  },
};
