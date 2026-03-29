"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // GA4 event tracking
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "newsletter_signup", {
        event_category: "engagement",
        event_label: email,
      });
    }

    // TODO: Connect to email service (Mailchimp, ConvertKit, etc.)
    // For now, save to localStorage as proof of concept
    const subscribers = JSON.parse(localStorage.getItem("pp_subscribers") || "[]");
    subscribers.push({ email, date: new Date().toISOString() });
    localStorage.setItem("pp_subscribers", JSON.stringify(subscribers));

    setStatus("success");
    setEmail("");
  };

  return (
    <div className="bg-gradient-to-br from-[#1a4d2e] to-[#2d7a4a] rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
      <h3 className="text-2xl md:text-3xl font-bold mb-3 font-serif">
        Get Visa Alerts & Travel Deals
      </h3>
      <p className="opacity-80 mb-8 max-w-lg mx-auto">
        Join 1,000+ smart travelers. Get weekly visa updates, hidden deals, and border tips straight to your inbox.
      </p>

      {status === "success" ? (
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 inline-block">
          <span className="text-3xl block mb-2">🎉</span>
          <p className="font-bold text-lg">Welcome aboard!</p>
          <p className="opacity-80 text-sm">Check your inbox for a welcome surprise.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-6 py-4 rounded-full text-gray-900 font-medium outline-none focus:ring-4 focus:ring-[#ff9f1c]/50 shadow-lg"
          />
          <button
            type="submit"
            className="bg-[#ff9f1c] text-[#1a4d2e] font-bold px-8 py-4 rounded-full hover:bg-[#ffbf69] transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform whitespace-nowrap"
          >
            Subscribe Free
          </button>
        </form>
      )}

      <p className="text-xs opacity-50 mt-4">No spam, ever. Unsubscribe anytime.</p>
    </div>
  );
}
