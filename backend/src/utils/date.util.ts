const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;
const DISPLAY = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/;

/**
 * The format dates are stored in: "15 Oct 2026". The admin's date picker sends
 * "2026-10-15"; that is converted here. Anything else is returned unchanged.
 */
export const toDisplayDate = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  const text = value.trim();
  const iso = ISO.exec(text);
  if (!iso) return text;
  const month = Number(iso[2]);
  if (month < 1 || month > 12) return text;
  return `${Number(iso[3])} ${MONTHS[month - 1]} ${iso[1]}`;
};

/** "15 Oct 2026" (or an ISO date) -> "2026-10-15", for sorting and date pickers. */
export const toIsoDate = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  const text = value.trim();
  if (ISO.test(text)) return text;
  const match = DISPLAY.exec(text);
  if (!match) return '';
  const month = MONTHS.findIndex(
    (m) => m.toLowerCase() === match[2].toLowerCase(),
  );
  if (month < 0) return '';
  return `${match[3]}-${String(month + 1).padStart(2, '0')}-${match[1].padStart(2, '0')}`;
};
