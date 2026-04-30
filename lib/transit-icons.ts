/**
 * Transit-mode inference from free-form transitFromPrev text.
 * Multilingual keywords are matched in priority order so "Drive 1 hour"
 * resolves to drive (not transit) and "Flybus" wins over generic "bus".
 *
 * Returns "unknown" rather than throwing when nothing matches — the
 * caller falls back to a neutral arrow icon.
 */

export type TransitMode = "walk" | "transit" | "taxi" | "drive" | "flight" | "unknown";

export function inferTransitMode(text: string | undefined | null): TransitMode {
  if (!text) return "unknown";
  const lower = text.toLowerCase();

  // Flight / airport bus first — Flybus and similar shouldn't match generic "bus"
  if (
    /\b(flight|fly|plane|flybus|airport bus)\b/i.test(text) ||
    /비행기|항공|空港バス|飛行機|飞机|vol/i.test(text)
  ) {
    return "flight";
  }

  // Walk
  if (
    /\bwalk(?:ing)?\b|\bon foot\b/i.test(lower) ||
    /도보|徒歩|步行|à pied/i.test(text)
  ) {
    return "walk";
  }

  // Taxi
  if (
    /\b(taxi|uber|lyft|cab|grab)\b/i.test(lower) ||
    /タクシー|的士|出租|택시/i.test(text)
  ) {
    return "taxi";
  }

  // Drive
  if (
    /\b(drive|driving|by car|self-drive|rental car)\b/i.test(lower) ||
    /운전|車で|开车|en voiture/i.test(text)
  ) {
    return "drive";
  }

  // Transit (subway, metro, bus, train, tram)
  if (
    /\b(metro|subway|tube|train|bus|tram|rail|line|JR|MRT|MTR|N'EX)\b/i.test(text) ||
    /지하철|電車|地下鉄|地铁|バス|JR/i.test(text)
  ) {
    return "transit";
  }

  return "unknown";
}
