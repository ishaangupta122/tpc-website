// True when any of the given fields of `item` contains `query` (case-insensitive).
export const matchesSearch = (item, fields, query) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return fields.some((field) =>
    String(item[field] ?? "").toLowerCase().includes(needle)
  );
};
