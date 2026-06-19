// Claude trip plan generator — Deno port using NATIVE FETCH (not the SDK).
// The npm:@anthropic-ai/sdk appears to hang in Deno Deploy, so we call the
// Anthropic HTTP API directly. Adds explicit AbortController timeouts so we
// fail fast instead of consuming the full 150s Edge Function budget.

import {
  type Day,
  type PlanRequest,
  type TripPlan,
  TripPlanSchema,
} from "./types.ts";

const MODEL = "claude-opus-4-8";
const OPTIMIZE_MODEL = "claude-haiku-4-5-20251001";
const MAX_OUTPUT_TOKENS = 8000;
const MAIN_TIMEOUT_MS = 180_000; // 180s — Sonnet 4.5 + 8k tokens + non-EN locale can take 60-120s
const OPT_TIMEOUT_MS = 20_000; // 20s per route-optimize call (Haiku, short output)

function getApiKey(): string {
  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) throw new Error("Missing ANTHROPIC_API_KEY");
  return key;
}

interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
}

interface ClaudeResponse {
  content: Array<{ type: string; text?: string }>;
}

async function callAnthropic(
  opts: {
    model: string;
    max_tokens: number;
    system?: string;
    messages: ClaudeMessage[];
    timeoutMs: number;
    label: string;
  },
): Promise<string> {
  const controller = new AbortController();
  const t0 = Date.now();
  const killer = setTimeout(() => {
    console.error(
      `[anthropic:${opts.label}] ABORT after ${opts.timeoutMs}ms`,
    );
    controller.abort();
  }, opts.timeoutMs);

  try {
    console.log(
      `[anthropic:${opts.label}] START model=${opts.model} max_tokens=${opts.max_tokens}`,
    );
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": getApiKey(),
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: opts.model,
        max_tokens: opts.max_tokens,
        ...(opts.system ? { system: opts.system } : {}),
        messages: opts.messages,
      }),
      signal: controller.signal,
    });

    const elapsed = Math.round((Date.now() - t0) / 1000);
    console.log(
      `[anthropic:${opts.label}] RESPONSE status=${res.status} in ${elapsed}s`,
    );

    if (!res.ok) {
      const body = await res.text();
      throw new Error(
        `Anthropic ${res.status}: ${body.slice(0, 300)}`,
      );
    }

    const data = (await res.json()) as ClaudeResponse;
    const textBlock = data.content.find((b) => b.type === "text");
    if (!textBlock || !textBlock.text) {
      throw new Error("Anthropic returned no text content");
    }
    console.log(
      `[anthropic:${opts.label}] DONE text_len=${textBlock.text.length}`,
    );
    return textBlock.text;
  } catch (err) {
    const elapsed = Math.round((Date.now() - t0) / 1000);
    if ((err as Error).name === "AbortError") {
      throw new Error(
        `[anthropic:${opts.label}] timed out after ${elapsed}s`,
      );
    }
    throw err;
  } finally {
    clearTimeout(killer);
  }
}

