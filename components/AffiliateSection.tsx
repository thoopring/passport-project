"use client";

const PARTNERS = [
  {
    name: "Flights",
    desc: "Compare hundreds of airlines",
    href: "https://aviasales.tpx.lu/M1CWAKTJ",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
      </svg>
    ),
    color: "bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 border-sky-100 dark:border-sky-900",
  },
  {
    name: "Hotels",
    desc: "Best rates across Asia & Europe",
    href: "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1956855&hl=en-us",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M9 3h6l3 4H6l3-4z"/>
      </svg>
    ),
    color: "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-900",
  },
  {
    name: "eSIM Data",
    desc: "Stay connected, no roaming",
    href: "https://airalo.pxf.io/2anR7A",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>
      </svg>
    ),
    color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900",
  },
];

export default function AffiliateSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {PARTNERS.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`flex items-center gap-4 p-4 rounded-xl border ${p.color} hover-lift group`}
        >
          <div className="shrink-0 opacity-60 group-hover:opacity-100 transition">{p.icon}</div>
          <div className="min-w-0">
            <p className="font-semibold text-body-sm">{p.name}</p>
            <p className="text-caption opacity-70 truncate">{p.desc}</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 ml-auto opacity-0 group-hover:opacity-60 transition -translate-x-1 group-hover:translate-x-0">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      ))}
    </div>
  );
}
