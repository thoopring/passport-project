import type { Locale } from "../../i18n/locales";

export type PrivacySection =
  | { heading: string; body: string }
  | { heading: string; list: string[] };

export interface PrivacyContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  lastUpdated: string;
  sections: PrivacySection[];
  contactHeading: string;
  contactPrefix: string;
}

export const PRIVACY_CONTENT: Record<Locale, PrivacyContent> = {
  en: {
    metaTitle: "Privacy Policy",
    metaDescription: "Privacy Policy for gliddy. Learn how we handle your data.",
    eyebrow: "Legal",
    headline: "Privacy Policy",
    lastUpdated: "Last updated: April 17, 2026",
    sections: [
      {
        heading: "1. Information we collect",
        list: [
          "Trip plan inputs: When you order a plan, you provide a destination, duration, budget range, email, and a few preferences. We store this with the generated plan so we can re-deliver it to you.",
          "Email address: Required to deliver your plan. We do not add you to any marketing list unless you explicitly opt in.",
          "Analytics: Google Analytics 4, Google Tag Manager, and PostHog collect anonymous usage data (pages visited, device type, geographic region). No PII is collected through analytics.",
          "Cookies: Essential cookies for locale preference and referral attribution. Third-party cookies from analytics and affiliate partners.",
        ],
      },
      {
        heading: "2. How we use your information",
        list: [
          "To generate and deliver the trip plan you ordered",
          "To process payment via LemonSqueezy",
          "To improve the site and the AI's output quality",
          "To credit referral rewards",
        ],
      },
      {
        heading: "3. Third-party services",
        list: [
          "Anthropic (Claude API) — generates your plan from your inputs",
          "Supabase — stores plans, referrals, promo codes",
          "LemonSqueezy — processes payment",
          "Resend — delivers your plan email",
          "Mapbox — renders your route map",
          "Google Analytics / Google Tag Manager / PostHog — site analytics",
          "Agoda, Aviasales, Airalo — affiliate partners (clicks may set tracking cookies)",
        ],
      },
      {
        heading: "4. Affiliate disclosure",
        body: "This site contains affiliate links. When you click on these links and make a purchase, we may earn a commission at no additional cost to you.",
      },
      {
        heading: "5. Your rights",
        list: [
          "Request deletion of your plan and email by contacting us",
          "Opt out of analytics via browser Do Not Track",
          "Disable cookies in your browser",
        ],
      },
      {
        heading: "6. Data security",
        body: "We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.",
      },
      {
        heading: "7. Children's privacy",
        body: "Our service is not directed to children under 13. We do not knowingly collect personal information from children.",
      },
      {
        heading: "8. Changes to this policy",
        body: "We may update this policy from time to time. Changes will be posted here with an updated date.",
      },
    ],
    contactHeading: "9. Contact",
    contactPrefix: "For any questions, email",
  },
  ko: {
    metaTitle: "개인정보 처리방침",
    metaDescription: "gliddy 개인정보 처리방침. 회원님 데이터 처리 방식을 안내드립니다.",
    eyebrow: "법적 고지",
    headline: "개인정보 처리방침",
    lastUpdated: "최종 수정: 2026년 4월 17일",
    sections: [
      {
        heading: "1. 수집하는 정보",
        list: [
          "여행 플랜 입력값: 플랜 주문 시 목적지·기간·예산·이메일·몇 가지 선호사항을 입력하십니다. 재발송을 위해 생성된 플랜과 함께 저장합니다.",
          "이메일 주소: 플랜 전달에 필요합니다. 명시적으로 동의하지 않는 한 마케팅 리스트에 추가하지 않습니다.",
          "분석: Google Analytics 4, Google Tag Manager, PostHog가 익명 사용 데이터(방문 페이지·기기 종류·지역)를 수집합니다. 분석을 통해 개인 식별 정보는 수집되지 않습니다.",
          "쿠키: 로케일 설정과 추천 추적을 위한 필수 쿠키. 분석 및 제휴 파트너의 서드파티 쿠키.",
        ],
      },
      {
        heading: "2. 정보 사용 방법",
        list: [
          "주문하신 여행 플랜 생성 및 전달",
          "LemonSqueezy를 통한 결제 처리",
          "사이트 및 AI 출력 품질 개선",
          "추천 보상 적립",
        ],
      },
      {
        heading: "3. 제3자 서비스",
        list: [
          "Anthropic (Claude API) — 입력을 바탕으로 플랜 생성",
          "Supabase — 플랜·추천·프로모션 코드 저장",
          "LemonSqueezy — 결제 처리",
          "Resend — 플랜 이메일 발송",
          "Mapbox — 동선 지도 렌더링",
          "Google Analytics / Google Tag Manager / PostHog — 사이트 분석",
          "Agoda, Aviasales, Airalo — 제휴 파트너 (클릭 시 추적 쿠키 설정 가능)",
        ],
      },
      {
        heading: "4. 제휴 관계 고지",
        body: "본 사이트에는 제휴 링크가 포함됩니다. 회원님이 해당 링크를 통해 구매 시, 추가 비용 없이 저희가 수수료를 받을 수 있습니다.",
      },
      {
        heading: "5. 회원님의 권리",
        list: [
          "문의를 통해 플랜 및 이메일 삭제 요청",
          "브라우저 Do Not Track으로 분석 거부",
          "브라우저에서 쿠키 비활성화",
        ],
      },
      {
        heading: "6. 데이터 보안",
        body: "회원님 정보 보호를 위해 합리적인 보안 조치를 시행합니다. 다만 인터넷 전송 과정 중 100% 안전한 방법은 존재하지 않습니다.",
      },
      {
        heading: "7. 아동 개인정보",
        body: "본 서비스는 13세 미만 아동을 대상으로 하지 않습니다. 아동에게서 의도적으로 개인정보를 수집하지 않습니다.",
      },
      {
        heading: "8. 본 정책 변경",
        body: "본 정책은 수시로 업데이트될 수 있습니다. 변경 사항은 수정 일자와 함께 본 페이지에 게시됩니다.",
      },
    ],
    contactHeading: "9. 문의",
    contactPrefix: "문의 사항이 있으시면 다음으로 메일 주세요:",
  },
  ja: {
    metaTitle: "プライバシーポリシー",
    metaDescription: "gliddy プライバシーポリシー。お客様のデータの取り扱いについてご案内します。",
    eyebrow: "法的事項",
    headline: "プライバシーポリシー",
    lastUpdated: "最終更新: 2026年4月17日",
    sections: [
      {
        heading: "1. 収集する情報",
        list: [
          "旅行プランの入力情報: プラン注文時に、目的地・期間・予算範囲・メールアドレス・いくつかの好みを入力していただきます。再送のため、生成されたプランと一緒に保存します。",
          "メールアドレス: プラン配信に必要です。明示的にご同意いただかない限り、マーケティングリストには追加しません。",
          "アナリティクス: Google Analytics 4、Google Tag Manager、PostHogが匿名の利用データ(訪問ページ・端末種別・地域)を収集します。アナリティクスを通じて個人識別情報は収集しません。",
          "Cookie: ロケール設定と紹介追跡のための必須Cookie。アナリティクスとアフィリエイトパートナーのサードパーティCookie。",
        ],
      },
      {
        heading: "2. 情報の使用方法",
        list: [
          "ご注文いただいた旅行プランの生成と配信",
          "LemonSqueezyを通じた決済処理",
          "サイトとAI出力品質の改善",
          "紹介報酬の付与",
        ],
      },
      {
        heading: "3. 第三者サービス",
        list: [
          "Anthropic (Claude API) — 入力情報からプラン生成",
          "Supabase — プラン・紹介・プロモコードの保存",
          "LemonSqueezy — 決済処理",
          "Resend — プランメール配信",
          "Mapbox — ルートマップのレンダリング",
          "Google Analytics / Google Tag Manager / PostHog — サイト分析",
          "Agoda, Aviasales, Airalo — アフィリエイトパートナー(クリック時に追跡Cookieが設定される場合があります)",
        ],
      },
      {
        heading: "4. アフィリエイト開示",
        body: "本サイトにはアフィリエイトリンクが含まれます。これらのリンクをクリックして購入された際、追加費用なしで当方が手数料を受け取る場合があります。",
      },
      {
        heading: "5. お客様の権利",
        list: [
          "ご連絡いただくことでプランとメールアドレスの削除を要求",
          "ブラウザのDo Not Trackでアナリティクスを拒否",
          "ブラウザでCookieを無効化",
        ],
      },
      {
        heading: "6. データセキュリティ",
        body: "お客様の情報を保護するため合理的なセキュリティ対策を実施しています。ただし、インターネット送信に100%安全な方法は存在しません。",
      },
      {
        heading: "7. お子様のプライバシー",
        body: "本サービスは13歳未満のお子様を対象としていません。お子様から意図的に個人情報を収集することはありません。",
      },
      {
        heading: "8. ポリシーの変更",
        body: "本ポリシーは随時更新される場合があります。変更は更新日とともに本ページに掲載されます。",
      },
    ],
    contactHeading: "9. お問い合わせ",
    contactPrefix: "ご不明な点があれば、次へメールをお送りください:",
  },
  zh: {
    metaTitle: "隐私政策",
    metaDescription: "gliddy 隐私政策。了解我们如何处理您的数据。",
    eyebrow: "法律事项",
    headline: "隐私政策",
    lastUpdated: "最后更新: 2026年4月17日",
    sections: [
      {
        heading: "1. 我们收集的信息",
        list: [
          "行程规划输入: 订购计划时,您提供目的地、时长、预算范围、邮箱和几项偏好。我们将其与生成的计划一起保存,以便重新发送给您。",
          "邮箱地址: 用于发送您的计划。除非您明确选择加入,否则我们不会将您添加到任何营销列表。",
          "分析: Google Analytics 4、Google Tag Manager 和 PostHog 收集匿名使用数据(访问页面、设备类型、地理区域)。我们通过分析不收集任何个人身份信息。",
          "Cookie: 用于语言偏好和推荐归因的必要 Cookie。来自分析和推广合作伙伴的第三方 Cookie。",
        ],
      },
      {
        heading: "2. 我们如何使用您的信息",
        list: [
          "生成并发送您订购的行程",
          "通过 LemonSqueezy 处理付款",
          "改进网站和 AI 输出质量",
          "记录推荐奖励",
        ],
      },
      {
        heading: "3. 第三方服务",
        list: [
          "Anthropic (Claude API) — 根据您的输入生成计划",
          "Supabase — 存储计划、推荐和促销码",
          "LemonSqueezy — 处理付款",
          "Resend — 发送计划邮件",
          "Mapbox — 渲染路线地图",
          "Google Analytics / Google Tag Manager / PostHog — 网站分析",
          "Agoda、Aviasales、Airalo — 推广合作伙伴(点击可能设置追踪 Cookie)",
        ],
      },
      {
        heading: "4. 推广合作披露",
        body: "本站包含推广链接。当您点击这些链接并进行购买时,我们可能获得佣金,这不会对您产生额外费用。",
      },
      {
        heading: "5. 您的权利",
        list: [
          "通过联系我们要求删除您的计划和邮箱",
          "通过浏览器 Do Not Track 退出分析",
          "在浏览器中禁用 Cookie",
        ],
      },
      {
        heading: "6. 数据安全",
        body: "我们采取合理的安全措施保护您的信息。但是,互联网传输不存在 100% 安全的方法。",
      },
      {
        heading: "7. 儿童隐私",
        body: "本服务不针对 13 岁以下儿童。我们不会刻意收集儿童的个人信息。",
      },
      {
        heading: "8. 政策变更",
        body: "本政策可能不时更新。变更将与更新日期一起在此处发布。",
      },
    ],
    contactHeading: "9. 联系我们",
    contactPrefix: "如有任何问题,请发送邮件至",
  },
  fr: {
    metaTitle: "Politique de confidentialité",
    metaDescription: "Politique de confidentialité de gliddy. Découvrez comment nous traitons vos données.",
    eyebrow: "Mentions légales",
    headline: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour : 17 avril 2026",
    sections: [
      {
        heading: "1. Informations que nous collectons",
        list: [
          "Entrées du plan de voyage : Lorsque vous commandez un plan, vous fournissez une destination, une durée, une fourchette de budget, un e-mail et quelques préférences. Nous les stockons avec le plan généré pour pouvoir vous le renvoyer.",
          "Adresse e-mail : Requise pour livrer votre plan. Nous ne vous ajoutons à aucune liste marketing sauf si vous y consentez explicitement.",
          "Analytique : Google Analytics 4, Google Tag Manager et PostHog collectent des données d'utilisation anonymes (pages visitées, type d'appareil, région géographique). Aucune information personnelle identifiable n'est collectée via l'analytique.",
          "Cookies : Cookies essentiels pour la préférence de langue et l'attribution de parrainage. Cookies tiers d'analytique et de partenaires d'affiliation.",
        ],
      },
      {
        heading: "2. Comment nous utilisons vos informations",
        list: [
          "Pour générer et livrer le plan de voyage commandé",
          "Pour traiter le paiement via LemonSqueezy",
          "Pour améliorer le site et la qualité de sortie de l'IA",
          "Pour créditer les récompenses de parrainage",
        ],
      },
      {
        heading: "3. Services tiers",
        list: [
          "Anthropic (Claude API) — génère votre plan à partir de vos entrées",
          "Supabase — stocke les plans, parrainages, codes promo",
          "LemonSqueezy — traite le paiement",
          "Resend — livre votre e-mail de plan",
          "Mapbox — rend votre carte d'itinéraire",
          "Google Analytics / Google Tag Manager / PostHog — analytique du site",
          "Agoda, Aviasales, Airalo — partenaires d'affiliation (les clics peuvent définir des cookies de suivi)",
        ],
      },
      {
        heading: "4. Divulgation d'affiliation",
        body: "Ce site contient des liens d'affiliation. Lorsque vous cliquez sur ces liens et effectuez un achat, nous pouvons gagner une commission sans coût supplémentaire pour vous.",
      },
      {
        heading: "5. Vos droits",
        list: [
          "Demander la suppression de votre plan et de votre e-mail en nous contactant",
          "Refuser l'analytique via Do Not Track du navigateur",
          "Désactiver les cookies dans votre navigateur",
        ],
      },
      {
        heading: "6. Sécurité des données",
        body: "Nous mettons en œuvre des mesures de sécurité raisonnables pour protéger vos informations. Cependant, aucune méthode de transmission sur Internet n'est sûre à 100 %.",
      },
      {
        heading: "7. Confidentialité des enfants",
        body: "Notre service ne s'adresse pas aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d'informations personnelles d'enfants.",
      },
      {
        heading: "8. Modifications de cette politique",
        body: "Nous pouvons mettre à jour cette politique de temps à autre. Les modifications seront publiées ici avec une date mise à jour.",
      },
    ],
    contactHeading: "9. Contact",
    contactPrefix: "Pour toute question, écrivez à",
  },
};
