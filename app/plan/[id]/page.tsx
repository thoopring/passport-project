import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlan } from "../../../lib/plans";
import PlanMap from "../../../components/PlanMap";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ paid?: string }>;
}

export default async function PlanPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const record = await getPlan(id);
  if (!record) notFound();

  // Status states
  if (record.status === "draft") {
    return (
      <Centered>
        <p className="text-body-md mb-4">This plan hasn&rsquo;t been paid for yet.</p>
        <Link
          href={`/plan/${id}/preview`}
          className="inline-block px-6 py-3 bg-[var(--text-primary)] text-[var(--background)] rounded-xl font-semibold"
        >
          See preview
        </Link>
      </Centered>
    );
  }

  if (record.status === "paid" || record.status === "generating") {
    return <GeneratingState id={id} justPaid={sp.paid === "1"} />;
  }

  if (record.status === "failed") {
    return (
      <Centered>
        <p className="text-body-md mb-2">Sorry, plan generation failed.</p>
        <p className="text-body-sm text-[var(--text-muted)] mb-4">
          {record.failure_reason ?? "Unknown error"}
        </p>
        <p className="text-body-sm text-[var(--text-muted)]">
          We&rsquo;ll process a refund. Email contact@checkvisamap.com if you need help.
        </p>
      </Centered>
    );
  }

  if (record.status !== "complete" || !record.plan) {
    return <Centered>Plan not available.</Centered>;
  }

  const plan = record.plan;

  return (
    <div className="min-h-screen bg-[var(--background)] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-caption uppercase tracking-wider font-semibold text-brand-600 dark:text-brand-400">
            Your trip plan
          </p>
          <h1 className="text-display-lg text-[var(--text-primary)] mt-1">{plan.destination}</h1>
          <p className="text-body-md text-[var(--text-secondary)] mt-1">
            {plan.durationDays}-day itinerary · {plan.destinationCountry}
          </p>
          <a
            href={`/api/plan/${id}/pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[var(--text-primary)] text-[var(--background)] font-semibold text-body-sm rounded-xl hover:opacity-90 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download PDF
          </a>
        </div>

        {/* Overview */}
        <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 mb-6">
          <p className="text-body-md text-[var(--text-primary)] leading-relaxed">{plan.overview}</p>
        </div>

        {/* Map */}
        <div className="mb-6">
          <PlanMap plan={plan} />
        </div>

        {/* Hotel + Transit */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6">
            <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-wider mb-2">
              Hotel
            </p>
            <h3 className="text-body-lg font-semibold text-[var(--text-primary)]">
              {plan.hotel.name} <span className="text-[var(--text-muted)] font-normal">{plan.hotel.priceTier}</span>
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
              Airport → Hotel
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
          <div key={day.dayNumber} className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 mb-4">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <p className="text-caption uppercase font-semibold text-brand-600 dark:text-brand-400 tracking-wider">
                  Day {day.dayNumber}
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
              Practical info
            </p>
            {plan.budgetEstimate && (
              <p className="text-body-sm mb-3">
                <span className="font-semibold text-[var(--text-primary)]">Budget: </span>
                <span className="text-[var(--text-secondary)]">{plan.budgetEstimate}</span>
              </p>
            )}
            {plan.packingTips?.length ? (
              <div className="mb-3">
                <p className="font-semibold text-body-sm text-[var(--text-primary)] mb-1">
                  Packing
                </p>
                <ul className="text-body-sm text-[var(--text-secondary)] space-y-1">
                  {plan.packingTips.map((t, i) => (
                    <li key={i}>· {t}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {plan.generalTips?.length ? (
              <div>
                <p className="font-semibold text-body-sm text-[var(--text-primary)] mb-1">Tips</p>
                <ul className="text-body-sm text-[var(--text-secondary)] space-y-1">
                  {plan.generalTips.map((t, i) => (
                    <li key={i}>· {t}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}

        <div className="text-center pt-6">
          <Link href="/" className="text-body-sm text-[var(--text-muted)] hover:underline">
            ← Back to Passport Power
          </Link>
        </div>
      </div>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>{children}</div>
    </div>
  );
}

function GeneratingState({ id, justPaid }: { id: string; justPaid: boolean }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        {justPaid && (
          <p className="text-caption uppercase tracking-wider font-semibold text-brand-600 dark:text-brand-400 mb-2">
            Payment received
          </p>
        )}
        <h1 className="text-display-md text-[var(--text-primary)] mb-3">
          We&rsquo;re building your plan
        </h1>
        <p className="text-body-md text-[var(--text-secondary)] mb-6">
          This usually takes 30 to 60 seconds. We&rsquo;ll email you the link as soon as it&rsquo;s ready.
        </p>
        <button
          onClick={() => location.reload()}
          className="px-6 py-3 bg-[var(--text-primary)] text-[var(--background)] rounded-xl font-semibold"
        >
          Refresh
        </button>
        <p className="text-caption text-[var(--text-muted)] mt-4">Plan ID: {id}</p>
      </div>
    </div>
  );
}
