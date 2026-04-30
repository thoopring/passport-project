"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { analytics, trackLegacy } from "../../../lib/analytics";
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
  flightArrival?: string;
  flightDeparture?: string;
  hotelBooked?: boolean;
  hotelName?: string;
  interests?: Interest[];
  pace?: Pace;
  email?: string;
  /** Free-form extras the user adds at review — allergies, special requests, etc. */
  notes?: string;
  promoCode?: string;
}

type EditableField =
  | "destination"
  | "durationDays"
  | "travelerType"
  | "travelStyle"
  | "budgetTier"
  | "interests"
  | "mustVisit"
  | "email";

// gtag/dataLayer types are declared in lib/analytics.ts

function LoadingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("wizard.loading");
  const tp = useTranslations("wizard.popup");
  const tr = useTranslations("wizard.review");
  const th = useTranslations("homeWizard");
  const locale = useLocale();

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

  // Answer history — ordered list of (question id, post-answer data
  // snapshot) pairs. We use this instead of a Set because we need to
  // (a) survive queue restructuring (id-based, not index-based — see
  // git history for the family-with-kids skipped-popup bug) AND
  // (b) support a "back" button that walks the user to the previous
  // question, restoring the data snapshot from before that answer.
  // Initial data snapshot is captured once via the lazy useState
  // initializer above and reused as the back-target for the very
  // first question.
  const [answerStack, setAnswerStack] = useState<
    { id: string; dataBefore: WizardData }[]
  >([]);
  const answeredIds = new Set(answerStack.map((s) => s.id));
  const [activeQuestion, setActiveQuestion] = useState<QuestionDef | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Review screen gate: shown after popups complete, before checkout call.
  const [reviewReady, setReviewReady] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  // Detect referral cookie on mount — drives the "$1 off coupon" chip on
  // the review screen and tells the buyer the discount will auto-apply.
  const [hasReferralCoupon, setHasReferralCoupon] = useState(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    setHasReferralCoupon(/(?:^|;\s*)ref_code=/.test(document.cookie));
  }, []);
  // Draft planId after checkout submission — needed for the BroadcastChannel
  // listener so we only redirect on messages matching our plan.
  const [draftPlanId, setDraftPlanId] = useState<string | null>(null);

  // Listen for the "paid" broadcast from the checkout/wait tab. When the new
  // tab (/plan/[id]?paid=1) mounts, it posts to this channel; we redirect the
  // loading tab away from the stale review screen so the user doesn't see
  // "retry payment" after successfully paying.
  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) return;
    if (!draftPlanId) return;
    const ch = new BroadcastChannel("passport-plan-sync");
    ch.onmessage = (e) => {
      const m = e.data as { type?: string; planId?: string };
      if (m?.type === "paid" && m.planId === draftPlanId) {
        router.replace(`/plan/${draftPlanId}`);
      }
    };
    return () => ch.close();
  }, [draftPlanId, router]);

  // Bail if user landed here without a destination
  useEffect(() => {
    if (!data.destination) {
      router.replace("/plan/new");
    }
  }, [data.destination, router]);

  // Build queue dynamically — depends on current data so adapts as user answers
  const questions = buildQuestionQueue(data, tp);

  // The next question is the first item in the (recomputed) queue whose id
  // hasn't been answered yet. The progress chip shows position relative to
  // the CURRENT queue length, which can grow if traveler-type-dependent
  // popups (adults, children) get inserted mid-flow.
  const nextQuestion = questions.find((q) => !answeredIds.has(q.id)) ?? null;
  const remainingCount = questions.filter((q) => !answeredIds.has(q.id)).length;
  const answeredInQueue = questions.length - remainingCount;

  // Schedule next popup
  useEffect(() => {
    if (submitting) return;
    if (reviewReady) return;
    if (!nextQuestion) return;
    // Already showing this exact question? Don't reschedule.
    if (activeQuestion?.id === nextQuestion.id) return;
    const delay = answerStack.length === 0 ? 2500 : 3500;
    const timer = setTimeout(() => {
      setActiveQuestion(nextQuestion);
    }, delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextQuestion?.id, submitting, reviewReady]);

  const handleAnswer = (value: unknown) => {
    const currentQ = activeQuestion;
    if (!currentQ) return;
    setActiveQuestion(null);
    // Snapshot data BEFORE applying the answer so back can restore it.
    const dataBefore = data;
    const newData = applyAnswer(data, currentQ, value);
    setData(newData);

    const newStack = [...answerStack, { id: currentQ.id, dataBefore }];
    setAnswerStack(newStack);

    // Recompute queue with new data and decide if we're done. We use ids
    // (not indices) so a queue that grew due to the answer (e.g. picking
    // family-with-kids inserted adults+children) still asks the inserted
    // popups instead of skipping them.
    const newAnsweredIds = new Set(newStack.map((s) => s.id));
    const newQueue = buildQuestionQueue(newData, tp);
    const stillPending = newQueue.some((q) => !newAnsweredIds.has(q.id));

    if (!stillPending) {
      // All popups answered — show review screen (no longer auto-submits).
      setTimeout(() => setReviewReady(true), 1500);
    }
  };

  const handleSkip = () => handleAnswer(null);

  /**
   * Back button on the wizard popup. Pops the most recent answer off the
   * stack, restores the pre-answer data snapshot, and resurfaces the
   * previous question. No-op if there's nothing to go back to.
   *
   * The data snapshot includes ALL fields (children, hasInfant, stroller
   * derivations, etc.) so backing out of a "children" skip cleanly undoes
   * the children=0 derivation set in applyAnswer.
   */
  const handleBack = () => {
    if (answerStack.length === 0) return;
    const last = answerStack[answerStack.length - 1];
    setData(last.dataBefore);
    setAnswerStack((s) => s.slice(0, -1));
    setActiveQuestion(null);
    // Cancel any review-ready timer that might have been queued by the
    // last answer (if it was the final question). reviewReady itself is
    // gated on this flag, and the next-question useEffect will pick the
    // popped-back question naturally on the next tick.
    setReviewReady(false);
  };

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
        flightArrival: data.flightArrival,
        flightDeparture: data.flightDeparture,
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
        notes: data.notes,
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
      setDraftPlanId(id);

      trackLegacy("plan_draft_created", {
        event_category: "trip_planner",
        event_label: data.destination,
        locale,
      });

      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: id }),
      });
      if (!checkoutRes.ok) {
        const body = await checkoutRes.json().catch(() => ({}));
        throw new Error(body.error || "Failed to start checkout");
      }
      const { url, bypassedLS } = await checkoutRes.json();

      analytics.checkoutStarted({
        locale,
        destination: data.destination,
        promo: data.promoCode,
        value: 4,
        currency: "USD",
      });
      if (data.promoCode) {
        analytics.creditUsed({
          locale,
          plan_id: id,
          type: "promo",
        });
      } else if (hasReferralCoupon) {
        analytics.creditUsed({
          locale,
          plan_id: id,
          type: "referral_credit",
        });
      }

      if (bypassedLS) {
        // 100%-off promo or full-credit path — server already marked
        // the plan paid and queued generation. There's no external
        // checkout to visit, so redirect THIS tab to the wait page
        // instead of opening a new one (which would otherwise show
        // two identical tabs and confuse the buyer).
        router.replace(url);
        return;
      }

      // Standard LS flow — open checkout in a new tab. Keep the current
      // page so the user has context (review summary + fallback link
      // if the popup is blocked).
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
            <h1 className="font-display font-bold text-display-md sm:text-display-lg text-[var(--text-primary)] leading-[1.05] mb-4 tracking-[-0.02em]">
              {tr("headline", { destination: data.destination })}
            </h1>
            <p className="text-body-md text-[var(--text-secondary)] max-w-md mx-auto">
              {tr("subtitle")}
            </p>
          </div>

          {/* Editable summary */}
          <div className="bg-white border border-[var(--border-light)] rounded-[14px] p-5 sm:p-6 mb-6 divide-y divide-[var(--border-subtle)]">
            <EditableRow
              label={tr("summaryDestination")}
              value={`${data.destination}, ${data.destinationCountry}`}
              editing={editingField === "destination"}
              onEdit={() => setEditingField("destination")}
              onCancel={() => setEditingField(null)}
              editLabel={tr("edit")}
              cancelLabel={tr("cancel")}
            >
              <DestinationEditor
                initialDest={data.destination}
                initialCountry={data.destinationCountry}
                onSave={(dest, country) => {
                  setData((p) => ({ ...p, destination: dest, destinationCountry: country || dest }));
                  setEditingField(null);
                }}
                saveLabel={tr("save")}
              />
            </EditableRow>

            <EditableRow
              label={tr("summaryDuration")}
              value={`${data.durationDays}${th("days.unit")}`}
              editing={editingField === "durationDays"}
              onEdit={() => setEditingField("durationDays")}
              onCancel={() => setEditingField(null)}
              editLabel={tr("edit")}
              cancelLabel={tr("cancel")}
            >
              <DaysEditor
                initial={data.durationDays}
                onSave={(n) => {
                  setData((p) => ({ ...p, durationDays: n }));
                  setEditingField(null);
                }}
                saveLabel={tr("save")}
                unitLabel={th("days.unit")}
              />
            </EditableRow>

            {traveler && (
              <EditableRow
                label={tr("summaryTraveler")}
                value={traveler + (data.adults && data.adults > 2 ? ` · ${data.adults}` : "")}
                editing={editingField === "travelerType"}
                onEdit={() => setEditingField("travelerType")}
                onCancel={() => setEditingField(null)}
                editLabel={tr("edit")}
                cancelLabel={tr("cancel")}
              >
                <TravelerEditor
                  initial={data.travelerType}
                  onSave={(t) => {
                    const adults = t === "solo" ? 1 : t === "couple" ? 2 : data.adults;
                    setData((p) => ({ ...p, travelerType: t, adults }));
                    setEditingField(null);
                  }}
                  tp={tp}
                />
              </EditableRow>
            )}

            {style && (
              <EditableRow
                label={tr("summaryStyle")}
                value={style}
                editing={editingField === "travelStyle"}
                onEdit={() => setEditingField("travelStyle")}
                onCancel={() => setEditingField(null)}
                editLabel={tr("edit")}
                cancelLabel={tr("cancel")}
              >
                <StyleEditor
                  initial={data.travelStyle}
                  onSave={(s) => {
                    setData((p) => ({ ...p, travelStyle: s }));
                    setEditingField(null);
                  }}
                  th={th}
                />
              </EditableRow>
            )}

            <EditableRow
              label={tr("summaryBudget")}
              value={budget}
              editing={editingField === "budgetTier"}
              onEdit={() => setEditingField("budgetTier")}
              onCancel={() => setEditingField(null)}
              editLabel={tr("edit")}
              cancelLabel={tr("cancel")}
            >
              <BudgetEditor
                initial={data.budgetTier}
                onSave={(b) => {
                  setData((p) => ({ ...p, budgetTier: b }));
                  setEditingField(null);
                }}
                th={th}
              />
            </EditableRow>

            {interestLabels && (
              <EditableRow
                label={tr("summaryInterests")}
                value={interestLabels}
                editing={editingField === "interests"}
                onEdit={() => setEditingField("interests")}
                onCancel={() => setEditingField(null)}
                editLabel={tr("edit")}
                cancelLabel={tr("cancel")}
              >
                <InterestsEditor
                  initial={data.interests ?? []}
                  onSave={(arr) => {
                    setData((p) => ({ ...p, interests: arr }));
                    setEditingField(null);
                  }}
                  tp={tp}
                  saveLabel={tr("save")}
                />
              </EditableRow>
            )}

            <EditableRow
              label={tr("summaryMustVisit")}
              value={data.mustVisit || tr("mustVisitEmpty")}
              valueMuted={!data.mustVisit}
              editing={editingField === "mustVisit"}
              onEdit={() => setEditingField("mustVisit")}
              onCancel={() => setEditingField(null)}
              editLabel={tr("edit")}
              cancelLabel={tr("cancel")}
            >
              <MustVisitEditor
                initial={data.mustVisit ?? ""}
                onSave={(v) => {
                  setData((p) => ({ ...p, mustVisit: v.trim() || undefined }));
                  setEditingField(null);
                }}
                saveLabel={tr("save")}
                placeholder={th("mustVisit.placeholder")}
              />
            </EditableRow>

            {data.email && (
              <EditableRow
                label={tr("summaryEmail")}
                value={data.email}
                editing={editingField === "email"}
                onEdit={() => setEditingField("email")}
                onCancel={() => setEditingField(null)}
                editLabel={tr("edit")}
                cancelLabel={tr("cancel")}
              >
                <EmailEditor
                  initial={data.email}
                  onSave={(v) => {
                    setData((p) => ({ ...p, email: v }));
                    setEditingField(null);
                  }}
                  saveLabel={tr("save")}
                />
              </EditableRow>
            )}
          </div>

          {/* Extra notes field */}
          <div className="bg-white border border-[var(--border-light)] rounded-[14px] p-5 sm:p-6 mb-6">
            <label className="block">
              <span className="block font-semibold text-body-md text-[var(--text-primary)] mb-1">
                {tr("notesLabel")}
              </span>
              <span className="block text-body-sm text-[var(--text-secondary)] mb-3">
                {tr("notesSubtitle")}
              </span>
              <textarea
                value={data.notes ?? ""}
                onChange={(e) =>
                  setData((p) => ({ ...p, notes: e.target.value || undefined }))
                }
                placeholder={tr("notesPlaceholder")}
                rows={3}
                maxLength={1000}
                className="w-full px-4 py-3 bg-[var(--surface-secondary)] border border-[var(--border-subtle)] rounded-[10px] text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none transition"
              />
            </label>
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

          {/* Referral coupon banner — appears when buyer arrived via /r/CODE.
              The discount auto-applies at LS checkout. We surface it here so
              the buyer sees the savings BEFORE paying, not as a surprise. */}
          {hasReferralCoupon && (
            <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-[12px] bg-gradient-to-r from-[var(--brand-soft)] to-[var(--accent-soft)] border border-[var(--brand-primary)]/20">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-soft">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand-primary)]" aria-hidden>
                  <path d="M20 12V8H6a2 2 0 1 1 0-4h12.5a.5.5 0 0 1 .5.5V12" />
                  <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body-sm font-semibold text-[var(--text-primary)]">
                  {tr("referralBanner.title")}
                </p>
                <p className="text-caption text-[var(--text-secondary)]">
                  {tr("referralBanner.subtitle")}
                </p>
              </div>
              <span className="text-body-md font-bold text-[var(--brand-primary)] tabular-nums shrink-0">
                -25%
              </span>
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
          <h1 className="font-display font-bold text-display-md sm:text-display-lg text-[var(--text-primary)] tracking-[-0.02em]">
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
          onBack={answerStack.length > 0 ? handleBack : undefined}
          questionNumber={answeredInQueue + 1}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// Editable review row + field-specific editors
