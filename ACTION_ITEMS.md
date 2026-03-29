# 수익화 전략 & 액션 아이템 (직접 해야 할 일들)

> 이 문서는 **사람인 당신이 직접** 해야 하는 작업 목록입니다.
> 코드로 자동화할 수 없는 신청/가입/마케팅 작업을 정리했습니다.

---

## 🔴 긴급 (이번 주 내 완료)

### 1. Google AdSense 신청
- **URL**: https://www.google.com/adsense/start/
- **필요조건**:
  - Privacy Policy 페이지 (✅ 이미 생성됨: `/privacy`)
  - Disclaimer 페이지 (✅ 이미 생성됨: `/disclaimer`)
  - 고유 콘텐츠 (✅ 블로그 15개+ 존재)
  - 최소 30일 운영 이력
- **신청 후 할 일**:
  - 승인되면 발급받은 `ca-pub-XXXXXXXXXXXXXXXX` 코드를 `components/AdBanner.tsx`에 입력
  - `app/layout.tsx`에 AdSense 스크립트 추가:
    ```html
    <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" strategy="afterInteractive" crossOrigin="anonymous" />
    ```
- **예상 수익**: 월 방문자 1,000명 기준 $5-15/월 (RPM $5-15 여행 니치)

### 2. Google Search Console 점검
- **URL**: https://search.google.com/search-console/
- **할 일**:
  - 사이트맵 제출: `https://checkvisamap.com/sitemap.xml`
  - 색인 요청: 주요 페이지 수동 색인 요청
  - 검색 성과 분석: 어떤 키워드로 노출되는지 확인
  - Core Web Vitals 점검

### 3. 네이버 서치어드바이저 등록 (한국 트래픽용)
- **URL**: https://searchadvisor.naver.com/
- **할 일**: 사이트 등록 → 사이트맵 제출 → 검증

---

## 🟡 중요 (2주 내 완료)

### 4. 어필리에이트 프로그램 정비 및 추가 가입

#### 이미 가입된 것들 (링크 확인 필요):
| 서비스 | 상태 | 월 예상 수익 |
|--------|------|-------------|
| Agoda (cid:1956855) | ✅ 활성 | 클릭당 $0.01-0.50 |
| Aviasales/Travelpayouts (491612) | ✅ 활성 | 예약당 1-3% |
| Airalo (pxf.io 링크) | ✅ 활성 | 판매당 15-30% |

#### 새로 가입해야 할 곳들:
| 서비스 | URL | 왜 필요한가 | 예상 수익 |
|--------|-----|-----------|----------|
| **Viator Affiliate** | https://partnernetwork.viator.com/ | 투어 예약 커미션 8% | 예약당 $3-20 |
| **NordVPN Affiliate** | https://nordvpn.com/affiliates/ | VPN 판매 커미션 40% | 판매당 $10-30 |
| **Insubuy Affiliate** | https://www.insubuy.com/affiliate/ | 보험 판매 커미션 | 판매당 $5-15 |
| **Rail Europe Affiliate** | https://affiliate.raileurope.com/ | 유럽 기차 예약 | 예약당 3-5% |
| **Booking.com Affiliate** | https://www.booking.com/affiliate-program/ | Agoda와 함께 운영 | 예약당 25-40% |
| **World Nomads** | https://www.worldnomads.com/affiliates | 여행자 보험 전문 | 판매당 $5-10 |
| **SafetyWing** | https://www.safetywing.com/affiliates | 디지털노마드 보험 | 판매당 10% |
| **Wise (TransferWise)** | https://wise.com/invite/ | 환전/송금 | 가입당 $10-30 |

> **핵심**: 현재 Viator, NordVPN, Insubuy, Rail Europe 링크는 어필리에이트 ID 없이 일반 링크로 연결됨.
> 가입 후 받은 어필리에이트 링크로 `app/visa/[slug]/page.tsx`의 해당 링크들을 교체해야 함.

