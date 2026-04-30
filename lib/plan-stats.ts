import type { Day } from "../types/trip-plan";

/**
 * Derived day-level stats for the plan view: active vs transit minutes,
 * meal count, rough USD budget, and the implied hotel-departure time.
 *
 * Sample data is hand-curated free text ("45 min", "Drive 1 hour 30 min back",
 * "~$45/person", etc.) so we parse defensively. Anything unparseable yields 0
 * rather than crashing — partial stats are better than no stats.
 *
 * Used by PlanView to render a per-day summary strip and to flag tight
 * scheduling between consecutive stops.
 */

export interface DayStats {
  /** Sum of duration on non-transit stops, in minutes. */
  activeMinutes: number;
  /** Sum of transit durations + parsed transitFromPrev between stops. */
  transitMinutes: number;
  /** Number of meal-type stops. */
  mealCount: number;
  /** Approximate USD spend, parsed from estimatedCost (best-effort). */
  budgetUSD: number;
  /** Implied hotel-departure clock time, e.g. "08:30". Null if unparseable. */
  hotelStartTime: string | null;
}

export type Tightness = "tight" | "normal" | "slack";

export interface StopBuffer {
  /** Minutes between previous stop end and this stop start, after subtracting transit. */
  bufferMinutes: number;
  /** Categorized tightness for visual indicator. */
  tightness: Tightness;
}

/**
 * Parse durations like "45 min", "1 hour", "1 hour 30 min", "30 분",
 * "1時間30分", "2 小时", "30 minutes" → minutes (integer).
 */
export function parseDurationToMinutes(text: string | undefined | null): number {
  if (!text) return 0;
  let total = 0;
  const enHour = text.match(/(\d+(?:\.\d+)?)\s*hours?\b/i);
  if (enHour) total += Math.round(parseFloat(enHour[1]) * 60);
  const enMin = text.match(/(\d+)\s*mins?(?:utes)?\b/i);
  if (enMin) total += parseInt(enMin[1], 10);
  const koHour = text.match(/(\d+)\s*시간/);
  if (koHour) total += parseInt(koHour[1], 10) * 60;
  const koMin = text.match(/(\d+)\s*분/);
  if (koMin) total += parseInt(koMin[1], 10);
  const jaHour = text.match(/(\d+)\s*時間/);
  if (jaHour) total += parseInt(jaHour[1], 10) * 60;
  // 分 but not 分鐘 (Chinese minute) — handled below
  const jaMin = text.match(/(\d+)\s*分(?!鐘|钟)/);
  if (jaMin) total += parseInt(jaMin[1], 10);
  const zhHour = text.match(/(\d+)\s*小时/);
  if (zhHour) total += parseInt(zhHour[1], 10) * 60;
  const zhMin = text.match(/(\d+)\s*分钟/);
  if (zhMin) total += parseInt(zhMin[1], 10);
  return total;
}

/** Pull the first "X min" / "X 분" / "X 分" from free transit text. */
export function parseTransitMinutes(text: string | undefined | null): number {
  if (!text) return 0;
  return parseDurationToMinutes(text);
}

/**
 * Pull a USD amount out of free-form cost text. "Free" / "—" / etc. → 0.
 * Picks the FIRST dollar number found (good enough for day-totals).
 */
export function parseCostUSD(text: string | undefined | null): number {
  if (!text) return 0;
  if (/free|complimentary|included|無料|免费|gratuit|무료/i.test(text)) return 0;
  const match = text.match(/\$\s*(\d+(?:[.,]\d+)?)/);
  if (!match) return 0;
  return parseFloat(match[1].replace(/,/g, ""));
}

/** "13:30" / "9:00 AM" → minutes since midnight. Null if unparseable. */
export function parseTimeToMinutes(time: string | undefined | null): number | null {
  if (!time) return null;
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/);
  if (!match) return null;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const ampm = match[3]?.toUpperCase();
  if (ampm === "PM" && h < 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

function formatClock(minutes: number): string {
  const wrapped = ((minutes % 1440) + 1440) % 1440; // safe modulo across midnight
  const h = Math.floor(wrapped / 60);
  const m = Math.round(wrapped % 60);
  return `${h}:${m.toString().padStart(2, "0")}`;
}

/**
 * Format a duration into a tight string for the day-totals strip:
 *   45  → "45m"
 *   60  → "1h"
 *   90  → "1h30"
 *  420  → "7h"
 */
export function formatDuration(minutes: number): string {
  if (minutes <= 0) return "0m";
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h}h`;
  return `${h}h${m}`;
}

export function computeDayStats(day: Day): DayStats {
  let activeMinutes = 0;
  let transitMinutes = 0;
  let mealCount = 0;
  let budgetUSD = 0;
  let hotelStartTime: string | null = null;

  for (let i = 0; i < day.stops.length; i++) {
    const stop = day.stops[i];
    const dur = parseDurationToMinutes(stop.duration);

    if (stop.type === "transit") {
      transitMinutes += dur;
    } else {
      activeMinutes += dur;
    }

    if (stop.type === "meal") mealCount += 1;

    budgetUSD += parseCostUSD(stop.estimatedCost);

    // transitFromPrev describes how to get from the previous stop, so it
    // counts as transit time only between stops (not before the first one).
    if (i > 0) {
      transitMinutes += parseTransitMinutes(stop.transitFromPrev);
    }
  }

  // Implied hotel departure: first stop's time minus the walk from hotel,
  // with a small ready-to-leave buffer. Skip if either piece is unparseable.
  if (day.stops.length > 0) {
    const first = day.stops[0];
    const firstClock = parseTimeToMinutes(first.time);
    const transitFromHotel = parseTransitMinutes(first.transitFromPrev);
    if (firstClock !== null && transitFromHotel > 0) {
      // Round to nearest 5 minutes so the anchor doesn't read like a
      // navigational ETA ("8:53") — we want a friendly target ("8:50").
      const raw = firstClock - transitFromHotel - 5;
      const rounded = Math.round(raw / 5) * 5;
      hotelStartTime = formatClock(rounded);
    }
  }

  return { activeMinutes, transitMinutes, mealCount, budgetUSD, hotelStartTime };
}

/**
 * For each stop, compute the buffer between the previous stop's end (time +
 * duration) and this stop's start, minus the transit between them.
 * First stop returns null (no buffer concept for day start).
 */
export function computeStopBuffers(day: Day): (StopBuffer | null)[] {
  return day.stops.map((stop, i) => {
    if (i === 0) return null;
    const prev = day.stops[i - 1];
    const prevClock = parseTimeToMinutes(prev.time);
    const prevDur = parseDurationToMinutes(prev.duration);
    const thisClock = parseTimeToMinutes(stop.time);
    const transit = parseTransitMinutes(stop.transitFromPrev);
    if (prevClock === null || thisClock === null) {
      return { bufferMinutes: 0, tightness: "normal" as const };
    }
    const buffer = thisClock - (prevClock + prevDur) - transit;
    let tightness: Tightness;
    if (buffer < 15) tightness = "tight";
    else if (buffer > 60) tightness = "slack";
    else tightness = "normal";
    return { bufferMinutes: buffer, tightness };
  });
}
