import { useCallback } from "react";
import { confirmDialog } from "primereact/confirmdialog";
import { AlertCircle } from "lucide-react";
import { useNotify } from "../context/NotificationContext";

// const confirmDelete = useConfirmDelete();
// confirmDelete({ message, onConfirm, successMessage })
// Asks first, then runs onConfirm and reports the result as a toast.
// Needs the <ConfirmDialog /> mounted once in the layout.
export const useConfirmDelete = () => {
  const notify = useNotify();

  return useCallback(
    ({ message, onConfirm, successMessage = "Deleted successfully." }) =>
      confirmDialog({
        message,
        header: "Confirm Deletion",
        icon: <AlertCircle size={30} />,
        acceptClassName: "p-button-danger",
        rejectClassName: "p-button-secondary",
        accept: async () => {
          try {
            await onConfirm();
            notify.success(successMessage);
          } catch (error) {
            notify.error(error.message, "Delete failed");
          }
        },
      }),
    [notify]
  );
};
