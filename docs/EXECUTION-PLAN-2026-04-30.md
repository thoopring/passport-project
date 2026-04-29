# gliddy 실행 계획 — Approach B × 3 + 성장 레이어

> 작성: 2026-04-30
> 출처: `docs/OFFICE-HOURS-2026-04-29.md` 진단 후 결정
> 상태: 사인오프 대기 중 — 본 doc 검토 후 implementation 시작

---

## 1. 핵심 thesis

**3개 Q는 깔때기다.** 따로 보지 말고 funnel로 보자.

```
Q3 — 왜 클릭하는가?    ← TOP (Discovery)
   ↓ home page conversion
Q1 — 왜 끝까지 답하는가? ← MIDDLE (Wizard completion)
   ↓ wizard → checkout conversion
Q2 — 왜 다시 오고 추천하는가? ← BOTTOM (Post-purchase satisfaction)
   ↓ referral / share / repeat
```

**"많은 사람이 찾는다"의 메커니즘:**
- Q3 고치면 → 유입된 사용자가 더 많이 wizard 시작
- Q1 고치면 → wizard 시작한 사용자가 더 많이 결제
- Q2 고치면 → 결제한 사용자가 더 많이 공유 → 새 유입 시작점

**즉 Q2 → Q3 → Q1 모두가 "더 많은 사용자"의 다른 면.** 한 개만 고치면 깔때기 한 단계만 풀려서 효과 제한됨.

---

## 2. 우선순위 + 의존성

| 순위 | 작업 | 시점 | 의존성 |
|---|---|---|---|
| 1 | Q3 thesis section | 즉시 (1주차) | 없음 |
| 2 | Q2a-e (가시화 마이크로 패치) | 1-2주차 | 없음 (병렬) |
| 3 | Sit-and-watch 5명 | 1주차 | 없음 |
| 4 | PostHog 깔때기 데이터 1주 | 2주차 끝 | PostHog 켜져야 함 (founder 액션) |
| 5 | Q1 5개 가지치기 | 3주차 | #3 + #4 데이터 |
| 6 | Q2f Mapbox polylines | 4주차 | 비용 분석 통과 |
| 7 | SEO 블로그 시드 콘텐츠 | 2-4주차 | 병렬 (founder 작업) |
| 8 | OG 이미지 자동 생성 | 4주차 | Q2 완료 |
| 9 | 커뮤니티 시드 | 5주차+ | LS 승인 후 |

---

## 3. Phase 1 — Q3 Thesis Section (1주차, ~3시간)

### 3.1 목표
홈 페이지에 **"왜 ChatGPT/Maps가 아니라 gliddy인지" explicit 클레임** 1개 섹션 추가.
3초 안에 사용자가 "아 이게 다른 거구나" 느끼게.

### 3.2 위치
Tokyo preview section **바로 위** (sample 갤러리와 preview 사이).
이유: 사용자가 sample을 보고 "그래서 뭐?" 모드일 때 답이 나타남.

### 3.3 카피 — claim-first (recommended)

**제목:** "What makes a gliddy plan different" (또는 그 5-locale 버전)

**3 필러 + 작은 SVG 아이콘:**

1. **✓ Real, verified places**
   ChatGPT가 추천한 식당이 2019년에 폐업한 적 있어? 우리는 13개 도시 hand-curated.

2. **✓ Sequenced, not just listed**
   Maps는 장소만. 우리는 "9시 여기 → 10:30 저기 → 12시 점심" 시퀀스.

3. **✓ Hotel matched to your airport**
   터미널 인지. 도착 시간대까지 고려해서 호텔 추천.

**5-locale 카피:**

| Locale | 제목 |
|---|---|
| EN | What makes a gliddy plan different |
| KO | gliddy 플랜이 다른 이유 |
| JA | gliddyプランの違い |
| ZH | gliddy 行程的不同之处 |
| FR | Ce qui distingue un plan gliddy |

3 필러도 동일하게 5-locale 번역.

