# 피벗 진행 상황 (Pivot Status)

> 이 문서는 작업 중 터미널이 끊기거나 새 세션을 시작할 때 어디까지 했는지
> 빠르게 파악하기 위한 라이브 스냅샷입니다.
>
> **마지막 업데이트:** 2026-04-11
> **현재 HEAD:** `d146cb5 pivot(P13): static QA + launch checklist`
> **워킹 트리:** clean (커밋되지 않은 변경사항 없음)

---

## ✅ 코드 작업 — 전부 완료

14개 페이즈 모두 ship 완료. 빌드 클린 (1594 라우트, 0 에러). 린트는 피벗 코드
0 에러 (4개 잔여 에러는 모두 피벗 이전 레거시 코드).

| 페이즈 | 내용 | 커밋 |
|---|---|---|
| P0 | 트립 플래너 스캐폴드 + $3→$4 가격 조정 | `53d32bf` |
| P1 | 샘플 갤러리 + PlanView 추출 | `910bf78` |
| P2+P3 | 점진적 공개 위저드 + 노동 착각 로딩 | `6beee1d` |
| P4 | next-intl i18n (en/ko/ja/zh, 쿠키 기반) | `2f6491d` |
| P5 | Geo-IP 언어 제안 배너 | `611617a` |
| P6 | 경로 최적화 second pass | `c7c1be9` |
| P7 | 자연스러운 어필리에이트 통합 | `35dd40e` |
| P8 | PDF "Did you know?" 콜아웃 | `abe180b` |
| P9 | 추천인 프로그램 | `733c386` |
| P10 | 프로모 코드 (URL 파라미터) | `a04d75a` |
| P11 | 비자 사이트 퍼널 재배선 | `aa8c27e` |
| P12 | docs/SETUP.md API 가이드 | `2416ef9` |
| P13 | 정적 QA + LAUNCH_CHECKLIST.md | `d146cb5` |

---

## ⏳ 다음 단계 — 사용자(MinSu) 차례

코드는 끝났습니다. 이제 실제 운영 환경에 배포하려면 다음을 수동으로 처리해야 합니다.

### 즉시 시작 가능
1. **`docs/SETUP.md`** 따라가며 계정 프로비저닝
   - Anthropic API 키 ($20 크레딧)
   - Supabase 프로젝트 + 마이그레이션 0001/0002/0003 SQL 실행
   - LemonSqueezy 스토어 + $4 상품 + 웹훅
   - Resend 도메인 인증 (DKIM/SPF)
   - Mapbox 토큰 (URL 제한)
   - **Vercel Pro** (필수 — 웹훅 maxDuration=300 때문)

2. **`docs/LAUNCH_CHECKLIST.md`** Phase A → G 순서대로 진행
   - Phase A: 계정 프로비저닝 (1시간)
   - Phase B: LemonSqueezy Test Mode 스모크 테스트 (30분)
   - Phase C: i18n + Geo 테스트 (15분)
   - Phase D: 추천인 + 프로모 테스트 (15분)
   - Phase E: Lighthouse 검증 (10분)
   - Phase F: Live Mode 전환 + 사이트맵 제출 (10분)
   - Phase G: 어필리에이트 ID 정리 (사후, 30분)

### 알려진 잔여 작업 (블로커 아님)
- 어필리에이트 ID 자리표시자: Klook, Viator, Insubuy 가입 필요
- 레거시 린트 에러 4개 (피벗 이전 코드 — `app/page.tsx`, `app/visa/[slug]/page.tsx`, `components/TravelFortune.tsx`)
- 홈페이지 (`/`) 미번역 — 거대한 클라이언트 컴포넌트, v1.1로 미룸
- 샘플 플랜 콘텐츠는 영어만 (chrome만 번역됨)
- PDF 라벨 영어 (Claude 생성 콘텐츠는 사용자 로케일로 출력)

---

## 🔁 만약 터미널이 끊겼다면

다음 세션 시작 시 Claude에게:

```
STATUS.md 읽고 어디까지 했는지 확인해줘.
```

