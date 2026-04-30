"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HOME_HERO_IMAGES } from "../lib/samples";

/**
 * Hero photo carousel for the post-payment wait screen.
 *
 * Replaces the old red-eyebrow text-only header with a full-bleed
 * rotating travel photo set. The wait runs 5-10 min on the quality-
 * first pipeline; without something visually changing, the screen
 * feels broken to a user staring at a static progress bar.
 *
 * Photos rotate every 12 seconds with a 1s crossfade. Source set is
 * the same hand-curated HOME_HERO_IMAGES that the home page uses, so
 * we get variety (Thai beach / NYC / Kyoto / Rome / family silhouette
 * / lifestyle) without paying for a separate licensing tier or
 * fetching from a destination API at runtime.
 *
 * The first image gets `priority` so the LCP for the wait page lands
 * on a photo the user can actually see, not a flash of white.
 */
const ROTATION_MS = 12_000;

export default function WaitHeroCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (HOME_HERO_IMAGES.length <= 1) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % HOME_HERO_IMAGES.length);
    }, ROTATION_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-[260px] sm:h-[320px] overflow-hidden rounded-2xl bg-[var(--surface-secondary)]">
      {HOME_HERO_IMAGES.map((url, i) => (
        <Image
          key={url}
          src={url}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 720px"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
        />
      ))}
      {/* Gradient overlay so any text we drop on top stays legible. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
      />
      {/* Tiny progress dots — incidental UI cue that the photo IS rotating. */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {HOME_HERO_IMAGES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === idx ? "w-5 bg-white/85" : "w-1.5 bg-white/40"
            }`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
