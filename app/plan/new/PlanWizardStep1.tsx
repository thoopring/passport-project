"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BudgetTier } from "../../../types/trip-plan";

interface PlanWizardStep1Props {
  defaultDestination: string;
  defaultCountry: string;
  defaultOrigin: string;
}

const BUDGET_OPTIONS: { value: BudgetTier; label: string; hint: string }[] = [
  { value: "budget", label: "Budget", hint: "Hostels, street food, transit" },
  { value: "midrange", label: "Mid-range", hint: "4-star, sit-down meals" },
  { value: "luxury", label: "Luxury", hint: "5-star, fine dining" },
];

/**
 * Step 1 of the trip planner wizard. Collects ONLY destination, duration, and
 * budget — the absolute minimum to get the user committed. Submitting redirects
 * to /plan/loading where the labor-illusion screen takes over and asks the
 * remaining questions one at a time as popups.
 */
export default function PlanWizardStep1({
  defaultDestination,
  defaultCountry,
  defaultOrigin,
}: PlanWizardStep1Props) {
  const router = useRouter();
  const [destination, setDestination] = useState(defaultDestination);
  const [destinationCountry, setDestinationCountry] = useState(defaultCountry);
  const [durationDays, setDurationDays] = useState(5);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("midrange");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    const params = new URLSearchParams({
      dest: destination.trim(),
      country: (destinationCountry.trim() || destination.trim()).trim(),
      days: String(durationDays),
      budget: budgetTier,
    });
    if (defaultOrigin) params.set("origin", defaultOrigin);

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "plan_wizard_started", {
        event_category: "trip_planner",
        event_label: destination,
      });
    }

    router.push(`/plan/loading?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 space-y-7"
    >
      <div>
        <label className="block">
          <span className="block text-caption font-semibold text-[var(--text-secondary)] mb-1.5">
            Where are you going? <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            required
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              if (!destinationCountry) setDestinationCountry(e.target.value);
            }}
            placeholder="e.g. Tokyo"
            className={inputClass}
            autoFocus
          />
        </label>
        {destination && destinationCountry !== destination && (
          <label className="block mt-3">
            <span className="block text-caption font-semibold text-[var(--text-secondary)] mb-1.5">
              Country
            </span>
            <input
              type="text"
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value)}
              placeholder="e.g. Japan"
              className={inputClass}
            />
          </label>
        )}
      </div>

      <label className="block">
        <span className="block text-caption font-semibold text-[var(--text-secondary)] mb-1.5">
          How many days? <span className="text-red-500">*</span>
        </span>
        <input
          type="number"
          required
          min={1}
          max={30}
          value={durationDays}
          onChange={(e) => setDurationDays(parseInt(e.target.value, 10) || 1)}
          className={inputClass}
        />
      </label>

      <div>
        <span className="block text-caption font-semibold text-[var(--text-secondary)] mb-2">
          What&rsquo;s your budget? <span className="text-red-500">*</span>
        </span>
        <div className="grid grid-cols-3 gap-2">
          {BUDGET_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setBudgetTier(opt.value)}
              className={`px-3 py-2.5 rounded-xl text-left border transition cursor-pointer ${
                budgetTier === opt.value
                  ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)]"
                  : "bg-[var(--surface-primary)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-[var(--text-muted)]"
              }`}
            >
              <span className="font-semibold text-body-sm block">{opt.label}</span>
              <span className="block text-caption opacity-70 mt-0.5">{opt.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 bg-[var(--text-primary)] text-[var(--background)] font-semibold rounded-xl hover:opacity-90 transition"
      >
        Start AI analysis →
      </button>
      <p className="text-center text-caption text-[var(--text-muted)]">
        $4 · Mobile web link + PDF · Delivered in minutes after payment
      </p>
    </form>
  );
}

const inputClass =
  "w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border-light)] rounded-xl text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/40 transition";
