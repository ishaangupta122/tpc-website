import HeroSection from "../../components/HeroSection";
import DocumentList from "../../components/DocumentList";

const EOA = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "EOA", href: "/eoa" },
  ];

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="Extension of Approval"
        breadcrumbs={breadcrumbs}
      />
      <div className="flex justify-center">
        <div className="site-container flex justify-start">
          <div className="w-full py-20">
            <h1 className="page-title mb-6">
              Extension of <span className="text-black">Approval</span>
            </h1>
            <DocumentList section="eoa" title="Extension of Approval Documents" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EOA;
