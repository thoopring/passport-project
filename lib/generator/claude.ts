import Anthropic from "@anthropic-ai/sdk";
import {
  PlanRequest,
  TripPlan,
  TripPlanSchema,
  type Day,
  type Scaffold,
} from "../../types/trip-plan";
import { getSampleLocalized } from "../samples";
import type { Locale } from "../../i18n/locales";
import { generateScaffold } from "./scaffold";

/**
 * Claude trip plan generator.
 *
 * Strategy:
 *   1. Strong system prompt anchoring on well-known, popular places to avoid
 *      hallucinated restaurants / closed venues.
 *   2. Force JSON output that matches TripPlanSchema.
 *   3. Validate with zod. On parse failure, retry once with the parse error
 *      fed back to Claude as a correction prompt.
 *   4. Hard constraints in the prompt: hotel near user's arrival airport,
 *      kid-friendly stops if children present, pace honored.
 *
 * Cost expectation (Sonnet 4.5):
 *   ~3-6k input tokens + ~4-8k output tokens = $0.10-0.30 per plan.
 *
 * Required env: ANTHROPIC_API_KEY
 */

const MODEL = "claude-sonnet-4-5";
// Bumped from 8000 → 16000 after a launch-test failure surfaced
// "Unterminated string in JSON at position 13400" — output truncated
// mid-token. Korean prose is roughly 1.5-2 chars/token vs English's 4,
// so a 4-5 day Korean plan with editorial-depth descriptions overflows
// 8k tokens. 16k gives ~25-30k chars headroom — comfortable for a
// 7-day packed-pace plan in any locale.
const MAX_OUTPUT_TOKENS = 16000;

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

const LOCALE_CURRENCY: Record<string, { code: string; symbol: string; example: string }> = {
  en: { code: "USD", symbol: "$", example: "~$140/night" },
  ko: { code: "KRW", symbol: "원", example: "약 19만원/박" },
  ja: { code: "JPY", symbol: "円", example: "1泊 約20,000円" },
  zh: { code: "CNY", symbol: "元", example: "约 1,000 元/晚" },
  fr: { code: "EUR", symbol: "€", example: "~135 €/nuit" },
};

