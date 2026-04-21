// Self-contained type definitions for the generate-plan Edge Function.
// Duplicated from the Next.js app's types/trip-plan.ts so this function is
// deployable without reaching outside its folder.
// Keep in sync when the main schema changes.

import { z } from "npm:zod@4";

// ─────────────── Form input ───────────────

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

export const TravelStyleSchema = z.enum(["sightseeing", "relaxation", "mixed"]);
export type TravelStyle = z.infer<typeof TravelStyleSchema>;

export const LocaleSchema = z.enum(["en", "ko", "ja", "zh"]);
export type PlanLocale = z.infer<typeof LocaleSchema>;

// Structural shape of PlanRequest. Relaxed validation — strict schema
// enforcement happens in Next.js draft route. Edge Function trusts what's
// already stored in the DB.
export interface PlanRequest {
  destination: string;
  destinationCountry: string;
  origin?: string;
  durationDays: number;
  startDate?: string;
  arrivalAirport: string;
  arrivalTerminal?: string;
  travelerType: TravelerType;
  adults: number;
  children?: number;
  childrenAges?: number[];
  strollerNeeded?: boolean;
  hasInfant?: boolean;
  hotelBooked?: boolean;
  hotelName?: string;
  interests: Interest[];
  budgetTier: BudgetTier;
  pace: Pace;
  travelStyle?: TravelStyle;
  mustVisit?: string;
  email: string;
  notes?: string;
  locale?: PlanLocale;
  referredByCode?: string;
  promoCode?: string;
}

// ─────────────── Generated trip plan ───────────────

const CoordsSchema = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90),
]);
export type Coords = z.infer<typeof CoordsSchema>;

export const HotelSchema = z.object({
  name: z.string(),
  area: z.string(),
  address: z.string(),
  coords: CoordsSchema,
  rationale: z.string(),
  priceTier: z.enum(["$", "$$", "$$$", "$$$$"]),
  estimatedNightlyRate: z.string().optional(),
});
export type Hotel = z.infer<typeof HotelSchema>;

export const AirportTransitSchema = z.object({
  method: z.string(),
  duration: z.string(),
  cost: z.string(),
  instructions: z.string(),
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
  time: z.string(),
  type: StopTypeSchema,
  name: z.string(),
  area: z.string().optional(),
  address: z.string().optional(),
  coords: CoordsSchema,
  duration: z.string(),
  description: z.string(),
  estimatedCost: z.string().optional(),
  bookingTip: z.string().optional(),
  kidFriendly: z.boolean().optional(),
  transitFromPrev: z.string().optional(),
});
export type Stop = z.infer<typeof StopSchema>;

export const DaySchema = z.object({
  dayNumber: z.number().int().min(1),
  theme: z.string(),
  summary: z.string(),
  stops: z.array(StopSchema).min(1).max(12),
});
export type Day = z.infer<typeof DaySchema>;

export const TripPlanSchema = z.object({
  destination: z.string(),
  destinationCountry: z.string(),
  durationDays: z.number().int(),
  overview: z.string(),
  bestSeasonNote: z.string().optional(),
  currencyTip: z.string().optional(),
  languageTip: z.string().optional(),
  emergencyNumber: z.string().optional(),
  hotel: HotelSchema,
  airportTransit: AirportTransitSchema,
  days: z.array(DaySchema).min(1).max(30),
  packingTips: z.array(z.string()).max(10).optional(),
  budgetEstimate: z.string().optional(),
  generalTips: z.array(z.string()).max(10).optional(),
});
export type TripPlan = z.infer<typeof TripPlanSchema>;

// ─────────────── Database row ───────────────

export type PlanStatus =
  | "draft"
  | "paid"
  | "generating"
  | "complete"
  | "failed"
  | "refunded";

export interface PlanRecord {
  id: string;
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