// ─────────────────────────────────────────

function EditableRow({
  label,
  value,
  valueMuted,
  editing,
  onEdit,
  onCancel,
  editLabel,
  cancelLabel,
  children,
}: {
  label: string;
  value: string;
  valueMuted?: boolean;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  editLabel: string;
  cancelLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-20 sm:w-28 pt-0.5 text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {label}
        </span>
        <div className="flex-1 min-w-0">
          {editing ? (
            <div>{children}</div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <span
                className={`text-body-sm break-words ${
                  valueMuted ? "text-[var(--text-muted)] italic" : "text-[var(--text-primary)]"
                }`}
              >
                {value}
              </span>
              <button
                type="button"
                onClick={onEdit}
                className="shrink-0 text-body-sm text-[var(--brand-primary)] hover:underline underline-offset-4"
              >
                {editLabel}
              </button>
            </div>
          )}
        </div>
      </div>
      {editing && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="text-body-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] underline-offset-4"
          >
            {cancelLabel}
          </button>
        </div>
      )}
    </div>
  );
}

function SaveButton({ onClick, disabled, label }: { onClick: () => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-2 px-4 py-2 bg-[#1A1A1A] text-white text-body-sm font-medium rounded-md hover:bg-black transition disabled:opacity-30"
    >
      {label}
    </button>
  );
}

function DestinationEditor({
  initialDest,
  initialCountry,
  onSave,
  saveLabel,
}: {
  initialDest: string;
  initialCountry: string;
  onSave: (dest: string, country: string) => void;
  saveLabel: string;
}) {
  const [dest, setDest] = useState(initialDest);
  const [country, setCountry] = useState(initialCountry);
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={dest}
        onChange={(e) => setDest(e.target.value)}
        className="w-full px-3 py-2 bg-white border border-[var(--border-light)] rounded-md text-body-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full px-3 py-2 bg-white border border-[var(--border-light)] rounded-md text-body-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
      />
      <SaveButton onClick={() => onSave(dest.trim(), country.trim())} disabled={!dest.trim()} label={saveLabel} />
    </div>
  );
}

