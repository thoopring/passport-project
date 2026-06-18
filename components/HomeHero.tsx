import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import HomeWizard from "./HomeWizard";
import { HOME_HERO_IMAGES } from "../lib/samples";

/* ============================================================
   HomeHero — A안 (Editorial vermilion · 감성 · 풀블리드)
   ------------------------------------------------------------
   판단 기준: 이 첫 화면이 사용자를 머물게 하고 $4 결제로
   끌고 가는가.

   설계 의도 (색만 바꾼 시안이 아니라 구조 전환):
   - 풀블리드 시네마틱 배경: 이미 큐레이션된 6장의 감성
     여행 사진을 Ken Burns 크로스페이드(globals: heroPan).
     좌측 가중 스크림으로 텍스트 가독성 확보 + 하단 비네팅
     으로 깊이. 사진이 첫인상의 '여행 욕구'를 만든다.
   - Editorial vermilion(#E8472B) = 단 1개의 accent.
     상단 룰 · 헤드라인 flourish · CTA 호버에만. coral 브랜드
     (#FF6B6B)와 구분되는 진짜 주황. 무채(흑백 사진) + 1 accent
     = Stripe/Linear editorial 톤.
   - 헤드라인은 Fraunces serif large + italic flourish em.
     'AI' 단어 0 (대표님 원칙).
   - 1차 CTA = HomeWizard를 솔리드 화이트 카드에. 글래스모피즘
     남용 회피(반투명 블러 패널 금지) — booking-bar 식 솔리드
     카드로 입력→플랜→$4 전환 동선을 사진 위 가장 밝은 면에
     배치해 시선을 흡수한다.
   - trust chip · sample quick-link은 hairline ghost pill로
     사진을 가리지 않게.
   ============================================================ */

const SAMPLES: { slug: string; label: string }[] = [
  { slug: "tokyo-4d-couple", label: "Tokyo" },
  { slug: "paris-3d-family", label: "Paris" },
  { slug: "bali-5d-couple", label: "Bali" },
  { slug: "reykjavik-4d-couple", label: "Reykjavik" },
  { slug: "cusco-5d-couple", label: "Cusco" },
  { slug: "dubai-4d-couple", label: "Dubai" },
];

// Editorial vermilion — the single accent. Kept local to the hero so it
// reads distinct from the friendlier coral brand token used elsewhere.
const VERMILION = "#E8472B";

export default async function HomeHero() {
  const t = await getTranslations("home");
  // 6 images → matches the 6 hero-fade-* keyframe slots in globals.css.
  const images = HOME_HERO_IMAGES.slice(0, 6);

  return (
    <section className="relative isolate overflow-hidden min-h-[92svh] flex items-center">
      {/* ---- Full-bleed cinematic photo layer ---- */}
      <div className="absolute inset-0 -z-10 bg-[var(--foreground)]">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            aria-hidden
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover absolute inset-0 hero-fade-${i + 1}`}
          />
        ))}
        {/* Left-weighted scrim for text legibility (text lives on the left). */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(12,11,10,0.86) 0%, rgba(12,11,10,0.62) 38%, rgba(12,11,10,0.22) 72%, rgba(12,11,10,0.10) 100%)",
          }}
          aria-hidden
        />
        {/* Bottom vignette — depth + grounds the trust strip. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(12,11,10,0.55) 0%, rgba(12,11,10,0) 42%)",
          }}
          aria-hidden
        />
      </div>

      {/* ---- Content ---- */}
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Editorial vermilion eyebrow rule + live signal */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="h-[3px] w-9 rounded-full"
              style={{ backgroundColor: VERMILION }}
              aria-hidden
            />
            <span className="text-caption font-semibold uppercase tracking-[0.18em] text-white/85">
              {t("heroLiveChip")}
            </span>
          </div>

          <h1 className="font-fraunces font-semibold text-[2.6rem] sm:text-[4rem] lg:text-[4.75rem] text-white leading-[1.02] tracking-[-0.025em]">
            {t("heroHeadline1")}
            <br />
            <em
              className="italic font-medium tracking-[-0.03em]"
              style={{
                color: VERMILION,
                fontFeatureSettings: '"ss01", "ss02", "ss03"',
              }}
            >
              {t("heroHeadlineEm")}
            </em>
          </h1>

          <p className="text-body-md sm:text-body-lg text-white/85 max-w-md mt-5 sm:mt-6">
            {t("heroSubtitle")}
          </p>

          {/* ---- Primary CTA: the wizard on a solid warm-white card ----
               Solid (not blurred glass) — the brightest plane on the photo,
               so the eye lands on the one action that leads to a plan → $4. */}
          <div className="mt-8 max-w-lg rounded-[18px] bg-[var(--background)] p-3 sm:p-3.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/5">
            <HomeWizard />
          </div>

          {/* ---- Trust chips: hairline ghost pills on the photo ---- */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-6">
            {[
              t("heroStatSpeed"),
              t("heroStatRating"),
              t("heroStatNoAccount"),
              t("heroStatOffline"),
            ].map((label) => (
              <span
                key={label}
                className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/25 bg-white/5 text-caption font-medium text-white/85 backdrop-blur-[2px]"
              >
                {label}
              </span>
            ))}
          </div>

          {/* ---- Sample destination quick-links ---- */}
          <div className="mt-6">
            <p className="text-caption uppercase tracking-[0.14em] text-white/55 mb-2">
              {t("heroTrySample")}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {SAMPLES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/samples/${c.slug}`}
                  className="inline-flex items-center px-3 min-h-[40px] rounded-full border border-white/25 text-body-sm text-white/85 hover:border-white/70 hover:text-white transition"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint — subtle, anchors the full-height first screen. */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-white/45">
        <span className="text-caption uppercase tracking-[0.2em]">Scroll</span>
        <span
          className="h-6 w-px"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0))",
          }}
        />
      </div>
    </section>
  );
}
