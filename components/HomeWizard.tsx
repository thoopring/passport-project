"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { searchCities, getCityDisplayName, getCityDisplayCountry } from "../lib/cities";
import { analytics } from "../lib/analytics";
import type { Locale } from "../i18n/locales";
import EmailCaptureGate from "./EmailCaptureGate";

type StepKey =
  | "destination"
  | "travelerType"
  | "days"
  | "budget";

const ORDER: StepKey[] = [
  "destination",
  "travelerType",
  "days",
  "budget",
];

type TravelerUI = "solo" | "couple" | "family" | "friends";
type BudgetUI = "budget" | "midrange" | "luxury";

interface Answers {
  destination: string;
  destinationCountry: string;
  travelerType: TravelerUI | null;
  days: number | null;
  budget: BudgetUI | null;
}

const POPULAR: { key: string; dest: string; country: string }[] = [
  { key: "tokyo", dest: "Tokyo", country: "Japan" },
  { key: "paris", dest: "Paris", country: "France" },
  { key: "bangkok", dest: "Bangkok", country: "Thailand" },
  { key: "seoul", dest: "Seoul", country: "South Korea" },
  { key: "barcelona", dest: "Barcelona", country: "Spain" },
  { key: "istanbul", dest: "Istanbul", country: "Turkey" },
];

const DAY_CHIPS = [2, 3, 4, 5, 7, 10];

function mapTravelerType(u: TravelerUI | null): string | null {
  if (u === "solo") return "solo";
  if (u === "couple") return "couple";
  if (u === "family") return "family-with-kids";
  if (u === "friends") return "group-of-friends";
  return null;
}

// gtag/dataLayer types are declared in lib/analytics.ts

