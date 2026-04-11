"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LaborIllusionLog from "../../../components/LaborIllusionLog";
import TravelTrivia from "../../../components/TravelTrivia";
import QuestionPopup, { type QuestionDef } from "../../../components/QuestionPopup";
import type {
  TravelerType,
  Interest,
  BudgetTier,
  Pace,
} from "../../../types/trip-plan";

interface WizardData {
  destination: string;
  destinationCountry: string;
  durationDays: number;
  budgetTier: BudgetTier;
  travelerType?: TravelerType;
  adults?: number;
  children?: number;
  childrenAges?: number[];
  strollerNeeded?: boolean;
  hasInfant?: boolean;
  arrivalAirport?: string;
  hotelBooked?: boolean;
  hotelName?: string;
  interests?: Interest[];
  pace?: Pace;
  email?: string;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function LoadingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<WizardData>(() => ({
    destination: searchParams.get("dest") ?? "",
    destinationCountry: searchParams.get("country") ?? searchParams.get("dest") ?? "",
    durationDays: parseInt(searchParams.get("days") ?? "5", 10) || 5,
    budgetTier: (searchParams.get("budget") as BudgetTier) || "midrange",
  }));

  const [questionIndex, setQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<QuestionDef | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bail if user landed here without a destination
  useEffect(() => {
    if (!data.destination) {
      router.replace("/plan/new");
    }
  }, [data.destination, router]);

  // Build queue dynamically — depends on current data so adapts as user answers
  const questions = buildQuestionQueue(data);

  // Schedule next popup
  useEffect(() => {
    if (submitting) return;
    if (questionIndex >= questions.length) return; // submission handled separately
    const delay = questionIndex === 0 ? 2500 : 3500;
    const timer = setTimeout(() => {
      setActiveQuestion(questions[questionIndex]);
    }, delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex, questions.length, submitting]);

  const handleAnswer = (value: unknown) => {
    const currentQ = questions[questionIndex];
    setActiveQuestion(null);
    const newData = applyAnswer(data, currentQ, value);
    setData(newData);

    // Recompute queue with new data and decide if we're done
    const newQueue = buildQuestionQueue(newData);
    const newIndex = questionIndex + 1;
    setQuestionIndex(newIndex);

    if (newIndex >= newQueue.length) {
      // Brief "finalizing" pause then submit
      setTimeout(() => void doSubmit(newData), 1800);
    }
  };

  const handleSkip = () => handleAnswer(null);

  const doSubmit = async (finalData: WizardData) => {
    setSubmitting(true);
    setError(null);
    try {
      // Validate required fields
      if (
        !finalData.travelerType ||
        !finalData.adults ||
        !finalData.arrivalAirport ||
        !finalData.interests?.length ||
        !finalData.pace ||
        !finalData.email
      ) {
        throw new Error("Some answers are missing — please refresh and try again.");
      }

      const payload = {
        destination: finalData.destination,
        destinationCountry: finalData.destinationCountry || finalData.destination,
        durationDays: finalData.durationDays,
        arrivalAirport: finalData.arrivalAirport,
        travelerType: finalData.travelerType,
        adults: finalData.adults,
        children: finalData.children ?? 0,
        childrenAges: finalData.childrenAges,
        strollerNeeded: finalData.strollerNeeded,
        hasInfant: finalData.childrenAges?.some((a) => a <= 2),
        hotelBooked: finalData.hotelBooked,
        hotelName: finalData.hotelName,
        interests: finalData.interests,
        budgetTier: finalData.budgetTier,
        pace: finalData.pace,
        email: finalData.email,
      };

      const draftRes = await fetch("/api/plan/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!draftRes.ok) {
        const body = await draftRes.json().catch(() => ({}));
        throw new Error(body.error || "Failed to save your plan");
      }
      const { id } = await draftRes.json();

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "plan_draft_created", {
          event_category: "trip_planner",
          event_label: finalData.destination,
        });
      }

      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: id }),
      });
      if (!checkoutRes.ok) {
        const body = await checkoutRes.json().catch(() => ({}));
        throw new Error(body.error || "Failed to start checkout");
      }
      const { url } = await checkoutRes.json();

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "begin_checkout", {
          event_category: "trip_planner",
          value: 4,
          currency: "USD",
        });
      }

      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (!data.destination) {
    return null; // redirect in flight
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-caption font-semibold text-brand-700 dark:text-brand-300 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse-slow" />
            AI is analyzing your trip
          </p>
          <h1 className="text-display-lg text-[var(--text-primary)]">
            Building your {data.destination} plan
          </h1>
          <p className="text-body-md text-[var(--text-secondary)] mt-3 max-w-lg mx-auto">
            We&rsquo;re cross-referencing thousands of data points. While you wait, answer a few
            quick questions so we can tailor it to you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <LaborIllusionLog
            destination={data.destination}
            airport={data.arrivalAirport}
            durationDays={data.durationDays}
            travelerType={data.travelerType}
          />
          <TravelTrivia destinationCountry={data.destinationCountry} />
        </div>

        {error && (
          <div className="mt-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl p-4 text-body-sm text-red-700 dark:text-red-400">
            {error}
            <button
              onClick={() => router.push("/plan/new")}
              className="block mt-2 text-body-sm underline"
            >
              Start over
            </button>
          </div>
        )}

        {submitting && !error && (
          <p className="text-center text-body-sm text-[var(--text-muted)] mt-6">
            Redirecting to secure checkout…
          </p>
        )}
      </div>

      {activeQuestion && (
        <QuestionPopup
          question={activeQuestion}
          onAnswer={handleAnswer}
          onSkip={activeQuestion.optional ? handleSkip : undefined}
        />
      )}
    </div>
  );
}

