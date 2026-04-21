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
  const tr = useTranslations("wizard.review");
  const th = useTranslations("homeWizard");

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
  // Review screen gate: shown after popups complete, before checkout call.
  const [reviewReady, setReviewReady] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

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
      // All popups answered — show review screen (no longer auto-submits).
      setTimeout(() => setReviewReady(true), 1500);
    }
  };

  const handleSkip = () => handleAnswer(null);

  const handlePay = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    setPopupBlocked(false);
    try {
      if (
        !data.travelerType ||
        !data.adults ||
        !data.arrivalAirport ||
        !data.interests?.length ||
        !data.pace ||
        !data.email
      ) {
        throw new Error("Some answers are missing — please refresh and try again.");
      }

      const payload = {
        destination: data.destination,
        destinationCountry: data.destinationCountry || data.destination,
        durationDays: data.durationDays,
        arrivalAirport: data.arrivalAirport,
        travelerType: data.travelerType,
        travelStyle: data.travelStyle,
        mustVisit: data.mustVisit,
        adults: data.adults,
        children: data.children ?? 0,
        childrenAges: data.childrenAges,
        strollerNeeded: data.strollerNeeded,
        hasInfant: data.childrenAges?.some((a) => a <= 2),
        hotelBooked: data.hotelBooked,
        hotelName: data.hotelName,
        interests: data.interests,
        budgetTier: data.budgetTier,
        pace: data.pace,
        email: data.email,
        promoCode: data.promoCode,
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
          event_label: data.destination,
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

      // Open checkout in a new tab. Keep the current page so the user has
      // context (review summary + fallback link if the popup is blocked).
      setCheckoutUrl(url);
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) {
        setPopupBlocked(true);
      }
      setSubmitting(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const handleSeeSample = () => {
    window.open("/samples/tokyo-4d-couple", "_blank", "noopener,noreferrer");
  };

  if (!data.destination) {
    return null; // redirect in flight
  }

  // ──────────────── Review / Checkout screens ────────────────
  if (reviewReady) {
    const traveler = data.travelerType
      ? tp(`travelerType.${travelerTypeShortKey(data.travelerType)}`)
      : "";
    const style = data.travelStyle ? th(`travelStyle.${data.travelStyle}`) : "";
    const budget = th(`budget.${data.budgetTier}`);
    const interestLabels =
      data.interests?.map((i) => tp(`interests.${i}`)).join(" · ") ?? "";

    return (
      <div className="min-h-screen bg-[var(--background)] py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
              {tr("badge")}
            </p>
            <h1 className="font-display font-bold text-display-lg text-[var(--text-primary)] leading-[1.05] mb-4 tracking-[-0.02em]">
              {tr("headline", { destination: data.destination })}
            </h1>
            <p className="text-body-md text-[var(--text-secondary)] max-w-md mx-auto">
              {tr("subtitle")}
            </p>
          </div>

          {/* Summary card */}
          <div className="bg-white border border-[var(--border-light)] rounded-[14px] p-6 mb-8 space-y-3">
            <SummaryRow label={tr("summaryDestination")} value={`${data.destination}, ${data.destinationCountry}`} />
            <SummaryRow label={tr("summaryDuration")} value={`${data.durationDays}${th("days.unit")}`} />
            {traveler && <SummaryRow label={tr("summaryTraveler")} value={traveler + (data.adults && data.adults > 2 ? ` · ${data.adults}` : "")} />}
            {style && <SummaryRow label={tr("summaryStyle")} value={style} />}
            <SummaryRow label={tr("summaryBudget")} value={budget} />
            {interestLabels && <SummaryRow label={tr("summaryInterests")} value={interestLabels} />}
            {data.mustVisit && <SummaryRow label={tr("summaryMustVisit")} value={data.mustVisit} />}
            {data.email && <SummaryRow label={tr("summaryEmail")} value={data.email} />}
          </div>

          {/* Checkout opened confirmation */}
          {checkoutUrl && (
            <div className="bg-[var(--lavender-soft)] border border-[var(--lavender)] rounded-[12px] p-5 mb-6">
              <p className="font-semibold text-[var(--text-primary)] mb-1">
                {tr("checkoutOpened.headline")}
              </p>
              <p className="text-body-sm text-[var(--text-secondary)]">
                {tr("checkoutOpened.subtitle")}
              </p>
              {popupBlocked && (
                <p className="text-body-sm mt-3">
                  <span className="text-[var(--text-secondary)]">{tr("checkoutOpened.noPopup")} </span>
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium text-[var(--text-primary)]"
                  >
                    {tr("checkoutOpened.openAgain")}
                  </a>
                </p>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-[12px] p-4 text-body-sm text-red-700 mb-6">
              {error}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handlePay}
              disabled={submitting}
              className="flex-1 px-6 py-3.5 bg-[#1A1A1A] text-white font-medium rounded-md hover:bg-black transition disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {submitting ? "…" : checkoutUrl ? tr("payAgainButton") : tr("payButton")}
              {!submitting && <span aria-hidden>→</span>}
            </button>
            <button
              type="button"
              onClick={handleSeeSample}
              className="flex-1 sm:flex-none px-6 py-3.5 bg-transparent text-[var(--text-primary)] font-medium rounded-md border border-[var(--border-light)] hover:border-[var(--text-secondary)] transition inline-flex items-center justify-center gap-2"
            >
              {tr("sampleButton")}
              <span aria-hidden>→</span>
            </button>
          </div>

          <p className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)] text-center mt-6">
            {tr("newTabNote")}
          </p>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-body-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
            >
              {tr("startOver")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────── Loading / popup screen ────────────────
  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
            {t("badge")}
          </p>
          <h1 className="font-display font-bold text-display-lg text-[var(--text-primary)] tracking-[-0.02em]">
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
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-body-sm text-red-700">
            {error}
            <button
              onClick={() => router.push("/plan/new")}
              className="block mt-2 text-body-sm underline"
            >
              {t("startOver")}
            </button>
          </div>
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-body-sm">
      <span className="shrink-0 w-20 sm:w-28 text-[var(--text-muted)] uppercase tracking-[0.1em] text-caption pt-0.5">
        {label}
      </span>
      <span className="flex-1 text-[var(--text-primary)]">{value}</span>
    </div>
  );
}

// Map enum → short translation key used in wizard.popup.travelerType namespace.
function travelerTypeShortKey(t: TravelerType): string {
  if (t === "solo") return "solo";
  if (t === "couple") return "couple";
  if (t === "family-with-kids") return "family";
  if (t === "group-of-friends") return "friends";
  if (t === "senior") return "senior";
  return "solo";
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
