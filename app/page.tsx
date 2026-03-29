"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import visaDataRaw from "../visa_data.json";
import WorldMap from "../components/WorldMap";
import AffiliateSection from "../components/AffiliateSection";
import NewsletterSignup from "../components/NewsletterSignup";
import PassportComparison from "../components/PassportComparison";
import DestinationRoulette from "../components/DestinationRoulette";
import ScrollReveal from "../components/ScrollReveal";
import { BLOG_POSTS } from "./blog/data";

interface VisaData {
  origin: string;
  destination: string;
  requirement: string;
  allowed_stay?: string;
  notes?: string;
  region?: string;
  capital?: string;
  best_time_to_visit?: string;
}

const visaData: VisaData[] = visaDataRaw as VisaData[];

const ORIGIN_COUNTRIES = [
  { name: "South Korea", flag: "\ud83c\uddf0\ud83c\uddf7", code: "KR" },
  { name: "United States", flag: "\ud83c\uddfa\ud83c\uddf8", code: "US" },
  { name: "United Kingdom", flag: "\ud83c\uddec\ud83c\udde7", code: "UK" },
  { name: "Canada", flag: "\ud83c\udde8\ud83c\udde6", code: "CA" },
  { name: "Australia", flag: "\ud83c\udde6\ud83c\uddfa", code: "AU" },
  { name: "Germany", flag: "\ud83c\udde9\ud83c\uddea", code: "DE" },
  { name: "France", flag: "\ud83c\uddeb\ud83c\uddf7", code: "FR" },
  { name: "Japan", flag: "\ud83c\uddef\ud83c\uddf5", code: "JP" },
];

function createSlug(destination: string, origin: string) {
  const p = origin.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const d = destination.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `${p}-to-${d}`;
}

