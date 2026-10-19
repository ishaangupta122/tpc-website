import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SuccessStoriesCarousel from "./SuccessStories";
import { useAchievements } from "../hooks/useResources";
import HomePanel from "./HomePanel";
import HomeCard from "./HomeCard";
import Loading from "./Loading";
import NoDataFound from "./NoDataFound";
import Error from "./Error";

const navButtonClass =
  "p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:from-emerald-800/95 hover:to-emerald-950/95 transition-colors";

const AchievementsCarousel = ({ className = "" }) => {
  const { data: achievements, loading, error, refresh } = useAchievements();
  const [activeButton, setActiveButton] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current || activeButton) return;
    setActiveButton(direction);
    const container = scrollRef.current;
    const maxScroll = container.scrollWidth - container.offsetWidth;
    const target =
      direction === "next"
        ? Math.min(container.scrollLeft + container.offsetWidth, maxScroll)
        : Math.max(container.scrollLeft - container.offsetWidth, 0);
    container.scrollTo({ left: target, behavior: "smooth" });
    setTimeout(() => setActiveButton(null), 800);
  };

  const controls = (
    <div className="flex gap-2">
      <button
        onClick={() => scroll("prev")}
        aria-label="Previous achievements"
        className={navButtonClass}>
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll("next")}
        aria-label="Next achievements"
        className={navButtonClass}>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className={`min-w-0 ${className}`}>
      <HomePanel title="Latest Achievements" actions={controls}>
        {error ? (
          <Error error={error} onRetry={refresh} />
        ) : loading ? (
          <Loading title="Achievements" />
        ) : achievements.length === 0 ? (
          <NoDataFound title="Achievements" />
        ) : (
          <div
            ref={scrollRef}
            className="flex -mx-2 overflow-x-auto scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}>
            {achievements.map((achievement) => (
              <div
                key={achievement._id}
                className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
                <HomeCard
                  image={achievement.image}
                  date={achievement.date}
                  title={achievement.title}
                  description={achievement.description}
                  to={`achievements/${achievement._id}`}
                />
              </div>
            ))}
          </div>
        )}
      </HomePanel>
    </div>
  );
};

// Success stories beside the college achievements (all of them, newest first).
const AchievementsSection = () => {
  return (
    <section
      id="achievements"
      className="bg-white overflow-hidden py-10">
      <div className="site-container my-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <SuccessStoriesCarousel className="lg:col-span-4" />
        <AchievementsCarousel className="lg:col-span-8" />
      </div>
    </section>
  );
};

export default AchievementsSection;
