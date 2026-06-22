import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { PlanRequest, DaySchema } from "../../types/trip-plan";

/**
 * Pre-checkout Day-1 teaser generator.
 *
 * Produces a REAL, fully-rendered Day 1 from the user's actual inputs BEFORE
 * payment — the "try a real bite" hook. The buyer sees their genuine first day
 * (real hotel-area spots, real times, real routing for THEIR destination), then
 * Days 2..N are blurred until they check out.
 *
 * This is deliberately a SEPARATE, lean path from the post-payment full
 * generator (lib/generator/claude.ts):
 *   - Full plan = Opus scaffold + Opus executor + route-opt, 5-10 min, the
 *     premium deliverable the wait-screen UX is built around.
 *   - Teaser = ONE fast Sonnet call, Day 1 only, ~10-25s. It fires for every
 *     buyer who reaches the review screen (not just payers), so it must be
 *     cheap and fast or it taxes the whole funnel.
 *
 * Cost: ~$0.02-0.04 per teaser (Sonnet, ~1.5-2.5k output tokens). Worth it as
 * a conversion lever — a real Day 1 converts far better than a fake skeleton.
 *
 * Required env: ANTHROPIC_API_KEY
 */

// Fast/cheap tier — a single Day 1, not the full Opus pipeline.
const TEASER_MODEL = "claude-sonnet-4-6";
const TEASER_MAX_TOKENS = 3000;
// Hard ceiling. The buyer is staring at a spinner on the review screen, so we
// fail fast to the static fallback rather than make them wait the full-plan
// budget. ~25-30s covers Sonnet for a single rich day in any locale.
const TEASER_TIMEOUT_MS = 35_000;

let client: Anthropic | null = null;
function getClient(): Anthropic {
  if (client) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");
  client = new Anthropic({ apiKey });
  return client;
}

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  ko: "Korean (한국어)",
  ja: "Japanese (日本語)",
  zh: "Simplified Chinese (简体中文)",
  fr: "French (français)",
};

const LOCALE_CURRENCY: Record<string, { code: string; example: string }> = {
  en: { code: "USD", example: "~$15" },
  ko: { code: "KRW", example: "약 2만원" },
  ja: { code: "JPY", example: "約2,000円" },
  zh: { code: "CNY", example: "约 100 元" },
  fr: { code: "EUR", example: "~14 €" },
};

// The teaser output: a real Day 1 plus the minimal framing the preview card
// shows (overview line + the hotel area the day routes around).
export const DayOneTeaserSchema = z.object({
  overview: z.string(),
  hotelName: z.string().optional(),
  hotelArea: z.string().optional(),
  day1: DaySchema,
});
export type DayOneTeaser = z.infer<typeof DayOneTeaserSchema>;

function buildSystemPrompt(localeCode: string): string {
  const localeName = LOCALE_NAMES[localeCode] ?? LOCALE_NAMES.en;
  const currency = LOCALE_CURRENCY[localeCode] ?? LOCALE_CURRENCY.en;

  return `🌐 OUTPUT LANGUAGE — ${localeName} (${localeCode}). ALL prose fields
(overview, hotelArea, day.theme, day.summary, stop.name, stop.area,
stop.description, stop.duration, stop.transitFromPrev, stop.estimatedCost)
MUST be written in ${localeName}. These rules are in English for clarity; your
OUTPUT is entirely in ${localeName}. Addresses stay in the destination's native
script. Convert prices to ${currency.code} (format like ${currency.example}).

You are an elite travel concierge. The traveler is about to pay $4 for a full
day-by-day plan. RIGHT NOW you write ONLY Day 1 of their trip — a real,
high-quality first day they see for free before checkout. Make it genuinely
useful and specific so they trust the full plan is worth buying.

RULES:
1. ONLY real, well-known, currently-open places. Major landmarks, established
   restaurants, popular districts. NEVER invent a venue. If unsure it exists,
   don't include it.
2. Coordinates must be approximately accurate real lat/lng [lng, lat]. If
   unsure, use the neighborhood/city-center coords — never fabricate precise
   fake ones.
3. Day 1 stop count honors pace: relaxed → 3-4, balanced → 4-5, packed → 5-6.
4. Honor budget tier and the traveler's interests in the venue mix.
5. If children are present, include kid-friendly stops (kidFriendly: true) and
   shorter walks. If an infant, include a rest/quiet block.
6. Geographic clustering — Day 1 stops form a coherent walking/transit path
   around the hotel area, not a zigzag across the city.
7. FLIGHT-AWARE: if an arrival period is given, Day 1's FIRST stop is a
   type:"transit" block "Arrival · {airport}" at the period's representative
   time (early-morning≈07:00, morning≈10:00, afternoon≈14:00, evening≈19:00,
   late-night≈23:00) with a 60-90 min immigration buffer before the next stop.
   Evening/late-night arrival → Day 1 is just airport → hotel → one low-energy
   nearby stop. If no period given, assume a morning start from the airport.
8. Each stop: order (1-indexed), time ("HH:MM"), type
   (sight/meal/activity/transit/rest/shopping), name, coords [lng, lat],
   duration, description (2-3 vivid sentences on WHY this stop), and
   transitFromPrev. estimatedCost and area where useful.

OUTPUT — STRICT JSON ONLY. No prose before/after, no markdown fences:
{
  "overview": "1-2 sentence intro to why THIS Day 1 fits THIS traveler",
  "hotelName": "the hotel this day routes around (real, well-known)",
  "hotelArea": "the neighborhood",
  "day1": {
    "dayNumber": 1,
    "theme": "short theme name",
    "summary": "one sentence summary of the day",
    "stops": [
      {
        "order": 1,
        "time": "09:00",
        "type": "sight",
        "name": "...",
        "area": "optional neighborhood",
        "coords": [lng, lat],
        "duration": "1.5 hours",
        "description": "2-3 sentences on why this stop",
        "estimatedCost": "optional",
        "transitFromPrev": "optional, e.g. 10 min walk"
      }
    ]
  }
}

🌐 FINAL REMINDER: prose in ${localeName}, currency in ${currency.code},
addresses in native script. Day 1 ONLY — do not output other days.`;
}