export default function Home() {
  const [selectedOrigin, setSelectedOrigin] = useState("South Korea");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDarkMode(true);
    }
  };

  const { filteredData, stats } = useMemo(() => {
    const filtered = visaData.filter((visa) => {
      if (visa.destination.length > 50) return false;
      if (!visa.destination || !visa.origin) return false;
      if (/^\d/.test(visa.destination)) return false;
      const originMatch = visa.origin.toLowerCase() === selectedOrigin.toLowerCase();
      const searchMatch = visa.destination.toLowerCase().includes(searchTerm.toLowerCase());
      return originMatch && searchMatch;
    });

    const all = visaData.filter((v) => v.origin.toLowerCase() === selectedOrigin.toLowerCase());
    const visaFree = all.filter(
      (v) => v.requirement.toLowerCase().includes("visa not required") || v.requirement.toLowerCase().includes("visa free")
    ).length;
    const visaOnArrival = all.filter((v) => v.requirement.toLowerCase().includes("visa on arrival")).length;
    const eVisa = all.filter(
      (v) => v.requirement.toLowerCase().includes("electronic") || v.requirement.toLowerCase().includes("evisa")
    ).length;
    const required = all.length - (visaFree + visaOnArrival + eVisa);

    return { filteredData: filtered, stats: { visaFree, visaOnArrival, eVisa, required, total: all.length } };
  }, [selectedOrigin, searchTerm]);

  const blogPosts = useMemo(
    () =>
      Object.entries(BLOG_POSTS)
        .map(([slug, post]) => ({ slug, ...post }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3),
    []
  );

  const selectedFlag = ORIGIN_COUNTRIES.find((c) => c.name === selectedOrigin)?.flag;

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* ===== Top Navigation ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/logo.png" alt="Passport Power" width={28} height={28} className="group-hover:scale-105 transition-transform" />
            <span className="font-bold text-body-sm text-[var(--text-primary)] tracking-tight hidden sm:block">
              Passport Power
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/blog" className="px-3 py-1.5 text-body-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition rounded-lg hover:bg-[var(--surface-secondary)]">
              Blog
            </Link>
            <Link href="/about" className="px-3 py-1.5 text-body-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition rounded-lg hover:bg-[var(--surface-secondary)]">
              About
            </Link>
            <button
              onClick={toggleDarkMode}
              className="ml-1 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--surface-secondary)] transition text-[var(--text-secondary)]"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-caption font-semibold text-brand-700 dark:text-brand-300 mb-6 animate-fade-down">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse-slow" />
            190+ countries \u00b7 8 passports \u00b7 Real-time data
          </div>

          <h1 className="text-display-xl md:text-[5.5rem] md:leading-[1.02] text-[var(--text-primary)] mb-6 animate-fade-up">
            Know before<br />
            <span className="gradient-text">you go.</span>
          </h1>

          <p className="text-body-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Check visa requirements instantly. No government jargon, no outdated wikis.
            Just clear answers for your next trip.
          </p>

          {/* Passport Selector */}
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-caption uppercase font-semibold text-[var(--text-muted)] mb-3 tracking-wider">
              Select your passport
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {ORIGIN_COUNTRIES.map((country) => (
                <button
                  key={country.name}
                  onClick={() => setSelectedOrigin(country.name)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-body-sm font-medium transition-all duration-200 cursor-pointer ${
                    selectedOrigin === country.name
                      ? "bg-[var(--text-primary)] text-[var(--background)] shadow-elevated scale-[1.02]"
                      : "bg-[var(--surface-primary)] border border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span className="text-lg leading-none">{country.flag}</span>
                  <span className="hidden sm:inline">{country.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats Bar ===== */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Visa Free", value: stats.visaFree, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900" },
              { label: "On Arrival", value: stats.visaOnArrival, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900" },
              { label: "e-Visa", value: stats.eVisa, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-100 dark:border-cyan-900" },
              { label: "Required", value: stats.required, color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} border rounded-xl p-4 text-center`}>
                <div className={`text-display-sm md:text-display-md font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-caption font-semibold text-[var(--text-muted)] uppercase mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ===== Map Section ===== */}
      <ScrollReveal>
        <section id="map-section" className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-display-sm text-[var(--text-primary)]">
                {selectedFlag} {selectedOrigin} Visa Map
              </h2>
              <p className="text-body-sm text-[var(--text-secondary)] mt-1">
                Interactive map showing visa requirements worldwide
              </p>
            </div>
          </div>
          <WorldMap selectedOrigin={selectedOrigin} visaData={visaData} />
        </section>
      </ScrollReveal>

      {/* ===== Partners ===== */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <p className="text-caption uppercase font-semibold text-[var(--text-muted)] mb-3 tracking-wider">
            Travel partners
          </p>
          <AffiliateSection />
        </section>
      </ScrollReveal>

      {/* ===== Search & Destinations ===== */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-display-sm text-[var(--text-primary)]">All Destinations</h2>
              <p className="text-body-sm text-[var(--text-secondary)] mt-1">
                {filteredData.length} countries available for {selectedOrigin} passport
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-xl text-body-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/40 transition"
              />
            </div>
          </div>

          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredData.map((visa, index) => {
                const cleanReq = visa.requirement.replace(/\[.*?\]/g, "").trim();
                const reqLower = cleanReq.toLowerCase();
                let statusColor = "bg-surface-100 text-surface-600 border-surface-200";
                let dotColor = "bg-surface-400";

                if (reqLower.includes("visa not required") || reqLower.includes("visa free")) {
                  statusColor = "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400 border-green-100 dark:border-green-900";
                  dotColor = "bg-green-500";
                } else if (reqLower.includes("visa on arrival")) {
                  statusColor = "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100 dark:border-amber-900";
                  dotColor = "bg-amber-500";
                } else if (reqLower.includes("electronic") || reqLower.includes("evisa")) {
                  statusColor = "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900";
                  dotColor = "bg-cyan-500";
                } else if (reqLower.includes("banned") || reqLower.includes("refused")) {
                  statusColor = "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border-red-100 dark:border-red-900";
                  dotColor = "bg-red-500";
                }

                const slug = createSlug(visa.destination, visa.origin);

                return (
                  <Link
                    key={`${visa.origin}-${visa.destination}-${index}`}
                    href={`/visa/${slug}`}
                    className="group flex items-center justify-between p-4 bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-xl hover:border-[var(--text-muted)] hover:shadow-card transition-all duration-200"
                  >
                    <div className="min-w-0">
                      <h3 className="font-semibold text-body-sm text-[var(--text-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition truncate">
                        {visa.destination}
                      </h3>
                      <div className={`inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-md text-caption font-medium border ${statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                        {cleanReq.length > 25 ? cleanReq.slice(0, 25) + "..." : cleanReq}
                      </div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-3 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition -translate-x-1 group-hover:translate-x-0">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-body-lg text-[var(--text-muted)] font-medium">No destinations found</p>
              <p className="text-body-sm text-[var(--text-muted)] mt-1">Try a different search term</p>
            </div>
          )}
        </section>
      </ScrollReveal>

      {/* ===== Interactive Tools ===== */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <p className="text-caption uppercase font-semibold text-[var(--text-muted)] mb-4 tracking-wider">
            Explore & Compare
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PassportComparison visaData={visaData} />
            <DestinationRoulette visaData={visaData} selectedOrigin={selectedOrigin} />
          </div>
        </section>
      </ScrollReveal>

      {/* ===== Blog Section ===== */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-display-sm text-[var(--text-primary)]">Travel Stories & Guides</h2>
              <p className="text-body-sm text-[var(--text-secondary)] mt-1">
                Real experiences and practical tips from the road
              </p>
            </div>
            <Link href="/blog" className="text-body-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline underline-offset-2 hidden sm:block">
              View all
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-[var(--surface-primary)] border border-[var(--border-light)] rounded-2xl overflow-hidden hover-lift"
              >
                <div className="h-40 bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-950 dark:to-surface-900 flex items-center justify-center">
                  <span className="text-caption font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">{post.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-body-md text-[var(--text-primary)] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition mb-2 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-body-sm text-[var(--text-secondary)] line-clamp-2 mb-3">{post.excerpt}</p>
                  <span className="text-caption text-[var(--text-muted)]">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6 sm:hidden">
            <Link href="/blog" className="text-body-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline underline-offset-2">
              View all stories
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== Newsletter ===== */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-20">
          <NewsletterSignup />
        </section>
      </ScrollReveal>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[var(--border-light)] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="Passport Power" width={24} height={24} />
              <span className="font-bold text-body-sm text-[var(--text-primary)]">Passport Power</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-body-sm font-medium text-[var(--text-secondary)]">
              <Link href="/blog" className="hover:text-[var(--text-primary)] transition">Blog</Link>
              <Link href="/about" className="hover:text-[var(--text-primary)] transition">About</Link>
              <Link href="/privacy" className="hover:text-[var(--text-primary)] transition">Privacy</Link>
              <Link href="/disclaimer" className="hover:text-[var(--text-primary)] transition">Disclaimer</Link>
            </div>

            <p className="text-caption text-[var(--text-muted)]">
              &copy; 2026 Passport Power. Not affiliated with any government.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
