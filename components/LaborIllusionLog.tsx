"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("plan.wait");
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = buildLogLines(t, {
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
  }, [t, destination, airport, terminal, durationDays, travelerType]);

  return (
    <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-6 font-mono text-body-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-caption uppercase tracking-wider font-semibold text-[var(--text-muted)]">
          {t("aiWorking")}
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

type Translator = (key: string, values?: Record<string, string | number>) => string;

function buildLogLines(t: Translator, ctx: LineContext): string[] {
  const lines: string[] = [
    t("log.crossRef", { destination: ctx.destination }),
    t("log.indexRest", { destination: ctx.destination }),
    t("log.loadTransit", { destination: ctx.destination }),
    t("log.weather"),
    t("log.filterVenues"),
    t("log.walkMatrix"),
    t("log.photogenic"),
    t("log.hotelReview"),
    t("log.simEsim"),
    t("log.currency"),
    t("log.etiquette"),
  ];

  if (ctx.airport) {
    lines.push(
      ctx.terminal
        ? t("log.matchAirportTerm", { airport: ctx.airport, terminal: ctx.terminal })
        : t("log.matchAirport", { airport: ctx.airport }),
    );
    lines.push(t("log.airportTransit", { airport: ctx.airport }));
  }

  if (ctx.travelerType === "family-with-kids") {
    lines.push(t("log.stroller"));
    lines.push(t("log.kidFriendly"));
    lines.push(t("log.bathrooms"));
  }

  if (ctx.travelerType === "couple") {
    lines.push(t("log.sunsets"));
    lines.push(t("log.romantic"));
  }

  if (ctx.travelerType === "solo") {
    lines.push(t("log.soloSafe"));
    lines.push(t("log.soloSocial"));
  }

  if (ctx.durationDays && ctx.durationDays > 0) {
    for (let d = 1; d <= ctx.durationDays; d++) {
      lines.push(t("log.daySeq", { day: d }));
    }
  }

  lines.push(t("log.backtrack"));
  lines.push(t("log.packing"));
  lines.push(t("log.finalize"));

  return lines;
}
