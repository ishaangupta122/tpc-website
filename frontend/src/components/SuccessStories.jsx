import { useRef } from "react";
import { ChevronUp, ChevronDown, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSuccessStories } from "../hooks/useResources";
import HomePanel from "./HomePanel";
import Loading from "./Loading";
import NoDataFound from "./NoDataFound";
import Error from "./Error";

const navButtonClass =
  "p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:from-emerald-800/95 hover:to-emerald-950/95 transition-colors";

const SuccessStoriesCarousel = ({ className = "" }) => {
  const { data: successStories, loading, error, refresh } = useSuccessStories();
  const containerRef = useRef(null);

  const scrollBy = (top) =>
    containerRef.current?.scrollBy({ top, behavior: "smooth" });

  const controls = (
    <div className="flex gap-2">
      <button
        onClick={() => scrollBy(-200)}
        aria-label="Scroll up"
        className={navButtonClass}>
        <ChevronUp className="w-5 h-5" />
      </button>
      <button
        onClick={() => scrollBy(200)}
        aria-label="Scroll down"
        className={navButtonClass}>
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    // Fixed height on small screens; on large screens it stretches to match
    // the Events panel next to it and the list scrolls inside.
    <aside className={`relative h-[560px] lg:h-auto lg:min-h-[560px] ${className}`}>
      <div className="absolute inset-0">
        <HomePanel title="Success Stories" actions={controls}>
          {error ? (
            <Error error={error} onRetry={refresh} />
          ) : loading ? (
            <Loading title="Success Stories" />
          ) : successStories.length === 0 ? (
            <NoDataFound title="Success Stories" />
          ) : (
            <div
              ref={containerRef}
              className="flex flex-col gap-4 h-full overflow-y-auto"
              style={{
                scrollBehavior: "smooth",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}>
              {successStories.map((story) => (
                <article
                  key={story._id}
                  className="group flex flex-shrink-0 min-h-[10rem] bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-2/5 object-cover bg-gray-200 border-r-4 border-emerald-900"
                    loading="lazy"
                  />
                  <div className="w-3/5 p-4 flex flex-col">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-800 transition-colors duration-150">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {story.description}
                    </p>
                    <Link
                      to={`/success-story/${story._id}`}
                      className="mt-auto pt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:underline">
                      Read More
                      <MoveRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </HomePanel>
      </div>
    </aside>
  );
};

export default SuccessStoriesCarousel;
