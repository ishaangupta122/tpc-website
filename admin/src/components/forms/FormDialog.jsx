import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

// Modal form shell: handles submit state, error display and the buttons.
//   onSubmit  async () => void; throw to keep the dialog open and show the error
//   onSuccess called after a successful submit (default: close the dialog)
const FormDialog = ({
  header,
  visible,
  onHide,
  onSubmit,
  submitLabel = "Save",
  submittingLabel = "Saving...",
  submitClassName = "p-button-success",
  children,
}) => {
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
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      header={header}
      visible={visible}
      onHide={onHide}
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "90vw" }}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {children}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            label="Cancel"
            className="p-button-danger"
            onClick={onHide}
            disabled={submitting}
          />
          <Button
            type="submit"
            label={submitting ? submittingLabel : submitLabel}
            className={submitClassName}
            disabled={submitting}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default FormDialog;
