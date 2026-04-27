import type { LocaleTranslations } from "../i18n";

/**
 * Korean translations for sample plans. Sparse-override structure — only
 * fields that need localization are present; everything else (coords,
 * prices, durations, structural fields) inherits from the base English plan.
 *
 * Coverage as of 2026-04-27:
 *   All 10 samples FULL — tagline + audience (gallery cards) + overview + days × stops + tips.
 *   tokyo / paris / seoul / bangkok / osaka / nyc / bali / taipei / hanoi / london
 *
 * To add a city: read its source file (lib/samples/{slug}.ts), copy each
 * user-facing string into a key under the matching slug here, translate.
 * Stop arrays are parallel-indexed — stops[0] in the override applies to
 * stops[0] in the base.
 */
const ko: LocaleTranslations = {
  "tokyo-4d-couple": {
    tagline: "둘이 떠나는 4일 — 신사, 스시, 그리고 가마쿠라 일몰까지.",
    audience: "커플 · 중간 예산",
    destination: "도쿄",
    destinationCountry: "일본",
    overview:
      "네온의 상징적인 도쿄와 그 사이의 조용하고 로맨틱한 순간 — 진짜 균형을 원하는 커플을 위한 4일이에요. 매일이 1년 뒤에도 회상할 한 끼로 시작해 한 끼로 끝나고, 수백 년 된 신사와 24시간 편의점이 같은 블록에 공존하는 동네를 천천히 걸으며, 매일 황혼엔 호텔 창에서 SNS에 올릴 만한 일몰 한 장. 시부야 스크램블의 조류 같은 인파부터 가마쿠라 해변의 황금빛 정적까지 — 이 4일이 둘이 평생 공유할 도시 추억이 됩니다.",
    bestSeasonNote:
      "벚꽃 시즌 3월 말~4월 초 (만개는 약 7일뿐 — 일본 기상청 '사쿠라 젠센' 예보 보고 정확한 한 주 노리세요), 또는 리쿠기엔과 쇼와기념공원의 단풍 시즌 11월 중순. 골든위크(4월 말~5월 초)는 일본 국내 여행으로 호텔 가격이 두 배가 되고 모든 전철이 만석이라 절대 피해야 해요. 1월 말~2월 초는 저평가된 대안 — 춥지만 인파가 적고, 메이지 신궁의 빨간 도리이 위에 눈 쌓인 사진은 도쿄 여행이 줄 수 있는 가장 희소한 한 장.",
    currencyTip:
      "일본은 의외로 현금 중심 국가예요. 도착하자마자 7-Eleven 또는 패밀리마트 ATM에서 3만~5만엔(약 27만~45만원) 뽑아두세요. 외국 카드 안정적으로 받아요. 작은 식당, 신사 봉납, 심야 야타이는 거의 현금만. 대형 체인과 편의점은 카드와 PayPay 환영, 스마트폰의 Suica/PASMO IC카드가 전철·버스·일부 자판기까지 한 번 태그로 해결.",
    languageTip:
      "구글 번역 카메라 모드로 메뉴판과 표지판 실시간 번역 가능해요 — 출국 전 일본어 오프라인 팩 다운로드해두면 지하철 터널 안에서도 작동해요. '스미마셍(실례합니다)' 한 마디와 가벼운 인사만 잘 해도 어디서든 환영받아요. 편의점 계산대에서 '후쿠로 이리마스카?(봉투 드릴까요?)' 물으면 고개 젓거나 '다이죠부' 한 마디면 끝.",
    emergencyNumber: "110 (경찰), 119 (구급/소방)",
    hotel: {
      name: "호텔 그레이서리 신주쿠",
      area: "신주쿠",
      address: "1-19-1 가부키초, 신주쿠구, 도쿄 160-8466",
      rationale:
        "나리타에서 4일 여행이라면 신주쿠가 단연 최적의 베이스예요. 나리타 익스프레스가 호텔 6분 거리에 도착하고, 필요한 JR과 지하철 노선이 모두 여기서 갈라져요 — 늦은 밤 환승 계산이 필요 없죠. 입구 8층 테라스 위로 솟은 고질라 머리 조형물은 무료 보너스고, 헬로키티 또는 고질라 뷰 테마 객실은 작은 추가 비용 가치 있어요. 24시간 영어 프런트, 늦은 밤 짐 보관, 같은 건물 1층에 패밀리마트.",
      estimatedNightlyRate: "약 14만원/박",
    },
    airportTransit: {
      method: "나리타 익스프레스(N'EX) → JR 신주쿠역",
      duration: "약 80분",
      cost: "약 3만 5천원 (외국인 왕복 할인 가능)",
      instructions:
        "나리타 1터미널에서 입국심사 후 파란색 'JR' 표지판을 따라 지하 1층으로 내려가세요. JR EAST Travel Service Center에서 여권 제시 후 외국인 왕복 티켓 구입(약 5만원, 14일 유효 — 편도보다 훨씬 이득). 신주쿠행 N'EX 어떤 차량이라도 종점이라 놓칠 수 없어요. 신주쿠역 남쪽 출구에서 가부키초를 가로질러 6분 평지길. 주말 저녁 도착이면 출발 전 역내 편의점에서 생수와 오니기리 사두세요 — 도착 전 배가 고파져요.",
    },
    days: [
      {
        theme: "시부야 & 하라주쿠",
        summary:
          "도쿄에서 가장 사진 잘 나오는 동네 두 곳을 반나절에 둘러보고, 황혼 무렵 세계에서 가장 유명한 횡단보도로 마무리.",
        stops: [
          {
            name: "메이지 신궁",
            area: "시부야",
            address: "1-1 요요기카미조노초, 시부야구",
            duration: "1시간 30분",
            description:
              "1920년 자원봉사자 10만 명이 일본 각 지방에서 헌목한 70헥타르 숲에 둘러싸인 신토 신사예요. 거대한 적색 도리이를 지나 발밑이 사각거리는 자갈 참배길에 들어선 3초 후, 도쿄의 소음이 사라집니다. 본전 앞에 100엔 봉납하고 여행 부적인 오마모리 한 개 사세요 — 여행 내내 좋은 운 이야기가 됩니다. 옆 참배길의 한 면을 채운 봉납 청주 통은 필수 사진 — 각 통의 가문 문장 뒤에는 100년 된 양조장이 있어요. 오전 10시 전 도착이면 도쿄에서 가장 깊은 정적을 거의 독차지.",
            estimatedCost: "무료",
            transitFromPrev: "신주쿠에서 JR 야마노테선(4분), 하라주쿠역에서 도보 5분",
          },
          {
            name: "타케시타 거리",
            area: "하라주쿠",
            duration: "1시간",
            description:
              "도쿄 청소년 패션의 진원지 — 350m의 색깔, 설탕, 소음. 사지 않아도 한 번 끝까지 걷는 것이 감각의 폭발이에요. 마리온 크레페(1976년 원조)가 만드는 딸기-크림치즈 크레페가 이 장르의 표본. 주말 오후엔 핸드폰을 들 수도 없을 만큼 빽빽하니, 평일 오전 10~11시가 가장 부드러운 윈도우.",
            estimatedCost: "간식 약 1만 2천원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "아후리 하라주쿠 (유즈 시오 라멘)",
            area: "하라주쿠",
            duration: "45분",
            description:
              "더운 날 완벽한 라멘 — 유즈 껍질이 무거운 국물을 '뜨게' 만들어요. 입구 자판기엔 영어 버튼 있어요, '유즈 시오' 또는 '유즈 쇼유' 선택 후 반숙란 1,500원 추가. 카운터 좌석 약 20개, 들어가서 5분이면 후루룩. 아후리는 시부야 직장인의 점심 단골 — 회사 로고가 사슴이에요.",
            estimatedCost: "약 1만 5천원",
            transitFromPrev: "도보 3분",
          },
          {
            name: "오모테산도",
            area: "오모테산도",
            duration: "1시간",
            description:
              "도쿄의 샹젤리제 — 안도 다다오, 헤르조그 & 드 뫼롱, SANAA가 디오르·프라다·토즈의 플래그십 매장을 설계한 느티나무 가로수길. 각 건물 자체가 작품이라, 윈도우 쇼핑만 해도 건축 강의가 돼요. 11월 말부터 크리스마스까지의 백색 전구 일루미네이션은 거리 전체를 황금 회랑으로 바꿔요. 안도 설계 '오모테산도 힐스'의 나선 램프 산책도 놓치지 마세요.",
            estimatedCost: "무료",
            transitFromPrev: "도보 10분",
          },
          {
            name: "시부야 스크램블 & 하치코 동상",
            area: "시부야",
            duration: "1시간",
            description:
              "지구상 가장 유명한 보행자 교차로. 직접 한 번 건너보세요 — 신호가 바뀌면 4방향이 동시에 풀려 30초 안에 3,000명이 교차합니다. 그다음 정면 길 건너 MAGNET 시부야 7층 'CROSSING VIEW' 전망대(약 8천원)에서 그 엽서 사진을 남기세요. 하치코 동상은 북쪽 광장 — 1925년 사망한 도쿄 제국대학 농학부 교수의 아키타견이 매일 저녁 이 역에서 거의 10년을 기다리다 자신도 죽은 이야기. 옆 청동판이 자초지종을 알려줍니다.",
            estimatedCost: "무료 (커피 살 거면 약 6천원)",
            transitFromPrev: "도쿄 메트로 긴자선 4분",
          },
          {
            name: "우오베이 스시 시부야 도겐자카",
            area: "시부야",
            duration: "1시간",
            description:
              "주문한 초밥이 자리까지 미니 신칸센 트랙으로 배달되는 하이테크 회전 초밥집. 퀄리티는 기믹을 훨씬 넘어요 — 가다랑어 군함, 우니 군함, 다마고야키, A5 와규 토치 니기리, 진한 명란 마키. 둘이 약 4만 5천원이면 배 부르게 먹어요. 같은 건물 MEGA 돈키호테 3층, 식후 바로 내려가서 약·과자 쇼핑.",
            estimatedCost: "1인 약 2만 4천원",
            bookingTip: "태블릿 메뉴 영어 지원. 피크 15~20분 대기, 입구 키오스크 QR로 번호 받고 옆 바에서 한잔. 일요일 18~19시가 최악.",
            transitFromPrev: "도보 8분",
          },
        ],
      },
      {
        theme: "오래된 도쿄: 아사쿠사 & 우에노",
        summary:
          "시타마치(下町, 옛 동네)에서 보내는 하루 — 천 년 된 사찰, 길거리 음식 골목, 도쿄 최고의 박물관 클러스터.",
        stops: [
          {
            name: "센소지",
            area: "아사쿠사",
            address: "2-3-1 아사쿠사, 다이토구",
            duration: "1시간 30분",
            description:
              "도쿄에서 가장 오래된 사찰(645년 창건). 거대한 빨간 등이 달린 가미나리몬을 지나 나카미세 상점가를 따라 본당까지. 10시 전에 도착하면 가미나리몬 정면을 인파 없이 찍을 수 있어요 — 이게 모든 가족에게 보낼 그 사진입니다. 본당 앞에서 100엔 오미쿠지(점괘)를 뽑으세요. 흉이 나오면 옆 금속 격자에 묶어서 바람에 날려보내요. 향로 앞에선 현지인이 머리·어깨·무릎 등 아픈 곳에 연기를 묻히는 모습을 보세요 — 두 번째 방문엔 자연스레 따라하게 됩니다.",
            estimatedCost: "무료",
            transitFromPrev: "시부야에서 도쿄 메트로 긴자선 → 아사쿠사, 약 35분",
          },
          {
            name: "나카미세도리",
            area: "아사쿠사",
            duration: "45분",
            description:
              "200m의 노점 골목. 닌교야키(인형 모양 카스텔라), 센베이, 전통 공예품. 아사쿠사 코코노에의 아게만주(팥소를 튀긴 빵, 약 1천원)는 뜨거울 때 한 입 — 혀가 데지만 멈출 수 없어요. 1868년부터 같은 가족이 운영하는 키무라야의 닌교야키는 7개에 5천원. 한 봉지 사서 걸으면서 먹기 — 이게 시타마치의 리듬.",
            estimatedCost: "간식 약 1만원",
            transitFromPrev: "내장됨",
          },
          {
            name: "다이코쿠야 텐푸라",
            area: "아사쿠사",
            duration: "1시간",
            description:
              "130년 텐푸라 노포. 시그니처 텐동(밥 위 텐푸라 + 진한 양념)은 대대로 내려오는 참기름 사용 — 색이 일반 텐푸라보다 진하고 맛이 달콤·진해서 일본 밖에선 만나기 힘든 맛. 2층 목판 다다미 방에 앉으면 창문 너머로 가미나리몬 방향이 보여요. 점심 줄은 15~20분, 11시 45분 또는 14시 이후에 가면 바로 입장. 밥 리필(오카와리) 무료니 사양 마세요.",
            estimatedCost: "약 2만 2천원",
            bookingTip: "예약 안 받음. 입구 왼쪽에 줄 서면 점원이 번호표 줘요 — 10분 정도는 산책 가능.",
            transitFromPrev: "도보 5분",
          },
          {
            name: "도쿄 국립 박물관",
            area: "우에노",
            address: "13-9 우에노코엔, 다이토구",
            duration: "2시간",
            description:
              "일본에서 가장 오래되고 큰 박물관. 다른 건 다 건너뛰고 본관(혼칸)만 가세요. 2층 사무라이 갑옷과 카타나 갤러리는 세계 최정상 — 나가미츠, 마사무네, 무라마사 같은 거장의 작품, 각 칼날에 관람객 얼굴이 비쳐요. 1층 우키요에 갤러리는 매월 교체되며 호쿠사이의 '가나가와 충 파도'가 가끔 전시. 입구에서 큰 짐 무료 보관, 한국어 지도 제공.",
            estimatedCost: "약 9천원",
            transitFromPrev: "도쿄 메트로 긴자선 아사쿠사 → 우에노, 5분, 도보 10분",
          },
          {
            name: "우에노 공원 산책",
            area: "우에노",
            duration: "1시간",
            description:
              "도쿄 최초의 공립 공원. 시노바즈 연못을 한 바퀴 돌고 작은 다리 건너 벤텐도(재물·예술의 신 벤자이텐 모심)로. 여름이면 연못 전체가 분홍 연꽃으로 덮여요 — 7월 말~8월 초가 절정, 새벽 6시 전이면 이슬 맺힌 연꽃 사진. 가을엔 연못 가 은행나무가 노랗게. 벚꽃 시즌엔 도쿄에서 가장 시끌벅적한 하나미 명소 — 1,000그루 이상 벚나무가 메인 길에 늘어서지만 인파도 가장 많아요.",
            estimatedCost: "무료",
            transitFromPrev: "도보 5분",
          },
          {
            name: "아메야요코초 먹자골목",
            area: "우에노",
            duration: "1시간 30분",
            description:
              "전후 암시장이 도쿄에서 가장 정신없는 먹자거리로 변신한 곳 — 400m 고가 아래에 해산물·건어물·화장품·운동화·서서 마시는 술집이 빽빽이. 저녁 6시 이후 서서 마시는 바가 활기 — 생맥주 약 3,500원, 꼬치 약 1,500원, 옆자리 직장인과 떠들며 서서 먹는 게 이곳의 게임. '다이토료'는 유명한 노포 — 말고기 사시미와 곱창 조림이 시그니처, 망설일 거지만 후회 안 합니다.",
            estimatedCost: "1인 약 3만 2천원",
            transitFromPrev: "도보 10분",
          },
        ],
      },
      {
        theme: "츠키지, 긴자 & 황궁",
        summary:
          "초밥 아침, 황실 정원 산책, 세계에서 가장 세련된 쇼핑 거리에서의 저녁.",
        stops: [
          {
            name: "츠키지 장외시장 아침식사",
            area: "츠키지",
            address: "츠키지 4초메, 주오구",
            duration: "1시간 30분",
            description:
              "도매시장 자체는 도요스로 옮겼지만 장외시장은 그대로 — 초밥 카운터, 다마고야키 전문점, 우니 가게, 김 가게가 빽빽이. '스시잔마이 본점'(24시간 영업)에서 11피스 오마카세 조식 약 3만원, 카운터에 추토로·오토로·우니·아나고·다마고야키가 차례로. '트러플 다마고야키'(약 2,700원/조각)는 디저트로 시켜보세요 — 다시 푼 계란을 겹겹이 말아 단·짠 균형의 기적.",
            estimatedCost: "약 4만원",
            bookingTip: "8시 30분까지 도착. 대부분 가게 13시 마감. 일·수요일 일부 가게 휴무.",
            transitFromPrev: "신주쿠에서 도쿄 메트로 마루노우치 → 히비야선, 약 25분",
          },
          {
            name: "하마리큐 정원",
            area: "시오도메",
            duration: "1시간",
            description:
              "17세기 쇼군의 정원. 바닷물이 조수와 함께 중앙 연못에 들어오고 300년 된 흑송이 거대한 분재처럼 다듬어져 있어요. 연못 가운데 나카지마 찻집은 나무 다리로 연결된 다실 — 다다미에 앉아 '말차+와가시' 세트(약 1만원) 주문, 다완이 앞에 놓이는 순간이 의식의 정점. 와가시는 계절별로 바뀌어요 — 봄 벚꽃, 여름 수국, 가을 단풍, 겨울 동백. 창밖은 시오도메의 마천루지만 당신은 에도에 앉아 있는 거예요.",
            estimatedCost: "입장 약 4천원 + 차 약 1만원",
            transitFromPrev: "도보 15분",
          },
          {
            name: "황궁 동쪽 정원",
            area: "치요다",
            duration: "1시간 30분",
            description:
              "에도 성의 흔적이 남은 무료 공립 정원. 원래 천수각의 석축 기단을 올라가 360도로 황궁 방향을 둘러보세요 — 1657년 메이레키 대화재 이후 재건되지 않았어요. 1912년 목조 건물 '스와 차야'도 찾아보세요. 가을엔 본마루 광장 뒤편으로 수십 그루 황금 은행이 터널을 만들어요. 월·금 휴무. 무료 입장권은 오테몬·히라카와몬·키타하네바시몬에서 받고 출구에서 반환.",
            estimatedCost: "무료",
            transitFromPrev: "도쿄 메트로 히비야선 신바시 → 히비야 도보, 약 15분",
          },
          {
            name: "톤카츠 마이센 아오야마",
            area: "아오야마",
            duration: "1시간",
            description:
              "옛 목욕탕을 개조한 도쿄에서 가장 사랑받는 톤카츠 집. 시그니처 '흑돈 등심 세트' — 저온 진공조리(신쿠 초리) 후 튀기는 기법으로 안쪽이 분홍, 기름기 전혀 없어요. 양배추 채·미소국·흰밥 모두 무한 리필. 옆 외부 매대에선 샌드위치 버전(히레 카츠 산도, 약 4천원)을 팔아요 — '도쿄 최고의 도시락 중 하나'로 불려요.",
            estimatedCost: "약 2만 4천원",
            transitFromPrev: "도쿄 메트로 치요다선, 약 10분",
          },
          {
            name: "긴자 쇼핑가",
            area: "긴자",
            duration: "2시간",
            description:
              "명품에 관심 없어도 가볼 가치. 일요일 오후엔 추오도리가 보행자 천국(11~18시) — 길 한가운데서 사진을 찍을 수 있어요. '이토야' 문구점 9층은 도쿄 비명품 쇼핑 중 가장 가볼 만한 곳, 노트·잉크·와시·도장 — 일본 문구 마니아의 성지. 애플 스토어 6층엔 무료 루프탑 테라스, 긴자 거리 정면. 미츠코시·와코·외화점의 디스플레이 윈도우는 매월 테마 교체, 크리스마스 시즌 윈도우는 도시의 풍경.",
            estimatedCost: "무료~$$$$",
            transitFromPrev: "도쿄 메트로 긴자선, 8분",
          },
          {
            name: "야키토리 이마이",
            area: "아오야마",
            duration: "1시간 30분",
            description:
              "닭의 모든 부위를 비장탄(빈초탄)으로 굽는 미슐랭급 야키토리집. 오마카세 코스(12~15꼬치, 그날 닭 상태에 따라)만이 정답 — 가슴, 다리, 벼슬, 심장, 연골 — 부위별 세분이 '닭'이라는 식재료를 다시 보게 만들어요. 비장탄 향은 가스와 비교 불가 — 닭 기름이 숯에 떨어지는 순간 향이 확 올라와요. 꼬치 사이마다 오토시(자맛바꿈)가 리듬을 조절. 길고 도시적인 하루의 완벽한 마무리.",
            estimatedCost: "1인 약 6만원",
            bookingTip: "1~2주 전 호텔 컨시어지 통해 예약, 영어 통화 가능. 단정한 옷차림 권장 — 카운터 자리 안내.",
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
              "도쿄역에서 JR 요코스카선 직통으로 가마쿠라까지. JR EAST 외국인 창구에서 '가마쿠라 프리패스'(약 8천원) 구매 — 오후 탈 에노덴 무제한 포함. 지정석은 작은 추가 비용 가치 있음(자유석보다 약 1천원, 그린카는 5천원), 주말 양방향 다 붐빔. 노선이 요코하마를 통과 — 맑은 날엔 왼쪽 멀리 후지산 실루엣이 보여요.",
            estimatedCost: "왕복 약 2만원",
            transitFromPrev: "신주쿠 → 주오선 → 도쿄역, 약 20분",
          },
          {
            name: "쓰루가오카 하치만구",
            area: "가마쿠라",
            address: "유키노시타 2-1-31, 가마쿠라",
            duration: "1시간",
            description:
              "1063년 창건, 가마쿠라에서 가장 중요한 신사. 가마쿠라역 동쪽 출구에서 800m 길이 '와카미야오지' — 옛 사무라이 행렬길, 중앙 구간이 위로 솟은 '단카즈라'에 벚나무가 양옆. 정면 가파른 '오오이시단'(60단)을 올라가 정상에서 뒤를 돌면 바다와 도시가 한 줄로 펼쳐져요 — 가마쿠라의 전형적 엽서. 경내 겐지 연못은 여름엔 연꽃, 흰색·분홍 두 영역으로 갈라져요.",
            estimatedCost: "무료",
            transitFromPrev: "가마쿠라역에서 도보 10분",
          },
          {
            name: "요리토모 소바",
            area: "코마치도리",
            duration: "1시간",
            description:
              "가마쿠라의 공예·간식 거리 코마치도리에서 전통 소바집 아무 데나 들어가세요. 손으로 자른 메밀국수에 차가운 츠유 — 가벼워서 아침 등산 후 일본인이 왜 이걸 먹고 싶어 하는지 단번에 이해. 텐푸라 모듬(새우·가지·만가닥버섯) 추가. '카와코에야'는 동네 노포, 소바유(메밀 삶은 물로 만든 맑은 국)가 무료 리필 — 일본인만 아는 '면 후 의식'.",
            estimatedCost: "약 1만 6천원",
            transitFromPrev: "도보 10분",
          },
          {
            name: "에노덴 하세역",
            area: "가마쿠라 → 하세",
            duration: "10분",
            description:
              "1902년에 깐 단선 노면전차. 해안을 따라 달려요. '가마쿠라 고코 마에' 역 근처에서 바다와 철로가 평행한 풍경은 '슬램덩크' 오프닝과 동일 — 그 건널목은 지금 한국·중국 팬들의 성지가 되어 주말이면 사진 줄. 2량 미니 차량의 오른쪽 창가 좌석에 앉으면 빈티지 만화 한 컷을 통과하는 기분.",
            estimatedCost: "패스에 포함",
            transitFromPrev: "가마쿠라역까지 도보 5분",
          },
          {
            name: "고토쿠인 (가마쿠라 대불)",
            area: "하세",
            address: "하세 4-2-28, 가마쿠라",
            duration: "1시간",
            description:
              "1252년 주조된 13.35m 청동 대불. 1498년 쓰나미로 본당이 무너진 이후 600년 넘게 한데에서 비를 맞으며 앉아 있어요 — 표면의 청동 녹은 일종의 '날씨가 자란 달력'. 추가 20엔으로 대불 등 뒤 작은 문으로 들어가 내부를 볼 수 있어요 — 좁지만 1252년 주조 이음매가 보여요. 출구 길에 있는 '간게쓰도' 별관도 놓치지 마세요 — 14세기 한국식 목조 관음상, 1924년 서울에서 옮겨온 일본 내 희귀 한국 불상.",
            estimatedCost: "약 4천원 + 200원 내부",
            transitFromPrev: "도보 10분",
          },
          {
            name: "유이가하마 해변 일몰",
            area: "유이가하마",
            duration: "1시간",
            description:
              "가마쿠라의 활처럼 휜 서핑 해변. 비수기엔 거의 비어 있어요. 모래에 앉아 서쪽의 이즈 반도 너머로 해가 떨어지는 걸 지켜보세요 — 하늘이 주황에서 분홍, 짙은 보라로 변하는 동안 시간은 잠시 정지. 서퍼들의 실루엣이 한 명씩 줄지어 — 가마쿠라는 도쿄에서 가장 가까운 서핑 학습지. 돌아가는 길엔 에노덴이 데려다 줘요. '시치리가하마' 역에 잠깐 멈춰 달빛 아래 바다를 한 번 보고 도쿄로 복귀. 이게 '우리 여행' 앨범의 표지로 어울리는 한 장.",
            estimatedCost: "무료",
            transitFromPrev: "도보 10분",
          },
        ],
      },
    ],
    packingTips: [
      "벗기 쉬운 신발 — 신사·료칸·일부 식당에서 신발을 벗어요. 끈 운동화는 후회",
      "작은 보조가방 — 도쿄는 공공 쓰레기통이 거의 없어 종일 쓰레기 휴대",
      "보조 배터리(10,000mAh+) — 구글 지도와 번역기가 배터리를 빠르게 소진",
      "현금 지갑 — 작은 식당은 여전히 현금만, 5천엔 이하 소액권이 가장 유용",
      "물티슈 — 일부 공중 화장실 휴지 없음, 직접 챙기면 안전",
      "얇은 외투 — 여름에도 지하철과 백화점 에어컨이 북극",
    ],
    budgetEstimate: "호텔 제외 둘이 하루 16만~24만원",
    generalTips: [
      "1일차 Suica IC카드 발급 — 모든 전철·버스·자판기 터치 결제, 잔액은 편의점에서 환불",
      "편의점 음식(7-Eleven, Lawson, FamilyMart) 진짜 좋아요 — 오니기리·오뎅·계란 샌드위치로 아침·점심 해결",
      "팁 문화 없음 — 강요하면 직원이 당황",
      "박물관 대부분 월요일 휴무 — 일정 짤 때 참고",
      "'Japan Travel' 앱 다운로드 — 오프라인 지도, JR 시각표, 면세 위치",
      "편의점 ATM은 한국 발행 카드(Visa·Mastercard·일부 UnionPay) 다 받음, 7-Bank 환율 최고",
    ],
  },

  "paris-3d-family": {
    tagline: "아이 둘과 3일 — 에펠탑, 루브르, 그리고 디즈니 하루까지.",
    audience: "가족 + 아이 · 중간 예산",
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
    tagline: "푸디 3일 — 시장, 고깃집, 드라이에이지드 한우, 한강 치맥.",
    audience: "솔로 · 푸디",
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
    tagline: "솔로 알뜰 4일 — 사원, 길거리 음식, 아유타야 당일치기.",
    audience: "솔로 · 알뜰",
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

  "osaka-3d-foodie": {
    tagline: "일본의 부엌, 3일 — 타코야키, 오코노미야키, 그리고 교토 하루까지.",
    audience: "솔로 · 푸디 · 중간 예산",
    destination: "오사카",
    destinationCountry: "일본",
    overview:
      "먹으러 온 솔로 여행자를 위한 3일이에요. 오사카는 일본의 부엌 — '쿠이다오레(먹다가 망한다)'라는 말이 여기서 태어났어요. 도톤보리 네온 골목을 누비고, 제대로 된 시장 아침을 먹고, 사찰 분위기를 위해 교토에서 하루를 보낸 뒤, 마지막 밤에는 야키토리로 마무리해요.",
    bestSeasonNote:
      "오사카성 공원 벚꽃 시즌 4월, 또는 단풍과 산책 좋은 날씨의 10월 말이 베스트. 골든위크(4월 말~5월 초)는 일본 국내 여행으로 가격이 솟으니 피하세요.",
    currencyTip:
      "작은 식당과 도톤보리 노점은 여전히 현금이 왕이에요. 도착하자마자 7-Eleven ATM에서 2만~3만엔 뽑아두세요. 큰 체인은 카드와 IC교통카드를 받아요.",
    languageTip:
      "도쿄보다 영어 메뉴가 적어요. '코레오 쿠다사이(이거 주세요)'를 익히고 손가락으로 가리키세요 — 현지인도 그렇게 주문해요. 구글 번역 카메라가 큰 도움 됩니다.",
    emergencyNumber: "110 (경찰), 119 (구급/소방)",
    hotel: {
      name: "크로스 호텔 오사카",
      area: "신사이바시",
      address: "2-5-15 신사이바시스지, 추오구, 오사카 542-0085",
      rationale:
        "신사이바시는 도톤보리 도보 5분, 지하철역 도보 4분, 게다가 아케이드 안에 있어서 비를 맞을 일이 없어요. 객실은 작지만 디자인이 잘 됐고, 로비 카페가 늦게까지 열려서 먹방 끝낸 뒤 한숨 돌리기 좋아요.",
      estimatedNightlyRate: "약 16만원/박",
    },
    airportTransit: {
      method: "난카이 라피트 → 난바 → 미도스지선 → 신사이바시",
      duration: "약 60분",
      cost: "약 2만원 (편도)",
      instructions:
        "간사이 공항(KIX)에서 난카이 라피트 특급 직통으로 난바까지 약 40분. 난바에서 미도스지선 한 정거장이면 신사이바시, 호텔까지 도보 5분. 난카이 매표소에서 외국인 전용 라피트+ICOCA 패키지를 사면 약 5천원 절약돼요.",
    },
    days: [
      {
        theme: "도톤보리 푸드 크롤",
        summary: "도착해서 짐만 풀고 바로 오사카 네온의 한복판으로. 타코야키, 오코노미야키, 강변 조명, 그리고 늦은 밤 라멘.",
        stops: [
          {
            name: "도톤보리 운하 + 글리코 사인",
            area: "도톤보리",
            duration: "45분",
            description:
              "에비스바시 다리 위에서 모든 일본 여행 가이드의 '오사카 챕터'에 등장하는 글리코 러닝맨 사진을 찍으세요. 관광객스럽지만 한 번은 해야 해요. 그다음엔 운하를 따라 걸으며 간판 구경.",
            estimatedCost: "무료",
            transitFromPrev: "호텔에서 도보 5분",
          },
          {
            name: "타코야키 와나카 센니치마에",
            area: "도톤보리",
            address: "11-19 난바 센니치마에, 추오구",
            duration: "30분",
            description:
              "겉은 바삭, 안에는 문어와 다시가 녹아드는 진짜 타코야키. 와나카는 오래된 가게라 가격도 착하고 여전히 현지인이 줄 서요. 소스+마요+가다랑어포+아오노리 얹은 클래식 8알 주문.",
            estimatedCost: "약 8천원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "신사이바시스지 아케이드",
            area: "신사이바시",
            duration: "1시간",
            description:
              "도톤보리에서 신사이바시까지 600m 길이의 지붕 덮인 쇼핑가. 드러그스토어, 패션, 카페, 할인 가전. 다음 식사 전에 소화시키기 좋아요.",
            estimatedCost: "무료",
            transitFromPrev: "도보 8분",
          },
          {
            name: "미즈노 오코노미야키",
            area: "도톤보리",
            address: "1-4-15 도톤보리, 추오구",
            duration: "1시간",
            description:
              "1945년 개업, 미슐랭 빕구르망 오코노미야키. 시그니처 야마이모야키 주문 — 마를 넣은 반죽이 어디보다 폭신해요. 눈앞 철판에서 직접 구워줘요.",
            estimatedCost: "약 1만 8천원",
            bookingTip: "예약 안 받음. 피크 시간 20~30분 대기 — 그 시간에 운하 한 바퀴 돌면 딱.",
            transitFromPrev: "도보 5분",
          },
          {
            name: "호젠지 요코초 등불 골목",
            area: "난바",
            duration: "30분",
            description:
              "호젠지 사찰 옆 50m짜리 자갈 골목 — 종이 등불과 작은 이자카야들이 들어차 있어요. 사찰에선 이끼 덮인 후도묘오 상에 물을 끼얹으며 행운을 빌어요. 옛 오사카의 가장 사진 잘 나오는 한 컷.",
            estimatedCost: "무료",
            transitFromPrev: "도보 3분",
          },
          {
            name: "킨류 라멘 (도톤보리)",
            area: "도톤보리",
            duration: "30분",
            description:
              "녹색 거대 용 간판이 새벽까지 열려 있는 라멘집. 돈코츠쇼유 베이스, 테이블에 김치와 마늘 부추 무한 리필. 24시간 마늘 향이 따라다니지만 그만한 가치 있어요.",
            estimatedCost: "약 1만 2천원",
            transitFromPrev: "도보 3분",
          },
        ],
      },
      {
        theme: "교토 당일치기",
        summary: "30분 기차 한 번이면 일본의 옛 수도. 새벽 후시미 이나리, 료칸 점심, 저녁 러시 전에 오사카 복귀.",
        stops: [
          {
            name: "JR 신쾌속 → 교토",
            area: "신오사카 → 교토역",
            duration: "30분",
            description:
              "신오사카에서 JR 교토선 신쾌속 직통. 맑은 날엔 오른쪽 자리에서 이부키산이 보여요.",
            estimatedCost: "약 7천원",
            transitFromPrev: "신사이바시에서 신오사카 지하철, 약 15분",
          },
          {
            name: "후시미 이나리 타이샤",
            area: "후시미",
            address: "68 후카쿠사 야부노우치초, 후시미구, 교토",
            duration: "2시간",
            description:
              "산을 따라 굽이치는 1만 개의 주황색 도리이. 사람 없이 사진 찍으려면 8시 45분까지 도착. 10시 30분이면 단체 관광객으로 가득 차요. 요츠츠지 교차로(약 30분 위)까지 올라가면 도시 뷰 — 대부분 관광객은 그 전에 멈춰요.",
            estimatedCost: "무료",
            transitFromPrev: "JR 나라선 5분 + 도보 3분",
          },
          {
            name: "니시키 시장 노점",
            area: "교토 중심부",
            duration: "1시간 30분",
            description:
              "'교토의 부엌'이라 불리는 400m 지붕 시장. 타코타마고(달걀 안에 작은 문어), 두유 도넛, 신선한 유바(두부 껍질). 6~8군데 노점에서 조금씩 점심 대신.",
            estimatedCost: "약 1만 8천원",
            transitFromPrev: "JR 나라선 → 교토역 → 지하철 시조, 약 20분",
          },
          {
            name: "키요미즈데라 사원",
            area: "히가시야마",
            duration: "1시간 30분",
            description:
              "1200년 된 목조 사원, 못 하나 안 쓰고 13m 기둥들이 받치고 있어요. 뒤편 오토와 폭포에서 세 줄기(장수·학업·사랑) 중 하나를 골라 마셔보세요.",
            estimatedCost: "약 4천원",
            transitFromPrev: "시조에서 206번 버스 → 고죠자카 정류장, 도보 약 25분",
          },
          {
            name: "산넨자카·니넨자카 골목",
            area: "히가시야마",
            duration: "1시간",
            description:
              "키요미즈에서 내려가는 에도시대 보존 거리. 말차 소프트크림, 기모노 빌려 입은 사람 구경, 일본에서 가장 사진 많이 찍히는 거리. 길거리 음식 먹으며 천천히 내려와요.",
            estimatedCost: "약 1만원",
            transitFromPrev: "키요미즈에서 도보",
          },
          {
            name: "오사카 복귀",
            area: "교토 → 신사이바시",
            duration: "1시간",
            description:
              "기온시조역까지 걸어가서 케이한선 → 요도야바시에서 미도스지선 환승 → 신사이바시. 저녁 전에 호텔에서 한숨 돌리기.",
            estimatedCost: "약 8천원",
            transitFromPrev: "기온시조역까지 도보 10분",
          },
          {
            name: "쿠시카츠 다루마 (신세카이 본점)",
            area: "신세카이",
            address: "2-3-9 에비스히가시, 나니와구",
            duration: "1시간 30분",
            description:
              "쿠시카츠(꼬치 튀김)는 오사카의 또 다른 명물. 다루마는 1929년 원조. 공용 소스 더블 디핑은 절대 금지 — 이 동네 룰. 풀코스를 원하면 15꼬치 오마카세 주문.",
            estimatedCost: "약 2만 7천원",
            bookingTip: "줄 가장 짧을 때는 19시 30분 전 또는 21시 이후.",
            transitFromPrev: "미도스지선 신사이바시 → 도부츠엔마에, 약 10분",
          },
        ],
      },
      {
        theme: "오사카성, 시장 아침, 마지막 식사",
        summary: "쿠로몬 시장 아침, 오사카 가장 유명한 성을 한 바퀴, 그리고 격조 있는 마지막 저녁.",
        stops: [
          {
            name: "쿠로몬 이치바 시장 아침",
            area: "닛폰바시",
            address: "2-4-1 닛폰바시, 추오구",
            duration: "1시간 30분",
            description:
              "신선한 우니, 참치 사시미, 구운 와규 꼬치, 시골 외 최고의 딸기를 파는 600m 노점 시장. 서서 먹고, 나눠 먹고, 끝까지 가지 말고 가볍게.",
            estimatedCost: "약 3만원",
            transitFromPrev: "호텔에서 도보 10분",
          },
          {
            name: "오사카성",
            area: "추오구",
            address: "1-1 오사카조, 추오구",
            duration: "2시간",
            description:
              "히데요시의 16세기 성, 20세기에 콘크리트로 재건. 외관이 핵심 — 에메랄드빛 기와 지붕, 금박 장식, 해자에 비치는 모습. 역사 마니아 아니면 내부 박물관은 패스, 성 주변 공원 산책이 더 좋아요.",
            estimatedCost: "약 7천원 (천수각 입장)",
            bookingTip: "9시 정각 도착해야 단체 버스 피해요. 11시면 천수각 줄이 30분+.",
            transitFromPrev: "센니치마에선 → 다니마치선 → 다니마치 4초메, 약 15분",
          },
          {
            name: "하루코마 스시",
            area: "텐마",
            duration: "1시간 30분",
            description:
              "텐진바시스지(2.6km, 일본 최장 쇼핑가) 지붕 아래 동네 스시야. 도쿄 가격 1/3에 미슐랭급 오마카세를 줘요. 카운터 자리 강추.",
            estimatedCost: "약 4만원 (점심 오마카세)",
            bookingTip: "점심 예약 안 받음. 12시 30분까지 도착해야 카운터 자리 가능.",
            transitFromPrev: "오사카성에서 지하철 → 미나미모리마치, 약 10분",
          },
          {
            name: "우메다 스카이 빌딩",
            area: "우메다",
            duration: "1시간 30분",
            description:
              "두 타워가 꼭대기에 떠 있는 전망대로 연결됨 — '쿠우츄 테이엔(공중 정원)'. 동쪽으로 이코마산, 서쪽으로 만(灣). 일몰 직전에 가면 낮 + 밤을 한 번에.",
            estimatedCost: "약 1만 3천원",
            transitFromPrev: "미도스지선 약 20분",
          },
          {
            name: "엔도 스시 (이른 저녁)",
            area: "후쿠시마",
            duration: "1시간",
            description:
              "마지막 식사를 위한 입식 스시 카운터. 5피스 세트 700엔만 팝니다. 옆이 중앙 수산시장이라 말도 안 되게 신선하고 말도 안 되게 싸요. 2~3세트 주문하세요.",
            estimatedCost: "약 2만원",
            bookingTip: "19시 30분 마감, 18시 30분까지 입장해야 주문 가능.",
            transitFromPrev: "JR 환상선 약 10분",
          },
          {
            name: "도톤보리 야경 산책 (다시)",
            area: "도톤보리",
            duration: "1시간",
            description:
              "여기서 시작했으니 여기서 끝내요. 모든 게 빛나는 밤의 운하는 완전히 다른 도시. 편의점에서 맥주 한 캔 사들고 다리에 기대서 여행을 마무리.",
            estimatedCost: "약 4천원",
            transitFromPrev: "JR 환상선 → 신사이바시 지하철, 약 15분",
          },
        ],
      },
    ],
    packingTips: [
      "벗기 쉬운 신발 — 신사·료칸·일부 식당에서 신발 벗어요",
      "시장 구매용 작은 가방 (유즈 잼 유리병 등)",
      "소화제 — 무조건 과식하게 됨",
      "휴대용 우산 — 오사카 비는 예고 없음",
    ],
    budgetEstimate: "호텔 제외 하루 약 12만~17만원",
    generalTips: [
      "첫날 ICOCA IC카드 발급 — 모든 기차·버스·자판기까지 태그",
      "오사카 사투리(간사이벤)는 친근하고 캐주얼. '오오키니' = 고마워요",
      "팁은 무례해요. 거스름 받으세요",
      "도톤보리 명성과 달리 노점 대부분 21시 마감 — 늦은 밤 일정은 미리 체크",
    ],
  },

  "nyc-4d-couple": {
    tagline: "둘이 떠나는 4일 — 미드타운 명소, 브루클린 브리지, 브로드웨이, 메트.",
    audience: "커플 · 중간 예산",
    destination: "뉴욕",
    destinationCountry: "미국",
    overview:
      "뉴욕을 체크리스트처럼 뛰어다니지 않고 제대로 보고 싶은 커플을 위한 4일이에요. 매일 맨해튼 아이콘 한 곳, 현지인처럼 먹고, 일몰에 브루클린 브리지를 건너고, 마지막 밤은 브로드웨이로 마무리. 호텔은 미드타운 도보 동선과 공항 접근성을 동시에 잡았어요.",
    bestSeasonNote:
      "4월 말~6월 초, 또는 9월 중순~10월 말이 베스트 — 온화한 날씨, 긴 일조, 견딜 만한 인파. 7월 습도와 2월 추위는 피하세요.",
    currencyTip:
      "구멍가게 일부와 1달러 피자 슬라이스 빼고는 어디든 카드. 사이트다운 식당에서 18~22% 팁은 선택이 아니에요 — 그게 직원의 실 수입이에요.",
    languageTip:
      "당연히 영어. 다만 뉴요커는 속도를 중시해요 — 빨리 주문하고, 인도 막지 말고, 메트로카드는 개찰구 도착 전에 꺼내두세요.",
    emergencyNumber: "911 (모든 응급)",
    hotel: {
      name: "팟 51 호텔 미드타운 이스트",
      area: "미드타운 이스트",
      address: "230 E 51st St, New York, NY 10022",
      rationale:
        "미드타운 이스트는 센트럴파크·그랜드센트럴·시내 최고의 지하철 환승까지 도보권이면서, 타임스퀘어보다 한결 조용한 블록이에요. 팟 51은 컴팩트한 모던 객실에 일몰용 루프탑이 있고, JFK행 E선이 한 블록 거리.",
      estimatedNightlyRate: "약 24만원/박",
    },
    airportTransit: {
      method: "JFK 에어트레인 + LIRR → 그랜드센트럴",
      duration: "약 55분",
      cost: "약 2만원 (편도)",
      instructions:
        "JFK에서 에어트레인 표지(공항 내 무료) 따라 자메이카역. 자메이카에서 LIRR 그랜드센트럴행 표 구매(오프피크 약 1만 5천원, 피크 2만원). 그랜드센트럴에서 호텔까지 북쪽 도보 8분. 러시아워에 우버보다 절반 가격. 에어트레인은 E선 지하철($2.90)과도 연결되지만 환승 두 번에 1시간 걸려요.",
    },
    days: [
      {
        theme: "미드타운 아이콘",
        summary: "엽서 같은 맨해튼으로 워밍업 — 센트럴파크, MoMA, 클래식 델리 점심, 황혼의 록펠러 센터.",
        stops: [
          {
            name: "센트럴파크 (더 폰드 + 갭스토 브리지)",
            area: "미드타운",
            duration: "1시간 30분",
            description:
              "그랜드 아미 플라자(5번가 & 59가)에서 입장. 더 폰드를 따라 북쪽으로 걷고, 갭스토 브리지 건너 시프 메도까지. 공원 남단이 가장 상징적인 풍경 + 자전거 적은 곳. 베데스다 테라스 키오스크에서 단테 에스프레소 한 잔.",
            estimatedCost: "무료",
            transitFromPrev: "호텔에서 도보 10분",
          },
          {
            name: "현대미술관 (MoMA)",
            area: "미드타운",
            address: "11 W 53rd St",
            duration: "2시간",
            description:
              "다 보려고 하지 마세요. 5층부터 — 반 고흐의 별이 빛나는 밤, 피카소의 아비뇽의 처녀들, 달리의 기억의 지속, 모네의 수련. 전부 한 방에 있어요. 나머진 보너스. 4층 전후 미국 미술 컬렉션도 세계 최정상.",
            estimatedCost: "약 4만원",
            bookingTip: "온라인 시간 지정 예매로 입구 줄 패스. 금요일 저녁 16~20시 UNIQLO 후원 무료지만 매우 혼잡.",
            transitFromPrev: "도보 15분",
          },
          {
            name: "캣츠 델리카트슨",
            area: "로어 이스트사이드",
            address: "205 E Houston St",
            duration: "1시간",
            description:
              "1888년부터 파스트라미 온 라이. 입구에서 받은 티켓 잘 챙기세요. 컷터 스테이션에 가서 파스트라미 온 라이 주문 + 컷터에게 1달러 팁(두툼하게 썰어줌). 큰 샌드위치니까 나눠 드세요.",
            estimatedCost: "샌드위치 1개 + 사이드 2개 약 4만원",
            transitFromPrev: "F선 5번가 → 2번가, 약 20분",
          },
          {
            name: "뉴욕 공공도서관 (브라이언트파크 쪽)",
            area: "미드타운",
            duration: "45분",
            description:
              "사자상 양옆 대리석 계단을 오른 뒤 안으로. 91m 천장의 로즈 메인 리딩룸 — 100년 동안 사람들이 진짜 일을 해온 거대한 우드 테이블. 무료.",
            estimatedCost: "무료",
            transitFromPrev: "F선 → 42가-브라이언트파크, 약 15분",
          },
          {
            name: "탑 오브 더 락 전망대",
            area: "미드타운",
            duration: "1시간",
            description:
              "엠파이어 스테이트보다 좋아요 — 스카이라인 안에서 맨해튼을 바라보는 거니까. 일몰 30분 전 슬롯으로 예약하면 낮 + 밤을 한 번에. 엠파이어 스테이트가 정중앙에 보여요.",
            estimatedCost: "약 6만원",
            bookingTip: "온라인 예약, 골든아워 30분 전 슬롯 — 2~3일 전 매진.",
            transitFromPrev: "도보 5분",
          },
          {
            name: "킨스 스테이크하우스",
            area: "미드타운",
            address: "72 W 36th St",
            duration: "1시간 30분",
            description:
              "1885년 챱하우스. 천장에 파이프 클럽의 클레이 파이프 9만 개가 매달려 있어요. 머튼 찹이 유명하지만 진짜 주문은 본인 프라임립. 불 무스 룸에 앉으세요.",
            estimatedCost: "약 11만원/인",
            bookingTip: "OpenTable로 1~2주 전 프라임 시간 예약. 당일에도 9시 슬롯이 종종 비어요.",
            transitFromPrev: "도보 10분",
          },
        ],
      },
      {
        theme: "브루클린 + 일몰의 다리",
        summary: "지하철 타고 덤보로, 가장 사진 잘 나오는 브루클린 코너 산책, 피자 논쟁의 그 피자, 그리고 골든아워에 다리 건너 맨해튼 복귀.",
        stops: [
          {
            name: "A선 → 하이 스트리트 (덤보)",
            area: "덤보",
            duration: "25분",
            description:
              "미드타운에서 A/C선으로 하이 스트리트-브루클린 브리지. 나와서 자갈길 비탈을 따라 워싱턴 스트리트로 — 벽돌 창고 사이로 맨해튼 브리지가 액자처럼 보이는 클래식 사진 찍는 곳.",
            estimatedCost: "약 4천원",
            transitFromPrev: "호텔에서 도보 5분",
          },
          {
            name: "워싱턴 스트리트 + 맨해튼 브리지 뷰",
            area: "덤보",
            duration: "30분",
            description:
              "워싱턴과 워터의 교차로에 서세요. 맨해튼 브리지가 엠파이어 스테이트를 액자로 만들어요. 이게 그 브루클린 사진. 11시 전에 가야 단체 관광객 피해요.",
            estimatedCost: "무료",
            transitFromPrev: "포함",
          },
          {
            name: "줄리아나 피자",
            area: "덤보",
            address: "19 Old Fulton St",
            duration: "1시간",
            description:
              "팻시 그리말디의 원조 가게 — 옆 가게 그리말디 팔고 80에 줄리아나 새로 열었어요. 마르게리타와 클램 화이트 파이 주문. 일부 슬라이스는 현금만.",
            estimatedCost: "둘이서 약 4만원",
            bookingTip: "예약 안 받음. 11시 15분까지 가서 12시 러시 전에 자리 잡기.",
            transitFromPrev: "도보 10분",
          },
          {
            name: "브루클린 브리지 파크 + 제인스 캐러셀",
            area: "덤보",
            duration: "1시간 30분",
            description:
              "공원 서쪽으로 산책 — 그린웨이, 1922년산 회전목마(유리 정자에 보호됨), 강 건너 맨해튼 뷰. 돌아올 땐 브루클린 하이츠 프롬나드로 다른 각도.",
            estimatedCost: "회전목마 타면 약 4천원",
            transitFromPrev: "도보 10분",
          },
          {
            name: "타임아웃 마켓 (푸드홀)",
            area: "덤보",
            duration: "1시간",
            description:
              "21개 큐레이션된 브루클린 식당이 한 지붕 아래. 루프탑에서 맨해튼 스카이라인 뷰. 일몰 산책 전 오후 간식.",
            estimatedCost: "약 3만 5천원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "브루클린 브리지 도보 (동→서)",
            area: "브루클린 브리지",
            duration: "45분",
            description:
              "1.8km. 브루클린 쪽 공원에서 시작해서, 해가 스카이라인 뒤로 떨어질 때 맨해튼으로. 남쪽(보행자) 차선 유지(북쪽은 자전거).",
            estimatedCost: "무료",
            transitFromPrev: "브루클린 입구까지 도보 10분",
          },
          {
            name: "롬바르디 피자 (미국 최초 인가 피체리아)",
            area: "리틀 이태리",
            address: "32 Spring St",
            duration: "1시간",
            description:
              "1905년 석탄 화덕 피체리아. 지금도 최고냐는 논쟁은 끝이 없지만 역사는 부정 불가. 피자의 날을 마무리.",
            estimatedCost: "둘이서 약 4만 5천원",
            transitFromPrev: "시티홀역에서 도보 10분",
          },
        ],
      },
      {
        theme: "로어 맨해튼 + 자유의 여신상",
        summary: "9/11 메모리얼, 리버티 페리, 오후엔 하이라인 산책, 그리고 브로드웨이 한 편.",
        stops: [
          {
            name: "9/11 메모리얼 & 박물관",
            area: "파이낸셜 디스트릭트",
            address: "180 Greenwich St",
            duration: "2시간 30분",
            description:
              "쌍둥이 빌딩의 발자국에 들어선 1에이커 리플렉팅 풀 두 개, 모든 이름이 새겨져 있어요. 지하 박물관은 압도적이에요 — 정신적 에너지를 따로 챙기세요. 오큘러스 환승역으로 나오세요, 그건 꼭 봐야 해요.",
            estimatedCost: "박물관 약 4만원, 메모리얼 광장은 무료",
            bookingTip: "박물관 표는 2~3일 전 온라인 예매. 워크인은 1시간+ 대기.",
            transitFromPrev: "렉싱턴 → E선 월드 트레이드 센터, 약 20분",
          },
          {
            name: "이탈리 다운타운",
            area: "파이낸셜 디스트릭트",
            duration: "1시간",
            description:
              "무거운 오전과 페리 사이 가벼운 점심. 파스타 카운터와 피자 카운터 둘 다 로마 스타일에 빨라요. 바에서 와인 한 잔.",
            estimatedCost: "약 4만원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "스타튜 크루즈 페리 → 리버티 아일랜드",
            area: "배터리 파크",
            duration: "2시간",
            description:
              "오직 스타튜 크루즈만 리버티·엘리스에 정박. 표 한 장으로 두 섬 모두 가능. 왕관은 패스 — 작은 창에 긴 대기. 받침대 접근으로 충분해요.",
            estimatedCost: "약 3만 2천원",
            bookingTip: "1일 전 온라인 예약. 여름 주말은 11시면 워크인 매진.",
            transitFromPrev: "페리 터미널까지 도보 15분",
          },
          {
            name: "하이라인 (간스부르 → 34가)",
            area: "첼시 / 미트패킹",
            duration: "1시간",
            description:
              "옛 고가 화물 철로 위 2.3km 선형 공원. 간스부르에서 북쪽으로. 30가쯤 오면 베슬과 허드슨 야드 셰드. 34가 출구로 지하철 잡으세요.",
            estimatedCost: "무료",
            transitFromPrev: "1선 사우스 페리 → 14가, 1정거장",
          },
          {
            name: "조 앨런 (프리시어터)",
            area: "시어터 디스트릭트",
            address: "326 W 46th St",
            duration: "1시간",
            description:
              "1965년 클래식 — 공연 전 배우·스태프·관객들이 앉는 자리. 벽 포스터는 유명한 흥행 실패작들. 미트로프나 버거 시키면 1시간 안에 나옵니다.",
            estimatedCost: "약 7만원/인",
            bookingTip: "18시 정각 예약 — 20시 커튼 시간에 맞춰 테이블 회전.",
            transitFromPrev: "A선 약 15분",
          },
          {
            name: "브로드웨이 공연",
            area: "시어터 디스트릭트",
            duration: "2시간 30분",
            description:
              "제대로 된 브로드웨이 밤. TodayTix 또는 타임스퀘어 TKTS 부스(15시 오픈)에서 당일 반값 표 체크. 최근 롱런: 해밀턴, 라이온킹, 위키드, 북 오브 모르몬.",
            estimatedCost: "공연·좌석에 따라 약 11만~35만원/인",
            bookingTip: "TKTS 부스: 14시 45분에 가서 라인업 먼저 보고 줄 합류. 또는 TodayTix 앱.",
            transitFromPrev: "극장까지 도보 5분",
          },
        ],
      },
      {
        theme: "어퍼 이스트 + 송별",
        summary: "메트, 센트럴파크 저수지 산책, 그리고 마지막 완벽한 슬라이스 후 JFK 기차.",
        stops: [
          {
            name: "메트로폴리탄 미술관",
            area: "어퍼 이스트사이드",
            address: "1000 5th Ave",
            duration: "3시간",
            description:
              "3시간으로도 부족해요. 집중: 이집트 윙(1층), 유럽 회화 1200~1800(2층, 611~644호), 미국 윙 안뜰. 덴두르 신전이 그 사진. 모든 윙 다 보려고 하지 마세요.",
            estimatedCost: "약 4만원 (관광객 정가)",
            bookingTip: "온라인 예매로 매표 줄 패스. 10시 오픈 도착이면 이집트 윙을 거의 독차지.",
            transitFromPrev: "6선 86가 + 도보 10분, 호텔에서 약 25분",
          },
          {
            name: "센트럴파크 저수지 한 바퀴",
            area: "어퍼 이스트사이드",
            duration: "45분",
            description:
              "재키 오 덕에 유명해진 1.58마일 러닝 코스. 남쪽엔 미드타운 스카이라인, 서쪽엔 어퍼 웨스트사이드. 맑은 날 가장 깨끗한 뷰.",
            estimatedCost: "무료",
            transitFromPrev: "도보 10분",
          },
          {
            name: "조스 피자 (타임스퀘어)",
            area: "미드타운",
            address: "1435 Broadway",
            duration: "20분",
            description:
              "$3.50짜리 플레인 슬라이스, 들고 가는 거. 그 자체로 뉴욕 경험. 반으로 접어서 걸으면서 먹어요. 기름 닦을 냅킨 챙기세요.",
            estimatedCost: "약 6천원",
            transitFromPrev: "1선 86가 → 타임스퀘어, 약 15분",
          },
          {
            name: "스트랜드 서점",
            area: "유니언 스퀘어",
            address: "828 Broadway",
            duration: "1시간",
            description:
              "1927년부터 18마일의 책들. 2층 여행 섹션, 3층 희귀본 룸. 마지막 날 스톱으로, 자석 기념품보다 훨씬 좋은 걸 들고 갈 수 있어요.",
            estimatedCost: "평균 구매 약 3만 5천원",
            transitFromPrev: "N선 약 10분",
          },
          {
            name: "마그놀리아 베이커리 (웨스트빌리지 본점)",
            area: "웨스트빌리지",
            duration: "30분",
            description:
              "주문은 컵케이크가 아니라 바나나 푸딩. 작은 컵 하나가 여행의 디저트 마침표.",
            estimatedCost: "약 1만 1천원",
            transitFromPrev: "도보 15분",
          },
          {
            name: "JFK 복귀 (LIRR)",
            area: "그랜드센트럴 → JFK",
            duration: "55분",
            description:
              "걸어서 또는 6선으로 그랜드센트럴. LIRR로 자메이카, 에어트레인으로 터미널. 국제선은 2시간, 국내선은 90분 여유.",
            estimatedCost: "약 2만원",
            transitFromPrev: "지하철로 그랜드센트럴, 약 10분",
          },
        ],
      },
    ],
    packingTips: [
      "편한 워킹화 — 하루 15,000보 이상 예상",
      "휴대용 우산 — NYC 비는 갑자기",
      "여름에도 가벼운 재킷 (지하철 에어컨 북극)",
      "텀블러 — NYC 수돗물 깨끗하고 어디서든 무료 충전",
    ],
    budgetEstimate: "둘이서 호텔 제외 하루 약 27만~40만원 (NYC는 비싸요 — 사이트다운 2끼 + 입장권 포함)",
    generalTips: [
      "7일 무제한 메트로카드($34) — 12회부터 본전",
      "맨해튼에선 우버/리프트가 지하철보다 느려요 — 교통체증",
      "노점 핫도그 괜찮아요, 걱정 마세요",
      "사이트다운 18~22% 팁. 바에서 잔당 $1. 호텔 짐가방당 $1.",
    ],
  },

  "bali-5d-couple": {
    tagline: "둘이 떠나는 5일 — 우붓 라이스테라스, 스미냑 비치, 울루와뚜 일몰.",
    audience: "커플 · 휴양 · 중간 예산",
    destination: "발리",
    destinationCountry: "인도네시아",
    overview:
      "두 베이스로 짠 5일이에요 — 라이스테라스와 강 계곡 요가의 우붓 2박, 비치와 일몰 디너의 스미냑 3박. 절벽 사원의 울루와뚜 당일치기 한 번. 관광만큼 쉼도 원하는 커플을 위한 페이스.",
    bestSeasonNote:
      "5월·6월·9월이 베스트 — 건조하고 습도 낮고 인파 적어요. 12~2월(우기)과 7~8월(가장 혼잡) 피하세요. 3월 니예피(침묵의 날)엔 24시간 섬 전체가 멈춰요.",
    currencyTip:
      "인도네시아 루피아(IDR). 15,000 IDR ≈ 1달러. 중·고급 식당은 카드, 노점·와룽은 현금. ATM은 편의점(Circle K, Indomaret) 안 것만 사용 — 길거리 ATM은 스키밍 위험.",
    languageTip:
      "바하사 인도네시아. '테리마 카시(고마워요)' 한 마디로 80% 해결. 관광지에선 영어 잘 통해요.",
    emergencyNumber: "112 (모든 응급), 118 (구급)",
    hotel: {
      name: "오베로이 비치 리조트 (스미냑)",
      area: "스미냑",
      address: "Jl. Kayu Aya, Seminyak 80361",
      rationale:
        "스미냑은 커플 단일 베이스로 최적 — 비치프론트, 디너 도보권, 공항 40분. 오베로이는 50년 된 리조트로 전용 비치, 어른 분위기, 초가지붕 빌라. 3~5박을 여기서, 1~2박은 우붓에서(Day 1 참고).",
      estimatedNightlyRate: "약 30만원/박",
    },
    airportTransit: {
      method: "DPS → 우붓 프라이빗 트랜스퍼",
      duration: "약 75분",
      cost: "약 3만 5천원 (편도)",
      instructions:
        "응우라 라이 국제공항(DPS)에서 호텔(코마네카 앳 비스마)에 미리 픽업 요청. 공항 택시는 비싸고 관광객 줄이 길어요. Gojek/Grab 앱은 공항 픽업 구역에선 금지지만 드롭오프는 OK.",
    },
    days: [
      {
        theme: "도착 → 우붓",
        summary: "도착, 우붓 프라이빗 드라이브, 강 뷰 빌라 체크인, 비행 피로 회복용 부드러운 저녁.",
        stops: [
          {
            name: "DPS 공항 → 우붓",
            area: "발리 남부 → 중부",
            duration: "1시간 30분",
            description: "예약된 기사가 도착장에서 이름판 들고 대기. 덴파사르 교통 빠져나가면 라이스 필드와 작은 사원들이 펼쳐져요.",
            estimatedCost: "약 3만 5천원",
            transitFromPrev: "도착",
          },
          {
            name: "코마네카 앳 비스마 (우붓) — 체크인",
            area: "우붓",
            duration: "2시간",
            description: "짐 풀고, 짬푸한 강 계곡 위로 떠 있는 인피니티 풀에서 수영. 첫 산책 전 시차 회복.",
            estimatedCost: "우붓 베이스 약 25만원/박",
            transitFromPrev: "기사 드롭오프",
          },
          {
            name: "캄푸한 릿지 워크",
            area: "우붓",
            duration: "1시간 30분",
            description: "두 강 계곡 사이를 잇는 평지 2km 포장 능선 — 양옆은 키 큰 풀, 늦은 오후 빛이 환상. 이바 호텔에서 시작, 카르사 카페까지 걸어가 커피 한 잔, 다시 돌아오기.",
            estimatedCost: "무료",
            transitFromPrev: "호텔에서 도보 10분",
          },
          {
            name: "모자익 레스토랑 가스트로노미크",
            area: "상김간",
            address: "Jl. Raya Sanggingan",
            duration: "2시간",
            description: "프렌치 테크닉 + 인도네시안 재료의 가든 다이닝룸 테이스팅. 8코스 '디스커버리 메뉴'. 식사한 허브가 자란 정원을 통과해 나오게 됩니다.",
            estimatedCost: "와인 포함 약 13만원/인",
            bookingTip: "1주 전 웹사이트 예약. 일요일 휴무.",
            transitFromPrev: "Gojek 차 약 10분",
          },
        ],
      },
      {
        theme: "우붓: 라이스테라스 + 사원 + 폭포",
        summary: "풀 우붓 데이 — 새벽 테갈랄랑 라이스테라스, 성수 사원, 폭포 수영, 그리고 밤의 의식 무용.",
        stops: [
          {
            name: "테갈랄랑 라이스테라스 (일출)",
            area: "테갈랄랑",
            duration: "1시간 30분",
            description: "1000년 된 발리 관개 시스템(수박)이 만든 계단식 논. 6시 45분 도착 — 7시 30분이면 안개 걷히고 9시면 단체 버스. 사진 위해선 테라스 아래로 내려가세요.",
            estimatedCost: "입장 약 3천원 + 그네 약 3천원",
            transitFromPrev: "호텔 차편 약 20분",
          },
          {
            name: "카위 레스토 라이스테라스",
            area: "테갈랄랑",
            duration: "1시간",
            description: "테라스 뷰 아침. 피상 고렝(바나나 튀김), 나시 고렝, 진한 발리 커피. 꾸미지 않은 곳, 뷰가 메인.",
            estimatedCost: "약 1만 6천원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "푸라 티르타 엠풀 (성수 사원)",
            area: "탐팍시링",
            duration: "1시간 30분",
            description: "10세기 사원, 발리 힌두교도들이 11개 지하 샘물에서 멜루카트(정화 의식)를 행해요. 입구에서 사롱+허리띠 빌리고 줄을 따라가면 참여 가능. 갈아입을 옷 챙기세요.",
            estimatedCost: "입장 약 4천원 + 사롱 약 3천원",
            transitFromPrev: "차 약 25분",
          },
          {
            name: "와룽 리틀 버드",
            area: "우붓 중심부",
            duration: "1시간",
            description: "관광 식당 절반 가격에 전통 발리식 라이스 테이블(릿스타플)을 내는 작은 와룽. 나시 참푸르 — 한 접시에 12가지 작은 반찬. 채식 옵션 훌륭.",
            estimatedCost: "약 1만 3천원",
            transitFromPrev: "차 약 35분, 우붓 복귀",
          },
          {
            name: "테게눙안 폭포",
            area: "케메누",
            duration: "2시간",
            description: "150계단 내려가면 넓은 폭포 풀. 옷 안에 수영복 입고 가서 수영, 바위에서 말리고 다시 올라오기. 발리 진정의 한 순간.",
            estimatedCost: "입장 약 1500원",
            transitFromPrev: "차 약 25분 남쪽",
          },
          {
            name: "푸라 달렘 우붓 케착 파이어 댄스",
            area: "우붓",
            duration: "1시간 30분",
            description: "60명 합창단이 라마야나 이야기를 들려주고, 클라이맥스에 파이어 댄스. 매일 19시 30분. 앞줄은 사진용, 음향은 어디서나 훌륭.",
            estimatedCost: "약 1만 1천원",
            bookingTip: "18시 30분부터 입구 매표, 매진 거의 없음.",
            transitFromPrev: "도보 10분",
          },
        ],
      },
      {
        theme: "우붓 → 스미냑",
        summary: "우붓 마지막 아침, 스미냑으로 이동, 비치 모드 체크인.",
        stops: [
          {
            name: "더 요가 반 모닝 요가",
            area: "우붓",
            duration: "1시간 30분",
            description: "라이스 필드 위 오픈에어 대나무 살라에서 하타 또는 빈야사 드롭인 클래스. 워크인 가능, 매트 제공. 요가 안 하는 사람도 우붓 시그니처 경험.",
            estimatedCost: "약 1만 3천원",
            bookingTip: "성수기엔 20분 일찍 도착.",
            transitFromPrev: "도보 10분",
          },
          {
            name: "세니만 커피 스튜디오",
            area: "우붓 중심부",
            duration: "1시간",
            description: "발리산 싱글 오리진 커피, 매장에서 로스팅. 매달린 의자에 앉아 푸어오버 한 잔, 브렉퍼스트 샌드위치. 우붓 3세대 카페의 원조.",
            estimatedCost: "약 1만 3천원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "우붓 → 스미냑 드라이브",
            area: "중부 → 남부",
            duration: "1시간 30분",
            description: "코마네카에서 미리 부른 기사. 남쪽으로 내려가는 길은 바투불란(석조 마을)과 덴파사르 교통을 통과. 알라스 하룸 카페에서 한 번 끊어가도 좋아요.",
            estimatedCost: "약 3만 5천원",
            transitFromPrev: "호텔까지 도보 10분",
          },
          {
            name: "오베로이 — 체크인 + 비치",
            area: "스미냑",
            duration: "3시간",
            description: "체크인, 갈아입고 호텔 전용 비치 산책. 오베로이 선베드는 투숙객 전용. 나시 고렝과 빈탕 맥주로 카바나 점심.",
            estimatedCost: "비치 점심 약 5만원",
            transitFromPrev: "기사 도착",
          },
          {
            name: "더블식스 비치 일몰",
            area: "스미냑",
            duration: "1시간 30분",
            description: "오베로이에서 모래사장 따라 남쪽으로. 더블식스 도착하면 비치바의 빈백(라 플란차의 파스텔 줄무늬가 유명) 자리잡고, 칵테일 한 잔, 인도양에 떨어지는 해 보기.",
            estimatedCost: "칵테일 약 2만원",
            transitFromPrev: "비치 따라 도보 15분",
          },
          {
            name: "메라 푸티",
            area: "스미냑",
            address: "Jl. Petitenget",
            duration: "2시간",
            description: "높은 천장의 대나무 성당 같은 다이닝룸. 셰프 마데 수와르사의 모던 인도네시안 — 바삭한 껍질의 른당, 삼발 마타 곁들인 그릴드 스내퍼. 첫 스미냑 디너로 완벽.",
            estimatedCost: "약 9만원/인",
            bookingTip: "3~5일 전 웹사이트 예약, 19시 30분~20시 30분이 프라임.",
            transitFromPrev: "Gojek 약 5분",
          },
        ],
      },
      {
        theme: "울루와뚜 당일치기",
        summary: "부킷 반도 반나절 — 파당파당 시크릿 비치, 절벽 사원, 그리고 일몰 파이어 댄스.",
        stops: [
          {
            name: "울루와뚜 드라이브",
            area: "스미냑 → 부킷",
            duration: "1시간",
            description: "하루 기사 미리 예약(8시간 약 6만원). 짐바란을 거쳐 부킷으로 올라가는 길이 경치 좋아요. 울루와뚜 루프 한다고 기사에게 알려두세요.",
            estimatedCost: "하루 약 6만원",
            transitFromPrev: "호텔에서 기사 픽업",
          },
          {
            name: "파당파당 비치",
            area: "울루와뚜",
            duration: "2시간",
            description: "바위 사이 좁은 계단 내려가면 작은 화이트 샌드 코브. '먹고 기도하고 사랑하라' 마지막 신 촬영지. 수영, 선베드 빌려서, 노점 나시 고렝.",
            estimatedCost: "입장 약 1500원 + 선베드 약 4천원",
            transitFromPrev: "기사",
          },
          {
            name: "싱글 핀 (서퍼 절벽 카페)",
            area: "울루와뚜",
            duration: "1시간 30분",
            description: "울루와뚜 포인트 절벽 위 — 세계급 레프트핸드 서핑 브레이크가 바로 아래. 참치 토스타다와 시원한 맥주. 8피트 파도 타는 프로들 구경.",
            estimatedCost: "약 4만원",
            transitFromPrev: "기사 약 15분",
          },
          {
            name: "푸라 루후르 울루와뚜 (절벽 사원)",
            area: "울루와뚜",
            duration: "1시간 30분",
            description: "70m 절벽 위 11세기 힌두 사원. 입구에서 사롱 대여(티켓 포함). 마카크 원숭이 조심 — 안경 훔쳐가요. 사원 양쪽 절벽길 모두 걸어보세요.",
            estimatedCost: "약 5천원",
            transitFromPrev: "차로 5분",
          },
          {
            name: "울루와뚜 사원 케착 파이어 댄스",
            area: "울루와뚜",
            duration: "1시간",
            description: "해가 바다 위 공연자들 뒤로 지는 절벽 원형극장에서. 우붓 버전과 다른 — 이건 일몰 엽서 버전. 도착해서 매표.",
            estimatedCost: "약 1만 3천원",
            transitFromPrev: "사원에서 도보 5분",
          },
          {
            name: "짐바란 베이 시푸드 BBQ",
            area: "짐바란",
            duration: "2시간",
            description: "비치 시푸드 와룽 골라보세요 — 메네가 또는 인탄 시푸드가 안전. 모래 위 테이블, 무게로 파는 그릴드 스내퍼/랍스터/새우, 일몰은 지났지만 파도 소리만으로 충분. 발리 시그니처 디너.",
            estimatedCost: "약 6만원/인",
            transitFromPrev: "기사 약 25분 북쪽",
          },
        ],
      },
      {
        theme: "스미냑 마지막 날",
        summary: "스파 아침, 짱구 라이스 패디 점심, 마지막 일몰, 그리고 늦은 비행기 공항 이동.",
        stops: [
          {
            name: "바디웍스 스파",
            area: "스미냑",
            address: "Jl. Kayu Jati",
            duration: "2시간",
            description: "발리식 마사지 제대로. 2시간 '리추얼' 패키지엔 마사지 + 스크럽 + 플라워 바스. 호텔 스파보다 싸고 테크니션 더 좋아요.",
            estimatedCost: "약 7만원/인",
            bookingTip: "웹사이트 WhatsApp으로 1일 전 예약.",
            transitFromPrev: "도보 5분",
          },
          {
            name: "더 론 짱구",
            area: "짱구",
            duration: "2시간",
            description: "비치프론트 레스토랑 + 풀 + 잔디. 포케볼, 버거, 스무디. 한국 가서도 회상할 점심.",
            estimatedCost: "약 4만 5천원",
            transitFromPrev: "Gojek 차 약 25분 북쪽",
          },
          {
            name: "타나 롯 사원",
            area: "타바난",
            duration: "2시간",
            description: "썰물에만 걸어 들어갈 수 있는 바위 위 16세기 사원. 17~18시 일몰에 맞춰 가세요. 사원 자체는 외국인 입장 불가지만 절벽길과 뷰가 메인.",
            estimatedCost: "약 7천원",
            transitFromPrev: "차 약 30분",
          },
          {
            name: "순다라 비치 클럽 (포시즌스 짐바란)",
            area: "짐바란",
            duration: "2시간",
            description: "마지막 디너. 긴 비치프론트 풀데크, 황혼의 티키 횃불, 시푸드와 칵테일. 비싸지만 송별 디너. 비치프론트 테이블 예약.",
            estimatedCost: "약 12만원/인",
            bookingTip: "5~7일 전 웹사이트 예약, 18시 30분 일몰 슬롯.",
            transitFromPrev: "차 약 30분 남쪽",
          },
          {
            name: "순다라 → DPS 공항",
            area: "짐바란 → 공항",
            duration: "30분",
            description: "순다라 컨시어지에 미리 차 예약. 그 시간이면 공항까지 30분. 국제선 체크인 2시간 여유.",
            estimatedCost: "약 2만원",
            transitFromPrev: "디너 후 직행",
          },
        ],
      },
    ],
    packingTips: [
      "사롱 (사원 입장 필수 — 깜빡하면 입구에서 빌려줌)",
      "리프 세이프 선크림 (인도네시아 일부 비치는 일반 선크림 금지)",
      "건기에도 오후 소나기용 가벼운 우비",
      "DEET 모기 스프레이 (우붓 저녁용)",
      "비치용 슬리퍼 + 사원용 워킹 샌들 한 켤레",
    ],
    budgetEstimate: "둘이서 호텔 제외 하루 약 27만~38만원",
    generalTips: [
      "Gojek과 Grab 다운로드 — 24/7 영어 택시, 길거리 기사 1/4 가격",
      "Circle K나 은행 안 ATM만 사용 — 카드 스키밍 알려진 문제",
      "물은 생수만, 좋은 식당의 얼음은 OK",
      "팁 10%는 환영받지만 의무 아님. 포터 가방당 5,000~10,000 IDR",
    ],
  },

  "taipei-3d-solo": {
    tagline: "솔로 3일 — 야시장, 타이베이 101, 그리고 지우펀 등불 하루.",
    audience: "솔로 · 알뜰",
    destination: "타이베이",
    destinationCountry: "대만",
    overview:
      "솔로 타이베이 3일 — 아시아에서 가장 저평가된 수도예요. 걷기 좋고, 친절하고, 음식에 진심. 이 플랜은 세 가지 축이에요: 매일 야시장, 한 번의 큰 도시 뷰, 그리고 '센과 치히로의 행방불명' 영감의 그 찻집을 찾아 지우펀 당일치기. 알뜰 친화적 — 식사 대부분 1만 5천원 이하.",
    bestSeasonNote:
      "10~11월과 3~4월이 가장 쾌적. 여름(6~9월)은 덥고 습하고 태풍, 겨울은 온화(약 15도)하지만 비 잦아요.",
    currencyTip:
      "신타이완달러(NT$ 또는 TWD). 30 TWD ≈ $1. 7-Eleven과 큰 식당은 카드. 야시장은 현금만. 메트로역에서 EasyCard 발급 — 교통+편의점 결제용.",
    languageTip:
      "표준중국어. 메트로와 관광지엔 영어 표지, 야시장은 적어요. 손가락으로 가리키면 됩니다. '시에시에(고마워)'와 가벼운 목례 한 번이면 충분.",
    emergencyNumber: "110 (경찰), 119 (구급/소방)",
    hotel: {
      name: "시먼 시티즌 호텔",
      area: "시먼딩",
      address: "No. 77, Kunming St., Wanhua District",
      rationale:
        "시먼딩은 타이베이의 시부야 — 차 없는 거리, 젊고, 새벽 2시까지 영업. 시티즌 호텔은 3성 가격의 무난한 비즈니스 호텔이고 로비에서 메트로역 도보 2분. 다른 주요 구역까지 MRT로 15분.",
      estimatedNightlyRate: "약 9만원/박",
    },
    airportTransit: {
      method: "MRT 타오위안 공항선(익스프레스) → 타이베이 메인",
      duration: "약 45분 + 메트로 5분",
      cost: "약 7천원",
      instructions:
        "타오위안(TPE)에서 MRT 표지 따라 보라색 공항선 익스프레스(2번만 정차)로 타이베이 메인역 — 약 35분. 블루 라인으로 환승해 한 정거장이면 시먼역. 매표소에서 EasyCard 발급(NT$100 보증금) — 3일 동안 모든 결제에 사용.",
    },
    days: [
      {
        theme: "타이베이 중심부 + 첫 야시장",
        summary: "룽산쓰, 우육면 순례, 샹산에서 도시 뷰, 그리고 저녁은 스린 야시장.",
        stops: [
          {
            name: "룽산쓰 사원",
            area: "완화",
            address: "No. 211, Guangzhou St., Wanhua District",
            duration: "1시간",
            description: "1738년 창건, 타이베이 가장 오래되고 분위기 있는 사원. 불교·도교·민속 신들이 같은 제단을 공유해요. 본전에서 현지인들이 자오베이(반달 점)로 점치는 모습 구경. 무료, 06시 오픈.",
            estimatedCost: "무료",
            transitFromPrev: "호텔에서 도보 5분",
          },
          {
            name: "린동팡 우육면",
            area: "중산",
            address: "No. 274, Bade Rd., Zhongshan District",
            duration: "1시간",
            description: "대만의 국민 음식, 40년 노포가 만들어요. 반힘줄 반정강이살 맑은 국물 주문. 11시 15분까진 도착해야 정오 시작되는 30분 줄 피해요.",
            estimatedCost: "약 1만원",
            transitFromPrev: "MRT 블루 → 레드 → 종샤오 푸싱, 약 15분",
          },
          {
            name: "에슬리트 신이 (서점 + 라이프스타일)",
            area: "신이",
            duration: "1시간 30분",
            description: "타이베이의 문화 거실이 된 24시간 플래그십 서점. 6층의 책, 문구, 다구, 의류. 3층 영문 여행서 섹션은 타이베이 일정 빈틈 채우기 좋아요.",
            estimatedCost: "책 사면 약 2만원",
            transitFromPrev: "MRT 레드 → 샹산, 약 10분",
          },
          {
            name: "타이베이 101 전망대",
            area: "신이",
            duration: "1시간 30분",
            description: "한때 세계 최고였던 508m 타워. 89층 실내 전망대에선 660톤짜리 진동 흡수 펜듈럼이 보여요 — 태풍에도 흔들림 잡아주는 장치. 91층 야외 데크가 진짜 뷰. 17시쯤 가면 낮+일몰 한 번에.",
            estimatedCost: "약 2만 7천원",
            bookingTip: "온라인 1일 전 예매로 매표 줄 패스. 일몰 슬롯은 매진 잦음.",
            transitFromPrev: "도보 10분",
          },
          {
            name: "샹산(코끼리산) 하이킹",
            area: "신이",
            duration: "1시간 30분",
            description: "20분 가파른 돌계단 끝에 타이베이 101 가장 유명한 사진 앵글. 여기 일몰이 타이베이 시그니처 뷰 — 신이 스카이라인 안에 액자처럼 들어간 101 타워. 물 챙겨가세요.",
            estimatedCost: "무료",
            transitFromPrev: "MRT 샹산역에서 등산로까지 도보 10분",
          },
          {
            name: "스린 야시장",
            area: "스린",
            duration: "2시간",
            description: "타이베이 가장 큰 야시장. 목표: 굴 오믈렛, 취두부(용기 있으면), 입구 쪽 토치 구이 우육 큐브, 버블 밀크티, 망고 빙수. 지하 푸드코트가 더 깨끗, 야외 골목이 더 재밌어요.",
            estimatedCost: "여러 메뉴 약 2만 5천원",
            transitFromPrev: "MRT 레드 → 젠탄, 약 25분",
          },
        ],
      },
      {
        theme: "당일치기: 지우펀 + 스펀",
        summary: "기차로 해안 따라 올라가 지우펀 찻집 등불, 돌아오는 길에 스펀 천등.",
        stops: [
          {
            name: "TRA 기차 → 루이팡",
            area: "타이베이 메인 → 루이팡",
            duration: "45분",
            description: "타이베이 메인까지 걷거나 메트로. TRA(대만철도) 일반열차로 루이팡행 표 구입. 터널 지나면 오른쪽 자리에서 바다 뷰.",
            estimatedCost: "약 3천원",
            transitFromPrev: "MRT 타이베이 메인, 약 5분",
          },
          {
            name: "지우펀 옛 거리",
            area: "지우펀",
            duration: "3시간",
            description: "금광 산골 마을이 분위기 있는 관광 마을로 변신. 좁은 돌계단, 매달린 빨간 등불, 바다 위 찻집. 슈치루의 아메이 찻집이 가장 인스타용 — 주말 40분 대기. 시드차 또는 지우펀 찻집이 한적하고 풍경 비슷.",
            estimatedCost: "차 한 주전자 약 1만 3천원",
            bookingTip: "평일 추천. 토요일은 단체버스 인파라 절대 피하세요.",
            transitFromPrev: "루이팡에서 788/1062번 버스 약 15분",
          },
          {
            name: "아간이 토란 경단",
            area: "지우펀",
            duration: "30분",
            description: "지우펀 가장 유명한 간식 — 쫀득한 토란·고구마 경단을 팥죽에 띄워요. 겨울엔 따뜻하게, 여름엔 빙수에. 현금만.",
            estimatedCost: "약 4천원",
            transitFromPrev: "옛 거리 안 도보 2분",
          },
          {
            name: "셔틀 → 스펀",
            area: "지우펀 → 스펀",
            duration: "45분",
            description: "788번 버스로 루이팡, TRA 핑시선 동쪽으로 스펀. 또는 편도 셔틀(약 1만원). 기차가 더 싸고 계곡 풍경 좋아요.",
            estimatedCost: "약 4천원",
            transitFromPrev: "버스로 루이팡 복귀",
          },
          {
            name: "스펀 천등 날리기",
            area: "스펀",
            duration: "1시간",
            description: "기차역 옆 가게에서 종이 천등 구매(약 7천원), 붓으로 사방에 소원 적고, 기차 안 올 때 철로 위에서 날리기. 관광지지만 황혼엔 정말 마법 같아요.",
            estimatedCost: "약 7천원",
            transitFromPrev: "스펀 기차역에서 도보",
          },
          {
            name: "스펀 폭포",
            area: "스펀",
            duration: "1시간",
            description: "20m 폭, 나이아가라 스타일. 천등 구역에서 강 위 보행교로 도보 10분. 기차 타기 전 사진 찍기 좋은 곳.",
            estimatedCost: "무료",
            transitFromPrev: "도보 10분",
          },
          {
            name: "라오허제 야시장",
            area: "송산",
            duration: "1시간 30분",
            description: "스린보다 작고 집중도 높음 — 입구 점토 가마에서 굽는 후추빵(줄 설 가치 있음), 약선 갈비탕, 600m 한 줄이라 다 볼 수 있어요.",
            estimatedCost: "약 2만원",
            transitFromPrev: "기차 → 송산역, 총 1시간",
          },
        ],
      },
      {
        theme: "장제스 + 융캉 + 다다오청",
        summary: "기념관, 푸디 거리, 그리고 타이베이 가장 잘 보존된 옛 동네. 마지막 만두 한 끼 후 공항.",
        stops: [
          {
            name: "장제스 기념관",
            area: "중정",
            duration: "1시간 30분",
            description: "흰 대리석 기념관에 6.3m 청동 장제스. 매시 정각 위병 교대식 — 슬로모션 안무 같은 의식. 바깥 정원도 평화로워요.",
            estimatedCost: "무료",
            transitFromPrev: "MRT 레드 → CKS 기념관, 약 10분",
          },
          {
            name: "딘타이펑 (융캉 본점)",
            area: "융캉",
            address: "No. 194, Xinyi Rd. Sec. 2",
            duration: "1시간",
            description: "1972년 미슐랭 샤오롱바오 제국의 원조. 만두 하나당 18주름. 술 취한 닭, 완탕 수프, 디저트 초콜릿 샤오롱바오까지.",
            estimatedCost: "약 3만 5천원",
            bookingTip: "11시 15분까지 도착하면 11시 45분 러시 전 입장. 4인 미만 예약 안 받음.",
            transitFromPrev: "CKS에서 도보 15분",
          },
          {
            name: "융캉제 산책",
            area: "다안",
            duration: "1시간",
            description: "타이베이에서 가장 걷기 좋은 음식·쇼핑 거리. 스무디, 망고 빙수, 카페, 소규모 부티크. 딘타이펑에서 MRT까지 윈도우 쇼핑.",
            estimatedCost: "디저트 한 잔 약 1만 1천원",
            transitFromPrev: "도보",
          },
          {
            name: "다다오청 옛 거리(디화제)",
            area: "다퉁",
            duration: "1시간 30분",
            description: "타이베이 가장 잘 보존된 옛 동네 — 청말 바로크 양식 상가들이 건어물·차·한약·천을 팔아요. 시아하이 도시신 사당에서 인연 부적. ASW 찻집은 옛 타이베이 최고의 버블티.",
            estimatedCost: "약 8천원",
            transitFromPrev: "MRT 그린 → 레드 → 다차오터우, 약 15분",
          },
          {
            name: "푸항 두유",
            area: "중정",
            duration: "45분",
            description: "매일 아침 10시까지 줄 서는 조식 노포. 늦게 가면 근처 오후 영업 매장 시도. 따뜻한 짠 두유 + 유티아오(꽈배기) + 단빙(달걀 크레페). 현금만.",
            estimatedCost: "약 7천원",
            transitFromPrev: "MRT 오렌지선 약 20분",
          },
          {
            name: "다안 삼림 공원",
            area: "다안",
            duration: "45분",
            description: "타이베이의 센트럴파크. 공항 가기 전 쉬는 자리 — 거북이 연못, 조깅 트랙, 나무 너머 도시 스카이라인. 공원 쪽 노점에서 차 한 잔.",
            estimatedCost: "약 4천원",
            transitFromPrev: "MRT 레드 → 다안파크, 약 15분",
          },
          {
            name: "타오위안 공항 복귀",
            area: "다안 → TPE",
            duration: "55분",
            description: "MRT 레드선 → 타이베이 메인 → 공항선 익스프레스 환승. 국제선 2시간 여유면 충분 — 타오위안 보안검색 빨라요.",
            estimatedCost: "약 7천원",
            transitFromPrev: "MRT",
          },
        ],
      },
    ],
    packingTips: [
      "휴대용 우산 — 타이베이 비는 연중 갑자기",
      "현금 지갑 — 야시장 노점 대부분 카드 안 받음",
      "발 보호용 패치 — 콘크리트 위 하루 15,000보+",
      "여름엔 손부채 — 습도 잔인",
    ],
    budgetEstimate: "호텔 제외 하루 약 9만~13만원",
    generalTips: [
      "도착 즉시 EasyCard — MRT·버스·유바이크·편의점 다 됨",
      "MRT 안 음식 금지 — NT$1,500~7,500 벌금. 물도 안 됨.",
      "팁 문화 없음. 중급 식당은 10% 봉사료 자동 추가.",
      "7-Eleven과 패밀리마트가 친구 — ATM, SIM, 공과금, 새벽 2시 라면",
    ],
  },

  "hanoi-4d-solo": {
    tagline: "솔로 4일 — 올드쿼터 쌀국수 크롤과 하롱베이 당일치기.",
    audience: "솔로 · 알뜰",
    destination: "하노이",
    destinationCountry: "베트남",
    overview:
      "솔로 하노이 4일 — 동남아에서 가장 캐릭터 강한 도시 중 하나예요. 오토바이 카오스, 새벽 2달러 쌀국수, 1000년 사찰, 그리고 한 번의 사치로 하롱베이 당일치기. 알뜰 친화적, 세 끼 1만원 이하로 가능.",
    bestSeasonNote:
      "10월~4월이 건기 하노이 — 쾌적한 기온. 5~9월은 우기, 도시는 정상 작동하지만 오후 폭우 잦아요. 음력설(1~2월) 즈음엔 식당 많이 닫혀요.",
    currencyTip:
      "베트남 동(VND). 24,000 VND ≈ $1. 호텔과 관광 식당은 카드, 길거리 음식과 현지 식당은 현금. 작은 지폐(1만, 2만, 5만동)가 금이에요.",
    languageTip:
      "베트남어. '깜언(고마워요)'으로 대부분 해결. 호텔 외엔 영어 제한적. 구글 번역 오프라인 팩 매일 여러 번 구해줘요.",
    emergencyNumber: "113 (경찰), 115 (구급), 114 (소방)",
    hotel: {
      name: "하노이 라 시에스타 클래식 마마이",
      area: "올드쿼터",
      address: "94 Ma May St., Hoan Kiem District",
      rationale:
        "마마이 거리는 올드쿼터의 심장 — 모든 쌀국수 노점, 비아호이(길거리 맥주), 주말 야시장이 도보 5분. 라 시에스타는 작은 부티크로 안정적인 서비스, 일몰용 루프탑 바, 가격대 최고의 조식 뷔페.",
      estimatedNightlyRate: "약 10만원/박",
    },
    airportTransit: {
      method: "호텔 픽업 또는 86번 공항버스",
      duration: "트랜스퍼 약 45분 / 버스 약 60분",
      cost: "프라이빗 약 2만원 / 버스 약 2천원",
      instructions:
        "노이바이 국제공항(HAN)에서 가장 쉬운 건 호텔 픽업 — 도착장에 이름판 든 기사가 대기. 알뜰 옵션: 86번 공항버스 20분 간격 호안끼엠호까지(약 1시간, 35,000 VND). 택시 카운터 그랩/택시는 약 3만원. 공항에서 길거리 택시 잡지 마세요 — 사기 요금 흔함.",
    },
    days: [
      {
        theme: "올드쿼터 입문",
        summary: "체크인, 36개 옛 거리 산책, 전통 수상 인형극, 그리고 아시아에서 가장 싼 비아호이.",
        stops: [
          {
            name: "라 시에스타 체크인 + 루프탑",
            area: "올드쿼터",
            duration: "1시간",
            description: "짐 풀고, 샤워하고, 루프탑으로. 시원한 사이공 맥주와 올드쿼터 적갈색 기와 지붕의 360도 뷰로 방향감 잡기.",
            estimatedCost: "맥주 약 5천원",
            transitFromPrev: "공항에서",
          },
          {
            name: "호안끼엠호 + 응옥손 사원",
            area: "호안끼엠",
            duration: "1시간 30분",
            description: "하노이의 심장. 호수를 시계 반대 방향으로 돌고, 빨간 후크 다리 건너 작은 섬의 응옥손 사원으로. 태극권 하는 할머니들, 데이트하는 젊은 커플들. 한 바퀴에 도시의 영혼.",
            estimatedCost: "사원 약 2천원",
            transitFromPrev: "호텔에서 도보 5분",
          },
          {
            name: "올드쿼터 거리명 산책",
            area: "올드쿼터",
            duration: "1시간",
            description: "올드쿼터 36개 거리는 각각 옛날 그곳에서 팔던 물건의 이름 — 항박(은), 항가이(비단), 항마(종이), 항틱(주석). 호수에서 항다오 따라 북쪽으로, 4~5개 거리 루프, 전통이 얼마나 살아있는지 보세요.",
            estimatedCost: "무료",
            transitFromPrev: "포함",
          },
          {
            name: "탕롱 수상 인형극",
            area: "호안끼엠",
            address: "57B Dinh Tien Hoang",
            duration: "1시간",
            description: "11세기 베트남 예술 — 인형들이 허리 깊이 물 무대에서 춤추고, 대나무 커튼 뒤에서 막대로 조종. 내레이션은 베트남어지만 시각적 코미디만으로 충분. 50분 공연에 라이브 전통음악.",
            estimatedCost: "약 5천원",
            bookingTip: "공연 30분 전 매표소 구매 — 18시 30분과 20시 공연은 성수기 매진.",
            transitFromPrev: "도보 5분",
          },
          {
            name: "분짜 따",
            area: "올드쿼터",
            address: "21 Nguyen Huu Huan",
            duration: "1시간",
            description: "하노이 시그니처 — 단 디핑 국물에 그릴드 돼지고기, 쌀국수, 신선한 허브 더미. 분짜 따는 분위기(옛날집)가 가장 좋고 오바마/부르댕 이후로도 품질 안 떨어졌어요.",
            estimatedCost: "약 8천원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "비아호이 코너 (따히엔 + 르엉응옥꾸옌)",
            area: "올드쿼터",
            duration: "1시간",
            description: "하노이 가장 유명한 길모퉁이의 작은 빨간 플라스틱 의자에 앉으세요. 비아호이는 5,000동(300원) 신선한 맥주 — 그날 아침 통째로 배달. 땅콩 무료. 큐레이트된 바가 아닌 거리의 진짜 밤 문화.",
            estimatedCost: "약 4천원",
            transitFromPrev: "도보 3분",
          },
        ],
      },
      {
        theme: "하롱베이 당일치기",
        summary: "여행의 유일한 사치 — 1,600개 석회암 카르스트 섬을 도는 긴 하루. 동굴, 카약, 시푸드 점심.",
        stops: [
          {
            name: "투어 셔틀 픽업 → 하롱",
            area: "올드쿼터 → 하롱",
            duration: "3시간",
            description: "예약된 크루즈 투어가 7시 30분~8시쯤 주요 올드쿼터 호텔에서 픽업. 중급 데이크루즈 운영사 선택(바야, 인도차이나 정크, 파라다이스) — 5만~9만원. 동쪽으로 3시간 차, 화장실 한 번 들름.",
            estimatedCost: "투어에 포함",
            transitFromPrev: "호텔 로비 픽업",
          },
          {
            name: "하롱베이 크루즈",
            area: "하롱베이",
            duration: "5시간",
            description: "전통 정크선 탑승, 에메랄드 물 위로 솟은 석회암 카르스트 사이 항해. 보통: 선상 점심(다코스 시푸드), 숨은 라군에서 카약, 숭솟(놀람) 동굴 또는 티엔쿵(천궁) 동굴 방문, 갑판에서 수영.",
            estimatedCost: "중급 데이투어 약 7만 5천원",
            bookingTip: "플라밍고 트래블이나 쓰리랜드 트래블 같은 정식 에이전시 예약. 2만 5천원짜리 저가 투어 피하세요 — 배가 안전하지 않아요.",
            transitFromPrev: "항구 탑승",
          },
          {
            name: "하노이 복귀",
            area: "하롱 → 올드쿼터",
            duration: "3시간",
            description: "버스로 한 번 휴게소. 19시~19시 30분쯤 호텔 도착. 긴 하루 — 호텔 근처 조용한 디너로 보상.",
            estimatedCost: "포함",
            transitFromPrev: "항구 출발",
          },
          {
            name: "짜까 라봉",
            area: "올드쿼터",
            address: "14 Cha Ca St.",
            duration: "1시간",
            description: "1871년부터 단일 메뉴 식당 — 강황 마리네이드 메기를 테이블에서 토기 화로에 딜·파와 함께 볶아 쌀국수·땅콩·피시 소스와 함께. 메뉴는 이거 하나뿐. 길거리 음식보다 사치할 만해요.",
            estimatedCost: "약 1만 6천원",
            transitFromPrev: "호텔에서 도보 10분",
          },
        ],
      },
      {
        theme: "임페리얼 하노이",
        summary: "호치민 묘소, 문묘, 하노이 트레인 스트리트, 그리고 늦은 점심은 프렌치 쿼터.",
        stops: [
          {
            name: "포 자 트루옌 (밧단) — 아침 쌀국수",
            area: "올드쿼터",
            address: "49 Bat Dan St.",
            duration: "45분",
            description: "현지인 대부분이 인정하는 하노이 최고의 포보(소고기 쌀국수). 줄, 주문, 결제, 자리 — 셀프서비스. 후루룩 큰 소리로 먹고, 고추와 라임 추가. 06시 오픈, 국물 떨어지면 마감(~10시).",
            estimatedCost: "약 4천원",
            transitFromPrev: "호텔에서 도보 7분",
          },
          {
            name: "호치민 묘소",
            area: "바딘",
            duration: "1시간 30분",
            description: "'호 아저씨'의 시신이 화강암 묘소에 — 1945년 그가 프랑스로부터 독립을 선언한 바딘 광장 위. 엄격한 드레스 코드(어깨·무릎 가림, 반바지 금지). 안에선 침묵. 월·금 휴무.",
            estimatedCost: "무료",
            bookingTip: "9시 도착 — 일찍은 줄이 빠르게, 10시 30분쯤이면 45분으로 늦어져요.",
            transitFromPrev: "그랩 약 15분",
          },
          {
            name: "문묘 (반미에우)",
            area: "동다",
            duration: "1시간 30분",
            description: "베트남 첫 대학, 1070년 창건. 5개 안뜰의 정자, 용 조각 연못, 1442~1779 과거 합격자 이름이 새겨진 82개 비석 — 각각 돌거북 위. 하노이 가장 유교적인 코너.",
            estimatedCost: "약 2천원",
            transitFromPrev: "그랩 약 10분",
          },
          {
            name: "반미 25",
            area: "올드쿼터",
            address: "25 Hang Ca",
            duration: "45분",
            description: "하노이 최고의 반미. 바삭한 바게트, 파테, 돼지고기, 단무지 당근, 고수, 고추. '반미 25 스페셜'(모든 고기) 주문. 길 건너 플라스틱 의자에서.",
            estimatedCost: "약 3천원",
            transitFromPrev: "그랩 약 15분",
          },
          {
            name: "하노이 트레인 스트리트",
            area: "호안끼엠",
            duration: "1시간",
            description: "주거 골목 사이 좁은 길에 실제 운행하는 기차 트랙. 카페에 앉아 있으면 15시 20분 또는 19시 20분 기차가 커피잔 2m 옆을 지나가요. 카페로 입장(50,000동 커버 차지).",
            estimatedCost: "약 3천원",
            bookingTip: "기차 시각 현지 확인 — 자주 바뀜. 카페가 알려줘요.",
            transitFromPrev: "도보 10분",
          },
          {
            name: "하노이 오페라하우스 + 프렌치 쿼터",
            area: "프렌치 쿼터",
            duration: "1시간",
            description: "1911년 파리 오페라를 모델로 한 신고전주의 오페라하우스. 공연 없으면 보통 내부 입장 불가지만 주변 프렌치 쿼터 거리(짱띠엔, 응오꾸옌)는 1920년대 빌라와 넓은 대로 — 올드쿼터의 카오스와 식민지 대비.",
            estimatedCost: "무료",
            transitFromPrev: "그랩 약 10분",
          },
          {
            name: "응온 가든",
            area: "프렌치 쿼터",
            address: "70 Nguyen Du",
            duration: "1시간 30분",
            description: "정원 세팅의 푸드홀, 50개+ 베트남 지역 요리. 전채·국·구이·디저트 섞어 주문. 관광지화됐지만 품질 안정. 송별 디너로 좋아요.",
            estimatedCost: "약 2만 5천원",
            transitFromPrev: "도보 10분",
          },
        ],
      },
      {
        theme: "서호 + 공항",
        summary: "쩐꾸옥 사원, 서호 아침, 마지막 에그 커피, 그리고 차분한 공항 이동.",
        stops: [
          {
            name: "쩐꾸옥 사원",
            area: "서호",
            address: "Thanh Nien Rd.",
            duration: "1시간",
            description: "하노이 가장 오래된 사원(서기 541년). 서호 작은 섬 위 빨강·금색 스투파, 짧은 둑길로 연결. 보살상 옆을 걷는 승려들. 마지막 날 시작으로 평화로워요.",
            estimatedCost: "무료(시주 환영)",
            transitFromPrev: "그랩 약 15분",
          },
          {
            name: "지앙 카페 에그 커피",
            area: "올드쿼터",
            address: "39 Nguyen Huu Huan",
            duration: "45분",
            description: "1946년 우유 부족하던 시절 하노이가 발명한 에그 커피. 지앙은 원조 가족이 여전히 운영 — 가당 연유와 휘저은 노른자가 뜨거운 에스프레소 위에 떠 있어요. 액체 티라미수 맛. 좁은 2층 자리로 올라가세요.",
            estimatedCost: "약 3천원",
            transitFromPrev: "그랩 약 10분",
          },
          {
            name: "동쑤언 시장",
            area: "올드쿼터",
            duration: "1시간",
            description: "하노이 최대 지붕 시장 — 4층의 의류, 가방, 생활용품, 짝퉁, 뒤편 푸드 노점. 마지막 기념품 쇼핑 좋아요(실크 스카프, 커피, 연꽃차). 첫 가격에서 30~50% 깎기.",
            estimatedCost: "선물 몇 개 약 2만원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "분리에우 (40 항째)",
            area: "올드쿼터",
            duration: "1시간",
            description: "마지막 현지 한 끼 — 분리에우는 북부 베트남만의 토마토-게 쌀국수, 돼지고기와 튀긴 두부 토핑. 작은 의자에 앉는 길거리 주방. 1988년부터 그 자리에서 끓이는 할머니.",
            estimatedCost: "약 4천원",
            transitFromPrev: "도보 5분",
          },
          {
            name: "호텔 들러 짐 찾기",
            area: "올드쿼터",
            duration: "1시간",
            description: "호텔 복귀, 필요하면 샤워, 보관소에서 짐. 공항 픽업 미리 요청.",
            estimatedCost: "무료",
            transitFromPrev: "도보 5분",
          },
          {
            name: "노이바이 공항 복귀",
            area: "올드쿼터 → HAN",
            duration: "45분",
            description: "예약된 호텔 픽업으로 노이바이. 국제선 3시간 여유 — 노이바이 보안 줄이 느릴 수 있어요.",
            estimatedCost: "약 2만원",
            transitFromPrev: "호텔 픽업",
          },
        ],
      },
    ],
    packingTips: [
      "지퍼 달린 크로스백 — 올드쿼터 오토바이가 헐거운 가방 낚아챔",
      "사원·묘소용 긴바지 또는 치마",
      "손 세정제 — 손으로 먹는 일이 많아요",
      "작은 우산 또는 우비 — 건기에도 오후 소나기 잦아요",
      "현금 벨트 또는 파우치 — ATM 많지만 줄 길 수 있어요",
    ],
    budgetEstimate: "호텔 제외 하루 약 7만~11만원 (하롱베이가 사치 — 1회성 8만원)",
    generalTips: [
      "택시는 무조건 그랩 — 가격 고정·투명",
      "길에서 다가오는 'Mai Linh' 택시 절대 타지 마세요 — 가짜",
      "길 건너기: 천천히 일정한 속도로 걸으면 오토바이가 알아서 비켜요. 갑자기 멈추지 마세요.",
      "팁 의무 아니지만 잔돈 올림은 환영",
      "SIM: 공항에서 비에텔/비에트나모바일 eSIM 약 1만원 / 10GB",
    ],
  },

  "london-4d-couple": {
    tagline: "둘이 떠나는 4일 — 대영박물관, 버러 마켓, 옥스퍼드 당일치기.",
    audience: "커플 · 중간 예산",
    destination: "런던",
    destinationCountry: "영국",
    overview:
      "관광버스 느낌 없이 클래식 런던을 보고 싶은 커플을 위한 4일이에요. 오전엔 세계 최고의 무료 박물관, 오후엔 마켓과 왕립공원 산책, 그리고 하루는 옥스퍼드 통째로. 호텔은 웨스트엔드 도보 + 패딩턴 익스프레스로 히드로 빠르게 갈 수 있도록 골랐어요.",
    bestSeasonNote:
      "5월~6월 초, 9월~10월 초가 베스트 — 쾌적한 기온, 긴 일조, 견딜 만한 인파. 7~8월은 덥고 혼잡, 1월은 가장 싸지만 가장 어두워요.",
    currencyTip:
      "파운드(GBP). 카드와 컨택트리스 어디서나 — 4일 내내 현금 한 번 안 만져도 됩니다. 신용카드를 튜브 개찰구에 태그하면 일일 캡(약 £8.10)이 자동 적용.",
    languageTip:
      "영국식 영어. 'Ta' = 고마워, 'cheers' = 고마워+안녕, 'sorted' = 끝났어. 펍 주문은 바로 가서 — 자리에서 기다리지 않아요.",
    emergencyNumber: "999 (모든 응급)",
    hotel: {
      name: "더 Z 호텔 빅토리아",
      area: "빅토리아",
      address: "19 Saint George's Dr, Pimlico",
      rationale:
        "빅토리아는 버킹엄 궁전 도보 10분, 히드로행 익스프레스 라인, 4개 튜브 노선 환승. Z 호텔은 작지만 모던한 객실, 워터폴 샤워, 안정적인 와이파이, 괜찮은 로비 카페 — 종일 밖에 있을 커플에 딱.",
      estimatedNightlyRate: "약 23만원/박",
    },
    airportTransit: {
      method: "히드로 익스프레스 → 패딩턴 → 튜브로 빅토리아",
      duration: "약 35분",
      cost: "약 5만원 (편도, 또는 느린 튜브 약 7천원)",
      instructions:
        "히드로(LHR)에서 히드로 익스프레스 15분 간격, 논스톱으로 패딩턴까지 15분. 2주 전 온라인 예매 약 2만 5천원. 패딩턴에서 서클선으로 빅토리아 5정거장 12분. 알뜰: 피카딜리 튜브선 빅토리아 직통 50분, 피크 약 7천원/오프피크 약 4천원. 컨택트리스 카드 태그 — 종이 표 필요 없어요.",
    },
    days: [
      {
        theme: "웨스트민스터 & 사우스뱅크",
        summary: "런던 클래식 엽서 코스 — 빅벤, 웨스트민스터 사원, 테이트 모던 강변 산책, 펍 디너.",
        stops: [
          {
            name: "빅벤 + 웨스트민스터 브리지",
            area: "웨스트민스터",
            duration: "45분",
            description: "엘리자베스 타워(빅벤이 들어있는)는 2017~2022 청소를 거쳐 1859년 모습 — 갓 만들어진 고딕 같아요. 웨스트민스터 브리지 건너서 런던 아이를 끼워 사진. 국회의사당은 모든 영국 영화에서 본 그 강변.",
            estimatedCost: "무료",
            transitFromPrev: "튜브 디스트릭트선 빅토리아 → 웨스트민스터, 약 5분",
          },
          {
            name: "웨스트민스터 사원",
            area: "웨스트민스터",
            address: "20 Deans Yd",
            duration: "2시간",
            description: "1066년 이래 대관식 교회. 에드워드 5세·8세 빼고 모든 잉글랜드 군주가 여기서 즉위, 뉴턴·다윈·호킹이 과학자 코너에 잠들어 있어요. 레이디 채플의 부채형 천장 때문에 오디오가이드 + 2시간 잡으세요.",
            estimatedCost: "약 4만 8천원",
            bookingTip: "2~3일 전 온라인 예약. 토요일은 1주 전 매진.",
            transitFromPrev: "도보 5분",
          },
          {
            name: "버러 마켓 점심",
            area: "사우스워크",
            duration: "1시간 30분",
            description: "런던 가장 오래된 음식 시장. 서서 먹기 — 카파카세인의 그릴드 치즈, 브린디사의 파에야, 르 마르셰 뒤 카르티에의 덕 콩피 바게트. 기억에 남을 점심.",
            estimatedCost: "약 3만원",
            transitFromPrev: "주빌리선 웨스트민스터 → 런던브리지, 약 15분",
          },
          {
            name: "테이트 모던",
            area: "사우스뱅크",
            duration: "2시간",
            description: "옛 발전소가 유럽 가장 중요한 현대미술관으로. 상설은 무료. 로스코, 피카소, 베이컨, 폴록. 10층 뷰잉 테라스가 강 건너 세인트 폴 대성당의 무료 최고 뷰.",
            estimatedCost: "무료 (특별전 별도)",
            transitFromPrev: "강변 따라 도보 10분",
          },
          {
            name: "밀레니엄 브리지 + 세인트 폴 외관",
            area: "사우스뱅크 → 시티",
            duration: "45분",
            description: "보행 전용 밀레니엄 브리지 건너 세인트 폴 쪽으로. 1710년 렌의 걸작 외관은 여전히 무료 — 위스퍼링 갤러리 오를 결심 아니면 유료 내부는 패스.",
            estimatedCost: "무료",
            transitFromPrev: "도보 5분",
          },
          {
            name: "더 조지 인",
            area: "사우스워크",
            address: "75-77 Borough High St.",
            duration: "1시간 30분",
            description: "런던에 남은 유일한 갤러리 코칭 인 — 1677년, 내셔널 트러스트 소유. 제대로 된 펍 디너: 으깬 완두콩 곁들인 피시앤칩스와 우드 패널 룸의 생맥주 한 잔. 디킨스가 마시던 곳.",
            estimatedCost: "둘이서 음료 포함 약 5만 8천원",
            bookingTip: "OpenTable로 예약 — 다이닝룸 작고 비어 가든은 선착순.",
            transitFromPrev: "도보 10분",
          },
        ],
      },
      {
        theme: "대영박물관 + 코벤트 가든 + 소호",
        summary: "오전은 세계급 박물관, 오후엔 마켓과 세븐다이얼스, 디너는 소호.",
        stops: [
          {
            name: "대영박물관",
            area: "블룸즈버리",
            address: "Great Russell St",
            duration: "3시간",
            description: "무료. 800만 점 유물, 94개 갤러리. 집중: 로제타 스톤(4관), 파르테논 마블(18관), 이집트 미라(62~63관), 서튼 후 보물(41관). 그레이트 코트 유리 천장만으로도 갈 가치.",
            estimatedCost: "무료",
            bookingTip: "무료 시간 지정 티켓 온라인 예약으로 보안 줄 패스.",
            transitFromPrev: "튜브 빅토리아 → 토트넘 코트 로드, 약 15분",
          },
          {
            name: "플랫 아이언 (코벤트 가든)",
            area: "코벤트 가든",
            address: "17-18 Henrietta St",
            duration: "1시간",
            description: "£14에 페더 스테이크, 드리핑 칩스, 그릴드 토마토, 도착 팝콘. 지갑 안 깨지는 완벽한 런던 점심. 예약 안 받음 — 가서 이름 적으면 자리 나면 문자.",
            estimatedCost: "약 3만 3천원/인",
            transitFromPrev: "도보 15분",
          },
          {
            name: "코벤트 가든 마켓 + 세븐다이얼스",
            area: "코벤트 가든",
            duration: "1시간 30분",
            description: "1830년 코벤트 가든 마켓 건물엔 공예 노점, 2층 상점, 진짜 훈련된 오페라 부르는 무료 거리 공연. 북쪽으로 세븐다이얼스 — 닐스 야드 레미디스, 케일색 골목 사진 명소.",
            estimatedCost: "구매 안 하면 무료",
            transitFromPrev: "도보 5분",
          },
          {
            name: "내셔널 갤러리",
            area: "트라팔가 광장",
            duration: "1시간 30분",
            description: "무료. 장식 윙 패스하고 바로: 반 고흐의 해바라기(43호), 레오나르도의 암굴의 성모(9호), 터너의 파이팅 테메레르(34호). 90분이면 선택적으로 충분.",
            estimatedCost: "무료",
            transitFromPrev: "도보 15분",
          },
          {
            name: "트라팔가 광장 + 어드미럴티 아치 산책",
            area: "화이트홀",
            duration: "45분",
            description: "넬슨 기둥, 사자상, 4번째 좌대엔 회전 현대미술. 더 몰을 따라 버킹엄 궁전 쪽으로 — 세인트 제임스 파크 곁 늦은 빛 산책.",
            estimatedCost: "무료",
            transitFromPrev: "포함",
          },
          {
            name: "보카 디 루포",
            area: "소호",
            address: "12 Archer St",
            duration: "1시간 30분",
            description: "소호 지하의 지역 이탈리안 작은 접시 — 모든 메뉴가 특정 이탈리아 마을을 명시. 비텔로 토나토, 은두야 곁들인 오레키에테, 부라타 + 바롤로 한 잔. 키친 카운터 자리가 베스트.",
            estimatedCost: "와인 포함 약 10만원/인",
            bookingTip: "1주 전 웹사이트 예약, 20시 프라임. 워크인 카운터 자리도 가끔 있음.",
            transitFromPrev: "도보 10분",
          },
        ],
      },
      {
        theme: "당일치기: 옥스퍼드",
        summary: "기차 1시간이면 대학 도시 — 칼리지 안뜰, 보들리언 도서관, 제대로 된 펍 점심, 그리고 런던 복귀 디너.",
        stops: [
          {
            name: "GWR 기차 → 옥스퍼드",
            area: "패딩턴 → 옥스퍼드",
            duration: "1시간",
            description: "GWR 패딩턴-옥스퍼드 직통 30분 간격. 오프피크 왕복 온라인 약 5만원/인. 멀리 윈저 성 보려면 오른쪽 자리.",
            estimatedCost: "왕복 약 5만원",
            transitFromPrev: "튜브로 패딩턴, 약 15분",
          },
          {
            name: "크라이스트 처치 칼리지",
            area: "옥스퍼드",
            duration: "1시간 30분",
            description: "옥스퍼드 최대 칼리지, 1546년 헨리 8세 창건. 그레이트 홀이 해리포터 다이닝홀 실제 영감(영화는 다른 곳에 복제). 렌의 톰 타워. 칼리지 뒤 메도 산책도 잊지 말기.",
            estimatedCost: "약 2만 8천원",
            bookingTip: "10시 오픈, 9시 45분 도착해서 1등 입장.",
            transitFromPrev: "기차역에서 도보 10분",
          },
          {
            name: "보들리언 도서관 + 래드클리프 카메라",
            area: "옥스퍼드",
            duration: "1시간 30분",
            description: "유럽에서 가장 오래된 도서관 중 하나(1602)와 맞은편 원형 래드클리프 카메라(1749). 도서관 투어(30분)에서 15세기 듀크 험프리 리딩룸 구경. 카메라는 사진용 — 일반 입장 불가.",
            estimatedCost: "보들리언 투어 약 1만 5천원",
            transitFromPrev: "도보 10분",
          },
          {
            name: "더 터프 태번",
            area: "옥스퍼드",
            address: "4 Bath Pl",
            duration: "1시간 30분",
            description: "13세기 펍, 자갈 골목 안에 숨어 있어요. 빌 클린턴이 '들이마시지 않은' 곳, 호킹이 마셨고, 톨킨이 편집했어요. 진짜 에일, 일요일이면 선데이 로스트, 머리 숙여야 하는 낮은 들보. 골목 찾는 게임이 절반의 재미.",
            estimatedCost: "약 4만원/인",
            transitFromPrev: "세인트 헬렌스 패시지로 도보 5분",
          },
          {
            name: "막달렌 칼리지 사슴 공원 + 애디슨 워크",
            area: "옥스퍼드",
            duration: "1시간 30분",
            description: "막달렌(발음은 '모들린')엔 사슴 공원, 종탑, 그리고 C.S. 루이스가 톨킨과 걷던 2km 강변 루프. 복귀 기차 전 천천히 걷는 1시간.",
            estimatedCost: "약 1만 3천원",
            transitFromPrev: "도보 15분",
          },
          {
            name: "런던행 복귀 기차",
            area: "옥스퍼드 → 패딩턴",
            duration: "1시간",
            description: "GWR로 패딩턴 복귀. 쉬는 시간 — 내일은 박물관 + 해러즈 데이.",
            estimatedCost: "왕복에 포함",
            transitFromPrev: "기차역까지 도보 10분",
          },
          {
            name: "디슘 킹스 크로스",
            area: "킹스 크로스",
            address: "5 Stable St",
            duration: "1시간 30분",
            description: "이라니 카페 영감의 인도 음식, 멋진 벽돌 창고 세팅. 하우스 블랙 달(24시간 끓임), 양고기 비리야니, 차이. 디슘은 이유 있는 런던 명소.",
            estimatedCost: "약 6만 5천원/인",
            bookingTip: "6인 미만은 워크인만 — 문자 큐, 20시면 45~60분 대기.",
            transitFromPrev: "패딩턴에서 튜브 약 12분",
          },
        ],
      },
      {
        theme: "V&A + 해러즈 + 송별",
        summary: "마지막 위대한 박물관 한 곳, 해러즈 둘러보기, 애프터눈 티, 그리고 패딩턴 익스프레스로 히드로.",
        stops: [
          {
            name: "빅토리아 앨버트 박물관",
            area: "사우스 켄싱턴",
            address: "Cromwell Rd",
            duration: "2시간 30분",
            description: "무료. 세계 최대 장식미술 박물관. 집중: 패션 갤러리(40), 주얼리 갤러리(91), 캐스트 코트(46), 티푸의 호랑이(41). 존 마데이스키 가든의 안뜰 카페가 런던에서 가장 예쁜 박물관 카페.",
            estimatedCost: "무료",
            transitFromPrev: "튜브 디스트릭트선, 약 10분",
          },
          {
            name: "해러즈",
            area: "나이츠브리지",
            address: "87-135 Brompton Rd",
            duration: "1시간 30분",
            description: "7층, 330개 부서, 12만 m² 리테일 대성당. 안 사도 푸드홀(1층 후면)과 이집트 테마 에스컬레이터는 봐야 해요. 3층 토이 디파트먼트는 그 자체로 목적지.",
            estimatedCost: "구매 안 하면 무료",
            transitFromPrev: "도보 15분",
          },
          {
            name: "포트넘 앤 메이슨 애프터눈 티",
            area: "피카딜리",
            address: "181 Piccadilly",
            duration: "2시간",
            description: "제대로 된 런던 송별. 포트넘 4층 다이아몬드 주빌리 티 살롱 — 핑거 샌드위치, 콘월 클로티드 크림 곁들인 스콘, 페이스트리, 무한 차. 1840년대로 거슬러 올라가는 의식.",
            estimatedCost: "약 13만원/인",
            bookingTip: "2~3주 전 웹사이트 예약, 14시~15시 30분이 프라임. 평일이 주말보다 쉬워요.",
            transitFromPrev: "튜브 나이츠브리지 → 그린파크, 약 10분",
          },
          {
            name: "피카딜리 + 리젠트 스트리트 산책",
            area: "웨스트엔드",
            duration: "1시간",
            description: "스콘 소화시키기. 피카딜리를 따라 로열 아카데미 지나, 피카딜리 서커스의 에로스 상까지, 그다음 북쪽으로 리젠트 스트리트의 굽은 아르데코 파사드. 188-196번지 햄리 토이 스토어는 어른도 들러볼 가치.",
            estimatedCost: "무료",
            transitFromPrev: "도보",
          },
          {
            name: "호텔 들러 짐 찾기",
            area: "빅토리아",
            duration: "1시간",
            description: "튜브로 빅토리아 복귀, 보관 짐 찾고 정리. 21시 히드로 익스프레스 위해 19시 45분까지 패딩턴 출발. 국제선 3시간 여유.",
            estimatedCost: "무료",
            transitFromPrev: "튜브 약 15분",
          },
          {
            name: "히드로 익스프레스 → LHR",
            area: "패딩턴 → 히드로",
            duration: "20분",
            description: "히드로 익스프레스 15분 간격. 패딩턴-LHR 15분 — 유럽 최속 공항 환승. 온라인 예약하면 약 2만 5천원.",
            estimatedCost: "약 2만 5천원",
            transitFromPrev: "튜브 서클선 빅토리아 → 패딩턴, 약 10분",
          },
        ],
      },
    ],
    packingTips: [
      "방수 신발 — 런던 비는 약하지만 잦아요",
      "휴대용 우산 (검정, 화려한 색 X) — 현지 스타일",
      "준 정장 한 벌 — 애프터눈 티, 좋은 펍, 보카 디 루포 디너에 어울려요",
      "UK 어댑터(타입 G) — 미국·EU와 완전 다름",
    ],
    budgetEstimate: "둘이서 호텔 제외 하루 약 25만~42만원 (박물관 + 펍 점심 + 좋은 디너 구조)",
    generalTips: [
      "교통은 컨택트리스 태그 — 일일 캡 약 £8.10에 자동 적용",
      "에스컬레이터에선 오른쪽 서고 왼쪽으로 걸어요. 막으면 런던 사람이 한숨 쉬어요",
      "사이트다운 식당 팁 10~12.5% (보통 자동 추가 — 영수증 확인)",
      "길 건널 땐 오른쪽부터 — 좌측통행",
    ],
  },
};

export default ko;
