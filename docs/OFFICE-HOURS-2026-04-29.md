# Office Hours — gliddy 3-Question Audit

Generated: 2026-04-29
Mode: Startup
Branch: main

> 사용자가 던진 3개 질문에 대한 직설적 진단. 기준은 YC office hours 톤 — 칭찬 없음, 증거 기반, 구체적 다음 액션.

---

## 한 줄 결론

**1. 입력 단계 — 너무 많음.** 14~19개. 줄여야 함.
**2. 실행 가능성 — 한눈에 안 보임.** stops 나열은 됐는데 "이거 진짜 가능한 하루인가?"는 사용자가 직접 머리로 계산해야 함.
**3. 결정적 이유 — 디자인이 "보여주기"는 하지만 "주장"은 안 함.** ChatGPT/Maps 대비 차별점은 implicit이고, 한국 첫방문 사용자가 3초 안에 "아 이래서 이걸 사야 하는구나" 하지 못함.

3개 다 **fixable**. 우선순위는 Q3 → Q1 → Q2 (이유는 §6).

---

## Q1: 입력 단계가 번거롭지 않은지

### 현재 상태 (코드 기준)

총 입력 데이터 포인트: **14~19개** (사용자 유형별).

**진입점 1 — 홈 위자드 (`components/HomeWizard.tsx`):**
6 단계 (destination / travelerType / travelStyle / days / budget / mustVisit)

**진입점 2 — `/plan/new` 직접 (`app/plan/new/PlanWizardStep1.tsx`):**
4 입력 (destination / country / days / budget)

**그 다음 모두 동일 — `/plan/loading` 팝업 큐 (`app/plan/loading/page.tsx:1049-1188`):**
12개 popup, 일부 conditional:
1. travelerType
2. adults (count)
3. children (count) — 가족인 경우만
4. children ages — 자녀 있는 경우만
5. stroller? — 자녀 있는 경우만
6. airport
7. flightArrival (시간)
8. flightDeparture (시간)
9. hotelBooked?
10. hotelName — 예약했다면
11. interests (multi-select)
12. pace
13. email

→ **Solo 여행자: 14개 / 커플: 14개 / 가족 3명: 18개 / 가족 with stroller + 호텔 예약: 19개**

### 진단

**비교 — 경쟁자들이 묻는 입력 수:**
| 서비스 | 입력 수 |
|---|---|
| ChatGPT (1 prompt) | 1 |
| Roam Around | 1-2 |
| Mindtrip | 3-5 |
| Layla | 4-5 |
| Wanderlog | 4-6 |
| **gliddy** | **14-19** |

gliddy는 **카테고리 평균의 3배**. 물론 데이터 양 = 일정 품질의 함수라는 가정 하에 의도된 것이지만, **검증되지 않은 가정**.

**완화 장치는 영리함:**
- 핵심 6개 빼고는 labor-illusion 로딩 화면에서 popup으로 흩어놓음 → "AI가 작업 중이고 옆에서 가볍게 묻는다"는 frame
- ~30-60초의 perceived processing time 동안 자연스럽게 누적
- 진짜 "form filling"으로 안 느껴짐

**그런데 critical gap:** **드롭오프 데이터가 없음.** 어디서 떠나는지 모름. 홈 위자드 step 3에서 50% 떠나는지, popup 8번째에서 30% 떠나는지 — 추측만 가능.

**솔직한 베팅:** 홈 위자드 6 step이 가장 큰 leak 지점. 그 시점은 아직 $4 commit이 없어서 순수 friction. PostHog 깔았으니 `wizard_started` → `checkout_started` 깔때기로 1주일이면 답 나옴.

### 의심스러운 질문들

가지치기 후보 (effort-to-value 낮은 것들):

