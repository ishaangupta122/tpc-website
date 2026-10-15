import HeroSection from "../../components/HeroSection";
import DocumentList from "../../components/DocumentList";

const MentorsList = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Mentors-List", href: "/mentors-list" },
  ];

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="Mentors List"
        breadcrumbs={breadcrumbs}
      />
      <div className="flex justify-center">
        <div className="site-container flex justify-start">
          <div className="w-full py-20">
            <h1 className="page-title mb-6">
              Mentors <span className="text-black">List</span>
            </h1>
            <DocumentList section="mentors-list" title="Mentors Lists" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorsList;
