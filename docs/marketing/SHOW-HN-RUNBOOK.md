# Show HN 런북 — gliddy (2026-07-22 확정본)

> LAUNCH-PLAYBOOK.md §3의 실행판. 사실관계를 2026-07-22 코드 기준으로 검증·갱신함
> (모델 Sonnet 4.5 → **Opus 4.8**, 샘플 13개, 5로케일, 생성 5~10분).
> HN은 계정 로그인이 필요한 1회성 게시라 **CEO가 직접 제출**한다. 자동화 금지.

---

## 1. 제출 정보 (복사용)

**Title** (80자 제한):
```
Show HN: Gliddy – AI trip plans for $4, no subscription
```

**URL** (UTM 없이 — HN 문화상 클린 URL. 유입은 GA4 referrer=news.ycombinator.com으로 식별):
```
https://checkvisamap.com
```

## 2. 첫 댓글 (제출 직후 즉시 게시 — HN 관례)

```
Hi HN — solo founder here. I kept planning trips in spreadsheets and
hated it, so I built this. The premise: a generic "Tokyo 4-day
itinerary" article doesn't fit anyone, but a human writer can't
economically write a personalized one for every traveler. An LLM can.

How it works:
- 3-question wizard (where, how long, who's going)
- Claude Opus 4.8 writes the day-by-day plan; a small model handles
  route ordering so days don't zigzag
- Hotel pick matched to your arrival airport
- Restaurants by meal, with addresses
- Mapbox route map
- Delivered as a web page + email + PDF, usually in 5-10 minutes

Tech: Next.js 16, React 19, Supabase, LemonSqueezy for payments.
5 languages (en/ko/ja/zh/fr) — same plan quality bar in each.

Things I'm still figuring out:
- Pricing: $4 per plan, no subscription. The floor seems to be
  "expensive enough that I can let the model think for a few minutes."
- Quality measurement: 13 hand-curated sample plans are my quality bar;
  the generator has to beat them. Curious how others eval this.
- Single-city 3-5 day trips only right now. City pairs (Tokyo+Kyoto)
  are the most-requested thing I haven't built.

Free public samples, no signup: https://checkvisamap.com/samples

Would love feedback — especially from anyone who's built LLM products
where "quality" is hard to measure.
```

## 3. 게시 시각

- **최적 창: 화~목 08:00~10:00 PT = 한국 수·목·금 00:00~02:00 (자정~새벽 2시)**
- ★ 일정 변경 (2026-07-22): CEO HN 계정 신규 생성 → 갓 만든 계정의 Show HN은
  스팸 필터 위험. **계정 1주 숙성 후 화~목 자정 창에 게시.**
  (원 7/28~30 창은 결제검증 지연으로 지나감 — 2026-08-25 재설정. 계정 숙성 상태 재확인 후 다음 화/수/목.)
  - 오늘: 계정 생성(추천 아이디 thoopring, 변경 불가) + email/about 세팅
  - 이번 주: 매일 10분 눈팅 + 진짜 댓글 2~3개 (LLM/Next.js/1인창업 스레드, 링크 금지)
  - Show HN 규칙 정독: https://news.ycombinator.com/showhn.html

## 4. 제출 절차 (CEO, 5분)

1. https://news.ycombinator.com 로그인 (기존 계정. 신규 계정이면 오늘 만들지 말 것 —
   갓 만든 계정의 Show HN은 스팸 필터에 잘 걸림. 계정 상태 미리 확인).
2. submit → title/URL 붙여넣기 → submit.
3. **즉시** 본인 글에 위 첫 댓글 게시.
4. 글 URL을 Claude Code 세션에 알려주면 이후 모니터링 지원.

## 5. 첫 2시간 대응 (랭킹 = 초기 참여 속도)

- 모든 댓글에 답한다. 방어하지 말고 감사 + 구체 답변. 비판은 "맞다, 그래서 ~를 고민 중".
- 예상 질문 답변 준비:
  - **"Why not just ask Claude/ChatGPT?"** (100% 나옴 — Anthropic도 여행 일정을 공식
    유스케이스로 홍보 중) → "Fair — I build on Claude myself. What you're paying $4 for
    is the shape, not the capability: airport-matched hotel, route-ordered days on a real
    map, PDF/email delivery, 5 languages — from 3 questions, no prompting skill. People
    who enjoy prompting an itinerary out of a chatbot aren't my customer, and that's fine."
  - **"왜 도메인이 checkvisamap인데 여행 플래너냐?"** → 정직하게: 비자 체커로 시작했다가
    피벗했다. 도메인 이전 계획 중. (숨기면 HN이 판다 — 선제 정직이 이긴다)
  - **"LLM이 hallucinate한 식당을 추천하면?"** → 샘플 13개가 품질 바닥선, 실측 주소 검증,
    그래도 완벽하지 않다 — 환불 정책으로 커버. (과장 금지)
  - **"$4로 수익이 되냐?"** → Opus 토큰 원가 공개 수준으로: 마진 얇지만 양수. 가격 실험 예정.
  - **"왜 구독이 아니냐?"** → 여행은 연 1~2회 이벤트. 구독은 사용자에게 불리한 모델.
- 링크 재게시 금지, 투표 요청 금지 (밴 사유).

## 6. 사전 점검 체크리스트 (게시 전 오늘 밤)

- [x] ~~영어 렌더 확인~~ ✅ 2026-07-22 미국발 원문 fetch 실증: 루트가 영어
  ("gliddy — AI trip plans, sorted"). 한국어는 KR IP geo 자동 적용 설계
  (middleware Stage 2). 단 KR IP + 영어 브라우저는 한국어가 나옴 — HN 비영향, 개선 백로그.
- [ ] /samples → 샘플 상세 → 로딩 속도 체감 확인
- [x] ✅ 실결제 스모크 테스트 통과 (2026-08-24 결제→2026-08-25 생성, planId 2835e907): LS결제→webhook→생성 4분9초→/plan/[id] 200→PDF 10p→Resend 이메일 delivered 전구간 확인
- [ ] Supabase/Vercel 대시보드 열어두기 (트래픽 스파이크 대비, Vercel Pro라 한도 여유)
- [ ] GA4 실시간 보기 열어두기

## 7. 이후

- 결과 무관 30일간 HN 재게시 금지. 후속은 기술 블로그 글("Cost of running an LLM B2C
  product: my actual numbers") 형태로 — LAUNCH-PLAYBOOK §7.
- Show HN 후 1주 내 Product Hunt (별도 런북, HN 결과 반영해 카피 조정).
- 트래픽·전환은 다음 세션에서 referrer 기준 분석.
