"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { searchAirports, type AirportOption } from "../lib/airports";

export interface QuestionDef {
  id: string;
  title: string;
  subtitle?: string;
  /** Type drives the input UI. */
  type:
    | "single-chip"
    | "multi-chip"
    | "number"
    | "text"
    | "yes-no"
    | "date"
    | "email"
    | "number+text"
    | "airport";
  /** For chip types. */
  options?: { value: string; label: string; hint?: string }[];
  /** For multi-chip — max selections allowed. */
  maxSelections?: number;
  /** For multi-chip — min required. */
  minSelections?: number;
  /** Optional placeholder for text inputs. */
  placeholder?: string;
  /** Skippable optional questions. */
  optional?: boolean;
  /** For number+text combo (e.g. children + ages). */
  numberLabel?: string;
  textLabel?: string;
}

interface QuestionPopupProps {
  question: QuestionDef;
  onAnswer: (value: unknown) => void;
  onSkip?: () => void;
  /** Walk the user back to the previous question and restore the pre-
   *  answer data snapshot. Omitted on the very first question (no prior
   *  state to return to). */
  onBack?: () => void;
  /** 1-based current question number; used for the playful progress callout. */
  questionNumber?: number;
  /** Total questions in the queue; together with questionNumber drives the "last question" tease. */
  totalQuestions?: number;
}

/**
 * Single-question modal overlay used inside the labor-illusion loading screen.
 * Centered, blocking, with a single primary CTA. Designed to feel like a fun
 * mid-loading "20 questions" — not a chore.
 *
 * Parent should pass `key={question.id}` so React remounts (and resets all
 * input state) when the question changes — that's why this component does
 * not need a useEffect to reset state.
 */
