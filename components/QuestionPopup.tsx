"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export interface QuestionDef {
  id: string;
  title: string;
  subtitle?: string;
  /** Type drives the input UI. */
  type: "single-chip" | "multi-chip" | "number" | "text" | "yes-no" | "date" | "email" | "number+text";
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

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={submit}
            className="flex-1 px-5 py-3 bg-[var(--text-primary)] text-[var(--background)] font-semibold rounded-xl hover:opacity-90 disabled:opacity-40 transition"
          >
            Continue →
          </button>
          {question.optional && onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="px-5 py-3 text-[var(--text-muted)] font-medium hover:text-[var(--text-secondary)] transition"
            >
              Skip
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
