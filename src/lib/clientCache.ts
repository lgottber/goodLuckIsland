// In-memory cache for public CMS content fetches (articles, episodes,
// videos, playlists) so navigating between pages that read the same
// data (e.g. /articles and /search) doesn't refetch it every time.
// Scoped to a single page session -- a full reload clears it, and it's
// not meant to reflect CMS edits made while the tab stays open.
//
// One cache instance per content shape (rather than one shared map keyed
// by string) so lookups stay soundly typed without a type assertion or
// `any` -- `T` is resolved once, at createCachedFetcher<T>() call time,
// not per lookup.
export function createCachedFetcher<T>() {
  const cache = new Map<string, Promise<T>>();

  return function cached(key: string, fetcher: () => Promise<T>): Promise<T> {
    const existing = cache.get(key);
    if (existing) return existing;

    const promise = fetcher().catch((err) => {
      cache.delete(key);
      throw err;
    });
    cache.set(key, promise);
    return promise;
  };
}