const SYSTEM_PROMPT_BODY = `You are an elite travel concierge writing a detailed, personalized trip itinerary that the traveler will pay $4 to receive as a mobile-responsive secret web link plus a downloadable PDF for offline use.

CRITICAL RULES — VIOLATING THESE RUINS THE PRODUCT:

1. ONLY recommend places that are well-known, established, and unlikely to be closed. Major museums, landmark restaurants featured in mainstream guides, popular districts. NEVER invent restaurants, hotels, or attractions. If you are not certain a place exists and is open, do not include it.

2. Hotel choice MUST consider the arrival airport and terminal the user specified. If they land at NRT Terminal 1, do NOT recommend a hotel that requires a 90-minute Haneda transfer. Pick a hotel in a neighborhood with smooth direct transit from that specific airport.

3. Coordinates MUST be approximately accurate. Use real lat/lng for known landmarks (you have these in your training data for any famous place). If uncertain, use the city center coords rather than fabricate.

4. Daily pacing MUST honor the user's pace setting:
   - "relaxed": 3-4 stops per day, late starts, long meal breaks
   - "balanced": 5-6 stops, normal pacing
   - "packed": 7-9 stops, early starts, efficient transit

5. If children are present (family-with-kids), EVERY day must include kid-friendly stops, shorter walks between stops, and at least one bathroom-accessible meal stop. Flag stops with kidFriendly: true. If strollerNeeded is true, every walking distance MUST be stroller-accessible (no stairs-only routes, no cobblestones-only paths). If hasInfant is true, every day must include a quiet/rest stop and a meal venue with a baby-changing facility.

6. Budget tier MUST be honored:
   - "budget": street food, hostels/3-star, free attractions, public transit
   - "midrange": casual sit-down, 4-star, paid attractions OK, mix transit/taxi
   - "luxury": fine dining, 5-star, premium experiences, private transit

7. Respect the user's interests. If they picked "food", give 2-3 standout meal stops per day. If they picked "history", weight toward museums, old quarters, monuments.

8. Each Stop must have: order (1-indexed within the day), time (24h "HH:MM"), type (sight/meal/activity/transit/rest/shopping), name, coords [lng, lat], duration, description (2-3 sentences with WHY this stop matters), and transitFromPrev (how to get there from the previous stop in walking/transit minutes).

9. Stops within a day MUST be geographically clustered to minimize backtracking. Do not zigzag across the city. EXAMPLE OF BAD ZIGZAG: morning at the western shrine, lunch in the eastern downtown, afternoon back at the central park, dinner back east. EXAMPLE OF GOOD CLUSTERING: morning at western shrine, lunch at western district café, afternoon walking east through the central park, dinner in the eastern downtown. The route from stop 1 to stop N should be a coherent geographic path, not a star pattern.

10. The airportTransit object must give the actual best option (e.g., "Narita Express to Tokyo Station, then JR Yamanote line"), with realistic duration and cost.

11. If hotelBooked is true in the request, you MUST still produce a hotel object — but use the user's hotelName (if provided) and pin it in the area they likely stayed. Set the rationale to a one-sentence note like "Per your booking — itinerary is built around this location." Do NOT recommend an alternative hotel. The airportTransit and daily routing must use this hotel as the anchor.

12. FLIGHT-AWARE SCHEDULING. The user no longer provides exact flight times — flightArrival is now an arrival PERIOD ("early-morning" / "morning" / "afternoon" / "evening" / "late-night"). Departure is not collected; assume a standard mid-day check-out for the last day. You MUST adjust accordingly:
    - flightArrival present → Day 1's FIRST stop must be a type:"transit" block titled "Arrival · {airport}" at a representative time inside the period (early-morning ≈ 7:00, morning ≈ 10:00, afternoon ≈ 14:00, evening ≈ 19:00, late-night ≈ 23:00). Insert a realistic immigration + baggage buffer (60-90 min for international, 30 min for domestic) before the next stop. If arrival is "evening" or "late-night", reduce Day 1 to only airport → hotel → one low-energy stop (nearby dinner or lounge). Do NOT schedule sightseeing before immigration clearance time.
    - Day N's FINAL stops must be a hotel check-out + transit block ending at the airport with a 2-3 hour pre-flight buffer for international travel. Mark the last stop as type:"transit" titled "Airport · {airport}". Assume an early-afternoon flight unless the destination is local — leave the morning available for one low-effort activity (brunch / souvenir / packing).
    - If flightArrival is missing entirely, assume morning arrival on Day 1 and schedule normally from the airport.

13. STYLE INFERENCE. travelStyle is no longer collected directly — derive it from interests + pace internally before planning:
    - High pace + interests in (food, culture, history, shopping, photography) → SIGHTSEEING (dense, landmark-heavy)
    - Low pace + interests in (relaxation, nature) → RELAXATION (slow mornings, scenic rests, fewer stops/day)
    - Balanced pace OR mixed interests → MIXED (one heavy + one light stop alternation per day)
    Do NOT name the inferred style in user-facing copy; it's an internal pacing signal only.

14. STROLLER + MUST-VISIT FALLBACKS. strollerNeeded is now derived from childrenAges (any age ≤ 4 → true) — same routing rule applies. mustVisit is no longer collected on the home wizard but may arrive via the user's notes; if both are absent, rely on interests for venue selection — do NOT prompt the user.

OUTPUT FORMAT — STRICT JSON ONLY:

You must return a single JSON object matching this exact schema. No prose before or after. No markdown code fences. Just the raw JSON object.

{
  "destination": string,
  "destinationCountry": string,
  "durationDays": number,
  "overview": "2-3 sentence intro to why this trip will be great for THIS specific traveler",
  "bestSeasonNote": "optional short note about the timing",
  "currencyTip": "optional currency + payment tip",
  "languageTip": "optional language tip",
  "emergencyNumber": "optional",
  "hotel": {
    "name": string,
    "area": string,
    "address": string,
    "coords": [lng, lat],
    "rationale": "why this hotel for this specific airport and traveler profile",
    "priceTier": "$" | "$$" | "$$$" | "$$$$",
    "estimatedNightlyRate": "optional, e.g. ~$120/night"
  },
  "airportTransit": {
    "method": string,
    "duration": string,
    "cost": string,
    "instructions": "step by step from gate to hotel"
  },
  "days": [
    {
      "dayNumber": 1,
      "theme": "short theme name",
      "summary": "one sentence summary of the day",
      "stops": [
        {
          "order": 1,
          "time": "09:00",
          "type": "sight",
          "name": string,
          "area": "optional neighbourhood",
          "address": "optional",
          "coords": [lng, lat],
          "duration": "1.5 hours",
          "description": "2-3 sentences about why this stop and what to do there",
          "estimatedCost": "optional, e.g. ~$15",
          "bookingTip": "optional, e.g. book 2 days ahead",
          "kidFriendly": true,
          "transitFromPrev": "optional, e.g. 10 min walk"
        }
      ]
    }
  ],
  "packingTips": ["optional array", "of short tips"],
  "budgetEstimate": "optional, e.g. ~$80-120/day excluding hotel",
  "generalTips": ["optional array", "of general tips for this destination"]
}`;

