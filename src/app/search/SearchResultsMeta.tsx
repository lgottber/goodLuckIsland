import SearchSortSelect from "./SearchSortSelect";
import type { SearchSortOption } from "./searchSort";

export type { SearchSortOption };

export default function SearchResultsMeta({
  totalResults,
  query,
  sortBy,
  onSortChange,
}: {
  totalResults: number;
  query: string;
  sortBy: SearchSortOption;
  onSortChange: (sortBy: SearchSortOption) => void;
}) {
  return (
    <div className="search-count-row">
      <p className="search-count">
        {totalResults} result{totalResults !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
      </p>
      {totalResults > 0 && <SearchSortSelect sortBy={sortBy} onSortChange={onSortChange} />}
    </div>
  );
}
