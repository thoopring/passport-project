"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";

interface VisaData {
  origin: string;
  destination: string;
  requirement: string;
  region?: string;
  capital?: string;
  best_time_to_visit?: string;
}

function createSlug(destination: string, origin: string) {
  const p = origin.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const d = destination.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${p}-to-${d}`;
}

const REGION_EMOJIS: Record<string, string> = {
  Asia: "\ud83c\udf0f",
  Europe: "\ud83c\udf0d",
  Africa: "\ud83c\udf0d",
  Americas: "\ud83c\udf0e",
  Oceania: "\ud83c\udf0f",
};

export default function DestinationRoulette({
  visaData,
  selectedOrigin,
}: {
  visaData: VisaData[];
  selectedOrigin: string;
}) {
  const [result, setResult] = useState<VisaData | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const visaFreeCountries = useMemo(
    () =>
      visaData.filter((v) => {
        if (v.origin.toLowerCase() !== selectedOrigin.toLowerCase()) return false;
        if (v.destination.length > 50) return false;
        const req = v.requirement.toLowerCase();
        return req.includes("visa not required") || req.includes("visa free") || req.includes("visa on arrival");
      }),
    [visaData, selectedOrigin]
  );

  const spin = useCallback(() => {
    if (spinning || visaFreeCountries.length === 0) return;
    setSpinning(true);
    setResult(null);
    setRotation((prev) => prev + 1440 + Math.random() * 720);

    setTimeout(() => {
      const random = visaFreeCountries[Math.floor(Math.random() * visaFreeCountries.length)];
      setResult(random);
      setSpinning(false);
    }, 2000);
  }, [spinning, visaFreeCountries]);

  return (
    <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 md:p-8">
      <div className="text-center mb-6">
        <h3 className="text-display-sm text-[var(--text-primary)] mb-2">Where should I go?</h3>
        <p className="text-body-sm text-[var(--text-secondary)]">
          Spin to discover a random visa-free destination
        </p>
      </div>

      {/* Globe Spinner */}
      <div className="flex justify-center mb-8">
        <button
          onClick={spin}
          disabled={spinning}
          className="relative w-40 h-40 rounded-full cursor-pointer group"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--border-light)] group-hover:border-brand-400 transition-colors" />
          {/* Inner globe */}
          <div
            className="absolute inset-3 rounded-full bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900 dark:to-brand-950 flex items-center justify-center shadow-soft transition-transform duration-[2000ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <span className="text-5xl select-none" style={{ transform: `rotate(-${rotation}deg)`, transition: "transform 2000ms ease-out" }}>
              {spinning ? "\ud83c\udf00" : "\ud83c\udf0d"}
            </span>
          </div>
          {/* Label */}
          {!spinning && !result && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-caption font-semibold px-3 py-1 rounded-full whitespace-nowrap">
              Tap to spin
            </div>
          )}
        </button>
      </div>

      {/* Result */}
      {result && !spinning && (
        <div className="animate-fade-up">
          <div className="bg-[var(--surface-secondary)] rounded-xl p-5 mb-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-caption uppercase font-semibold text-[var(--text-muted)] mb-1">Your destination</p>
                <h4 className="text-display-sm text-[var(--text-primary)]">{result.destination}</h4>
              </div>
              <span className="text-2xl">{REGION_EMOJIS[result.region || ""] || "\ud83c\udf0d"}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-caption px-2.5 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 font-medium">
                {result.requirement.replace(/\[.*?\]/g, "").trim()}
              </span>
              {result.region && (
                <span className="text-caption px-2.5 py-1 rounded-full bg-[var(--surface-primary)] border border-[var(--border-light)] text-[var(--text-secondary)] font-medium">
                  {result.region}
                </span>
              )}
              {result.best_time_to_visit && (
                <span className="text-caption px-2.5 py-1 rounded-full bg-[var(--surface-primary)] border border-[var(--border-light)] text-[var(--text-secondary)] font-medium">
                  Best: {result.best_time_to_visit}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={`/visa/${createSlug(result.destination, result.origin)}`}
              className="flex-1 text-center py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition"
            >
              View Details
            </Link>
            <button
              onClick={spin}
              className="py-3 px-4 bg-[var(--surface-secondary)] hover:bg-[var(--border-light)] text-[var(--text-primary)] font-semibold rounded-xl transition"
            >
              Spin Again
            </button>
          </div>
        </div>
      )}

      {spinning && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-body-sm text-[var(--text-secondary)]">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Finding your next adventure...
          </div>
        </div>
      )}
    </div>
  );
}