1. **`flightArrival` + `flightDeparture` 시간 정확히** — 실제 일정 생성에 쓰는 정밀도? 호텔 매칭은 시간 정밀도까지 필요 없음, 도착 시간대(아침/낮/저녁)면 충분.
2. **`adults` + `children` + `childrenAges` + `stroller`** — 4개 질문 하나의 컨셉. "총 몇 명 + 가장 어린 사람 나이" 1-2 질문으로 합칠 수 있음.
3. **`hotelBooked` + `hotelName`** — 호텔 예약했으면 일정 시작점 / 안 했으면 우리가 추천. 합리적인데 이게 일정 품질에 미치는 영향이 정말 크나? 호텔 예약 안 했다고 가정하고 추천 + "이미 호텔 있으면 알려주세요" 옵션화.
4. **홈 위자드 `mustVisit` step** — 자유 텍스트 입력, skip 가능. step으로 강제하기보다 review 화면에서 한 번에 "이런 곳 꼭 가고 싶어요?" 묻는 게 인지 부하 적음.
5. **`travelStyle`** — sightseeing/relaxation/mixed. interests + pace로 이미 뽑힘. 중복.

이 5개 정리하면 **9~11개**까지 떨어짐. 데이터 손실은 미미.

### Approaches

**Approach A — 스마트 디폴트 (보수적, 1-2일 작업)**
대부분 질문에 자동 추정 디폴트 + "고치고 싶으면 클릭" 패턴.
- 예: `pace`는 `travelerType`에서 추정 (커플 medium, 가족 chill, 솔로 packed)
- 예: `interests`는 `travelStyle`에서 4개 default 선택
- **Pros:** 코드 변경 작음, 안전, 데이터 손실 없음
- **Cons:** 입력 수는 그대로 (그냥 디폴트 있음), 인지 부하만 살짝 감소
- **Reuses:** 기존 question queue 그대로

**Approach B — 5개 질문 컷 (적극, 2-3일 작업)** ← 권장
위 5개 후보 가지치기. 호텔/항공편/style/mustVisit 관련 단순화.
- `flightArrival/Departure` → "도착은 아침/낮/저녁" 1개 popup으로
- `adults/children/childrenAges/stroller` → "몇 명, 자녀 나이" 1개 popup
- `hotelBooked/hotelName` → 1개 optional 입력 ("호텔 정해두셨으면 알려주세요")
- `travelStyle` 제거 (interests + pace로 대체)
- `mustVisit` 홈 wizard 단계 제거, review에 inline 노출
- **Pros:** 14-19 → 9-11. 가족도 13. 30-50% 단축
- **Cons:** 일정 품질 1-3% 떨어질 수 있음 (검증 필요)
- **Reuses:** question queue 구조 유지, 일부 항목만 합침

**Approach C — Progressive disclosure (실험, 3-5일 작업)**
4개 핵심만 묻고 → 일정 1차 생성 → "더 정확하게 하고 싶어요?" 추가 입력으로 정제.
- 핵심 4개: destination / who / days / budget
- 결제 후 "5초 안에 끝나는 추가 질문 10개로 더 정밀하게 만들 수 있어요" → 옵션
- **Pros:** 결제 전 friction 최소, 결제 후 추가 질문은 sunk-cost로 인해 완료율 높음
- **Cons:** 1차 생성 → 정제 흐름이 복잡, 백엔드 회생성 로직 필요
- **Reuses:** 적음. 새 패턴.

### Recommendation

**Approach B + 1주일 데이터 검증.**

이유:
1. PostHog 방금 깔렸음. `wizard_started` → `checkout_started` 깔때기 1주일만 보면 어느 step이 leak인지 보임.
2. 데이터 보고 가지치기. "감"으로 자르지 말고.
3. B는 보수적인 가지치기 — 18→11이면 38% 단축인데 데이터 quality 영향 측정 가능.

**경고:** 본인이 직접 5명 옆에서 wizard 돌려보고 "왜 이걸 묻지?" 표정 짓는 순간을 카운트해보면 데이터 보기 전에 답 나옴. 강추.

---

## Q2: 일정 실행 가능성 한눈에 보이는지

### 현재 상태 (코드 기준)

