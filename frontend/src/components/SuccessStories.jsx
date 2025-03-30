import { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import TruncateText from "./TruncateText";
import { fetchSuccessStories } from "../context/SuccessStoriesContext";
import Loading from "./Loading";
import NoDataFound from "./NoDataFound";
import Error from "./Error";

const SuccessStoriesCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successStories, setSuccessStories] = useState([]);

  const fetchStories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSuccessStories();
      setSuccessStories(data);
    } catch (err) {
      setError(err.message || "Failed to fetch success stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const containerRef = useRef(null);

  const handleScrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: -150, behavior: "smooth" });
    }
  };

  const handleScrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: 150, behavior: "smooth" });
    }
  };

  return (
    <div className='w-full lg:w-1/3'>
      <div className='relative w-full'>
        <div className='flex items-start xl:items-center justify-between mb-6'>
          <h2 className='text-2xl font-semibold uppercase'>
            <span className='text-emerald-900'>Success </span> Stories
          </h2>
          <div className='flex gap-2'>
            <button
              onClick={handleScrollUp}
              className='p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95'>
              <ChevronUp size={24} />
            </button>
            <button
              onClick={handleScrollDown}
              className='p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95'>
              <ChevronDown size={24} />
            </button>
          </div>
        </div>

        {/* Carousel or Loading State */}
        {error ? (
          <Error error={error} />
        ) : loading ? (
          <>
            <Loading title='Success Stories' />
          </>
        ) : successStories.length === 0 ? (
          <NoDataFound title='Success Stories' />
        ) : (
          <div
            ref={containerRef}
            className='flex flex-col gap-4 h-[550px] w-full overflow-y-auto bg-gray-200 p-4 rounded-lg'
            style={{
              scrollBehavior: "smooth",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}>
            {successStories.map((story, index) => (
              <div
                key={index}
                className='flex bg-white rounded-lg shadow-lg  min-h-56 w-full'>
                <div className='overflow-hidden rounded-l-lg h-full w-1/2'>
                  <img
                    src={story.image}
                    alt={story.title}
                    className='h-full w-full object-cover bg-emerald-100'
                  />
                </div>
                <div className='w-1/2 px-3 py-4 flex flex-col gap-4'>
                  <div className='text-sm font-semibold text-emerald-900'>
                    <TruncateText text={story.title} maxLength={20} />
                  </div>
                  <div className='text-gray-600 text-xs'>
                    <TruncateText text={story.description} maxLength={60} />
                  </div>
                  <Link
                    to={`/success-story/${story._id}`}
                    className='text-emerald-900 text-sm hover:underline'>
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessStoriesCarousel;
