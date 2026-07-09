export type SearchSortOption =
  | "relevance"
  | "date-desc"
  | "date-asc"
  | "score-desc"
  | "score-asc"
  | "title-asc"
  | "title-desc";

export const SEARCH_SORT_OPTIONS: { value: SearchSortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "date-desc", label: "Newest first" },
  { value: "date-asc", label: "Oldest first" },
  { value: "score-desc", label: "Most popular" },
  { value: "score-asc", label: "Least popular" },
  { value: "title-asc", label: "Title (A–Z)" },
  { value: "title-desc", label: "Title (Z–A)" },
];

export function isSearchSortOption(value: string): value is SearchSortOption {
  return SEARCH_SORT_OPTIONS.some((option) => option.value === value);
}

type Sortable = { title: string; date: string | null; score: number };

export function sortSearchResults<T extends Sortable>(items: T[], sortBy: SearchSortOption): T[] {
  if (sortBy === "relevance") return items;

  const dateValue = (item: T) => (item.date ? new Date(item.date).getTime() : 0);

  const comparators: Record<Exclude<SearchSortOption, "relevance">, (a: T, b: T) => number> = {
    "date-desc": (a, b) => dateValue(b) - dateValue(a),
    "date-asc": (a, b) => dateValue(a) - dateValue(b),
    "score-desc": (a, b) => b.score - a.score,
    "score-asc": (a, b) => a.score - b.score,
    "title-asc": (a, b) => a.title.localeCompare(b.title),
    "title-desc": (a, b) => b.title.localeCompare(a.title),
  };

  return [...items].sort(comparators[sortBy]);
}
