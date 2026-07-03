import { apiFetch } from "./apiClient";
import type { DimensionScores } from "./pinwirlScoring";

export type PinwirlResult = {
  id: string;
  taken_at: string;
  scores: DimensionScores;
};

type RawResult = {
  id: string;
  taken_at: string;
  scores: Record<string, unknown>;
};

function jsonToScores(obj: Record<string, unknown>): DimensionScores {
  function getNum(key: string): number {
    const v = obj[key];
    return typeof v === "number" ? v : 0;
  }
  return {
    Physical: getNum("Physical"),
    Emotional: getNum("Emotional"),
    Intellectual: getNum("Intellectual"),
    Spiritual: getNum("Spiritual"),
    Social: getNum("Social"),
    Environmental: getNum("Environmental"),
    "Purpose / Vision / Mission": getNum("Purpose / Vision / Mission"),
    Financial: getNum("Financial"),
  };
}

export async function fetchPinwirlHistory(
  _userId: string,
): Promise<PinwirlResult[]> {
  const rows = await apiFetch<RawResult[]>("/pinwirl/history");
  return rows.map((row) => ({
    id: row.id,
    taken_at: row.taken_at,
    scores: jsonToScores(row.scores),
  }));
}

export const RETAKE_INTERVAL_MS = 90 * 24 * 60 * 60 * 1000;

export function isDueForRetake(history: PinwirlResult[]): boolean {
  if (history.length === 0) return false;
  return (
    Date.now() - new Date(history[0].taken_at).getTime() > RETAKE_INTERVAL_MS
  );
}