export default function HomeWizard() {
  const t = useTranslations("homeWizard");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    destination: "",
    destinationCountry: "",
    travelerType: null,
    days: null,
    budget: null,
  });
  const [animating, setAnimating] = useState(false);
  const [customDays, setCustomDays] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  // Holds the built query string while the full-screen email gate is shown.
  // The redirect to /plan/loading fires once the email is captured.
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  // Autocomplete UI state for the destination step
  const [destFocused, setDestFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  // Filter the curated city list by the current destination input.
  // Empty until the user types — initial state is the popular-cities chips.
  const suggestions = useMemo(() => {
    return searchCities(answers.destination, 6);
  }, [answers.destination]);
  const showSuggestions =
    destFocused && answers.destination.trim().length > 0 && suggestions.length > 0;

  const currentStep = ORDER[stepIdx];
  const destInputRef = useRef<HTMLInputElement>(null);
  const customDaysRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (animating) return;
    if (currentStep === "destination") destInputRef.current?.focus();
  }, [currentStep, animating]);

  function advance() {
    if (stepIdx >= ORDER.length - 1) return submit();
    setAnimating(true);
    setTimeout(() => {
      setStepIdx((i) => i + 1);
      setAnimating(false);
    }, 140);
  }

  function back() {
    if (stepIdx <= 0) return;
    setAnimating(true);
    setTimeout(() => {
      setStepIdx((i) => i - 1);
      setAnimating(false);
    }, 140);
  }

  function submit() {
    if (submitting) return;
    setSubmitting(true);
    const params = new URLSearchParams();
    params.set("dest", answers.destination);
    params.set("country", answers.destinationCountry || answers.destination);
    if (answers.days) params.set("days", String(answers.days));
    if (answers.budget) params.set("budget", answers.budget);
    const mapped = mapTravelerType(answers.travelerType);
    if (mapped) params.set("travelerType", mapped);

    analytics.wizardStarted({
      locale,
      destination: answers.destination,
      source: "home",
    });

    // Capture the delivery email full-screen before sending the user into the
    // loading screen. The redirect happens in the gate's onSubmit.
    setPendingQuery(params.toString());
  }

  // Summary of previously-answered steps
  const summaryParts: string[] = [];
  if (stepIdx > 0 && answers.destination) summaryParts.push(answers.destination);
  if (stepIdx > 1 && answers.travelerType)
    summaryParts.push(t(`travelerType.${answers.travelerType}`));
  if (stepIdx > 2 && answers.days)
    summaryParts.push(`${answers.days}${t("days.unit")}`);
  if (stepIdx > 3 && answers.budget)
    summaryParts.push(t(`budget.${answers.budget}`));
  const summary = summaryParts.join(" · ");

  if (pendingQuery !== null) {
    return (
      <EmailCaptureGate
        onSubmit={(email) => {
          const params = new URLSearchParams(pendingQuery);
          params.set("email", email);
          router.push(`/plan/loading?${params.toString()}`);
        }}
        onBack={() => {
          setPendingQuery(null);
          setSubmitting(false);
        }}
      />
    );
  }

  return (
    <div>
      {/* Progress bars */}
      <div className="flex gap-1.5 mb-6" aria-hidden>
        {ORDER.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full flex-1 transition-colors duration-200 ${
              i <= stepIdx ? "bg-[var(--brand-primary)]" : "bg-[var(--border-light)]"
            }`}
          />
        ))}
      </div>

      {/* Back + summary */}
      <div className="flex items-center gap-3 mb-6 min-h-[22px]">
        {stepIdx > 0 ? (
          <button
            type="button"
            onClick={back}
            className="text-body-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition inline-flex items-center gap-1"
          >
            <span aria-hidden>←</span>
            {t("back")}
          </button>
        ) : (
          <div className="w-0" />
        )}
        {summary && (
          <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] truncate">
            {summary}
          </p>
        )}
      </div>

      {/* Step content */}
      <div
        className={`transition-all duration-150 ease-out ${
          animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {currentStep === "destination" && (
          <StepBlock question={t("destination.question")}>
            <div className="relative">
              <input
                ref={destInputRef}
                type="text"
                value={answers.destination}
                onChange={(e) => {
                  const v = e.target.value;
                  setAnswers((a) => ({
                    ...a,
                    destination: v,
                    destinationCountry: "", // clear when typing custom
                  }));
                  setActiveSuggestion(0);
                }}
                onFocus={() => setDestFocused(true)}
                onBlur={() => {
                  // Delay to allow mousedown on suggestion to register
                  setTimeout(() => setDestFocused(false), 150);
                }}
                onKeyDown={(e) => {
                  if (showSuggestions) {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setActiveSuggestion((i) => Math.min(i + 1, suggestions.length - 1));
                      return;
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setActiveSuggestion((i) => Math.max(i - 1, 0));
                      return;
                    }
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const pick = suggestions[activeSuggestion];
                      setAnswers((a) => ({
                        ...a,
                        destination: pick.name,
                        destinationCountry: pick.country,
                      }));
                      setDestFocused(false);
                      advance();
                      return;
                    }
                    if (e.key === "Escape") {
                      setDestFocused(false);
                      return;
                    }
                  }
                  if (e.key === "Enter" && answers.destination.trim()) advance();
                }}
                placeholder={t("destination.placeholder")}
                autoComplete="off"
                className="w-full px-5 py-4 bg-white border border-[var(--border-light)] rounded-[12px] text-[1.125rem] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
              />

              {showSuggestions && (
                <div className="absolute z-20 left-0 right-0 mt-2 bg-white border border-[var(--border-light)] rounded-[12px] shadow-card overflow-hidden">
                  {suggestions.map((c, i) => {
                    const displayName = getCityDisplayName(c, locale);
                    const displayCountry = getCityDisplayCountry(c, locale);
                    return (
                      <button
                        key={`${c.name}-${c.country}`}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setAnswers((a) => ({
                            ...a,
                            // Store the user's locale-specific name so the
                            // input + downstream prompt match what they saw.
                            destination: displayName,
                            destinationCountry: displayCountry,
                          }));
                          setDestFocused(false);
                          advance();
                        }}
                        onMouseEnter={() => setActiveSuggestion(i)}
                        className={`w-full flex items-baseline justify-between gap-3 px-4 py-3 text-left transition ${
                          i === activeSuggestion
                            ? "bg-[var(--accent-soft)]"
                            : "hover:bg-[var(--surface-secondary)]"
                        }`}
                      >
                        <span className="text-body-md text-[var(--text-primary)] font-medium">
                          {displayName}
                        </span>
                        <span className="text-body-sm text-[var(--text-muted)] shrink-0">
                          {displayCountry}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-5">
              <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-3">
                {t("destination.popular")}
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => {
                      setAnswers((a) => ({
                        ...a,
                        destination: c.dest,
                        destinationCountry: c.country,
                      }));
                      advance();
                    }}
                    className="px-4 py-2 bg-[var(--lavender-soft)] hover:bg-[var(--lavender)] text-[var(--text-primary)] text-body-sm rounded-full transition"
                  >
                    {t(`destination.cities.${c.key}`)}
                  </button>
                ))}
              </div>
            </div>
            <ContinueButton
              onClick={advance}
              disabled={!answers.destination.trim()}
              label={t("continue")}
            />
          </StepBlock>
        )}

        {currentStep === "travelerType" && (
          <StepBlock question={t("travelerType.question")}>
            <div className="grid grid-cols-2 gap-3">
              {(["solo", "couple", "family", "friends"] as TravelerUI[]).map(
                (k) => (
                  <PickButton
                    key={k}
                    selected={answers.travelerType === k}
                    onClick={() => {
                      setAnswers((a) => ({ ...a, travelerType: k }));
                      setTimeout(advance, 180);
                    }}
                  >
                    {t(`travelerType.${k}`)}
                  </PickButton>
                )
              )}
            </div>
          </StepBlock>
        )}

        {currentStep === "days" && (
          <StepBlock question={t("days.question")}>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {DAY_CHIPS.map((n) => (
                <PickButton
                  key={n}
                  selected={answers.days === n}
                  onClick={() => {
                    setAnswers((a) => ({ ...a, days: n }));
                    setCustomDays("");
                    setTimeout(advance, 180);
                  }}
                  compact
                >
                  {n}
                </PickButton>
              ))}
            </div>
            <div className="mt-4">
              <label className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2 block">
                {t("days.customLabel")}
              </label>
              <input
                ref={customDaysRef}
                type="number"
                min={1}
                max={30}
                value={customDays}
                onChange={(e) => {
                  const v = e.target.value;
                  setCustomDays(v);
                  const n = parseInt(v, 10);
                  if (!isNaN(n) && n > 0 && n <= 30) {
                    setAnswers((a) => ({ ...a, days: n }));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && answers.days) advance();
                }}
                placeholder={t("days.unit")}
                className="w-full px-4 py-3 bg-white border border-[var(--border-light)] rounded-[10px] text-body-md text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
              />
            </div>
            <ContinueButton
              onClick={advance}
              disabled={!answers.days || answers.days < 1}
              label={t("continue")}
            />
          </StepBlock>
        )}

        {currentStep === "budget" && (
          <StepBlock question={t("budget.question")}>
            <div className="space-y-3">
              {(["budget", "midrange", "luxury"] as BudgetUI[]).map((k) => (
                <PickButton
                  key={k}
                  selected={answers.budget === k}
                  onClick={() => {
                    setAnswers((a) => ({ ...a, budget: k }));
                    setTimeout(advance, 180);
                  }}
                  fullWidth
                >
                  <div className="text-left">
                    <div className="font-semibold">{t(`budget.${k}`)}</div>
                    <div className="text-body-sm text-[var(--text-secondary)] mt-0.5">
                      {t(`budget.${k}Hint`)}
                    </div>
                  </div>
                </PickButton>
              ))}
            </div>
          </StepBlock>
        )}

      </div>
    </div>
  );
}

