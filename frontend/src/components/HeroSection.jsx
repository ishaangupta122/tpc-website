import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

// Page banner used by every page: a full-width photo with the page title, and
// the breadcrumb trail underneath.
//   breadcrumbs  [{ label, href }]; the last one is the current page
const HeroSection = ({ imageUrl, title, breadcrumbs = [] }) => {
  return (
    <header>
      <div className="relative h-52 w-full md:h-60">
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark overlay so the title is always readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40" />

        <div className="absolute inset-0 flex items-center">
          <div className="site-container">
            <h1 className="max-w-4xl text-3xl font-bold uppercase leading-tight tracking-wide text-white drop-shadow-md md:text-5xl">
              {title}
            </h1>
            <div className="mt-4 h-1 w-24 rounded-full bg-[#fdb714]" />
          </div>
        </div>
      </div>

      {/* Breadcrumb trail */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-gray-200 bg-gray-100">
        <ol className="site-container flex flex-wrap items-center gap-x-1 gap-y-1 py-2.5 text-sm">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={index} className="flex min-w-0 items-center gap-1">
                {isLast ? (
                  <span
                    aria-current="page"
                    className="truncate font-semibold text-emerald-800">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.href}
                    className="inline-flex items-center gap-1.5 font-medium text-gray-700 transition-colors hover:text-emerald-800 hover:underline">
                    {index === 0 && <Home size={14} aria-hidden="true" />}
                    {crumb.label}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight
                    size={14}
                    className="shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </header>
  );
};

export default HeroSection;
