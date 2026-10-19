const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Every date on the site is shown as "15 Oct 2026". Dates are stored in that
// format; older records may still hold "2026-10-15", which is converted here.
// Anything else is returned unchanged.
export const formatDate = (value) => {
  const text = String(value ?? "").trim();
  if (/^\d{1,2} [A-Za-z]{3} \d{4}$/.test(text)) return text;
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(text);
  if (iso && Number(iso[2]) >= 1 && Number(iso[2]) <= 12)
    return `${Number(iso[3])} ${MONTHS[Number(iso[2]) - 1]} ${iso[1]}`;
  return value;
};
