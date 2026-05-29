# gliddy — 프로젝트 개요 및 현재 진행 상황

문서 작성일: 2026-05-27
오너: Carshu (solo founder, 첫 사이드 프로젝트)
용도: Slack 워크스페이스 / AI 도구 / 협업자에게 컨텍스트 공유

---

## 한 줄 정의

**개인화된 AI 여행 일정을 $4에 만들어주는 글로벌 서비스.** 호텔 + 공항 동선 + 일별 일정 + 식당 + 루트 맵 + PDF, 이메일과 시크릿 링크로 배송. 가입 불필요.

---

## 무엇을 만드는가

### 핵심 가치 제안
일반 "도쿄 4일 일정"은 모두에게 같은 답 → 아무에게도 안 맞음. AI는 개인화된 일정을 경제적으로 생산 가능. 사용자는 3가지 질문(어디/얼마나/누구와)에 답하면 ~10분 후 본인 맞춤 일정 받음.

### 사용자 플로우
1. 홈 또는 `/plan/new` → 3단계 위저드 (도시, 기간, 동행자 타입)
2. 결제 ($4 via LemonSqueezy)
3. ~10분 노동 환상 로딩 화면 + 트리비아
4. Claude Sonnet 4.5가 일정 생성
5. 이메일 + 시크릿 URL + PDF 발송
6. 받은 페이지에는 호텔, 일별 일정, 루트 맵, 어필리에이트 (호텔/항공/eSIM) 포함

### 다국어 지원
- 5개 언어 풀 지원: 영어 / 한국어 / 일본어 / 중국어 / 프랑스어
- 13개 샘플 모두 5개 언어로 번역됨
- URL은 `/`, `/ko`, `/ja`, `/zh`, `/fr` 구조
- hreflang으로 구글 멀티로컬 인덱스

---

## 비즈니스 모델

| 수익원 | 상태 | 비중 (예상) |
|---|---|---|
| **$4 트립 플랜** (LemonSqueezy) | LIVE | 메인 |
| **호텔 어필리에이트** (Agoda cid:1956855) | 활성 | 부수입 |
| **항공 어필리에이트** (Aviasales marker 491612) | 활성 | 부수입 |
| **eSIM 어필리에이트** (Airalo) | 활성 | 부수입 |
| **레퍼럴** (`/r/{code}`, 25% 할인) | LIVE | 바이럴 자극 |
| **프로모** (`?promo=CODE`, 100% 할인) | LIVE | 마케팅 도구 |
| Viator, NordVPN, Insubuy, Rail Europe | 링크만, ID 없음 | 미수익화 |
| AdSense | 컴포넌트 준비, 승인 대기 | 미수익화 |
| 뉴스레터 | 컴포넌트 준비, API 미연결 | 미수익화 |

---

## 기술 스택

- **프론트엔드:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 3
- **언어:** Bricolage Grotesque (display) + Inter (body) + Fraunces (serif 강조)
- **AI:** Anthropic Claude Sonnet 4.5 (`lib/generator/claude.ts`)
- **결제:** LemonSqueezy (Merchant of Record, 부가세 처리 자동)
- **DB:** Supabase (Postgres + Auth)
- **이메일:** Resend + 도메인 검증
- **지도:** Mapbox
- **PDF:** react-pdf
- **호스팅:** Vercel Pro (`maxDuration=300` 필요 — 웹훅 + 생성 라우트)
- **분석:** GA4 (G-3LF8H03QZG) + GTM + PostHog (locale 슈퍼-프로퍼티)
- **인증:** Supabase 매직링크만 (패스워드 없음)

코드 디렉토리는 `CLAUDE.md` 참조.

---

## 현재 상태 (2026-05-27 기준)

### ✅ 라이브 + 작동
- 사이트 라이브: https://checkvisamap.com
- 도메인은 `checkvisamap.com` (옛 비자 사이트 도메인 그대로 사용 중 — 피봇 잔재)
- LemonSqueezy 승인됨, 결제 플로우 작동
- 5개 언어, 13개 샘플 모두 라이브
- SEO 인프라 완비 (JSON-LD, hreflang, sitemap, Product schema)

### 📊 트래픽 / 매출
- **방문자: 일주일째 0명** (홍보를 안 함)
- **매출: 0** (당연한 결과)
- 즉, **제품은 준비됨, 마케팅 시작 직전 단계**

### 🛠️ 코드 베이스
```
████████████████████ 100% (코드 + 디자인 + 콘텐츠)
████████████████████ 100% (런치 인프라)
█░░░░░░░░░░░░░░░░░░░  ~5% (마케팅 / 트래픽 확보)
```

