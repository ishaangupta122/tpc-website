// Experience as shown on the website, e.g. "28 Years at TPC". The backend sends
// whole years since the joined date, i.e. time at this college (not total
// career experience), so a new joinee is 0: shown as "Less than 1 Year at TPC".
export const formatExperience = (years, { lower = false } = {}) => {
  if (years === null || years === undefined || years === "") return "N/A";
  const n = Number(years);
  if (Number.isNaN(n)) return "N/A";
  const unit = lower ? "year" : "Year";
  if (n < 1) return `Less than 1 ${unit} at TPC`;
  return `${n} ${n === 1 ? unit : `${unit}s`} at TPC`;
};