const DAY_CHOICES = [2, 3, 4, 5, 7, 10, 14];

function DaysEditor({
  initial,
  onSave,
  saveLabel,
  unitLabel,
}: {
  initial: number;
  onSave: (n: number) => void;
  saveLabel: string;
  unitLabel: string;
}) {
  const [v, setV] = useState(initial);
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {DAY_CHOICES.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setV(n)}
            className={`px-3 py-1.5 rounded-full text-body-sm border transition ${
              v === n
                ? "bg-[var(--lavender-soft)] border-[var(--lavender)] text-[var(--text-primary)]"
                : "bg-white border-[var(--border-light)] text-[var(--text-secondary)]"
            }`}
          >
            {n}
            {unitLabel}
          </button>
        ))}
      </div>
      <input
        type="number"
        min={1}
        max={30}
        value={v}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!isNaN(n) && n >= 1 && n <= 30) setV(n);
        }}
        className="w-24 px-3 py-2 bg-white border border-[var(--border-light)] rounded-md text-body-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
      />
      <div>
        <SaveButton onClick={() => onSave(v)} label={saveLabel} />
      </div>
    </div>
  );
}

function TravelerEditor({
  initial,
  onSave,
  tp,
}: {
  initial: TravelerType | undefined;
  onSave: (t: TravelerType) => void;
  tp: (key: string) => string;
}) {
  const items: { v: TravelerType; k: string }[] = [
    { v: "solo", k: "solo" },
    { v: "couple", k: "couple" },
    { v: "family-with-kids", k: "family" },
    { v: "group-of-friends", k: "friends" },
    { v: "senior", k: "senior" },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <button
          key={it.v}
          type="button"
          onClick={() => onSave(it.v)}
          className={`px-3 py-1.5 rounded-full text-body-sm border transition ${
            initial === it.v
              ? "bg-[var(--lavender-soft)] border-[var(--lavender)] text-[var(--text-primary)]"
              : "bg-white border-[var(--border-light)] text-[var(--text-secondary)]"
          }`}
        >
          {tp(`travelerType.${it.k}`)}
        </button>
      ))}
    </div>
  );
}