---

## 최근 한 달 진행 사항 (2026-04-29 → 2026-05-27)

### 4월 말 ~ 5월 초: SEO 인프라 대규모 구축
- 멀티로컬 URL 라우팅 + hreflang 인프라 (`3f0ebbe`)
- 샘플에 Article + TouristTrip + ItemList JSON-LD (`0a733d3`)
- 커뮤니티 갤러리용 sitemap 사전 배선 (`137c371`)
- 미들웨어 locale 동일 요청 활성화 수정 (`a4b8f8e`)
- Pricing Product schema 강화: image + return + shipping + brand (`09227c7`)

### 5월 중순 ~ 후반: 마케팅 자료 준비
- 비어있던 블로그에 **SEO 시드 포스트 5편** 작성:
  - `tokyo-itinerary-how-many-days`
  - `bangkok-solo-travel-guide`
  - `paris-with-kids-3-day-itinerary`
  - `seoul-food-guide-3-days`
  - `ai-trip-planners-vs-generic-itineraries`
- 블로그 [slug] 페이지에 `heroImage` 옵셔널 필드 + OG 이미지 연결
- **런치 플레이북** 작성 (`docs/marketing/LAUNCH-PLAYBOOK.md`): Pinterest / Reddit / Show HN / Product Hunt / X / Quora / Naver/Tistory / 한국 시장 채널별 카피
- **Reddit 1-2주차 카르마 빌드 가이드** 작성 (`docs/marketing/REDDIT-WEEK-1-KARMA-BUILD.md`)

### Reddit 첫 시도 결과 (2026-05-26)
- r/koreatravel에 답변 5개 게시
- 결과: 다수 [deleted] / 섀도밴 / 모더 필터 적중
- **원인:** AI 템플릿 패턴 동일 + 1시간에 5개 + 저카르마 계정 = Reddit 스팸 감지 트리거
- **계정 상태:** 사이트 전체 섀도밴 아님 (r/AskReddit 테스트 통과), r/koreatravel만 30일간 사용 금지
- **다음 시도 전 규칙 변경:** 하루 1개, 비여행 서브 우선, 사전 톤 리뷰 필수

---

## 현재 가장 중요한 과제

### 🎯 메인 미션: 첫 100명 방문자 확보

지금 단계의 모든 작업은 이 한 가지로 수렴해야 함.

### 진행 중인 채널별 상태

| 채널 | 상태 | 다음 액션 | 예상 ROI |
|---|---|---|---|
| **Reddit** | 1차 시도 실패, 학습 중 | 비여행 서브 카르마 빌드 (하루 1개), 사전 톤 리뷰 | 중-고 (3-4주 후) |
| **Naver/Tistory** | 미시작 | 한국어 SEO 포스트 3편 작성 (도쿄/방콕/서울) | **최고** (1-2주) |
| **Pinterest** | 미시작 | Business 계정 + 핀 16개/도시 × 13개 | 고 (영구 자산) |
| **Show HN** | 미시작 | 카피는 작성됨, 게시일 미정 | 폭발적 일회성 |
| **Product Hunt** | 미시작 | 카피는 작성됨, 런치일 미정 | 폭발적 일회성 |
| **YouTube Shorts (한국)** | 미시작 | "AI가 도쿄 4일 짜줬다" 류 영상 | 중-고 |

### 권장 우선순위 (재조정)

1. **Naver 블로그 3편** — 카슈 네이티브 + 경쟁 거의 0 + 즉시 트래픽 가능
2. **Pinterest 시작** — 평생 자산, 밴 위험 0
3. **Reddit 슬로우 빌드** — 백그라운드로 하루 1개 댓글
4. **Show HN / Product Hunt** — 위 채널들이 살아 돌아가기 시작하면 (proof of life), 그때 일회성 burst 채널로 사용

---

## 대기 중 / 미결정 사항

### 도메인 변경?
- 현재 `checkvisamap.com` — 비자 사이트로 인식돼서 트립 플래너 SEO에 핸디캡
- 지금 SEO 자산이 거의 없으니 변경 적기
- 하지만 비용/리스크 있음
- **결정 보류 중**

### `/visa/*` 레거시 URL 처리
- 현재: 301 redirect → `/` (next.config.ts)
- 옵션: 410 Gone으로 변경하면 구글이 더 빨리 색인에서 제거
- **결정 보류 중** (현재 301로 두는 게 무난)