export default function QuestionPopup({
  question,
  onAnswer,
  onSkip,
  onBack,
  questionNumber,
  totalQuestions,
}: QuestionPopupProps) {
  const tp = useTranslations("wizard.popup");
  // Progress callout — emoji-free per design system; localized via tp.
  const progressLabel = (() => {
    if (!questionNumber || !totalQuestions) return null;
    if (questionNumber === totalQuestions) return tp("progressLast");
    if (questionNumber === totalQuestions - 1) return tp("progressAlmost");
    if (questionNumber === 1) return tp("progressStart");
    if (questionNumber === Math.ceil(totalQuestions / 2)) return tp("progressHalfway");
    return tp("progressOf", { current: questionNumber, total: totalQuestions });
  })();
  const [singleValue, setSingleValue] = useState<string | null>(null);
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [numberValue, setNumberValue] = useState<number | "">("");
  const [textValue, setTextValue] = useState("");
  const [yesNoValue, setYesNoValue] = useState<boolean | null>(null);
  // Airport autocomplete state — separate from textValue so the dropdown
  // can show even when the input is "ICN" (a valid pick) and not just
  // when the user types a fragment.
  const [airportFocused, setAirportFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const airportSuggestions = useMemo(
    () => (question.type === "airport" ? searchAirports(textValue, 6) : []),
    [question.type, textValue],
  );

  const canSubmit = (() => {
    if (question.optional) return true;
    switch (question.type) {
      case "single-chip":
        return singleValue !== null;
      case "multi-chip":
        return multiValue.length >= (question.minSelections ?? 1);
      case "number":
        return typeof numberValue === "number" && numberValue > 0;
      case "text":
      case "airport":
        return textValue.trim().length > 0;
      case "yes-no":
        return yesNoValue !== null;
      case "date":
        return textValue.length > 0;
      case "email":
        return /\S+@\S+\.\S+/.test(textValue);
      case "number+text":
        return typeof numberValue === "number" && numberValue >= 0;
    }
  })();

  const submit = () => {
    switch (question.type) {
      case "single-chip":
        onAnswer(singleValue);
        break;
      case "multi-chip":
        onAnswer(multiValue);
        break;
      case "number":
        onAnswer(numberValue);
        break;
      case "text":
      case "airport":
      case "date":
      case "email":
        onAnswer(textValue.trim());
        break;
      case "yes-no":
        onAnswer(yesNoValue);
        break;
      case "number+text":
        onAnswer({ count: numberValue, detail: textValue.trim() });
        break;
    }
  };

  function pickAirport(idx: number) {
    const a = airportSuggestions[idx];
    if (!a) return;
    // Submit the IATA code — that's what the generator's prompt expects
    // (rule 12 references "{airport}" as the code, e.g. "Arrival · NRT").
    setTextValue(a.code);
    setAirportFocused(false);
    setActiveSuggestion(0);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-7 shadow-2xl">
        {progressLabel && (
          <p className="text-caption uppercase tracking-[0.16em] text-[var(--accent-primary)] font-semibold mb-3">
            {progressLabel}
          </p>
        )}
        <h3 className="text-display-sm font-bold text-[var(--text-primary)]">{question.title}</h3>
        {question.subtitle && (
          <p className="text-body-sm text-[var(--text-secondary)] mt-1">{question.subtitle}</p>
        )}

        <div className="mt-5">
          {question.type === "single-chip" && question.options && (
            <div className="grid grid-cols-2 gap-2">
              {question.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSingleValue(opt.value)}
                  className={chipClass(singleValue === opt.value)}
                >
                  <span className="font-semibold text-body-sm block">{opt.label}</span>
                  {opt.hint && (
                    <span className="block text-caption opacity-70 mt-0.5">{opt.hint}</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {question.type === "multi-chip" && question.options && (
            <>
              <div className="flex flex-wrap gap-2">
                {question.options.map((opt) => {
                  const active = multiValue.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setMultiValue((prev) =>
                          active
                            ? prev.filter((v) => v !== opt.value)
                            : prev.length < (question.maxSelections ?? 99)
                              ? [...prev, opt.value]
                              : prev,
                        )
                      }
                      className={`px-4 py-2 rounded-full text-body-sm font-medium border transition cursor-pointer ${
                        active
                          ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)]"
                          : "bg-[var(--surface-primary)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-[var(--text-muted)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-caption text-[var(--text-muted)] mt-2">
                Pick up to {question.maxSelections ?? "any"}
              </p>
            </>
          )}

          {question.type === "number" && (
            <input
              type="number"
              min={1}
              value={numberValue}
              onChange={(e) => setNumberValue(parseInt(e.target.value, 10) || "")}
              placeholder={question.placeholder}
              className={inputClass}
              autoFocus
            />
          )}

          {question.type === "text" && (
            <input
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder={question.placeholder}
              className={inputClass}
              autoFocus
            />
          )}

          {question.type === "airport" && (
            <div className="relative">
              <input
                type="text"
                value={textValue}
                onChange={(e) => {
                  setTextValue(e.target.value);
                  setActiveSuggestion(0);
                }}
                onFocus={() => setAirportFocused(true)}
                onBlur={() => setTimeout(() => setAirportFocused(false), 120)}
                onKeyDown={(e) => {
                  if (!airportFocused || airportSuggestions.length === 0) return;
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActiveSuggestion((i) =>
                      Math.min(i + 1, airportSuggestions.length - 1),
                    );
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActiveSuggestion((i) => Math.max(i - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    pickAirport(activeSuggestion);
                  } else if (e.key === "Escape") {
                    setAirportFocused(false);
                  }
                }}
                placeholder={question.placeholder}
                className={inputClass}
                autoFocus
                autoComplete="off"
              />
              {airportFocused && airportSuggestions.length > 0 && (
                <ul
                  role="listbox"
                  className="absolute left-0 right-0 top-full mt-1 z-10 bg-white border border-[var(--border-light)] rounded-md shadow-lg overflow-hidden max-h-72 overflow-y-auto"
                >
                  {airportSuggestions.map((a: AirportOption, i) => (
                    <li
                      key={a.code}
                      role="option"
                      aria-selected={i === activeSuggestion}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        pickAirport(i);
                      }}
                      onMouseEnter={() => setActiveSuggestion(i)}
                      className={`px-3 py-2.5 cursor-pointer flex items-baseline justify-between gap-3 ${
                        i === activeSuggestion
                          ? "bg-[var(--surface-secondary)]"
                          : "bg-white"
                      }`}
                    >
                      <div className="flex items-baseline gap-2 min-w-0">
                        <span className="text-caption font-bold text-[var(--brand-primary)] tabular-nums shrink-0">
                          {a.code}
                        </span>
                        <span className="text-body-sm text-[var(--text-primary)] truncate">
                          {a.name}
                        </span>
                      </div>
                      <span className="text-caption text-[var(--text-muted)] shrink-0">
                        {a.city}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {question.type === "date" && (
            <input
              type="date"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              className={inputClass}
              autoFocus
            />
          )}

          {question.type === "email" && (
            <input
              type="email"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder={question.placeholder ?? "you@example.com"}
              className={inputClass}
              autoFocus
            />
          )}

          {question.type === "yes-no" && (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setYesNoValue(true)}
                className={chipClass(yesNoValue === true)}
              >
                <span className="font-semibold text-body-md block">Yes</span>
              </button>
              <button
                type="button"
                onClick={() => setYesNoValue(false)}
                className={chipClass(yesNoValue === false)}
              >
                <span className="font-semibold text-body-md block">No</span>
              </button>
            </div>
          )}

          {question.type === "number+text" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-caption font-semibold text-[var(--text-secondary)] mb-1.5 block">
                  {question.numberLabel ?? "Number"}
                </label>
                <input
                  type="number"
                  min={0}
                  value={numberValue}
                  onChange={(e) => setNumberValue(parseInt(e.target.value, 10) || 0)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-caption font-semibold text-[var(--text-secondary)] mb-1.5 block">
                  {question.textLabel ?? "Detail"}
                </label>
                <input
                  type="text"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder={question.placeholder}
                  className={inputClass}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-3">
          {/* Back button — only visible past the first question. The arrow
              points at where we're going (the previous question), the
              text stays neutral. Subdued styling so it doesn't compete
              with the primary Continue CTA. */}
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-3 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition flex items-center gap-1"
              aria-label={tp("back")}
            >
              <span aria-hidden>←</span>
              <span className="text-body-sm font-medium">{tp("back")}</span>
            </button>
          )}
          <button
            type="button"
            disabled={!canSubmit}
            onClick={submit}
            className="flex-1 px-5 py-3 bg-[var(--text-primary)] text-[var(--background)] font-semibold rounded-xl hover:opacity-90 disabled:opacity-40 transition"
          >
            {tp("continue")}
          </button>
          {question.optional && onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="px-5 py-3 text-[var(--text-muted)] font-medium hover:text-[var(--text-secondary)] transition"
            >
              {tp("skip")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border-light)] rounded-xl text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/40 transition";

function chipClass(active: boolean) {
  return `px-4 py-3 rounded-xl text-left border transition cursor-pointer ${
    active
      ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)]"
      : "bg-[var(--surface-primary)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-[var(--text-muted)]"
  }`;
}
