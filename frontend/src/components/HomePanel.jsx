import { PanelContext } from "./PanelContext";

// Shared panel used side by side on the home page ("College Achievements" and
// "Notices & Circulars") so both always share the same look: surface, padding,
// heading and divider.
// The title is shown uppercase in two colours: the last word in black, the
// rest in green (e.g. "Events &" + "Updates").
const HomePanel = ({ title, actions = null, className = "", children }) => {
  const cut = title.lastIndexOf(" ");
  const first = cut === -1 ? "" : title.slice(0, cut);
  const last = cut === -1 ? title : title.slice(cut + 1);
  return (
  <div
    className={`flex flex-col h-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-8 md:px-8 ${className}`}>
    <div className="flex h-12 shrink-0 items-center justify-between gap-3 mb-6 border-b border-gray-200 box-content pb-4">
      <h2 className="section-title after:hidden">
        {first && <span className="text-emerald-900">{first} </span>}
        <span className="text-black">{last}</span>
      </h2>
      {actions}
    </div>
    <div className="flex min-h-0 flex-1 flex-col">
      <PanelContext.Provider value={true}>{children}</PanelContext.Provider>
    </div>
  </div>
  );
};

export default HomePanel;