Claude는 자동으로:
1. 이 파일을 읽고
2. `git log --oneline -16`으로 커밋 히스토리 확인
3. `git status`로 미커밋 변경사항 확인
4. 메모리에서 `project_pivot_status.md` 로드
5. 현재 위치 보고 후 다음 단계 제안

---

## 📂 핵심 파일 위치

**문서:**
- `PIVOT_PLAN.md` — 전체 피벗 마스터 플랜 (페이즈별 상세, 편차 기록)
- `docs/SETUP.md` — 12개 서비스 프로비저닝 가이드 + env 변수 체크리스트
- `docs/LAUNCH_CHECKLIST.md` — A~G 6단계 런치 체크리스트
- `STATUS.md` — 이 파일 (라이브 진행 상황)

**핵심 코드 (피벗 신규):**
- `app/plan/new/PlanWizardStep1.tsx` — 3질문 진입 위저드
- `app/plan/loading/page.tsx` — 노동 착각 로딩 + 팝업 오케스트레이터
- `components/QuestionPopup.tsx` — 단일 질문 모달
- `components/LaborIllusionLog.tsx` — 가짜 진행 로그
- `components/TravelTrivia.tsx` — 회전 상식 카드
- `components/PlanView.tsx` — 공유 플랜 렌더러 (실 플랜 + 샘플)
- `components/PlanAffiliateBar.tsx` — 사이드바 어필리에이트
- `components/ShareReferralCard.tsx` — 추천 링크 공유 카드
- `components/LocaleSwitcher.tsx` — 우상단 언어 전환
- `components/LocaleSuggestionBanner.tsx` — Geo-IP 배너
- `lib/generator/claude.ts` — Claude Sonnet 4.5 + 로케일 + 경로 최적화
- `lib/samples/{tokyo-4d-couple,paris-3d-family,bangkok-4d-solo,seoul-3d-foodie}.ts`
- `lib/trivia/index.ts` — 10개국 상식
- `lib/affiliates/index.ts` — Agoda/Aviasales/Klook/Airalo URL 빌더
- `lib/referrals.ts` — 추천 코드 + 크레딧 관리
- `lib/promo.ts` — 프로모 코드 검증/재화
- `lib/email.ts` — Resend, 4개 언어 템플릿
- `i18n/{locales,request}.ts` — next-intl 설정
- `messages/{en,ko,ja,zh}.json` — UI 번역
- `middleware.ts` — Geo-IP 감지

**데이터베이스:**
- `supabase/migrations/0001_plans.sql` — plans 테이블
- `supabase/migrations/0002_referrals.sql` — referrals + plan_credits
- `supabase/migrations/0003_promo_codes.sql` — promo_codes

**환경 변수 (모두 .env.local + Vercel에 필요):**
```
ANTHROPIC_API_KEY
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
LEMON_SQUEEZY_API_KEY
LEMON_SQUEEZY_STORE_ID
LEMON_SQUEEZY_VARIANT_ID
LEMON_SQUEEZY_WEBHOOK_SECRET
RESEND_API_KEY
RESEND_FROM_EMAIL
MAPBOX_TOKEN  (또는 NEXT_PUBLIC_MAPBOX_TOKEN)
NEXT_PUBLIC_SITE_URL=https://checkvisamap.com
```

---

## 🛠 빠른 명령어

```bash
# 로컬 개발
npm run dev          # http://localhost:3000

# 빌드 검증
npm run build        # 1594 라우트, ~7초
npm run lint         # 4개 레거시 에러 (피벗 이전)

# Git 상태 확인
git log --oneline -16
git status --short

# 최근 페이즈로 이동
git checkout d146cb5  # P13 (현재 HEAD)
git checkout 53d32bf  # P0로 롤백 등
```

---

## 📊 진행률

```
████████████████████ 100% (14/14 페이즈, 코드 작업)
░░░░░░░░░░░░░░░░░░░░ 0% (런치 — 사용자 차례)
```

**다음 액션:** `docs/SETUP.md` 열고 Anthropic 계정부터 시작.
