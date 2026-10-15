// In-memory cache for API resources. Framework-agnostic and subscribable so
// React can read it with useSyncExternalStore.
//
// Rules:
//  * One entry per cache key (e.g. "faculty", "events:42"); parameters and ids
//    are part of the key, so different ids never share an entry.
//  * Concurrent loads of the same key share one network request.
//  * A successful entry is fresh for `staleTime`; after that the next load
//    revalidates in the background while the old data stays on screen.
//  * Every request gets a sequence id; only the newest request for a key may
//    write its result, so an older/slower response can never overwrite a newer
//    one (e.g. after refresh()).
//  * Failures are never stored as data. A first-load failure is kept as an
//    error entry so the UI can show it, and is retried on the next load.
//    A failed background revalidation keeps the previous good data.

export const DEFAULT_STALE_TIME = 5 * 60 * 1000; // 5 minutes

export const createDataStore = ({ staleTime = DEFAULT_STALE_TIME } = {}) => {
  const entries = new Map(); // key -> immutable entry object
  const pending = new Map(); // key -> { id, promise }
  const listeners = new Set();
  let sequence = 0;

  const emit = () => listeners.forEach((listener) => listener());

  const set = (key, entry) => {
    entries.set(key, entry);
    emit();
  };

  const isFresh = (entry) =>
    entry?.status === "success" && Date.now() - entry.updatedAt < staleTime;

  const load = (key, fetcher, { force = false } = {}) => {
    const current = entries.get(key);
    const inFlight = pending.get(key);

    if (!force) {
      if (inFlight) return inFlight.promise;
      if (isFresh(current)) return Promise.resolve(current.data);
    }

    const id = ++sequence;
    const hasData = current?.data !== undefined;

    // Keep showing existing data while it is refreshed.
    set(key, {
      status: hasData ? "revalidating" : "loading",
      data: current?.data,
      error: null,
      updatedAt: current?.updatedAt,
    });

    const isLatest = () => pending.get(key)?.id === id;

    const promise = Promise.resolve()
      .then(fetcher)
      .then(
        (data) => {
          if (!isLatest()) return data;
          set(key, { status: "success", data, error: null, updatedAt: Date.now() });
          return data;
        },
        (err) => {
          if (!isLatest()) return undefined;
          if (hasData) {
            // Background refresh failed: keep the last good data (it stays
            // stale, so the next load tries again).
            set(key, {
              status: "success",
              data: current.data,
              error: null,
              updatedAt: current.updatedAt,
            });
          } else {
            set(key, {
              status: "error",
              data: undefined,
              error: err?.message || "Request failed",
              updatedAt: undefined,
            });
          }
          return undefined;
        }
      )
      .finally(() => {
        if (isLatest()) pending.delete(key);
      });

    pending.set(key, { id, promise });
    return promise;
  };

  return {
    get: (key) => entries.get(key),
    load,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};
