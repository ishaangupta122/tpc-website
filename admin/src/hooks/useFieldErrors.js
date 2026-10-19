import { useCallback, useState } from "react";

// Field-level validation messages for a dialog.
//   const { errors, clear, reset, fail, show } = useFieldErrors();
//   - pass `error={errors.name}` and `id="name"` to <Field>
//   - clear("name") when the field changes
//   - fail({ name: "Enter the name." }) shows the messages on their fields,
//     scrolls to the first one and stops the save (no banner at the bottom)
//   - pass onFieldErrors={show} to <FormDialog>: errors from the server that
//     belong to a field (too large a file, an invalid value) land there too
export const useFieldErrors = () => {
  const [errors, setErrors] = useState({});

  const clear = useCallback(
    (name) => setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev)),
    []
  );
  const reset = useCallback(() => setErrors({}), []);

  // Puts messages on their fields and scrolls to the first. Only fields that are
  // on screen count; returns true when at least one message found its field.
  const show = useCallback((found) => {
    const onScreen = Object.keys(found || {}).filter(
      (key) => found[key] && document.getElementById(`field-${key}`)
    );
    if (!onScreen.length) return false;
    setErrors((prev) => ({ ...prev, ...Object.fromEntries(onScreen.map((key) => [key, found[key]])) }));
    document
      .getElementById(`field-${onScreen[0]}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    return true;
  }, []);

  const fail = useCallback((found) => {
    setErrors(found);
    const first = Object.keys(found).find((key) => found[key]);
    if (first) {
      document
        .getElementById(`field-${first}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const stop = new Error("Fix the highlighted fields.");
    stop.silent = true;
    throw stop;
  }, []);

  return { errors, clear, reset, fail, show };
};
