# Mapbox Directions API — 비용 경로 문서

> 작성: 2026-04-30
> Phase 4 Q2f: 지도에 stop 사이 보행 경로선 추가
> 정책: **수익 발생 전까지 무료 한도 내 최대 활용. 수익 후 paid tier 검토.**

---

## 현재 사용 패턴

### 호출 시점
**plan 생성 시 1회만** (LemonSqueezy webhook 안):
```
사용자 결제 → webhook → Claude generator → savePlanResult
                                          ↓
                          computeRoutePolylines (NEW)
                                          ↓
                          savePlanRoutePolylines → DB column
```

### 호출 횟수
- 1 plan = 약 **25-40개 Directions API 호출** (consecutive stop pairs)
- 평균 30개로 가정

### 캐시 전략
- `plans.route_polylines` JSONB 컬럼에 영구 저장 (마이그레이션 0004)
- 페이지 view마다 재호출 X (DB read만)
- 한 plan은 평생 1번만 Mapbox 부르고 끝

---

## 무료 한도 vs 유료 전환 시점

### Mapbox 가격 (2026-04 기준)
| Tier | 한도 | 비용 |
|---|---|---|
| Free | 100,000 requests/month | $0 |
| Pay-as-you-go | 100k 초과분 | **$0.50 / 1,000 requests** |

### 무료 한도 가용 plan 수
- 100,000 requests ÷ 30 calls/plan = **약 3,333 plans/month** 무료
- 한 달 3,000 plans 미만이면 영구 무료

### 유료 전환 시 비용 (1,000 plans 단위)
| 월 plan 수 | Directions calls | 비용 |
|---|---|---|
| 1,000 | 30,000 | $0 (무료) |
| 3,000 | 90,000 | $0 (무료) |
| 5,000 | 150,000 | $25 |
| 10,000 | 300,000 | $100 |
| 50,000 | 1,500,000 | $700 |

→ 1,000 paid plan ≈ $4,000 매출 → polyline 비용은 매출의 ~0-3%. **수익 우선 후 비용 부담 감수.**

---

## 안전장치

### 1. 영구 캐시 (DB)
한 plan = 한 번만 호출. 같은 plan 100명이 봐도 추가 비용 0.

### 2. Fallback 동작
호출 실패 시 (네트워크 / rate limit / 한도 초과 / 잘못된 좌표):
- `null` 저장
- PlanMap이 해당 segment를 직선으로 fallback
- 사용자에게 visible error 없음

### 3. 마이그레이션 미적용 시
`route_polylines` 컬럼 없으면 (0004 안 적용):
- `savePlanRoutePolylines` 가 catch & log → plan 정상 생성
- PlanMap 직선 fallback 유지

### 4. 토큰 미설정 시
`MAPBOX_TOKEN` 없으면:
- `fetchSegment` 즉시 null 반환
- 비용 0, 직선 fallback

---

## Founder 액션 (Phase 4 활성화)

### 즉시 (5분):
- [ ] Supabase 대시보드 → SQL Editor 또는 CLI로 마이그레이션 0004 적용:
  ```bash
  # CLI 방식
  supabase db push
  
  # 또는 Supabase 대시보드 SQL Editor에 다음 붙여넣기:
  alter table plans add column if not exists route_polylines jsonb;
  ```
- [ ] Vercel env에 `MAPBOX_TOKEN` 이미 있는지 확인 (CLAUDE.md 기준 있음)

### 모니터링 (월 1회):
- [ ] Mapbox dashboard (https://account.mapbox.com/statistics/)에서 Directions API 사용량 확인
- [ ] 80,000 requests/month 도달하면 경고 → 다음 단계 결정

### 한도 근접 시 옵션 (수익 발생 후):
1. **Pay-as-you-go 활성화**: 별도 액션 없음. Mapbox가 자동 청구.
2. **Volume discount 협상**: 월 100,000+ 시 sales 문의
3. **자체 OSRM 호스팅**: 월 $30/서버, 무제한 호출 (운영 부담)
4. **Polyline 빈도 줄이기**: 매 stop 쌍 X, 인접 도시간만 등 (품질 ↓)

→ **현재 추천**: 1번 (Pay-as-you-go). 1,000 plans 추가당 ~$15 비용 vs $4,000 매출.

---

## 모니터링 체크포인트

매월 1번 확인:
- [ ] Mapbox Directions API 사용량 (https://account.mapbox.com/statistics/)
- [ ] PostHog `checkout_completed` 이벤트 수 (실제 plan 생성 수)
- [ ] 사용량 ÷ 30 ≈ plan 수와 일치하는지

불일치 시 (예: plan 수 < 사용량 ÷ 30):
- 디버깅: 실패 후 재시도 발생? 캐시 누락?
- 로그 확인: `[webhook] polyline computation failed (non-fatal)` 패턴 검색

---

## 데이터 흐름 (구조 참고)

```
1. plan 생성
   webhook → generator → savePlanResult
                       → computeRoutePolylines (Mapbox API ~30 calls)
                       → savePlanRoutePolylines (DB write)

2. plan 보기
   user → /plan/[id] → getPlan (DB read incl. route_polylines)
                     → PlanView → PlanMap routePolylines={record.route_polylines}
                                → multi-segment LineString GeoJSON 렌더

3. 마이그레이션 미적용 환경
   webhook → savePlanRoutePolylines → DB error → log warn → continue
   PlanMap → routePolylines=null → 직선 LineString 렌더 (현재 동작)
```

---

## 코드 참조

| 파일 | 역할 |
|---|---|
| `supabase/migrations/0004_route_polylines.sql` | 컬럼 추가 |
| `lib/mapbox-directions.ts` | API 헬퍼 (fetchSegment, computeRoutePolylines) |
| `lib/plans.ts:savePlanRoutePolylines` | DB write helper |
| `app/api/webhooks/lemon-squeezy/route.ts` | webhook 통합 (try/catch 안에서 호출) |
| `components/PlanMap.tsx` | routePolylines prop, multi-segment 렌더링 |
| `types/trip-plan.ts:RoutePolylineSegment` | 타입 |

---

## 변경 이력

- **2026-04-30**: 초기 구현. Free tier 우선, Pay-as-you-go fallback 가능 구조.
- 향후 변경 시 본 파일 업데이트.
