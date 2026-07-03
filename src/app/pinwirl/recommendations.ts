import { apiFetch } from "../../lib/apiClient";
import { DIMENSIONS } from "../../lib/pinwirlScoring";
import type { DimensionKey, ScoreBand } from "../../lib/pinwirlScoring";

export type RecommendationsMap = Record<
  DimensionKey,
  Record<ScoreBand, string>
>;

const DIMENSION_SET = new Set<string>(DIMENSIONS);
const BAND_SET = new Set<string>([
  "Needs Attention",
  "Developing",
  "Building Strength",
  "Strong",
]);

function isDimensionKey(s: string): s is DimensionKey {
  return DIMENSION_SET.has(s);
}

function isScoreBand(s: string): s is ScoreBand {
  return BAND_SET.has(s);
}

function emptyBands(): Record<ScoreBand, string> {
  return {
    "Needs Attention": "",
    Developing: "",
    "Building Strength": "",
    Strong: "",
  };
}

export async function fetchRecommendations(): Promise<RecommendationsMap> {
  const data = await apiFetch<
    { dimension: string; band: string; body: string }[]
  >("/pinwirl/recommendations");

  const map: RecommendationsMap = {
    Physical: emptyBands(),
    Emotional: emptyBands(),
    Intellectual: emptyBands(),
    Spiritual: emptyBands(),
    Social: emptyBands(),
    Environmental: emptyBands(),
    "Purpose / Vision / Mission": emptyBands(),
    Financial: emptyBands(),
  };

  for (const row of data ?? []) {
    if (isDimensionKey(row.dimension) && isScoreBand(row.band)) {
      map[row.dimension][row.band] = row.body;
    }
  }
  return map;
}
