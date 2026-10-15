import { useCallback, useRef, useState } from "react";

// Shared list state for every resource context.
//   items         the loaded list
//   loading       a (re)load is in flight
//   error         message of the last failed load, or null
//   refresh()     reload from the server
//   ensureLoaded  loads once, the first time any consumer asks for the data
export const useCrudState = (listFn) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const requested = useRef(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await listFn());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [listFn]);

  const ensureLoaded = useCallback(() => {
    if (requested.current) return;
    requested.current = true;
    refresh();
  }, [refresh]);

  return { items, loading, error, refresh, ensureLoaded };
};
