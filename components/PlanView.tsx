import Link from "next/link";
import { getTranslations } from "next-intl/server";
import PlanMap from "./PlanMap";
import PlanAffiliateBar from "./PlanAffiliateBar";
import type { TripPlan } from "../types/trip-plan";

interface PlanViewProps {
  plan: TripPlan;
  /** PDF download URL — real plans only; samples should leave this undefined. */
  downloadHref?: string;
  /** Header label override; defaults to localized "Your trip plan". */
  headerLabel?: string;
  /** Optional CTA rendered at the bottom (samples render the "$4 paywall" card here). */
  bottomCta?: React.ReactNode;
  /** Optional back link rendered at the very bottom of the page. */
  backLink?: { href: string; label: string };
}

/**
 * Shared trip plan renderer used by both /plan/[id] (real paid plans) and
 * /samples/[slug] (curated marketing samples).
 *
 * Server Component — PlanMap is the only client boundary inside.
 */
export default async function PlanView({
  plan,
  downloadHref,
  headerLabel,
  bottomCta,
  backLink,
}: PlanViewProps) {
  const t = await getTranslations("plan");
  const resolvedHeaderLabel = headerLabel ?? t("yourTripPlan");
  const resolvedBackLink = backLink ?? { href: "/", label: t("back") };
  return (
    <div className="min-h-screen bg-[var(--background)] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-caption uppercase tracking-wider font-semibold text-brand-600 dark:text-brand-400">
            {resolvedHeaderLabel}
          </p>
          <h1 className="text-display-lg text-[var(--text-primary)] mt-1">{plan.destination}</h1>
          <p className="text-body-md text-[var(--text-secondary)] mt-1">
            {plan.durationDays}-day itinerary · {plan.destinationCountry}
          </p>
          {downloadHref && (
            <a
              href={downloadHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[var(--text-primary)] text-[var(--background)] font-semibold text-body-sm rounded-xl hover:opacity-90 transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              {t("downloadPdf")}
            </a>
          )}
        </div>

        {/* Overview */}
        <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 mb-6">
          <p className="text-body-md text-[var(--text-primary)] leading-relaxed">{plan.overview}</p>
        </div>

        {/* Map */}
        <div className="mb-6">
          <PlanMap plan={plan} />
        </div>

        {/* Affiliate toolkit (web only, not PDF) */}
        <PlanAffiliateBar
          destination={plan.destination}
          destinationCountry={plan.destinationCountry}
        />

        {/* Hotel + Transit */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6">
            <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-wider mb-2">
              {t("hotel")}
            </p>
            <h3 className="text-body-lg font-semibold text-[var(--text-primary)]">
              {plan.hotel.name}{" "}
              <span className="text-[var(--text-muted)] font-normal">{plan.hotel.priceTier}</span>
            </h3>
            <p className="text-body-sm text-[var(--text-secondary)] mt-1">
              {plan.hotel.area} · {plan.hotel.address}
            </p>
            {plan.hotel.estimatedNightlyRate && (
              <p className="text-body-sm text-[var(--text-muted)] mt-1">
                {plan.hotel.estimatedNightlyRate}
              </p>
            )}
            <p className="text-body-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
              {plan.hotel.rationale}
            </p>
          </div>

          <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6">
            <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-wider mb-2">
              {t("airportToHotel")}
            </p>
            <h3 className="text-body-lg font-semibold text-[var(--text-primary)]">
              {plan.airportTransit.method}
            </h3>
            <p className="text-body-sm text-[var(--text-secondary)] mt-1">
              {plan.airportTransit.duration} · {plan.airportTransit.cost}
            </p>
            <p className="text-body-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
              {plan.airportTransit.instructions}
            </p>
          </div>
        </div>

        {/* Days */}
        {plan.days.map((day) => (
          <div
            key={day.dayNumber}
            className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 mb-4"
          >
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <p className="text-caption uppercase font-semibold text-brand-600 dark:text-brand-400 tracking-wider">
                  {t("day")} {day.dayNumber}
                </p>
                <h2 className="text-body-lg font-semibold text-[var(--text-primary)] mt-0.5">
                  {day.theme}
                </h2>
              </div>
            </div>
            <p className="text-body-sm text-[var(--text-secondary)] mb-5">{day.summary}</p>

            <ol className="space-y-5">
              {day.stops.map((stop) => (
                <li key={stop.order} className="flex gap-4">
                  <div className="shrink-0 w-14 text-right">
                    <p className="font-bold text-brand-600 dark:text-brand-400 text-body-sm">
                      {stop.time}
                    </p>
                    <p className="text-caption text-[var(--text-muted)] uppercase">{stop.type}</p>
                  </div>
                  <div className="flex-1 border-l-2 border-[var(--border-light)] pl-4 pb-1">
                    <p className="font-semibold text-body-sm text-[var(--text-primary)]">
                      {stop.name}
                    </p>
                    {stop.area && (
                      <p className="text-caption text-[var(--text-muted)]">{stop.area}</p>
                    )}
                    <p className="text-body-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                      {stop.description}
                    </p>
                    <p className="text-caption text-[var(--text-muted)] mt-1.5">
                      {stop.duration}
                      {stop.estimatedCost ? ` · ${stop.estimatedCost}` : ""}
                      {stop.transitFromPrev ? ` · ${stop.transitFromPrev}` : ""}
                    </p>
                    {stop.bookingTip && (
                      <p className="text-caption font-semibold text-amber-700 dark:text-amber-400 mt-1">
                        Tip: {stop.bookingTip}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}

        {/* Tips */}
        {(plan.generalTips?.length || plan.packingTips?.length || plan.budgetEstimate) && (
          <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 mb-6">
            <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-wider mb-4">
              {t("practicalInfo")}
            </p>
            {plan.budgetEstimate && (
              <p className="text-body-sm mb-3">
                <span className="font-semibold text-[var(--text-primary)]">{t("budget")}: </span>
                <span className="text-[var(--text-secondary)]">{plan.budgetEstimate}</span>
              </p>
            )}
            {plan.packingTips?.length ? (
              <div className="mb-3">
                <p className="font-semibold text-body-sm text-[var(--text-primary)] mb-1">
                  {t("packing")}
                </p>
                <ul className="text-body-sm text-[var(--text-secondary)] space-y-1">
                  {plan.packingTips.map((tip, i) => (
                    <li key={i}>· {tip}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {plan.generalTips?.length ? (
              <div>
                <p className="font-semibold text-body-sm text-[var(--text-primary)] mb-1">
                  {t("tips")}
                </p>
                <ul className="text-body-sm text-[var(--text-secondary)] space-y-1">
                  {plan.generalTips.map((tip, i) => (
                    <li key={i}>· {tip}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}

        {bottomCta && <div className="mb-6">{bottomCta}</div>}

        <div className="text-center pt-6">
          <Link
            href={resolvedBackLink.href}
            className="text-body-sm text-[var(--text-muted)] hover:underline"
          >
            {resolvedBackLink.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
