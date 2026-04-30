import Anthropic from "@anthropic-ai/sdk";
import { PlanRequest, Scaffold, ScaffoldSchema } from "../../types/trip-plan";

/**
 * Opus-based strategic planner.
 *
 * Produces a Scaffold (hotel, day themes, anchor neighborhoods, must-include
 * landmarks) that the Sonnet executor consumes via lib/generator/claude.ts.
 *
 * The split exists because not every decision in a trip plan deserves equal
 * reasoning depth. Hotel choice and day-theme structure are high-leverage
 * (one wrong call ruins the whole plan); stop-by-stop prose is volume work.
 * Opus on the strategy + Sonnet on the volume gives us Opus quality where it
 * matters and Sonnet speed/cost where it doesn't.
 *
 * Failure mode: any throw from this module is caught by the caller and the
 * pipeline falls back to Sonnet-alone. We never block plan generation on a
 * scaffold failure.
 *
 * Required env: ANTHROPIC_API_KEY
 */

const SCAFFOLD_MODEL = "claude-opus-4-7";
const SCAFFOLD_MAX_TOKENS = 3000;
// Hard ceiling. Past this we abandon and let Sonnet run alone — keeps the
// total pipeline under Vercel's 300s wall even when Opus is unusually slow.
const SCAFFOLD_TIMEOUT_MS = 90_000;

let scaffoldClient: Anthropic | null = null;
function getClient(): Anthropic {
  if (scaffoldClient) return scaffoldClient;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");
  scaffoldClient = new Anthropic({ apiKey });
  return scaffoldClient;
}

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  ko: "Korean (한국어)",
  ja: "Japanese (日本語)",
  zh: "Simplified Chinese (简体中文)",
  fr: "French (français)",
};

function buildScaffoldSystemPrompt(localeCode: string): string {
  const localeName = LOCALE_NAMES[localeCode] ?? LOCALE_NAMES.en;

  return `🌐 OUTPUT LANGUAGE — ${localeName} (${localeCode})

All prose fields in your JSON output (destinationOverview, hotel.rationale,
day.theme, day.summary, day.pacingHint, packingTips, generalTips,
bestSeasonNote, currencyTip, languageTip) MUST be in ${localeName}.

Addresses stay in destination's native script (a Tokyo address stays in
Japanese script even for an English user).

Hotel name uses locale-appropriate transliteration (e.g., for KO user in
Tokyo: "파크 하얏트 도쿄"). Anchor neighborhoods use the locale's
conventional spelling (e.g., 浅草 → "아사쿠사" / "Asakusa" / "浅草" / "Asakusa").

═══════════════════════════════════════════════════════════════════════════

You are the LEAD TRIP STRATEGIST for an elite trip-plan service. The
traveler pays $4 and receives a delivered plan that has to feel personally
crafted. Your output drives the strategic backbone — an EXECUTOR model
will expand your scaffold into a full day-by-day itinerary with stop-level
scheduling and prose. You do NOT do stop-level work.

YOUR HIGH-LEVERAGE DECISIONS:

1. Pick ONE hotel that solves multiple constraints simultaneously:
   - Smooth direct transit from the user's specific airport + terminal
   - Matches budget tier (budget → $/$$, midrange → $$/$$$, luxury → $$$/$$$$)
   - Family-with-kids → quiet residential area with kid-friendly amenities
   - Couple → romantic or central area
   - Solo → social, well-connected area
   - Senior → flat terrain, near elevators/transit
   Use real, well-known hotels you have high confidence exist. Never invent.

2. Pick the airport transit method that's actually best (express train,
   limousine bus, taxi share). Real cost + duration.

3. Design the day arc:
   - Variety, not redundancy. Don't theme three days the same way.
   - Geographic clustering: each day anchors in ONE primary neighborhood,
     and consecutive days don't bounce randomly across the city.
   - For 4-7 day trips, consider a "day trip" theme (Kamakura, Versailles,
     Pingyao etc.) when the destination has a famous nearby option.
   - For arrival/departure days, theme matches the constrained schedule.
   - Style inference (you derive from interests + pace):
     • High pace + sightseeing/cultural interests → DENSE landmark days
     • Low pace + relaxation/nature interests → SLOW scenic days
     • Mixed → alternate one heavy + one light per day

4. For each day:
   - Theme (a short evocative name, 2-4 words)
   - Summary (one sentence — what makes THIS day worth waking up for)
   - Anchor neighborhood (the district where stops cluster)
   - Pacing hint (executor uses this to space out the day)
   - 2-3 must-include landmarks (the executor will add 3-7 more around them)
   - Estimated stop count, calibrated to pace:
     • relaxed: 3-4 stops
     • balanced: 5-6 stops
     • packed: 7-9 stops

5. If hotelBooked is true, USE THE USER'S HOTEL — do not recommend an
   alternative. The hotel.rationale should acknowledge their booking; all
   day plans anchor around their location.

6. If hasInfant or strollerNeeded is true, EVERY day's anchor neighborhood
   must be stroller-accessible (no stairs-only districts), and the pacing
   hint must call out a quiet/rest block.

═══════════════════════════════════════════════════════════════════════════

OUTPUT FORMAT — STRICT JSON ONLY matching this schema. NO prose before
or after the JSON. NO markdown code fences. JUST the raw JSON object.

{
  "destinationOverview": "2-3 sentences in ${localeName} on why this trip will work for THIS specific traveler",
  "bestSeasonNote": "optional",
  "currencyTip": "optional",
  "languageTip": "optional",
  "emergencyNumber": "optional",
  "hotel": {
    "name": "hotel name (locale-transliterated)",
    "area": "neighborhood (locale-spelled)",
    "address": "in destination's native script",
    "coords": [lng, lat],
    "rationale": "in ${localeName} — why THIS hotel for THIS airport + traveler",
    "priceTier": "$" | "$$" | "$$$" | "$$$$",
    "estimatedNightlyRate": "optional, in destination locale currency"
  },
  "airportTransit": {
    "method": "in ${localeName}",
    "duration": "in ${localeName}",
    "cost": "in destination locale currency",
    "instructions": "in ${localeName}, step-by-step gate-to-hotel"
  },
  "days": [
    {
      "dayNumber": 1,
      "theme": "in ${localeName}",
      "summary": "in ${localeName}",
      "anchorNeighborhood": "neighborhood name in ${localeName}",
      "pacingHint": "in ${localeName}",
      "mustIncludePlaces": ["landmark 1 in ${localeName}", "landmark 2 in ${localeName}"],
      "estimatedStopCount": 5
    }
  ],
  "packingTips": ["short tips in ${localeName}"],
  "generalTips": ["short tips in ${localeName}"],
  "budgetEstimate": "in destination locale currency"
}

🌐 FINAL REMINDER: prose in ${localeName}. Currency in destination locale
conventions. Addresses in native script. Strategic decisions only — no
stop-level scheduling, that's the executor's job.`;
}

