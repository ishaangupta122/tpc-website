import { Plus, Trash2 } from "lucide-react";

// The building blocks every dialog uses for repeatable content (page blocks,
// table entries, policy sections, highlight cards), so they all look the same.

// A flat section of a dialog: heading (with an optional button on its right),
// optional yellow note, then the content.
export const FormSection = ({ title, note, action, children }) => (
  <section className="border-t border-gray-200 pt-5">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-base font-semibold text-emerald-900">{title}</h3>
      {action}
    </div>
    {note && (
      <p className="mt-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
        {note}
      </p>
    )}
    <div className={note ? "mt-4" : "mt-3"}>{children}</div>
  </section>
);

// One item of a repeatable list: white card, green header bar, body.
//   title    "1. Heading", "Entry 2", "Section 1"...
//   actions  buttons shown on the right of the header (e.g. <RemoveButton />)
//   error    message shown at the top of the card (the card gets a red border)
export const GroupCard = ({ id, title, actions, error, children }) => (
  <div
    id={id}
    className={`overflow-hidden rounded-lg border bg-white ${
      error ? "border-red-400 ring-1 ring-red-200" : "border-gray-300"
    }`}>
    <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-emerald-50 px-3 py-2">
      <span className="text-sm font-medium text-emerald-900">{title}</span>
      {actions && <div className="flex items-center gap-1">{actions}</div>}
    </div>
    <div className="p-4">
      {error && (
        <p role="alert" className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      {children}
    </div>
  </div>
);

export const RemoveButton = ({ onClick, label = "Remove" }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50">
    <Trash2 size={13} /> {label}
  </button>
);

// Outlined green button that adds an item to a list.
export const AddButton = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex shrink-0 items-center gap-1 rounded-md border border-emerald-800 px-3 py-1.5 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-800 hover:text-white">
    <Plus size={14} /> {children}
  </button>
);
