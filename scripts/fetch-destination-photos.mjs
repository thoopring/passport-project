#!/usr/bin/env node
/**
 * Self-host destination photos from Unsplash CDN to /public/destinations/.
 *
 * Why this exists: Unsplash silently swaps and 404s photo IDs over time.
 * We saw 33% break-rate in the Reykjavik pool within 24 hours of
 * shipping. Hotlinking is unstable; mirroring is permanent. Once a
 * photo is in /public, it rides our Vercel CDN forever.
 *
 * License: Unsplash's standard license explicitly allows self-hosting
 * for product / commercial use. We're well inside the allowed lane.
 *
 * Usage:
 *   node scripts/fetch-destination-photos.mjs              # all
 *   node scripts/fetch-destination-photos.mjs tokyo        # just tokyo
 *   node scripts/fetch-destination-photos.mjs --skip-existing  # skip re-download
 *
 * Per photo:
 *   1. HEAD-check Unsplash CDN (catches deleted IDs, NOT silent swaps)
 *   2. If 200, fetch + save to /public/destinations/{slug}/{filename}
 *   3. If non-200 or fetch fails, log + skip
 *
 * Output: per-line status + final summary listing failures so the
 * maintainer can swap in replacement IDs and re-run.
 *
 * After successful download, MANUALLY add the localFile / localFiles
 * field to lib/destinations/heroes.ts and lib/destinations/day-photos.ts
 * for the destinations that downloaded successfully.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DEST = path.join(ROOT, "public", "destinations");

const HERO_W = 1600;
const DAY_W = 1600;
const QUALITY = 85;
const UA = "gliddy-photo-fetcher/1.0 (+https://checkvisamap.com)";
const DELAY_MS = 200;

/* ─── Manifest — derived from the live catalog (heroes.ts + day-photos.ts).
       When you add a new destination to either catalog, mirror it here so
       this script can fetch its photos in the next migration run. ─── */
const MANIFEST = {
  heroes: [
    // Tier A — already verified working in samples gallery
    { slug: "tokyo", id: "photo-1542051841857-5f90071e7989" },
    { slug: "osaka", id: "photo-1590559899731-a382839e5549" },
    { slug: "seoul", id: "photo-1517154421773-0529f29ea451" },
    { slug: "taipei", id: "photo-1470004914212-05527e49370b" },
    { slug: "bangkok", id: "photo-1508009603885-50cf7c579365" },
    { slug: "hanoi", id: "photo-1528127269322-539801943592" },
    { slug: "bali", id: "photo-1573790387438-4da905039392" },
    { slug: "paris", id: "photo-1499856871958-5b9627545d1a" },
    { slug: "london", id: "photo-1513635269975-59663e0ac1ad" },
    { slug: "new-york", id: "photo-1496442226666-8d4d0e62e6e9" },
    { slug: "reykjavik", id: "photo-1531168556467-80aace0d0144" },
    { slug: "cusco", id: "photo-1526392060635-9d6019884377" },
    { slug: "dubai", id: "photo-1512453979798-5ea266f8880c" },
    // Tier B — candidate IDs, never verified at runtime
    { slug: "kyoto", id: "photo-1545569341-9eb8b30979d9" },
    { slug: "singapore", id: "photo-1525625293386-3f8f99389edd" },
    { slug: "hong-kong", id: "photo-1536599018102-9f803c140fc1" },
    { slug: "rome", id: "photo-1525874684015-58379d421a52" },
    { slug: "barcelona", id: "photo-1583422409516-2895a77efded" },
    { slug: "amsterdam", id: "photo-1534351590666-13e3e96c5017" },
    { slug: "berlin", id: "photo-1560969184-10fe8719e047" },
    { slug: "vienna", id: "photo-1516550893923-42d28e5677af" },
    { slug: "prague", id: "photo-1541849546-216549ae216d" },
    { slug: "istanbul", id: "photo-1524231757912-21f4fe3a7200" },
    { slug: "sydney", id: "photo-1506973035872-a4ec16b8e8d9" },
    { slug: "san-francisco", id: "photo-1501594907352-04cda38ebc29" },
    { slug: "los-angeles", id: "photo-1605833556294-ea5c7a74f57d" },
    { slug: "mexico-city", id: "photo-1518105779142-d975f22f1b0a" },
    { slug: "lisbon", id: "photo-1513735492246-483525079686" },
    { slug: "marrakech", id: "photo-1539020140153-e479b8c61e30" },
    { slug: "madrid", id: "photo-1539037116277-4db20889f2d4" },
  ],
  // Day-photo pools per destination. Filenames are day-1.jpg, day-2.jpg,
  // etc., matching the IDs by index. The catalog picker shuffles by
  // index, so site/PDF stay in sync.
  dayPhotos: {
    tokyo: [
      "photo-1480796927426-f609979314bd",
      "photo-1503899036084-c55cdd92da26",
      "photo-1493976040374-85c8e12f0c0e",
      "photo-1554797589-7241bb691973",
      "photo-1551353777-9bcc7ba2c0c2",
      "photo-1505765050516-f72dcac9c60a",
    ],
    paris: [
      "photo-1502602898657-3e91760cbb34",
      "photo-1431274172761-fca41d930114",
      "photo-1520939817895-060bdaf4fe1b",
      "photo-1431915525049-e493bb586d3e",
      "photo-1522093007474-d86e9bf7ba6f",
      "photo-1546412414-e1885259563a",
    ],
    reykjavik: [
      // Already confirmed-working set; included so the script is idempotent.
      "photo-1500380804539-4e1e8c1e7118",
      "photo-1531366936337-7c912a4589a7",
      "photo-1520967824495-b529aeba26df",
    ],
    bali: [
      "photo-1537996194471-e657df975ab4",
      "photo-1518509562904-e7ef99cddc85",
      "photo-1577717903315-1691ae25ab3f",
      "photo-1519482816300-1490fdf2c2bd",
      "photo-1604999333679-b86d54738315",
      "photo-1604567935069-65eaf4d33e4f",
    ],
  },
};

