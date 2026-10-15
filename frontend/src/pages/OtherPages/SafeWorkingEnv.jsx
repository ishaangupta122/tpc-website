import HeroSection from "../../components/HeroSection";
import DocumentList from "../../components/DocumentList";

const SafeWorkingEnv = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "safe-working-environment", href: "/safe-working-environment" },
  ];

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="Safe Working Environment"
        breadcrumbs={breadcrumbs}
      />
      <div className="flex justify-center">
        <div className="site-container flex justify-start">
          <div className="w-full py-20">
            <h1 className="page-title mb-6">
              Maintenance of Safe Working Environment{" "}
              <span className="text-black">
                for Female Employees at TPC
              </span>
            </h1>
            <DocumentList section="safe-working" title="Documents" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SafeWorkingEnv;