function StyleEditor({
  initial,
  onSave,
  th,
}: {
  initial: TravelStyle | undefined;
  onSave: (s: TravelStyle) => void;
  th: (key: string) => string;
}) {
  const items: TravelStyle[] = ["sightseeing", "relaxation", "mixed"];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onSave(s)}
          className={`px-3 py-1.5 rounded-full text-body-sm border transition ${
            initial === s
              ? "bg-[var(--lavender-soft)] border-[var(--lavender)] text-[var(--text-primary)]"
              : "bg-white border-[var(--border-light)] text-[var(--text-secondary)]"
          }`}
        >
          {th(`travelStyle.${s}`)}
        </button>
      ))}
    </div>
  );
}

function BudgetEditor({
  initial,
  onSave,
  th,
}: {
  initial: BudgetTier;
  onSave: (b: BudgetTier) => void;
  th: (key: string) => string;
}) {
  const items: BudgetTier[] = ["budget", "midrange", "luxury"];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((b) => (
        <button
          key={b}
          type="button"
          onClick={() => onSave(b)}
          className={`px-3 py-1.5 rounded-full text-body-sm border transition ${
            initial === b
              ? "bg-[var(--lavender-soft)] border-[var(--lavender)] text-[var(--text-primary)]"
              : "bg-white border-[var(--border-light)] text-[var(--text-secondary)]"
          }`}
        >
          {th(`budget.${b}`)}
        </button>
      ))}
    </div>
  );
}