/**
 * Build a locale-aware system prompt for the trip-plan generator.
 *
 * The locale block is intentionally PLACED FIRST, ahead of the rules-in-English
 * body, because models default to the language they see most of in context.
 * If we bury the locale instruction at the end (as the previous version did),
 * Claude saw 2,000 tokens of English rules and produced English output even
 * for ko/ja/zh/fr users — the bug the founder flagged.
 *
 * We also EMBED a curated Day 1 from the localized Tokyo sample as a
 * few-shot reference. This anchors voice + depth + currency formatting
 * to the same bar the hand-written samples set, so AI output reads as
 * a sibling of the samples instead of a generic AI plan.
 *
 * Failure mode: if the sample lookup throws (rare — the file would have to
 * be missing), we still ship the prompt without a few-shot. Output quality
 * will be lower but won't crash.
 */
async function buildSystemPrompt(localeCode: string): Promise<string> {
  const localeName = LOCALE_NAMES[localeCode] ?? LOCALE_NAMES.en;
  const currency = LOCALE_CURRENCY[localeCode] ?? LOCALE_CURRENCY.en;

  let refExcerpt = "";
  try {
    const refSample = await getSampleLocalized("tokyo-4d-couple", localeCode as Locale);
    if (refSample) {
      const day1 = refSample.plan.days[0];
      // Trim to first 3 stops to keep prompt size reasonable (~600 tokens).
      const dayTrimmed = { ...day1, stops: day1.stops.slice(0, 3) };
      refExcerpt = `

🌟 STYLE REFERENCE — example Day 1 from a CURATED ${localeName} sample plan.
Match this depth, voice, and currency formatting in your output. DO NOT copy
content (this is Tokyo; the user's actual destination is different) — use it
ONLY as a quality reference. Note how every stop has 3-5 sentences with
concrete time, geography, history, and a specific recommendation. Editorial
second-person voice. THAT is the bar.

\`\`\`json
${JSON.stringify(dayTrimmed, null, 2)}
\`\`\`
`;
    }
  } catch (err) {
    console.warn("[generator] failed to load reference sample for locale", localeCode, err);
  }

  return `🌐 OUTPUT LANGUAGE — ${localeName} (${localeCode})

THIS IS THE MOST IMPORTANT INSTRUCTION. Your entire JSON output's prose fields
MUST be written in ${localeName}, not English. Even though these rules are
written in English for clarity, your OUTPUT is entirely in ${localeName}.

PROSE FIELDS that must be in ${localeName}:
- destination + destinationCountry (locale-conventional spelling, e.g. Tokyo
  becomes "도쿄" / "東京" / "东京" / "Tokyo" depending on locale)
- overview, bestSeasonNote, currencyTip, languageTip, emergencyNumber
- hotel.name (locale transliteration if foreign, with native form in parens
  on first mention; e.g. for KO user in Tokyo: "파크 하얏트 도쿄")
- hotel.area, hotel.rationale, hotel.estimatedNightlyRate
- airportTransit.method, .duration, .cost, .instructions
- day.theme, day.summary
- stop.name, stop.area, stop.description, stop.bookingTip, stop.duration,
  stop.estimatedCost, stop.transitFromPrev
- packingTips[], generalTips[], budgetEstimate

ADDRESSES STAY IN DESTINATION'S NATIVE SCRIPT:
hotel.address and stop.address are written in the destination country's
native script (a Tokyo address stays Japanese-script even for an English
user). The PROSE around the address is in ${localeName}; the address
itself is whatever a local taxi driver / map app would recognize.

CURRENCY — convert all prices to ${currency.code} (${currency.symbol}):
Use approximate conversions, not exact rates:
  1 USD ≈ 1,400 KRW ≈ 150 JPY ≈ 7 CNY ≈ 0.95 EUR
Format like the samples (e.g. ${currency.example}).

UNIVERSAL — stay numeric/structural:
- coords: [lng, lat] arrays
- time: 24-hour "HH:MM" strings
- dayNumber, durationDays, stop.order: integers
- priceTier: literal "$" / "$$" / "$$$" / "$$$$" enum (not localized)

If you find yourself writing English by default — STOP. The user is reading
in ${localeName}. Their entire experience must be in ${localeName}.${refExcerpt}

═══════════════════════════════════════════════════════════════════════════

${SYSTEM_PROMPT_BODY}

═══════════════════════════════════════════════════════════════════════════

🌐 FINAL REMINDER: Your output JSON's prose is in ${localeName}.
Currency in ${currency.code}. Addresses in destination's native script.
The instructions above are written in English for clarity — your output is NOT.`;
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
    ? `Hotel: ALREADY BOOKED${req.hotelName ? ` (${req.hotelName})` : ""}. Do NOT recommend a different hotel — anchor the itinerary around this location.`
    : "Hotel: Recommend one matched to the arrival airport and traveler profile.";

  return `Generate a detailed ${req.durationDays}-day trip plan for the following traveler.

Destination: ${req.destination}, ${req.destinationCountry}
${req.origin ? `Travelling from: ${req.origin}` : ""}
Arrival airport: ${req.arrivalAirport}${
    req.arrivalTerminal ? ` (Terminal ${req.arrivalTerminal})` : ""
  }
${req.startDate ? `Start date: ${req.startDate}` : ""}

${hotelInfo}

Travelers: ${req.travelerType}, ${req.adults} adult(s)${childInfo}
Interests: ${req.interests.join(", ")}
Budget tier: ${req.budgetTier}
Pace: ${req.pace}
${req.travelStyle ? `Trip style: ${req.travelStyle} — ${styleInstruction(req.travelStyle)}` : ""}
${req.mustVisit ? `MUST-VISIT PLACES (integrate into the itinerary, prioritize placement by geography): ${req.mustVisit}` : ""}
${req.flightArrival ? `ARRIVAL PERIOD: ${req.flightArrival} (one of early-morning/morning/afternoon/evening/late-night) — start Day 1 at the airport per rule 12 using the period's representative clock time.` : ""}

${req.notes ? `Additional notes from the traveler: ${req.notes}` : ""}

Return the complete trip plan as a single JSON object matching the schema in the system prompt. No prose, no markdown — pure JSON only.

REMEMBER: output language and currency follow the OUTPUT LANGUAGE block at the top of the system prompt. Do not write English by default.`;
}

/**
 * Variant of buildUserPrompt used when a Scaffold is available. The scaffold
 * is appended as load-bearing context: the executor (Sonnet) is told to
 * USE the strategic decisions made by Opus (hotel, day themes, anchor
 * neighborhoods, must-include places) and NOT to drift from them. Sonnet's
 * job becomes pure expansion — fill in stops around the anchors, write
 * prose, schedule times — instead of strategy + execution at once.
 */
function buildUserPromptWithScaffold(req: PlanRequest, scaffold: Scaffold): string {
  const childInfo =
    req.children > 0
      ? ` Travelling with ${req.children} child(ren)${
          req.childrenAges?.length ? ` (ages: ${req.childrenAges.join(", ")})` : ""
        }${req.strollerNeeded ? ", stroller required" : ""}${
          req.hasInfant ? ", has infant aged 2 or under" : ""
        }.`
      : "";

  return `Expand the strategic scaffold below into a full ${req.durationDays}-day trip plan.

═══════════════════════════════════════════════════════════════════════════
TRAVELER PROFILE (for stop-level decisions Sonnet still makes)
═══════════════════════════════════════════════════════════════════════════

Destination: ${req.destination}, ${req.destinationCountry}
Arrival airport: ${req.arrivalAirport}${
    req.arrivalTerminal ? ` (Terminal ${req.arrivalTerminal})` : ""
  }
Travelers: ${req.travelerType}, ${req.adults} adult(s)${childInfo}
Interests: ${req.interests.join(", ")}
Budget tier: ${req.budgetTier}
Pace: ${req.pace}
${req.flightArrival ? `Arrival period: ${req.flightArrival}` : ""}
${req.mustVisit ? `User-requested places: ${req.mustVisit}` : ""}
${req.notes ? `Notes: ${req.notes}` : ""}

═══════════════════════════════════════════════════════════════════════════
STRATEGIC SCAFFOLD (already decided by lead strategist — DO NOT change)
═══════════════════════════════════════════════════════════════════════════

\`\`\`json
${JSON.stringify(scaffold, null, 2)}
\`\`\`

═══════════════════════════════════════════════════════════════════════════
YOUR JOB — EXPAND THE SCAFFOLD
═══════════════════════════════════════════════════════════════════════════

EXACTLY AS-IS (copy these fields verbatim from scaffold to your output):
- hotel: name, area, address, coords, rationale, priceTier, estimatedNightlyRate
- airportTransit: method, duration, cost, instructions
- destinationOverview → output as "overview" field
- bestSeasonNote, currencyTip, languageTip, emergencyNumber (if present)
- packingTips, generalTips, budgetEstimate (if present)
- For each day: dayNumber, theme, summary

EXPAND (you fill these in):
- For each day, produce stops[] (array of Stop objects per the system prompt schema):
  • Cluster all stops in/near scaffold.days[i].anchorNeighborhood
  • Include scaffold.days[i].mustIncludePlaces — work them in naturally, don't shoehorn
  • Reach scaffold.days[i].estimatedStopCount (±1 OK)
  • Honor scaffold.days[i].pacingHint
  • Each stop: order, time (HH:MM), type, name, area, address, coords, duration, description (2-3 sentences, editorial voice), estimatedCost, bookingTip (where relevant), kidFriendly, transitFromPrev

DO NOT:
- Change the hotel choice
- Change day themes or anchor neighborhoods
- Skip mustIncludePlaces
- Add or remove days

Return the complete TripPlan JSON matching the system prompt's schema. Pure
JSON, no markdown, no prose around it.

REMEMBER: prose in the user's locale per the system prompt OUTPUT LANGUAGE
block. Currency in destination locale conventions.`;
}

