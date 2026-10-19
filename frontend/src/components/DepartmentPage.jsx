import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, FileDown, FileText } from "lucide-react";
import HeroSection from "./HeroSection";
import { formatDate } from "../utils/formatDate";
import { useDepartments, useEvents, useFaculty } from "../hooks/useResources";

// Shared text style so every section on the page matches.
const bodyTextClass = "text-sm text-gray-600 text-justify";

// Section heading: green word + black word, uppercase.
const SectionHeading = ({ first, second }) => (
  <h2 className="section-title with-rule mb-6">
    {first} <span className="text-black">{second}</span>
  </h2>
);

// What an "other page" item looks like, by type.
const RESOURCE_KINDS = {
  page: { Icon: FileText, label: "Page" },
  pdf: { Icon: FileDown, label: "PDF document" },
  link: { Icon: ExternalLink, label: "External link" },
};

const isHod = (member) =>
  /head of department|\bhod\b|incharge/i.test(member.designation || "");

// One item under "Other Pages": opens the page, the PDF or the link.
const ResourceCard = ({ resource, basePath }) => {
  const { Icon, label } = RESOURCE_KINDS[resource.type] || RESOURCE_KINDS.page;
  const className =
    "group flex h-full items-center gap-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-emerald-50";
  const body = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-800 text-white">
        <Icon size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-gray-900 group-hover:text-emerald-900">
          {resource.title}
        </span>
        <span className="block text-xs text-gray-500">{label}</span>
      </span>
      <ArrowRight
        size={16}
        className="shrink-0 text-emerald-800 transition-transform group-hover:translate-x-1"
      />
    </>
  );

  if (resource.type === "pdf")
    return (
      <a
        href={resource.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {body}
      </a>
    );
  if (resource.type === "link")
    return (
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {body}
      </a>
    );
  return (
    <Link to={`${basePath}/pages/${resource.slug}`} className={className}>
      {body}
    </Link>
  );
};

const DepartmentPage = ({
  deptKey,
  name,
  shortName,
  category,
  basePath,
  heroImage,
  about,
  hod: builtInHod,
  hodMessage,
}) => {
  // The extra pages the admin added for this department.
  const { data: savedDepartments } = useDepartments();
  const extraPages =
    savedDepartments.find((item) => item.key === deptKey)?.pages || [];

  // The department's faculty (the Faculty list uses the same names as `category`);
  // the head of department comes from there, HOD first.
  const { data: allFaculty } = useFaculty();
  const faculty = useMemo(
    () =>
      allFaculty
        .filter((member) => member.department === category)
        .sort((a, b) => Number(isHod(b)) - Number(isHod(a))),
    [allFaculty, category],
  );
  const hodMember = faculty.find(isHod);
  const hod = hodMember
    ? {
        id: hodMember._id,
        name: hodMember.name,
        designation: hodMember.designation,
        image: hodMember.image || "/default_user_img.jpeg",
      }
    : builtInHod
      ? { ...builtInHod, image: builtInHod.image || "/default_user_img.jpeg" }
      : null;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: shortName || name, href: basePath },
  ];
  const { data: allEvents } = useEvents();

  // This department's events, newest first (the server sends them that way).
  const updateList = useMemo(
    () => allEvents.filter((event) => event.category === category),
    [allEvents, category],
  );

  return (
    <>
      <HeroSection
        imageUrl={heroImage}
        title={name}
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-white">
        <div className="site-container flex flex-col gap-12 py-10 md:py-14">
          {/* About and head of department, beside the latest updates (which end level with the HOD card) */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="flex flex-col gap-12 lg:col-span-8">
              <section>
                <SectionHeading first="About the" second="Department" />
                <div className={`space-y-4 ${bodyTextClass}`}>
                  {about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Message from the head of department: the person comes from the
                  Faculty list, the message is the same for the department */}
              {hod && (
                <section>
                  <SectionHeading first="Message from" second="HOD" />
                  <div className="relative mt-14 rounded-xl bg-gray-50 p-6 pt-16 sm:mt-6 sm:p-8">
                    {/* The photo sits on the top right edge: half outside the card, half inside */}
                    <img
                      src={hod.image}
                      alt={hod.name}
                      className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-white object-cover object-top shadow-md ring-2 ring-green-800 sm:left-auto sm:right-8 sm:h-32 sm:w-32 sm:translate-x-0"
                      loading="lazy"
                    />
                    <div className="text-center sm:pr-36 sm:text-left">
                      <h3 className="card-title">{hod.name}</h3>
                      <p className="text-sm font-medium">
                        ({hod.designation || "Head of Department"})
                      </p>
                      {hod.id && (
                        <Link
                          to={`/faculty/${hod.id}`}
                          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-emerald-800 hover:underline"
                        >
                          View profile
                          <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                    <div className={`mt-4 space-y-3 ${bodyTextClass}`}>
                      {(hodMessage || []).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Latest updates (the department's events): top right. It is as tall as the
              left column, so it ends level with the head of department card, and the
              list scrolls inside it. */}
            <aside className="relative lg:col-span-4 lg:min-h-[24rem]">
              <div className="flex max-h-[32rem] flex-col rounded-xl bg-emerald-50 p-6 lg:absolute lg:inset-0 lg:max-h-none">
                <SectionHeading first="Latest" second="Updates" />
                {updateList.length === 0 ? (
                  <p className="text-sm text-gray-600">No updates available.</p>
                ) : (
                  <ul className="min-h-0 flex-1 divide-y divide-gray-200 overflow-y-auto pr-2">
                    {updateList.map((event) => (
                      <li key={event._id} className="py-4 first:pt-0 last:pb-0">
                        <Link
                          to={`${basePath}/events/${event._id}`}
                          className="group block"
                        >
                          {event.date && (
                            <span className="mb-1 block text-xs font-medium text-emerald-800">
                              {formatDate(event.date)}
                            </span>
                          )}
                          <span className="block text-sm font-semibold text-black transition-colors duration-150 group-hover:text-emerald-800">
                            {event.title}
                          </span>
                          {event.description && (
                            <span className="mt-1 line-clamp-2 block text-sm text-gray-600">
                              {event.description}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>

          {/* The department's faculty, linking to their profiles */}
          {faculty.length > 0 && (
            <section>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <SectionHeading first="Department" second="Faculty" />
                <Link
                  to="/faculty"
                  className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:underline"
                >
                  View all faculty
                  <ArrowRight size={15} />
                </Link>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full whitespace-nowrap bg-white text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      {[
                        "S. No",
                        "Image",
                        "Name",
                        "Designation",
                        "Qualification",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-4 py-3 text-left font-semibold text-gray-600 sm:px-6"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {faculty.map((member, index) => (
                      <tr key={member._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3.5 text-gray-500 sm:px-6">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 sm:px-6">
                          <img
                            src={member.image || "/default_user_img.jpeg"}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover object-top"
                            loading="lazy"
                          />
                        </td>
                        <td className="px-4 py-3.5 sm:px-6">
                          <Link
                            to={`/faculty/${member._id}`}
                            className="font-medium text-emerald-900 hover:underline"
                          >
                            {member.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3.5 text-gray-700 sm:px-6">
                          {member.designation}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600 sm:px-6">
                          {(member.education || [])
                            .filter(Boolean)
                            .join(", ") || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Pages, PDFs and links the admin added for this department */}
          {extraPages.length > 0 && (
            <section>
              <SectionHeading first="Other" second="Pages" />
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {extraPages.map((page) => (
                  <li key={page.slug}>
                    <ResourceCard resource={page} basePath={basePath} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;
