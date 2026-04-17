# 피벗 진행 상황 (Pivot Status)

> 이 문서는 작업 중 터미널이 끊기거나 새 세션을 시작할 때 어디까지 했는지
> 빠르게 파악하기 위한 라이브 스냅샷입니다.
>
> **마지막 업데이트:** 2026-04-17
> **현재 HEAD:** `pivot(P14d-2): Inter-only typography sweep` (직전 커밋)
> **워킹 트리:** clean

---

## ✅ 코드 작업 — P0~P14까지 완료

### 1차 피벗 (P0~P13) — 트립 플래너 런칭

14개 페이즈 shipped. 각 페이즈 커밋은 git log 참조.

### 2차 피벗 (P14) — 디자인 리뉴얼 + 비자 완전 삭제

2개 라운드의 디자인 이터레이션.

**라운드 1 (에디토리얼 럭셔리 톤 — 실패)**

| 커밋 | 내용 |
|---|---|
| `9fda809` P14a | 크림/네이비/골드 팔레트 + Fraunces 세리프 |
| `c1ff1ac` P14b | **비자 완전 삭제 (C-hard)**: `/visa/[slug]` 1500+, visa_data*.json 24K줄, 비자 블로그 |
| `ac59af5` P14c | 상세 페이지 shell polish |

사용자 피드백: "크림색 안 어울림 + 지금 너무 안 예쁨 + 유틸 제품에 럭셔리 톤 맥락 불일치".

**라운드 2 (코발트 유틸 톤 — 현재)**

| 커밋 | 내용 |
|---|---|
| `89eb88b` P14d-1 | 화이트/코발트 팔레트 + Inter 단일 + **홈을 폼 히어로로 재작성** (X+Y 구조) |
| (이번) P14d-2 | `font-display` 클래스 전면 제거 (타이포 통일) |

### 디자인 시스템 (현재)

- **배경**: 화이트 `#FFFFFF`
- **텍스트**: near-black `#0A0A0A` / `#525252` / `#A3A3A3`
- **악센트**: **코발트 `#1D4ED8`** (단일 악센트)
- **폰트**: **Inter 단일** (세리프 제거)
- **다크모드**: 없음

### 홈 구조 (현재)

- **Header** — 로고 + Samples/Journal/About + LocaleSwitcher (CTA 없음)
- **Hero (X)** — 헤드라인 + `PlanWizardStep1` 임베드 (진짜 입력 폼이 홈)
- **Middle (Y)** — 3 sample cards (Tokyo/Paris/Bangkok)
- **Footer** — 미니멀

홈 방문자가 버튼 한 번도 안 누르고 바로 목적지/일수/예산 입력 가능.

### 빌드 상태

- 22 라우트, 빌드 클린
- 린트 클린
- 번들 deps 정리됨 (react-simple-maps/d3-scale/tooltip 삭제)

---

## ⏳ 다음 단계 — 사용자(MinSu) 차례

코드는 끝났습니다. `docs/LAUNCH_CHECKLIST.md` Phase A~G 진행.

### 진행 중 체크리스트

완료:
- [x] Anthropic API 키
- [x] Supabase 프로젝트 + 마이그레이션 3개 (0003 IMMUTABLE fix `b3decf0`)
- [x] `.env.local` 부분 생성
- [x] LemonSqueezy 스토어 + $4 상품 + API key
- [x] 초기 Vercel 배포 (각 커밋 자동 빌드)

대기:
- [ ] Mapbox 토큰 + URL 제한 + env 반영
- [ ] Resend 도메인 DKIM/SPF DNS + 검증
- [ ] Vercel Pro 업그레이드 ($20/월)
- [ ] LS 웹훅 생성 (`/api/webhooks/lemon-squeezy`) → secret → env 반영 → Redeploy
- [ ] LAUNCH_CHECKLIST Phase B~F 스모크 테스트

---

## 🔁 만약 터미널이 끊겼다면

다음 세션 시작 시 Claude에게:

```
STATUS.md 읽고 어디까지 했는지 확인해줘.
```

---

## 🛠 빠른 명령어

```bash
npm run dev          # http://localhost:3000
npm run build        # ~8초, 22 라우트
git log --oneline -20
git status --short
```

---

## 📊 진행률

```
████████████████████ 100% (P0~P14 코드 작업)
██░░░░░░░░░░░░░░░░░░  ~15% (런치 — 계정 프로비저닝 진행 중)
```

**다음 액션:** 디자인 리뷰 후 문제 없으면 Mapbox 토큰 발급.