### 3.4 디자인 톤
- Layla-lean 시스템 안 (warm paper + ink + vermilion)
- 카드 3개 가로 배열 (mobile에서 stack)
- 아이콘은 SVG, 단색 vermilion
- 보더는 subtle, 그림자 거의 없음
- "✓" 마크는 vermilion으로 emphasis
- 톤은 confident, comparison aggressive 안 함

### 3.5 파일

```
app/page.tsx                            ← section 추가
components/PlanThesis.tsx               ← NEW (선택, 그냥 inline 가능)
messages/{en,ko,ja,zh,fr}.json          ← thesis.* 키 추가
```

새 i18n 키:
- `home.thesisTitle`
- `home.thesisPillar1Title` / `home.thesisPillar1Body`
- `home.thesisPillar2Title` / `home.thesisPillar2Body`
- `home.thesisPillar3Title` / `home.thesisPillar3Body`

### 3.6 측정
- PostHog `page_view` 이벤트에 scroll_depth property 추가 (선택)
- 깔때기: `page_view (home)` → `wizard_started` 비율 — before/after 1주일 비교
- 의미: thesis section이 클릭 유도 효과 있는지

### 3.7 결정 필요 사항 (founder)
- [ ] 카피 톤 — claim-first ('We do 3 things ChatGPT and Maps can't') vs comparison-first ('ChatGPT recommends restaurants closed in 2019')
  → **권장: claim-first.** Defensive 톤 회피.
- [ ] 한국어 카피 1차안 검토 (직역 vs 의역)

---

## 4. Phase 2 — Q2a-e (1-2주차, ~12-15시간 병렬)

### 4.1 목표
**post-purchase 만족도** = 추천 공유율 = 새 유입의 유기적 채널.
plan view 첫 5초 안에 "오 이거 잘 짰네" 감각 만들기.

### 4.2 5개 마이크로 패치

#### Q2a — Day totals (3시간)
**구현:** 각 day 카드 상단에 한 줄 추가
**계산 (derived):**
- 활동 시간 = `sum(stop.duration)` for stops where type ≠ "transit"
- 이동 시간 = `sum(stop.duration)` for transit stops + parsed `transitFromPrev` text
- 식사 횟수 = `count(stop.type === "meal")`
- 예산 = `sum(parsed estimatedCost)` (text 파싱 필요, "~$45" → 45)

**렌더 예시:**
```
DAY 1 · Shibuya & Harajuku
  ⏱ 7시간 활동 · 🚶 90분 이동 · 🍽 식사 3회 · ~$180
```

**파일:** `components/PlanView.tsx`, `lib/plan-stats.ts` (NEW, 계산 헬퍼)

**i18n:**
- `plan.dayTotalActivity` `{hours}시간 활동`
- `plan.dayTotalTransit` `{minutes}분 이동`
- `plan.dayTotalMeals` `식사 {count}회`
- 5-locale × 3 키 = 15개 새 키

#### Q2b — Transit icons (1시간)
**구현:** `transitFromPrev` 텍스트에서 mode inference 후 icon prefix
- "walk" → 🚶 (또는 SVG icon)
- "transit"/"metro"/"subway"/"bus"/"train"/"지하철" → 🚇
- "taxi"/"uber"/"카림" → 🚕
- 매칭 안 되면 default arrow

**파일:** `components/PlanView.tsx`, `lib/transit-icons.ts` (NEW)

#### Q2c — Buffer indicator (2시간)
**구현:** stop 사이 buffer 계산 → 시각 indicator
- buffer = next stop's time - (current stop's time + duration + transit)
- buffer < 15분 → 좌측 border 색을 vermilion으로 (tight)
- buffer > 60분 → 좌측 border 색을 light gray + "여유" 작은 라벨
- 정상 → 현재 그대로

**파일:** `components/PlanView.tsx`

