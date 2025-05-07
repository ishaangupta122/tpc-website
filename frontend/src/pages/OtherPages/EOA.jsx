import { Download } from "lucide-react";
import HeroSection from "../../components/HeroSection";

const EOA = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "EOA", href: "/eoa" },
  ];
  const links = [
    "Extension of Approval (2015-2016)",
    "Extension of Approval (2016-2017)",
    "Extension of Approval (2017-2018)",
    "Extension of Approval (2018-2019)",
    "Extension of Approval (2019-2020)",
    "Extension of Approval (2020-2021)",
    "Extension of Approval (2021-2022)",
    "Extension of Approval (2022-2023)",
    "Extension of Approval (2023-2024)",
    "Extension of Approval (2024-2025)",
  ];

  return (
    <>
      <HeroSection
        imageUrl="./rec_gate.jpg"
        title="Extension of Approval"
        breadcrumbs={breadcrumbs}
      />
      <div className="flex justify-center">
        <div className="flex justify-start w-full max-w-7xl">
          <div className="px-6 py-20 md:px-20">
            <h1 className="text-2xl font-semibold uppercase text-gray-900 mb-2">
              Extension of <span className="text-emerald-800">Approval</span>
            </h1>
            <div className="h-[3px] w-32 bg-yellow-500 rounded-lg mb-6"></div>
            <ul className="list-disc list-inside space-y-2">
              {links.map((link) => (
                <li key={link} className="text-emerald-800">
                  <a
                    href="#"
                    className="inline-flex items-center hover:text-blue-600 hover:underline">
                    {link}
                    <Download className="w-4 h-4 ml-1 inline-block" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EOA;
