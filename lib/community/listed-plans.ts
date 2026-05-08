import { getSupabaseAdmin, PLANS_TABLE } from "../supabase";

/**
 * Phase 1 community-gallery query helper.
 *
 * Returns the IDs + last-update timestamps of all paid plans where
 * the buyer opted into the public gallery (Phase 0 toggle, see
 * docs/COMMUNITY-SHARING-PLAN.md).
 *
 * Used by:
 *   - app/sitemap.ts to enumerate /community/[id] URLs for indexing
 *     once the gallery ships
 *   - app/community/page.tsx (Phase 1) to render the listing
 *
 * Schema dependency: migration 0007 added the public_listed column.
 * Status filter is 'complete' so we never expose a plan that's still
 * generating or failed.
 *
 * Bounded at 5000 rows for safety. Sitemap.xml protocol caps at 50k
 * URLs per file; if we ever cross 5k publicly-listed plans we should
 * paginate the sitemap and re-evaluate this cap.
 */
export interface ListedPlanSummary {
  id: string;
  destination: string;
  durationDays: number;
  updatedAt: string;
}

export async function listPublicPlans(): Promise<ListedPlanSummary[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(PLANS_TABLE)
    .select("id, plan, updated_at")
    .eq("public_listed", true)
    .eq("status", "complete")
    .order("updated_at", { ascending: false })
    .limit(5000);

  if (error) {
    console.warn("[community] listPublicPlans failed", error.message);
    return [];
  }

  return (data ?? [])
    .filter((row) => row.plan && typeof row.plan === "object")
    .map((row) => {
      const plan = row.plan as { destination?: string; durationDays?: number };
      return {
        id: row.id as string,
        destination: plan.destination ?? "",
        durationDays: plan.durationDays ?? 0,
        updatedAt: row.updated_at as string,
      };
    });
}