#### Q2d — Hotel anchor (1시간)
**구현:** day 시작에 "Hotel start: 8:30" 라인 추가
- 첫 stop time - first transitFromPrev duration = hotel start time
- type === "rest" + name === hotel.name이면 그게 anchor
- 없으면 derive

**파일:** `components/PlanView.tsx`

**i18n:** `plan.hotelStart` "{time} 호텔 출발"

#### Q2e — 4-day mini-Gantt strip (4-6시간) ← 가장 큰 win
**구현:** plan view 최상단 sticky strip
- N일 horizontal bar
- 각 day 색상 (Day 1 vermilion, Day 2 ink, Day 3 gray, ...)
- 클릭하면 해당 day 카드로 scroll
- mobile에서 sticky scroll 처리

**파일:** `components/PlanTimeline.tsx` (NEW), `components/PlanView.tsx` (위에 mount)

**i18n:** day label은 이미 있음 (`plan.day`)

### 4.3 측정
- PostHog `checkout_completed` → `referral_shared` 비율 — before/after 비교
- "plan 본 후 30초 안에 share 누름" 비율이 KPI

### 4.4 결정 필요
- [ ] Mini-Gantt를 sticky로 할지 (스크롤 따라옴) vs 그냥 top에 한 번만
  → **권장: sticky on desktop only.** mobile은 공간 부족.
- [ ] Day별 색상 — vermilion만 사용? 또는 다양한 색?
  → **권장: vermilion + ink + gray.** Layla 시스템 안.

---

## 5. Phase 3 — Q1 입력 가지치기 (3주차, ~6-8시간 + 1주 데이터 대기)

### 5.1 게이트 (data first)
**구현 시작 전 다음 충족:**
1. PostHog 1주 데이터 — wizard step 별 drop-off
2. Sit-and-watch 5명 노트 — 어디서 멈추고 한숨 쉬는지
3. 위 두 데이터 보고 5개 cut 우선순위 재조정

### 5.2 5개 cut 후보 (재확인용)

| # | Cut 후보 | 영향 | 위험 |
|---|---|---|---|
| 1 | `flightArrival`/`Departure` 정밀 시간 → 시간대(아침/낮/저녁) | -1 popup | 호텔 매칭 정밀도 ↓ |
| 2 | `adults`+`children`+`childrenAges`+`stroller` → 합쳐서 1-2 popup | -2~3 popup | 가족 detail 살짝 손실 |
| 3 | `hotelBooked`+`hotelName` → optional 1 input | -1 popup | 거의 손실 없음 |
| 4 | 홈 wizard `mustVisit` step → review에 inline | -1 step | 거의 손실 없음 |
| 5 | `travelStyle` 제거 (interests + pace로 대체) | -1 step | interest로 대체 가능 |

순효과: 14-19 → **9-11**.

### 5.3 데이터 보고 결정할 변수
- 만약 `wizard_step_completed` 이벤트 추가 후 step별 drop-off가 명확한 가장 큰 leak point가 있으면 → 거기 우선 cut
- 만약 5명 sit-and-watch에서 공통적으로 한숨 쉬는 popup이 있으면 → 거기 우선 cut

### 5.4 파일

```
app/plan/loading/page.tsx               ← buildQuestionQueue() 재작성 (line 1049)
components/QuestionPopup.tsx            ← 새 question type 추가 (selectGroup 같은)
components/HomeWizard.tsx               ← step 제거 (mustVisit / travelStyle)
lib/generator/claude.ts                 ← system prompt 조정 (없는 필드 핸들)
messages/{en,ko,ja,zh,fr}.json         ← 새 popup 카피
```

### 5.5 generator 영향
`lib/generator/claude.ts` system prompt에서 변경:
- "If hotelBooked is unknown, recommend a hotel based on airport + budget"
- "If childrenAges are unknown but children > 0, default to 'mixed ages 4-12'"
- "If travelStyle is missing, infer from interests + pace"

**중요:** 이런 fallback 추가가 plan 품질에 미치는 영향은 측정 필요. 1주일 A/B 비교 (cut 적용된 plan vs 적용 안 된 plan, 사용자 만족도/공유율).

