import { useCallback, useState } from "react";

// Open/close state for a feature page's add, edit and view dialogs.
//   formOpen / formItem   the add-or-edit dialog (formItem is null when adding)
//   viewOpen / viewItem   the read-only dialog
// The last item is kept after closing so dialogs don't blank out mid-animation.
export const useDialogs = () => {
  const [state, setState] = useState({ mode: null, item: null });

  const openAdd = useCallback(() => setState({ mode: "add", item: null }), []);
  const openEdit = useCallback((item) => setState({ mode: "edit", item }), []);
  const openView = useCallback((item) => setState({ mode: "view", item }), []);
  const close = useCallback(
    () => setState((prev) => ({ ...prev, mode: null })),
    []
  );

  return {
    formOpen: state.mode === "add" || state.mode === "edit",
    formItem: state.mode === "add" ? null : state.item,
    viewOpen: state.mode === "view",
    viewItem: state.item,
    openAdd,
    openEdit,
    openView,
    close,
  };
};