const SYSTEM_PROMPT =
  `You are an elite travel concierge writing a detailed, personalized trip itinerary that the traveler will pay $4 to receive as a mobile-responsive secret web link plus a downloadable PDF for offline use.

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

9. Stops within a day MUST be geographically clustered to minimize backtracking. Do not zigzag across the city. The route from stop 1 to stop N should be a coherent geographic path, not a star pattern.

10. The airportTransit object must give the actual best option (e.g., "Narita Express to Tokyo Station, then JR Yamanote line"), with realistic duration and cost.

11. If hotelBooked is true in the request, you MUST still produce a hotel object — but use the user's hotelName (if provided) and pin it in the area they likely stayed. Set the rationale to a one-sentence note like "Per your booking — itinerary is built around this location." Do NOT recommend an alternative hotel. The airportTransit and daily routing must use this hotel as the anchor.

OUTPUT FORMAT — STRICT JSON ONLY:

You must return a single JSON object matching this exact schema. No prose before or after. No markdown code fences. Just the raw JSON object.

{
  "destination": string,
  "destinationCountry": string,
  "durationDays": number,
  "overview": "2-3 sentence intro",
  "bestSeasonNote": "optional",
  "currencyTip": "optional",
  "languageTip": "optional",
  "emergencyNumber": "optional",
  "hotel": { "name", "area", "address", "coords": [lng, lat], "rationale", "priceTier": "$"|"$$"|"$$$"|"$$$$", "estimatedNightlyRate": "optional" },
  "airportTransit": { "method", "duration", "cost", "instructions" },
  "days": [
    { "dayNumber": 1, "theme", "summary", "stops": [
      { "order": 1, "time": "09:00", "type": "sight"|"meal"|"activity"|"transit"|"rest"|"shopping", "name", "area": "optional", "address": "optional", "coords": [lng, lat], "duration", "description", "estimatedCost": "optional", "bookingTip": "optional", "kidFriendly": "optional", "transitFromPrev": "optional" }
    ] }
  ],
  "packingTips": ["optional array"],
  "budgetEstimate": "optional",
  "generalTips": ["optional array"]
}`;

const LOCALE_INSTRUCTIONS: Record<string, string> = {
  en:
    "Write all user-facing strings in English.",
  ko:
    "Write all user-facing strings in NATURAL Korean (한국어). Place names, hotel names, and street addresses stay in their original native script with optional Romanization in parentheses on first mention. Numbers and prices stay in their original format. Use polite endings (-습니다 / -ㅂ니다) consistently.",
  ja:
    "Write all user-facing strings in NATURAL Japanese (日本語). Place names stay in Japanese script with English in parentheses on first mention if it's a foreign destination. Use です/ます polite forms consistently.",
  zh:
    "Write all user-facing strings in NATURAL Simplified Chinese (简体中文). Place names stay in their native script with Pinyin in parentheses on first mention. Use formal but warm tone.",
};

function styleInstruction(style: string): string {
  switch (style) {
    case "sightseeing":
      return "weight days toward landmarks, museums, and guided experiences; fill each day";
    case "relaxation":
      return "fewer stops per day, longer meal windows, include a spa/park/café block, minimize transit";
    case "mixed":
      return "balance one signature sight in the morning with an unhurried afternoon";
    default:
      return "";
  }
}

