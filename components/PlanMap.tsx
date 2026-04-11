"use client";

import { useMemo, useState } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { TripPlan } from "../types/trip-plan";
import { flattenStops, computeBounds } from "../lib/map";

interface PlanMapProps {
  plan: TripPlan;
}

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function PlanMap({ plan }: PlanMapProps) {
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

  const lineGeoJson = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: [
        {
          type: "Feature" as const,
          properties: {},
          geometry: {
            type: "LineString" as const,
            coordinates: flat.map((f) => f.stop.coords),
          },
        },
      ],
    }),
    [flat]
  );

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
    <div className="rounded-2xl overflow-hidden border border-[var(--border-light)]" style={{ height: 500 }}>
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
              "line-color": "#1a4d2e",
              "line-width": 3,
              "line-opacity": 0.6,
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
