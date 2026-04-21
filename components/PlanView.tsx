import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import PlanMap from "./PlanMap";
import PlanAffiliateBar from "./PlanAffiliateBar";
import Header from "./Header";
import Footer from "./Footer";
import type { TripPlan } from "../types/trip-plan";

interface PlanViewProps {
  plan: TripPlan;
  downloadHref?: string;
  headerLabel?: string;
  bottomCta?: React.ReactNode;
  backLink?: { href: string; label: string };
  /** Optional Unsplash hero photo rendered at top of detail (sample pages). */
  heroImage?: string;
}

export default async function PlanView({
  plan,
  downloadHref,
  headerLabel,
  bottomCta,
  backLink,
  heroImage,
}: PlanViewProps) {
  const t = await getTranslations("plan");
  const resolvedHeaderLabel = headerLabel ?? t("yourTripPlan");
  const resolvedBackLink = backLink ?? { href: "/", label: t("back") };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-1">
        {/* Destination hero photo (samples only) */}
        {heroImage && (
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-8">
            <div className="relative aspect-[21/9] rounded-[12px] overflow-hidden bg-[var(--surface-secondary)]">
              <Image
                src={heroImage}
                alt={`${plan.destination} — ${plan.durationDays}-day itinerary`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1040px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* Header block */}
          <div className="mb-10">
            <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
              {resolvedHeaderLabel}
            </p>
            <h1 className="font-display text-[2.75rem] sm:text-[3.5rem] text-[var(--text-primary)] leading-[1.04] tracking-[-0.018em]">
              {plan.destination}
            </h1>
            <p className="text-body-md text-[var(--text-secondary)] mt-3">
              {plan.durationDays}-day itinerary · {plan.destinationCountry}
            </p>
            {downloadHref && (
              <a
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-[var(--brand-primary)] text-white font-medium text-body-sm rounded-md hover:opacity-90 transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                {t("downloadPdf")}
              </a>
            )}
          </div>

          {/* Overview */}
          <div className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-[10px] p-6 mb-6">
            <p className="text-body-md text-[var(--text-primary)] leading-relaxed">{plan.overview}</p>
          </div>

          {/* Map */}
          <div className="mb-6">
            <PlanMap plan={plan} />
          </div>

          {/* Affiliate toolkit */}
          <PlanAffiliateBar
            destination={plan.destination}
            destinationCountry={plan.destinationCountry}
          />

          {/* Hotel + Transit */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-[10px] p-6">
              <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-[0.14em] mb-2">
                {t("hotel")}
              </p>
              <h3 className="font-display text-[1.375rem] text-[var(--text-primary)] leading-snug">
                {plan.hotel.name}{" "}
                <span className="text-[var(--text-muted)] font-normal text-body-md">{plan.hotel.priceTier}</span>
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

            <div className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-[10px] p-6">
              <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-[0.14em] mb-2">
                {t("airportToHotel")}
              </p>
              <h3 className="font-display text-[1.375rem] text-[var(--text-primary)] leading-snug">
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
              className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-[10px] p-6 mb-4"
            >
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <p className="text-caption uppercase font-semibold text-[var(--brand-primary)] tracking-[0.18em]">
                    {t("day")} {day.dayNumber}
                  </p>
                  <h2 className="font-display text-[1.75rem] text-[var(--text-primary)] leading-tight mt-1">
                    {day.theme}
                  </h2>
                </div>
              </div>
              <p className="text-body-sm text-[var(--text-secondary)] mb-6 leading-relaxed">{day.summary}</p>

              <ol className="space-y-5">
                {day.stops.map((stop) => (
                  <li key={stop.order} className="flex gap-4">
                    <div className="shrink-0 w-16 text-right">
                      <p className="font-semibold text-[var(--brand-primary)] text-body-sm">
                        {stop.time}
                      </p>
                      <p className="text-caption text-[var(--text-muted)] uppercase tracking-[0.1em]">
                        {stop.type}
                      </p>
                    </div>
                    <div className="flex-1 border-l border-[var(--border-light)] pl-4 pb-1">
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
                        <p className="text-caption font-semibold text-[var(--accent-primary)] mt-2">
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
            <div className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-[10px] p-6 mb-6">
              <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-[0.14em] mb-4">
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
              className="text-body-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition"
            >
              {resolvedBackLink.label}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
