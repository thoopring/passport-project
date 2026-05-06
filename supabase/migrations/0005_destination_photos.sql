-- Phase 2: Cold-start destination photo cache.
--
-- When a customer pays for a plan whose destination is NOT in the curated
-- /public/destinations catalog, the generator pipeline searches Unsplash,
-- caches the resulting photo URLs + photographer attribution in the table
-- below, and the rendering surfaces (site / PDF / email) hotlink those
-- URLs directly.
--
-- Hotlink (no Storage mirror): Unsplash's Production-tier API guidelines
-- require photos to be hotlinked to the original image URL on Unsplash
-- (not mirrored to our own storage). The Phase 1 Storage approach we
-- considered would block Production approval, so cold-start photos use
-- direct CDN hotlinking with attribution captions instead.
--
-- Why a cache TABLE (not just per-plan storage on the plans row): two
-- different customers buying Lhasa plans should reuse the SAME photo set
-- so all "Lhasa" plans look consistent. We also want to hit the Unsplash
-- API at most once per destination per cache lifetime.

create table if not exists destination_photo_cache (
  -- Normalized slug. Lowercase, hyphenated. Primary key so re-runs are
  -- idempotent UPSERTs ("Lhasa, Tibet" → "lhasa-tibet").
  slug              text primary key,

  -- Original destination string Claude returned, kept for debugging /
  -- attribution lookup / fuzzy matching.
  destination_name  text not null,

  -- Hero photo as a JSONB object or null when no usable result.
  -- Shape: {
  --   url: text                       -- urls.raw from Unsplash (no size params)
  --   photoId: text                   -- photo.id
  --   photoLink: text                 -- links.html (the photo's Unsplash page)
  --   photographerName: text          -- user.name
  --   photographerUsername: text      -- user.username
  -- }
  hero              jsonb,

  -- Day photos as a JSONB array of objects with the same shape as `hero`.
  -- Empty array when no day photos were available.
  days              jsonb not null default '[]'::jsonb,

  fetched_at        timestamptz not null default now()
);

-- Index for the rare case we want to find caches by destination_name
-- for analytics or fuzzy matching.
create index if not exists destination_photo_cache_destination_name_idx
  on destination_photo_cache (destination_name);

-- Row-level security: server-only writes (service role), public reads.
-- The cached URLs are public Unsplash CDN URLs, so read access is fine.
alter table destination_photo_cache enable row level security;

drop policy if exists destination_photo_cache_public_read on destination_photo_cache;
create policy destination_photo_cache_public_read
  on destination_photo_cache for select
  using (true);

drop policy if exists destination_photo_cache_service_write on destination_photo_cache;
create policy destination_photo_cache_service_write
  on destination_photo_cache for all
  to service_role
  using (true)
  with check (true);
