"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import type { BudgetTier } from "../../../types/trip-plan";
import { analytics } from "../../../lib/analytics";
import { searchCities, getCityDisplayCountry, getCityDisplayName } from "../../../lib/cities";
import type { Locale } from "../../../i18n/locales";

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
 *
 * Destination input has city autocomplete from the curated CITIES library
 * (lib/cities). Picking a suggestion fills city + country at once and hides
 * the country field — eliminating both the "is this a city or a country"
 * confusion and the bug where the country field auto-mirrored the first
 * keystroke of the destination input. Country field is only revealed when
 * the user types a name not in the catalog (cold-start travel destinations
 * we don't have curated yet).
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
  const locale = useLocale() as Locale;
  const [destination, setDestination] = useState(defaultDestination);
  const [destinationCountry, setDestinationCountry] = useState(defaultCountry);
  const [durationDays, setDurationDays] = useState(5);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("midrange");
  const [destFocused, setDestFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  // True only when the user explicitly picked a suggestion (or arrived with
  // a defaultDestination). Tells us city+country are coupled and the
  // country field should stay hidden. Free-typed destinations clear this.
  const [pickedFromCatalog, setPickedFromCatalog] = useState<boolean>(
    Boolean(defaultDestination) && Boolean(defaultCountry),
  );
  const destInputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(
    () => searchCities(destination, 6),
    [destination],
  );
  const showSuggestions =
    destFocused && destination.trim().length > 0 && suggestions.length > 0;

  const budgetOptions: { value: BudgetTier; label: string; hint: string }[] = [
    { value: "budget", label: t("budgetBudget"), hint: t("budgetBudgetHint") },
    { value: "midrange", label: t("budgetMidrange"), hint: t("budgetMidrangeHint") },
    { value: "luxury", label: t("budgetLuxury"), hint: t("budgetLuxuryHint") },
  ];

  function selectSuggestion(idx: number) {
    const c = suggestions[idx];
    if (!c) return;
    setDestination(getCityDisplayName(c, locale));
    setDestinationCountry(getCityDisplayCountry(c, locale));
    setPickedFromCatalog(true);
    setDestFocused(false);
    setActiveSuggestion(0);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    const params = new URLSearchParams({
      dest: destination.trim(),
      // Country defaults to the destination only when the user typed a
      // free-form value AND didn't fill the country field. The earlier
      // "auto-mirror first keystroke" bug came from doing this on every
      // input event — now the mirror only happens at submit time.
      country: (destinationCountry.trim() || destination.trim()).trim(),
      days: String(durationDays),
      budget: budgetTier,
    });
    if (defaultOrigin) params.set("origin", defaultOrigin);
    if (defaultPromoCode) params.set("promo", defaultPromoCode);

    analytics.wizardStarted({
      locale,
      destination,
      source: "wizard_page",
    });

    router.push(`/plan/loading?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 space-y-7"
    >
      <div>
        <label className="block relative">
          <span className="block text-caption font-semibold text-[var(--text-secondary)] mb-1.5">
            {t("destinationLabel")} <span className="text-red-500">*</span>
          </span>
          <input
            ref={destInputRef}
            type="text"
            required
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setActiveSuggestion(0);
              // Free-typing breaks the city↔country pairing — re-show
              // the country field so the user can correct it manually.
              setPickedFromCatalog(false);
            }}
            onFocus={() => setDestFocused(true)}
            onBlur={() => {
              // Delay so a click on a suggestion still registers before
              // the dropdown unmounts.
              setTimeout(() => setDestFocused(false), 120);
            }}
            onKeyDown={(e) => {
              if (!showSuggestions) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveSuggestion((i) => Math.min(i + 1, suggestions.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveSuggestion((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                selectSuggestion(activeSuggestion);
              } else if (e.key === "Escape") {
                setDestFocused(false);
              }
            }}
            placeholder={t("destinationPlaceholder")}
            className={inputClass}
            autoFocus={autoFocus}
            autoComplete="off"
          />
          {showSuggestions && (
            <ul
              role="listbox"
              className="absolute left-0 right-0 top-full mt-1 z-20 bg-white border border-[var(--border-light)] rounded-md shadow-lg overflow-hidden"
            >
              {suggestions.map((c, i) => (
                <li
                  key={`${c.name}-${c.country}`}
                  role="option"
                  aria-selected={i === activeSuggestion}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectSuggestion(i);
                  }}
                  onMouseEnter={() => setActiveSuggestion(i)}
                  className={`px-4 py-2.5 cursor-pointer flex items-baseline justify-between gap-3 ${
                    i === activeSuggestion
                      ? "bg-[var(--surface-secondary)]"
                      : "bg-white"
                  }`}
                >
                  <span className="text-body-sm font-medium text-[var(--text-primary)]">
                    {getCityDisplayName(c, locale)}
                  </span>
                  <span className="text-caption text-[var(--text-muted)]">
                    {getCityDisplayCountry(c, locale)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </label>
        {/* Country field shown only when the user free-typed a destination
            we don't have in the curated catalog — the picked-from-catalog
            path keeps both fields in sync without showing the second one. */}
        {!pickedFromCatalog && destination.trim().length > 0 && (
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
              autoComplete="off"
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
                  ? "bg-[var(--lavender-soft)] text-[var(--text-primary)] border-[var(--lavender)]"
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
        className="w-full px-6 py-3.5 bg-[#1A1A1A] text-white font-medium rounded-md hover:bg-black transition"
      >
        {t("submit")}
      </button>
    </form>
  );
}

const inputClass =
  "w-full px-4 py-2.5 bg-white border border-[var(--border-light)] rounded-md text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition";