function buildUserPrompt(req: PlanRequest): string {
  const childInfo =
    req.children > 0
      ? ` Travelling with ${req.children} child(ren)${
          req.childrenAges?.length ? ` (ages: ${req.childrenAges.join(", ")})` : ""
        }${req.strollerNeeded ? ", stroller required" : ""}${
          req.hasInfant ? ", has infant aged 2 or under" : ""
        }.`
      : "";

  const hotelInfo = req.hotelBooked
    ? `Hotel: ALREADY BOOKED${req.hotelName ? ` (${req.hotelName})` : ""} — route Day 1 around this location, do NOT recommend an alternative.`
    : "Hotel: pick one real, well-known hotel matched to the arrival airport and traveler, and route Day 1 around it.";

  return `Write Day 1 only for this trip.

Destination: ${req.destination}, ${req.destinationCountry}
${req.origin ? `Travelling from: ${req.origin}` : ""}
Arrival airport: ${req.arrivalAirport}${req.arrivalTerminal ? ` (Terminal ${req.arrivalTerminal})` : ""}

${hotelInfo}

Travelers: ${req.travelerType}, ${req.adults} adult(s)${childInfo}
Interests: ${req.interests.join(", ")}
Budget tier: ${req.budgetTier}
Pace: ${req.pace}
${req.flightArrival ? `Arrival period: ${req.flightArrival} — start Day 1 at the airport per rule 7.` : ""}
${req.mustVisit ? `Wants to include (work into Day 1 only if it fits geographically): ${req.mustVisit}` : ""}
${req.notes ? `Notes: ${req.notes}` : ""}

Return the Day-1 teaser JSON only. Pure JSON, no markdown.`;
}

function extractJson(text: string): unknown {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  return JSON.parse(cleaned);
}

/**
 * Generate a real Day 1 for the pre-checkout preview. One fast Sonnet call
 * with a single parse-retry, all bounded by TEASER_TIMEOUT_MS. Throws on
 * timeout or terminal failure — the API route catches and the client falls
 * back to the static locked preview.
 */
export async function generateDayOneTeaser(req: PlanRequest): Promise<DayOneTeaser> {
  const anthropic = getClient();
  const systemPrompt = buildSystemPrompt(req.locale ?? "en");

  const callClaude = async (correction?: string): Promise<string> => {
    const messages: Anthropic.MessageParam[] = [
      { role: "user", content: buildUserPrompt(req) },
    ];
    if (correction) {
      messages.push({
        role: "assistant",
        content: "I will fix the issues and return valid JSON only.",
      });
      messages.push({
        role: "user",
        content: `Your previous output failed validation:\n\n${correction}\n\nReturn the corrected Day-1 teaser JSON only.`,
      });
    }

    const response = await anthropic.messages.create({
      model: TEASER_MODEL,
      max_tokens: TEASER_MAX_TOKENS,
      system: systemPrompt,
      messages,
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("Claude returned no text content");
    }
    return textBlock.text;
  };

  const teaserPromise = (async () => {
    let raw = await callClaude();
    try {
      return DayOneTeaserSchema.parse(extractJson(raw));
    } catch (firstErr) {
      const errMsg = firstErr instanceof Error ? firstErr.message : String(firstErr);
      raw = await callClaude(errMsg);
      return DayOneTeaserSchema.parse(extractJson(raw));
    }
  })();

  return await Promise.race<DayOneTeaser>([
    teaserPromise,
    new Promise<DayOneTeaser>((_, reject) =>
      setTimeout(() => reject(new Error("teaser timeout after 35s")), TEASER_TIMEOUT_MS),
    ),
  ]);
}
