import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import HomeWizard from "./HomeWizard";
import { getSampleLocalized } from "../lib/samples";
import type { Locale } from "../i18n/locales";

/* ============================================================
   HomeHeroB — B안 (Value wedge · 이성 · 2단 분할)
   ------------------------------------------------------------
   판단 기준: A안과 같은 '머물게 하고 $4로 끌고 가는가'이되,
   설득의 축이 다르다. A안=감성(풀블리드 사진·욕구), B안=이성
   (무슨 서비스인지 한 줄 + 실제 결과물을 바로 보여줘 증명).

   A안과 구조 자체가 다르다 (색만 바꾼 변주 아님):
   - 배경: 사진 풀블리드(A) → 밝은 종이 톤 editorial 면(B).
     사진으로 분위기를 만드는 대신, 깨끗한 면 위에서 카피와
     '결과물 카드'가 직접 말하게 한다.
   - 레이아웃: 좌측 가중 단일 컬럼 오버레이(A) → 좌/우 2단 분할(B).
     좌측 = 메시지·가치·CTA / 우측 = 실제 일정 카드 미리보기.
   - 영문 서비스명 'gliddy'를 좌상단 워드마크로 크게·명확히 노출
     (대표님 지시: 무슨 서비스인지 한눈에).
   - 우측 카드 = 라이브 Tokyo 플랜에서 끌어온 진짜 산출물(공항에
     매칭된 호텔 + Day 1 동선). "이게 네가 받는 결과물"을 히어로
     안에서 바로 증명 — 이성적 wedge의 핵심.
   - 가치/오퍼는 체크리스트로 명시(지도 포함·환불 보장·계정 불필요·
     오프라인 PDF). A안의 ghost pill 대신 '무엇을 받는가'를 또박또박.
   - 카피에 'AI' 0 (대표님 원칙). 기존 i18n 키·토큰만 사용
     (신규 키 0 → 5로케일 안전, 타입체크 통과).
   ============================================================ */

const SAMPLES: { slug: string; label: string }[] = [
  { slug: "tokyo-4d-couple", label: "Tokyo" },
  { slug: "paris-3d-family", label: "Paris" },
  { slug: "bali-5d-couple", label: "Bali" },
  { slug: "reykjavik-4d-couple", label: "Reykjavik" },
];

