"use client";

import { useState, useMemo } from "react";

interface VisaData {
  origin: string;
  destination: string;
  requirement: string;
}

const PASSPORTS = [
  { name: "South Korea", flag: "\ud83c\uddf0\ud83c\uddf7" },
  { name: "United States", flag: "\ud83c\uddfa\ud83c\uddf8" },
  { name: "United Kingdom", flag: "\ud83c\uddec\ud83c\udde7" },
  { name: "Canada", flag: "\ud83c\udde8\ud83c\udde6" },
  { name: "Australia", flag: "\ud83c\udde6\ud83c\uddfa" },
  { name: "Germany", flag: "\ud83c\udde9\ud83c\uddea" },
  { name: "France", flag: "\ud83c\uddeb\ud83c\uddf7" },
  { name: "Japan", flag: "\ud83c\uddef\ud83c\uddf5" },
];

function getStats(visaData: VisaData[], origin: string) {
  const data = visaData.filter(
    (v) => v.origin.toLowerCase() === origin.toLowerCase() && v.destination.length < 50
  );
  const visaFree = data.filter(
    (v) =>
      v.requirement.toLowerCase().includes("visa not required") ||
      v.requirement.toLowerCase().includes("visa free")
  ).length;
  const onArrival = data.filter((v) =>
    v.requirement.toLowerCase().includes("visa on arrival")
  ).length;
  const eVisa = data.filter(
    (v) =>
      v.requirement.toLowerCase().includes("electronic") ||
      v.requirement.toLowerCase().includes("evisa")
  ).length;
  const required = data.length - visaFree - onArrival - eVisa;
  return { total: data.length, visaFree, onArrival, eVisa, required };
}

function getUniqueDests(visaData: VisaData[], origin: string, type: string) {
  return new Set(
    visaData
      .filter((v) => {
        if (v.origin.toLowerCase() !== origin.toLowerCase()) return false;
        if (v.destination.length > 50) return false;
        const req = v.requirement.toLowerCase();
        if (type === "free") return req.includes("visa not required") || req.includes("visa free");
        if (type === "arrival") return req.includes("visa on arrival");
        return false;
      })
      .map((v) => v.destination)
  );
}

export default function PassportComparison({ visaData }: { visaData: VisaData[] }) {
  const [left, setLeft] = useState("South Korea");
  const [right, setRight] = useState("Japan");
  const [isOpen, setIsOpen] = useState(false);

  const leftStats = useMemo(() => getStats(visaData, left), [visaData, left]);
  const rightStats = useMemo(() => getStats(visaData, right), [visaData, right]);

  const comparison = useMemo(() => {
    const leftFree = getUniqueDests(visaData, left, "free");
    const rightFree = getUniqueDests(visaData, right, "free");
    const onlyLeft = [...leftFree].filter((d) => !rightFree.has(d));
    const onlyRight = [...rightFree].filter((d) => !leftFree.has(d));
    const both = [...leftFree].filter((d) => rightFree.has(d));
    return { onlyLeft, onlyRight, both };
  }, [visaData, left, right]);

  const leftPassport = PASSPORTS.find((p) => p.name === left)!;
  const rightPassport = PASSPORTS.find((p) => p.name === right)!;

  const maxFree = Math.max(leftStats.visaFree, rightStats.visaFree);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-5 px-6 bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl hover-lift cursor-pointer text-left flex items-center justify-between group"
      >
        <div>
          <p className="text-display-sm text-[var(--text-primary)] mb-1">Passport vs Passport</p>
          <p className="text-body-sm text-[var(--text-secondary)]">
            Compare visa-free access between two passports side by side
          </p>
        </div>
        <div className="flex items-center gap-2 text-2xl opacity-70 group-hover:opacity-100 transition">
          <span>{leftPassport.flag}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[var(--text-muted)]">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{rightPassport.flag}</span>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-light)]">
        <h3 className="text-display-sm text-[var(--text-primary)]">Passport Comparison</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition p-1"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Passport Selectors */}
      <div className="grid grid-cols-2 divide-x divide-[var(--border-light)]">
        {[
          { value: left, setter: setLeft, stats: leftStats, passport: leftPassport },
          { value: right, setter: setRight, stats: rightStats, passport: rightPassport },
        ].map((side, idx) => (
          <div key={idx} className="p-6">
            <select
              value={side.value}
              onChange={(e) => side.setter(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--surface-secondary)] border border-[var(--border-light)] rounded-xl text-body-md font-medium text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer appearance-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23737373' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
            >
              {PASSPORTS.map((p) => (
                <option key={p.name} value={p.name}>{p.flag} {p.name}</option>
              ))}
            </select>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-caption uppercase font-semibold text-[var(--text-muted)]">Visa Free</span>
                <span className="text-display-sm text-brand-600 dark:text-brand-400">{side.stats.visaFree}</span>
              </div>
              <div className="h-2 bg-[var(--surface-secondary)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${maxFree > 0 ? (side.stats.visaFree / maxFree) * 100 : 0}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { label: "On Arrival", value: side.stats.onArrival, color: "text-amber-600 dark:text-amber-400" },
                  { label: "e-Visa", value: side.stats.eVisa, color: "text-cyan-600 dark:text-cyan-400" },
                  { label: "Required", value: side.stats.required, color: "text-red-500 dark:text-red-400" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-caption text-[var(--text-muted)]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Insight */}
      <div className="px-6 py-5 bg-[var(--surface-secondary)] border-t border-[var(--border-light)]">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-brand-600 dark:text-brand-400">{comparison.onlyLeft.length}</div>
            <div className="text-caption text-[var(--text-muted)]">Only {left.split(" ")[0]}</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[var(--text-primary)]">{comparison.both.length}</div>
            <div className="text-caption text-[var(--text-muted)]">Both</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent-600 dark:text-accent-400">{comparison.onlyRight.length}</div>
            <div className="text-caption text-[var(--text-muted)]">Only {right.split(" ")[0]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
