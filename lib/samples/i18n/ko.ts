import type { LocaleTranslations } from "../i18n";

/**
 * Korean translations for sample plans. Sparse-override structure — only
 * fields that need localization are present; everything else (coords,
 * prices, durations, structural fields) inherits from the base English plan.
 *
 * Coverage as of 2026-04-27:
 *   tokyo-4d-couple    full (overview + all 4 days × all stops + tips)
 *   paris-3d-family    full
 *   seoul-3d-foodie    full
 *   bangkok-4d-solo    full
 *   osaka/nyc/bali/taipei/hanoi/london — fall back to English (deferred)
 *
 * To add a city: read its source file (lib/samples/{slug}.ts), copy each
 * user-facing string into a key under the matching slug here, translate.
 * Stop arrays are parallel-indexed — stops[0] in the override applies to
 * stops[0] in the base.
 */
const ko: LocaleTranslations = {
  "tokyo-4d-couple": {
    destination: "도쿄",
    destinationCountry: "일본",
    overview:
      "커플 둘이 도쿄의 상징적인 모습과 조용하고 로맨틱한 순간을 균형 있게 즐길 수 있게 짠 4일 일정이에요. 매일 아침과 저녁을 기억에 남는 식사로 마무리하고, 수백 년 된 신사가 네온 도시와 공존하는 동네를 천천히 걸으며, 호텔 방 사진으로 남길 만한 일몰로 하루를 끝맺어요.",
    bestSeasonNote:
      "벚꽃 시즌 3월 말~4월 초, 또는 단풍 시즌 11월 중순이 가장 좋아요. 골든위크(4월 말~5월 초)는 일본 국내 여행객이 몰려 가격과 혼잡도가 치솟으니 피하세요.",
    currencyTip:
      "일본은 의외로 현금이 많이 쓰이는 나라예요. 도착하자마자 7-Eleven ATM에서 3만~5만엔 정도 뽑아두세요. 작은 식당이나 신사에서는 외국 카드보다 현금이 훨씬 잘 받혀요.",
    languageTip:
      "구글 번역 카메라 모드로 메뉴판 바로 읽을 수 있어요. '스미마셍(실례합니다)'과 가벼운 인사만 잘 해도 어디서든 환영받아요.",
    emergencyNumber: "110 (경찰), 119 (구급/소방)",
    hotel: {
      name: "호텔 그레이서리 신주쿠",
      area: "신주쿠",
      address: "1-19-1 가부키초, 신주쿠구, 도쿄 160-8466",
      rationale:
        "나리타에서 4일 여행이라면 신주쿠가 최적의 베이스예요. 나리타 익스프레스가 호텔 6분 거리에 도착하고, 필요한 JR과 지하철 노선이 모두 여기서 갈라져요. 저녁 식사도 걸어서 갈 수 있어요. 입구 위 고질라 머리 장식은 보너스 재미.",
      estimatedNightlyRate: "약 14만원/박",
    },
    airportTransit: {
      method: "나리타 익스프레스(N'EX) → JR 신주쿠역",
      duration: "약 80분",
      cost: "약 3만 5천원 (외국인 왕복 할인 가능)",
      instructions:
        "나리타 1터미널에서 입국심사 후 파란색 'JR' 표지판을 따라 지하 1층으로 내려가세요. JR EAST Travel Service Center에서 외국인 왕복 티켓을 구입(여권 필요). 신주쿠행 N'EX 아무거나 타시면 종점이라 놓칠 수 없어요. 신주쿠역 남쪽 출구에서 가부키초를 가로질러 6분 평지길.",
    },
    days: [
      {
        theme: "시부야 & 하라주쿠",
        summary:
          "도쿄에서 가장 사진 잘 나오는 동네 두 곳을 반나절에 둘러보고, 황혼 무렵 그 유명한 횡단보도로 마무리.",
        stops: [
          {
            name: "메이지 신궁",
            area: "시부야",
            address: "1-1 요요기카미조노초, 시부야구",
            duration: "1시간 30분",
            description:
              "1920년 자원봉사자 10만 명이 심은 70헥타르 숲에 둘러싸인 신토 신사예요. 도리이 문과 자갈 참배길이 도시의 소음을 즉시 차단해줘요.",
            estimatedCost: "무료",
            transitFromPrev: "신주쿠에서 JR 야마노테선(4분), 하라주쿠역에서 도보 5분",
          },
          {
            name: "타케시타 거리",
            area: "하라주쿠",
            duration: "1시간",
            description:
              "도쿄 청소년 패션의 진원지. 사실 게 없어도 무지개 솜사탕과 크레페 가게들이 만들어내는 감각의 폭발은 한번 걸어볼 만해요.",
            estimatedCost: "간식 약 1만 2천원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "아후리 하라주쿠 (유즈 시오 라멘)",
            area: "하라주쿠",
            duration: "45분",
            description:
              "더운 날에 딱인 가볍고 시트러스 향이 도는 라멘. 입구 자판기에서 표 뽑고 카운터에 넘기면 5분 안에 후루룩.",
            estimatedCost: "약 1만 5천원",
            transitFromPrev: "도보 3분",
          },
          {
            name: "오모테산도",
            area: "오모테산도",
            duration: "1시간",
            description:
              "도쿄의 샹젤리제예요. 안도 다다오, 헤르조그 & 드 뫼롱, SANAA가 설계한 플래그십 매장들이 늘어선 느티나무 가로수길. 윈도우 쇼핑만 해도 건축 산책이 돼요.",
            estimatedCost: "무료",
            transitFromPrev: "도보 10분",
          },
          {
            name: "시부야 스크램블 & 하치코 동상",
            area: "시부야",
            duration: "1시간",
            description:
              "세계에서 가장 유명한 교차로. 한 번은 직접 건너보고, 2층 스타벅스에서 위에서 내려다보는 그 엽서 사진을 남겨보세요. 하치코 동상에 잠깐 인사도 잊지 말고요.",
            estimatedCost: "무료 (커피 살 거면 약 6천원)",
            transitFromPrev: "도쿄 메트로 긴자선 4분",
          },
          {
            name: "우오베이 스시 시부야 도겐자카",
            area: "시부야",
            duration: "1시간",
            description:
              "주문한 초밥이 미니 신칸센 트랙으로 자리까지 배달되는 하이테크 회전 초밥집. 퀄리티 좋고 재미는 진짜고, 둘이 약 4만 5천원이면 배부르게 먹어요.",
            estimatedCost: "1인 약 2만 4천원",
            bookingTip: "태블릿 메뉴 영어 지원. 피크 시간에는 15~20분 대기, 키오스크에서 이름 등록하고 음료 한잔.",
            transitFromPrev: "도보 8분",
          },
        ],
      },
      {
        theme: "오래된 도쿄: 아사쿠사 & 우에노",
        summary:
          "시타마치(下町, 옛 동네)에서 보내는 하루 — 역사 깊은 사찰, 길거리 음식 골목, 도쿄 최고의 박물관 클러스터.",
        stops: [
          {
            name: "센소지",
            area: "아사쿠사",
            address: "2-3-1 아사쿠사, 다이토구",
            duration: "1시간 30분",
            description:
              "도쿄에서 가장 오래된 사찰(645년 창건). 거대한 빨간 등이 달린 가미나리몬을 지나 나카미세 상점가를 따라 본당까지 올라가세요. 10시 전에 도착하면 인파 없이 사진 찍을 수 있어요.",
            estimatedCost: "무료",
            transitFromPrev: "시부야에서 도쿄 메트로 긴자선 → 아사쿠사, 약 35분",
          },
          {
            name: "나카미세도리",
            area: "아사쿠사",
            duration: "45분",
            description:
              "200미터에 걸친 노점 골목. 닌교야키(인형 모양 카스텔라), 센베이, 전통 공예품을 팔아요. 아사쿠사 코코노에의 아게만주(팥소를 튀긴 빵)가 진리.",
            estimatedCost: "간식 약 1만원",
            transitFromPrev: "내장됨",
          },
          {
            name: "다이코쿠야 텐푸라",
            area: "아사쿠사",
            duration: "1시간",
            description:
              "130년 된 텐푸라 노포. 텐동(밥 위 텐푸라)이 진하고 달콤해서 일본 외에서는 만나기 힘든 맛이에요. 줄은 있지만 빨리 빠져요.",
            estimatedCost: "약 2만 2천원",
            bookingTip: "예약 안 받음. 11시 45분 또는 14시에 가면 줄 짧음.",
            transitFromPrev: "도보 5분",
          },
          {
            name: "도쿄 국립 박물관",
            area: "우에노",
            address: "13-9 우에노코엔, 다이토구",
            duration: "2시간",
            description:
              "일본에서 가장 오래되고 큰 박물관. 다른 건 다 건너뛰고 본관(혼칸)만 가세요. 2층 사무라이 갑옷과 카타나 갤러리가 세계적 수준이에요.",
            estimatedCost: "약 9천원",
            transitFromPrev: "도쿄 메트로 긴자선 아사쿠사 → 우에노, 5분, 도보 10분",
          },
          {
            name: "우에노 공원 산책",
            area: "우에노",
            duration: "1시간",
            description:
              "도쿄 최초의 공립 공원. 시노바즈 연못 주변을 걷고, 작은 다리를 건너 벤텐도까지. 여름이면 연꽃이 만개해요.",
            estimatedCost: "무료",
            transitFromPrev: "도보 5분",
          },
          {
            name: "아메야요코초 먹자골목",
            area: "우에노",
            duration: "1시간 30분",
            description:
              "전후 암시장이 도쿄에서 가장 정신없는 먹자거리로 변신한 곳. 스탠딩바를 옮겨 다니며 꼬치, 스탠딩 초밥, 술 한 잔.",
            estimatedCost: "1인 약 3만 2천원",
            transitFromPrev: "도보 10분",
          },
        ],
      },
      {
        theme: "츠키지, 긴자 & 황궁",
        summary:
          "초밥 아침, 황실 정원 산책, 그리고 세계에서 가장 세련된 쇼핑 거리에서의 저녁.",
        stops: [
          {
            name: "츠키지 장외시장 아침식사",
            area: "츠키지",
            address: "츠키지 4초메, 주오구",
            duration: "1시간 30분",
            description:
              "도매시장 자체는 도요스로 옮겼지만 장외시장은 그대로 남아 초밥 카운터, 다마고야키, 우니 가게들의 천국이에요. 스시다이는 사라졌지만 스시잔마이 본점이 훌륭한 오마카세 조식을 내요.",
            estimatedCost: "약 4만원",
            bookingTip: "8시 30분까지 도착. 대부분 가게 13시면 닫아요.",
            transitFromPrev: "신주쿠에서 도쿄 메트로 마루노우치 → 히비야선, 약 25분",
          },
          {
            name: "하마리큐 정원",
            area: "시오도메",
            duration: "1시간",
            description:
              "17세기 쇼군의 정원. 바닷물이 들어오는 연못과 300년 된 소나무가 있어요. 섬 위 나카지마 찻집에서 말차와 와가시 한 그릇 추천.",
            estimatedCost: "입장 약 4천원 + 차 약 1만원",
            transitFromPrev: "도보 15분",
          },
          {
            name: "황궁 동쪽 정원",
            area: "치요다",
            duration: "1시간 30분",
            description:
              "에도 성의 흔적이 남은 무료 공립 정원. 원래 천수각의 석축 기단을 걸어보고 스와 차야도 찾아보세요. 월·금 휴무.",
            estimatedCost: "무료",
            transitFromPrev: "도쿄 메트로 히비야선 신바시 → 히비야 도보, 약 15분",
          },
          {
            name: "톤카츠 마이센 아오야마",
            area: "아오야마",
            duration: "1시간",
            description:
              "옛 목욕탕을 개조한 도쿄에서 가장 사랑받는 톤카츠 식당. 흑돈 등심 세트를 주문하세요. 양배추 무한 리필, 잡곡밥 옵션 가능.",
            estimatedCost: "약 2만 4천원",
            transitFromPrev: "도쿄 메트로 치요다선, 약 10분",
          },
          {
            name: "긴자 쇼핑가",
            area: "긴자",
            duration: "2시간",
            description:
              "명품 브랜드에 관심 없어도 일요일 오후 보행자 천국 시간의 추오도리를 걷고, 6층짜리 이토야 문구점을 들르고, 애플 스토어 옥상 뷰를 보러 가세요.",
            estimatedCost: "무료~$$$$",
            transitFromPrev: "도쿄 메트로 긴자선, 8분",
          },
          {
            name: "야키토리 이마이",
            area: "아오야마",
            duration: "1시간 30분",
            description:
              "닭의 모든 부위를 비장탄으로 굽는 미슐랭급 야키토리집. 오마카세 코스가 정답. 길고 도시적인 하루의 완벽한 마무리.",
            estimatedCost: "1인 약 6만원",
            bookingTip: "1~2주 전 호텔 컨시어지 통해 예약. 영어 통화 가능.",
            transitFromPrev: "도쿄 메트로, 약 15분",
          },
        ],
      },
      {
        theme: "당일치기: 가마쿠라",
        summary:
          "도쿄 남쪽 1시간. 일본 첫 막부의 거점이었던 도시. 사찰, 대불, 일몰을 위한 넓은 해변.",
        stops: [
          {
            name: "가마쿠라행 열차",
            area: "도쿄역 → 가마쿠라",
            duration: "1시간",
            description:
              "도쿄역에서 JR 요코스카선 직통으로 가마쿠라까지. JR EAST 외국인 창구에서 가마쿠라 프리패스를 사두면 오후에 탈 에노덴까지 무제한.",
            estimatedCost: "왕복 약 2만원",
            transitFromPrev: "신주쿠 → 주오선 → 도쿄역, 약 20분",
          },
          {
            name: "쓰루가오카 하치만구",
            area: "가마쿠라",
            address: "유키노시타 2-1-31, 가마쿠라",
            duration: "1시간",
            description:
              "1063년 창건된 가마쿠라의 가장 중요한 신사. 사무라이 행렬길이었던 와카미야오지를 따라 올라가 가파른 계단 위에서 도시와 바다를 한눈에 내려다보세요.",
            estimatedCost: "무료",
            transitFromPrev: "가마쿠라역에서 도보 10분",
          },
          {
            name: "요리토모 소바",
            area: "코마치도리",
            duration: "1시간",
            description:
              "가마쿠라의 공예·간식 거리 코마치도리를 걸으며 전통 소바집 아무 데나 들어가세요. 손으로 자른 메밀국수에 차가운 츠유 — 가벼우면서 아침 등산 후 완벽.",
            estimatedCost: "약 1만 6천원",
            transitFromPrev: "도보 10분",
          },
          {
            name: "에노덴 하세역",
            area: "가마쿠라 → 하세",
            duration: "10분",
            description:
              "1902년에 깐 단선 노면전차. 해안을 따라 달려요. 오른쪽 자리에 앉아 바다 풍경을 즐기세요.",
            estimatedCost: "패스에 포함",
            transitFromPrev: "가마쿠라역까지 도보 5분",
          },
          {
            name: "고토쿠인 (가마쿠라 대불)",
            area: "하세",
            address: "하세 4-2-28, 가마쿠라",
            duration: "1시간",
            description:
              "1252년 주조된 13.35미터 청동 대불. 1498년 쓰나미로 본당이 무너진 이후 600년 넘게 한데서 비를 맞으며 앉아 있어요. 추가 200원으로 대불 내부에 들어갈 수도 있어요.",
            estimatedCost: "약 4천원 + 200원 내부",
            transitFromPrev: "도보 10분",
          },
          {
            name: "유이가하마 해변 일몰",
            area: "유이가하마",
            duration: "1시간",
            description:
              "가마쿠라의 활처럼 휜 서핑 해변. 비수기에는 거의 비어 있어요. 모래에 앉아 갑 너머로 해가 떨어지는 걸 지켜보세요. 일본 여행을 마무리하는 완벽한 장면.",
            estimatedCost: "무료",
            transitFromPrev: "도보 10분",
          },
        ],
      },
    ],
    packingTips: [
      "벗기 쉬운 신발 — 신사, 료칸, 일부 식당에서 신발을 벗어요",
      "작은 보조가방 — 도쿄는 공공 쓰레기통이 거의 없어 종일 쓰레기를 들고 다녀요",
      "보조 배터리 — 구글 지도와 번역기가 배터리를 빨아먹어요",
      "현금 지갑 — 작은 식당은 여전히 현금만 받는 곳이 많아요",
    ],
    budgetEstimate: "호텔 제외 둘이 하루 16만~24만원",
    generalTips: [
      "1일차에 스이카 IC카드 발급 — 모든 전철·버스·자판기 터치 결제",
      "편의점 음식(7-Eleven, Lawson, FamilyMart) 진짜 좋아요. 아침은 편의점으로 해결",
      "팁 문화 없어요 — 오히려 직원이 당황해요",
      "박물관 대부분 월요일 휴무 — 일정 짤 때 참고",
    ],
  },

  "paris-3d-family": {
    destination: "파리",
    destinationCountry: "프랑스",
    overview:
      "어린아이 둘과 함께 파리의 상징을 두 시간 만에 무너지지 않고 보고 싶은 가족을 위한 3일. 매일 큰 명소 하나에 긴 공원 시간을 짝짓고, 진짜 화장실이 있는 점심 자리를 끼워두고, 다음 날 아침 크루아상을 즐길 에너지가 남도록 일찍 마무리해요.",
    bestSeasonNote:
      "5~6월과 9월이 베스트. 공원 즐기기 좋고 메트로도 시원하고 박물관 줄도 한여름보다 훨씬 짧아요.",
    currencyTip:
      "박물관과 식당 대부분 컨택트리스 카드 됩니다. 아이스크림, 회전목마, 작은 빵집 결제용으로 동전 40~60유로 정도 챙기세요.",
    languageTip:
      "영어로 묻기 전 'Bonjour(봉주르)'부터 시작하세요. 파리지앵의 친절도가 극적으로 달라져요.",
    emergencyNumber: "112 (EU 응급), 15 (의료)",
    hotel: {
      name: "시타딘 투르 에펠 파리",
      area: "파리 15구, 에펠탑 인근",
      address: "132 Boulevard de Grenelle, 75015 Paris",
      rationale:
        "키친넷이 있는 아파트호텔이라 가족에게 큰 도움이에요(잠옷 차림 아침, 한낮 간식, 아이 시리얼용 우유). 에펠탑까지 도보, 비르하켐역까지 도보 — 거기서 4정거장이면 루브르예요. 샤를드골 공항에서는 RER B + 메트로 6번이 유모차 친화적이고 가장 저렴.",
      estimatedNightlyRate: "약 28만원/박",
    },
    airportTransit: {
      method: "RER B → 메트로 6호선 (또는 첫날만 택시)",
      duration: "기차 약 75분 / 택시 약 50분",
      cost: "기차 가족권 약 2만원 / 택시 약 9만원",
      instructions:
        "짐과 지친 아이가 있으면 CDG에서 좌안(Left Bank)까지 56유로 정찰제 택시가 최고. 기차 루트: CDG 2터미널에서 RER B 표지판을 따라 파리 센트럴행 아무 차량 → Denfert-Rochereau에서 메트로 6호선(Charles de Gaulle-Étoile 방향) 환승 → Bir-Hakeim 하차. 시타딘은 도보 5분. RER B는 일부 구간 계단이 있으니 유모차+큰 짐이면 택시 추천.",
    },
    days: [
      {
        theme: "에펠탑 & 샹드마르 공원",
        summary:
          "상징부터 시작 → 공원에서 긴 피크닉 → 진짜 파리지앵 놀이터에서 아이들 에너지 방전.",
        stops: [
          {
            name: "에펠탑 (2층)",
            area: "샹드마르",
            address: "5 Avenue Anatole France, 75007 Paris",
            duration: "1시간 30분",
            description:
              "꼭대기 티켓은 건너뛰세요 — 2층도 같은 감동에 줄 짧고 유모차 들어가는 엘리베이터 있어요. 2개월 전 시간지정 계단+엘리베이터 티켓 온라인 예약.",
            estimatedCost: "성인 약 3만원, 아동 약 1만 5천원",
            bookingTip: "toureiffel.paris에서 정확히 60일 전 파리 시각 8시 30분에 풀려요. 2시간 안에 매진.",
            transitFromPrev: "호텔에서 도보 10분",
          },
          {
            name: "불랑제리 위토피 피크닉",
            area: "샹드마르",
            duration: "1시간",
            description:
              "최고급 빵집에서 바게트, 잠봉뵈르 샌드위치, 과일, 페이스트리를 사 들고 샹드마르 잔디에 펼쳐 놓고 에펠탑을 보며 식사. 어떤 식당보다 싸고 조용하고 기억에 남아요.",
            estimatedCost: "가족 약 3만 2천원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "샹드마르 회전목마 & 놀이터",
            area: "샹드마르",
            duration: "1시간 30분",
            description:
              "공원 남쪽 끝에 100년 된 진짜 회전목마가 있어요. 옆에는 모래·미끄럼틀·등반망이 있는 울타리 놀이터. 아이들이 발산하는 시간.",
            estimatedCost: "회전목마 약 6천원",
            transitFromPrev: "내장됨",
          },
          {
            name: "호텔 휴식 (아이 낮잠)",
            area: "15구",
            duration: "1시간 30분",
            description:
              "가족 여행에선 필수. 아파트호텔로 돌아가 차 한잔하고 아이는 만화 보여주세요. 한 곳 더 끼워 넣고 싶은 충동을 참아야 해요.",
            estimatedCost: "무료",
            transitFromPrev: "도보 10분",
          },
          {
            name: "카페 콩스탕",
            area: "Rue Saint-Dominique",
            duration: "1시간 30분",
            description:
              "셰프 크리스티앙 콩스탕의 동네 비스트로. 진짜 프랑스 음식, 아이 환영, 빠른 서비스, 진지한 키즈 메뉴. 로스트치킨 + 프리트 + 프로피트롤 1인당 1개씩.",
            estimatedCost: "가족 약 10만원",
            bookingTip: "TheFork로 1주 전 예약 — 가족 예약 잘 받아줘요.",
            transitFromPrev: "도보 10분",
          },
        ],
      },
      {
        theme: "루브르 하이라이트 & 튈르리",
        summary:
          "아이 페이스로 빠르게 박물관 → 회전목마와 센강 보트. 루브르를 '다 보려' 하지 말고 5개만 정해서 떠나세요.",
        stops: [
          {
            name: "루브르 박물관 (아이용 코스)",
            area: "1구",
            address: "Rue de Rivoli, 75001 Paris",
            duration: "2시간",
            description:
              "지하 카루젤 입구로 들어가세요 — 피라미드보다 줄이 훨씬 짧아요. 모나리자(드농관 2층), 밀로의 비너스, 사모트라케 니케, 이집트 미라, 나폴레옹 3세 아파트 — 딱 이것만. 아이에게는 보물찾기라고 말해주세요.",
            estimatedCost: "성인 약 3만원, 18세 미만 무료",
            bookingTip: "louvre.fr에서 1주 전 시간지정 티켓. 화요일 휴무.",
            transitFromPrev: "Bir-Hakeim에서 메트로 6→1호선, 약 25분",
          },
          {
            name: "튈르리 정원",
            area: "1구",
            duration: "1시간 30분",
            description:
              "루브르를 나오면 바로 튈르리. 중앙 연못 옆 녹색 의자대에서 장난감 돛단배를 빌려 긴 막대로 밀고 다녀요. 단순하고 상징적이고 행복한 시간.",
            estimatedCost: "보트 대여 약 6천원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "안젤리나 (핫초콜릿 + 점심)",
            area: "Rue de Rivoli",
            duration: "1시간",
            description:
              "100년 된 티룸. 따뜻한 가나슈처럼 진한 핫초콜릿이 유명해요. 아이는 크로크무슈, 부모는 니수아즈 샐러드, 다 같이 몽블랑 디저트 한 접시.",
            estimatedCost: "가족 약 9만원",
            bookingTip: "6명 미만은 예약 안 받음 — 13시에 가면 줄 짧음.",
            transitFromPrev: "도보 5분",
          },
          {
            name: "바토 무슈 센강 크루즈",
            area: "Pont de l'Alma",
            duration: "1시간 30분",
            description:
              "알마 다리에서 출발하는 70분 오픈탑 보트. 모든 유명 다리 아래를 지나며 노트르담, 루브르, 에펠탑을 강에서 봐요. 유모차 탑승 가능.",
            estimatedCost: "성인 약 2만원, 아동 약 1만원",
            transitFromPrev: "튈르리에서 메트로 1→9호선, 약 15분",
          },
          {
            name: "호텔 휴식 + 이른 저녁 준비",
            area: "15구",
            duration: "1시간 30분",
            description:
              "아파트호텔로 돌아가 키친넷에서 파스타 끓이고 잠옷 차림으로 저녁. 종소리 들으며 아이는 푹 자요.",
            estimatedCost: "장보기 약 2만원",
            transitFromPrev: "도보 10분",
          },
        ],
      },
      {
        theme: "디즈니랜드 파리",
        summary:
          "가장 큰 날을 마지막으로. 파리 시내에서 RER로 35분이고, 하루를 통째로 쓸 가치가 있어요.",
        stops: [
          {
            name: "RER A 디즈니랜드행",
            area: "Châtelet → Marne-la-Vallée",
            duration: "1시간",
            description:
              "Bir-Hakeim에서 메트로 6호선으로 Charles de Gaulle-Étoile, RER A로 환승해서 Marne-la-Vallée Chessy 방향. 종점이 공원 입구라 기차에서 내리면 바로 디즈니랜드.",
            estimatedCost: "가족 왕복 약 3만 5천원",
            transitFromPrev: "Bir-Hakeim까지 도보 10분",
          },
          {
            name: "디즈니랜드 파크 (오전 판타지랜드)",
            area: "Marne-la-Vallée",
            address: "Boulevard de Parc, 77700 Coupvray",
            duration: "4시간",
            description:
              "사람들이 빅 썬더에 몰려 있는 동안 판타지랜드부터. 순서: It's a Small World → Peter Pan's Flight → Dumbo → Mad Hatter Teacups → 회전목마. 오베르주 드 상드리옹에서 공주 식사 원하면 몇 달 전 예약.",
            estimatedCost: "가족 종일권 약 45만원",
            bookingTip: "disneylandparis.com에서 사세요 — 게이트 가격이 약 5만 5천원 더 비쌈.",
            transitFromPrev: "도보 5분",
          },
          {
            name: "케이시즈 코너 점심 (메인 스트리트)",
            area: "디즈니랜드 파크",
            duration: "1시간",
            description:
              "메인 스트리트 USA의 핫도그와 칠리 프라이. 피아노 라이브 연주가 깔려요. 파리 디즈니 음식이 의외로 좋아요 — 빨리 먹고 다시 놀러 가야 하는 가족엔 정답.",
            estimatedCost: "가족 약 7만원",
            transitFromPrev: "내장됨",
          },
          {
            name: "어드벤처랜드 & 프론티어랜드",
            area: "디즈니랜드 파크",
            duration: "3시간",
            description:
              "Pirates of the Caribbean(아이도 OK), Indiana Jones 코스터(키 제한), Phantom Manor(약간 무서운 유령의 집 — 아이 성향 확인), Big Thunder Mountain 구역 풍경.",
            estimatedCost: "포함",
            transitFromPrev: "내장됨",
          },
          {
            name: "디즈니 일루미네이션",
            area: "성 무대",
            duration: "30분",
            description:
              "매일 밤 성에서 펼쳐지는 불꽃 + 프로젝션 쇼. 여행을 이 정점에서 마무리. 메인 스트리트에서 30분 전 자리 확보.",
            estimatedCost: "포함",
            transitFromPrev: "도보 5분",
          },
          {
            name: "RER A로 Bir-Hakeim 복귀",
            area: "Marne-la-Vallée → 파리",
            duration: "1시간",
            description:
              "기차는 자정까지 운행. Charles de Gaulle-Étoile 도착 전에 아이들은 잠들어 있을 거예요.",
            estimatedCost: "오전 티켓에 포함",
            transitFromPrev: "도보 5분",
          },
        ],
      },
    ],
    packingTips: [
      "가벼운 접이식 유모차 — 파리 자갈길 진짜예요",
      "간식·물티슈·손소독제 들어가는 작은 백팩",
      "각자 작은 물병 — 식당에서 무료로 채워줘요",
      "3일차용 디즈니/공주 옷 — 옷 입고 간 아이가 눈에 띄게 더 행복해요",
    ],
    budgetEstimate: "4인 가족 호텔과 디즈니 티켓 제외 하루 약 36만~45만원",
    generalTips: [
      "파리 박물관 18세 미만 모두 무료 — 여권 챙기세요",
      "아이가 좋아하는 시리얼 챙기세요 — 익숙한 아침이 떼쓰기를 막아줘요",
      "카페 대부분 커피 사면 깨끗한 화장실 무료 — 동선 짤 때 참고",
      "유료 박물관 3개 이상이면 'Paris Museum Pass' 본전 뽑아요",
    ],
  },

  "seoul-3d-foodie": {
    destination: "서울",
    destinationCountry: "대한민국",
    overview:
      "음식이 서울 방문의 첫째 이유인 솔로 푸디를 위한 3일. 매일 문화 앵커 하나에 식사 스폿 3~4개를 짝지어요. 유명 시장, 동네 작은 가게, 그리고 하루 한 끼 좋은 저녁. 3일째쯤이면 순두부와 두부찌개의 차이를 알게 돼요.",
    bestSeasonNote:
      "4~5월(벚꽃, 온화) 그리고 9~10월(가을, 건조)이 베스트. 8월 습기는 피하세요.",
    currencyTip:
      "편의점 어디서든 T-money 카드 — 지하철·버스·일부 택시 모두 커버. 도착하면 시티/우리 ATM에서 20만~30만원 인출.",
    languageTip:
      "한글 24자만 익혀도 표지판 절반은 읽혀요 — 출국 전 30분 유튜브 입문 추천. '안녕하세요'와 '감사합니다'가 모든 곳에서 통해요.",
    emergencyNumber: "112 (경찰), 119 (의료/소방)",
    hotel: {
      name: "L7 홍대 by 롯데",
      area: "홍대",
      address: "서울 마포구 양화로 141",
      rationale:
        "홍대는 서울에서 가장 걷기 좋은 음식·나이트라이프 동네. 인디 카페, 새벽 BBQ, 길거리 공연이 가득해요. L7은 홍대입구역(인천공항철도 직통, 50분)에서 도보 3분이고 옥상 바에서 한강 뷰까지 보여요. 1인실 약 16만원/박.",
      estimatedNightlyRate: "약 16만원/박",
    },
    airportTransit: {
      method: "공항철도(AREX) → 홍대입구역",
      duration: "약 50분",
      cost: "약 1만원",
      instructions:
        "ICN 1·2 터미널 지하에서 AREX 표지판을 따라가세요. 직통 익스프레스 티켓 9,000원 — 좌석 지정, 43분이면 서울역. 서울역에서 다시 통근선으로 두 정거장 돌아가 홍대입구역(또는 T-money 있으면 2호선이 더 편함). 호텔은 1번 출구에서 표지판 따라.",
    },
    days: [
      {
        theme: "시장 & 궁궐",
        summary:
          "시장 아침식사, 도시의 대표 궁궐, 그리고 한옥마을 저녁.",
        stops: [
          {
            name: "광장시장 아침식사",
            area: "종로",
            address: "서울 종로구 창경궁로 88",
            duration: "1시간 30분",
            description:
              "서울에서 가장 오래된 시장이자 길거리 음식의 여왕. 한가운데 빈대떡 아주머니, 마약김밥 가판, 떡볶이 한 그릇. 서서 먹고 다음 코스로.",
            estimatedCost: "약 1만 6천원",
            transitFromPrev: "홍대입구에서 2호선 → 1호선 환승 → 종로5가, 약 25분",
          },
          {
            name: "경복궁",
            area: "종로",
            address: "서울 종로구 사직로 161",
            duration: "2시간",
            description:
              "조선왕조의 으뜸 궁궐, 1395년 창건. 11시 정각 수문장 교대식 꼭 보세요. 한복 대여(근처 약 1만 3천원)하면 입장료도 무료.",
            estimatedCost: "약 4천원 (한복 입으면 무료)",
            bookingTip: "화요일 휴무. 11시·13시 30분 무료 영어 가이드 투어.",
            transitFromPrev: "5호선 → 3호선 경복궁역, 약 15분",
          },
          {
            name: "북촌한옥마을 산책",
            area: "북촌",
            duration: "1시간 30분",
            description:
              "두 궁궐 사이에 자리한 600년 된 한옥들이 복원된 주거지역. 가회동 골목길에 안내소 무료 지도에 표시된 8개 포토 스폿이 있어요. 사람들이 사는 동네니 조용히.",
            estimatedCost: "무료",
            transitFromPrev: "도보 10분",
          },
          {
            name: "삼청동 카페",
            area: "삼청동",
            duration: "1시간",
            description:
              "북촌에서 내려오는 카페·갤러리 거리. 전통 찻집 아무 데나 골라 오미자차에 약과 한 접시.",
            estimatedCost: "약 1만원",
            transitFromPrev: "도보 10분",
          },
          {
            name: "토속촌 삼계탕",
            area: "종로",
            duration: "1시간",
            description:
              "한국에서 가장 유명한 삼계탕. 1만 8천원짜리 식사인데 대통령들이 먹었어요. 피크에는 30분 줄 — 17시에 가면 줄 없음.",
            estimatedCost: "약 1만 8천원",
            bookingTip: "예약 안 받음. 줄 설 가치 있음.",
            transitFromPrev: "도보 20분",
          },
          {
            name: "청계천 산책",
            area: "종로",
            duration: "1시간",
            description:
              "50년간 고가도로 아래 묻혀 있다가 2005년에 복원된 11km 도심 하천. 시청 동쪽 첫 2km는 야간 조명. 자기 전 조용한 회복 산책.",
            estimatedCost: "무료",
            transitFromPrev: "도보 20분",
          },
        ],
      },
      {
        theme: "BBQ, 막걸리 & 홍대 밤",
        summary:
          "느긋한 아침, 의미 있는 전쟁기념관, 그리고 깊이 들어가는 한국 그릴 문화.",
        stops: [
          {
            name: "어니언 안국 (브런치 + 빵)",
            area: "안국",
            duration: "1시간",
            description:
              "한옥을 베이커리 카페로 개조한 곳. 서울에서 가장 아름다운 페이스트리 진열. 솔트 브레드와 판도로가 머스트. 인스타용 사진과 정당한 인기.",
            estimatedCost: "약 1만 6천원",
            transitFromPrev: "3호선 안국역, 도보 5분",
          },
          {
            name: "전쟁기념관",
            area: "용산",
            address: "서울 용산구 이태원로 29",
            duration: "2시간",
            description:
              "한국전쟁과 그 기원을 다룬 무료 세계적 박물관. 야외 군용기·전차·청동 '형제상'이 한 챕터, 본관이 다른 챕터. 무겁지만 필수적 맥락.",
            estimatedCost: "무료",
            transitFromPrev: "안국에서 6호선 → 삼각지역, 약 25분",
          },
          {
            name: "홍대 마포 갈매기살",
            area: "홍대",
            duration: "1시간 30분",
            description:
              "돼지 갈매기살 BBQ — 서양 한국 BBQ에선 절대 못 보는 부위. 호스텔 근처 갈매기살 집 아무 데나. 직원이 구워줘요.",
            estimatedCost: "약 3만원",
            transitFromPrev: "6호선 → 홍대입구, 약 25분",
          },
          {
            name: "연남동 카페 크롤",
            area: "연남동",
            duration: "2시간",
            description:
              "서울에서 가장 힙한 카페 동네, 홍대 바로 서쪽. 카페 3곳 들르세요. 한국 스페셜티 커피 씬은 아시아 최고 수준. Felt, Fritz Coffee, 영어 간판 없는 곳들 추천.",
            estimatedCost: "약 2만원",
            transitFromPrev: "도보 10분",
          },
          {
            name: "묵자골목 포장마차",
            area: "홍대",
            duration: "1시간 30분",
            description:
              "서울 클래식 포장마차 안주. 소주, 막걸리, 파전, 그리고 곱창 한 접시(생각보다 훨씬 맛있어요). 옆자리 사람과 잠깐이라도 말 섞어보세요.",
            estimatedCost: "약 3만 2천원",
            transitFromPrev: "도보 10분",
          },
          {
            name: "홍대 거리 공연",
            area: "홍익대 거리",
            duration: "1시간 30분",
            description:
              "주말 밤 홍익대 앞 보행자 거리는 K-pop 댄스 크루, 인디 밴드, 곡예사로 가득 차요. 무료, 시끌, 즐거움. 시차 견디는 만큼 머무세요.",
            estimatedCost: "무료",
            transitFromPrev: "도보 5분",
          },
        ],
      },
      {
        theme: "강남, 한강 & 마지막 식사",
        summary:
          "강남으로 건너가 박물관 하나, 압구정 점심, 한강 일몰.",
        stops: [
          {
            name: "봉은사",
            area: "강남",
            duration: "1시간",
            description:
              "강남 마천루 사이에 끼어 있는 1,200년 된 사찰 — 시각적 대비가 핵심. 외국인 대상 무료 템플스테이도 있지만 1시간 산책으로 충분해요.",
            estimatedCost: "무료",
            transitFromPrev: "2호선 → 7호선, 약 30분",
          },
          {
            name: "스타필드 코엑스 & 별마당 도서관",
            area: "강남",
            duration: "1시간",
            description:
              "지하 쇼핑몰 한가운데 있는 2층 오픈 도서관 — 5만 권 무료, 서울에서 가장 많이 찍힌 실내 스폿 중 하나. 천천히 거닐고, 둘러보고, 사진 한 장.",
            estimatedCost: "무료",
            transitFromPrev: "도보 10분",
          },
          {
            name: "본앤브레드 (드라이에이징 비프)",
            area: "압구정",
            duration: "1시간 30분",
            description:
              "한 번 사치 부릴 거면 여기. 본앤브레드는 한우를 매장에서 직접 드라이에이징해요. 점심 립아이 세트 약 8만원, 도쿄 어디와 견줘도 손색 없어요. 사전 예약 필수.",
            estimatedCost: "약 8만원",
            bookingTip: "캐치테이블 앱으로 1주 전 예약.",
            transitFromPrev: "7호선 → 압구정로데오, 약 15분",
          },
          {
            name: "가로수길",
            area: "신사",
            duration: "1시간 30분",
            description:
              "한국 디자이너 브랜드, 카페, 좋은 사람 구경이 있는 잎 무성한 부티크 거리. 명동보다 덜 관광지스러워요.",
            estimatedCost: "무료~$$$",
            transitFromPrev: "3호선 → 신사역 도보 10분",
          },
          {
            name: "한강공원 (반포)",
            area: "반포",
            duration: "1시간 30분",
            description:
              "강변까지 내려가서 편의점에서 5천원 돗자리 빌리고, 푸드트럭 배달앱(BBQ치킨이나 굽네)으로 치맥 주문. 시즌이면 19시 30분 반포대교 분수쇼.",
            estimatedCost: "약 2만원",
            transitFromPrev: "9호선 → 신반포역 도보 10분",
          },
          {
            name: "깐부치킨 (한국식 후라이드)",
            area: "홍대",
            duration: "1시간",
            description:
              "여행을 한국 국민 간식으로 마무리: 한국 후라이드 치킨. 반반(간장마늘 + 매콤달콤)에 맥주. 바삭하고 쫀득하고 완벽.",
            estimatedCost: "약 3만원",
            transitFromPrev: "9호선 → 홍대입구, 약 25분",
          },
        ],
      },
    ],
    packingTips: [
      "벗기 쉬운 신발 — 사찰과 전통 식당에서 신발을 벗어요",
      "작은 우산 — 서울은 거의 매달 갑작스런 소나기",
      "물티슈 — 길거리 음식 + 휴지 부족",
      "1일차에 빈 위장 — 멈출 수 없을 거예요",
    ],
    budgetEstimate: "호텔 제외 하루 약 11만~16만원",
    generalTips: [
      "지하철이 택시보다 빠르고 깨끗하고 저렴 — T-money 카드 챙기세요",
      "팁 문화 없음",
      "식당에서 반찬은 무료 — 추가 비용 아님",
      "박물관 대부분 월요일 휴무",
    ],
  },

  "bangkok-4d-solo": {
    destination: "방콕",
    destinationCountry: "태국",
    overview:
      "타이트한 예산에 방콕의 세 가지 얼굴 — 사찰 방콕, 길거리 음식 방콕, 이상한 밤의 방콕 — 을 모두 보고 싶은 솔로 여행자를 위한 4일. 한 끼에 7천원 넘기지 않고, 더위 전에 왕궁을 보고, 금요일에는 카오산 로드 무용담 하나 가지고 돌아가요.",
    bestSeasonNote:
      "11~2월이 건조하고 (상대적으로) 시원해요. 그 외 시기엔 11시면 땀범벅. 4월은 일부 동네에서 지구상 가장 더운 달.",
    currencyTip:
      "은행 ATM(Krungsri 또는 SCB)에서 5,000~10,000바트 인출 — 보라색 독립형 ATM은 220바트 수수료라 피하세요. 길거리 음식은 거의 현금만.",
    languageTip:
      "구글 번역 태국어 오프라인 팩 받아두세요 — 태국 문자는 외국인이 추측 불가. 'Khop khun krap(콥쿤캅, 남성 화자 감사 인사)'면 미소가 옵니다.",
    emergencyNumber: "1155 (관광경찰), 1669 (의료)",
    hotel: {
      name: "Lub d Bangkok Siam (8인 혼성 도미토리)",
      area: "시암",
      address: "925/9 Rama I Road, Pathum Wan, Bangkok 10330",
      rationale:
        "Lub d Siam은 BTS National Stadium에서 4분, 시암 스퀘어에서 8분 거리. 도시 어디든 BTS 한두 정거장이면 가요(강 보트 포함). 호스텔 깨끗하기로 유명, 에어컨/업무 공간 잘 갖춰져 있고 도미토리 침대마다 프라이버시 커튼. BKK 수완나품에서 공항철도가 Phaya Thai에 내려줘 호텔까지 15분.",
      estimatedNightlyRate: "약 2만 5천원/박",
    },
    airportTransit: {
      method: "공항철도 → BTS 스카이트레인",
      duration: "약 50분",
      cost: "약 3천원",
      instructions:
        "수완나품(BKK) 지하에서 녹색 Airport Rail Link 표지판을 따라가세요. City Line 종점 Phaya Thai까지 토큰 1개(45바트). BTS 수쿰빗 라인 환승(한 층 위 — 토큰 1개 더, 26바트), 시암까지 2정거장, 실롬 라인 환승해 1정거장, National Stadium 하차. 호스텔은 오른쪽 도보 4분.",
    },
    days: [
      {
        theme: "왕실의 방콕",
        summary:
          "더위와 드레스코드 호객꾼 전에 오전에 큰 사찰 세 곳을 끝내세요. 저녁엔 팟타이 폭식.",
        stops: [
          {
            name: "왕궁 & 왓 프라깨오",
            area: "프라나콘",
            address: "Na Phra Lan Road, Phra Borom Maha Ratchawang",
            duration: "2시간",
            description:
              "8시 30분 정각 개문 시간 도착 — 10시면 줄이 45분이에요. 긴 바지와 어깨 가린 옷 필수, 안 그러면 입장 거부. 왓 프라깨오 안 에메랄드 부처는 작지만 둘러싼 금이 압도적.",
            estimatedCost: "약 2만원",
            bookingTip: "밖에서 '오늘 닫혔다'고 말하는 사람들은 무시 — 툭툭 사기예요.",
            transitFromPrev: "BTS Saphan Taksin → 짜오프라야 익스프레스 보트 Tha Chang 선착장 (총 약 30분)",
          },
          {
            name: "왓 포 (와불)",
            area: "프라나콘",
            duration: "1시간",
            description:
              "농구장보다 긴 46미터 황금 와불. 뒷벽 108개 청동 그릇에 동전을 넣으세요 — 소리가 최면적. 태국 마사지의 발상지이기도 해요. 현장에서 1만 3천원에 받을 수 있음.",
            estimatedCost: "약 8천원 + 마사지 1만 3천원",
            transitFromPrev: "남쪽으로 도보 10분",
          },
          {
            name: "타티엔 시장 국수",
            area: "타티엔 선착장",
            duration: "45분",
            description:
              "선착장 바로 옆 가족 노점들. 보트 누들(꾸이띠야오 르아) 주문 — 작은 그릇, 큰 맛, 한 그릇 2천원.",
            estimatedCost: "약 4천원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "왓 아룬 (새벽사원)",
            area: "톤부리",
            duration: "1시간 30분",
            description:
              "5바트 페리로 강 건너요. 왓 아룬 중앙 프랑은 19세기 무역상들이 평형추로 가져온 도자기 조각으로 덮여 있어요. 가파른 계단을 올라가면 도시 최고의 짜오프라야 뷰.",
            estimatedCost: "입장 약 4천원 + 페리 250원",
            transitFromPrev: "5바트 페리 강 건너기",
          },
          {
            name: "호스텔 시에스타",
            area: "시암",
            duration: "1시간 30분",
            description:
              "기온 38℃. 가서 자세요. 도시는 일몰에 다시 깨어나고 그땐 에너지가 필요해요.",
            estimatedCost: "무료",
            transitFromPrev: "보트로 Saphan Taksin → BTS National Stadium, 약 40분",
          },
          {
            name: "팁 사마이 팟타이",
            area: "프라나콘",
            duration: "1시간",
            description:
              "방콕에서 가장 유명한 팟타이 — 1966년부터 같은 방식. 새우 들어간 계란 감싼 버전. 15~20분 대기 필수, 그만한 가치 있음.",
            estimatedCost: "약 7천원",
            transitFromPrev: "호스텔에서 택시/Grab, 약 25분",
          },
        ],
      },
      {
        theme: "시장 & 카오산",
        summary:
          "오전 주말시장, 강 일몰, 카오산 로드의 무용담을 위한 밤.",
        stops: [
          {
            name: "짜뚜짝 주말시장",
            area: "짜뚜짝",
            address: "587/10 Kamphaeng Phet 2 Rd",
            duration: "3시간",
            description:
              "35에이커에 1만 5천 개 가게. 길 잃을 거예요 — 그게 포인트. 섹션: 옷(1~6), 예술(7), 음식(26~27), 강아지(있음). 호가의 60%로 흥정.",
            estimatedCost: "쇼핑하면 약 4만원",
            bookingTip: "토·일만 운영. 9시 도착 안 하면 푹 익어요.",
            transitFromPrev: "BTS Mo Chit, 약 15분, 도보 5분",
          },
          {
            name: "짜뚜짝 푸드코트",
            area: "짜뚜짝 내",
            duration: "1시간",
            description:
              "26번 섹션은 음식 미로. 망고 찰밥, 코코넛 셸에 담긴 코코넛 아이스크림, 구운 꼬치 종류. 플라스틱 의자에 앉아 손으로.",
            estimatedCost: "약 8천원",
            transitFromPrev: "내장됨",
          },
          {
            name: "호스텔 휴식 + 따뜻한 샤워",
            area: "시암",
            duration: "2시간",
            description:
              "열사병 진짜예요. 가서 샤워하고 폰 충전하고 정비.",
            estimatedCost: "무료",
            transitFromPrev: "BTS Mo Chit → Siam → National Stadium, 약 25분",
          },
          {
            name: "짜오프라야 강 보트 일몰",
            area: "사톤 선착장",
            duration: "1시간",
            description:
              "30바트 오렌지 깃발 로컬 보트 표 사서 사톤 선착장에서 Phra Athit까지 강을 거슬러 올라가세요. 일몰이 사찰을 비추고 공기는 마침내 시원. 방콕에서 가장 잘 쓴 1달러.",
            estimatedCost: "약 1천원",
            transitFromPrev: "BTS Saphan Taksin, 약 15분",
          },
          {
            name: "카오산 로드 길거리 음식",
            area: "카오산",
            duration: "1시간",
            description:
              "유명 백패커 거리. 50바트 팟씨유 한 접시와 30바트 바나나 로티를 아무 카트에서나. 꼬치에 끼운 전갈 아저씨는 2003년 이후 같은 사람이고 20바트면 사진 OK.",
            estimatedCost: "약 7천원",
            transitFromPrev: "Phra Athit 선착장에서 도보 10분",
          },
          {
            name: "카오산 바 크롤",
            area: "카오산",
            duration: "2시간",
            description:
              "호스텔 바 골라서 100바트 양동이 한 잔, 14개국 사람들과 떠들고, 자정 전에 떠나기. 들리는 그대로의 경험이에요.",
            estimatedCost: "약 1만원",
            transitFromPrev: "내장됨",
          },
        ],
      },
      {
        theme: "당일치기: 아유타야",
        summary:
          "태국 옛 왕도, 80km 북쪽. 폐허의 사원, 벽돌 탑, 나무뿌리에 감긴 부처 머리.",
        stops: [
          {
            name: "아유타야행 열차",
            area: "후아람퐁 → 아유타야",
            duration: "1시간 30분",
            description:
              "후아람퐁에서 3등석 통근열차(15바트). 창문 열려 있고 플라스틱 좌석에 느리지만 진짜. 이게 여행이에요.",
            estimatedCost: "약 700원",
            transitFromPrev: "MRT 후아람퐁",
          },
          {
            name: "왓 마하탓 (나무 속 부처 머리)",
            area: "아유타야 역사공원",
            duration: "1시간 30분",
            description:
              "보리수 뿌리에 감긴 사암 부처 머리 — 아유타야에서 가장 많이 찍히는 이미지. 주변 폐허는 거대하고 관광버스 도착 전엔 거의 비어 있어요.",
            estimatedCost: "약 3천원",
            transitFromPrev: "역에서 툭툭, 약 4천원",
          },
          {
            name: "Lung Lek 보트 누들",
            area: "아유타야",
            duration: "45분",
            description:
              "작은 그릇, 진한 국물, 소고기. 현지인은 빈 그릇을 식탁에 쌓아서 카운트해요 — 도전.",
            estimatedCost: "약 5천원",
            transitFromPrev: "툭툭 약 2천원",
          },
          {
            name: "왓 프라 시 산펫 & 위한 프라 몽콘 보핏",
            area: "아유타야 역사공원",
            duration: "1시간 30분",
            description:
              "한 단상 위에 거대 복원 체디 셋 — 상징적인 아유타야 스카이라인. 이웃한 위한에는 2차대전 폭격 후 1950년대 재건된 12미터 청동 부처.",
            estimatedCost: "약 3천원",
            transitFromPrev: "도보 10분",
          },
          {
            name: "왓 차이왓타나람 (일몰)",
            area: "아유타야",
            duration: "1시간",
            description:
              "강 건너 크메르 양식 사원. 중부 태국에서 가장 사진 잘 나오는 일몰. 반사 해자가 벽돌탑을 두 배로 만들어줘요.",
            estimatedCost: "약 3천원",
            transitFromPrev: "툭툭 약 4천원",
          },
          {
            name: "방콕행 열차",
            area: "아유타야 → 후아람퐁",
            duration: "1시간 30분",
            description:
              "다시 느린 기차. 자고, 과일 먹고, 논이 지나가는 걸 보세요.",
            estimatedCost: "약 700원",
            transitFromPrev: "역까지 툭툭 약 4천원",
          },
        ],
      },
      {
        theme: "차이나타운 & 마지막 식사",
        summary:
          "방콕에서 가장 음식이 밀도 높은 거리에서 마무리. 사원과 루프탑 바도 끼워서.",
        stops: [
          {
            name: "왓 트라이밋 (황금 부처)",
            area: "차이나타운 입구",
            duration: "45분",
            description:
              "5.5톤 순금 부처가 200년 동안 회반죽 아래 숨어 있다가 1955년 인부가 떨어뜨려 발견된 곳. 금 가치만 2억 5천만 달러.",
            estimatedCost: "약 4천원",
            transitFromPrev: "MRT Hua Lamphong, 도보 5분",
          },
          {
            name: "삼펭 레인 도매시장",
            area: "차이나타운",
            duration: "1시간",
            description:
              "1.5km에 걸쳐 빽빽한 좁은 골목 — 구슬, 직물, 마른 생선, 플라스틱 장난감. 의도적으로 길을 잃으세요.",
            estimatedCost: "약 1만 3천원",
            transitFromPrev: "도보 10분",
          },
          {
            name: "Nai Mong Hoy Tod (굴 오믈렛)",
            area: "야오와랏 거리",
            duration: "45분",
            description:
              "1968년부터 굴 팬케이크를 굽는 미슐랭 빕 구르망 노점. 시그니처는 호이텃 크롭 — 굴을 레이스처럼 바삭하게 부친 크레페에 칠리 소스.",
            estimatedCost: "약 8천원",
            transitFromPrev: "도보 10분",
          },
          {
            name: "호스텔 + 낮잠",
            area: "시암",
            duration: "2시간",
            description:
              "마지막 시에스타. 밤이 길 거예요.",
            estimatedCost: "무료",
            transitFromPrev: "MRT + BTS, 약 30분",
          },
          {
            name: "야오와랏 길거리 음식 크롤",
            area: "차이나타운",
            duration: "2시간",
            description:
              "야오와랏 거리는 지구상 길거리 음식 밀도가 가장 높은 구역. T&K Seafood(커리 크랩), Guay Jub Ouan Pochana(후추 롤 누들), 망고 찰밥 노점. 천천히 걷고 끊임없이 먹어요.",
            estimatedCost: "약 2만원",
            transitFromPrev: "MRT Wat Mangkon, 도보 5분",
          },
          {
            name: "Lebua Sky Bar",
            area: "실롬",
            duration: "1시간",
            description:
              "행오버 2 루프탑. 네, 관광지스럽고 칵테일 2만 8천원. 그래도 64층 짜오프라야 야경 오픈에어는 엽서 그 자체. 드레스코드: 긴 바지와 발등 덮인 신발.",
            estimatedCost: "약 3만원",
            transitFromPrev: "택시 약 7천원",
          },
        ],
      },
    ],
    packingTips: [
      "사원 드레스코드용 헐렁한 가벼운 긴 바지 한 벌",
      "재사용 물병 — 7-Eleven 어디서든 1바트에 채워줘요",
      "DEET 들어간 모기 스프레이 (저녁용)",
      "도미토리용 귀마개",
    ],
    budgetEstimate: "호스텔 제외 하루 약 5만~7만원",
    generalTips: [
      "Grab(현지 우버) 쓰세요 — 흥정·사기 없음",
      "잔돈(20·50바트) 늘 챙기세요 — 노점이 1000짜리 거스름 싫어함",
      "수돗물 못 마셔요 — 생수는 어디서나 7바트",
      "툭툭은 미리 가격 협상 안 하면 관광객 함정",
    ],
  },
};

export default ko;
