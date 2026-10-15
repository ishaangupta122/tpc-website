import { useCallback, useMemo } from "react";
import { createResourceContext } from "./createResourceContext";
import { useCrudState } from "./useCrudState";

// Provider + hook for a standard CRUD resource. The hook returns:
//   { items, loading, error, refresh, create, update, remove }
// Mutations reload the list on success and throw an Error (with a readable
// message) on failure, so callers decide how to report it.
export const createCrudContext = (name, api) =>
  createResourceContext(name, () => {
    const { items, loading, error, refresh, ensureLoaded } = useCrudState(
      api.list
    );

    const create = useCallback(
      async (data, file) => {
        const result = await api.create(data, file);
        await refresh();
        return result;
      },
      [refresh]
    );

    const update = useCallback(
      async (id, data, file) => {
        const result = await api.update(id, data, file);
        await refresh();
        return result;
      },
      [refresh]
    );

    const remove = useCallback(
      async (id) => {
        await api.remove(id);
        await refresh();
      },
      [refresh]
    );

    return useMemo(
      () => ({
        items,
        loading,
        error,
        refresh,
        ensureLoaded,
        create,
        update,
        remove,
      }),
      [items, loading, error, refresh, ensureLoaded, create, update, remove]
    );
  });
