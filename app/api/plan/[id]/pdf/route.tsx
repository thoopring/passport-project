import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getTranslations } from "next-intl/server";
import { getPlan } from "../../../../../lib/plans";
import { PlanDocument } from "../../../../../lib/pdf/PlanDocument";
import { buildOverviewMapUrl, buildDayMapUrl } from "../../../../../lib/map";
import { getDestinationHeroUrl } from "../../../../../lib/destinations/heroes";
import { pickDayPhotos } from "../../../../../lib/destinations/day-photos";
import { readDestinationPhotos } from "../../../../../lib/destinations/auto-fetch";
import { renderableImageUrl } from "../../../../../lib/unsplash";
import type { Locale } from "../../../../../i18n/locales";

export const runtime = "nodejs";

/**
 * GET /api/plan/[id]/pdf
 *
 * Streams the trip plan as a PDF. Only works for completed plans.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const record = await getPlan(id);
  if (!record) {
    return new NextResponse("Not found", { status: 404 });
  }
  if (record.status !== "complete" || !record.plan) {
    return new NextResponse(`Plan not ready (status: ${record.status})`, { status: 409 });
  }

  // Cover page gets the overview map (transit/airport stops excluded so the
  // bounds don't blow out to a 70-km square). Each day page gets its own
  // tight-zoom mini-map. See lib/map.ts for the rationale.
  const mapImageUrl = buildOverviewMapUrl(record.plan);
  const dayMapUrls = record.plan.days.map((day) =>
    buildDayMapUrl(day, record.plan!.hotel),
  );

  // Trivia is locale-aware — the PDF caller picks facts for the user's
  // chosen language so the "Did you know?" cards don't break the
  // immersion of an otherwise locale-consistent document. Falls back to
  // English when a locale-specific pool is missing for a country.
  const planLocale = (record.request.locale ?? "en") as Locale;
  const labelT = await getTranslations({ locale: planLocale, namespace: "plan" });

  // Cinematic destination photo at the top of the cover. Same catalog
  // the in-browser plan view uses, so the offline PDF and the live site
  // open with the same emotional anchor. Cold-start destinations (not in
  // the catalog) skip the hero — clean text-led cover instead of a wrong
  // generic photo.
  // The hero/day-photo resolvers return either full Unsplash URLs OR
  // self-hosted local paths ("/destinations/..."). react-pdf's <Image>
  // can't resolve relative paths (no host context), so we prefix local
  // paths with the public site URL — same CDN the in-browser <Image>
  // serves them from, just absolutized for the cross-context fetch.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://checkvisamap.com";
  const absolutize = (u: string | null | undefined): string | undefined => {
    if (!u) return undefined;
    return u.startsWith("/") ? `${baseUrl}${u}` : u;
  };

  // Catalog first, Unsplash auto-fetch cache second. Same fallback
  // chain as the site's PlanView; mirrors the in-browser experience.
  // Always read the cache: a destination can be in the hero catalog
  // but still need cold-start day photos (e.g. Singapore — hero yes,
  // day photos no). Gating cache lookup on hero presence loses those.
  const catalogHero = getDestinationHeroUrl(record.plan.destination);
  const cachedPhotos = await readDestinationPhotos(record.plan.destination);
  const autoHero = cachedPhotos?.hero ?? null;
  const heroImageUrl = catalogHero
    ? absolutize(catalogHero)
    : autoHero
      ? renderableImageUrl(autoHero.url, 1600)
      : undefined;
  const heroAttributionLine = autoHero
    ? `Photo: ${autoHero.photographerName} / Unsplash`
    : undefined;

  // Per-day photos with the same fallback chain.
  const catalogDayPhotos = pickDayPhotos(
    record.plan.destination,
    record.plan.days.length,
    id,
  );
  const dayPhotoUrls: string[] = record.plan.days.map((_, idx) => {
    if (catalogDayPhotos[idx]) return absolutize(catalogDayPhotos[idx])!;
    const cachedDay = cachedPhotos?.days[idx];
    if (cachedDay) return renderableImageUrl(cachedDay.url, 900);
    return "";
  });
  // Parallel array of attribution captions per day (empty string when no
  // attribution needed — catalog photos or no photo). PDF render shows
  // the caption below the image when non-empty.
  const dayAttributionLines: string[] = record.plan.days.map((_, idx) => {
    if (catalogDayPhotos[idx]) return "";
    const cachedDay = cachedPhotos?.days[idx];
    if (cachedDay) {
      return `Photo: ${cachedDay.photographerName} / Unsplash`;
    }
    return "";
  });

  // Cover-page strings — localized server-side because react-pdf can't
  // call useTranslations.
  // Traveler-aware tagline mirrors the in-browser plan view so the
  // keepsake echoes the buyer's wizard inputs ("crafted for the two
  // of you" / "두 분을 위해 다듬은 플랜"). Falls back to default when
  // travelerType is missing or unmapped.
  const travelerType =
    (record.request as { travelerType?: string })?.travelerType;
  const travelerKey =
    travelerType === "solo"
      ? "solo"
      : travelerType === "couple"
        ? "couple"
        : travelerType === "family-with-kids"
          ? "family"
          : travelerType === "group-of-friends"
            ? "friends"
            : travelerType === "senior"
              ? "senior"
              : "default";
  const craftedForLine = labelT(`craftedFor.${travelerKey}`);
  const subtitleLine = labelT("itineraryHeader", {
    days: record.plan.durationDays,
    country: record.plan.destinationCountry,
  });
  const overviewHeader = labelT("yourTripPlan");

  // Localized "Generated DD MMM YYYY" footer for the cover. Uses the
  // record's created_at when available so the date reflects when the
  // plan was actually generated, not when the user re-downloaded it.
  // Falls back to today if created_at is missing.
  const generatedDate = record.created_at
    ? new Date(record.created_at)
    : new Date();
  const generatedAtLine = generatedDate.toLocaleDateString(planLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const buffer = await renderToBuffer(
    <PlanDocument
      plan={record.plan}
      mapImageUrl={mapImageUrl}
      heroImageUrl={heroImageUrl}
      heroAttributionLine={heroAttributionLine}
      dayMapUrls={dayMapUrls}
      dayPhotoUrls={dayPhotoUrls}
      dayAttributionLines={dayAttributionLines}
      locale={planLocale}
      triviaLabel={labelT("triviaLabel")}
      triviaSeed={id}
      craftedForLine={craftedForLine}
      generatedAtLine={generatedAtLine}
      subtitleLine={subtitleLine}
      overviewHeader={overviewHeader}
    />
  );

  // Convert Node Buffer to Uint8Array for NextResponse body compatibility
  const body = new Uint8Array(buffer);

  // Filename header must be ASCII (HTTP ByteString). For non-ASCII
  // destinations (e.g. "도쿄"), Claude often returns the destination field in
  // the user's locale, so we use a locale-agnostic ASCII filename and supply
  // the localized name via RFC 5987 `filename*=UTF-8''` for modern browsers.
  const asciiName = `gliddy-${id.slice(0, 8)}.pdf`;
  const utf8Name = encodeURIComponent(
    `gliddy-${record.plan.destination}.pdf`,
  ).replace(/'/g, "%27");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${asciiName}"; filename*=UTF-8''${utf8Name}`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
