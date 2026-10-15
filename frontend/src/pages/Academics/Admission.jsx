import { useState } from "react";
import HeroSection from "../../components/HeroSection";
import { policyContent } from "../../data/data";

const CollegePoliciesPage = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "College Policies", href: "/admission" },
  ];

  const policies = policyContent.map((policy) => ({
    id: policy.id,
    title:
      policy.heading
        .replace("Requirements", "Policy")
        .replace("Rules", "Policy") || "Policy",
  }));

  const [openSections, setOpenSections] = useState({
    scholarship: true,
  });

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const allOpen = policies.every((policy) => openSections[policy.id]);
  const toggleAll = () =>
    setOpenSections(
      Object.fromEntries(policies.map((policy) => [policy.id, !allOpen]))
    );

  const pointList = (points) => (
    <ul className="list-disc pl-5 space-y-2 marker:text-emerald-800">
      {points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  );

  const renderContent = (content) => {
    if (!content) return null;

    return (
      <div className="space-y-5 text-gray-700 leading-7">
        {content.sections
          ? content.sections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {section.subheading}
                </h3>
                {pointList(section.points)}
              </div>
            ))
          : pointList(content.points)}
      </div>
    );
  };

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

          <div className="flex justify-end mb-3">
            <button
              type="button"
              onClick={toggleAll}
              className="text-sm font-medium text-emerald-900 hover:underline focus-visible:underline focus-visible:outline-none">
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          </div>

          {policies.map((policy) => {
            const content = policyContent.find((p) => p.id === policy.id);
            const open = !!openSections[policy.id];

            return (
              <div
                key={policy.id}
                className="mb-4 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <button
                  type="button"
                  id={`policy-btn-${policy.id}`}
                  aria-expanded={open}
                  aria-controls={`policy-panel-${policy.id}`}
                  className={`w-full px-6 py-4 text-left flex justify-between items-center gap-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FDB714] ${
                    open
                      ? "bg-gradient-to-b from-emerald-800 to-emerald-950"
                      : "bg-white hover:bg-green-100"
                  }`}
                  onClick={() => toggleSection(policy.id)}>
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
                    id={`policy-panel-${policy.id}`}
                    role="region"
                    aria-labelledby={`policy-btn-${policy.id}`}
                    className="px-6 py-5 bg-white">
                    {renderContent(content)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CollegePoliciesPage;
