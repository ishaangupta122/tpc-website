import { useEffect, useId, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { DIALOG_WIDTH } from "./dialogWidth";

// Modal form shell: handles submit state, error display and the buttons.
//   entity    "Course" -> "Add New Course" / "Update Course" (title and button),
//             "Adding..." / "Updating..." while saving; every dialog reads the same
//   isEdit    true when editing an existing item
//   header, submitLabel, submittingLabel, submitClassName override those defaults
//   onSubmit  async () => void; throw to keep the dialog open and show the error
//   onFieldErrors  (fields) => boolean, from useFieldErrors().show
//   onSuccess called after a successful submit (default: close the dialog)
const FormDialog = ({
  entity,
  isEdit = false,
  header = isEdit ? `Update ${entity}` : `Add New ${entity}`,
  visible,
  onHide,
  onSubmit,
  onFieldErrors,
  submitLabel = isEdit ? `Update ${entity}` : `Add ${entity}`,
  submittingLabel = isEdit ? "Updating..." : "Adding...",
  submitClassName = isEdit ? "p-button-warning" : "p-button-success",
  width = DIALOG_WIDTH,
  children,
}) => {
  const formId = useId();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (visible) setError("");
  }, [visible]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await onSubmit();
      onHide();
    } catch (err) {
      // `silent`: the problem is already shown next to the field, so no banner.
      // Server errors that belong to a field are shown on that field; only the
      // ones that belong nowhere (network down, signed out) are shown here.
      const onField = err.fields && onFieldErrors?.(err.fields);
      if (!err.silent && !onField) setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const footer = (
    <div className="flex justify-end gap-3 pt-1">
      <Button
        type="button"
        label="Cancel"
        outlined
        severity="secondary"
        onClick={onHide}
        disabled={submitting}
      />
      <Button
        type="submit"
        form={formId}
        label={submitting ? submittingLabel : submitLabel}
        className={submitClassName}
        disabled={submitting}
      />
    </div>
  );

  return (
    <Dialog
      header={header}
      visible={visible}
      onHide={onHide}
      footer={footer}
      draggable={false}
      style={{ width, maxWidth: "96vw" }}
      breakpoints={{ "960px": "94vw" }}>
      <form id={formId} className="space-y-5" onSubmit={handleSubmit}>
        {children}
        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
      </form>
    </Dialog>
  );
};

export default FormDialog;