### 5.6 측정
- 깔때기: `wizard_started` → `checkout_started` 비율 — before/after
- A/B: 가지치기 적용 그룹 vs 컨트롤 그룹 — `referral_shared` 비율로 plan 품질 proxy

### 5.7 결정 필요
- [ ] 5개 cut 모두 한 번에 vs 단계적 (예: 가장 명확한 #3 먼저)
  → **권장: 한 번에.** 5개가 서로 약하게 결합되어 있어 (children + stroller 등) 단계적이면 어색.
- [ ] PostHog `wizard_step_completed` 이벤트 추가? (현재는 시작/완료만 추적)
  → **권장: yes, 즉시 추가.** Q1 결정에 필수.

---

## 6. Phase 4 — Q2f Mapbox Polylines (4주차, ~8-12시간)

### 6.1 게이트 (cost first)
**구현 시작 전:**
1. Mapbox Directions API 비용 추정 (1 plan = ~6-30 stops × N pairs = ~100k API calls/month if 1000 plans/month)
2. Mapbox 무료 한도: 100k requests/month free for Directions API
3. 만약 trafffic 1000 plans/month 넘으면 paid tier 필요 — 비용 영향 평가
4. 캐싱 전략 결정

### 6.2 구현
**서버 사이드:**
- `lib/generator/claude.ts`에서 plan 생성 후 stop pair 별 Directions API 호출
- 결과를 plan record에 저장 (DB schema: `route_polylines: jsonb`)
- 1번만 호출, 영구 캐시

**클라이언트:**
- `components/PlanMap.tsx` 확장
- polyline 렌더 + 색상 (day별)
- 마커 사이 path 시각화

### 6.3 비용 통제
- 무료 한도 안 넘기 위한 throttle
- 만약 Directions API 실패하면 fallback (직선 polyline)
- 캐시는 plan record에 영구 저장 — 재호출 안 함

### 6.4 결정 필요
- [ ] Mapbox 비용 budget — 무료 한도 안 넘기는 선까지만 vs paid tier 사용
  → **권장: 무료 한도 안에서 가능한 만큼.** 1000 plans/month까지는 free.
- [ ] DB schema 변경 가능 한지 (현재 supabase migration 0001-0003 있음)
  → 신규 migration 0004 필요

---

## 7. 성장 레이어 (Phase 5+, 4주차 이후)

3개 Q는 funnel을 풀지만 **새 유입 채널**도 필요. 4주차부터 병행:

### 7.1 SEO 블로그 시드 (founder 작업)

**Why:** "{도시} {일수}일 일정" long-tail 검색 트래픽이 가장 큰 organic 소스. 13개 sample을 SEO entry point로 활용.

**계획:**
- 6-12개 블로그 포스트 작성 (founder 직접, 한 달 동안)
- 각 도시 sample을 풀어서 hand-written intro + sample 링크
- 키워드 examples:
  - "도쿄 4일 일정 추천 AI"
  - "Reykjavik 4-day couple itinerary"
  - "Cusco Machu Picchu 5-day guide"
- `app/blog/data.ts`에 추가

**우선순위:** Tokyo > Paris > Bali > Reykjavik > Cusco > Dubai (검색량 순)

### 7.2 OG 이미지 자동 생성 (4주차)

**Why:** 사용자가 plan을 share할 때 멋진 preview가 떠야 viral.

**구현:**
- 현재 `app/opengraph-image.tsx` 있음 (홈만)
- `app/plan/[id]/opengraph-image.tsx` 추가 — 동적 plan별 OG
- 카드 디자인: 도시 이름 + Day 1 theme + 작은 map preview + gliddy logo

**파일:** `app/plan/[id]/opengraph-image.tsx` (NEW), `app/samples/[slug]/opengraph-image.tsx` (NEW)

### 7.3 Public plan URLs (선택, 5주차+)

**Why:** 친구한테 plan 공유할 때 가입/구매 유도.

**구현:**
- 현재 plan은 secret UUID로 보호됨
- Opt-in으로 "공개 플랜 URL 만들기" 옵션 추가
- 공개 URL은 `/p/{slug}` 형태 — read-only
- 이 URL이 SEO에 노출되면 추가 organic traffic

**위험:** 사용자 plan이 너무 많이 공개되면 unique value 희석. 공개 옵션이 default off여야 함.

### 7.4 커뮤니티 시드 (LS 승인 후)

- r/travel, r/solotravel, r/JapanTravel 등에 sample share
- "I made an AI trip planner — here's a free Tokyo plan" 형태
- Korean: 네이버 블로그, 디시 여행갤 (스팸 주의, 진짜 가치 제공)
- 일본/중국/프랑스 커뮤니티 — locale별로

**한계:** 직접 마케팅은 founder의 시간 자원. 자동화 어려움.

---

## 8. 측정 계획 — PostHog 대시보드

### 8.1 Dashboard 1: 메인 깔때기 (locale별)
```
page_view (home)        → wizard_started        → checkout_started        → checkout_completed
   100%                      40% (target)            70% (after Q1 fix)        85% (target)
                              ↑ Q3 영향              ↑ Q1 영향                   ↑ Q2 영향
```

### 8.2 Dashboard 2: 위자드 step drop-off
**precondition:** `wizard_step_completed` 이벤트 추가 (step_id property 포함)
- 각 step (destination / travelerType / ... / email) drop-off 비율
- Q1 가지치기 결정의 근거 데이터

### 8.3 Dashboard 3: post-purchase 행동
- `checkout_completed` → `referral_shared` 비율
- 30초/2분/24시간 windows
- 의미: plan view 첫인상이 share-worthy한지 = Q2 영향 측정

### 8.4 Dashboard 4: locale-by-locale
- 같은 메인 깔때기를 한국어/일본어/영어/중국어/프랑스어로 분할
- 어떤 언어 사용자 전환률이 가장 좋은지
- 가장 약한 locale 식별 → 추가 i18n 폴리시 우선순위 결정

### 8.5 KPI 4개 (최종)
1. **Home → Wizard CTR** — Q3 효과 (target +10%p in 2주)
2. **Wizard completion rate** — Q1 효과 (target +20%p)
3. **Post-purchase share rate** — Q2 효과 (target ≥ 30% within 24h)
4. **Locale-tagged conversion** — 영어 vs 한국어 갭 측정

---

## 9. 4주차 타임라인

### Week 1 (2026-04-30 ~ 05-06)
- D1-D2 (수-목): **Q3 thesis section** 빌드 + 디자인 review + ship
- D3-D4 (금-토): **Sit-and-watch 5명** + 노트
- D5 (일): **PostHog 켜고** (founder 액션) + dashboard 초기 구성
- 병행: founder가 1차 블로그 포스트 작성 (Tokyo)

### Week 2 (05-07 ~ 05-13)
- D1-D3: **Q2a-d** (totals + icons + buffer + hotel anchor)
- D4-D5: **Q2e** (mini-Gantt strip)
- D6: 1주차 PostHog 데이터 검토
- 병행: founder가 2차 블로그 포스트 (Paris)

### Week 3 (05-14 ~ 05-20)
- D1: PostHog 데이터 + sit-and-watch 노트로 **Q1 cut 결정**
- D2-D4: **Q1 가지치기 구현** + generator prompt 조정
- D5: **A/B 그룹 셋업** (cut 그룹 vs 컨트롤)
- 병행: 3차 블로그 포스트 (Bali)

### Week 4 (05-21 ~ 05-27)
- D1: **Mapbox 비용 분석** + 결정
- D2-D4: **Q2f polylines** 구현 (gated)
- D5: **OG 이미지 자동 생성** (plan별)
- 병행: 4-5차 블로그 포스트 (Reykjavik, Cusco)

### Week 5+ (05-28~)
- 데이터 검토 → 다음 우선순위 결정
- LS 승인 시점에 따라 커뮤니티 시드 시작
- Public plan URL 옵션 검토

---

## 10. 위험 + 완화

| 위험 | 영향 | 완화 |
|---|---|---|
| Q3 카피가 "defensive"하게 읽혀 conversion ↓ | M | claim-first 톤 + 디자이너 review |
| Q1 cut으로 plan 품질 1-3% 저하 | M | A/B 1-2주 측정 후 결정 |
| Mapbox 비용 폭주 | L-M | 무료 한도 내 + 영구 캐시 + fallback 직선 |
| LS 승인 지연으로 실 결제 데이터 0개 | H | sample plan을 internal "purchase" 시뮬레이션 |
| 5개 cut 한 번에 적용 후 generator regression | M | feature flag로 cut 단계적 활성화 |
| 4주 동안 한국어 사용자 없음 | M | 직접 5명 한국 친구한테 부탁해서 sit-and-watch |
| founder 시간 부족 (블로그 + 공유) | H | 우선순위 1: 블로그 6개. 그 외 패스 |

---

## 11. founder 결정 필요 사항 (sign-off)

이 계획 시작 전 답해줄 항목:

### 즉시 필요 (Phase 1 시작 전):
- [ ] **Q3 카피 톤**: claim-first vs comparison-first 중 어느 거?
  → 추천: claim-first
- [ ] **Q3 위치**: Tokyo preview 위 vs 아래 vs sample gallery 위
  → 추천: preview 위 (sample 갤러리와 preview 사이)
- [ ] **3 필러 카피 한국어 1차안 검토** — 직역 OK인지 의역 필요한지

### 1주차 안 필요:
- [ ] PostHog 켜기 (founder 액션, 2분)
- [ ] sit-and-watch 5명 — 본인이 직접 / 친구 / 가족 등 5명 선택해서 옆에서 보기
- [ ] PostHog `wizard_step_completed` 이벤트 추가 OK한지

### 2주차 안 필요:
- [ ] Mini-Gantt sticky 처리 OK인지
- [ ] Day별 색상 결정 (vermilion + ink + gray vs 더 다양)

### 3주차 안 필요:
- [ ] Q1 5개 cut 모두 한 번에 vs 단계적
  → 추천: 한 번에
- [ ] generator A/B 시작 OK인지

### 4주차 안 필요:
- [ ] Mapbox 무료 한도 / paid tier 결정
- [ ] Public plan URL 옵션 — 도입 vs 보류

### 성장 레이어:
- [ ] 6-12 블로그 포스트 작성 시간 확보 (founder 약 4주)
- [ ] OG 이미지 자동 생성 OK인지
- [ ] 커뮤니티 시드 시점 — LS 승인 후 즉시 vs 데이터 검증 후

---

## 12. 다음 액션 (sign-off 후 즉시)

본 doc 검토 후 "go" 사인 주면:

1. Q3 카피 5-locale 1차안 작성 → review 받음
2. Q3 component 빌드 + ship (3시간)
3. founder가 PostHog 켜는 동안, sit-and-watch 5명 일정 수배
4. Q2a-e 시작

**plan 자체에 동의 안 하는 부분 있으면 명시적으로 알려줘.** 그 부분만 재논의.
다 OK면 "go"라고만 답해줘 → Phase 1부터 시작.

---

## 부록: 본 plan과 office-hours doc의 관계

본 doc은 `docs/OFFICE-HOURS-2026-04-29.md` 에서:
- 진단 (3개 Q에 대한 솔직한 평가) → 본 doc의 thesis 근거
- Approach B 추천 → 본 doc의 implementation 가이드
- The Assignment (5명 sit-and-watch) → 본 doc의 Week 1 D3-D4
- Premises 5개 → 본 doc의 risk 평가 토대

두 doc 함께 봐야 full context. office-hours는 "왜 이걸 해야 하는지", 본 doc은 "어떻게 할지".
