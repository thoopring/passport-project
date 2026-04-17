import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
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
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header showCta={false} />

      <main className="flex-1 py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-caption uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
              {t("badge")}
            </p>
            <h1 className="text-display-lg text-[var(--text-primary)] mb-4 leading-tight">
              {t("headline")}
            </h1>
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
      </main>

      <Footer />
    </div>
  );
}
