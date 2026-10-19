import { Calendar } from "primereact/calendar";

// "2026-10-15" <-> Date, in local time (new Date("2026-10-15") would be UTC).
const toDate = (iso) => {
  const [year, month, day] = (iso || "").split("-").map(Number);
  return year ? new Date(year, month - 1, day) : null;
};
const toIso = (date) =>
  date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : "";

// Date picker with the admin's look (see the `.p-datepicker` rules in styles/index.css).
//   value     "YYYY-MM-DD" or ""
//   onChange  (iso string, "" when cleared) => void
const DateInput = ({ value, onChange, placeholder = "Select a date", name }) => (
  <Calendar
    inputId={name}
    value={toDate(value)}
    onChange={(e) => onChange(toIso(e.value))}
    dateFormat="dd M yy"
    placeholder={placeholder}
    showIcon
    showButtonBar
    showOtherMonths={false}
    monthNavigator
    yearNavigator
    yearRange={`${new Date().getFullYear() - 60}:${new Date().getFullYear() + 5}`}
    readOnlyInput
    appendTo={document.body}
    className="w-full"
    inputClassName="w-full cursor-pointer p-2"
  />
);

export default DateInput;
