import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlan } from "../../../../lib/plans";
import { generateTeaserDay } from "../../../../lib/generator/claude";
import CheckoutButton from "./CheckoutButton";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Preview page — shows a free 1-day teaser before payment.
 *
 * Strategy: generate a cheap (~$0.03) Claude teaser that names 3 well-known
 * stops and one high-level overview. The full plan stays gated behind the
 * $4 paywall. The teaser proves quality without giving away the product.
 */
export default async function PreviewPage({ params }: PageProps) {
  const { id } = await params;
  const record = await getPlan(id);
  if (!record) notFound();

  // If user already paid and plan is generating/complete, send them to the result
  if (record.status !== "draft") {
    return (
      <RedirectMessage id={id} status={record.status} />
    );
  }

  let teaser: Awaited<ReturnType<typeof generateTeaserDay>> | null = null;
  let teaserError: string | null = null;
  try {
    teaser = await generateTeaserDay(record.request);
  } catch (err) {
    teaserError = err instanceof Error ? err.message : "Failed to generate preview";
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-caption uppercase tracking-wider font-semibold text-[var(--text-muted)]">
            Free preview · Day 1
          </p>
          <h1 className="text-display-md text-[var(--text-primary)] mt-2">
            {record.request.destination}
          </h1>
          <p className="text-body-sm text-[var(--text-secondary)] mt-1">
            {record.request.durationDays} days · {record.request.travelerType.replace(/-/g, " ")} ·{" "}
            {record.request.budgetTier}
          </p>
        </div>

        {teaserError && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl p-4 mb-6 text-body-sm text-amber-700 dark:text-amber-400">
            We couldn&rsquo;t generate the preview right now ({teaserError}). You can still
            proceed and we&rsquo;ll generate the full plan after payment.
          </div>
        )}

        {teaser && (
          <>
            <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 mb-6">
              <p className="text-body-md text-[var(--text-primary)] leading-relaxed">
                {teaser.overview}
              </p>
              <p className="text-body-sm text-[var(--text-secondary)] mt-3">
                <span className="font-semibold">Hotel area: </span>
                {teaser.hotelTeaser}
              </p>
            </div>

            <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl p-6 mb-6">
              <p className="text-caption uppercase font-semibold text-brand-600 dark:text-brand-400 tracking-wider">
                Day 1 — {teaser.day1.theme}
              </p>
              <ol className="mt-4 space-y-4">
                {teaser.day1.stops.map((stop, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="shrink-0 w-12 text-right">
                      <p className="font-bold text-brand-600 dark:text-brand-400">{stop.time}</p>
                    </div>
                    <div className="flex-1 border-l-2 border-[var(--border-light)] pl-4 pb-1">
                      <p className="font-semibold text-body-sm text-[var(--text-primary)]">
                        {stop.name}
                      </p>
                      <p className="text-body-sm text-[var(--text-secondary)] mt-0.5">
                        {stop.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}

        {/* Locked content teaser */}
        <div className="relative rounded-2xl border border-dashed border-[var(--border-light)] p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/30 to-[var(--background)] rounded-2xl pointer-events-none" />
          <p className="text-caption uppercase font-semibold text-[var(--text-muted)] tracking-wider mb-4">
            Days 2-{record.request.durationDays} (locked)
          </p>
          <ul className="space-y-2 text-body-sm text-[var(--text-secondary)] blur-sm select-none">
            <li>09:00 — Famous landmark with history and entry tips</li>
            <li>11:30 — Local market with vendor recommendations</li>
            <li>13:00 — Lunch at chef-owned spot near the park</li>
            <li>15:00 — Hidden viewpoint reachable by short walk</li>
            <li>19:30 — Dinner reservation worth booking ahead</li>
          </ul>
        </div>

        {/* Paywall CTA */}
        <div className="bg-[var(--text-primary)] text-[var(--background)] rounded-2xl p-8 text-center">
          <p className="text-caption uppercase tracking-wider opacity-70">One-time payment</p>
          <p className="text-display-lg font-bold mt-1">$4</p>
          <p className="text-body-sm opacity-80 mt-3 max-w-sm mx-auto">
            Unlock the full {record.request.durationDays}-day plan with hotel, airport transit,
            interactive map, restaurant picks, and PDF download.
          </p>
          <div className="mt-6">
            <CheckoutButton planId={id} />
          </div>
          <p className="text-caption opacity-60 mt-4">
            Secure checkout via Lemon Squeezy. We&rsquo;ll email the plan to{" "}
            <span className="font-medium">{record.email}</span>.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/plan/new" className="text-body-sm text-[var(--text-muted)] hover:underline">
            ← Start over
          </Link>
        </div>
      </div>
    </div>
  );
}

function RedirectMessage({ id, status }: { id: string; status: string }) {
  const message =
    status === "complete"
      ? "Your plan is ready."
      : status === "generating" || status === "paid"
      ? "Your plan is being generated. Check back in a minute."
      : `Plan status: ${status}`;
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-body-md text-[var(--text-secondary)] mb-4">{message}</p>
        <Link
          href={`/plan/${id}`}
          className="inline-block px-6 py-3 bg-[var(--text-primary)] text-[var(--background)] rounded-xl font-semibold"
        >
          View plan
        </Link>
      </div>
    </div>
  );
}
