import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import TruncateText from "./TruncateText";
import { Link } from "react-router-dom";
import SuccessStoriesCarousel from "./SuccessStories";
import { fetchEvent } from "../context/EventsContext";
import Loading from "./Loading";
import NoDataFound from "./NoDataFound";
import Error from "./Error";

const EventsCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const scrollRef = useRef(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvent();
      setEvents(data);
    } catch (err) {
      setError(err.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
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
    <div className='relative lg:w-[65%] w-full'>
      <div className='flex items-center mb-6 px-4'>
        <h2 className='text-2xl font-semibold flex-grow uppercase'>
          <span className='text-emerald-900'>Events & </span>Updates
        </h2>
        <div className='flex gap-2'>
          <button
            onClick={() => scroll("prev")}
            className='p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95'>
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("next")}
            className='p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95'>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Carousel or Loading State */}
      {error ? (
        <Error error={error} />
      ) : loading ? (
        <>
          <Loading title='Events' />
        </>
      ) : events.length === 0 ? (
        <NoDataFound title='Events' />
      ) : (
        <div
          ref={scrollRef}
          className='flex bg-gray-200 rounded-lg overflow-x-auto gap-4 h-[550px] scroll-smooth p-4'
          style={{
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}>
          {events.map((event, index) => (
            <div
              key={index}
              className='flex-shrink-0 w-full md:w-1/2 h-full bg-white rounded-lg shadow-lg overflow-hidden'>
              <div className='bg-white rounded-lg shadow-lg relative h-full'>
                <div className='relative h-56 bg-[#143429]/20 rounded-t-md overflow-hidden border-b-[4px] border-emerald-900'>
                  <img
                    src={event.image}
                    alt={event.title}
                    className='h-full w-full object-cover bg-emerald-100'
                  />
                  <div className='flex flex-col text-center absolute top-0 left-4 font-medium bg-gradient-to-b from-emerald-800 to-emerald-950 text-white px-3 py-2 rounded-b-lg'>
                    <span className='text-sm'>{event.category || "N/A"}</span>
                  </div>
                </div>
                <div className='flex flex-col gap-3 p-4 pb-24 rounded-b-md'>
                  <div className='text-sm text-white font-medium  bg-emerald-800 w-fit px-3 py-1 rounded-full'>
                    {event.date || "N/A"}
                  </div>
                  <div className='text-lg font-semibold text-emerald-900 '>
                    <TruncateText text={event.title} maxLength={30} />
                  </div>
                  <div className='text-gray-600 text-sm'>
                    <TruncateText text={event.description} maxLength={60} />
                  </div>
                  <Link
                    to={`events/${event._id}`}
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
  );
};

const EventsSection = () => {
  return (
    <div id='events' className='flex justify-center w-full py-10 bg-gray-100'>
      <div className='w-full max-w-6xl flex justify-between items-start flex-col lg:flex-row gap-7 px-4 md:px-6 py-16'>
        <SuccessStoriesCarousel />
        <EventsCarousel />
      </div>
    </div>
  );
};

export default EventsSection;