export default async function HomeHeroB() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");

  // Right column = a real deliverable, not a mockup. Pull the live Tokyo
  // sample so the card shows actual hotel/airport/Day-1 content.
  const tokyo = await getSampleLocalized("tokyo-4d-couple", locale);
  const day1 = tokyo?.plan.days[0];
  const cardStops = day1?.stops.slice(0, 3) ?? [];

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--background)]">
      {/* Hairline coral wash top-left — a single restrained accent on the
          paper field; no gradient soup, no glass. */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-[0.06] -z-0"
        style={{ background: "var(--brand-primary)" }}
        aria-hidden
      />

      <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          {/* ============== LEFT — message · value · CTA ============== */}
          <div className="order-2 lg:order-1">
            {/* Big English wordmark — the service name, unmissable. */}
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className="font-fraunces font-semibold lowercase text-[2.1rem] sm:text-[2.5rem] tracking-[-0.03em] text-[var(--text-primary)]"
                style={{ fontFeatureSettings: '"ss01"' }}
              >
                gliddy
              </span>
              <span
                className="h-[3px] w-8 rounded-full"
                style={{ backgroundColor: "var(--brand-primary)" }}
                aria-hidden
              />
              <span className="text-caption font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {t("heroLiveChip")}
              </span>
            </div>

            {/* What it is — headline + the one-line definition. */}
            <h1 className="font-fraunces font-semibold text-[2.5rem] sm:text-[3.5rem] lg:text-[3.9rem] leading-[1.04] tracking-[-0.025em] text-[var(--text-primary)]">
              {t("heroHeadline1")}{" "}
              <em
                className="italic font-medium"
                style={{ color: "var(--brand-primary)" }}
              >
                {t("heroHeadlineEm")}
              </em>
            </h1>

            <p className="text-body-md sm:text-body-lg text-[var(--text-secondary)] max-w-lg mt-5 leading-relaxed">
              {t("heroSubtitle")}
            </p>

            {/* Value checklist — what you actually get. Rational proof, not
                ghost-pill decoration. */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 mt-7 max-w-md">
              {[
                t("heroStatSpeed"),
                t("heroStatRating"),
                t("heroStatNoAccount"),
                t("heroStatOffline"),
              ].map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-body-sm text-[var(--text-secondary)]"
                >
                  <span
                    className="shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full text-white text-[10px] leading-none"
                    style={{ backgroundColor: "var(--brand-primary)" }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            {/* Primary CTA — the wizard on a solid card, on paper (no glass). */}
            <div className="mt-8 max-w-lg rounded-[18px] bg-white p-3 sm:p-3.5 shadow-[0_18px_44px_-22px_rgba(0,0,0,0.30)] ring-1 ring-[var(--border-subtle)]">
              <HomeWizard />
            </div>

            {/* Sample quick-links. */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {t("heroTrySample")}
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {SAMPLES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/samples/${c.slug}`}
                    className="inline-flex items-center px-3 min-h-[36px] rounded-full border border-[var(--border-subtle)] text-body-sm text-[var(--text-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--text-primary)] transition"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ============== RIGHT — the actual deliverable ============== */}
          {tokyo && day1 && (
            <div className="order-1 lg:order-2">
              <p className="text-caption uppercase tracking-[0.16em] text-[var(--text-muted)] mb-3 lg:pl-1">
                {t("previewEyebrow")}
              </p>

              <div className="rounded-[16px] bg-white border border-[var(--border-subtle)] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.32)] overflow-hidden">
                {/* Card header — destination + duration, like a plan cover. */}
                <div className="px-6 pt-6 pb-5 border-b border-[var(--border-subtle)]">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display font-bold text-[1.6rem] leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
                      {tokyo.plan.destination}
                    </h2>
                    <span className="text-body-sm text-[var(--text-muted)] whitespace-nowrap">
                      {t("cardDaysCountry", {
                        count: tokyo.plan.durationDays,
                        country: tokyo.plan.destinationCountry,
                      })}
                    </span>
                  </div>
                </div>

                {/* Hotel matched to airport — the differentiated value, side by side. */}
                <div className="grid grid-cols-2 divide-x divide-[var(--border-subtle)] border-b border-[var(--border-subtle)]">
                  <div className="px-5 py-4">
                    <p className="text-caption uppercase font-semibold tracking-[0.12em] text-[var(--text-muted)] mb-1.5">
                      {t("previewHotel")}
                    </p>
                    <p className="font-display font-bold text-body-md text-[var(--text-primary)] leading-snug line-clamp-2">
                      {tokyo.plan.hotel.name}
                    </p>
                    <p className="text-caption text-[var(--text-muted)] mt-1">
                      {tokyo.plan.hotel.area}
                    </p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-caption uppercase font-semibold tracking-[0.12em] text-[var(--text-muted)] mb-1.5">
                      {t("previewAirport")}
                    </p>
                    <p className="font-display font-bold text-body-md text-[var(--text-primary)] leading-snug line-clamp-2">
                      {tokyo.plan.airportTransit.method}
                    </p>
                    <p className="text-caption text-[var(--text-muted)] mt-1">
                      {tokyo.plan.airportTransit.duration}
                    </p>
                  </div>
                </div>

                {/* Day 1 — theme + first stops, numbered like the real plan. */}
                <div className="px-6 py-5">
                  <p className="text-caption uppercase font-bold tracking-[0.16em] text-[var(--brand-primary)] mb-1">
                    {t("previewDayLabel")}
                  </p>
                  <p className="font-display font-bold text-body-md text-[var(--text-primary)] leading-snug mb-3.5">
                    {day1.theme}
                  </p>
                  <ol className="space-y-3">
                    {cardStops.map((stop, i) => (
                      <li key={stop.order} className="flex items-start gap-3">
                        <span
                          className="shrink-0 mt-[1px] inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-caption font-semibold leading-none"
                          style={{ backgroundColor: "var(--text-primary)" }}
                        >
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-body-sm font-semibold text-[var(--text-primary)] leading-snug">
                            {stop.name}
                          </p>
                          {stop.area && (
                            <p className="text-caption text-[var(--text-muted)]">
                              {stop.area}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
