import HeroSection from "../../components/HeroSection";
import DocumentList from "../../components/DocumentList";

const TPCNewsletter = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "TPC-Newletter", href: "/tpc-newsletter" },
  ];

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="TPC Newsletter"
        breadcrumbs={breadcrumbs}
      />
      <div className="flex justify-center">
        <div className="site-container flex justify-start">
          <div className="w-full py-20">
            <h1 className="page-title mb-6">
              TPC <span className="text-black">Newsletter</span>
            </h1>
            <DocumentList section="tpc-newsletter" title="Newsletters" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TPCNewsletter;
