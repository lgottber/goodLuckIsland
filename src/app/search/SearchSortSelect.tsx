import { SEARCH_SORT_OPTIONS, isSearchSortOption } from "./searchSort";
import type { SearchSortOption } from "./searchSort";

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
        {SEARCH_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
