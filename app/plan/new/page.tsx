import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PlanWizardStep1 from "./PlanWizardStep1";

export const metadata: Metadata = {
  title: "Build your trip plan — Passport Power",
  description:
    "Tell us about your trip and get a personalized day-by-day itinerary with hotel pick, airport transit, restaurants, and a route map. Mobile web link + PDF for $4.",
  alternates: { canonical: "https://checkvisamap.com/plan/new" },
  openGraph: {
    title: "Build your trip plan — Passport Power",
    description:
      "Personalized day-by-day itinerary with map, hotel, restaurants. Mobile web link + PDF for $4.",
    url: "https://checkvisamap.com/plan/new",
    type: "website",
  },
};

interface PageProps {
  searchParams: Promise<{
    dest?: string;
    country?: string;
    origin?: string;
    promo?: string;
  }>;
}

export default async function NewPlanPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const t = await getTranslations("wizard.step1");

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-caption font-semibold text-brand-700 dark:text-brand-300 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse-slow" />
            {t("badge")}
          </p>
          <h1 className="text-display-lg text-[var(--text-primary)] mb-3">{t("headline")}</h1>
          <p className="text-body-md text-[var(--text-secondary)] max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <PlanWizardStep1
          defaultDestination={params.dest ?? ""}
          defaultCountry={params.country ?? params.dest ?? ""}
          defaultOrigin={params.origin ?? ""}
          defaultPromoCode={params.promo}
        />
      </div>
    </div>
  );
}
