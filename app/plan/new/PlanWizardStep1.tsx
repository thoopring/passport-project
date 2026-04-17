"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { BudgetTier } from "../../../types/trip-plan";

interface PlanWizardStep1Props {
  defaultDestination: string;
  defaultCountry: string;
  defaultOrigin: string;
  defaultPromoCode?: string;
  autoFocus?: boolean;
}

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
  defaultPromoCode,
  autoFocus = true,
}: PlanWizardStep1Props) {
  const router = useRouter();
  const t = useTranslations("wizard.step1");
  const [destination, setDestination] = useState(defaultDestination);
  const [destinationCountry, setDestinationCountry] = useState(defaultCountry);
  const [durationDays, setDurationDays] = useState(5);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("midrange");

  const budgetOptions: { value: BudgetTier; label: string; hint: string }[] = [
    { value: "budget", label: t("budgetBudget"), hint: t("budgetBudgetHint") },
    { value: "midrange", label: t("budgetMidrange"), hint: t("budgetMidrangeHint") },
    { value: "luxury", label: t("budgetLuxury"), hint: t("budgetLuxuryHint") },
  ];

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
    if (defaultPromoCode) params.set("promo", defaultPromoCode);

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
            {t("destinationLabel")} <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            required
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              if (!destinationCountry) setDestinationCountry(e.target.value);
            }}
            placeholder={t("destinationPlaceholder")}
            className={inputClass}
            autoFocus={autoFocus}
          />
        </label>
        {destination && destinationCountry !== destination && (
          <label className="block mt-3">
            <span className="block text-caption font-semibold text-[var(--text-secondary)] mb-1.5">
              {t("countryLabel")}
            </span>
            <input
              type="text"
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value)}
              placeholder={t("countryPlaceholder")}
              className={inputClass}
            />
          </label>
        )}
      </div>

      <label className="block">
        <span className="block text-caption font-semibold text-[var(--text-secondary)] mb-1.5">
          {t("daysLabel")} <span className="text-red-500">*</span>
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
          {t("budgetLabel")} <span className="text-red-500">*</span>
        </span>
        <div className="grid grid-cols-3 gap-2">
          {budgetOptions.map((opt) => (
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
        className="w-full px-6 py-3.5 bg-[var(--brand-primary)] text-white font-medium rounded-md hover:opacity-90 transition"
      >
        {t("submit")}
      </button>
    </form>
  );
}

const inputClass =
  "w-full px-4 py-2.5 bg-white border border-[var(--border-light)] rounded-md text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition";
