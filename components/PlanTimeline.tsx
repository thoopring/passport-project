import { getTranslations } from "next-intl/server";
import type { Day } from "../types/trip-plan";

interface PlanTimelineProps {
  days: Day[];
}

/**
 * Sticky day-jump strip for the plan view. Shows N day chips with theme,
 * each linking to #day-N anchor. Sticks to the top of the viewport on
 * desktop while the user scrolls through day cards. Hidden on mobile —
 * the screen is too narrow for a meaningful strip and day cards are close
 * enough together to navigate by scroll.
 *
 * Color rotation: vermilion / ink / muted-gray, repeating every 3 days.
 * Stays in the Layla-lean palette; no rainbow, no per-day hue assignment.
 */
const DAY_COLOR_CLASS = [
  "bg-[var(--brand-primary)] text-white",
  "bg-[var(--text-primary)] text-white",
  "bg-[var(--text-muted)] text-white",
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
            className={`${DAY_COLOR_CLASS[i % DAY_COLOR_CLASS.length]} rounded-md px-3 py-2 hover:opacity-90 transition-opacity`}
            aria-label={`${t("day")} ${day.dayNumber}: ${day.theme}`}
          >
            <p className="text-caption uppercase tracking-wider opacity-80 font-semibold leading-tight">
              {t("day")} {day.dayNumber}
            </p>
            <p className="text-body-sm font-semibold truncate leading-tight mt-0.5">
              {day.theme}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
