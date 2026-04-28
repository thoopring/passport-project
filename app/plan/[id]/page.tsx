import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getPlan } from "../../../lib/plans";
import PlanView from "../../../components/PlanView";
import PostPaymentWait from "../../../components/PostPaymentWait";
import ShareReferralCard from "../../../components/ShareReferralCard";
import SavePlanCta from "../../../components/SavePlanCta";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getOrCreateReferralCode } from "../../../lib/referrals";

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
    // polls status, shows progress + trivia. Replaces the prior static
    // "title + refresh button" screen.
    const destCountry = (record.request as { destinationCountry?: string })
      ?.destinationCountry;
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Header />
        <main className="flex-1">
          <PostPaymentWait planId={id} destinationCountry={destCountry} />
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
    <PlanView
      plan={record.plan}
      downloadHref={`/api/plan/${id}/pdf`}
      bottomCta={
        <div className="space-y-4">
          <SavePlanCta planEmail={record.email} planId={id} />
          {shareUrl ? <ShareReferralCard shareUrl={shareUrl} /> : null}
        </div>
      }
    />
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

