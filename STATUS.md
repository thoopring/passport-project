# 피벗 진행 상황 (Pivot Status)

> 터미널이 끊기거나 새 세션을 시작할 때 어디까지 했는지 빠르게 파악하는 라이브 스냅샷.
>
> **마지막 업데이트:** 2026-04-21
> **워킹 트리:** clean

---

## ✅ 코드 작업 — P0~P15까지 완료

### 1차 피벗 (P0~P13) — 트립 플래너 런칭
14개 페이즈 shipped. 세부는 `PIVOT_PLAN.md` + git log 참조.

### 2차 피벗 (P14) — 디자인 리뉴얼 + 비자 완전 삭제 (라운드 1~2)

| 커밋 | 내용 |
|---|---|
| `9fda809` P14a | **실패 라운드 1**: 크림 + Fraunces 세리프 에디토리얼 (사진 없이 → 엘레강스만 있고 감성 훅 없음) |
| `c1ff1ac` P14b | `/visa/*` 1500+ 라우트, visa_data 24K줄, 비자 블로그 전체 **삭제** |
| `ac59af5` P14c | 상세 페이지 shell polish |
| `89eb88b` P14d-1 | **실패 라운드 2**: 흰색 + 코발트 + Inter 유틸 미니멀 (너무 일반적, 개성 없음) |
| `f5e2853` P14d-2 | font-display 클래스 cleanup |

### 3차 피벗 (P15) — **Layla-lean 디자인 시스템 확정** (현재)

사용자가 **Layla.ai + Wanderlog** 레퍼런스 보고 방향 확정. 실패 원인 분석:
크림 자체가 문제가 아니라 **사진이 없어서** 공허했음. Layla 레시피 =
크림 배경 + 세리프 디스플레이 + **큰 여행 사진** + 따뜻한 산호 악센트.

| 커밋 | 내용 |
|---|---|
| (이번) P15 | **Layla-lean** 디자인 시스템 + 홈 포토 히어로 + 샘플 카드 사진 + PlanView 세리프 + `DESIGN.md` 작성 |

### 디자인 시스템 (현재)

- **배경**: 웜 페이퍼 `#F5EFE4`
- **텍스트**: 잉크 `#141517`, 뮤트 `#6E6B64`
- **악센트**: 버밀리언 `#D4442B` (한 화면 1~2회)
- **디스플레이 폰트**: **Instrument Serif** (Google Fonts, 무료)
- **본문 폰트**: Inter
- **사진**: Unsplash, `next/image` 최적화
- **다크모드 없음**
- **자세한 건 `DESIGN.md`**

### 구조

- **홈**: 세리프 헤드라인 + 위저드 폼 + **큰 여행 사진 배너** + 3 샘플 카드(사진 포함)
- **Samples**: 4카드 그리드, 각 카드 목적지 사진
- **Sample/[slug]**: 목적지 21:9 히어로 사진 + `PlanView`
- **Plan/[id]**: `PlanView` (사진 없음 — 유료 플랜은 아직 목적지→사진 매핑 없음, v1.1)
- **About/Privacy/Disclaimer/Blog**: 세리프 헤드라인 + Inter 본문

### 빌드 상태

- 22 라우트, 빌드 클린
- 린트 클린

---

## ⏳ 다음 단계 — 사용자(MinSu) 차례

**디자인 시스템 확정**됐으니 이제 런치 준비만 남음.

완료:
- [x] Anthropic API 키
- [x] Supabase 프로젝트 + 마이그레이션 (0003 fix `b3decf0`)
- [x] `.env.local` 부분 생성
- [x] LemonSqueezy 스토어 + $4 상품 + API key
- [x] 초기 Vercel 배포 (각 커밋 자동 빌드)

대기:
- [ ] **디자인 3차 live 확인** — 이번 커밋 배포 후 사용자 평가 필요
- [ ] Mapbox 토큰 + URL 제한 + env 반영
- [ ] Resend 도메인 DKIM/SPF DNS + 검증
- [ ] Vercel Pro 업그레이드 ($20/월)
- [ ] LS 웹훅 (`/api/webhooks/lemon-squeezy`) secret → env → Redeploy
- [ ] LAUNCH_CHECKLIST Phase B~F 스모크 테스트

### 검토 메모 (v1.1+)

- **로케일 추가**: Hindi, Russian (여행 인구 많음). Arabic도 검토. `messages/*.json` 확장 + `i18n/locales.ts` 업데이트 필요.
- **유료 플랜 목적지 사진**: 현재 Samples만 사진 있음. Claude가 생성한 유료 플랜도 `destinationCountry` → Unsplash 매핑하면 더 풍부해짐.
- **PDF 스타일 업그레이드**: 현재는 기본 react-pdf 레이아웃. Layla-lean 방향이면 PDF도 편집디자인 느낌으로 (드롭 캡, 구분선, 페이지 번호).

---

## 🔁 터미널 끊겼을 때

```
STATUS.md 읽고 어디까지 했는지 확인해줘.
```

---

## 🛠 빠른 명령어

```bash
npm run dev          # http://localhost:3000
npm run build        # ~8초, 22 라우트
git log --oneline -24
git status --short
```

---

## 📊 진행률

```
████████████████████ 100% (P0~P15 코드)
██░░░░░░░░░░░░░░░░░░  ~15% (런치 — 계정 프로비저닝 진행 중)
```

**다음 액션:** Vercel 자동 빌드 후 새 디자인 live 확인.