function buildScaffoldUserPrompt(req: PlanRequest): string {
  const childInfo =
    req.children > 0
      ? ` Travelling with ${req.children} child(ren)${
          req.childrenAges?.length ? ` (ages: ${req.childrenAges.join(", ")})` : ""
        }${req.strollerNeeded ? ", stroller required" : ""}${
          req.hasInfant ? ", has infant aged 2 or under" : ""
        }.`
      : "";

  const hotelInfo = req.hotelBooked
    ? `Hotel: ALREADY BOOKED${req.hotelName ? ` (${req.hotelName})` : ""}. Use the user's hotel — do NOT recommend an alternative. Anchor all day plans around this location.`
    : "Hotel: Pick one strategically given the arrival airport and traveler profile.";

  return `Strategic scaffold for a ${req.durationDays}-day trip:

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
${req.flightArrival ? `Arrival period: ${req.flightArrival}` : ""}
${req.mustVisit ? `User-requested places to include in the plan: ${req.mustVisit}` : ""}

${req.notes ? `Additional notes from the traveler: ${req.notes}` : ""}

Return the strategic scaffold JSON. Remember: prose in the user's language,
addresses in the destination's native script, ${req.durationDays} day entries
in the days array.`;
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
 * Run the Opus planner with one parse-failure retry, all bounded by
 * SCAFFOLD_TIMEOUT_MS. Throws on timeout or terminal failure — the caller
 * catches and falls back to Sonnet-alone.
 */
export async function generateScaffold(req: PlanRequest): Promise<Scaffold> {
  const anthropic = getClient();
  const systemPrompt = buildScaffoldSystemPrompt(req.locale ?? "en");

  const callOpus = async (correction?: string): Promise<string> => {
    const messages: Anthropic.MessageParam[] = [
      { role: "user", content: buildScaffoldUserPrompt(req) },
    ];
    if (correction) {
      messages.push({
        role: "assistant",
        content: "I will fix the issues and return valid JSON only.",
      });
      messages.push({
        role: "user",
        content: `Your previous scaffold output failed validation:\n\n${correction}\n\nReturn the corrected scaffold JSON only.`,
      });
    }

    // Streaming for parity with the main Sonnet path. SCAFFOLD_MAX_TOKENS
    // (3000) is well under the 10-min threshold but the unified surface
    // means we never have to think about which calls need the guard.
    const response = await anthropic.messages
      .stream({
        model: SCAFFOLD_MODEL,
        max_tokens: SCAFFOLD_MAX_TOKENS,
        system: systemPrompt,
        messages,
      })
      .finalMessage();

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("Opus returned no text content");
    }
    return textBlock.text;
  };

  const scaffoldPromise = (async () => {
    let raw = await callOpus();
    try {
      return ScaffoldSchema.parse(extractJson(raw));
    } catch (firstErr) {
      const errMsg = firstErr instanceof Error ? firstErr.message : String(firstErr);
      raw = await callOpus(errMsg);
      return ScaffoldSchema.parse(extractJson(raw));
    }
  })();

  return await Promise.race<Scaffold>([
    scaffoldPromise,
    new Promise<Scaffold>((_, reject) =>
      setTimeout(
        () => reject(new Error("scaffold timeout after 90s")),
        SCAFFOLD_TIMEOUT_MS,
      ),
    ),
  ]);
}
