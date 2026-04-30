"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { pickTrivia } from "../lib/trivia";
import type { Locale } from "../i18n/locales";

interface TravelTriviaProps {
  destinationCountry: string;
  /** ms between each trivia rotation (default 7000). */
  rotateMs?: number;
}

/**
 * Side card that rotates through travel trivia for the destination country
 * in the user's selected locale. Used during the labor-illusion loading
 * screen and on the post-payment wait page — both are long-wait surfaces
 * where boredom is the enemy.
 */
export default function TravelTrivia({
  destinationCountry,
  rotateMs = 7000,
}: TravelTriviaProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("plan.wait");
  // Derived state — picked once per (destinationCountry, locale) change.
  // The shuffled order is stable for the lifetime of those props.
  const facts = useMemo(
    () => pickTrivia(destinationCountry, locale, 8),
    [destinationCountry, locale],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (facts.length === 0) return;
    // Reset to 0 when facts change (legitimate sync with the facts derivation).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(0);
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % facts.length);
    }, rotateMs);
    return () => clearInterval(interval);
  }, [facts, rotateMs]);

  if (facts.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-brand-600 to-brand-800 dark:from-brand-700 dark:to-brand-950 text-white rounded-2xl p-5 sm:p-6">
      <p className="text-caption uppercase tracking-wider font-semibold opacity-70 mb-3">
        {t("triviaHeader", { country: destinationCountry })}
      </p>
      <p className="text-body-md leading-relaxed font-medium min-h-[4.5rem]">{facts[index]}</p>
      <div className="flex gap-1.5 mt-4">
        {facts.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
