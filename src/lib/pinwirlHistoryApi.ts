import { supabase } from "./supabase";
import type { DimensionScores } from "./pinwirlScoring";

export type PinwirlResult = {
  id: string;
  taken_at: string;
  scores: DimensionScores;
};

export async function fetchPinwirlHistory(userId: string): Promise<PinwirlResult[]> {
  const { data, error } = await supabase
    .from("pinwirl_results")
    .select("id, taken_at, scores")
    .eq("user_id", userId)
    .order("taken_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    id: row.id,
    taken_at: row.taken_at,
    scores: row.scores as DimensionScores,
  }));
}

export const RETAKE_INTERVAL_MS = 90 * 24 * 60 * 60 * 1000;

export function isDueForRetake(history: PinwirlResult[]): boolean {
  if (history.length === 0) return false;
  return Date.now() - new Date(history[0].taken_at).getTime() > RETAKE_INTERVAL_MS;
}
