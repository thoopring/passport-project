import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import PlanView from "../../../components/PlanView";
import { getSample, getSampleLocalized, listSamples } from "../../../lib/samples";
import { localizedAlternates } from "../../../lib/i18n/seo";
import type { Locale } from "../../../i18n/locales";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return listSamples().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // Metadata uses the canonical English plan — search engines see one
  // canonical version regardless of viewer locale.
  const sample = getSample(slug);
  if (!sample) return {};

  const title = `${sample.plan.destination} sample plan — ${sample.plan.durationDays} days`;
  return {
    title: `${title} · gliddy`,
    description: sample.tagline,
    alternates: localizedAlternates(`/samples/${slug}`),
    openGraph: {
      title,
      description: sample.tagline,
      url: `https://checkvisamap.com/samples/${slug}`,
      type: "article",
      siteName: "gliddy",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: sample.tagline,
    },
  };
}

/**
 * Map a stop type to the most specific schema.org Place subtype Google
 * recognises. Falls back to generic Place for transit/rest where there
 * isn't a great schema match.
 */
function stopSchemaType(stopType: string): string {
  switch (stopType) {
    case "meal":
      return "FoodEstablishment";
    case "shopping":
      return "Store";
    case "sight":
      return "TouristAttraction";
    case "activity":
      return "TouristAttraction";
    default:
      return "Place"; // transit, rest
  }
}