const args = process.argv.slice(2);
const skipExisting = args.includes("--skip-existing");
const filter = args.find((a) => !a.startsWith("--"))?.toLowerCase();

function unsplashUrl(id, w) {
  return `https://images.unsplash.com/${id}?w=${w}&q=${QUALITY}&fm=jpg&fit=crop`;
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function headOk(url) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      headers: { "User-Agent": UA },
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function download(url, destPath) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, buf);
  return buf.length;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const results = [];

async function processOne({ slug, id, filename, width }) {
  const dest = path.join(PUBLIC_DEST, slug, filename);
  const rel = `${slug}/${filename}`;

  if (skipExisting && (await fileExists(dest))) {
    process.stdout.write(`SKIP ${rel} (exists)\n`);
    results.push({ slug, file: filename, id, status: "skip-exists" });
    return;
  }

  const url = unsplashUrl(id, width);
  process.stdout.write(`HEAD ${rel} ... `);
  if (!(await headOk(url))) {
    console.log("FAIL (HEAD non-200)");
    results.push({ slug, file: filename, id, status: "fail-head" });
    return;
  }

  try {
    const size = await download(url, dest);
    console.log(`OK (${(size / 1024).toFixed(0)}KB)`);
    results.push({ slug, file: filename, id, status: "ok", size });
  } catch (err) {
    console.log(`FAIL (${err.message})`);
    results.push({ slug, file: filename, id, status: "fail-fetch" });
  }
  await sleep(DELAY_MS);
}

console.log(`\n=== HEROES (${MANIFEST.heroes.length}) ===\n`);
for (const { slug, id } of MANIFEST.heroes) {
  if (filter && !slug.includes(filter)) continue;
  await processOne({ slug, id, filename: "hero.jpg", width: HERO_W });
}

console.log(`\n=== DAY PHOTOS ===\n`);
for (const [slug, ids] of Object.entries(MANIFEST.dayPhotos)) {
  if (filter && !slug.includes(filter)) continue;
  for (let i = 0; i < ids.length; i++) {
    await processOne({
      slug,
      id: ids[i],
      filename: `day-${i + 1}.jpg`,
      width: DAY_W,
    });
  }
}

const ok = results.filter((r) => r.status === "ok").length;
const skip = results.filter((r) => r.status === "skip-exists").length;
const fail = results.filter((r) => r.status.startsWith("fail")).length;

console.log(`\n=== SUMMARY ===`);
console.log(`  OK:   ${ok}`);
console.log(`  SKIP: ${skip}`);
console.log(`  FAIL: ${fail}`);

if (fail > 0) {
  console.log(`\nFailed entries — replace IDs in MANIFEST and re-run:`);
  results
    .filter((r) => r.status.startsWith("fail"))
    .forEach((r) => {
      console.log(`  ${r.slug}/${r.file} ← ${r.id} (${r.status})`);
    });
}

const totalBytes = results
  .filter((r) => r.status === "ok")
  .reduce((sum, r) => sum + (r.size ?? 0), 0);
console.log(`\nDownloaded: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);

// Write a JSON report next to the script so the maintainer can scan
// successes/failures programmatically (e.g., for catalog updates).
const reportPath = path.join(__dirname, "fetch-report.json");
await fs.writeFile(reportPath, JSON.stringify(results, null, 2));
console.log(`Report: ${path.relative(ROOT, reportPath)}`);
