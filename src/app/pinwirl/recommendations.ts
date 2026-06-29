import { supabase } from "../../lib/supabase";
import type { DimensionKey, ScoreBand } from "../../lib/pinwirlScoring";

export type RecommendationsMap = Record<DimensionKey, Record<ScoreBand, string>>;

export async function fetchRecommendations(): Promise<RecommendationsMap> {
  const { data, error } = await supabase
    .from("pinwirl_recommendations")
    .select("dimension, band, body")
    .order("sort_order");

  if (error) throw new Error(error.message);

  const map = {} as RecommendationsMap;
  for (const row of data ?? []) {
    const dim = row.dimension as DimensionKey;
    if (!map[dim]) map[dim] = {} as Record<ScoreBand, string>;
    map[dim][row.band as ScoreBand] = row.body;
  }
  return map;
}
