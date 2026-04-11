import { z } from "zod";

/**
 * Trip Planner — type definitions
 *
 * Data flow:
 *
 *   /plan/new form
 *        │  PlanRequest (validated)
 *        ▼
 *   POST /api/plan/draft  ──► insert PlanRecord (status: pending)
 *        │
 *        │  show free 1-day teaser (cheap Claude call)
 *        ▼
 *   POST /api/checkout    ──► Lemon Squeezy session linked to plan id
 *        │
 *        │  user pays
 *        ▼
 *   POST /api/webhooks/lemon-squeezy
 *        │  verify HMAC, update status: paid
 *        ▼
 *   generate full TripPlan via Claude (structured output)
 *        │  validate against TripPlanSchema
 *        ▼
 *   render PDF, send email, update status: complete
 *        ▼
 *   /plan/[id]  ──► full plan with map, edit, download
 */

// ─────────────────────────────────────────
// 1. Form input — what the user provides
// ─────────────────────────────────────────

export const TravelerTypeSchema = z.enum([
  "solo",
  "couple",
  "family-with-kids",
  "group-of-friends",
  "senior",
]);
export type TravelerType = z.infer<typeof TravelerTypeSchema>;

export const InterestSchema = z.enum([
  "food",
  "culture",
  "history",
  "nature",
  "shopping",
  "nightlife",
  "adventure",
  "relaxation",
  "photography",
]);
export type Interest = z.infer<typeof InterestSchema>;

export const BudgetTierSchema = z.enum(["budget", "midrange", "luxury"]);
export type BudgetTier = z.infer<typeof BudgetTierSchema>;

export const PaceSchema = z.enum(["relaxed", "balanced", "packed"]);
export type Pace = z.infer<typeof PaceSchema>;

export const LocaleSchema = z.enum(["en", "ko", "ja", "zh"]);
export type PlanLocale = z.infer<typeof LocaleSchema>;

export const PlanRequestSchema = z.object({
  destination: z.string().min(2).max(80),
  destinationCountry: z.string().min(2).max(80),
  origin: z.string().max(80).optional(),

  durationDays: z.number().int().min(1).max(30),
  startDate: z.string().optional(), // ISO date, optional

  arrivalAirport: z.string().min(2).max(80),
  arrivalTerminal: z.string().max(20).optional(),

  travelerType: TravelerTypeSchema,
  adults: z.number().int().min(1).max(20),
  children: z.number().int().min(0).max(20).default(0),
  childrenAges: z.array(z.number().int().min(0).max(17)).optional(),
  /** True if any child needs a stroller — affects walking distances and venue picks. */
  strollerNeeded: z.boolean().optional(),
  /** True if any child is age 2 or under — adds bathroom-changing-table and quiet-time logic. */
  hasInfant: z.boolean().optional(),

  /** Already booked a hotel? If true, the generator skips hotel recommendations. */
  hotelBooked: z.boolean().optional(),
  /** Optional hotel name when hotelBooked is true — informs route planning around it. */
  hotelName: z.string().max(120).optional(),

  interests: z.array(InterestSchema).min(1).max(6),
  budgetTier: BudgetTierSchema,
  pace: PaceSchema,

  email: z.string().email(),
  notes: z.string().max(1000).optional(),

  /** Output language for the generated plan. Defaults to English. */
  locale: LocaleSchema.optional(),
});
export type PlanRequest = z.infer<typeof PlanRequestSchema>;

// ─────────────────────────────────────────
// 2. Generated trip plan — Claude output
// ─────────────────────────────────────────

const CoordsSchema = z.tuple([
  z.number().min(-180).max(180), // lng
  z.number().min(-90).max(90),   // lat
]);
export type Coords = z.infer<typeof CoordsSchema>;

export const HotelSchema = z.object({
  name: z.string(),
  area: z.string(),       // neighbourhood
  address: z.string(),
  coords: CoordsSchema,
  rationale: z.string(),  // why this hotel for the chosen airport/terminal
  priceTier: z.enum(["$", "$$", "$$$", "$$$$"]),
  estimatedNightlyRate: z.string().optional(),
});
export type Hotel = z.infer<typeof HotelSchema>;

export const AirportTransitSchema = z.object({
  method: z.string(),       // "Narita Express", "Taxi", "Limousine bus"
  duration: z.string(),     // "60 min"
  cost: z.string(),         // "~$28"
  instructions: z.string(), // step-by-step
});
export type AirportTransit = z.infer<typeof AirportTransitSchema>;

export const StopTypeSchema = z.enum([
  "sight",
  "meal",
  "activity",
  "transit",
  "rest",
  "shopping",
]);
export type StopType = z.infer<typeof StopTypeSchema>;

export const StopSchema = z.object({
  order: z.number().int().min(1),
  time: z.string(),                   // "09:00"
  type: StopTypeSchema,
  name: z.string(),
  area: z.string().optional(),
  address: z.string().optional(),
  coords: CoordsSchema,
  duration: z.string(),               // "1.5 hours"
  description: z.string(),
  estimatedCost: z.string().optional(),
  bookingTip: z.string().optional(),  // reservation needed, queues, etc.
  kidFriendly: z.boolean().optional(),
  transitFromPrev: z.string().optional(), // "10 min walk from previous stop"
});
export type Stop = z.infer<typeof StopSchema>;

export const DaySchema = z.object({
  dayNumber: z.number().int().min(1),
  theme: z.string(),     // "Historic Tokyo"
  summary: z.string(),
  stops: z.array(StopSchema).min(1).max(12),
});
export type Day = z.infer<typeof DaySchema>;

export const TripPlanSchema = z.object({
  destination: z.string(),
  destinationCountry: z.string(),
  durationDays: z.number().int(),
  overview: z.string(),                   // 2-3 sentence intro
  bestSeasonNote: z.string().optional(),
  currencyTip: z.string().optional(),
  languageTip: z.string().optional(),
  emergencyNumber: z.string().optional(),

  hotel: HotelSchema,
  airportTransit: AirportTransitSchema,
  days: z.array(DaySchema).min(1).max(30),

  packingTips: z.array(z.string()).max(10).optional(),
  budgetEstimate: z.string().optional(),  // "~$80-120/day"
  generalTips: z.array(z.string()).max(10).optional(),
});
export type TripPlan = z.infer<typeof TripPlanSchema>;

// ─────────────────────────────────────────
// 3. Database row — Supabase plans table
// ─────────────────────────────────────────

export const PlanStatusSchema = z.enum([
  "draft",       // form submitted, awaiting payment
  "paid",        // payment confirmed, generation queued
  "generating",  // Claude call in flight
  "complete",    // plan generated, email sent
  "failed",      // generation failed (retry or refund)
  "refunded",
]);
export type PlanStatus = z.infer<typeof PlanStatusSchema>;

export interface PlanRecord {
  id: string;             // uuid, also URL slug
  email: string;
  request: PlanRequest;
  plan: TripPlan | null;
  status: PlanStatus;
  payment_id: string | null;
  paid_at: string | null;
  generated_at: string | null;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
}
