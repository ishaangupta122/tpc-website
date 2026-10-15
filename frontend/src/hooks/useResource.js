import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { useDataStore } from "../context/DataContext";

// Generic data hook: reads one cache entry and makes sure it is loaded.
//
//   key      unique, includes every parameter/id the fetcher depends on
//   fetcher  () => Promise<data>
//   enabled  false skips the request (e.g. while an id is missing)
//
// Returns { data, loading, refreshing, error, refresh }:
//   loading     first load in progress (no data yet)
//   refreshing  re-validating data that is already on screen
//   error       message when the first load failed (never an empty list)
export const useResource = (key, fetcher, enabled = true) => {
  const store = useDataStore();

  const entry = useSyncExternalStore(
    store.subscribe,
    () => (enabled ? store.get(key) : undefined)
  );

  // The latest fetcher without making it an effect dependency (callers pass a
  // new arrow function every render).
  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  // Runs on mount and when the key changes. The store de-duplicates, so this is
  // also safe under React StrictMode's double-invoked effects, and it skips the
  // request while the cached data is still fresh.
  useEffect(() => {
    if (!enabled) return;
    store.load(key, () => fetcherRef.current());
  }, [store, key, enabled]);

  const refresh = useCallback(
    () => store.load(key, () => fetcherRef.current(), { force: true }),
    [store, key]
  );

  const status = entry?.status;
  return {
    data: entry?.data,
    loading: enabled && (status === undefined || status === "loading"),
    refreshing: status === "revalidating",
    error: entry?.error || null,
    refresh,
  };
};