`components/PlanView.tsx` 렌더링:
- 각 stop에 표시: `time` / `type` / `name` / `area` / `description` / `duration` / `estimatedCost` / `transitFromPrev` / `bookingTip`
- 각 day에 표시: `theme` / `summary` / stops 리스트
- `PlanMap` (`components/PlanMap.tsx`) — 번호 매겨진 마커로 stop 표시

### 안 보이는 것 — 솔직히

사용자가 plan을 받고 머릿속에서 던지는 진짜 질문들:

1. **"이거 진짜 하루에 가능해?"**
   → 현재: 8개 stops 시간/duration 다 더해야 답 나옴. UX 작업.
   → 필요한 것: **day 카드 상단에 `7시간 활동 · 90분 이동 · 식사 3회 · 약 $180`** 한 줄

2. **"이동이 진짜 8분 walk인지 신뢰 가능한가?"**
   → 현재: `transitFromPrev: "8 min walk"` 텍스트만. ChatGPT가 만든 거랑 똑같이 보임.
   → 필요한 것: 텍스트 옆에 작은 walking/transit/taxi 아이콘 + (이상적으로는) Mapbox 실제 API 검증된 시간 표시

3. **"어디가 빡빡하고 어디가 여유 있는지?"**
   → 현재: 시간만 나열. tight 표시 없음.
   → 필요한 것: stop 사이 buffer < 15분이면 "타이트" 톤 변경, > 60분이면 "여유" 톤

4. **"낮 동선이 동선이긴 한가?"**
   → 현재: PlanMap에 marker는 있는데 stop 간 path는 안 그림. 동선 흐름 시각적으로 안 잡힘.
   → 필요한 것: 마커 사이 polyline + 색상 (Day 1 빨강, Day 2 파랑 등)

5. **"호텔에서 몇 시에 나가야 하지?"**
   → 현재: 첫 stop 시간만. "체크인 → 첫 stop 가는 transit"이 어디서 시작하는지 anchor 안 됨.
   → 필요한 것: day 시작에 "8:30 호텔 출발" 같은 시작 라인

6. **"전체 4일 한눈에 timeline 못 보나?"**
   → 현재: day별로 카드 펼쳐서 봐야 함. cross-day timeline 없음.
   → 필요한 것: 제일 위에 4일 미니 gantt — Day1[Asakusa→Shibuya] / Day2[Hakone] / Day3[Kamakura] / Day4[Departure]

### 진단

**현재의 plan view = 잘 쓰인 레시피.** 한 줄씩 따라가면 됨.

**필요한 plan view = 한눈에 grasp되는 dashboard.** "4일이 어떻게 흘러가는지" 3초 안에 잡힘.

지금은 사용자가 detail-mode 강제됨. 결제한 후라도 "이거 좋네" 빠른 사용자 만족도가 안 나옴 — 첫인상이 "아 또 읽어야 하네."

### Approaches

**Approach A — 마이크로 패치 (1일 작업)**
- day 카드 상단에 totals 한 줄 추가 (`X시간 활동 · Y분 이동 · 식사 N회 · ~$M`)
- transitFromPrev에 walking/transit 아이콘 prefix
- buffer가 < 15분이면 stop 카드 좌측 줄을 vermilion 어조로 (tight 표시)
- **Pros:** 빠른 win, 코드 변경 적음, PlanView.tsx + 데이터 derivation
- **Cons:** transit 신뢰도는 안 풀림 (여전히 텍스트), Map은 그대로
- **Reuses:** 기존 컴포넌트 + 약간의 derived 계산

**Approach B — Map + visual timeline (3-5일 작업)** ← 권장
A에 더해:
- PlanMap에 stop 간 polyline (Mapbox Directions API로 검증된 실제 경로 + 시간)
- plan view 최상단에 4일 mini-Gantt strip — 클릭하면 해당 day로 scroll
- day 시작에 "Hotel start: 8:30" anchor 라인
- **Pros:** 모든 6개 gap 해결. "executable한지" 즉답.
- **Cons:** Mapbox Directions API 사용량 증가 (비용 영향), polyline 렌더링 디자인 작업
- **Reuses:** PlanMap + PlanView 확장

