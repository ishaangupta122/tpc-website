import { useState } from "react";
import { Check } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import { HostelData } from "../../data/data";

const tabs = [
  { id: "boys", label: "Boys Hostels", heading: "Boys Hostel" },
  { id: "girls", label: "Girls Hostels", heading: "Girls Hostel" },
];

const HostelPage = () => {
  const [activeTab, setActiveTab] = useState("boys");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Hostel", href: "/hostel" },
  ];

    // Left/Right arrow keys move between the tabs.
  const onTabKeyDown = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = activeTab === "boys" ? "girls" : "boys";
    setActiveTab(next);
    document.getElementById(`hostel-tab-${next}`)?.focus();
  };

  const renderItems = (items) =>
    items.map((item, index) => (
      <article
        key={index}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
        <div className="lg:col-span-5 relative rounded-lg overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[280px]">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="space-y-4 text-gray-700 leading-7">
            {item.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h4 className="mt-8 mb-3 font-semibold text-gray-900">Facilities</h4>
          <ul className="space-y-2 text-gray-700">
            {item.facilities.map((facility) => (
              <li key={facility} className="flex items-center gap-3">
                <Check
                  className="w-5 h-5 shrink-0 text-emerald-800"
                  aria-hidden="true"
                />
                {facility}
              </li>
            ))}
          </ul>

        </div>
      </article>
    ));

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="College Hostel"
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-white">
        {/* Navigation Tabs */}
        <div className="site-container pb-6 pt-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="page-title">
              Hostel <span className="text-black">Information</span>
            </h1>
          </div>

          <div
            role="tablist"
            aria-label="Hostel type"
            onKeyDown={onTabKeyDown}
            className="flex gap-2">
            {tabs.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`hostel-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls="hostel-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB714] focus-visible:ring-offset-2 ${
                    selected
                      ? "bg-gradient-to-b from-emerald-800 to-emerald-950 text-white"
                      : "text-gray-600 bg-gray-200 hover:bg-gray-300"
                  }`}>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div
          id="hostel-panel"
          role="tabpanel"
          aria-labelledby={`hostel-tab-${activeTab}`}
          className="site-container pt-4 pb-16">
          {renderItems(HostelData[activeTab])}
        </div>
      </div>
    </>
  );
};

export default HostelPage;
