import { useState } from "react";
import { UserRound } from "lucide-react";
import { useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import HeroSection from "../../components/HeroSection";
import { useFacultyMember } from "../../hooks/useResources";
import Loading from "../../components/Loading";
import { formatExperience } from "../../utils/formatExperience";
import { formatDate } from "../../utils/formatDate";
import Error from "../../components/Error";

// Extra sections the admin can fill in; each is shown as a table.
const TABLE_SECTIONS = [
  {
    key: "publications",
    label: "List of Publications",
    columns: [
      ["title", "Title"],
      ["journal", "Journal / Publisher"],
      ["year", "Year"],
      ["link", "Link"],
    ],
  },
  {
    key: "conferences",
    label: "Conferences by Faculty",
    columns: [
      ["title", "Title"],
      ["conference", "Conference"],
      ["venue", "Venue"],
      ["year", "Year"],
    ],
  },
  {
    key: "books",
    label: "Books by Faculty",
    columns: [
      ["title", "Title"],
      ["publisher", "Publisher"],
      ["year", "Year"],
      ["isbn", "ISBN"],
    ],
  },
];

const safeLink = (url) => (/^https?:\/\//i.test(url || "") ? url : null);

const Cell = ({ column, value }) => {
  if (!value) return <span className="text-gray-400">—</span>;
  if (column === "link") {
    const href = safeLink(value);
    return href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-emerald-800 underline underline-offset-2 hover:text-emerald-900">
        View
        <ExternalLink size={12} />
      </a>
    ) : (
      value
    );
  }
  if (column === "year") {
    return (
      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
        {value}
      </span>
    );
  }
  return value;
};

const SectionTable = ({ section, rows }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white text-sm">
      <thead className="border-b border-emerald-100 bg-emerald-50">
        <tr>
          <th className="w-14 whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-emerald-900">
            #
          </th>
          {section.columns.map(([key, label]) => (
            <th
              key={key}
              className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-emerald-900">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {rows.map((row, i) => (
          <tr key={i} className="odd:bg-white even:bg-gray-50/70">
            <td className="whitespace-nowrap px-4 py-3.5 text-gray-400">{i + 1}</td>
            {section.columns.map(([key]) => (
              <td
                key={key}
                className={`px-4 py-3.5 align-top ${
                  key === "title"
                    ? "min-w-[16rem] font-medium text-gray-900"
                    : "whitespace-nowrap text-gray-600"
                }`}>
                <Cell column={key} value={row[key]} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FacultyProfile = () => {
  const { facultyId } = useParams();
  const { data, loading, error, refresh } = useFacultyMember(facultyId);
  const faculty = data || {};
  const [active, setActive] = useState("basic");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Faculty", href: "/faculty" },
    { label: faculty?.name || "Faculty Profile", href: `/faculty/${facultyId}` },
  ];

  if (loading) return <Loading title="Faculty Profile" />;

  const education = Array.isArray(faculty?.education)
    ? faculty.education.filter((e) => typeof e === "string" && e.trim() !== "")
    : [];

  // All table sections (a section without entries says so when opened).
  const sections = TABLE_SECTIONS.map((section) => ({
    ...section,
    rows: Array.isArray(faculty[section.key]) ? faculty[section.key] : [],
  }));
  const menu = [{ key: "basic", label: "Basic information" }, ...sections];
  const current = sections.find((section) => section.key === active);

  const experience =
    faculty.experience == null ? "Not provided" : formatExperience(faculty.experience);

  const details = [
    ["Department", faculty.department],
    ["Designation", faculty.designation],
    ["Joined Date", formatDate(faculty.joinedDate)],
    [
      "Experience",
      <span
        key="exp"
        className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
        {experience}
      </span>,
    ],
    [
      "Email",
      faculty.email && (
        <a
          key="email"
          href={`mailto:${faculty.email}`}
          className="break-all text-emerald-800 underline underline-offset-2 hover:text-emerald-900">
          {faculty.email}
        </a>
      ),
    ],
    ["Phone", faculty.phone],
  ];

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
        <div className="site-container py-12 md:py-16">
          <h1 className="page-title mb-8">
            Faculty <span className="text-black">Details</span>
          </h1>

          <div className="grid items-start gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
            {/* Section selector */}
            <aside className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <h2 className="bg-gradient-to-b from-emerald-800 to-emerald-950 px-5 py-4 text-lg font-semibold text-white">
                Faculty details
              </h2>
              <nav
                aria-label="Faculty profile sections"
                className="flex overflow-x-auto lg:block">
                {menu.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActive(key)}
                    aria-current={active === key ? "page" : undefined}
                    className={`block shrink-0 whitespace-nowrap border-b border-gray-200 px-5 py-3 text-left text-sm transition-colors lg:w-full ${
                      active === key
                        ? "bg-emerald-50 font-semibold text-emerald-900 lg:border-l-4 lg:border-l-[#fdb714]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}>
                    {label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Selected section */}
            <div className="min-w-0">
              {current ? (
                <section className="overflow-hidden rounded-xl border-2 border-green-800 bg-white shadow-lg">
                  <h2 className="bg-gradient-to-b from-emerald-800 to-emerald-950 px-6 py-4 text-lg font-semibold text-white">
                    {current.label}
                  </h2>
                  {current.rows.length === 0 ? (
                    <p className="px-5 py-10 text-center text-gray-500">
                      No entries added yet.
                    </p>
                  ) : (
                    <SectionTable section={current} rows={current.rows} />
                  )}
                </section>
              ) : (
            <div className="overflow-hidden rounded-xl border-2 border-green-800 bg-white shadow-lg">
              <div className="bg-gradient-to-b from-emerald-800 to-emerald-950 px-6 py-5 text-white">
                <h2 className="text-xl font-semibold md:text-2xl">{faculty.name}</h2>
                {faculty.designation && (
                  <p className="mt-1 text-sm text-green-200 md:text-base">
                    {faculty.designation}
                    {faculty.department ? ` · ${faculty.department}` : ""}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center gap-6 p-5 md:flex-row md:items-start md:gap-8 md:p-8">
                {faculty.image ? (
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="h-40 w-40 shrink-0 rounded-xl object-cover object-top shadow-lg ring-1 ring-black/5 md:h-48 md:w-48"
                    loading="lazy"
                  />
                ) : (
                  // No photo: a plain square placeholder (the default picture is a circle).
                  <div
                    role="img"
                    aria-label={`${faculty.name}, no photo`}
                    className="flex h-40 w-40 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800/50 shadow-lg ring-1 ring-black/5 md:h-48 md:w-48">
                    <UserRound className="h-20 w-20" strokeWidth={1.25} />
                  </div>
                )}

                <div className="w-full min-w-0 flex-1">
                  <dl className="divide-y divide-gray-200 text-sm md:text-base">
                    {details.map(([label, value]) => (
                      <div
                        key={label}
                        className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 py-2.5 first:pt-0">
                        <dt className="font-medium text-emerald-800">{label}</dt>
                        <dd className="break-words text-gray-800">
                          {value || "Not provided"}
                        </dd>
                      </div>
                    ))}
                    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 py-2.5">
                      <dt className="font-medium text-emerald-800">Education</dt>
                      <dd>
                        {education.length === 0 ? (
                          <span className="text-gray-800">Not provided</span>
                        ) : (
                          <ul className="list-inside list-disc space-y-1 text-gray-800">
                            {education.map((edu, i) => (
                              <li key={i}>{edu}</li>
                            ))}
                          </ul>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FacultyProfile;
