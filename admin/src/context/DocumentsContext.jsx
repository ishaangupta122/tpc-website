import { useCallback, useMemo } from "react";
import { documentsApi } from "../api";
import { createResourceContext } from "./createResourceContext";
import { useCrudState } from "./useCrudState";

// Documents from every section in one list (each item carries its `section`).
// The hook returns: { items, loading, error, refresh, create, update, remove }
export const { Provider: DocumentsProvider, useResource: useDocuments } =
  createResourceContext("Documents", () => {
    const { items, loading, error, refresh, ensureLoaded } = useCrudState(
      documentsApi.list
    );

    const create = useCallback(
      async ({ section, title }, file) => {
        await documentsApi.create(section, { title }, file);
        await refresh();
      },
      [refresh]
    );

    // A document keeps its section: its file lives in that section's folder.
    const update = useCallback(
      async (document, { title }, file) => {
        await documentsApi.update(document.section, document._id, { title }, file);
        await refresh();
      },
      [refresh]
    );

    const remove = useCallback(
      async (document) => {
        await documentsApi.remove(document.section, document._id);
        await refresh();
      },
      [refresh]
    );

    return useMemo(
      () => ({ items, loading, error, refresh, ensureLoaded, create, update, remove }),
      [items, loading, error, refresh, ensureLoaded, create, update, remove]
    );
  });
