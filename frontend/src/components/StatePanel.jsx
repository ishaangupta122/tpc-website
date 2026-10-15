import { useContext } from "react";
import { PanelContext } from "./PanelContext";

// Shared layout for every loading / error / empty state, so they all share one
// look: a centred icon, a title, a short message and an optional action.
//   fullPage  fills the screen area (route loading, crashes)
//   otherwise a soft card for page sections, or, inside a HomePanel (see
//   PanelContext), a borderless block that fills the panel
const StatePanel = ({
  icon,
  title,
  message,
  action,
  fullPage = false,
  role = "status",
}) => {
  const inPanel = useContext(PanelContext);
  const layout = fullPage
    ? "min-h-[60vh] px-4 py-16"
    : inPanel
      ? "flex-1 min-h-[220px] px-4 py-8"
      : "h-full min-h-[240px] rounded-2xl border border-gray-200 bg-gray-50/70 px-6 py-10";

  return (
  <div role={role} className={`flex w-full items-center justify-center ${layout}`}>
    <div className="flex max-w-md flex-col items-center text-center">
      {icon}
      <h3 className="mt-5 text-base font-semibold text-gray-900">{title}</h3>
      {message && (
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{message}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  </div>
  );
};

// Round icon badge used by the error and empty states.
export const IconBadge = ({ children, tone = "neutral" }) => {
  const tones = {
    neutral: "bg-white text-gray-500 ring-gray-200",
    danger: "bg-rose-50 text-rose-600 ring-rose-100",
  };
  return (
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-full ring-1 ${tones[tone]}`}>
      {children}
    </span>
  );
};

export default StatePanel;