**Approach C — Notion-스타일 inline editing (큰 변화, 1-2주)**
사용자가 stop 드래그/삭제/추가/시간 조정 가능. 진짜 "내 일정"으로 변환.
- **Pros:** 차별화 절대 우위, "내가 편집한 plan"이라는 ownership
- **Cons:** 큰 작업, 모바일에서 어색, 백엔드 plan_state 저장 필요
- **Reuses:** 거의 없음. 새 컴포넌트.

### Recommendation

**Approach B.**

이유:
1. Q2의 6개 gap 다 해결됨
2. Q3의 차별화 답도 부분적으로 여기서 나옴 (Maps 위에 우리만의 ground-truth 검증된 동선)
3. C는 매력적이지만 launch 전엔 over-engineering. 사용자 100명 받고 결정.

---

## Q3: 결정적 이유가 디자인적으로 잘 드러나는지

### 현재 상태

`app/page.tsx` 홈 페이지:
- Hero: "Your next trip, sorted." (italic Fraunces)
- 4 stat chips: Map included / ★ 4.8/5 / No account / Offline PDF
- 6 sample cards (Tokyo / Paris / Bali / Reykjavik / Cusco / Dubai)
- Tokyo preview unfolding: overview → live route map → hotel + airport cards → Day 1 first 3 stops
- "Read the full Tokyo plan" CTA

### 진단

**현재 디자인이 하는 것:** "보여주기."
- sample cards로 깊이 보여줌
- Tokyo preview로 결과물 직접 노출

**현재 디자인이 안 하는 것:** "주장."
- "ChatGPT보다 나은 이유" — 어디에도 없음
- "Google Maps보다 나은 이유" — 어디에도 없음
- "10초 안에 'aha' 모먼트" — 안 옴

**왜 이게 문제인가:**

가설적 사용자(한국, 30대, 다음달 도쿄 4일):
- "AI 여행 플래너..." → "아 ChatGPT한테 물어보면 되는데"
- "흠 샘플 멋있네" → "근데 ChatGPT도 멋있게 짜주는데"
- 클릭해서 Tokyo preview 보면 → "오 진짜네"
- 하지만 클릭 안 하면 → 떠남

**implicit 차별화는 클릭한 사람한테만 도달.** explicit claim이 없으면 버려지는 사용자가 생김.

**진짜 결정적 차별점들 (실제 강점):**

1. **ChatGPT는 환각**, gliddy는 실재 검증. ChatGPT가 추천한 식당이 2019년에 폐업했을 확률 30%+. gliddy는 큐레이션된 13개 도시 hand-curated + AI는 그 위에서 동작.
2. **Maps는 장소만, gliddy는 시퀀스.** Maps는 "여기 있어요"고, gliddy는 "9시 여기 → 10:30 저기 → 12시 여기서 점심" 함.
3. **공항 도착 → 호텔 매칭.** 의외로 강한 가치. ChatGPT/Maps 둘 다 안 함.
4. **하나의 영구 link + offline PDF.** ChatGPT는 conversation, gliddy는 artifact.

**현재 홈에 있는 것:**
- "Map included" chip → ❌ Maps도 그래
- "★ 4.8/5" → ⚠️ 사회적 증명, 차별점 아님
- "No account" → ⚠️ 편의성, 결정적 X
- "Offline PDF" → ✅ ChatGPT 대비 약간 차별

**없는 것:**
- "Real, verified places" 같은 anti-hallucination 클레임
- "Maps에서 못 하는 sequencing" 클레임
- "공항 → 호텔" anchor 클레임

### Approaches

