"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TravelerType,
  Interest,
  BudgetTier,
  Pace,
} from "../../../types/trip-plan";

interface PlanFormProps {
  defaultDestination: string;
  defaultCountry: string;
  defaultOrigin: string;
}

const TRAVELER_OPTIONS: { value: TravelerType; label: string; hint: string }[] = [
  { value: "solo", label: "Solo", hint: "Just me" },
  { value: "couple", label: "Couple", hint: "Two adults" },
  { value: "family-with-kids", label: "Family with kids", hint: "Adults + children" },
  { value: "group-of-friends", label: "Group of friends", hint: "3+ adults" },
  { value: "senior", label: "Senior", hint: "Easier pace, accessibility" },
];

const INTEREST_OPTIONS: { value: Interest; label: string }[] = [
  { value: "food", label: "Food" },
  { value: "culture", label: "Culture" },
  { value: "history", label: "History" },
  { value: "nature", label: "Nature" },
  { value: "shopping", label: "Shopping" },
  { value: "nightlife", label: "Nightlife" },
  { value: "adventure", label: "Adventure" },
  { value: "relaxation", label: "Relaxation" },
  { value: "photography", label: "Photography" },
];

const BUDGET_OPTIONS: { value: BudgetTier; label: string; hint: string }[] = [
  { value: "budget", label: "Budget", hint: "Hostels, street food, public transit" },
  { value: "midrange", label: "Mid-range", hint: "4-star hotels, sit-down meals" },
  { value: "luxury", label: "Luxury", hint: "5-star, fine dining, private transit" },
];

const PACE_OPTIONS: { value: Pace; label: string; hint: string }[] = [
  { value: "relaxed", label: "Relaxed", hint: "3-4 stops/day, late starts" },
  { value: "balanced", label: "Balanced", hint: "5-6 stops/day" },
  { value: "packed", label: "Packed", hint: "7-9 stops/day, early starts" },
];

