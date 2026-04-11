"use client";

import { useEffect, useState } from "react";
import { pickTrivia } from "../lib/trivia";

interface TravelTriviaProps {
  destinationCountry: string;
  /** ms between each trivia rotation (default 7000). */
  rotateMs?: number;
}

/**
 * Side card that rotates through travel trivia for the destination country.
 * Used as content during the labor-illusion loading screen — gives users
 * something interesting to read while the wizard popups appear.
 */
export default function TravelTrivia({
  destinationCountry,
  rotateMs = 7000,
}: TravelTriviaProps) {
  const [facts, setFacts] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setFacts(pickTrivia(destinationCountry, 8));
    setIndex(0);
  }, [destinationCountry]);

  useEffect(() => {
    if (facts.length === 0) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % facts.length);
    }, rotateMs);
    return () => clearInterval(interval);
  }, [facts, rotateMs]);

  if (facts.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-brand-600 to-brand-800 dark:from-brand-700 dark:to-brand-950 text-white rounded-2xl p-5 sm:p-6">
      <p className="text-caption uppercase tracking-wider font-semibold opacity-70 mb-3">
        While you wait · {destinationCountry}
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
