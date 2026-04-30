import { getTranslations } from "next-intl/server";
import type { Day } from "../types/trip-plan";

interface PlanTimelineProps {
  days: Day[];
}

/**
 * Sticky day-jump strip for the plan view. Day chips rotate through three
 * soft warm tones — soft peach / sand / clean white — all close enough in
 * lightness to feel harmonious with the warm-paper page bg, but far enough
 * apart to keep each day visually distinct. Vermilion eyebrow + ink theme
 * match the day-card pattern used elsewhere on the plan view. Hidden on
 * mobile because the chip row is too cramped for a useful click target on
 * narrow screens.
 *
 * Earlier iteration used solid vermilion / solid ink / solid gray blocks,
 * which read as banner ads against the editorial Layla-lean surface.
 * The current soft-tone rotation matches sample-card and day-card aesthetics.
 */
const DAY_TONE_CLASS = [
  "bg-[var(--brand-soft)]", // soft peach (#FFE4E0) — warm, brand-tinted
  "bg-[var(--surface-secondary)]", // sand (#FBF7EE) — neutral warm
  "bg-[var(--surface-primary)]", // clean white (#FFFFFF) — slight lift from paper bg
];

export default async function PlanTimeline({ days }: PlanTimelineProps) {
  const t = await getTranslations("plan");
  if (days.length === 0) return null;

  return (
    <div className="hidden md:block sticky top-0 z-20 -mx-2 px-2 py-3 mb-6 bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border-subtle)]">
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}
      >
        {days.map((day, i) => (
          <a
            key={day.dayNumber}
            href={`#day-${day.dayNumber}`}
            className={`${DAY_TONE_CLASS[i % DAY_TONE_CLASS.length]} rounded-md px-3 py-2.5 border border-[var(--border-light)] hover:border-[var(--brand-primary)] transition-colors`}
            aria-label={`${t("day")} ${day.dayNumber}: ${day.theme}`}
          >
            <p className="text-caption uppercase tracking-wider font-semibold text-[var(--brand-primary)] leading-tight">
              {t("day")} {day.dayNumber}
            </p>
            <p className="text-body-sm font-semibold truncate leading-tight mt-0.5 text-[var(--text-primary)]">
              {day.theme}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
