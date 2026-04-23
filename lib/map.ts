import type { TripPlan, Stop } from "../types/trip-plan";

/**
 * Map helpers — Mapbox static and interactive map data shaping.
 *
 * Two outputs:
 *   1. Static image URL for the PDF (Mapbox Static Images API)
 *   2. Flattened stop list with sequential numbering for the interactive map
 */

const DAY_COLORS = [
  "1a4d2e", "ff9f1c", "0ea5e9", "8b5cf6", "ef4444",
  "10b981", "f59e0b", "06b6d4", "ec4899", "84cc16",
];

export interface FlatStop {
  globalIndex: number;
  dayNumber: number;
  dayColor: string;
  stop: Stop;
}

export function flattenStops(plan: TripPlan): FlatStop[] {
  const flat: FlatStop[] = [];
  let i = 1;
  for (const day of plan.days) {
    const color = DAY_COLORS[(day.dayNumber - 1) % DAY_COLORS.length];
    for (const stop of day.stops) {
      flat.push({ globalIndex: i++, dayNumber: day.dayNumber, dayColor: color, stop });
    }
  }
  return flat;
}

/**
 * Build a Mapbox Static Images API URL with numbered pin markers for every
 * stop in the plan, plus a polyline connecting them in order.
 *
 * Capped at 99 stops because the static API has URL-length limits.
 */
export function buildStaticMapUrl(plan: TripPlan, width = 800, height = 500): string {
  const token = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) {
    return ""; // gracefully degrade — PDF will skip the map
  }

  const flat = flattenStops(plan).slice(0, 99);
  if (!flat.length) return "";

  const overlays: string[] = [];

  // Polyline (encoded as LineString GeoJSON in path overlay)
  if (flat.length >= 2) {
    const coordsStr = flat.map((f) => `${f.stop.coords[0]},${f.stop.coords[1]}`).join(";");
    overlays.push(`path-3+1a4d2e-0.6(${encodePolyline(flat)})`);
    void coordsStr;
  }

  // Numbered pins
  for (const f of flat) {
    const color = f.dayColor;
    const num = f.globalIndex;
    const safeNum = num <= 99 ? num : 99;
    overlays.push(`pin-s-${safeNum}+${color}(${f.stop.coords[0]},${f.stop.coords[1]})`);
  }

  const overlayStr = overlays.join(",");
  const style = "mapbox/streets-v12";
  // @react-pdf/renderer refuses to embed images without a recognized extension
  // in the URL path. Mapbox supports `.png` as the format suffix.
  return `https://api.mapbox.com/styles/v1/${style}/static/${overlayStr}/auto/${width}x${height}@2x.png?access_token=${token}`;
}

/**
 * Polyline encoding — Mapbox supports both raw coords and Google polyline
 * format. Raw coords blow up the URL fast, so we use Google polyline.
 */
function encodePolyline(stops: FlatStop[]): string {
  const points = stops.map((s) => [s.stop.coords[1], s.stop.coords[0]]); // lat, lng for polyline
  let lat = 0;
  let lng = 0;
  let result = "";
  for (const [pLat, pLng] of points) {
    const dLat = Math.round(pLat * 1e5) - lat;
    const dLng = Math.round(pLng * 1e5) - lng;
    lat += dLat;
    lng += dLng;
    result += encodeNum(dLat) + encodeNum(dLng);
  }
  return encodeURIComponent(result);
}

function encodeNum(n: number): string {
  let v = n < 0 ? ~(n << 1) : n << 1;
  let out = "";
  while (v >= 0x20) {
    out += String.fromCharCode((0x20 | (v & 0x1f)) + 63);
    v >>= 5;
  }
  out += String.fromCharCode(v + 63);
  return out;
}

/**
 * Compute the bounding box of all stops, used to fit the interactive map.
 */
export function computeBounds(plan: TripPlan): [[number, number], [number, number]] | null {
  const flat = flattenStops(plan);
  if (!flat.length) return null;
  let minLng = Infinity,
    minLat = Infinity,
    maxLng = -Infinity,
    maxLat = -Infinity;
  for (const f of flat) {
    const [lng, lat] = f.stop.coords;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}