// ────────────────────────────────────────
// Sub components
// ────────────────────────────────────────

function StepBlock({
  question,
  subtitle,
  children,
}: {
  question: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display font-semibold text-[1.625rem] sm:text-[2rem] text-[var(--text-primary)] leading-[1.15] mb-2 tracking-[-0.02em]">
        {question}
      </h2>
      {subtitle && (
        <p className="text-body-sm text-[var(--text-secondary)] mb-5">
          {subtitle}
        </p>
      )}
      <div className={subtitle ? "" : "mt-5"}>{children}</div>
    </div>
  );
}

function PickButton({
  selected,
  onClick,
  children,
  fullWidth,
  compact,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  compact?: boolean;
}) {
  const base =
    "border rounded-[10px] transition cursor-pointer text-center font-medium";
  const padding = compact ? "py-3 px-3" : "py-4 px-4";
  const state = selected
    ? "bg-[var(--lavender-soft)] border-[var(--lavender)] text-[var(--text-primary)]"
    : "bg-white border-[var(--border-light)] text-[var(--text-primary)] hover:border-[var(--text-muted)]";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${padding} ${state} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}

function ContinueButton({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-6 w-full px-6 py-3.5 bg-[#1A1A1A] text-white font-medium rounded-md hover:bg-black transition disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
    >
      {label}
      <span aria-hidden="true">→</span>
    </button>
  );
}
