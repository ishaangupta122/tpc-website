import StatePanel from "./StatePanel";

// Ring spinner in the brand colours (emerald with a gold accent).
const Spinner = () => (
  <span className="relative inline-flex h-11 w-11" aria-hidden="true">
    <span className="absolute inset-0 rounded-full border-[3px] border-emerald-900/10" />
    <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-r-[#fdb714] border-t-emerald-800" />
  </span>
);

// <Loading title="Events" /> -> "Loading events". `fullPage` is for whole routes.
const Loading = ({ title = "content", fullPage = false }) => (
  <StatePanel
    fullPage={fullPage}
    icon={<Spinner />}
    title={`Loading ${title.toLowerCase()}`}
    message="Please wait a moment."
  />
);

export default Loading;
