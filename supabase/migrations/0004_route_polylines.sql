-- Adds a cache column for Mapbox Directions polylines.
--
-- Why a cache: Mapbox free tier is 100k Directions API requests/month.
-- Each plan has ~25-40 stops → ~25-40 directions calls. Without caching,
-- every page view would re-call the API. With this column, we call ONCE
-- when the plan is generated and read from DB on every subsequent view.
--
-- Format: JSONB array, one entry per stop-pair segment in order.
-- Each entry is either:
--   { "coords": [[lng,lat], [lng,lat], ...] }   — successful Directions result
--   null                                          — failed segment (fall back to straight line)
--
-- Example for a 3-stop day:
--   [
--     { "coords": [[139.69, 35.68], [139.70, 35.685], ...] },  -- stop 1 → 2
--     { "coords": [[139.70, 35.685], [139.71, 35.69], ...] }   -- stop 2 → 3
--   ]
--
-- Falls back gracefully: if the column is null (pre-migration plans, or
-- API failures during generation), PlanMap renders the existing
-- straight-line LineString.

alter table plans add column if not exists route_polylines jsonb;

comment on column plans.route_polylines is
  'Cached Mapbox Directions polylines, one entry per consecutive stop-pair segment. Null entries fall back to straight-line. Computed once at plan generation time to stay within the 100k/month free tier.';