export default function LoadingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <LoadingInner />
    </Suspense>
  );
}

// ─────────────────────────────────────────
// Question queue + answer application
// ─────────────────────────────────────────

function buildQuestionQueue(data: WizardData): QuestionDef[] {
  const queue: QuestionDef[] = [];

  queue.push({
    id: "travelerType",
    title: "Who's going on this trip?",
    type: "single-chip",
    options: [
      { value: "solo", label: "Solo", hint: "Just me" },
      { value: "couple", label: "Couple", hint: "Two adults" },
      { value: "family-with-kids", label: "Family", hint: "Adults + kids" },
      { value: "group-of-friends", label: "Friends", hint: "3+ adults" },
      { value: "senior", label: "Senior", hint: "Easier pace" },
    ],
  });

  // Adults — only ask if traveler type doesn't imply count
  if (data.travelerType && !["solo", "couple"].includes(data.travelerType)) {
    queue.push({
      id: "adults",
      title: "How many adults?",
      type: "number",
      placeholder: "e.g. 4",
    });
  }

  if (data.travelerType === "family-with-kids") {
    queue.push({
      id: "children",
      title: "How many kids, and how old?",
      subtitle: "Ages help us pick the right pace and stops.",
      type: "number+text",
      numberLabel: "Number of kids",
      textLabel: "Ages",
      placeholder: "e.g. 4, 7",
    });

    if ((data.children ?? 0) > 0) {
      queue.push({
        id: "stroller",
        title: "Will you need a stroller?",
        subtitle: "We'll pick step-free routes if so.",
        type: "yes-no",
      });
    }
  }

  queue.push({
    id: "airport",
    title: "Which airport will you fly into?",
    subtitle: "We'll pick a hotel close to your terminal.",
    type: "text",
    placeholder: "e.g. NRT or Narita",
  });

  queue.push({
    id: "hotelBooked",
    title: "Have you already booked a hotel?",
    type: "yes-no",
  });

  if (data.hotelBooked === true) {
    queue.push({
      id: "hotelName",
      title: "Where are you staying?",
      subtitle: "Just the name — we'll route around it.",
      type: "text",
      placeholder: "e.g. Park Hyatt Tokyo",
      optional: true,
    });
  }

  queue.push({
    id: "interests",
    title: "What are you most into?",
    subtitle: "Pick up to 6.",
    type: "multi-chip",
    minSelections: 1,
    maxSelections: 6,
    options: [
      { value: "food", label: "Food" },
      { value: "culture", label: "Culture" },
      { value: "history", label: "History" },
      { value: "nature", label: "Nature" },
      { value: "shopping", label: "Shopping" },
      { value: "nightlife", label: "Nightlife" },
      { value: "adventure", label: "Adventure" },
      { value: "relaxation", label: "Relaxation" },
      { value: "photography", label: "Photography" },
    ],
  });

  queue.push({
    id: "pace",
    title: "How fast do you want to move?",
    type: "single-chip",
    options: [
      { value: "relaxed", label: "Relaxed", hint: "3-4 stops/day" },
      { value: "balanced", label: "Balanced", hint: "5-6 stops/day" },
      { value: "packed", label: "Packed", hint: "7-9 stops/day" },
    ],
  });

  queue.push({
    id: "email",
    title: "Where should we send your plan?",
    subtitle: "We'll email the secret link + PDF.",
    type: "email",
    placeholder: "you@example.com",
  });

  return queue;
}

function applyAnswer(prev: WizardData, q: QuestionDef, value: unknown): WizardData {
  switch (q.id) {
    case "travelerType": {
      const t = value as TravelerType;
      return {
        ...prev,
        travelerType: t,
        adults: t === "solo" ? 1 : t === "couple" ? 2 : prev.adults,
      };
    }
    case "adults":
      return { ...prev, adults: value as number };
    case "children": {
      const combo = value as { count: number; detail: string };
      const ages = combo.detail
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !Number.isNaN(n));
      return {
        ...prev,
        children: combo.count,
        childrenAges: ages.length ? ages : undefined,
        hasInfant: ages.some((a) => a <= 2),
      };
    }
    case "stroller":
      return { ...prev, strollerNeeded: value as boolean };
    case "airport":
      return { ...prev, arrivalAirport: value as string };
    case "hotelBooked":
      return { ...prev, hotelBooked: value as boolean };
    case "hotelName":
      return { ...prev, hotelName: (value as string) || undefined };
    case "interests":
      return { ...prev, interests: value as Interest[] };
    case "pace":
      return { ...prev, pace: value as Pace };
    case "email":
      return { ...prev, email: value as string };
    default:
      return prev;
  }
}
