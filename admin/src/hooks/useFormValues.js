import { useCallback, useEffect, useState } from "react";

// Controlled-form state for a dialog.
//   isOpen   values are re-initialised every time the dialog opens
//   item     record being edited, or null when adding
//   toValues (item | null) => initial values (module-level, so it is stable)
// Returns { values, setValue, handleChange }.
export const useFormValues = (isOpen, item, toValues) => {
  const [values, setValues] = useState(() => toValues(item));

  useEffect(() => {
    if (isOpen) setValues(toValues(item));
  }, [isOpen, item, toValues]);

  const setValue = useCallback(
    (name, value) => setValues((prev) => ({ ...prev, [name]: value })),
    []
  );

  const handleChange = useCallback(
    (event) => setValue(event.target.name, event.target.value),
    [setValue]
  );

  return { values, setValue, handleChange };
};
