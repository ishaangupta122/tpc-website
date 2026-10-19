// Dates are stored as "15 Oct 2026". Older records may still hold "2026-10-15";
// show those in the same format.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const formatDisplayDate = (value) => {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!iso || Number(iso[2]) < 1 || Number(iso[2]) > 12) return value || "";
  return `${Number(iso[3])} ${MONTHS[Number(iso[2]) - 1]} ${iso[1]}`;
};

// "3 years at TPC" / "Less than 1 year at TPC" / "N/A" for the backend's
// auto-calculated experience (whole years since joining, so a new joinee is 0).
export const formatYears = (years, fallback = "N/A") => {
  if (years === null || years === undefined) return fallback;
  if (years < 1) return "Less than 1 year at TPC";
  return `${years} ${years === 1 ? "year" : "years"} at TPC`;
};