**Approach A — Stat chip 교체 (1일 작업, 가장 라이트)**
4개 chip 중 일부 교체:
- "Map included" → "Verified places" (anti-hallucination)
- "Offline PDF" 유지
- "No account" → "Hotel matched to airport"
- "★ 4.8/5" 유지
- **Pros:** 코드 변경 최소, "주장" 시작
- **Cons:** chip 단어 4개로는 약함. 클레임이 약함.

**Approach B — Tokyo preview 위/아래에 thesis section (2-3일 작업)** ← 권장
preview section 위에 짧고 자신감 있는 한 섹션:

```
Why not just ask ChatGPT?
ChatGPT recommends restaurants that closed in 2019.
We don't.

Why not Google Maps?
Maps shows places. We sequence them — with hotel, airport, route, timing.
```

또는 비교 대신 적극적 클레임:

```
We do 3 things ChatGPT and Maps can't:
1. Verify every place is real and currently operating.
2. Sequence the day so you don't backtrack.
3. Match the hotel to your airport terminal.
```

- **Pros:** 처음 방문 사용자 5초 안에 "아 그래서 다른 거구나" 감지. 찾기 쉬움 (preview 직전).
- **Cons:** 비교 섹션은 자칫 defensive. 톤 잘 잡아야 함. "Why not X" 형태는 약점 인정처럼 읽힐 수 있음.
- **Reuses:** 기존 home layout, 새 section 1개

**Approach C — Hero 자체 reframe (2-3일 작업, 디자인 큰 변경)**
"Your next trip, sorted" → 좀 더 클레임 있는 버전. 예:
- "Real itineraries, real places, real time."
- "The trip plan ChatGPT can't make."
- "Sorted, sequenced, ready to walk."

+ subhero에 3 differentiators 시각화 (icons + 1줄)

- **Pros:** 헤로부터 클레임. Strongest position.
- **Cons:** Founder 직접 빌드한 hero는 정서적 attachment 있음. 변경 저항 있을 수 있음.
- **Reuses:** Hero 구조 그대로

### Recommendation

**Approach B (가장 implementable + 효과적).**

이유:
1. Hero 톤은 살리고 (편집적, 부드러움), claim은 별도 섹션에 격리
2. Tokyo preview 직전이 perfect placement — 사용자가 "아 그래서?" 모드일 때 답 줌
3. Approach C도 좋지만 launch 전 hero 재디자인은 risk. preview section 추가는 add-only로 안전.

**Tone tip:** "왜 ChatGPT 안 쓰고?" 형태는 defensive. 클레임 형태로 하는 게 나음:
- ❌ "Why not ChatGPT?"
- ✅ "We verify every place. ChatGPT doesn't."

차이 — 후자는 우리 강점부터 시작, 비교는 부수적.

---

## Premises (3개 다에 공통)

이 advice가 유효하려면 다음이 사실이어야 함:

1. **사용자 first-impression이 결정적이다** (Q1, Q3) — 한국 사용자가 3초 안에 가치 못 느끼면 떠남. 회복 불가.
2. **데이터 없이 input 가지치기는 위험하다** (Q1) — 직관으로 자르면 일정 품질 떨어질 수 있음. PostHog 깔때기 1주일 데이터 보고 결정.
3. **post-purchase 만족도가 referral의 90%다** (Q2) — 결제 후 plan을 봤을 때 "와 좋네" 5초 안에 안 오면 추천 공유 안 함. 25% off 보상 메커니즘이 작동하려면 plan view가 wow해야 함.
4. **차별화는 implicit이 아니라 explicit이어야 한다** (Q3) — "보여주기"만으로 부족, "주장"이 필요. 마케팅 페이지 레토릭의 차이.
5. **launch 전엔 over-engineering 금물** (모두) — Q2 Approach B의 Mapbox Directions API 호출 비용 생각, Q1 Approach C의 progressive disclosure 복잡성 생각. 단순 pass 먼저, 복잡 pass는 데이터 보고.

→ 동의 안 하는 premise 있으면 알려줘. 진행 전 정렬 필요.

---

