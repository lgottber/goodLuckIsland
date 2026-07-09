export type SearchSortOption = "relevance" | "popular";

function isSearchSortOption(value: string): value is SearchSortOption {
  return value === "relevance" || value === "popular";
}

export default function SearchSortSelect({
  sortBy,
  onSortChange,
}: {
  sortBy: SearchSortOption;
  onSortChange: (sortBy: SearchSortOption) => void;
}) {
  return (
    <label className="search-sort">
      Sort by
      <select
        className="search-sort-select"
        value={sortBy}
        onChange={(e) => {
          if (isSearchSortOption(e.target.value)) onSortChange(e.target.value);
        }}
      >
        <option value="relevance">Relevance</option>
        <option value="popular">Most Popular</option>
      </select>
    </label>
  );
}
