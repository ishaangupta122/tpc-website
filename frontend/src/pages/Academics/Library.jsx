import HeroSection from "../../components/HeroSection";
import { Link } from "react-router-dom";
import { Mail, Phone, CalendarDays, Briefcase, MoveRight } from "lucide-react";
import { useFaculty } from "../../hooks/useResources";

const LibraryPage = () => {
  const { data: staff } = useFaculty();
  // Shown only when a librarian exists in the data: no placeholder otherwise.
  const faculty = staff.find((member) =>
    (member.designation || "").toLowerCase().includes("librarian")
  );
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
  ];

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="College Library"
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-white">
        <div className="site-container py-10 md:py-14">
          {/* Header */}
          <div className="mb-8">
            <h1 className="page-title mb-6">
              Inside TPC&apos;s <span className="text-black">Library</span>
            </h1>
            <p className="text-lg text-gray-700">
              A temple of learning and a lighthouse in the spread of knowledge.
            </p>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <p className="lg:col-span-5 text-xl text-gray-900 leading-9">
              The library is a temple of learning, a lighthouse, and a chief
              agency in the spread of knowledge. Our polytechnic library boasts
              an open access system, an uncommon feature compared to the closed
              shelf system prevalent in other Northern Region Polytechnics.
            </p>
            <div className="lg:col-span-7 space-y-4 text-gray-700 leading-7">
              <p>
                Managed efficiently by an Assistant Librarian and an attendant,
                the library provides excellent services to staff and students
                alike. The Student Aid Books facility benefits a large number of
                students every year.
              </p>
              <p>
                Currently, the library houses 3,566 titles, comprising 16,800
                volumes. It is continually updated with the latest editions of
                books, technical and non-technical magazines, and journals
                covering all branches of study. Approximately 16,162 books are
                issued and consulted annually, showcasing its extensive usage.
              </p>
              <p>
                A large number of students visit the library daily to gain
                expertise in their respective fields, making it a cornerstone of
                academic excellence in our institution.
              </p>
            </div>
          </div>

          {/* Librarian (only when one is found) */}
          {faculty && (
          <section
            className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            aria-labelledby="librarian-heading">
            <div className="lg:col-span-5">
              <h2 id="librarian-heading" className="section-title mb-4">
                Meet <span className="text-black">Our Faculty</span>
              </h2>
              <p className="text-gray-700 leading-7">
                Our library is managed by dedicated professionals who are
                committed to fostering an environment of learning and
                intellectual growth. Meet the expert behind our library&apos;s
                success.
              </p>
            </div>

            <article className="lg:col-span-7 bg-white rounded-lg border border-gray-300 border-t-4 border-t-emerald-800 shadow-lg overflow-hidden flex flex-col sm:flex-row">
              {/* Photo and name */}
              <div className="sm:w-2/5 bg-gradient-to-b from-emerald-800 to-emerald-950 text-white p-6 flex flex-col items-center justify-center text-center gap-3">
                <img
                  src={faculty.image || "/default_user_img.jpeg"}
                  alt={faculty.name}
                  loading="lazy"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white"
                />
                <div>
                  <h3 className="text-lg font-semibold">{faculty.name}</h3>
                  <p className="text-sm text-green-200">{faculty.designation}</p>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 p-6 flex flex-col justify-between gap-5">
                <ul className="space-y-3 text-sm text-gray-800">
                  {[
                    [Mail, "Email", faculty.email, `mailto:${faculty.email}`],
                    [Phone, "Phone", faculty.phone],
                    [CalendarDays, "Joined", faculty.joinedDate],
                    [
                      Briefcase,
                      "Experience",
                      faculty.experience == null
                        ? "N/A"
                        : `${faculty.experience} ${
                            faculty.experience === 1 ? "year" : "years"
                          }`,
                    ],
                  ].map(([Icon, label, value, href]) => (
                    <li key={label} className="flex items-start gap-3">
                      <Icon
                        className="w-5 h-5 shrink-0 text-emerald-800 mt-0.5"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="font-medium text-emerald-800 underline break-all">
                            {value}
                          </a>
                        ) : (
                          <p className="font-medium">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/faculty/${faculty._id}`}
                  className="text-emerald-800 w-fit flex items-center gap-1 font-medium hover:underline focus-visible:underline focus-visible:outline-none">
                  View full profile
                  <MoveRight className="w-5 h-5" />
                </Link>
              </div>
            </article>
          </section>
          )}
        </div>
      </div>
    </>
  );
};

export default LibraryPage;
