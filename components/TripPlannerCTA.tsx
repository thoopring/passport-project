import Link from "next/link";

interface TripPlannerCTAProps {
  destination: string;
  destinationCountry?: string;
  origin?: string;
  variant?: "hero" | "compact";
}

/**
 * Trip planner CTA — used on visa detail pages and elsewhere to funnel
 * intent traffic into the paid trip planner. Renders as a Link so it
 * works inside Server Components without a client boundary.
 */
export default function TripPlannerCTA({
  destination,
  destinationCountry,
  origin,
  variant = "hero",
}: TripPlannerCTAProps) {
  const params = new URLSearchParams({ dest: destination });
  if (destinationCountry && destinationCountry !== destination) {
    params.set("country", destinationCountry);
  }
  if (origin) params.set("origin", origin);
  const href = `/plan/new?${params.toString()}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="block bg-[var(--text-primary)] text-[var(--background)] rounded-xl px-5 py-4 hover:opacity-90 transition"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-semibold text-body-sm">Plan your {destination} trip — $4</p>
            <p className="text-caption opacity-70 mt-0.5">
              Day-by-day itinerary, hotel, route map, PDF
            </p>
          </div>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[var(--text-primary)] to-brand-700 dark:from-brand-800 dark:to-brand-950 text-[var(--background)] rounded-2xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex-1">
          <p className="text-caption uppercase tracking-wider font-semibold opacity-70">
            Going to {destination}?
          </p>
          <h3 className="text-display-sm font-bold mt-1.5">
            Get a personalized {destination} trip plan
          </h3>
          <p className="text-body-sm opacity-80 mt-2 max-w-md">
            Day-by-day itinerary tailored to your travel style. Hotel pick that matches your
            arrival airport. Route map and PDF you can carry on the trip.
          </p>
        </div>
        <Link
          href={href}
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[var(--text-primary)] font-bold rounded-xl hover:opacity-90 transition whitespace-nowrap"
        >
          Start planning
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <p className="text-caption opacity-60 mt-4">$4 · Mobile web link + PDF · No signup required</p>
    </div>
  );
}
