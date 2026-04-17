# 피벗 진행 상황 (Pivot Status)

> 이 문서는 작업 중 터미널이 끊기거나 새 세션을 시작할 때 어디까지 했는지
> 빠르게 파악하기 위한 라이브 스냅샷입니다.
>
> **마지막 업데이트:** 2026-04-17
> **현재 HEAD:** `pivot(P14c): detail pages shell polish` (직전 커밋)
> **워킹 트리:** clean

---

## ✅ 코드 작업 — P0~P14까지 완료

### 1차 피벗 (P0~P13) — 트립 플래너 런칭

14개 페이즈 shipped. 각 페이즈 커밋은 git log 참조.

### 2차 피벗 (P14) — 비자 사이트 완전 정리 + 디자인 리뉴얼

`samples/tokyo-4d-couple` 페이지의 구조감은 유지하되, 나머지는 편집디자인
톤으로 완전 리뉴얼. 사용자 피드백("심플/객관적/정확/신뢰도")을 반영.

| 서브페이즈 | 내용 | 커밋 |
|---|---|---|
| P14a | 디자인 시스템(크림/네이비/골드 + Fraunces 세리프), 다크모드 제거, 홈 3섹션 재작성, Header/Footer 공용화, about/privacy/disclaimer 톤 재작성 | `9fda809` |
| P14b | **비자 완전 삭제 (C-hard)**: `/visa/[slug]` 1500+ 라우트, `visa_data*.json` 24K 줄, 비자 블로그 포스트 전체, 미사용 deps(`react-simple-maps`, `d3-scale`, `tooltip`) | `c1ff1ac` |
| P14c | 상세 페이지 shell polish: `PlanView`에 Header/Footer 내장, 뱃지/컬러칩 톤다운, `/samples` 갤러리·`/blog`·`/plan/new` Shell 통일 | (이번 커밋) |

### 빌드 상태

- 빌드 클린: **22 라우트** (이전 1594). 전부 피벗 정리 결과.
- 린트: 0 에러 (피벗 이전 레거시 에러 4개는 P14a~c 과정에서 해당 파일이
  재작성되거나 삭제되면서 자연 해소).

---

## ⏳ 다음 단계 — 사용자(MinSu) 차례

코드는 끝났습니다. 런치 체크리스트 `docs/LAUNCH_CHECKLIST.md` Phase A~G를
계속 진행.

### 진행 중

이미 완료:
- [x] Anthropic API 키
- [x] Supabase 프로젝트 + 마이그레이션 3개 (0003 IMMUTABLE 버그 수정 커밋 `b3decf0`)
- [x] `.env.local` 생성 + 일부 값 채움
- [x] LemonSqueezy 스토어 + $4 상품 + API key (webhook은 Vercel URL 필요로 보류)
- [x] 초기 Vercel 배포 (P14 이전 상태)

다음 할 것:
- [ ] Mapbox 토큰 생성 + URL 제한 설정 + env 반영
- [ ] Resend 도메인 DNS (DKIM/SPF) 설정 후 검증
- [ ] Vercel Pro 업그레이드
- [ ] LemonSqueezy 웹훅 생성 (URL: `https://checkvisamap.com/api/webhooks/lemon-squeezy`)
  → secret을 `.env.local` + Vercel env 반영 후 Redeploy
- [ ] `docs/LAUNCH_CHECKLIST.md` Phase B~F 스모크 테스트

---

## 📂 핵심 파일 위치 (P14 반영)

**문서:**
- `PIVOT_PLAN.md` — 피벗 마스터 플랜 (P0~P13)
- `docs/SETUP.md` — 서비스 프로비저닝 가이드
- `docs/LAUNCH_CHECKLIST.md` — A~G 런치 체크리스트
- `STATUS.md` — 이 파일

**디자인 시스템:**
- `tailwind.config.ts` — 네이비/크림/골드 팔레트, Fraunces + Inter
- `app/globals.css` — 크림 토큰, 다크모드 없음
- `app/layout.tsx` — `next/font/google`로 두 폰트 로드

**공용 Shell:**
- `components/Header.tsx` `components/Footer.tsx`

**주요 페이지:**
- `app/page.tsx` — 3섹션(hero · 3 sample cards · footer)
- `app/samples/page.tsx` — 4 sample 갤러리
- `app/samples/[slug]/page.tsx` — 샘플 상세 (PlanView)
- `app/plan/new/page.tsx` — 위저드 진입
- `app/plan/loading/page.tsx` — 노동 착각 로딩
- `app/plan/[id]/page.tsx` — 유료 플랜 상세
- `app/blog/page.tsx` — Journal (현재 empty state)

**제거된 것 (P14b):**
- `app/visa/[slug]/page.tsx`
- `visa_data.json`, `visa_data_usa.json`
- `components/WorldMap.tsx`, `PassportComparison.tsx`, `DestinationRoulette.tsx`, `TravelFortune.tsx`, `AffiliateSection.tsx`, `ScrollReveal.tsx`, `AdBanner.tsx`, `NewsletterSignup.tsx`

---

## 🔁 만약 터미널이 끊겼다면

다음 세션 시작 시 Claude에게:

```
STATUS.md 읽고 어디까지 했는지 확인해줘.
```

Claude는 자동으로:
1. 이 파일을 읽고
2. `git log --oneline -16`
3. `git status --short`
4. 메모리에서 `project_pivot_status.md` 로드
5. 현재 위치 보고 후 다음 단계 제안

---

## 🛠 빠른 명령어

```bash
npm run dev          # http://localhost:3000
npm run build        # ~8초, 22 라우트
git log --oneline -16
git status --short
```

---

## 📊 진행률

```
████████████████████ 100% (14/14 페이즈 P0~P13 + P14 리뉴얼 3 커밋)
██░░░░░░░░░░░░░░░░░░  ~15% (런치 — Anthropic/Supabase/LS 완료, Mapbox/Resend/Vercel Pro 대기)
```

**다음 액션:** Mapbox 토큰 발급. 가이드는 이전 세션에서 이미 제공됨.
