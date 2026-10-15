// "3 years" / "1 year" / "N/A" for the backend's auto-calculated experience.
export const formatYears = (years, fallback = "N/A") => {
  if (years === null || years === undefined) return fallback;
  return `${years} ${years === 1 ? "year" : "years"}`;
};
