import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getPlan } from "../../../lib/plans";
import PlanView from "../../../components/PlanView";

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
    return <GeneratingState id={id} justPaid={sp.paid === "1"} t={t} />;
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

  return <PlanView plan={record.plan} downloadHref={`/api/plan/${id}/pdf`} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>{children}</div>
    </div>
  );
}

interface GeneratingStateProps {
  id: string;
  justPaid: boolean;
  t: (key: string) => string;
}

function GeneratingState({ id, justPaid, t }: GeneratingStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        {justPaid && (
          <p className="text-caption uppercase tracking-wider font-semibold text-brand-600 dark:text-brand-400 mb-2">
            {t("paymentReceived")}
          </p>
        )}
        <h1 className="text-display-md text-[var(--text-primary)] mb-3">{t("generatingTitle")}</h1>
        <p className="text-body-md text-[var(--text-secondary)] mb-6">{t("generatingSubtitle")}</p>
        <a
          href={`/plan/${id}`}
          className="inline-block px-6 py-3 bg-[var(--text-primary)] text-[var(--background)] rounded-xl font-semibold"
        >
          {t("generatingRefresh")}
        </a>
        <p className="text-caption text-[var(--text-muted)] mt-4">Plan ID: {id}</p>
      </div>
    </div>
  );
}
