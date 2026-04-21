"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import LaborIllusionLog from "../../../components/LaborIllusionLog";
import TravelTrivia from "../../../components/TravelTrivia";
import QuestionPopup, { type QuestionDef } from "../../../components/QuestionPopup";
import type {
  TravelerType,
  Interest,
  BudgetTier,
  Pace,
  TravelStyle,
} from "../../../types/trip-plan";

interface WizardData {
  destination: string;
  destinationCountry: string;
  durationDays: number;
  budgetTier: BudgetTier;
  travelerType?: TravelerType;
  travelStyle?: TravelStyle;
  mustVisit?: string;
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
  promoCode?: string;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function LoadingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("wizard.loading");
  const tp = useTranslations("wizard.popup");

  const [data, setData] = useState<WizardData>(() => {
    const rawTravelerType = searchParams.get("travelerType");
    const allowedTravelerTypes: TravelerType[] = [
      "solo",
      "couple",
      "family-with-kids",
      "group-of-friends",
      "senior",
    ];
    const travelerType =
      rawTravelerType && (allowedTravelerTypes as string[]).includes(rawTravelerType)
        ? (rawTravelerType as TravelerType)
        : undefined;
    const rawStyle = searchParams.get("travelStyle");
    const allowedStyles: TravelStyle[] = ["sightseeing", "relaxation", "mixed"];
    const travelStyle =
      rawStyle && (allowedStyles as string[]).includes(rawStyle)
        ? (rawStyle as TravelStyle)
        : undefined;
    // Pre-set adults count for solo/couple so the popup queue doesn't need to ask
    const adults = travelerType === "solo" ? 1 : travelerType === "couple" ? 2 : undefined;
    return {
      destination: searchParams.get("dest") ?? "",
      destinationCountry: searchParams.get("country") ?? searchParams.get("dest") ?? "",
      durationDays: parseInt(searchParams.get("days") ?? "5", 10) || 5,
      budgetTier: (searchParams.get("budget") as BudgetTier) || "midrange",
      travelerType,
      travelStyle,
      mustVisit: searchParams.get("mustVisit") ?? undefined,
      adults,
      promoCode: searchParams.get("promo") ?? undefined,
    };
  });

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
  const questions = buildQuestionQueue(data, tp);

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
    const newQueue = buildQuestionQueue(newData, tp);
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
        travelStyle: finalData.travelStyle,
        mustVisit: finalData.mustVisit,
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
        promoCode: finalData.promoCode,
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
            {t("badge")}
          </p>
          <h1 className="text-display-lg text-[var(--text-primary)]">
            {t("headline", { destination: data.destination })}
          </h1>
          <p className="text-body-md text-[var(--text-secondary)] mt-3 max-w-lg mx-auto">
            {t("subtitle")}
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
              {t("startOver")}
            </button>
          </div>
        )}

        {submitting && !error && (
          <p className="text-center text-body-sm text-[var(--text-muted)] mt-6">
            {t("redirecting")}
          </p>
        )}
      </div>

      {activeQuestion && (
        <QuestionPopup
          key={activeQuestion.id}
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

type Translator = (key: string) => string;

function buildQuestionQueue(data: WizardData, tp: Translator): QuestionDef[] {
  const queue: QuestionDef[] = [];

  // Skip travelerType popup if home wizard already collected it.
  if (!data.travelerType) {
    queue.push({
      id: "travelerType",
      title: tp("travelerType.title"),
      type: "single-chip",
      options: [
        { value: "solo", label: tp("travelerType.solo"), hint: tp("travelerType.soloHint") },
        { value: "couple", label: tp("travelerType.couple"), hint: tp("travelerType.coupleHint") },
        { value: "family-with-kids", label: tp("travelerType.family"), hint: tp("travelerType.familyHint") },
        { value: "group-of-friends", label: tp("travelerType.friends"), hint: tp("travelerType.friendsHint") },
        { value: "senior", label: tp("travelerType.senior"), hint: tp("travelerType.seniorHint") },
      ],
    });
  }

  // Ask adults count for group/family travelers (solo/couple are auto-set).
  if (
    data.travelerType &&
    !["solo", "couple"].includes(data.travelerType) &&
    !data.adults
  ) {
    queue.push({
      id: "adults",
      title: tp("adults.title"),
      type: "number",
      placeholder: tp("adults.placeholder"),
    });
  }

  if (data.travelerType === "family-with-kids") {
    queue.push({
      id: "children",
      title: tp("children.title"),
      subtitle: tp("children.subtitle"),
      type: "number+text",
      numberLabel: tp("children.numberLabel"),
      textLabel: tp("children.textLabel"),
      placeholder: tp("children.placeholder"),
    });

    if ((data.children ?? 0) > 0) {
      queue.push({
        id: "stroller",
        title: tp("stroller.title"),
        subtitle: tp("stroller.subtitle"),
        type: "yes-no",
      });
    }
  }

  queue.push({
    id: "airport",
    title: tp("airport.title"),
    subtitle: tp("airport.subtitle"),
    type: "text",
    placeholder: tp("airport.placeholder"),
  });

  queue.push({
    id: "hotelBooked",
    title: tp("hotelBooked.title"),
    type: "yes-no",
  });

  if (data.hotelBooked === true) {
    queue.push({
      id: "hotelName",
      title: tp("hotelName.title"),
      subtitle: tp("hotelName.subtitle"),
      type: "text",
      placeholder: tp("hotelName.placeholder"),
      optional: true,
    });
  }

  queue.push({
    id: "interests",
    title: tp("interests.title"),
    subtitle: tp("interests.subtitle"),
    type: "multi-chip",
    minSelections: 1,
    maxSelections: 6,
    options: [
      { value: "food", label: tp("interests.food") },
      { value: "culture", label: tp("interests.culture") },
      { value: "history", label: tp("interests.history") },
      { value: "nature", label: tp("interests.nature") },
      { value: "shopping", label: tp("interests.shopping") },
      { value: "nightlife", label: tp("interests.nightlife") },
      { value: "adventure", label: tp("interests.adventure") },
      { value: "relaxation", label: tp("interests.relaxation") },
      { value: "photography", label: tp("interests.photography") },
    ],
  });

  queue.push({
    id: "pace",
    title: tp("pace.title"),
    type: "single-chip",
    options: [
      { value: "relaxed", label: tp("pace.relaxed"), hint: tp("pace.relaxedHint") },
      { value: "balanced", label: tp("pace.balanced"), hint: tp("pace.balancedHint") },
      { value: "packed", label: tp("pace.packed"), hint: tp("pace.packedHint") },
    ],
  });

  queue.push({
    id: "email",
    title: tp("email.title"),
    subtitle: tp("email.subtitle"),
    type: "email",
    placeholder: tp("email.placeholder"),
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