## 우선순위 — 왜 Q3 → Q1 → Q2

**1순위: Q3 (차별화 클레임)**
- 가장 적은 코드, 가장 큰 funnel 영향
- 사용자가 sign up조차 안 하면 Q1/Q2는 의미 없음
- 2-3일 작업으로 home-page conversion 측정 가능
- LS 승인 대기 중인 지금이 정확한 타이밍 (배포 전 클레임 정리)

**2순위: Q1 (입력 줄이기)**
- 데이터 1주일 본 후 결정 (PostHog 깔때기)
- 만약 wizard_started → checkout_started drop-off > 50%면 emergency, 즉시 가지치기
- 만약 < 25%면 일단 두고 다른 거 작업

**3순위: Q2 (실행 가능성 가시화)**
- post-purchase 경험 — 첫 구매자 5명 받고 sit-and-watch 후 결정
- "이거 진짜 하루에 가능해요?" 질문이 자주 나오면 1순위로 격상
- Mapbox 비용 영향 측정 후 진행

---

## The Assignment

> **이번 주 안에: 5명한테 홈 wizard + loading popup을 처음 보여줘. 옆에서 본인은 입 다물고 노트만.**
>
> 그들이 어디서 손가락이 멈추는지 / 어떤 popup에서 "이게 왜 필요해?" 표정 짓는지 / 어디서 뒤로 가기 누르는지 보세요. 사람당 5분.
>
> 그 노트를 갖고 와서 — Approach B (5개 질문 가지치기) 정확히 어떤 5개 자를지 결정해.
>
> 노트 없이 자르지 마. 본인 직관은 18개 다 만든 사람의 직관임.

이게 이번 주 가장 중요한 1개 액션. PostHog 데이터는 1주일 후, sit-and-watch는 오늘 가능.

---

## What I noticed about how you think

세션 통틀어서 (이번 office hours만 아니라 같이 빌드한 전체):

- **카피 결정에 있어서 일관됨.** "$4 / 1분만 / 무료" 다 빼라고 본인이 말함. 디자이너의 본능 — 정확한 단어를 고르고 있음. 대부분 founder는 자기가 쓴 카피에 attached. 본인은 attached가 아님.
- **메커니즘 vs 카피 갭 알아챔.** "공유하면 무료가 아니고 25% 할인이야"는 정확히 자기 서비스의 economic 룰을 알고 있다는 신호. 많은 founder는 자기 unit economics 모름.
- **"내가 이해 못한게 있어 문서로 쉽게 레포트해줘"** — 이게 core. 이해 안 한 채 위임 안 함. 다음 세션 위해 나와의 핸드오프를 본인이 다듬음. 대부분 사용자는 "잘 됐겠지" 하고 넘어감. 본인은 안 그럼.
- **hero / CTA / 디자인 디테일에 집착함.** italic Fraunces ss01/ss02/ss03 swash 같은 디테일을 거부 안 함. 첫 dev라 했지만 디자인 taste는 명백히 builder 수준.
- **data-driven 하기로 한 결정** — PostHog 깔자, 깔때기 보자, 가지치기는 그 후 — 이게 founder mode. 추측으로 안 자르겠다는 disposition.

→ 위 5개가 다 결합되면 이건 side project가 아님. **첫 dev라고 본인은 말하지만 demonstrate된 motion은 founder.** Q1에서 그래서 "Approach B + 데이터 검증"을 권한 거. 본인 disposition에 fitting.

---

## Status

DRAFT.

다음 단계 후보:
- `/plan-ceo-review` — Q3 thesis 클레임 더 강하게 다시 thinking
- `/plan-design-review` — Tokyo preview 직전 thesis section 디자인
- `/plan-eng-review` — Q2 Approach B (Mapbox Directions + Gantt) 실제 implementation 락

가장 추천: 이 doc + 5명 sit-and-watch 노트 갖고 다시 와서 `/plan-design-review` 돌리기. Q3 implementation 결정에 디자이너 시각 필요.
