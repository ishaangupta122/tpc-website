import { useState } from "react";
import HeroSection from "../../components/HeroSection";
import { usePolicies } from "../../hooks/useResources";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const CollegePoliciesPage = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "College Policies", href: "/admission" },
  ];

  const { data: policies, loading, error, refresh } = usePolicies();

  // null until the visitor toggles something: then only the first card is open.
  const [openSections, setOpenSections] = useState(null);
  const isOpen = (id) =>
    openSections ? !!openSections[id] : id === policies[0]?._id;

  const toggleSection = (id) =>
    setOpenSections((prev) => {
      const current = prev || { [policies[0]?._id]: true };
      return { ...current, [id]: !current[id] };
    });

  const allOpen = policies.every((policy) => isOpen(policy._id));
  const toggleAll = () =>
    setOpenSections(
      Object.fromEntries(policies.map((policy) => [policy._id, !allOpen]))
    );

  const pointList = (points) => (
    <ul className="list-disc pl-5 space-y-2 marker:text-emerald-800">
      {points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  );

  const renderContent = (policy) => (
    <div className="space-y-5 text-gray-700 leading-7">
      {(policy.points || []).length > 0 && (
        <div>
          {policy.pointsHeading && (
            <h3 className="font-semibold text-gray-900 mb-2">{policy.pointsHeading}</h3>
          )}
          {pointList(policy.points)}
        </div>
      )}
      {(policy.groups || []).map((group, index) => (
        <div key={index}>
          {group.subheading && (
            <h3 className="font-semibold text-gray-900 mb-2">{group.subheading}</h3>
          )}
          {pointList(group.points || [])}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="College Policies"
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-white py-14 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="page-title text-center">
              College <span className="text-black">Guidelines & Policies</span>
            </h1>
          </div>

          {error ? (
            <Error error={error} onRetry={refresh} />
          ) : loading ? (
            <Loading title="Policies" />
          ) : (
            <>
              <div className="flex justify-end mb-3">
                <button
                  type="button"
                  onClick={toggleAll}
                  className="text-sm font-medium text-emerald-900 hover:underline focus-visible:underline focus-visible:outline-none">
                  {allOpen ? "Collapse all" : "Expand all"}
                </button>
              </div>

              {policies.map((policy) => {
                const id = policy._id;
                const open = isOpen(id);

                return (
                  <div
                    key={id}
                    className="mb-4 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <button
                      type="button"
                      id={`policy-btn-${id}`}
                      aria-expanded={open}
                      aria-controls={`policy-panel-${id}`}
                      className={`w-full px-6 py-4 text-left flex justify-between items-center gap-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FDB714] ${
                        open
                          ? "bg-gradient-to-b from-emerald-800 to-emerald-950"
                          : "bg-white hover:bg-green-100"
                      }`}
                      onClick={() => toggleSection(id)}>
                      <h2
                        className={`text-lg md:text-xl font-semibold ${
                          open ? "text-white" : "text-emerald-900"
                        }`}>
                        {policy.title}
                      </h2>
                      <svg
                        aria-hidden="true"
                        className={`w-6 h-6 shrink-0 transform transition-transform ${
                          open ? "text-white rotate-180" : "text-emerald-900"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {open && (
                      <div
                        id={`policy-panel-${id}`}
                        role="region"
                        aria-labelledby={`policy-btn-${id}`}
                        className="px-6 py-5 bg-white">
                        {renderContent(policy)}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CollegePoliciesPage;
