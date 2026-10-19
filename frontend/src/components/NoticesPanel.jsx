import HomePanel from "./HomePanel";
import { useNotices } from "../hooks/useResources";
import Loading from "./Loading";
import Error from "./Error";
import NoDataFound from "./NoDataFound";

// Notices & circulars as a vertical timeline feed. Each entry is just a title
// that opens its PDF in the same tab; the feed scrolls inside the panel.
const NoticesPanel = ({ className = "" }) => {
  const { data: notices, loading, error, refresh } = useNotices();

  return (
  <aside className={`relative h-[460px] lg:h-auto lg:min-h-[460px] ${className}`}>
    <div className="absolute inset-0">
      <HomePanel title="Notices & Circulars">
        {error ? (
          <Error error={error} onRetry={refresh} />
        ) : loading ? (
          <Loading title="Notices" />
        ) : notices.length === 0 ? (
          <NoDataFound title="Notices" />
        ) : (
          <div
            className="min-h-0 flex-1 overflow-y-auto pr-2"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 calc(100% - 28px), transparent)",
              maskImage:
                "linear-gradient(to bottom, #000 calc(100% - 28px), transparent)",
            }}>
            <ol className="relative ml-1.5 mb-7 border-l-2 border-emerald-800/25">
              {notices.map((notice) => (
                <li key={notice._id} className="group relative pl-6 py-3.5 first:pt-1">
                  <span className="absolute -left-[7px] top-[1.3rem] group-first:top-[0.7rem] h-3 w-3 rounded-full bg-emerald-800 ring-4 ring-gray-50 transition-transform duration-200 group-hover:scale-125" />
                  <a
                    href={notice.fileUrl}
                    className={`block text-base font-medium leading-snug underline-offset-4 transition-colors duration-150 group-hover:underline md:text-lg ${
                      notice.highlight
                        ? "font-semibold text-amber-600 group-hover:text-amber-700 blink-animation"
                        : "text-gray-800 group-hover:text-emerald-800"
                    }`}>
                    {notice.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </HomePanel>
    </div>
  </aside>
  );
};

export default NoticesPanel;
