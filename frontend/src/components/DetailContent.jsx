import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import AchievementDefaultLayout from "./AchievementDefaultLayout";
import BlockRenderer from "./BlockRenderer";

// Body of a detail page (achievement, event, success story): back link,
// eyebrow line, two-tone page title, then either the admin's page-builder
// blocks or, when there are none, the default photo + description layout.
//   eyebrow  small uppercase line above the title (category, date, ...)
const DetailContent = ({
  backTo,
  backLabel,
  eyebrow,
  title,
  image,
  description,
  blocks,
}) => {
  // Two-tone title: last word black, the rest green (as on every page title).
  const text = (title || "").trim();
  const cut = text.lastIndexOf(" ");
  const titleStart = cut === -1 ? "" : text.slice(0, cut);
  const titleEnd = cut === -1 ? text : text.slice(cut + 1);

  return (
    <div className="site-container py-12 md:py-16">
      <Link
        to={backTo}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:underline">
        <MoveLeft size={16} />
        {backLabel}
      </Link>

      <header className="mb-10">
        {eyebrow && (
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-600">
            {eyebrow}
          </p>
        )}
        <h1 className="page-title max-w-4xl">
          {titleStart && <span>{titleStart} </span>}
          <span className="text-black">{titleEnd}</span>
        </h1>
      </header>

      {blocks?.length ? (
        <BlockRenderer blocks={blocks} />
      ) : (
        <AchievementDefaultLayout image={image} title={title} description={description} />
      )}
    </div>
  );
};

export default DetailContent;
