import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 15;

interface ParsedTrip {
  destination: string | null;
  destinationCountry: string | null;
  durationDays: number | null;
  budgetTier: "budget" | "midrange" | "luxury" | null;
  travelerType: "solo" | "couple" | "family" | "friends" | null;
  interests: string[] | null;
}

const SYSTEM = `You extract trip planning details from natural-language input in any language (English, Korean, Japanese, Chinese, etc).

Respond ONLY with a single JSON object. Start your response with { and end with }. No prose, no markdown fences.

Schema (all keys required; use null when not confidently extractable):
- destination: string | null   (city name in English, e.g. "Tokyo", "Paris", "Seoul")
- destinationCountry: string | null   (country name in English, e.g. "Japan", "France")
- durationDays: integer | null   (number of days, e.g. 3, 4, 7)
- budgetTier: "budget" | "midrange" | "luxury" | null
- travelerType: "solo" | "couple" | "family" | "friends" | null
- interests: array of short strings | null   (e.g. ["food","culture","shopping"])

Heuristics:
- If user says "weekend" → durationDays = 3
- If user says "week" → durationDays = 7
- "cheap"/"budget"/"backpacking" → budget
- "luxury"/"5-star"/"splurge" → luxury
- "mid-range"/"moderate"/nothing → midrange
- "with partner"/"romantic"/"couple" → couple
- "with kids"/"family"/"kids" → family
- "solo"/"alone"/"myself" → solo

Be conservative — prefer null over guessing wrong.`;

export async function POST(req: NextRequest) {
  let body: { text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const text = (body.text ?? "").toString().trim();
  if (!text || text.length > 500) {
    return NextResponse.json({ error: "text must be 1-500 chars" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: SYSTEM,
      messages: [
        { role: "user", content: text },
        { role: "assistant", content: "{" },
      ],
    });

    const first = response.content[0];
    const raw = first && first.type === "text" ? first.text : "";
    const jsonText = "{" + raw;
    const clean = jsonText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed = JSON.parse(clean) as ParsedTrip;

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("parse failed:", err);
    return NextResponse.json({ error: "parse failed" }, { status: 500 });
  }
}
