"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { analytics } from "../lib/analytics";

interface CheckoutCompletedTrackerProps {
  planId: string;
  destination: string;
  paymentId: string | null;
}

/**
 * Fires `checkout_completed` once per plan when the buyer lands on the
 * complete plan view. localStorage dedup prevents the event from firing
 * again on revisit (e.g. user reopens the link a week later).
 *
 * The method is inferred from the payment_id prefix written by markPlanPaid:
 *   "credit:..."     → referral credit redeemed
 *   "promo:..."      → promo code redeemed
 *   anything else    → real Lemon Squeezy purchase
 */
export default function CheckoutCompletedTracker({
  planId,
  destination,
  paymentId,
}: CheckoutCompletedTrackerProps) {
  const locale = useLocale();

  useEffect(() => {
    const storageKey = `gliddy:checkout-completed:${planId}`;
    if (typeof window === "undefined") return;
    if (window.localStorage?.getItem(storageKey)) return;

    let method: "lemon_squeezy" | "credit" | "promo" = "lemon_squeezy";
    if (paymentId?.startsWith("credit:")) method = "credit";
    else if (paymentId?.startsWith("promo:")) method = "promo";

    analytics.checkoutCompleted({
      locale,
      plan_id: planId,
      destination,
      method,
    });
    try {
      window.localStorage.setItem(storageKey, new Date().toISOString());
    } catch {
      // localStorage may be disabled (private mode); event still fired.
    }
  }, [planId, destination, paymentId, locale]);

  return null;
}
