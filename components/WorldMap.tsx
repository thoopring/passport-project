"use client";

import React, { memo, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapProps {
  selectedOrigin: string;
  visaData: { origin: string; destination: string; requirement: string }[];
}

const STATUS_COLORS = {
  light: {
    home: "#3b82f6",
    free: "#22c55e",
    arrival: "#eab308",
    evisa: "#06b6d4",
    banned: "#ef4444",
    required: "#f87171",
    noData: "#e5e5e5",
    stroke: "#ffffff",
  },
  dark: {
    home: "#60a5fa",
    free: "#4ade80",
    arrival: "#facc15",
    evisa: "#22d3ee",
    banned: "#f87171",
    required: "#fb923c",
    noData: "#262626",
    stroke: "#141414",
  },
};

const WorldMap = ({ selectedOrigin, visaData }: MapProps) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const getColor = (countryName: string) => {
    const colors = STATUS_COLORS.light;
    const normalized = countryName.toLowerCase();

    if (normalized === selectedOrigin.toLowerCase()) return colors.home;

    const visa = visaData.find(
      (v) =>
        v.origin.toLowerCase() === selectedOrigin.toLowerCase() &&
        (v.destination.toLowerCase() === normalized ||
          v.destination.toLowerCase().includes(normalized))
    );

    if (!visa) return colors.noData;

    const req = visa.requirement.toLowerCase();
    if (req.includes("visa not required") || req.includes("visa free")) return colors.free;
    if (req.includes("visa on arrival")) return colors.arrival;
    if (req.includes("electronic") || req.includes("evisa")) return colors.evisa;
    if (req.includes("banned") || req.includes("refused")) return colors.banned;
    return colors.required;
  };

  return (
    <div className="relative w-full aspect-[2/1] bg-[var(--surface-secondary)] rounded-2xl overflow-hidden border border-[var(--border-light)] cursor-grab active:cursor-grabbing">
      {/* Tooltip */}
      {tooltipContent && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: tooltipPos.x, top: tooltipPos.y - 12 }}
        >
          <div className="relative -translate-x-1/2 -translate-y-full bg-[var(--text-primary)] text-[var(--background)] text-caption font-medium px-3 py-1.5 rounded-lg shadow-elevated whitespace-nowrap">
            {tooltipContent}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--text-primary)]" />
          </div>
        </div>
      )}

      <ComposableMap
        projectionConfig={{ scale: 155, center: [10, 5] }}
        className="w-full h-full"
        style={{ background: "transparent" }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties.name;
                const fill = getColor(name);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="var(--surface-primary)"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none", transition: "fill 200ms" },
                      hover: { fill: "#1a1a1a", outline: "none", cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={() => {
                      const visa = visaData.find(
                        (v) =>
                          v.origin.toLowerCase() === selectedOrigin.toLowerCase() &&
                          (v.destination.toLowerCase() === name.toLowerCase() ||
                            v.destination.toLowerCase().includes(name.toLowerCase()))
                      );
                      const status = visa ? visa.requirement.replace(/\[.*?\]/g, "").trim() : "No data";
                      setTooltipContent(`${name} \u00b7 ${status}`);
                    }}
                    onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setTooltipContent("")}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Legend */}
      <div className="absolute bottom-3 right-3 glass rounded-xl px-3 py-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-caption font-medium text-[var(--text-secondary)]">
        {[
          { color: STATUS_COLORS.light.free, label: "Visa Free" },
          { color: STATUS_COLORS.light.arrival, label: "On Arrival" },
          { color: STATUS_COLORS.light.evisa, label: "e-Visa" },
          { color: STATUS_COLORS.light.required, label: "Required" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
            {item.label}
          </div>
        ))}
      </div>

      {/* Controls hint */}
      <div className="absolute top-3 left-3 text-caption text-[var(--text-muted)] font-medium">
        Scroll to zoom \u00b7 Drag to pan
      </div>
    </div>
  );
};

export default memo(WorldMap);
