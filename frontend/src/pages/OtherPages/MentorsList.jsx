import { Download } from "lucide-react";
import HeroSection from "../../components/HeroSection";

const MentorsList = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Mentors-List", href: "/mentors-list" },
  ];
  const links = [
    "List of Mentors 2020",
    "List of Mentors 2021",
    "List of Mentors 2022",
    "List of Mentors 2023",
    "List of Mentors 2024",
    "List of Mentors 2025",
  ];

  return (
    <>
      <HeroSection
        imageUrl="./rec_gate.jpg"
        title="Mentors List"
        breadcrumbs={breadcrumbs}
      />
      <div className="flex justify-center">
        <div className="flex justify-start w-full max-w-7xl">
          <div className="px-6 py-20 md:px-20">
            <h1 className="text-2xl font-semibold uppercase text-gray-900 mb-2">
              Mentors <span className="text-emerald-800">List</span>
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

export default MentorsList;
