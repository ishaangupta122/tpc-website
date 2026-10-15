import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

const POPULAR_PAGES = [
  { label: "Admission", to: "/admission" },
  { label: "Faculty", to: "/faculty" },
  { label: "Placements", to: "/placements" },
  { label: "Gallery", to: "/gallery" },
  { label: "About the College", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const PageNotFound = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const previous = document.title;
    document.title = "Page not found | Thapar Polytechnic College";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-emerald-50/70">
      {/* Soft decorative shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#fdb714]/15 blur-3xl"
      />

      <div className="site-container relative py-20 text-center md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-800">
          Error 404
        </p>

        <h1
          aria-label="404"
          className="mt-4 select-none text-[7rem] font-bold leading-none text-emerald-900 md:text-[11rem]">
          4<span className="text-[#fdb714]">0</span>4
        </h1>
        <div className="title-rule mx-auto mt-5" />

        <h2 className="mt-8 text-2xl font-semibold text-gray-900 md:text-3xl">
          Page not found
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          We couldn&apos;t find{" "}
          <code className="break-all rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-800">
            {pathname}
          </code>
          . It may have been moved or no longer exists.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-emerald-800 to-emerald-950 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:from-emerald-700 hover:to-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Popular pages
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_PAGES.map((page) => (
              <li key={page.to}>
                <Link
                  to={page.to}
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:border-emerald-800 hover:text-emerald-900 hover:shadow-sm">
                  {page.label}
                  <ArrowRight className="h-4 w-4 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-800" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
