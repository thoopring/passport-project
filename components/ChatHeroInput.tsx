"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const SUGGESTIONS = [
  "Tokyo in 4 days for a couple, food and culture",
  "Family trip to Paris with two kids",
  "Bangkok solo on a budget",
  "Seoul food trip in 3 days",
];

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export default function ChatHeroInput() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setLoading(true);

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "plan_wizard_started", {
        event_category: "trip_planner",
        event_label: "chat_input",
      });
    }

    try {
      const res = await fetch("/api/plan/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });
      if (!res.ok) throw new Error("parse failed");
      const data = await res.json();

      const params = new URLSearchParams();
      if (data.destination) params.set("dest", data.destination);
      if (data.destinationCountry) params.set("country", data.destinationCountry);
      else if (data.destination) params.set("country", data.destination);
      if (data.durationDays) params.set("days", String(data.durationDays));
      if (data.budgetTier) params.set("budget", data.budgetTier);

      const hasAllRequired =
        data.destination && data.durationDays && data.budgetTier;

      if (hasAllRequired) {
        router.push(`/plan/loading?${params.toString()}`);
      } else {
        router.push(`/plan/new?${params.toString()}`);
      }
    } catch {
      router.push(`/plan/new?hint=${encodeURIComponent(trimmed)}`);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function pickSuggestion(s: string) {
    setText(s);
    textareaRef.current?.focus();
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[var(--border-light)] rounded-[18px] shadow-soft p-5 transition focus-within:border-[var(--text-secondary)]"
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell us about your trip… e.g. Tokyo in 4 days for a couple, food and culture"
          rows={3}
          maxLength={500}
          className="w-full resize-none outline-none bg-transparent text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] leading-relaxed"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] hidden sm:inline">
            ⌘ + Enter to send
          </span>
          <span className="sm:hidden" />
          <button
            type="submit"
            disabled={!text.trim() || loading}
            aria-label="Send"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1A1A1A] text-white transition hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-spin">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="24" strokeDashoffset="16" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mt-4">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => pickSuggestion(s)}
            className="px-4 py-2 bg-[var(--lavender-soft)] hover:bg-[var(--lavender)] text-[var(--text-primary)] text-body-sm rounded-full transition"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
