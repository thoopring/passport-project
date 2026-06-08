/**
 * Locale-tagged analytics wrapper for GA4 + PostHog.
 *
 * Every event carries a `locale` property so funnels can be sliced by language.
 * Both providers fire from the same call — graceful degrade when env keys are
 * absent (no-op, no throws).
 *
 * Initialize once via `<AnalyticsProvider>` (see components/AnalyticsProvider.tsx).
 * Locale is registered as a PostHog super-property so it auto-attaches to every
 * subsequent event including ones we don't fire ourselves (e.g. PostHog's
 * implicit pageleave).
 */

import posthog from "posthog-js";

declare global {
  interface Window {
    gtag?: (cmd: "event", action: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

let posthogReady = false;

export function initPosthog(opts: { key?: string; host?: string }) {
  if (typeof window === "undefined") return;
  if (posthogReady) return;
  if (!opts.key) return;
  posthog.init(opts.key, {
    api_host: opts.host || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    // Pageview is captured manually on Next.js App Router pathname changes
    // (see AnalyticsProvider). PostHog's history-change auto-detector misses
    // some Next.js client-side navigations, so we fire '$pageview' explicitly.
    capture_pageview: false,
    capture_pageleave: true,
    // Heatmap capture (mouse movement, scroll depth). Mirrors the project
    // dashboard setting; declaring it here keeps client behavior aligned even
    // if dashboard config drifts.
    enable_heatmaps: true,
  });
  posthogReady = true;
}

export function setAnalyticsLocale(locale: string) {
  if (typeof window === "undefined") return;
  if (posthogReady) {
    posthog.register({ locale });
  }
}

export function identifyAnalyticsUser(distinctId: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (posthogReady) {
    posthog.identify(distinctId, props);
  }
}

/**
 * Strongly-typed event catalog. Every event includes `locale` to make
 * locale-sliced funnels trivial in both GA4 and PostHog.
 */
export type AnalyticsEvents = {
  page_view: { locale: string; path: string };
  wizard_started: {
    locale: string;
    destination?: string;
    source: "home" | "wizard_page";
  };
  schedule_created: {
    locale: string;
    plan_id: string;
    destination: string;
    traveler_type?: string;
    days?: number;
  };
  checkout_started: {
    locale: string;
    destination: string;
    promo?: string;
    value?: number;
    currency?: string;
  };
  checkout_completed: {
    locale: string;
    plan_id: string;
    destination: string;
    method: "lemon_squeezy" | "credit" | "promo";
  };
  account_signup: { locale: string };
  account_visit: { locale: string; has_plans: boolean; credits: number };
  referral_shared: {
    locale: string;
    plan_id: string;
    method: "copy" | "native_share";
  };
  credit_used: {
    locale: string;
    plan_id: string;
    type: "referral_credit" | "promo";
  };
  preview_locked_view: {
    locale: string;
    destination: string;
    duration_days: number;
  };
  checkout_click: {
    locale: string;
    destination: string;
  };
};

function emit<K extends keyof AnalyticsEvents>(name: K, props: AnalyticsEvents[K]) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, props as Record<string, unknown>);
  }
  if (posthogReady) {
    posthog.capture(name, props as Record<string, unknown>);
  }
}

export const analytics = {
  pageView: (props: AnalyticsEvents["page_view"]) => {
    // Same call site, different event names per provider:
    // - PostHog uses '$pageview' (special — drives Web Analytics dashboards,
    //   scroll-depth heatmaps, bounce-rate calculation)
    // - GA4 uses 'page_view' (its standard event name)
    if (typeof window === "undefined") return;
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", props as Record<string, unknown>);
    }
    if (posthogReady) {
      posthog.capture("$pageview", props as Record<string, unknown>);
    }
  },
  wizardStarted: (props: AnalyticsEvents["wizard_started"]) => emit("wizard_started", props),
  scheduleCreated: (props: AnalyticsEvents["schedule_created"]) => emit("schedule_created", props),
  checkoutStarted: (props: AnalyticsEvents["checkout_started"]) => emit("checkout_started", props),
  checkoutCompleted: (props: AnalyticsEvents["checkout_completed"]) => emit("checkout_completed", props),
  accountSignup: (props: AnalyticsEvents["account_signup"]) => emit("account_signup", props),
  accountVisit: (props: AnalyticsEvents["account_visit"]) => emit("account_visit", props),
  referralShared: (props: AnalyticsEvents["referral_shared"]) => emit("referral_shared", props),
  creditUsed: (props: AnalyticsEvents["credit_used"]) => emit("credit_used", props),
  previewLockedView: (props: AnalyticsEvents["preview_locked_view"]) => emit("preview_locked_view", props),
  checkoutClick: (props: AnalyticsEvents["checkout_click"]) => emit("checkout_click", props),
};

/**
 * Legacy escape hatch for events that predate this wrapper (affiliate_click,
 * plan_draft_created). Goes through GA4+PostHog but with no schema validation.
 */
export function trackLegacy(name: string, props: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, props);
  }
  if (posthogReady) {
    posthog.capture(name, props);
  }
}
