import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import PlanMap from "./PlanMap";
import PlanAffiliateBar from "./PlanAffiliateBar";
import PlanTimeline from "./PlanTimeline";
import AffiliateLink from "./AffiliateLink";
import Header from "./Header";
import Footer from "./Footer";
import type { TripPlan } from "../types/trip-plan";
import { computeDayStats, computeStopBuffers, formatDuration } from "../lib/plan-stats";
import { inferTransitMode, type TransitMode } from "../lib/transit-icons";
import {
  buildAgodaUrl,
  buildAmazonSearchUrl,
  buildKiwiTaxiUrl,
  buildKlookUrl,
} from "../lib/affiliates";

/**
 * Tiny inline icon for the transit hint above each stop. Five concrete
 * modes plus a neutral arrow fallback. Kept inline because the icons
 * are tiny enough that an icon library would be overkill.
 */
function TransitIcon({ mode }: { mode: TransitMode }) {
  const stroke = "currentColor";
  const props = {
    width: 13,
    height: 13,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (mode) {
    case "walk":
      return (
        <svg {...props}>
          <circle cx="13" cy="4" r="2" />
          <path d="M13 6v5l-3 4 2 5M13 11l4 3-1 5M9 14l-3 4" />
        </svg>
      );
    case "transit":
      return (
        <svg {...props}>
          <rect x="5" y="3" width="14" height="14" rx="3" />
          <path d="M8 17l-2 4M16 17l2 4M5 11h14" />
        </svg>
      );
    case "taxi":
      return (
        <svg {...props}>
          <path d="M3 13l2-6h14l2 6v5h-2v2h-2v-2H7v2H5v-2H3z" />
          <circle cx="7.5" cy="15" r="1" />
          <circle cx="16.5" cy="15" r="1" />
        </svg>
      );
    case "drive":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="1.5" />
          <path d="M12 4v6M4 14h6M14 14h6" />
        </svg>
      );
    case "flight":
      return (
        <svg {...props}>
          <path d="M21 15l-7-2-2-8h-2v8l-7 2v2l7-1 2 5h2l1-5 6-1z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
  }
}

interface PlanViewProps {
  plan: TripPlan;
  downloadHref?: string;
  headerLabel?: string;
  bottomCta?: React.ReactNode;
  backLink?: { href: string; label: string };
  /** Optional Unsplash hero photo rendered at top of detail (sample pages). */
  heroImage?: string;
  /** Cached Mapbox Directions polylines from the plan record. When provided,
   *  PlanMap renders walking-aware route segments instead of straight lines. */
  routePolylines?: import("../types/trip-plan").RoutePolylineSegment[] | (import("../types/trip-plan").RoutePolylineSegment | null)[] | null;
}

export default async function PlanView({
  plan,
  downloadHref,
  headerLabel,
  bottomCta,
  backLink,
  heroImage,
  routePolylines,
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {/* Two-column layout on desktop: main content left, sticky
              affiliate sidebar right. On mobile, single column with the
              affiliate bar inline after the map (see below). */}
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
            <div className="min-w-0">
              {/* Header block */}
              <div className="mb-10">
                <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
                  {resolvedHeaderLabel}
                </p>
                <h1 className="font-display text-[2.25rem] sm:text-[3.5rem] text-[var(--text-primary)] leading-[1.05] sm:leading-[1.04] tracking-[-0.018em]">
                  {plan.destination}
                </h1>
                <p className="text-body-md text-[var(--text-secondary)] mt-3">
                  {t("itineraryHeader", { days: plan.durationDays, country: plan.destinationCountry })}
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
                <PlanMap plan={plan} routePolylines={routePolylines ?? undefined} />
              </div>

              {/* Mobile-only: affiliate bar inline after map. Hidden on lg+
                  because the sticky sidebar version (below) takes over. */}
              <div className="lg:hidden">
                <PlanAffiliateBar
                  destination={plan.destination}
                  destinationCountry={plan.destinationCountry}
                />
              </div>

              {/* Hotel + Transit */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-[10px] p-6">
              <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-[0.14em] mb-2">
                {t("hotel")}
              </p>
              <h3 className="font-display text-[1.375rem] text-[var(--text-primary)] leading-snug">
                {plan.hotel.name}
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
              {/* Inline affiliate CTA — Agoda deep-link to the recommended
                  hotel + city. Low-pressure: a small underlined link, not
                  a button. User clicks if they want rates; otherwise it's
                  invisible noise. Sponsored rel via AffiliateLink. */}
              {(() => {
                const link = buildAgodaUrl(plan.destination, plan.hotel.name);
                return (
                  <AffiliateLink
                    href={link.url}
                    category="plan_hotel_inline"
                    label="agoda"
                    className="inline-flex items-center gap-1.5 mt-4 text-body-sm text-[var(--brand-primary)] hover:text-[var(--brand-dark)] underline underline-offset-4 decoration-[var(--brand-primary)]/30 hover:decoration-[var(--brand-primary)] transition"
                  >
                    {link.label}
                    <span aria-hidden>↗</span>
                  </AffiliateLink>
                );
              })()}
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
              {/* Inline affiliate CTA — KiwiTaxi for users who'd rather
                  pre-book a fixed-price taxi than navigate the local
                  transit instructions above. Same low-pressure pattern. */}
              {(() => {
                const link = buildKiwiTaxiUrl();
                return (
                  <AffiliateLink
                    href={link.url}
                    category="plan_transit_inline"
                    label="kiwitaxi"
                    className="inline-flex items-center gap-1.5 mt-4 text-body-sm text-[var(--brand-primary)] hover:text-[var(--brand-dark)] underline underline-offset-4 decoration-[var(--brand-primary)]/30 hover:decoration-[var(--brand-primary)] transition"
                  >
                    {link.label}
                    <span aria-hidden>↗</span>
                  </AffiliateLink>
                );
              })()}
            </div>
          </div>

          {/* Day-jump strip — sticky on desktop, hidden on mobile.
              Anchors map to id={`day-${dayNumber}`} on each day card below. */}
          <PlanTimeline days={plan.days} />

          {/* Days — fully expanded by default on every viewport.
              Earlier iteration wrapped each day in a <details> with
              Day 1 open and Day 2+ collapsed for mobile readability.
              That hid 2/3 of the paid plan's content on first view, and
              browser print captured the collapsed state so the printable
              site lost Day 2-N stops entirely. The PDF deliverable
              already shows everything; the site should match. The user
              paid for the depth — show it. Mobile trades the slightly
              longer scroll for confidence-on-arrival. */}
          {plan.days.map((day) => {
            const stats = computeDayStats(day);
            const buffers = computeStopBuffers(day);
            const hasStats =
              stats.activeMinutes > 0 ||
              stats.transitMinutes > 0 ||
              stats.mealCount > 0 ||
              stats.budgetUSD > 0;
            return (
              <div
                key={day.dayNumber}
                id={`day-${day.dayNumber}`}
                className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-[10px] mb-4 scroll-mt-24 p-6"
              >
                <div className="mb-3">
                  <p className="text-caption uppercase font-semibold text-[var(--brand-primary)] tracking-[0.18em]">
                    {t("day")} {day.dayNumber}
                  </p>
                  <h2 className="font-display text-[1.5rem] sm:text-[1.75rem] text-[var(--text-primary)] leading-tight mt-1">
                    {day.theme}
                  </h2>
                </div>
                <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                  {day.summary}
                </p>
                {/* Stat ribbon — at-a-glance day scope. */}
                {hasStats && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-[var(--text-muted)] mt-3">
                    {stats.activeMinutes > 0 && (
                      <span className="font-semibold text-[var(--text-primary)]">
                        {t("dayTotalActivity", {
                          duration: formatDuration(stats.activeMinutes),
                        })}
                      </span>
                    )}
                    {stats.transitMinutes > 0 && (
                      <>
                        <span aria-hidden>·</span>
                        <span>
                          {t("dayTotalTransit", {
                            duration: formatDuration(stats.transitMinutes),
                          })}
                        </span>
                      </>
                    )}
                    {stats.mealCount > 0 && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{t("dayTotalMeals", { count: stats.mealCount })}</span>
                      </>
                    )}
                    {stats.budgetUSD > 0 && (
                      <>
                        <span aria-hidden>·</span>
                        <span>
                          {t("dayTotalBudget", {
                            amount: Math.round(stats.budgetUSD),
                          })}
                        </span>
                      </>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
                    {/* Hotel-departure anchor — derived from first stop time
                        minus implied walk-from-hotel. Skipped if unparseable. */}
                    {stats.hotelStartTime && (
                      <p className="text-caption uppercase tracking-[0.14em] text-[var(--brand-primary)] font-semibold mb-4">
                        {t("hotelStart", { time: stats.hotelStartTime })}
                      </p>
                    )}

                    {/* Stops — mobile gets a compact card stack (time +
                        type as a header pill, name, description, single
                        meta line) so each stop occupies less vertical
                        space. Desktop keeps the time-column + bordered
                        rail layout for density. */}
                    <ol className="space-y-4 sm:space-y-5">
                      {day.stops.map((stop, idx) => {
                        const buffer = buffers[idx];
                        const tightBorder =
                          buffer?.tightness === "tight"
                            ? "sm:border-l-2 sm:border-l-[var(--brand-primary)]"
                            : "sm:border-l sm:border-[var(--border-light)]";
                        const transitMode = inferTransitMode(stop.transitFromPrev);
                        return (
                          <li key={stop.order} className="flex flex-col sm:flex-row sm:gap-4">
                            {/* Mobile: inline pill row (time + type) above content.
                                Desktop: fixed 64px right-aligned column. */}
                            <div className="shrink-0 sm:w-16 sm:text-right mb-1.5 sm:mb-0 flex items-baseline gap-2 sm:block">
                              <p className="font-semibold text-[var(--brand-primary)] text-body-sm">
                                {stop.time}
                              </p>
                              <p className="text-caption text-[var(--text-muted)] uppercase tracking-[0.1em]">
                                {stop.type}
                              </p>
                            </div>
                            <div className={`flex-1 min-w-0 ${tightBorder} sm:pl-4 sm:pb-1`}>
                              {/* Transit hint as the bridge from the previous stop —
                                  skipped on the first stop of the day (no "previous"). */}
                              {idx > 0 && stop.transitFromPrev && (
                                <p className="text-caption text-[var(--text-muted)] mb-1.5 inline-flex items-center gap-1.5">
                                  <TransitIcon mode={transitMode} />
                                  <span>{stop.transitFromPrev}</span>
                                </p>
                              )}
                              <p className="font-semibold text-body-md sm:text-body-sm text-[var(--text-primary)]">
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
                              </p>
                              {stop.bookingTip && (
                                <p className="text-caption font-semibold text-[var(--accent-primary)] mt-2">
                                  {t("tipLabel")} {stop.bookingTip}
                                </p>
                              )}
                              {/* Tickets/tour affiliate — only on activity-type
                                  stops where a booking-aheadable ticket
                                  actually applies. */}
                              {stop.type === "activity" &&
                                (() => {
                                  const link = buildKlookUrl();
                                  return (
                                    <AffiliateLink
                                      href={link.url}
                                      category="plan_stop_activity"
                                      label="klook"
                                      className="inline-flex items-center gap-1 mt-2 text-caption text-[var(--brand-primary)]/70 hover:text-[var(--brand-primary)] underline underline-offset-4 decoration-[var(--brand-primary)]/20 hover:decoration-[var(--brand-primary)]/60 transition"
                                    >
                                      Find tickets on Klook ↗
                                    </AffiliateLink>
                                  );
                                })()}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
              </div>
            );
          })}

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
                  {/* Single low-pressure affiliate at the end of the
                      packing list. Amazon US Associates store — useful
                      for travel adapters, packing cubes, etc. Search
                      query is destination-aware so a Tokyo plan
                      surfaces "Japan travel essentials" rather than a
                      generic catch-all. */}
                  {(() => {
                    const link = buildAmazonSearchUrl(
                      `${plan.destinationCountry} travel essentials`,
                    );
                    return (
                      <AffiliateLink
                        href={link.url}
                        category="plan_packing_amazon"
                        label="amazon"
                        className="inline-flex items-center gap-1.5 mt-2 text-caption text-[var(--brand-primary)] hover:text-[var(--brand-dark)] underline underline-offset-4 decoration-[var(--brand-primary)]/30 hover:decoration-[var(--brand-primary)] transition"
                      >
                        {link.label} →
                      </AffiliateLink>
                    );
                  })()}
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

            {/* Desktop-only sticky sidebar with the affiliate toolkit. */}
            <aside className="hidden lg:block">
              <div className="lg:sticky lg:top-24">
                <PlanAffiliateBar
                  destination={plan.destination}
                  destinationCountry={plan.destinationCountry}
                />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
