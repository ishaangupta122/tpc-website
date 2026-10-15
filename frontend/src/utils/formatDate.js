// "2025-02-02" -> "2 Feb 2025"; returns the input unchanged if it isn't a valid date.
export const formatDate = (value) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};
