import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import visaDataRaw from "../../../visa_data.json";

interface VisaData {
  origin: string;
  destination: string;
  requirement: string;
  allowed_stay?: string;
  notes?: string;
  capital?: string;
  currency?: string;
  region?: string;
  population?: string;
  languages?: string;
  plug_type?: string;
  emergency_number?: string;
  greeting?: string;
  best_time_to_visit?: string;
}

const visaData: VisaData[] = visaDataRaw as VisaData[];

const POPULAR_DESTINATIONS: Record<string, string[]> = {
  "South Korea": ["Japan", "Vietnam", "Thailand", "Philippines", "Taiwan", "Guam"],
  "United States": ["Mexico", "Canada", "United Kingdom", "Italy", "France", "Japan"],
};

function createSlug(destination: string, origin: string) {
  const p = origin.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const d = destination.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${p}-to-${d}`;
}

export async function generateStaticParams() {
  return visaData
    .filter((visa) => visa.destination.length <= 50 && visa.destination && visa.origin)
    .map((visa) => ({ slug: createSlug(visa.destination, visa.origin) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const visa = visaData.find((v) => createSlug(v.destination, v.origin) === slug);
  if (!visa) return { title: "Visa Info Not Found" };

  const title = `${visa.origin} to ${visa.destination}: Visa Requirements 2026`;
  const description = `${visa.origin} passport holders: Check ${visa.destination} visa requirements, allowed stay, travel essentials, currency, emergency numbers & best time to visit.`;
  const url = `https://checkvisamap.com/visa/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", siteName: "Passport Power", images: [{ url: "https://checkvisamap.com/og-image.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const visa = visaData.find((v) => createSlug(v.destination, v.origin) === resolvedParams.slug);
  if (!visa) notFound();

  const cleanReq = visa.requirement.replace(/\[.*?\]/g, "").trim();
  const reqLower = cleanReq.toLowerCase();
  const isVisaFree = reqLower.includes("visa not required") || reqLower.includes("visa free");
  const isOnArrival = reqLower.includes("visa on arrival");
  const isEVisa = reqLower.includes("electronic") || reqLower.includes("evisa");
  const isBanned = reqLower.includes("banned") || reqLower.includes("refused");

  let statusStyle = { bg: "bg-red-50 dark:bg-red-950/20", border: "border-red-100 dark:border-red-900", text: "text-red-700 dark:text-red-400", dot: "bg-red-500" };
  if (isVisaFree) statusStyle = { bg: "bg-green-50 dark:bg-green-950/20", border: "border-green-100 dark:border-green-900", text: "text-green-700 dark:text-green-400", dot: "bg-green-500" };
  else if (isOnArrival) statusStyle = { bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-100 dark:border-amber-900", text: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" };
  else if (isEVisa) statusStyle = { bg: "bg-cyan-50 dark:bg-cyan-950/20", border: "border-cyan-100 dark:border-cyan-900", text: "text-cyan-700 dark:text-cyan-400", dot: "bg-cyan-500" };

  const cleanNotes = visa.notes && visa.notes.toLowerCase() !== "nan" ? visa.notes.replace(/\[.*?\]/g, "").trim() : null;
  const cleanPop = visa.population && visa.population !== "0" ? visa.population : null;

  const nearbyVisas = visaData
    .filter((v) => v.origin === visa.origin && v.region === visa.region && v.destination !== visa.destination && v.destination.length < 50)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  const popularList = POPULAR_DESTINATIONS[visa.origin] || [];
  const popularVisas = visaData
    .filter((v) => v.origin === visa.origin && popularList.includes(v.destination) && v.destination !== visa.destination)
    .slice(0, 4);

  const hotelLink = `https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1956855&hl=en-us&city=${visa.destination}`;
  const flightLink = "https://aviasales.tpx.lu/M1CWAKTJ";
  const tourLink = `https://www.viator.com/searchResults/all?text=${visa.destination}`;
  const isEurope = visa.region === "Europe";

  const essentials = [
    { label: "Capital", value: visa.capital },
    { label: "Currency", value: visa.currency },
    { label: "Plug Type", value: visa.plug_type },
    { label: "Emergency", value: visa.emergency_number || "112" },
    { label: "Best Season", value: visa.best_time_to_visit },
    { label: "Greeting", value: visa.greeting },
    { label: "Region", value: visa.region },
    ...(cleanPop ? [{ label: "Population", value: cleanPop }] : []),
  ];

  const travelTools = [
    { name: "Flights", desc: "Compare airlines", href: flightLink, color: "bg-sky-50 dark:bg-sky-950/20 border-sky-100 dark:border-sky-900 text-sky-700 dark:text-sky-300" },
    { name: "Hotels", desc: `Stay in ${visa.destination}`, href: hotelLink, color: "bg-violet-50 dark:bg-violet-950/20 border-violet-100 dark:border-violet-900 text-violet-700 dark:text-violet-300" },
    { name: "eSIM", desc: "Stay connected", href: "https://airalo.pxf.io/2anR7A", color: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300" },
    { name: "Tours", desc: "Top activities", href: tourLink, color: "bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900 text-orange-700 dark:text-orange-300" },
    { name: "Insurance", desc: "Travel safe", href: "https://www.insubuy.com/", color: "bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900 text-rose-700 dark:text-rose-300" },
    { name: "VPN", desc: "Secure Wi-Fi", href: "https://nordvpn.com/", color: "bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300" },
    ...(isEurope ? [{ name: "Trains", desc: "Eurail passes", href: "https://www.raileurope.com/", color: "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900 text-red-700 dark:text-red-300" }] : []),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://checkvisamap.com" },
      { "@type": "ListItem", position: 2, name: `${visa.origin} to ${visa.destination}`, item: `https://checkvisamap.com/visa/${resolvedParams.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Do ${visa.origin} citizens need a visa for ${visa.destination}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${cleanReq}${visa.allowed_stay ? `. Allowed stay: ${visa.allowed_stay}` : ""}${cleanNotes ? `. ${cleanNotes}` : ""}`,
        },
      },
      ...(visa.capital ? [{ "@type": "Question", name: `What is the capital of ${visa.destination}?`, acceptedAnswer: { "@type": "Answer", text: visa.capital } }] : []),
      ...(visa.currency ? [{ "@type": "Question", name: `What currency is used in ${visa.destination}?`, acceptedAnswer: { "@type": "Answer", text: visa.currency } }] : []),
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-caption text-[var(--text-muted)] mb-6">
          <Link href="/" className="hover:text-[var(--text-primary)] transition">Home</Link>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span className="text-[var(--text-secondary)]">{visa.destination}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-display-lg text-[var(--text-primary)] mb-2">
            {visa.origin} &rarr; {visa.destination}
          </h1>
          <p className="text-body-md text-[var(--text-secondary)]">Visa requirements &amp; travel essentials</p>
        </div>

        {/* Status Card */}
        <div className={`${statusStyle.bg} border ${statusStyle.border} rounded-2xl p-6 mb-6`}>
          <div className="flex items-start gap-4">
            <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${statusStyle.dot}`} />
            <div>
              <p className="text-caption uppercase font-semibold text-[var(--text-muted)] mb-1">Visa Requirement</p>
              <p className={`text-display-sm ${statusStyle.text}`}>{cleanReq}</p>
              {visa.allowed_stay && (
                <p className="text-body-sm text-[var(--text-secondary)] mt-2">
                  Allowed stay: <span className="font-semibold text-[var(--text-primary)]">{visa.allowed_stay}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        {cleanNotes && (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-xl p-5 mb-6">
            <p className="text-caption uppercase font-semibold text-amber-700 dark:text-amber-400 mb-1.5">Important Note</p>
            <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">{cleanNotes}</p>
          </div>
        )}

        {/* Travel Essentials */}
        <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-[var(--border-light)]">
            <h2 className="text-body-md font-semibold text-[var(--text-primary)]">Travel Essentials</h2>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {essentials.map((item) => (
              <div key={item.label}>
                <p className="text-caption uppercase font-semibold text-[var(--text-muted)] mb-1">{item.label}</p>
                <p className="text-body-sm font-medium text-[var(--text-primary)]">{item.value || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Tools */}
        <div className="mb-8">
          <p className="text-caption uppercase font-semibold text-[var(--text-muted)] mb-3 tracking-wider">
            Book your trip
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {travelTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`${tool.color} border rounded-xl p-3.5 hover-lift group text-center`}
              >
                <p className="font-semibold text-body-sm">{tool.name}</p>
                <p className="text-caption opacity-70 mt-0.5">{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Nearby Destinations */}
        {nearbyVisas.length > 0 && (
          <div className="mb-8">
            <h3 className="text-body-md font-semibold text-[var(--text-primary)] mb-4">
              Nearby in {visa.region}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {nearbyVisas.map((v) => {
                const vReq = v.requirement.toLowerCase();
                const isFree = vReq.includes("visa not required") || vReq.includes("visa free");
                return (
                  <Link
                    key={v.destination}
                    href={`/visa/${createSlug(v.destination, v.origin)}`}
                    className="flex items-center justify-between p-3 bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-xl hover:border-[var(--text-muted)] transition group"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-body-sm text-[var(--text-primary)] truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">{v.destination}</p>
                      <p className={`text-caption font-medium mt-0.5 ${isFree ? "text-green-600 dark:text-green-400" : "text-[var(--text-muted)]"}`}>
                        {v.requirement.replace(/\[.*?\]/g, "").trim().slice(0, 20)}
                      </p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Popular */}
        {popularVisas.length > 0 && (
          <div className="mb-8">
            <h3 className="text-body-md font-semibold text-[var(--text-primary)] mb-4">
              Popular with {visa.origin} travelers
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {popularVisas.map((v) => (
                <Link
                  key={v.destination}
                  href={`/visa/${createSlug(v.destination, v.origin)}`}
                  className="p-3 bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-xl hover:border-brand-400 transition text-center group"
                >
                  <p className="font-medium text-body-sm text-[var(--text-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">{v.destination}</p>
                  <p className="text-caption text-brand-600 dark:text-brand-400 font-medium mt-1">View &rarr;</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back CTA */}
        <div className="text-center pt-8 border-t border-[var(--border-light)]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text-primary)] text-[var(--background)] font-semibold rounded-xl hover:opacity-90 transition"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Back to Visa Map
          </Link>
        </div>
      </div>
    </div>
  );
}
