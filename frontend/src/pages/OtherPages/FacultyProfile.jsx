import HeroSection from "../../components/HeroSection";
import { Link, useParams } from "react-router-dom";
import { useFacultyMember } from "../../hooks/useResources";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const FacultyProfile = () => {
  const { facultyId } = useParams();
  const { data, loading, error, refresh } = useFacultyMember(facultyId);
  const faculty = data || {};

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Faculty", href: "/faculty" },
    {
      label: faculty?.name || "Faculty Profile",
      href: `/faculty/${facultyId}`,
    },
  ];

  if (loading) {
    return <Loading title="Faculty Profile" />;
  }

  const education = Array.isArray(faculty?.education)
    ? faculty.education.filter((e) => typeof e === "string" && e.trim() !== "")
    : [];

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="Faculty Profile"
        breadcrumbs={breadcrumbs}
      />

      {error ? (
        <Error error={error} onRetry={refresh} />
      ) : (
      <div className="site-container flex items-center flex-col">
        <section className="py-16 w-full md:w-fit">
          <div className="mb-6 text-center md:text-left">
            <h1 className="page-title">
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
                      faculty.experience == null
                        ? "Not Provided"
                        : `${faculty.experience} ${faculty.experience === 1 ? "year" : "years"}`,
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
                        {education.length === 0 ? (
                          <p>Not Provided</p>
                        ) : (
                          education.map((edu, index) => (
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
      )}
    </>
  );
};

export default FacultyProfile;
