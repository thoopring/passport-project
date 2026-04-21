import Anthropic from "@anthropic-ai/sdk";
import {
  PlanRequest,
  TripPlan,
  TripPlanSchema,
  type Day,
} from "../../types/trip-plan";

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
const MAX_OUTPUT_TOKENS = 8000;

let client: Anthropic | null = null;
function getClient(): Anthropic {
  if (client) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");
  client = new Anthropic({ apiKey });
  return client;
}

const SYSTEM_PROMPT = `You are an elite travel concierge writing a detailed, personalized trip itinerary that the traveler will pay $4 to receive as a mobile-responsive secret web link plus a downloadable PDF for offline use.

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

const LOCALE_INSTRUCTIONS: Record<string, string> = {
  en: "Write all user-facing strings (overview, day theme, day summary, stop description, hotel rationale, transit instructions, packingTips, generalTips) in English.",
  ko: "Write all user-facing strings (overview, day theme, day summary, stop description, hotel rationale, transit instructions, packingTips, generalTips) in NATURAL Korean (한국어). Place names, hotel names, and street addresses stay in their original native script with optional Romanization in parentheses on first mention. Numbers and prices stay in their original format. Use polite endings (-습니다 / -ㅂ니다) consistently.",
  ja: "Write all user-facing strings (overview, day theme, day summary, stop description, hotel rationale, transit instructions, packingTips, generalTips) in NATURAL Japanese (日本語). Place names stay in Japanese script with English in parentheses on first mention if it's a foreign destination. Use です/ます polite forms consistently.",
  zh: "Write all user-facing strings (overview, day theme, day summary, stop description, hotel rationale, transit instructions, packingTips, generalTips) in NATURAL Simplified Chinese (简体中文). Place names stay in their native script with Pinyin in parentheses on first mention. Use formal but warm tone.",
};

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

  const locale = req.locale ?? "en";
  const localeInstruction = LOCALE_INSTRUCTIONS[locale] ?? LOCALE_INSTRUCTIONS.en;

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

${req.notes ? `Additional notes from the traveler: ${req.notes}` : ""}

OUTPUT LANGUAGE: ${localeInstruction}

Return the complete trip plan as a single JSON object matching the schema in the system prompt. No prose, no markdown — pure JSON only.`;
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
        content: `Your previous output failed validation:\n\n${correction}\n\nReturn the corrected JSON only.`,
      });
    }

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      system: SYSTEM_PROMPT,
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

  // Second pass: route optimization. Reorder stops within each day to
  // minimize zigzagging. Best-effort — failures fall back to the original
  // order rather than failing the whole plan.
  try {
    const optimizedDays = await Promise.all(
      parsed.days.map((day) => optimizeDayRoute(day, anthropic).catch(() => day)),
    );
    parsed = { ...parsed, days: optimizedDays };
  } catch (err) {
    console.error("Route optimization pass failed (non-fatal)", err);
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

