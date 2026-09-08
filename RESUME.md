# RESUME — 이어가기 메모

> 작성: 2026-09-08 (Claude 세션, 정전 예고 대비 — 9/9 07:40~07:50 전원 차단 예정)
> 재시작 시: 이 파일 + `git log --oneline -8` 읽고 이어가면 됨.
> 기준 커밋: **865c350** (로컬=원격 동기화, 워킹트리 clean)

---

## 한 줄 요약
**HN/Product Hunt 출시의 기술적 준비는 전부 끝났다. 남은 건 코드가 아니라 CEO의 수동 실행(게시)이다.**

---

## 이번 세션에서 완료한 것 (→ 865c350)

| 항목 | 상태 | 검증 |
|---|---|---|
| **RLS 보안 구멍** | ✅ 닫음 | anon key로 전 테이블 401 확인, 앱은 service_role로 정상(홈·플랜·status·login 200). migration `0008_enable_rls.sql` 커밋됨 + DB 적용됨 |
| **SEO 타이틀 이중브랜딩** | ✅ 수정·배포 | 라이브 `Build your trip plan \| gliddy` (기존 `— gliddy \| gliddy`) |
| **OG 공유 이미지 누락** | ✅ 복구·배포 | /plan/new·/samples `og:image → /opengraph-image` |
| **결제 전 구간 스모크** | ✅ 통과 | planId `2835e907` — LS결제→webhook→생성 4분9초→/plan/[id] 200→PDF 10p→Resend delivered |
| **클린 도메인** | ✅ 설정·검증 | `gliddy.danorie.com` = alias(앱 직접 서빙, 리다이렉트 아님), canonical→checkvisamap 정상 |
| **PH 자산·런북** | ✅ 준비 | 240 썸네일 + 갤러리 4장, `docs/marketing/PRODUCT-HUNT-RUNBOOK.md` |
| **HN 런북** | ✅ 준비 | `docs/marketing/SHOW-HN-RUNBOOK.md` |
| **커밋·푸시** | ✅ | thoopring 계정으로 push 완료 |

---

## 다음 할 일 (코드 아님 — CEO 수동 실행)

1. **Show HN 게시** — 화/수/목 자정(KST) 창. 계정(thoopring) 숙성 상태 재확인 후. 런북: `docs/marketing/SHOW-HN-RUNBOOK.md`
2. **Product Hunt** — HN 결과 보고 그 주 화/수/목. 자산 준비완료. 런북: `docs/marketing/PRODUCT-HUNT-RUNBOOK.md`
3. **네이버 프로필 외부링크**에 `gliddy.danorie.com` 넣기 — ★본문 아님. SOP `naver_publish_sop.md` §5.5.2(line97)이 본문 URL 금지. 프로필 링크 칸에만.

---

## ★ CEO 결정 대기

1. **푸터 스튜디오명 불일치 (라이브에 노출 중)** — 라이브 푸터는 `Made by DANU Technologies` / `trafficpumplab.com`인데, 스튜디오가 **Danorie / danorie.com**으로 개명됨(2026-08-21, `E:\prj\DANU\profiles\gliddy.md` line85). 푸터를 `Made by Danorie` / `https://danorie.com`로 교체할지 확정 필요. **확정 주면 5분 작업**(components/Footer.tsx:132,135). 정전 직전 무리한 변경 피하려 미적용.
2. **gliddy.com 유료 구매 여부** — 서브도메인(gliddy.danorie.com)으로 당장은 충분. 트래픽 증명 후 판단 보류 중.

---

## 검증된 사실 / 주의 (다음 세션이 오판 않도록)

- **0원 매출의 근본원인 = 전환이 아니라 유입.** GSC 최근 30일: 클릭 **0**, 노출 129 중 97%가 브랜드검색("gliddy"). 서비스 시작 이래 외부인 이메일 도달 **통틀어 9명**, 결제 0. → 사이트/전환 리뉴얼로는 안 풀림. 출시(트래픽)가 유일한 레버.
- **네이버는 글에 링크를 못 넣는다** — 도메인의 `visa`가 SOP 금지어. 클린 도메인이 이 겹만 풂. **본문 URL 자체 금지(line97)는 그대로** → 프로필 링크로만.
- **RLS는 "정책 0개"가 정상** — 앱은 service_role로 우회. anon에 정책 추가 금지(브라우저는 auth.*만 씀).
- **gh CLI 활성계정을 thoopring으로 전환해둠**(push 위해). kyungin-choi 필요 시 `gh auth switch --user kyungin-choi`.
- **CLAUDE.md의 일부 기술이 실제와 다름**: 생성 모델은 Sonnet이 아니라 **Opus 4.8 2패스 + Haiku 재정렬**. `/blog`는 비어있지 않음(글 존재).

---

## 제약 (계속 유효)
- bridge 서비스 재기동 금지(라이브러리 임포트만 OK)
- 코드·.env에 비밀번호 저장 금지
- 커밋은 명시 지시 시에만
- UI 이모지 금지 / $4는 홈·pricing 노출됨(과거 "숨김" 정책은 번복)
- 네이버 콘텐츠: 비자/visa/AI 및 본문 URL 금지
- HN/PH 게시는 CEO 수동
