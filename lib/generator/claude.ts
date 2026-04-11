import Anthropic from "@anthropic-ai/sdk";
import {
  PlanRequest,
  TripPlan,
  TripPlanSchema,
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

9. Stops within a day MUST be geographically clustered to minimize backtracking. Do not zigzag across the city.

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

${req.notes ? `Additional notes from the traveler: ${req.notes}` : ""}

Return the complete trip plan as a single JSON object matching the schema in the system prompt. No prose, no markdown — pure JSON only.`;
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
  try {
    const parsed = extractJson(raw);
    return TripPlanSchema.parse(parsed);
  } catch (firstErr) {
    const errMsg = firstErr instanceof Error ? firstErr.message : String(firstErr);
    // Retry once with the error fed back
    raw = await callClaude(errMsg);
    const parsed = extractJson(raw);
    return TripPlanSchema.parse(parsed);
  }
}

