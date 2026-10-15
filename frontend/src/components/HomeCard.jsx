import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { formatDate } from "../utils/formatDate";

// Card used by the home page carousels (achievements, events) so they match.
const HomeCard = ({ image, date, title, description, to }) => (
  <article className="group flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div className="relative h-44 bg-gray-200 border-b-4 border-emerald-900">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="flex flex-col flex-1 p-4">
      <span className="text-xs font-medium text-emerald-800">
        {formatDate(date) || "N/A"}
      </span>
      <h3 className="mt-2 text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-800 transition-colors duration-150">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
      <div className="mt-auto pt-4">
        <Link
          to={to}
          className="inline-flex items-center gap-2 border-t border-gray-100 pt-4 w-full text-sm font-medium text-emerald-800 hover:underline">
          Read More
          <MoveRight size={16} />
        </Link>
      </div>
    </div>
  </article>
);

export default HomeCard;
