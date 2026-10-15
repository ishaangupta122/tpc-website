import HomePanel from "../../components/HomePanel";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import NoDataFound from "../../components/NoDataFound";

// Development-only gallery of every loading / error / empty state, in each
// place they appear. Open /states-preview (not registered in production).

const Section = ({ title, note, children }) => (
  <section className="mb-14">
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    {note && <p className="mb-5 mt-1 text-sm text-gray-500">{note}</p>}
    {children}
  </section>
);

const Label = ({ children }) => (
  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
    {children}
  </p>
);

const STATES = [
  { label: "Loading", render: () => <Loading title="Events" /> },
  {
    label: "Error",
    render: () => (
      <Error
        error="Cannot reach the server. Is the backend running?"
        onRetry={() => {}}
      />
    ),
  },
  { label: "No data", render: () => <NoDataFound title="Events" /> },
];

const StatesPreview = () => {
  return (
    <div className="site-container py-12">
      <h1 className="page-title mb-10">State previews</h1>

      <Section
        title="1. Page sections"
        note="Standalone, e.g. faculty list, gallery page, placements.">
        <div className="grid gap-6 md:grid-cols-3">
          {STATES.map(({ label, render }) => (
            <div key={label} className="flex flex-col">
              <Label>{label}</Label>
              <div className="flex-1">{render()}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="2. Inside a home panel"
        note="Achievements, events, success stories and notices. No card inside the card, and the state fills the panel.">
        <div className="grid gap-6 md:grid-cols-3">
          {STATES.map(({ label, render }) => (
            <div key={label} className="flex h-[420px] flex-col">
              <Label>{label}</Label>
              <div className="min-h-0 flex-1">
                <HomePanel title="Events & Updates">{render()}</HomePanel>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="3. Whole page"
        note="Route loading (Suspense) and the crash screen use the full-page layout.">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Label>Route loading</Label>
            <div className="rounded-2xl border border-dashed border-gray-300">
              <Loading title="page" fullPage />
            </div>
          </div>
          <div>
            <Label>Request failed on a page</Label>
            <div className="rounded-2xl border border-dashed border-gray-300">
              <Error onRetry={() => {}} />
            </div>
          </div>
        </div>
      </Section>

      <Section title="4. 404 page">
        <a
          href="/this-page-does-not-exist"
          className="inline-block rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Open the 404 page
        </a>
      </Section>
    </div>
  );
};

export default StatesPreview;
