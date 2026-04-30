import type { Locale } from "../../i18n/locales";

export type RefundSection =
  | { heading: string; body: string }
  | { heading: string; list: string[] }
  | { heading: string; bodies: string[] };

export interface RefundContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  lastUpdated: string;
  summaryHeading: string;
  summaryList: string[];
  sections: RefundSection[];
  contactHeading: string;
  contactBody: string;
  contactSeeAlso: string;
  termsLabel: string;
  privacyLabel: string;
}

export const REFUND_CONTENT: Record<Locale, RefundContent> = {
  en: {
    metaTitle: "Refund Policy",
    metaDescription:
      "Refund policy for gliddy — when we refund, when we don't, and how to request one. 14-day window, no-questions refunds for technical failures.",
    eyebrow: "Legal",
    headline: "Refund Policy",
    lastUpdated: "Last updated: April 23, 2026",
    summaryHeading: "Summary",
    summaryList: [
      "Automatic refund if we fail to generate your plan within 15 minutes of payment for any technical reason.",
      "Refund on request within 14 days if your plan includes a clearly hallucinated place (a restaurant, hotel, or attraction that does not actually exist at the stated location).",
      "No refund for taste preferences (liking or disliking a recommendation), for changes to your travel dates after purchase, or after the plan has been downloaded as a PDF and 14 days have passed.",
    ],
    sections: [
      {
        heading: "1. Technical failure refund",
        bodies: [
          "If our system fails to deliver a plan within 15 minutes of a successful charge — for example, Claude times out, our email delivery fails, or the plan is marked failed in our system — we initiate an automatic refund through LemonSqueezy to your original payment method. You do not need to contact us; we see the failure in logs and process it.",
          "Refunds typically appear on your statement within 5–10 business days depending on your card issuer. If you have not received the refund after 10 business days, email gliddy@checkvisamap.com with your LemonSqueezy order number.",
        ],
      },
      {
        heading: "2. Hallucination refund",
        bodies: [
          "AI-generated plans can occasionally include a place that does not exist at the stated location, or a place that has permanently closed. We work hard to prevent this with strict prompt rules and a curated place library, but no generation is perfect.",
          "If you open your plan and find a hallucinated place, reply to your plan delivery email within 14 days of purchase with the stop name and your best evidence (a search result showing the place does not exist at that address, etc.). We will refund the plan in full.",
        ],
      },
      {
        heading: "3. What we do not refund",
        list: [
          "Taste preferences. If a restaurant is a real place but you did not enjoy it, that is a subjective judgment we cannot refund against. We recommend real, well-known spots; we do not promise you will like every one.",
          "Travel changes. If your trip is cancelled, postponed, or rescheduled after you buy the plan, the plan itself was still generated and delivered. We cannot refund for that.",
          "Closed places that were open at generation time. Businesses close. If a restaurant shut down last month, we cannot refund for that — the information was current in our training data at generation.",
          "Weather or external disruption. Typhoons, strikes, flight cancellations — these are outside the scope of the plan.",
          "Plans opened more than 14 days ago unless the reason qualifies under section 1 or 2.",
        ],
      },
      {
        heading: "4. How to request a refund",
        body: "Reply to the original plan delivery email (subject line will match your destination) with the word REFUND at the top and the reason. If you cannot find the email, email gliddy@checkvisamap.com with your LemonSqueezy order number (from your payment receipt) and your destination. We reply within 2 business days and issue the refund through LemonSqueezy.",
      },
      {
        heading: "5. Chargebacks",
        body: "If you open a chargeback with your card issuer without first contacting us, we will contest it with evidence of delivery. We much prefer you just email us — we refund quickly for qualifying reasons and the process is less stressful for everyone.",
      },
    ],
    contactHeading: "6. Contact",
    contactBody: "Refund questions, order problems, or anything unclear:",
    contactSeeAlso: "See also our",
    termsLabel: "Terms of Service",
    privacyLabel: "Privacy Policy",
  },
  ko: {
    metaTitle: "환불 정책",
    metaDescription:
      "gliddy 환불 정책 — 언제 환불해 드리고, 언제 안 해드리는지, 신청 방법. 14일 윈도우, 기술적 실패는 무조건 환불.",
    eyebrow: "법적 고지",
    headline: "환불 정책",
    lastUpdated: "최종 수정: 2026년 4월 23일",
    summaryHeading: "요약",
    summaryList: [
      "결제 후 15분 이내 기술적 사유로 플랜 생성에 실패한 경우 자동 환불해 드려요.",
      "플랜에 실제로 존재하지 않는 장소(해당 위치에 없는 식당·호텔·관광지)가 포함된 경우, 14일 이내 신청 시 환불해 드려요.",
      "취향 차이(추천이 마음에 들지 않는 경우), 결제 후 여행 일정 변경, PDF 다운로드 후 14일 경과 시에는 환불해 드리지 않습니다.",
    ],
    sections: [
      {
        heading: "1. 기술적 실패로 인한 환불",
        bodies: [
          "결제 성공 후 15분 이내에 시스템이 플랜을 전달하지 못한 경우 — 예를 들어 Claude 타임아웃, 이메일 발송 실패, 시스템에서 플랜이 failed로 표시되는 경우 — LemonSqueezy를 통해 원래 결제 수단으로 자동 환불을 진행합니다. 따로 연락하지 않으셔도 됩니다. 저희가 로그에서 실패를 확인하고 처리해 드려요.",
          "환불은 보통 카드사에 따라 5~10영업일 안에 명세서에 반영됩니다. 10영업일이 지나도 환불이 도착하지 않으면 LemonSqueezy 주문 번호와 함께 gliddy@checkvisamap.com 으로 메일 주세요.",
        ],
      },
      {
        heading: "2. 존재하지 않는 장소가 포함된 경우",
        bodies: [
          "AI가 만든 플랜은 드물게 실제로 존재하지 않는 장소나 영구 폐업한 장소를 포함할 수 있어요. 엄격한 규칙과 직접 검수한 장소 데이터베이스로 이를 막기 위해 노력하지만, AI가 100% 완벽할 수는 없습니다.",
          "플랜을 열어보시고 존재하지 않는 장소를 발견하시면, 결제 후 14일 이내에 플랜 배송 메일에 회신해 주세요. 해당 코스 이름과 증거(그 주소에 그 장소가 없음을 보여주는 검색 결과 등)를 함께 보내주시면, 플랜 전액 환불해 드립니다.",
        ],
      },
      {
        heading: "3. 환불 불가 사유",
        list: [
          "취향 차이. 식당이 실재하는데 마음에 들지 않으셨다면, 이는 주관적 판단이라 환불해 드릴 수 없습니다. 실재하고 잘 알려진 장소를 추천하지만, 모두 마음에 드실 거라 약속드리진 못합니다.",
          "여행 변경. 결제 후 여행이 취소·연기·일정 변경된 경우, 플랜 자체는 정상 생성·전달되었기 때문에 환불 불가합니다.",
          "생성 시점에 영업 중이었으나 이후 폐업한 장소. 가게는 문을 닫습니다. 지난달 폐업한 식당에 대해서는 환불해 드릴 수 없습니다 — 생성 시점의 학습 데이터 기준으로는 최신이었습니다.",
          "날씨 또는 외부 요인. 태풍·파업·항공편 결항 — 플랜 범위 밖입니다.",
          "1번 또는 2번 사유에 해당하지 않는 한, 14일 이상 지난 플랜.",
        ],
      },
      {
        heading: "4. 환불 신청 방법",
        body: "원래 받으신 플랜 배송 메일(제목에 목적지 포함)에 회신하시고, 맨 위에 REFUND 라고 쓴 다음 사유를 적어주세요. 메일을 찾을 수 없으시면 LemonSqueezy 주문 번호(결제 영수증 참조)와 목적지를 포함해 gliddy@checkvisamap.com 으로 메일 주세요. 2영업일 안에 회신드리고 LemonSqueezy를 통해 환불 처리합니다.",
      },
      {
        heading: "5. 차지백 (카드사 결제 취소)",
        body: "저희에게 먼저 연락하지 않고 카드사에 결제 취소(차지백)를 신청하시면, 배송 증거와 함께 이의를 제기하게 됩니다. 메일로 먼저 알려주시는 게 훨씬 좋아요 — 사유가 맞으면 빠르게 환불해 드리고, 모두에게 스트레스가 적은 절차입니다.",
      },
    ],
    contactHeading: "6. 문의",
    contactBody: "환불 문의·주문 문제·기타 명확하지 않은 점:",
    contactSeeAlso: "아울러:",
    termsLabel: "이용약관",
    privacyLabel: "개인정보 처리방침",
  },
  ja: {
    metaTitle: "返金ポリシー",
    metaDescription:
      "gliddy 返金ポリシー — 返金する場合、しない場合、申請方法。14日間のウィンドウ、技術的失敗は無条件返金。",
    eyebrow: "法的事項",
    headline: "返金ポリシー",
    lastUpdated: "最終更新: 2026年4月23日",
    summaryHeading: "要約",
    summaryList: [
      "決済後15分以内に技術的な理由でプラン生成に失敗した場合、自動返金。",
      "プランに明らかに架空の場所(指定された場所に実際には存在しないレストラン・ホテル・観光地)が含まれていた場合、14日以内のリクエストで返金。",
      "好みの問題(推薦を好むか否か)、購入後の旅行日程変更、PDFダウンロード後14日経過の場合は返金不可。",
    ],
    sections: [
      {
        heading: "1. 技術的失敗返金",
        bodies: [
          "決済成功から15分以内にシステムがプランを配信できなかった場合 — 例: Claudeのタイムアウト、メール配信失敗、システムでプランが失敗と表示 — LemonSqueezy経由で元の支払い方法へ自動返金を開始します。当方からのご連絡は不要です。ログで失敗を確認し処理します。",
          "返金は通常、カード発行会社により5〜10営業日以内に明細書に反映されます。10営業日経っても返金が届かない場合は、LemonSqueezy注文番号を添えて gliddy@checkvisamap.com までメールをお送りください。",
        ],
      },
      {
        heading: "2. 幻覚返金",
        bodies: [
          "AI生成プランには稀に、指定された場所に存在しない場所や、恒久閉店した場所が含まれる可能性があります。厳格なプロンプトルールとキュレーションされた場所データベースでこれを防ぐよう努めていますが、完璧な生成はありません。",
          "プランを開いて幻覚された場所を見つけた場合、購入から14日以内にプラン配信メールにご返信ください。スポット名と証拠(その住所にその場所が存在しないことを示す検索結果など)を含めてください。プラン代金全額返金いたします。",
        ],
      },
      {
        heading: "3. 返金対象外",
        list: [
          "好み。レストランが実在するのに好まなかった場合、主観的判断のため返金できません。実在する有名な場所を推薦しますが、すべてを気に入っていただけるとはお約束できません。",
          "旅行変更。プラン購入後に旅行がキャンセル・延期・日程変更された場合、プラン自体は正常に生成・配信されているため返金できません。",
          "生成時には営業していたが閉店した場所。お店は閉店します。先月閉店したレストランについては返金できません — 生成時点の学習データでは最新でした。",
          "天候または外部の混乱。台風・ストライキ・欠航 — プランの範囲外です。",
          "セクション1または2の理由に該当しない限り、14日以上前に開かれたプラン。",
        ],
      },
      {
        heading: "4. 返金リクエスト方法",
        body: "元のプラン配信メール(件名に目的地が含まれます)にご返信いただき、上部に REFUND と書いて理由を記入してください。メールが見つからない場合、LemonSqueezy注文番号(決済領収書参照)と目的地を添えて gliddy@checkvisamap.com までメールをお送りください。2営業日以内に返信し、LemonSqueezy経由で返金を処理します。",
      },
      {
        heading: "5. チャージバック",
        body: "当方へのご連絡なしにカード発行会社にチャージバックを申請された場合、配信証拠とともに異議を申し立てます。メールでご連絡いただく方がはるかに望ましいです — 該当する理由には迅速に返金しますし、皆さまにとってストレスの少ない手続きです。",
      },
    ],
    contactHeading: "6. お問い合わせ",
    contactBody: "返金に関するご質問、注文の問題、その他不明な点:",
    contactSeeAlso: "あわせて:",
    termsLabel: "利用規約",
    privacyLabel: "プライバシーポリシー",
  },
  zh: {
    metaTitle: "退款政策",
    metaDescription:
      "gliddy 退款政策 — 何时退款、何时不退、如何申请。14 天窗口期,技术故障无条件退款。",
    eyebrow: "法律事项",
    headline: "退款政策",
    lastUpdated: "最后更新: 2026年4月23日",
    summaryHeading: "概要",
    summaryList: [
      "如果付款后 15 分钟内因任何技术原因未能生成您的计划,自动退款。",
      "如果您的计划包含明显虚构的地点(实际不存在于指定位置的餐厅、酒店或景点),14 天内可申请退款。",
      "因口味偏好(喜欢或不喜欢推荐)、购买后变更旅行日期,或计划已下载为 PDF 且超过 14 天的不退款。",
    ],
    sections: [
      {
        heading: "1. 技术故障退款",
        bodies: [
          "如果系统在成功扣款后 15 分钟内未能交付计划 — 例如 Claude 超时、邮件发送失败,或系统中计划被标记为失败 — 我们通过 LemonSqueezy 将自动退款至原付款方式。无需联系我们;我们会在日志中看到故障并处理。",
          "退款通常根据您的发卡机构,在 5–10 个工作日内显示在您的账单上。如果 10 个工作日后仍未收到退款,请将 LemonSqueezy 订单号发送至 gliddy@checkvisamap.com。",
        ],
      },
      {
        heading: "2. 幻觉退款",
        bodies: [
          "AI 生成的计划偶尔会包含不存在于指定位置的地点,或永久关闭的地点。我们通过严格的提示规则和精选地点库努力防止这种情况,但没有完美的生成。",
          "如果您打开计划并发现虚构的地点,请在购买后 14 天内回复您的计划交付邮件,附上景点名称和最佳证据(显示该地址不存在该地点的搜索结果等)。我们将全额退款。",
        ],
      },
      {
        heading: "3. 不予退款的情形",
        list: [
          "口味偏好。如果餐厅是真实地点但您不喜欢,这是主观判断,我们无法据此退款。我们推荐真实、知名的地点;不承诺您会喜欢每一个。",
          "旅行变更。如果您购买计划后旅行被取消、延期或重新安排,计划本身仍已生成并交付。我们无法因此退款。",
          "生成时营业但之后关闭的地点。商家会关门。如果一家餐厅上个月关门,我们无法因此退款 — 生成时训练数据中信息是最新的。",
          "天气或外部干扰。台风、罢工、航班取消 — 这些超出计划范围。",
          "除非符合第 1 或第 2 条的原因,否则超过 14 天打开的计划。",
        ],
      },
      {
        heading: "4. 如何申请退款",
        body: "回复原始计划交付邮件(主题行包含您的目的地),在顶部写上 REFUND,然后说明原因。如果找不到邮件,请将 LemonSqueezy 订单号(来自付款收据)和目的地发送至 gliddy@checkvisamap.com。我们在 2 个工作日内回复并通过 LemonSqueezy 处理退款。",
      },
      {
        heading: "5. 拒付",
        body: "如果您未先联系我们就向发卡机构提出拒付,我们将凭交付证据提出异议。我们更希望您直接发邮件 — 符合条件的原因我们会快速退款,流程对所有人都更轻松。",
      },
    ],
    contactHeading: "6. 联系我们",
    contactBody: "退款问题、订单问题或任何不清楚的事项:",
    contactSeeAlso: "另请参阅:",
    termsLabel: "服务条款",
    privacyLabel: "隐私政策",
  },
  fr: {
    metaTitle: "Politique de remboursement",
    metaDescription:
      "Politique de remboursement de gliddy — quand nous remboursons, quand nous ne le faisons pas, et comment en demander un. Fenêtre de 14 jours, remboursements sans question pour les échecs techniques.",
    eyebrow: "Mentions légales",
    headline: "Politique de remboursement",
    lastUpdated: "Dernière mise à jour : 23 avril 2026",
    summaryHeading: "Résumé",
    summaryList: [
      "Remboursement automatique si nous échouons à générer votre plan dans les 15 minutes suivant le paiement pour toute raison technique.",
      "Remboursement sur demande dans les 14 jours si votre plan inclut un lieu manifestement halluciné (un restaurant, hôtel ou attraction qui n'existe pas réellement à l'emplacement indiqué).",
      "Pas de remboursement pour les préférences de goût (aimer ou non une recommandation), pour les changements de dates de voyage après l'achat, ou après le téléchargement du plan en PDF et 14 jours écoulés.",
    ],
    sections: [
      {
        heading: "1. Remboursement pour échec technique",
        bodies: [
          "Si notre système ne parvient pas à livrer un plan dans les 15 minutes suivant un débit réussi — par exemple, Claude expire, notre livraison d'e-mail échoue, ou le plan est marqué comme échoué dans notre système — nous initions un remboursement automatique via LemonSqueezy vers votre mode de paiement d'origine. Vous n'avez pas besoin de nous contacter ; nous voyons l'échec dans les journaux et le traitons.",
          "Les remboursements apparaissent généralement sur votre relevé sous 5 à 10 jours ouvrables selon votre émetteur de carte. Si vous n'avez pas reçu le remboursement après 10 jours ouvrables, envoyez un e-mail à gliddy@checkvisamap.com avec votre numéro de commande LemonSqueezy.",
        ],
      },
      {
        heading: "2. Remboursement pour hallucination",
        bodies: [
          "Les plans générés par IA peuvent parfois inclure un lieu qui n'existe pas à l'emplacement indiqué, ou un lieu fermé définitivement. Nous travaillons dur pour éviter cela avec des règles de prompt strictes et une bibliothèque de lieux sélectionnés, mais aucune génération n'est parfaite.",
          "Si vous ouvrez votre plan et trouvez un lieu halluciné, répondez à votre e-mail de livraison de plan dans les 14 jours suivant l'achat avec le nom de l'étape et votre meilleure preuve (un résultat de recherche montrant que le lieu n'existe pas à cette adresse, etc.). Nous rembourserons le plan en totalité.",
        ],
      },
      {
        heading: "3. Ce que nous ne remboursons pas",
        list: [
          "Préférences de goût. Si un restaurant est un vrai lieu mais que vous ne l'avez pas apprécié, c'est un jugement subjectif que nous ne pouvons pas rembourser. Nous recommandons de vrais lieux bien connus ; nous ne promettons pas que vous aimerez chacun d'eux.",
          "Changements de voyage. Si votre voyage est annulé, reporté ou reprogrammé après avoir acheté le plan, le plan lui-même a été généré et livré. Nous ne pouvons pas rembourser pour cela.",
          "Lieux fermés qui étaient ouverts au moment de la génération. Les commerces ferment. Si un restaurant a fermé le mois dernier, nous ne pouvons pas rembourser pour cela — l'information était à jour dans nos données d'entraînement à la génération.",
          "Météo ou perturbation externe. Typhons, grèves, annulations de vols — ceux-ci sont en dehors du périmètre du plan.",
          "Plans ouverts il y a plus de 14 jours sauf si la raison se qualifie sous la section 1 ou 2.",
        ],
      },
      {
        heading: "4. Comment demander un remboursement",
        body: "Répondez à l'e-mail original de livraison du plan (la ligne d'objet correspondra à votre destination) avec le mot REMBOURSEMENT en haut et la raison. Si vous ne trouvez pas l'e-mail, envoyez un e-mail à gliddy@checkvisamap.com avec votre numéro de commande LemonSqueezy (depuis votre reçu de paiement) et votre destination. Nous répondons dans les 2 jours ouvrables et émettons le remboursement via LemonSqueezy.",
      },
      {
        heading: "5. Rétrofacturations",
        body: "Si vous ouvrez une rétrofacturation auprès de votre émetteur de carte sans nous contacter d'abord, nous la contesterons avec la preuve de livraison. Nous préférons largement que vous nous envoyiez un e-mail — nous remboursons rapidement pour les raisons éligibles et le processus est moins stressant pour tout le monde.",
      },
    ],
    contactHeading: "6. Contact",
    contactBody: "Questions de remboursement, problèmes de commande ou tout point peu clair :",
    contactSeeAlso: "Voir également notre",
    termsLabel: "Conditions d'utilisation",
    privacyLabel: "Politique de confidentialité",
  },
};