export default async function SamplePlanPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  // Locale-aware lookup: returns the translated variant when one exists
  // (lib/samples/i18n/{locale}.ts), otherwise the canonical English plan.
  const sample = await getSampleLocalized(slug, locale);
  if (!sample) notFound();
  const t = await getTranslations("samples");

  // Structured data for Google rich results. Two complementary schemas
  // unified under @graph so they share IDs cleanly:
  //   - Article: lets the page surface in news/discover surfaces and
  //     gives Google the article-style metadata (publisher, image,
  //     datePublished) it expects for editorial content.
  //   - TouristTrip: schema.org/TouristTrip is the canonical type for
  //     a travel itinerary. Every day becomes an ItemList of stops
  //     (TouristAttraction / FoodEstablishment / Store / Place subtype
  //     by stop kind). Hotel becomes the trip's accommodation. With
  //     this in place "Tokyo 4 day itinerary" search can pull this
  //     page into a rich travel result with stops, photo, and route.
  const baseUrl = "https://checkvisamap.com";
  const pageUrl = `${baseUrl}/samples/${slug}`;
  const heroImageUrl = sample.heroImage
    ? sample.heroImage.startsWith("http")
      ? sample.heroImage
      : `${baseUrl}${sample.heroImage}`
    : `${baseUrl}/og-image.png`;
  const articleTitle = `${sample.plan.destination} sample plan — ${sample.plan.durationDays} days`;

  const sampleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: articleTitle,
        description: sample.tagline,
        image: heroImageUrl,
        author: {
          "@type": "Organization",
          name: "gliddy",
          url: baseUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "gliddy",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/icon.png`,
          },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        inLanguage: locale,
      },
      {
        "@type": "TouristTrip",
        "@id": `${pageUrl}#trip`,
        name: articleTitle,
        description: sample.tagline,
        touristType: sample.audience,
        provider: { "@type": "Organization", name: "gliddy", url: baseUrl },
        subjectOf: { "@id": `${pageUrl}#article` },
        ...(sample.plan.hotel
          ? {
              accommodation: {
                "@type": "Hotel",
                name: sample.plan.hotel.name,
                address: sample.plan.hotel.address,
                ...(sample.plan.hotel.coords
                  ? {
                      geo: {
                        "@type": "GeoCoordinates",
                        latitude: sample.plan.hotel.coords[1],
                        longitude: sample.plan.hotel.coords[0],
                      },
                    }
                  : {}),
              },
            }
          : {}),
        itinerary: sample.plan.days.map((day) => ({
          "@type": "ItemList",
          name: `Day ${day.dayNumber}: ${day.theme}`,
          description: day.summary,
          numberOfItems: day.stops.length,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: day.stops.map((stop, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": stopSchemaType(stop.type),
              name: stop.name,
              description: stop.description,
              ...(stop.address ? { address: stop.address } : {}),
              ...(stop.coords
                ? {
                    geo: {
                      "@type": "GeoCoordinates",
                      latitude: stop.coords[1],
                      longitude: stop.coords[0],
                    },
                  }
                : {}),
            },
          })),
        })),
      },
    ],
  };

  const cta = (
    <div className="relative overflow-hidden bg-[var(--text-primary)] text-[var(--background)] rounded-3xl p-10 sm:p-14 text-center isolate">
      {/* Warm radial glow — vermilion at top fading down. Stays inside palette,
          gives the dark card a sunset feel without leaving the design system. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,68,43,0.28), transparent 65%)",
        }}
      />

      {/* Caption flanked by short vermilion rules — editorial flourish */}
      <p className="text-caption uppercase tracking-[0.22em] opacity-80 font-semibold inline-flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-[var(--brand-primary)]" />
        {t("sampleCtaTitle")}
        <span aria-hidden className="h-px w-8 bg-[var(--brand-primary)]" />
      </p>

      {/* Italic Fraunces with stylistic alternates — same flourish as the home hero EM */}
      <h2 className="font-display text-display-md mt-5 leading-[1.04] tracking-[-0.012em]">
        <em
          className="italic"
          style={{ fontFeatureSettings: '"ss01","ss02","ss03"' }}
        >
          {t("sampleCtaHeadline")}
        </em>
      </h2>

      <p className="text-body-md opacity-80 mt-4 max-w-md mx-auto leading-relaxed">
        {t("sampleCtaSubtitle")}
      </p>

      {/* Vermilion solid pill button with warm glow — replaces the white slab.
          Tactile lift + glow expansion on hover for a felt sense of motion. */}
      <Link
        href={`/plan/new?dest=${encodeURIComponent(sample.plan.destination)}&country=${encodeURIComponent(sample.plan.destinationCountry)}`}
        className="group relative inline-flex items-center gap-2.5 mt-8 px-9 py-4 bg-[var(--brand-primary)] text-white font-bold text-body-md rounded-full transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5 shadow-[0_10px_28px_-8px_rgba(212,68,43,0.55)] hover:shadow-[0_18px_36px_-8px_rgba(212,68,43,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--text-primary)]"
      >
        {t("sampleCtaButton")}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <p className="text-caption opacity-60 mt-5">{t("sampleCtaCaption")}</p>
    </div>
  );

  // Map the sample's human-readable audience string ("Couple · Midrange",
  // "Family with kids · Midrange", "Solo · Foodie") to the canonical
  // traveler type the wizard uses. Lets the sample page render the same
  // craftedFor tagline as a paid plan, so a /samples/tokyo-4d-couple
  // visitor sees "Crafted for the two of you" instead of the generic
  // default. Order matters — check more-specific phrases first.
  const audienceLower = sample.audience.toLowerCase();
  const sampleTravelerType = audienceLower.includes("family")
    ? "family-with-kids"
    : audienceLower.includes("friends") || audienceLower.includes("group")
      ? "group-of-friends"
      : audienceLower.includes("senior")
        ? "senior"
        : audienceLower.includes("couple")
          ? "couple"
          : audienceLower.includes("solo")
            ? "solo"
            : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sampleJsonLd) }}
      />
      <PlanView
        plan={sample.plan}
        headerLabel={t("sampleHeader")}
        bottomCta={cta}
        backLink={{ href: "/samples", label: t("backToGallery") }}
        heroImage={sample.heroImage}
        triviaSeed={sample.slug}
        travelerType={sampleTravelerType}
      />
    </>
  );
}
