"use client";

import { useState } from "react";

export default function CheckoutButton({ planId }: { planId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "begin_checkout", {
          event_category: "trip_planner",
          value: 4,
          currency: "USD",
        });
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Checkout failed");
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--text-primary)] font-bold text-body-md rounded-xl hover:opacity-90 disabled:opacity-50 transition min-w-[220px]"
      >
        {loading ? "Redirecting..." : "Get my full plan — $4"}
      </button>
      {error && <p className="text-caption text-red-300 mt-3">{error}</p>}
    </>
  );
}
