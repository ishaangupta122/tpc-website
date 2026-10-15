import HeroSection from "../../components/HeroSection";
import DocumentList from "../../components/DocumentList";

const FormsDownload = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "forms-download", href: "/forms-download" },
  ];

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="Forms Download"
        breadcrumbs={breadcrumbs}
      />
      <div className="flex justify-center">
        <div className="site-container flex justify-start">
          <div className="w-full py-20">
            <h1 className="page-title mb-6">
              Forms <span className="text-black">Download</span>
            </h1>
            <DocumentList section="forms-download" title="Forms" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormsDownload;
