"use client";

import { useEffect, useState } from "react";

interface LaborIllusionLogProps {
  /** Destination name to interpolate into log lines. */
  destination: string;
  /** Optional airport code — appears in log lines once known. */
  airport?: string;
  /** Optional terminal — appears in log lines once known. */
  terminal?: string;
  /** Optional duration in days — used for "sequencing day N..." lines. */
  durationDays?: number;
  /** Optional traveler type — used for "optimizing for {type}..." lines. */
  travelerType?: string;
}

/**
 * Animated rolling progress log used by the loading screen to give users the
 * sense that the AI is doing real work. New log lines stream in every ~1.5
 * seconds. The log is parameterized by destination so the lines feel personal.
 */
export default function LaborIllusionLog({
  destination,
  airport,
  terminal,
  durationDays,
  travelerType,
}: LaborIllusionLogProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = buildLogLines({
      destination,
      airport,
      terminal,
      durationDays,
      travelerType,
    });

    let index = 0;
    const interval = setInterval(() => {
      if (index >= lines.length) {
        // Loop back to the start with a slight reshuffle for long-running cases
        index = 0;
      }
      setVisibleLines((prev) => {
        const next = [...prev, lines[index]];
        return next.slice(-8); // keep only the last 8 lines visible
      });
      index += 1;
    }, 1600);

    return () => clearInterval(interval);
  }, [destination, airport, terminal, durationDays, travelerType]);

  return (
    <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-6 font-mono text-body-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-caption uppercase tracking-wider font-semibold text-[var(--text-muted)]">
          AI working
        </span>
      </div>
      <ol className="space-y-1.5">
        {visibleLines.map((line, i) => (
          <li
            key={`${i}-${line}`}
            className="text-[var(--text-secondary)] transition-opacity"
            style={{
              opacity: 0.4 + ((i + 1) / visibleLines.length) * 0.6,
            }}
          >
            <span className="text-emerald-600 dark:text-emerald-400 mr-2">›</span>
            {line}
          </li>
        ))}
      </ol>
    </div>
  );
}

interface LineContext {
  destination: string;
  airport?: string;
  terminal?: string;
  durationDays?: number;
  travelerType?: string;
}

function buildLogLines(ctx: LineContext): string[] {
  const lines: string[] = [
    `Cross-referencing 18 travel guides for ${ctx.destination}…`,
    `Indexing 240 restaurants in central ${ctx.destination}…`,
    `Loading public transit maps for ${ctx.destination}…`,
    `Analyzing seasonal weather patterns…`,
    `Filtering venues by current operating status…`,
    `Computing walking-distance matrix…`,
    `Identifying photogenic landmarks…`,
    `Cross-checking 1,200 hotel reviews…`,
    `Pricing local SIM and eSIM options…`,
    `Mapping currency exchange rates…`,
    `Scanning local etiquette guides…`,
  ];

  if (ctx.airport) {
    lines.push(`Matching hotels to ${ctx.airport}${ctx.terminal ? ` Terminal ${ctx.terminal}` : ""}…`);
    lines.push(`Computing airport→city transit options for ${ctx.airport}…`);
  }

  if (ctx.travelerType === "family-with-kids") {
    lines.push("Optimizing stroller-friendly routes…");
    lines.push("Filtering venues by kid-friendly facilities…");
    lines.push("Locating bathroom-accessible meal stops…");
  }

  if (ctx.travelerType === "couple") {
    lines.push("Pinning sunset viewpoints…");
    lines.push("Reserving romantic dinner candidates…");
  }

  if (ctx.travelerType === "solo") {
    lines.push("Surfacing safe-for-solo neighborhoods…");
    lines.push("Adding social-friendly stops…");
  }

  if (ctx.durationDays && ctx.durationDays > 0) {
    for (let d = 1; d <= ctx.durationDays; d++) {
      lines.push(`Sequencing day ${d} stops by walking distance…`);
    }
  }

  lines.push("Optimizing route to minimize backtracking…");
  lines.push("Compiling packing recommendations…");
  lines.push("Finalizing your personalized itinerary…");

  return lines;
}
