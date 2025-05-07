import { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection";
import { Link, useParams } from "react-router-dom";
import { fetchFacultyById } from "../../context/FacultyContext";
import Loading from "../../components/Loading";

const FacultyProfile = () => {
  const { facultyId } = useParams();
  const [loading, setLoading] = useState(true);

  const [faculty, setFaculty] = useState({});

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Faculty", href: "/faculty" },
    {
      label: faculty?.name || "Faculty Profile",
      href: `/faculty/${facultyId}`,
    },
  ];

  const fetchFacultyProfile = async () => {
    setLoading(true);
    const data = await fetchFacultyById(facultyId);
    console.log(data);

    setFaculty(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFacultyProfile();
  }, [facultyId]);

  if (loading) {
    return <Loading title="Faculty Profile" />;
  }

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="Faculty Profile"
        breadcrumbs={breadcrumbs}
      />

      <div className="flex items-center w-full flex-col px-4 md:px-16">
        <section className="py-16 max-w-7xl w-full md:w-fit">
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-2xl font-semibold uppercase text-green-900 ">
              Faculty <span className="text-black">Details</span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full p-4 md:p-6 border-2 border-green-800 rounded-lg shadow-lg max-w-4xl">
            {/* Image Section */}
            <div className="flex-shrink-0 text-center mb-4 md:mb-0 md:mr-6">
              <img
                src={faculty.image || "/default_user_img.jpeg"}
                alt="Profile"
                className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover border-2 border-green-800 mx-auto"
                loading="lazy"
              />
            </div>

            {/* Table Section */}
            <div key={facultyId} className="flex-grow w-full">
              <div className="bg-gradient-to-b from-emerald-800 to-emerald-950 text-white px-4 sm:px-6 py-3 md:py-4 rounded-lg mb-4 text-center md:text-left">
                <h2 className="text-lg font-medium">{faculty.name}</h2>
              </div>

              <table className="w-full text-sm">
                <tbody>
                  {[
                    [
                      "Email",
                      <Link
                        key="email"
                        className="text-green-800 break-words underline"
                        target="_blank"
                        to={`mailto:${faculty.email}`}>
                        {faculty.email}
                      </Link>,
                    ],
                    ["Phone", faculty.phone || "Not Provided"],
                    ["Department", faculty.department || "Not Provided"],
                    ["Designation", faculty.designation || "Not Provided"],
                    ["Joined Date", faculty.joinedDate || "Not Provided"],
                    [
                      "Experience",
                      faculty.experience + " years" || "Not Provided",
                    ],
                  ].map(([label, value]) => (
                    <tr
                      key={label + value}
                      className="border-b border-gray-300 last:border-none">
                      <td className="py-2 text-green-800 font-medium pr-4">
                        {label}:
                      </td>
                      <td className="py-2 text-gray-800 font-normal break-words">
                        {value}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2 text-green-800 font-medium align-top pr-4">
                      Education:
                    </td>
                    <td className="py-2 text-gray-800 font-normal">
                      <ul className="list-disc list-inside space-y-2">
                        {faculty.education === 0 ||
                        faculty.education.every((e) => e.trim() === "") ? (
                          <p>Not Provided</p>
                        ) : (
                          faculty.education.map((edu, index) => (
                            <li key={index}>{edu}</li>
                          ))
                        )}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FacultyProfile;