function styleInstruction(style: "sightseeing" | "relaxation" | "mixed"): string {
  switch (style) {
    case "sightseeing":
      return "weight days toward landmarks, museums, and guided experiences; fill each day";
    case "relaxation":
      return "fewer stops per day, longer meal windows, include a spa/park/café block, minimize transit";
    case "mixed":
      return "balance one signature sight in the morning with an unhurried afternoon";
  }
}

function extractJson(text: string): unknown {
  // Strip markdown fences if Claude added them despite instructions
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  return JSON.parse(cleaned);
}

export async function generateTripPlan(req: PlanRequest): Promise<TripPlan> {
  const anthropic = getClient();

  // Hybrid two-stage pipeline (planner + executor).
  //
  // Stage 1 (Opus, this block): produce a strategic Scaffold — hotel,
  // airport transit, day themes + anchor neighborhoods + must-include
  // places. The high-leverage decisions get the strongest model.
  //
  // Stage 2 (Sonnet, below): expand the scaffold into a full plan with
  // stop-level scheduling and prose. Volume work that doesn't need
  // Opus reasoning depth.
  //
  // Failure handling: scaffold has its own 90s timeout and parse-retry
  // internally. Anything that escapes is caught here and the pipeline
  // gracefully degrades to Sonnet-alone — quality dips slightly for
  // that one plan, but plans never block on Opus availability.
  //
  // Toggle: USE_OPUS_PLANNER env var. Default is OFF after observing the
  // combined Opus + Sonnet pipeline exceed Vercel's 300s maxDuration on
  // a real generation (Apr 30 launch test, plan d58e905d). The pipeline
  // works in principle but its p99 sits right at the wall, so for now
  // we keep it explicit-opt-in until either (a) Vercel gives us 600s+
  // headroom or (b) the route-opt + Mapbox stages move to background
  // post-savePlanResult so the user-blocking part fits comfortably.
  // Set USE_OPUS_PLANNER=true in env to re-enable.
  let scaffold: Scaffold | null = null;
  const useOpusPlanner = process.env.USE_OPUS_PLANNER === "true";
  if (useOpusPlanner) {
    try {
      scaffold = await generateScaffold(req);
    } catch (err) {
      console.warn(
        "[generator] Opus scaffold failed — falling back to Sonnet-alone for this plan",
        err,
      );
    }
  }

  // Build the system prompt ONCE per generation — locale-specific block
  // (incl. few-shot reference Day 1 from the localized Tokyo sample) is
  // prepended ahead of the rules body. See buildSystemPrompt() for why.
  const systemPrompt = await buildSystemPrompt(req.locale ?? "en");

  const callClaude = async (correction?: string): Promise<string> => {
    const userContent = scaffold
      ? buildUserPromptWithScaffold(req, scaffold)
      : buildUserPrompt(req);
    const messages: Anthropic.MessageParam[] = [
      { role: "user", content: userContent },
    ];
    if (correction) {
      messages.push({
        role: "assistant",
        content: "I will fix the issues and return valid JSON only.",
      });
      messages.push({
        role: "user",
        content: `Your previous output failed validation:\n\n${correction}\n\nReturn the corrected JSON only.`,
      });
    }

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      system: systemPrompt,
      messages,
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("Claude returned no text content");
    }
    return textBlock.text;
  };

  // First attempt
  let raw = await callClaude();
  let parsed: TripPlan;
  try {
    parsed = TripPlanSchema.parse(extractJson(raw));
  } catch (firstErr) {
    const errMsg = firstErr instanceof Error ? firstErr.message : String(firstErr);
    raw = await callClaude(errMsg);
    parsed = TripPlanSchema.parse(extractJson(raw));
  }

  // Route optimization second-pass — best-effort, time-bounded. Each day
  // gets ROUTE_OPT_TIMEOUT_MS to come back; on timeout the original order
  // is kept. Days run in parallel so the worst-case wait is bounded by
  // the slowest day, not the sum. Quality > speed: when the API has
  // capacity, we get clustered routes; when it doesn't, the first pass
  // already obeys system-prompt rule 9 (no-zigzag clustering) so the
  // fallback is acceptable.
  const ROUTE_OPT_TIMEOUT_MS = 25_000;
  try {
    const optimizedDays = await Promise.all(
      parsed.days.map(async (day) => {
        try {
          return await Promise.race<Day>([
            optimizeDayRoute(day, anthropic),
            new Promise<Day>((_, reject) =>
              setTimeout(
                () => reject(new Error("route opt timeout")),
                ROUTE_OPT_TIMEOUT_MS,
              ),
            ),
          ]);
        } catch (err) {
          console.warn("[generator] route opt skipped for day", day.dayNumber, err);
          return day;
        }
      }),
    );
    parsed = { ...parsed, days: optimizedDays };
  } catch (err) {
    console.error("Route optimization batch failed (non-fatal)", err);
  }

  return parsed;
}

