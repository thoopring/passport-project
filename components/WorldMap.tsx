"use client";

import React, { memo, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

// 전 세계 지도 데이터 (TopoJSON)
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapProps {
  selectedOrigin: string;
  visaData: any[];
}

const WorldMap = ({ selectedOrigin, visaData }: MapProps) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 국가별 색상 결정 함수
  const getCountryColor = (countryName: string) => {
    const normalizedName = countryName.toLowerCase();
    
    // 내 여권 국가 (파란색)
    if (normalizedName === selectedOrigin.toLowerCase()) return "#3b82f6"; 

    // 비자 데이터 찾기
    const visaInfo = visaData.find(v => 
      v.origin.toLowerCase() === selectedOrigin.toLowerCase() &&
      (v.destination.toLowerCase() === normalizedName || v.destination.toLowerCase().includes(normalizedName))
    );

    if (!visaInfo) return "#D6D6DA"; // 데이터 없음 (회색)

    const req = visaInfo.requirement.toLowerCase();
    if (req.includes("visa not required") || req.includes("visa free")) return "#4ade80"; // 무비자 (초록)
    if (req.includes("visa on arrival")) return "#facc15"; // 도착비자 (노랑)
    if (req.includes("electronic") || req.includes("evisa")) return "#22d3ee"; // e-비자 (하늘)
    if (req.includes("banned") || req.includes("refused")) return "#ef4444"; // 금지 (빨강)
    
    return "#f87171"; // 비자 필요 (연한 빨강)
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-blue-50 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-inner border border-gray-200 dark:border-gray-700 transition-colors duration-500 group cursor-grab active:cursor-grabbing">
      
      {/* 맵 타이틀 */}
      <div className="absolute top-4 left-6 z-10 pointer-events-none">
        <h3 className="text-gray-900 dark:text-white font-bold text-lg opacity-80 shadow-black drop-shadow-md">
          🗺️ Live Visa Map
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Scroll to Zoom / Drag to Move</p>
      </div>

      {/* 툴팁 */}
      {tooltipContent && (
        <div 
            className="fixed z-50 bg-gray-900/90 text-white text-xs px-3 py-2 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full border border-gray-700 backdrop-blur-sm whitespace-nowrap"
            style={{ left: mousePosition.x, top: mousePosition.y - 15 }}
        >
            {tooltipContent}
        </div>
      )}

      <ComposableMap projectionConfig={{ scale: 160 }} className="w-full h-full">
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const fillColor = getCountryColor(countryName);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none", transition: "all 250ms" },
                      hover: { fill: "#333", outline: "none", stroke: "#FFF", strokeWidth: 1, cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={() => {
                        const visaInfo = visaData.find(v => 
                            v.origin.toLowerCase() === selectedOrigin.toLowerCase() &&
                            (v.destination.toLowerCase() === countryName.toLowerCase() || v.destination.toLowerCase().includes(countryName.toLowerCase()))
                        );
                        const status = visaInfo ? visaInfo.requirement.replace(/\[.*?\]/g, "") : "Data Not Found";
                        setTooltipContent(`${countryName}: ${status}`);
                    }}
                    onMouseMove={(e) => {
                        setMousePosition({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      
      {/* 범례 (Legend) */}
      <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-3 rounded-xl shadow-lg text-xs flex flex-col gap-2 dark:text-gray-200 pointer-events-none">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-400"></span> Visa Free</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> On Arrival</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400"></span> e-Visa</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-400"></span> Required</div>
      </div>
    </div>
  );
};

export default memo(WorldMap);