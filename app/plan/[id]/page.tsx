import { notFound } from "next/navigation";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { getPlan } from "../../../lib/plans";
import PlanView from "../../../components/PlanView";
import PostPaymentWait from "../../../components/PostPaymentWait";
import type { ShowcaseSample } from "../../../components/WaitSampleShowcase";
import ShareReferralCard from "../../../components/ShareReferralCard";
import SavePlanCta from "../../../components/SavePlanCta";
import CheckoutCompletedTracker from "../../../components/CheckoutCompletedTracker";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getOrCreateReferralCode } from "../../../lib/referrals";
import { listSamplesLocalized } from "../../../lib/samples";
import type { Locale } from "../../../i18n/locales";

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
  const t = await getTranslations("plan");

  // Status states
  if (record.status === "draft") {
    // Drafts shouldn't normally exist anymore — the loading screen creates a
    // draft and immediately routes to checkout. If a user lands here it's
    // either an abandoned draft or a stale link. Send them to start over.
    return (
      <Centered>
        <p className="text-body-md mb-4">{t("draftMessage")}</p>
        <Link
          href="/plan/new"
          className="inline-block px-6 py-3 bg-[var(--text-primary)] text-[var(--background)] rounded-xl font-semibold"
        >
          {t("draftStartOver")}
        </Link>
      </Centered>
    );
  }

  if (record.status === "paid" || record.status === "generating") {
    // Engaging wait screen — broadcasts "paid" to the opener loading tab,
    // polls status, rotates a hero photo carousel, shows tips, and offers
    // a 3-card sample showcase the buyer can read while their plan
    // generates. The wait runs 5-10 min on the quality-first pipeline,
    // so this is an active engagement surface, not a placeholder.
    const destCountry = (record.request as { destinationCountry?: string })
      ?.destinationCountry;

    // Pick three featured samples to surface. Same trio as the home
    // page hero anchor row (Tokyo / Paris / Bali) so we ship a known-
    // good rotation without per-destination logic. Best-effort — if
    // sample loading fails for any reason, we render the wait screen
    // without the showcase rather than blocking the page.
    const locale = (await getLocale()) as Locale;
    let showcaseSamples: ShowcaseSample[] = [];
    try {
      const all = await listSamplesLocalized(locale);
      const slugs = ["tokyo-4d-couple", "paris-3d-family", "bali-5d-couple"];
      showcaseSamples = slugs
        .map((slug) => all.find((s) => s.slug === slug))
        .filter((s): s is NonNullable<typeof s> => Boolean(s))
        .map((s) => ({
          slug: s.slug,
          destination: s.plan.destination,
          destinationCountry: s.plan.destinationCountry,
          durationDays: s.plan.durationDays,
          heroImage: s.heroImage,
        }));
    } catch (err) {
      console.warn("[plan/wait] sample showcase load failed (non-fatal)", err);
    }

    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Header />
        <main className="flex-1">
          <PostPaymentWait
            planId={id}
            destinationCountry={destCountry}
            showcaseSamples={showcaseSamples}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (record.status === "failed") {
    return (
      <Centered>
        <p className="text-body-md mb-2">{t("failedTitle")}</p>
        <p className="text-body-sm text-[var(--text-muted)] mb-4">
          {record.failure_reason ?? "Unknown error"}
        </p>
        <p className="text-body-sm text-[var(--text-muted)]">{t("failedRefund")}</p>
      </Centered>
    );
  }

  if (record.status !== "complete" || !record.plan) {
    return <Centered>Plan not available.</Centered>;
  }

  // Best-effort referral code lookup. Failure (e.g. Supabase down) shouldn't
  // block the plan from rendering — just hide the share card.
  let shareUrl: string | null = null;
  try {
    const code = await getOrCreateReferralCode(record.email);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://checkvisamap.com";
    shareUrl = `${baseUrl}/r/${code}`;
  } catch (err) {
    console.error("getOrCreateReferralCode failed (non-fatal)", err);
  }

  return (
    <>
      <CheckoutCompletedTracker
        planId={id}
        destination={record.plan.destination}
        paymentId={record.payment_id}
      />
      <PlanView
        plan={record.plan}
        downloadHref={`/api/plan/${id}/pdf`}
        routePolylines={record.route_polylines ?? undefined}
        bottomCta={
          <div className="space-y-4">
            <SavePlanCta planEmail={record.email} planId={id} />
            {shareUrl ? <ShareReferralCard shareUrl={shareUrl} /> : null}
          </div>
        }
      />
    </>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
}

