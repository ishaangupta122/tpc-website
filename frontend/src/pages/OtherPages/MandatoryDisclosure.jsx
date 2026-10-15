import { ExternalLink } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import DocumentList from "../../components/DocumentList";
import { Link } from "react-router-dom";

const MandatoryDisclosure = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Mandatory-Disclosure", href: "/mandatory-disclosure" },
  ];

  return (
    <div>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="Mandatory Disclosure"
        breadcrumbs={breadcrumbs}
      />
      <div className="flex justify-center">
        <div className="site-container flex justify-start">
          <div className="w-full py-20">
            <h1 className="page-title mb-6">
              Mandatory <span className="text-black">Disclosure</span>
            </h1>
            <DocumentList
              section="mandatory-disclosure"
              title="Documents"
              extra={
                <>
              <li className="text-emerald-800">
                <Link
                  to={"/eoa"}
                  className="inline-flex items-center hover:text-blue-600 hover:underline">
                  EOA for the last 10 years
                  <ExternalLink className="w-4 h-4 ml-1 inline-block" />
                </Link>
              </li>
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MandatoryDisclosure;