### 5. 이메일 마케팅 서비스 가입
- **추천**: [Mailchimp](https://mailchimp.com/) (무료 500명까지) 또는 [ConvertKit](https://convertkit.com/) (무료 1,000명까지)
- **할 일**:
  - 가입 → API 키 발급
  - `components/NewsletterSignup.tsx`에 실제 API 연동 코드 추가
  - 웰컴 이메일 시퀀스 설정 (자동 발송)
  - 주 1회 뉴스레터 발송 시작

### 6. OG Image (소셜 미리보기 이미지) 확인
- 자동 생성 코드를 추가했지만, 별도로 `public/og-image.png` (1200x630px) 파일도 만들어두면 좋음
- Canva (https://canva.com) 에서 무료로 제작 가능
- 디자인: 로고 + "Check Visa Requirements for 190+ Countries" + checkvisamap.com

---

## 🟢 성장 전략 (1개월 내 시작)

### 7. 콘텐츠 마케팅 (SEO 트래픽의 핵심)

#### 블로그 확장 계획 (목표: 50개 포스트)
**키워드 리서치 후 아래 주제로 작성:**

| 우선순위 | 키워드 (검색량 높음) | 글 제목 예시 |
|---------|---------------------|-------------|
| 🔴 | "visa free countries for [국적]" | "Complete List: Visa-Free Countries for Korean Passport 2026" |
| 🔴 | "do i need visa for [나라]" | "Do Americans Need a Visa for Thailand? (2026 Guide)" |
| 🔴 | "e-visa [나라] application" | "How to Apply for India e-Visa: Step-by-Step 2026" |
| 🟡 | "digital nomad visa 2026" | "Best Digital Nomad Visas in 2026: Complete Comparison" |
| 🟡 | "passport ranking 2026" | "2026 Passport Power Ranking: Which Passport is #1?" |
| 🟡 | "travel insurance for [지역]" | "Best Travel Insurance for Southeast Asia 2026" |
| 🟢 | "visa run [나라]" | "Complete Visa Run Guide: Thailand to Laos 2026" |
| 🟢 | "best esim for travel" | "Best eSIM for International Travel 2026 (Tested)" |

#### 콘텐츠 작성 팁:
- 각 글 최소 1,500단어 이상
- H2/H3 구조 체계적으로
- 내부 링크: 관련 비자 페이지 (`/visa/xxx`) 연결 필수
- 어필리에이트 자연스럽게 삽입 (강제적이지 않게)
- "Last updated: [날짜]" 표시로 신뢰도 확보

### 8. SNS 마케팅 전략

#### Reddit (즉시 시작 가능, 무료, 효과 최고)
- **서브레딧**: r/travel, r/digitalnomad, r/solotravel, r/backpacking, r/visas
- **전략**: 먼저 커뮤니티에 가치 있는 답변을 달고, 자연스럽게 사이트 링크
- **주의**: 스팸 금지! 진정성 있는 참여 후 공유

#### Twitter/X
- 계정 생성: @PassportPowerHQ (또는 유사)
- 매일 1-2개 비자 팁 트윗
- 비자 정책 변경 소식 빠르게 공유
- 해시태그: #VisaFree #DigitalNomad #TravelTips #PassportPower

#### Pinterest (여행 카테고리 최강)
- 각 블로그 포스트마다 핀 이미지 제작 (Canva)
- 보드: "Visa Free Countries", "Travel Tips", "Digital Nomad Life"
- 핀 설명에 키워드 + 사이트 링크

#### YouTube Shorts / TikTok (선택)
- "Did you know? [국적] can visit [나라] without visa!" 형식
- 지도 화면 캡처 + 보이스오버

### 9. 백링크 구축
- **HARO** (https://www.helpareporter.com/): 여행 전문가로 등록, 기자 질문에 답변
- **게스트 포스팅**: 여행 블로그에 기고 (사이트 링크 포함)
- **포럼 참여**: Lonely Planet Thorn Tree, TripAdvisor Forum
- **도구 디렉토리**: Product Hunt, AlternativeTo에 등록

### 10. 경쟁 분석 & 차별화
현재 주요 경쟁사:
- **VisaHQ.com** - 비자 대행 서비스 (수수료 $50+)
- **Sherpa** - 항공사 통합
- **VisaGuide.World** - 정보 중심
- **iVisa.com** - 비자 대행

**우리의 차별점 강화:**
1. ✅ 무료 + 시각적 지도 (경쟁사에 없음)
2. ✅ 실제 여행자 스토리 (블로그)
3. ⭐ 추가 필요: 비자 변경 알림 기능 (이메일)
4. ⭐ 추가 필요: 비교 기능 ("한국 vs 미국 여권 비교")
5. ⭐ 추가 필요: 다국어 지원 (한국어, 일본어 우선)

---

## 📊 수익화 로드맵

### Phase 1: 기반 구축 (현재 ~ 1개월)
- [ ] AdSense 신청 및 승인
- [ ] 어필리에이트 ID 모두 실제 링크로 교체
- [ ] 이메일 서비스 연동
- [ ] 블로그 10개 추가 (총 25개)
- [ ] Reddit/Twitter 시작
- **예상 수익**: $0-10/월

### Phase 2: 트래픽 성장 (1~3개월)
- [ ] 블로그 30개 추가 (총 45개)
- [ ] Pinterest 시작
- [ ] 백링크 10개 이상 확보
- [ ] 뉴스레터 구독자 100명
- [ ] Google 검색 Top 30 키워드 3개 이상
- **예상 수익**: $20-100/월

### Phase 3: 스케일업 (3~6개월)
- [ ] 블로그 50개+ 달성
- [ ] 뉴스레터 구독자 1,000명
- [ ] 월 방문자 5,000+
- [ ] 스폰서 콘텐츠 시작
- [ ] 프리미엄 비자 가이드 (PDF) 판매 고려
- **예상 수익**: $100-500/월

### Phase 4: 안정화 (6~12개월)
- [ ] 월 방문자 20,000+
- [ ] 다국어 지원 (한국어, 일본어)
- [ ] 비자 알림 프리미엄 서비스 (월 $3-5)
- [ ] 브랜드 협업
- **예상 수익**: $500-2,000/월

---

## ⚡ 지금 당장 할 수 있는 5가지

1. **Google AdSense 신청** (10분)
2. **Google Search Console에서 사이트맵 재제출** (5분)
3. **Reddit r/digitalnomad에 유용한 답변 1개 달기** (15분)
4. **Viator/NordVPN 어필리에이트 가입** (각 10분)
5. **Mailchimp 무료 가입 → 뉴스레터 세팅** (20분)

---

*이 문서는 2026년 3월 29일 기준으로 작성되었습니다.*
*코드 변경 사항은 이미 적용되었으며, 배포 후 즉시 작동합니다.*