const INTEREST_OPTIONS: Interest[] = [
  "food",
  "sightseeing",
  "culture",
  "history",
  "nature",
  "shopping",
  "nightlife",
  "adventure",
  "relaxation",
  "photography",
];

function InterestsEditor({
  initial,
  onSave,
  tp,
  saveLabel,
}: {
  initial: Interest[];
  onSave: (arr: Interest[]) => void;
  tp: (key: string) => string;
  saveLabel: string;
}) {
  const [selected, setSelected] = useState<Interest[]>(initial);
  const toggle = (i: Interest) => {
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : prev.length < 6 ? [...prev, i] : prev
    );
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {INTEREST_OPTIONS.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={`px-3 py-1.5 rounded-full text-body-sm border transition ${
              selected.includes(i)
                ? "bg-[var(--lavender-soft)] border-[var(--lavender)] text-[var(--text-primary)]"
                : "bg-white border-[var(--border-light)] text-[var(--text-secondary)]"
            }`}
          >
            {tp(`interests.${i}`)}
          </button>
        ))}
      </div>
      <SaveButton
        onClick={() => onSave(selected)}
        disabled={selected.length === 0}
        label={saveLabel}
      />
    </div>
  );
}

function MustVisitEditor({
  initial,
  onSave,
  saveLabel,
  placeholder,
}: {
  initial: string;
  onSave: (v: string) => void;
  saveLabel: string;
  placeholder: string;
}) {
  const [v, setV] = useState(initial);
  return (
    <div className="space-y-2">
      <textarea
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder={placeholder}
        rows={3}
        maxLength={500}
        className="w-full px-3 py-2 bg-white border border-[var(--border-light)] rounded-md text-body-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
      />
      <SaveButton onClick={() => onSave(v)} label={saveLabel} />
    </div>
  );
}

