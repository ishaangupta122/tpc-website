import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import TruncateText from "./TruncateText";
import { fetchAchievements } from "../context/AchievementsContext";
import Loading from "./Loading";
import NoDataFound from "./NoDataFound";
import Error from "./Error";

const AchievementsCarousel = () => {
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [activeButton, setActiveButton] = useState(null);

  const fetchAchievement = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAchievements();
      const filteredAchievements = data.filter((achievement) =>
        ["Student", "Faculty", "College"].includes(achievement.category)
      );
      setAchievements(filteredAchievements);
    } catch (err) {
      setError(err.message || "Failed to fetch achievements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievement();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current && !activeButton) {
      setActiveButton(direction);
      const container = scrollRef.current;
      const cardWidth = container.offsetWidth / 3;
      const scrollAmount = cardWidth * 3;
      const maxScroll = container.scrollWidth - container.offsetWidth;

      let newScroll;
      if (direction === "next") {
        newScroll = Math.min(container.scrollLeft + scrollAmount, maxScroll);
      } else {
        newScroll = Math.max(container.scrollLeft - scrollAmount, 0);
      }

      container.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });

      setTimeout(() => {
        setActiveButton(null);
      }, 800);
    }
  };

  return (
    <section
      id='achievements'
      className='bg-white overflow-hidden flex justify-center items-start px-4 py-10'>
      <div className='max-w-6xl md:mx-6 px-6 py-10 my-10 bg-gray-100 rounded-3xl container'>
        {/* Heading And Buttons */}
        <div className='w-full flex justify-between items-center flex-wrap gap-2 mb-8 px-2'>
          <div className='text-left w-fit'>
            <h2 className='text-3xl md:text-4xl font-medium text-emerald-900 '>
              College Achievements
            </h2>
          </div>
          <div className='flex gap-2'>
            <button
              onClick={() => scroll("prev")}
              className='p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95 transition-colors disabled:opacity-50'>
              <ChevronLeft className='w-6 h-6' />
            </button>
            <button
              onClick={() => scroll("next")}
              className='p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95 transition-colors disabled:opacity-50'>
              <ChevronRight className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* Carousel or Loading State */}
        {error ? (
          <Error error={error} />
        ) : loading ? (
          <>
            <Loading title='Achievements' />
          </>
        ) : achievements.length === 0 ? (
          <NoDataFound title='Achievements' />
        ) : (
          <div
            ref={scrollRef}
            className='flex gap-2 overflow-x-auto scroll-smooth'
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className='w-full md:w-1/2 lg:w-1/3  flex-shrink-0 px-2 py-5'>
                <div className='bg-white rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative h-full'>
                  <div className='relative h-56 bg-[#143429]/20 rounded-t-md overflow-hidden border-b-[4px] border-emerald-900'>
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className='h-full w-full object-cover'
                    />
                    <div className='flex flex-col text-center absolute top-0 left-4 font-medium bg-gradient-to-b from-emerald-800 to-emerald-950 text-white px-3 py-1 rounded-b-lg'>
                      <span className='text-sm'>
                        {achievement.category || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-3 p-4 pb-24 rounded-b-md'>
                    <div className='text-sm text-white font-medium  bg-emerald-800 w-fit px-3 py-1 rounded-full'>
                      {achievement.date || "N/A"}
                    </div>
                    <div className='text-lg font-semibold text-emerald-900 '>
                      <TruncateText text={achievement.title} maxLength={30} />
                    </div>
                    <div className='text-gray-600 text-sm'>
                      <TruncateText
                        text={achievement.description}
                        maxLength={60}
                      />
                    </div>
                    <Link
                      to={`achievements/${achievement._id}`}
                      className='absolute bottom-0 left-0 right-0 h-14 rounded-b-md overflow-hidden bg-gradient-to-b from-emerald-800 to-emerald-950 hover:underline inline-flex items-center justify-center py-4 text-white'>
                      Read More
                      <MoveRight className='ml-2' />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsCarousel;
