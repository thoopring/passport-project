"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export interface ShowcaseSample {
  slug: string;
  destination: string;
  destinationCountry: string;
  durationDays: number;
  heroImage: string;
}

interface Props {
  samples: ShowcaseSample[];
}

/**
 * Three-card showcase under the wait screen.
 *
 * The 5-10 minute wait is real — text-only stage messages and a frozen
 * progress bar are not enough engagement. This grid gives the buyer
 * something productive to do while their plan generates: open a
 * curated sample plan in another tab and read it. They land on a
 * /samples detail page that's identical in shape to what their own
 * plan will become, which doubles as anticipation building.
 *
 * Cards open in a new tab so the buyer doesn't navigate away from the
 * polling page (they'd otherwise lose the auto-redirect on completion).
 */
export default function WaitSampleShowcase({ samples }: Props) {
  const t = useTranslations("plan.wait");
  if (!samples.length) return null;

  return (
    <div className="mt-12">
      <p className="text-caption uppercase tracking-[0.16em] text-[var(--text-muted)] font-semibold mb-4 text-center">
        {t("showcaseHeading")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {samples.map((s) => (
          <Link
            key={s.slug}
            href={`/samples/${s.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-[14px] border border-[var(--border-light)] bg-[var(--surface-primary)] hover:border-[var(--text-muted)] transition shadow-soft"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={s.heroImage}
                alt={s.destination}
                fill
                sizes="(max-width: 640px) 100vw, 240px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
              />
              <div className="absolute bottom-2 left-3 right-3">
                <p className="font-fraunces text-white text-[1.1rem] leading-tight">
                  {s.destination}
                </p>
                <p className="text-caption text-white/85">
                  {t("showcaseDays", { count: s.durationDays })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <p className="text-caption text-[var(--text-muted)] text-center mt-3">
        {t("showcaseHint")}
      </p>
    </div>
  );
}