export default function PlanForm({
  defaultDestination,
  defaultCountry,
  defaultOrigin,
}: PlanFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [destination, setDestination] = useState(defaultDestination);
  const [destinationCountry, setDestinationCountry] = useState(defaultCountry);
  const [origin] = useState(defaultOrigin);
  const [durationDays, setDurationDays] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [arrivalTerminal, setArrivalTerminal] = useState("");
  const [travelerType, setTravelerType] = useState<TravelerType>("couple");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState("");
  const [interests, setInterests] = useState<Interest[]>(["food", "culture"]);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("midrange");
  const [pace, setPace] = useState<Pace>("balanced");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const toggleInterest = (i: Interest) => {
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : prev.length < 6 ? [...prev, i] : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const ages = childrenAges
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !Number.isNaN(n));

    const payload = {
      destination: destination.trim(),
      destinationCountry: destinationCountry.trim() || destination.trim(),
      origin: origin.trim() || undefined,
      durationDays,
      startDate: startDate || undefined,
      arrivalAirport: arrivalAirport.trim(),
      arrivalTerminal: arrivalTerminal.trim() || undefined,
      travelerType,
      adults,
      children,
      childrenAges: ages.length ? ages : undefined,
      interests,
      budgetTier,
      pace,
      email: email.trim(),
      notes: notes.trim() || undefined,
    };

    try {
      const res = await fetch("/api/plan/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save plan");
      }
      const { id } = await res.json();

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "plan_draft_created", {
          event_category: "trip_planner",
          event_label: destination,
        });
      }

      router.push(`/plan/${id}/preview`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 space-y-8"
    >
      {/* Section: Destination */}
      <Section title="Destination" subtitle="Where are you going?">
        <Field label="City or area" required>
          <input
            type="text"
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Tokyo"
            className={inputClass}
          />
        </Field>
        <Field label="Country">
          <input
            type="text"
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
            placeholder="e.g. Japan"
            className={inputClass}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Trip length (days)" required>
            <input
              type="number"
              required
              min={1}
              max={30}
              value={durationDays}
              onChange={(e) => setDurationDays(parseInt(e.target.value, 10) || 1)}
              className={inputClass}
            />
          </Field>
          <Field label="Start date (optional)">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      {/* Section: Arrival */}
      <Section title="Arrival" subtitle="Where do you land? This shapes the hotel pick.">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Airport" required>
            <input
              type="text"
              required
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
              placeholder="e.g. NRT or Narita"
              className={inputClass}
            />
          </Field>
          <Field label="Terminal (optional)">
            <input
              type="text"
              value={arrivalTerminal}
              onChange={(e) => setArrivalTerminal(e.target.value)}
              placeholder="e.g. T1"
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      {/* Section: Travelers */}
      <Section title="Who's traveling?" subtitle="We adjust the plan for your group.">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TRAVELER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setTravelerType(opt.value)}
              className={chipClass(travelerType === opt.value)}
            >
              <span className="font-semibold text-body-sm">{opt.label}</span>
              <span className="block text-caption opacity-70 mt-0.5">{opt.hint}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Adults">
            <input
              type="number"
              min={1}
              max={20}
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value, 10) || 1)}
              className={inputClass}
            />
          </Field>
          <Field label="Children">
            <input
              type="number"
              min={0}
              max={20}
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value, 10) || 0)}
              className={inputClass}
            />
          </Field>
        </div>
        {children > 0 && (
          <Field label="Children ages (comma separated)">
            <input
              type="text"
              value={childrenAges}
              onChange={(e) => setChildrenAges(e.target.value)}
              placeholder="e.g. 4, 7"
              className={inputClass}
            />
          </Field>
        )}
      </Section>

      {/* Section: Style */}
      <Section title="Trip style" subtitle="Pick up to 6 interests.">
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleInterest(opt.value)}
              className={`px-4 py-2 rounded-full text-body-sm font-medium border transition cursor-pointer ${
                interests.includes(opt.value)
                  ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)]"
                  : "bg-[var(--surface-primary)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-[var(--text-muted)]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <Field label="Budget" required>
          <div className="grid grid-cols-3 gap-2">
            {BUDGET_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setBudgetTier(opt.value)}
                className={chipClass(budgetTier === opt.value)}
              >
                <span className="font-semibold text-body-sm">{opt.label}</span>
                <span className="block text-caption opacity-70 mt-0.5">{opt.hint}</span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Pace" required>
          <div className="grid grid-cols-3 gap-2">
            {PACE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPace(opt.value)}
                className={chipClass(pace === opt.value)}
              >
                <span className="font-semibold text-body-sm">{opt.label}</span>
                <span className="block text-caption opacity-70 mt-0.5">{opt.hint}</span>
              </button>
            ))}
          </div>
        </Field>
      </Section>

      {/* Section: Contact */}
      <Section title="Where to send it" subtitle="We'll email your plan as a PDF.">
        <Field label="Email" required>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>
        <Field label="Anything special? (optional)">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="e.g. vegetarian, mobility issues, must visit Studio Ghibli, etc."
            className={inputClass}
          />
        </Field>
      </Section>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-4 text-body-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-4 bg-[var(--text-primary)] text-[var(--background)] font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition"
      >
        {submitting ? "Saving..." : "Continue to checkout →"}
      </button>
      <p className="text-center text-caption text-[var(--text-muted)]">
        $4 · Mobile web link + PDF · Delivered in minutes after payment
      </p>
    </form>
  );
}

const inputClass =
  "w-full px-4 py-2.5 bg-[var(--background)] border border-[var(--border-light)] rounded-xl text-body-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/40 transition";

function chipClass(active: boolean) {
  return `px-3 py-2.5 rounded-xl text-left border transition cursor-pointer ${
    active
      ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)]"
      : "bg-[var(--surface-primary)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-[var(--text-muted)]"
  }`;
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-body-lg font-semibold text-[var(--text-primary)]">{title}</h2>
        <p className="text-caption text-[var(--text-muted)]">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-caption font-semibold text-[var(--text-secondary)] mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}

