import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlanView from "../../../components/PlanView";
import { getSample, listSamples } from "../../../lib/samples";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return listSamples().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sample = getSample(slug);
  if (!sample) return {};

  const title = `${sample.plan.destination} sample plan — ${sample.plan.durationDays} days`;
  return {
    title: `${title} · Passport Power`,
    description: sample.tagline,
    alternates: { canonical: `https://checkvisamap.com/samples/${slug}` },
    openGraph: {
      title,
      description: sample.tagline,
      url: `https://checkvisamap.com/samples/${slug}`,
      type: "article",
    },
  };
}

export default async function SamplePlanPage({ params }: PageProps) {
  const { slug } = await params;
  const sample = getSample(slug);
  if (!sample) notFound();

  const cta = (
    <div className="bg-[var(--text-primary)] text-[var(--background)] rounded-2xl p-8 sm:p-10 text-center">
      <p className="text-caption uppercase tracking-wider opacity-70 font-semibold">
        Like this sample?
      </p>
      <h2 className="text-display-md font-bold mt-2">Get one for your trip</h2>
      <p className="text-body-md opacity-80 mt-3 max-w-md mx-auto">
        Same depth, written for your dates, your group, your budget. Mobile web link + PDF in
        minutes.
      </p>
      <Link
        href={`/plan/new?dest=${encodeURIComponent(sample.plan.destination)}&country=${encodeURIComponent(sample.plan.destinationCountry)}`}
        className="inline-block mt-6 px-7 py-3.5 bg-white text-[var(--text-primary)] font-bold rounded-xl hover:opacity-90 transition"
      >
        Plan my trip — $4
      </Link>
      <p className="text-caption opacity-60 mt-4">No signup · No subscription</p>
    </div>
  );

  return (
    <PlanView
      plan={sample.plan}
      headerLabel="Sample plan"
      bottomCta={cta}
      backLink={{ href: "/samples", label: "← All sample plans" }}
    />
  );
}
