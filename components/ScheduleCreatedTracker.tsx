"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { analytics } from "../lib/analytics";

interface ScheduleCreatedTrackerProps {
  planId: string;
  destination: string;
  travelerType?: string;
  days?: number;
}

/**
 * Fires `schedule_created` once per plan when the user reaches the completed
 * plan preview (③ 미리보기). localStorage dedup prevents re-fires on revisit.
 */
export default function ScheduleCreatedTracker({
  planId,
  destination,
  travelerType,
  days,
}: ScheduleCreatedTrackerProps) {
  const locale = useLocale();

  useEffect(() => {
    const storageKey = `gliddy:schedule-created:${planId}`;
    if (typeof window === "undefined") return;
    if (window.localStorage?.getItem(storageKey)) return;

    analytics.scheduleCreated({
      locale,
      plan_id: planId,
      destination,
      traveler_type: travelerType,
      days,
    });
    try {
      window.localStorage.setItem(storageKey, new Date().toISOString());
    } catch {
      // localStorage may be disabled (private mode); event still fired.
    }
  }, [planId, destination, travelerType, days, locale]);

  return null;
}