function EmailEditor({
  initial,
  onSave,
  saveLabel,
}: {
  initial: string;
  onSave: (v: string) => void;
  saveLabel: string;
}) {
  const [v, setV] = useState(initial);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  return (
    <div className="space-y-2">
      <input
        type="email"
        value={v}
        onChange={(e) => setV(e.target.value)}
        className="w-full px-3 py-2 bg-white border border-[var(--border-light)] rounded-md text-body-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
      />
      <SaveButton onClick={() => onSave(v)} disabled={!valid} label={saveLabel} />
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
    // Optional — "family" can mean adult-only family (parents + adult kids,
    // siblings, multi-gen without young kids). Skip = no children on the
    // trip; generator skips kid-friendly constraints. Stroller need is
    // derived from child ages (≤4) inside applyAnswer.
    queue.push({
      id: "children",
      title: tp("children.title"),
      subtitle: tp("children.subtitle"),
      type: "number+text",
      numberLabel: tp("children.numberLabel"),
      textLabel: tp("children.textLabel"),
      placeholder: tp("children.placeholder"),
      optional: true,
    });
  }

  queue.push({
    id: "airport",
    title: tp("airport.title"),
    subtitle: tp("airport.subtitle"),
    type: "airport",
    placeholder: tp("airport.placeholder"),
  });

  // Arrival period (chip) — replaces precise time entry. Hotel matching and
  // first-day pacing only need the arrival window, not the exact minute.
  // flightDeparture removed entirely — generator assumes a standard mid-day
  // checkout for the last day's pacing, which has been good enough.
  queue.push({
    id: "flightArrival",
    title: tp("flightArrival.title"),
    subtitle: tp("flightArrival.subtitle"),
    type: "single-chip",
    optional: true,
    options: [
      { value: "early-morning", label: tp("flightArrival.earlyMorning") },
      { value: "morning", label: tp("flightArrival.morning") },
      { value: "afternoon", label: tp("flightArrival.afternoon") },
      { value: "evening", label: tp("flightArrival.evening") },
      { value: "late-night", label: tp("flightArrival.lateNight") },
    ],
  });

  // Optional hotel — single input replaces the previous yes/no + name pair.
  // Empty = recommend; non-empty = anchor the plan to this hotel.
  queue.push({
    id: "hotel",
    title: tp("hotel.title"),
    subtitle: tp("hotel.subtitle"),
    type: "text",
    placeholder: tp("hotel.placeholder"),
    optional: true,
  });

  queue.push({
    id: "interests",
    title: tp("interests.title"),
    subtitle: tp("interests.subtitle"),
    type: "multi-chip",
    minSelections: 1,
    maxSelections: 6,
    options: [
      { value: "food", label: tp("interests.food") },
      { value: "sightseeing", label: tp("interests.sightseeing") },
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
      // Skip = no kids on this trip — family travel without children is a
      // common case (adult kids, sibling trips, multi-gen). Leave fields
      // unset so generator treats it as a no-kid plan.
      if (value === null || value === undefined) {
        return { ...prev, children: 0, childrenAges: undefined, hasInfant: false, strollerNeeded: false };
      }
      const combo = value as { count: number; detail: string };
      if (!combo.count || combo.count === 0) {
        return { ...prev, children: 0, childrenAges: undefined, hasInfant: false, strollerNeeded: false };
      }
      const ages = combo.detail
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !Number.isNaN(n));
      const strollerNeeded = ages.some((a) => a <= 4);
      return {
        ...prev,
        children: combo.count,
        childrenAges: ages.length ? ages : undefined,
        hasInfant: ages.some((a) => a <= 2),
        strollerNeeded,
      };
    }
    case "airport":
      return { ...prev, arrivalAirport: value as string };
    case "flightArrival":
      // Now stores a period chip value ("morning" / "afternoon" / ...)
      // instead of a free-form time string. Generator interprets the
      // period.
      return { ...prev, flightArrival: (value as string) || undefined };
    case "hotel": {
      // Optional input replaces the prior yes/no + name pair. Non-empty
      // implies booked + anchor to this name; empty implies recommend.
      const name = (value as string)?.trim();
      if (!name) return { ...prev, hotelBooked: false, hotelName: undefined };
      return { ...prev, hotelBooked: true, hotelName: name };
    }
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
