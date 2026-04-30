"use client";

import { useMemo, useState } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { TripPlan, RoutePolylineSegment } from "../types/trip-plan";
import { flattenStops, computeBounds } from "../lib/map";

interface PlanMapProps {
  plan: TripPlan;
  /** Optional fixed height in px. Defaults to 500. */
  height?: number;
  /** Cached Mapbox Directions polylines, one entry per consecutive stop-pair.
   *  When present, the route is rendered as walking-aware segments. When
   *  absent (or per-segment null), the segment falls back to a straight line. */
  routePolylines?: (RoutePolylineSegment | null)[] | null;
}

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function PlanMap({ plan, height = 500, routePolylines }: PlanMapProps) {
  const flat = useMemo(() => flattenStops(plan), [plan]);
  const bounds = useMemo(() => computeBounds(plan), [plan]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const initialViewState = useMemo(() => {
    if (!bounds) return { longitude: 0, latitude: 0, zoom: 2 };
    const [[minLng, minLat], [maxLng, maxLat]] = bounds;
    return {
      longitude: (minLng + maxLng) / 2,
      latitude: (minLat + maxLat) / 2,
      zoom: 11,
    };
  }, [bounds]);

  /**
   * Build a multi-segment LineString FeatureCollection. For each consecutive
   * pair of stops, prefer the cached Directions polyline; if absent or null
   * (failed segment), fall back to a straight line between the two stops.
   * Result: pedestrian-aware paths where we have them, straight-line elsewhere.
   */
  const lineGeoJson = useMemo(() => {
    const features = [];
    for (let i = 0; i < flat.length - 1; i++) {
      const segment = routePolylines?.[i];
      const coordinates =
        segment && segment.coords.length >= 2
          ? segment.coords
          : [flat[i].stop.coords, flat[i + 1].stop.coords];
      features.push({
        type: "Feature" as const,
        properties: {},
        geometry: {
          type: "LineString" as const,
          coordinates,
        },
      });
    }
    return {
      type: "FeatureCollection" as const,
      features,
    };
  }, [flat, routePolylines]);

  if (!TOKEN) {
    return (
      <div className="rounded-2xl border border-[var(--border-light)] bg-[var(--surface-secondary)] p-8 text-center">
        <p className="text-body-sm text-[var(--text-muted)]">
          Map unavailable — Mapbox token not configured.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[12px] overflow-hidden border border-[var(--border-light)]" style={{ height }}>
      <Map
        mapboxAccessToken={TOKEN}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
      >
        <Source id="route" type="geojson" data={lineGeoJson}>
          <Layer
            id="route-line"
            type="line"
            paint={{
              "line-color": "#815652",
              "line-width": 3,
              "line-opacity": 0.7,
            }}
          />
        </Source>

        {flat.map((f) => (
          <Marker
            key={f.globalIndex}
            longitude={f.stop.coords[0]}
            latitude={f.stop.coords[1]}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setOpenIndex(f.globalIndex);
            }}
          >
            <div
              className="flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-xs border-2 border-white shadow-md cursor-pointer"
              style={{ backgroundColor: `#${f.dayColor}` }}
              title={f.stop.name}
            >
              {f.globalIndex}
            </div>
          </Marker>
        ))}

        {openIndex !== null &&
          (() => {
            const f = flat.find((x) => x.globalIndex === openIndex);
            if (!f) return null;
            return (
              <Popup
                longitude={f.stop.coords[0]}
                latitude={f.stop.coords[1]}
                anchor="top"
                onClose={() => setOpenIndex(null)}
                closeOnClick={false}
                offset={20}
              >
                <div className="max-w-[220px] p-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Day {f.dayNumber} · {f.stop.time}
                  </p>
                  <p className="font-semibold text-sm mt-0.5">{f.stop.name}</p>
                  <p className="text-xs text-gray-600 mt-1 leading-snug">{f.stop.description}</p>
                </div>
              </Popup>
            );
          })()}
      </Map>
    </div>
  );
}