function buildUserPrompt(req: PlanRequest): string {
  const childInfo = (req.children ?? 0) > 0
    ? ` Travelling with ${req.children} child(ren)${
      req.childrenAges?.length ? ` (ages: ${req.childrenAges.join(", ")})` : ""
    }${req.strollerNeeded ? ", stroller required" : ""}${
      req.hasInfant ? ", has infant aged 2 or under" : ""
    }.`
    : "";

  const hotelInfo = req.hotelBooked
    ? `Hotel: ALREADY BOOKED${
      req.hotelName ? ` (${req.hotelName})` : ""
    }. Do NOT recommend a different hotel — anchor the itinerary around this location.`
    : "Hotel: Recommend one matched to the arrival airport and traveler profile.";

  const locale = req.locale ?? "en";
  const localeInstruction = LOCALE_INSTRUCTIONS[locale] ??
    LOCALE_INSTRUCTIONS.en;

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
${
    req.travelStyle
      ? `Trip style: ${req.travelStyle} — ${styleInstruction(req.travelStyle)}`
      : ""
  }
${
    req.mustVisit
      ? `MUST-VISIT PLACES (integrate into the itinerary, prioritize placement by geography): ${req.mustVisit}`
      : ""
  }

${req.notes ? `Additional notes from the traveler: ${req.notes}` : ""}

OUTPUT LANGUAGE: ${localeInstruction}

Return the complete trip plan as a single JSON object matching the schema in the system prompt. No prose, no markdown — pure JSON only.`;
}

function extractJson(text: string): unknown {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  return JSON.parse(cleaned);
}

export async function generateTripPlan(req: PlanRequest): Promise<TripPlan> {
  const t0 = Date.now();
  const messages: ClaudeMessage[] = [
    { role: "user", content: buildUserPrompt(req) },
  ];

  let raw = await callAnthropic({
    model: MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    system: SYSTEM_PROMPT,
    messages,
    timeoutMs: MAIN_TIMEOUT_MS,
    label: "main",
  });

  let parsed: TripPlan;
  try {
    parsed = TripPlanSchema.parse(extractJson(raw));
  } catch (firstErr) {
    const errMsg = firstErr instanceof Error
      ? firstErr.message
      : String(firstErr);
    console.log(
      `[generator] zod validation failed (retry #1): ${errMsg.slice(0, 120)}`,
    );
    const correction = [
      ...messages,
      { role: "assistant" as const, content: "I will fix the issues and return valid JSON only." },
      {
        role: "user" as const,
        content:
          `Your previous output failed validation:\n\n${errMsg}\n\nReturn the corrected JSON only.`,
      },
    ];
    raw = await callAnthropic({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      system: SYSTEM_PROMPT,
      messages: correction,
      timeoutMs: MAIN_TIMEOUT_MS,
      label: "main-retry",
    });
    parsed = TripPlanSchema.parse(extractJson(raw));
  }
  console.log(
    `[generator] main done at ${Math.round((Date.now() - t0) / 1000)}s, ${parsed.days.length} days`,
  );

  // Route optimization via Haiku — bounded parallel, per-call timeout
  const tOpt = Date.now();
  try {
    const optimizedDays = await Promise.all(
      parsed.days.map((day) =>
        optimizeDayRoute(day).catch((err) => {
          console.log(
            `[generator] day ${day.dayNumber} optimize failed: ${
              (err as Error).message.slice(0, 80)
            }`,
          );
          return day;
        })
      ),
    );
    parsed = { ...parsed, days: optimizedDays };
  } catch (err) {
    console.error("Route optimization pass failed (non-fatal)", err);
  }
  console.log(
    `[generator] optimize done at ${Math.round((Date.now() - tOpt) / 1000)}s; total ${Math.round((Date.now() - t0) / 1000)}s`,
  );

  return parsed;
}

async function optimizeDayRoute(day: Day): Promise<Day> {
  if (day.stops.length < 4) return day;

  const stopList = day.stops
    .map(
      (s, i) =>
        `${i}: ${s.type} | ${s.name} | [${s.coords[0]}, ${
          s.coords[1]
        }] | ${s.time} | ${s.duration}`,
    )
    .join("\n");

  const prompt =
    `You are a route optimizer for a single day of a travel itinerary.

Day theme: ${day.theme}

Current stops (index: type | name | [lng, lat] | scheduled_time | duration):
${stopList}

Return a JSON array of integers representing the OPTIMAL reordering that minimizes total walking distance. Constraints:
1. Meal stops must occur at sensible meal times (lunch 11:30-13:30, dinner 18:00-20:30). Pre-noon meals (<10:00) are breakfast — keep in place.
2. First stop: geographically northernmost OR the one closest to the existing first stop (preserve morning anchor).
3. Keep clusters in the same neighborhood adjacent.
4. If already well-clustered, return the original order.

Output: ONLY a JSON array of integers like [0,2,1,3,4]. No prose, no markdown. Length must equal the input.`;

  const raw = await callAnthropic({
    model: OPTIMIZE_MODEL,
    max_tokens: 200,
    messages: [{ role: "user", content: prompt }],
    timeoutMs: OPT_TIMEOUT_MS,
    label: `opt-day${day.dayNumber}`,
  });

  const cleaned = raw
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
      (n) =>
        typeof n === "number" &&
        Number.isInteger(n) &&
        n >= 0 &&
        n < day.stops.length,
    ) ||
    new Set(newOrder).size !== newOrder.length
  ) {
    return day;
  }

  const reordered = (newOrder as number[]).map((origIdx, newIdx) => {
    const stop = day.stops[origIdx];
    return { ...stop, order: newIdx + 1 };
  });

  return { ...day, stops: reordered };
}
