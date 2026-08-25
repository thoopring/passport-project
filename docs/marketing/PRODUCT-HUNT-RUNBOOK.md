# Product Hunt 런북 — gliddy (2026-07-22 작성)

> LAUNCH-PLAYBOOK.md §4의 실행판. Show HN(7/28~30 예정) **다음 주에 런칭**해
> HN에서 얻은 질문/반응으로 카피를 다듬어 들어간다.
> PH도 계정 로그인 게시라 **CEO가 직접 제출**. 자동화 금지.

---

## 0. Product Hunt가 뭐냐

신제품 전문 커뮤니티 (producthunt.com). 매일 자정(태평양)마다 그날 런칭한 제품들이
투표로 순위 경쟁. 방문자는 얼리어답터·메이커·기자·VC. 런칭일 스파이크 500~2,000 방문
+ **영구 제품 페이지**(백링크·롱테일 유입)가 남는다. 상위 5위면 뉴스레터에 실려 2차 스파이크.

## 1. 일정

- **런칭일: 화·수·목 중 하루. 12:01am PT 예약 = 한국시간 당일 오후 4시 시작.**
  (원래 8/4~6 창은 결제검증 지연으로 지나감 — 2026-08-25 기준 재설정 필요.
  Show HN 게시 후 그 주 다음 화/수/목로 잡는다.)
  PH의 하루는 PT 자정~자정 = **한국 오후 4시~다음날 오후 4시**. 한국 낮에 대응 가능한
  구간이 길어 1인 운영에 유리하다.
- Show HN 결과를 보고 최종일 확정. HN이 잘 되면 그 스레드 링크를 PH 첫 댓글에 넣는다
  ("discussed on HN last week" — 사회적 증거).

## 2. 계정 준비 (오늘~이번 주, HN 숙성과 병행)

1. producthunt.com 가입 — **Twitter/X 또는 Google 계정 연동** (LinkedIn도 가능).
   프로필: 실명/사진/한 줄 소개("Solo founder building gliddy") + 링크(GitHub·사이트).
2. Maker로 등록될 계정이니 런칭 전 1주간 가볍게 활동: 관심 제품 업보트·댓글 몇 개
   (계정이 백지면 신뢰 감점). Travel·AI·SaaS 토픽 팔로우.
3. 셀프 헌팅이 표준이다 — 유명 헌터 섭외 불필요.

## 3. 제출 정보 (복사용)

**Name**: `gliddy`
**Tagline** (60자 이하):
```
Personalized AI trip plans for $4 — itinerary + map + PDF
```
**Links**: https://checkvisamap.com
**Topics**: Travel · Artificial Intelligence · SaaS
**Pricing**: Paid ($4 one-time, no subscription)

**Description** (260자 이하):
```
Tell us where you're going. We generate a day-by-day plan with a hotel
pick matched to your airport, restaurants by meal, transit, and a route
map. Delivered as a web page + email + PDF in 5-10 minutes. No
subscription, no account. $4 per trip. 5 languages.
```

## 4. 갤러리 자산 (제출 전 필수)

- **썸네일/로고**: 240×240 — ✅ 생성완료 `brium/marketing/assets/ph_gallery/ph_thumbnail_240.png` (public/icon.png 512→240 리사이즈)
- **갤러리 이미지 3~5장, 1270×760**: ✅ 4장 준비완료 `brium/marketing/assets/ph_gallery/` (ph_01~04, 2540×1520 = 규격의 2배·비율 동일, PH가 그대로 수용)
  1. 홈 히어로(EN) — 첫 인상
  2. 샘플 플랜 상세 — 데이별 일정 + 지도 (제품의 실체)
  3. 3질문 위저드 — "이게 전부"라는 단순함
  4. 샘플 갤러리 13도시 — 품질 바 증명
- **데모 영상 (갤러리 첫 슬롯 추천)**: 기존 자산 재사용 —
  - 짧은 버전: https://youtu.be/b2bQ4fBMmAs
  - 긴 버전: https://youtu.be/a_XRvGR9leA

## 5. 첫 댓글 (런칭 직후 즉시)

```
Hi Product Hunt 👋

Solo founder here. I built gliddy because I spent 8 hours planning my
last trip in a spreadsheet, and the AI tools I tried gave me generic
checklists that ignored which airport I was flying into or who I was
traveling with.

What's different:
- Personalized to your airport, dates, and traveler type
- Day-by-day with realistic transit times (not just "go to Shibuya")
- Restaurant picks by meal, with addresses
- A real route map + a PDF you can use offline on the ground
- 5 languages (en/ko/ja/zh/fr)

Pricing: $4 per trip. No subscription, no account.

Free public samples (no signup): https://checkvisamap.com/samples

Ask me anything — pricing logic, LLM quality control, or why travel
planning is still broken in 2026. I'll be here all day.
```

## 6. 런칭 데이 운영 (한국 오후 4시~)

- 첫 4시간이 순위를 결정 — 모든 댓글에 답변. HN과 달리 이모지/친근한 톤 OK.
- **투표 부탁 금지** — PH는 부정 투표 감지 시 순위 강등/밴. 지인 몇 명에게 "런칭했다"
  알림은 OK, "upvote 눌러줘"는 NO. 커뮤니티 링크 공유는 자연스러운 문구로.
- 런칭 공지 채널: LinkedIn(창업자 계정), X, (Show HN 스레드가 살아있으면 댓글로 소식).
- 정오 PT(한국 새벽 4시)쯤 "thanks for the support" 업데이트 댓글 1개.

## 7. 런칭 후

- 제품 페이지에 리뷰 요청: 실구매자 이메일 후속(수동)으로 PH 리뷰 2~3개 확보.
- "Featured on Product Hunt" 배지를 사이트 푸터/About에 추가 (백링크 상호 강화).
- 결과 데이터(방문/전환)는 GA4 referrer=producthunt.com 기준으로 다음 세션 분석.
- 순위 무관 1회성이 아니라 영구 페이지가 남는 것이 본전 — 실패 개념 없음.