/**
 * Cheap second-pass optimizer. Sends only the stops + coords + types for ONE
 * day to Claude and asks for a reordering that minimizes total walking
 * distance while keeping meals at sane times. Renumbers `order` and shifts
 * `time` slots based on the new sequence, preserving meal anchors.
 *
 * Cost: ~$0.005-0.01 per day (haiku-tier output, ~500 tokens). Skipped if
 * the day has fewer than 4 stops (nothing to optimize).
 */
export async function optimizeDayRoute(
  day: Day,
  anthropic: Anthropic,
): Promise<Day> {
  if (day.stops.length < 4) return day;

  const stopList = day.stops
    .map(
      (s, i) =>
        `${i}: ${s.type} | ${s.name} | [${s.coords[0]}, ${s.coords[1]}] | ${s.time} | ${s.duration}`,
    )
    .join("\n");

  const prompt = `You are a route optimizer for a single day of a travel itinerary.

Day theme: ${day.theme}

Current stops (index: type | name | [lng, lat] | scheduled_time | duration):
${stopList}

Your task: Return a JSON array of integers representing the OPTIMAL reordering
of these indices that minimizes total walking distance between consecutive
stops while respecting these constraints:

1. Meal stops (type "meal") must occur at sensible meal times:
   - First meal of the day: 11:30-13:30 (lunch)
   - Second meal of the day: 18:00-20:30 (dinner)
   - Pre-noon meal stops can stay in place if they're breakfast (before 10:00)
2. The first stop should be the geographically northernmost OR the one closest
   to the current first stop's hotel area (preserve morning anchor).
3. Keep clusters of stops in the same neighborhood adjacent (do NOT split them).
4. If reordering wouldn't materially improve the route (already well-clustered),
   return the original order.

Output: ONLY a JSON array of integers, e.g. [0, 2, 1, 3, 4]. No prose, no
markdown, no explanation. Length must equal the number of input stops.`;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 200,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") return day;

  const cleaned = textBlock.text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  let newOrder: unknown;
  try {
    newOrder = JSON.parse(cleaned);
  } catch {
    return day;
  }

  if (
    !Array.isArray(newOrder) ||
    newOrder.length !== day.stops.length ||
    !newOrder.every(
      (n) => typeof n === "number" && Number.isInteger(n) && n >= 0 && n < day.stops.length,
    ) ||
    new Set(newOrder).size !== newOrder.length
  ) {
    return day;
  }

  // Apply reorder, renumber order field, preserve original times (Claude
  // already chose meal times reasonably; only the SEQUENCE changes)
  const reordered = (newOrder as number[]).map((origIdx, newIdx) => {
    const stop = day.stops[origIdx];
    return { ...stop, order: newIdx + 1 };
  });

  return { ...day, stops: reordered };
}

