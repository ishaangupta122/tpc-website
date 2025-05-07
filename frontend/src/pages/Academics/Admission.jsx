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

  const renderContent = (content) => {
    if (!content) return null;

    return (
      <div className="space-y-4 text-gray-700">
        {content.heading && (
          <h3 className="font-semibold">{content.heading}</h3>
        )}

        {content.sections ? (
          <div className="space-y-4">
            {content.sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-2">{section.subheading}</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {content.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      <HeroSection
        imageUrl="./rec_gate.jpg"
        title="College Policies"
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen bg-gray-50 py-20 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl text-center font-semibold mb-4 uppercase text-emerald-900">
              College <span className="text-black">Guidlines & Policies</span>
            </h1>
            <div className="w-28 h-1 bg-[#FDB714] rounded-full mx-auto"></div>
          </div>

          {policies.map((policy) => {
            const content = policyContent.find((p) => p.id === policy.id);

            return (
              <div key={policy.id} className="mb-4 border rounded-lg shadow-sm">
                <button
                  className={`w-full px-6 py-4 text-left flex justify-between items-center ${
                    openSections[policy.id]
                      ? "bg-gradient-to-b from-emerald-800 to-emerald-950"
                      : "bg-white"
                  } hover:bg-green-100 transition-colors rounded-t-lg`}
                  onClick={() => toggleSection(policy.id)}>
                  <h2
                    className={`text-xl font-semibold ${
                      openSections[policy.id]
                        ? "text-white"
                        : "text-emerald-900"
                    }`}>
                    {policy.title}
                  </h2>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${
                      openSections[policy.id]
                        ? "text-white rotate-180"
                        : "text-emerald-900"
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
                {openSections[policy.id] && (
                  <div className="px-6 py-4 bg-white rounded-b-lg">
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
