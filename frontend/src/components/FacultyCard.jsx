import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { formatExperience } from "../utils/formatExperience";
import { formatDate } from "../utils/formatDate";

// Card used by the Faculty and Admin Staff pages.
//   showPhone  show the phone number instead of the department
const FacultyCard = ({ member, showPhone = false }) => {
  const experience = formatExperience(member.experience);

  const rows = [
    [
      "Email",
      member.email ? (
        <a
          href={`mailto:${member.email}`}
          className="break-all text-emerald-800 underline underline-offset-2 hover:text-emerald-900">
          {member.email}
        </a>
      ) : (
        "N/A"
      ),
    ],
    showPhone
      ? ["Phone", member.phone || "N/A"]
      : ["Department", member.department || "N/A"],
    ["Joined", formatDate(member.joinedDate) || "N/A"],
    ["Experience", experience],
  ];

  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="flex items-center gap-4 bg-gradient-to-b from-emerald-800 to-emerald-950 px-6 py-5 text-white">
        <img
          src={member.image || "/default_user_img.jpeg"}
          alt={member.name}
          className="h-20 w-20 shrink-0 rounded-full border-4 border-white object-cover object-top"
          loading="lazy"
        />
        <div className="min-w-0">
          <h2 className="text-lg font-semibold leading-snug">{member.name}</h2>
          {member.designation && (
            <p className="mt-0.5 text-sm text-green-200">{member.designation}</p>
          )}
        </div>
      </div>

      <dl className="flex-1 space-y-3 px-6 py-5 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3">
            <dt className="font-medium text-emerald-800">{label}</dt>
            <dd className="text-gray-800">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="px-6 pb-6">
        <Link
          to={`/faculty/${member._id}`}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-emerald-800 px-4 py-2.5 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-800 hover:text-white">
          View full profile
          <MoveRight size={16} />
        </Link>
      </div>
    </article>
  );
};

export default FacultyCard;
