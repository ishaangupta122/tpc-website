import HeroSection from "../../components/HeroSection";
import DocumentList from "../../components/DocumentList";

const CollgeMagazines = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Magazines", href: "/magazines" },
  ];

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="College Magazines"
        breadcrumbs={breadcrumbs}
      />
      <div className="flex justify-center">
        <div className="site-container flex justify-start">
          <div className="w-full py-20">
            <h1 className="page-title mb-6">
              TPC <span className="text-black">Magazines</span>
            </h1>
            <DocumentList section="magazines" title="Magazines" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CollgeMagazines;
