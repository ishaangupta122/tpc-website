import { departments } from "../data/departments";

// Dropdown options built from the records the API returned, so the list always
// matches the data. Sorted by label; `labelOf` turns a stored value into text.
export const optionsFrom = (records, pick, labelOf = (value) => value) => {
  const values = [...new Set(records.map(pick).map((v) => (v || "").trim()).filter(Boolean))];
  return values
    .map((value) => ({ value, label: labelOf(value) }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

// A filter value from the URL is only used when it is one of the options
// (a stale or mistyped link shows everything instead of an empty page).
export const validOption = (value, options) =>
  options.some((option) => option.value === value) ? value : "";

// Faculty stores a short department value ("CSE"); show the full name when we know it.
export const departmentLabel = (value) =>
  Object.values(departments).find((dept) => dept.category === value)?.name || value;