### 리뷰 스키마 추가
- GSC 2026-05-13에 `/pricing`에 review + aggregateRating 요청
- 실제 리뷰 5개 이상 모이면 추가 예정
- **차단:** 가짜 리뷰는 구글 밴 사유 → 진짜 리뷰 모일 때까지 대기

### 커뮤니티 갤러리 (Pinterest 패턴 공유)
- Phase 0 (opt-in 토글) 완료
- Phase 1+ (`/community` 라우트, 공개 갤러리) 미시작
- 계획: `docs/COMMUNITY-SHARING-PLAN.md`
- **차단:** 사용자가 있어야 갤러리 의미 있음 → 트래픽 100명 이상 모이면 진행

### 결제 후 계정 가입 데이터
- 매직링크만 운영 중 (패스워드 없음)
- 가입률 데이터 모이면 N4 (패스워드) 추가 검토
- **차단:** 트래픽 0이라 데이터 없음

---

## 핵심 링크 / 자산

| 항목 | 값 |
|---|---|
| 라이브 사이트 | https://checkvisamap.com |
| 사이트 이메일 | hello@checkvisamap.com |
| 창업자 이메일 | thoopring@gmail.com |
| 등록 이메일 | carshello@naver.com |
| LinkedIn | https://www.linkedin.com/in/민수-김-670a70258/ |
| GitHub | https://github.com/thoopring |
| GitHub 리포 | https://github.com/thoopring/passport-project |
| 데모 영상 (긴 버전) | https://youtu.be/a_XRvGR9leA |
| 데모 영상 (짧은 버전) | https://youtu.be/b2bQ4fBMmAs |
| GA4 | G-3LF8H03QZG |
| GTM | GTM-TPRWDJ9X |

### 주요 문서
- `CLAUDE.md` — 프로젝트 아키텍처 + 컨벤션 (코드 작업 시작 시 필독)
- `DESIGN.md` — 디자인 시스템 (UI 작업 시작 시 필독)
- `STATUS.md` — 2026-04-29 시점 런치 준비 스냅샷 (한 달 전 기준, 일부 stale)
- `docs/LAUNCH_CHECKLIST.md` — 배포 운영 체크리스트
- `docs/LS_APPROVAL.md` — LemonSqueezy 승인 플로우 컨텍스트
- `docs/COMMUNITY-SHARING-PLAN.md` — 공개 갤러리 계획
- `docs/marketing/LAUNCH-PLAYBOOK.md` — 채널별 마케팅 카피
- `docs/marketing/REDDIT-WEEK-1-KARMA-BUILD.md` — Reddit 카르마 빌드 가이드
- `docs/SLACK-MCP-MIGRATION.md` — Slack 워크스페이스 + MCP 이관 작업 계획

---

## 다음 마일스톤

### 단기 (이번 주)
- [ ] Slack 워크스페이스 + MCP 이관 작업 완료 (`docs/SLACK-MCP-MIGRATION.md` Phase 1-6)
- [ ] Naver 블로그 첫 포스트 1편 작성 + 게시
- [ ] Reddit 비여행 서브에 하루 1개 댓글 (카르마 10+ 목표)

### 중기 (다음 2주)
- [ ] Naver 블로그 3편 모두 게시
- [ ] Pinterest Business 계정 + 첫 핀 32개 (2도시 분량)
- [ ] Reddit 카르마 50+ + 새 여행 서브 1개 진입
- [ ] **첫 유료 구매자 1명 확보**

### 장기 (다음 1-2개월)
- [ ] Show HN 게시 (트래픽 살아있을 때)
- [ ] Product Hunt 런치 (Show HN 후 2-4주)
- [ ] YouTube Shorts 한국어 콘텐츠 5편
- [ ] 월 매출 $200 도달 (~50 플랜)
- [ ] 실제 리뷰 5개 모임 → `/pricing` 리뷰 스키마 추가
- [ ] 도메인 변경 결정

### 멀리 (3개월+)
- [ ] 월 매출 $1,000 도달
- [ ] 커뮤니티 갤러리 Phase 1 출시
- [ ] 사하라 이남 아프리카 / 오세아니아 샘플 추가
- [ ] Kakao 소셜 로그인 (한국 트래픽이 메인이라면)

---

## 한 줄 요약

**제품은 완성됐고 마케팅 0단계. 다음 마일스톤은 첫 100명 방문자 + 첫 유료 구매자.** Naver / Pinterest / Reddit 슬로우 빌드를 병행하는 것이 가장 안전한 경로.
