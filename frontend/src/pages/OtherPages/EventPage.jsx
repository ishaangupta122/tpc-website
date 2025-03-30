import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection";
import { fetchEventById } from "../../context/EventsContext";
import Loading from "../../components/Loading";

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: event?.title || "Event Details", href: `/events/${eventId}` },
  ];

  const fetchEvent = async () => {
    setLoading(true);
    const data = await fetchEventById(eventId);
    setEvent(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  return (
    <>
      <HeroSection
        imageUrl={"/rec_gate.jpg"}
        title='Event Details'
        breadcrumbs={breadcrumbs}
      />

      {loading ? (
        <>
          <Loading title='Event Details' />
        </>
      ) : (
        <div className='max-w-5xl mx-auto py-16 px-4 md:px-6'>
          <div className='mb-8'>
            <p className='text-gray-600 mb-2 tracking-wide uppercase text-sm font-medium'>
              {event.date}
            </p>
            <h1 className='text-3xl font-medium text-gray-900 mb-6'>
              {event.title}
            </h1>
          </div>
          <img
            src={event.image}
            alt={event.title}
            className='w-full h-[600px] object-cover object-top mb-8 shadow-lg rounded-md'
          />
          <p className='text-md text-gray-800 font-normal text-justify space-y-4'>
            {event.description}
          </p>
        </div>
      )}
    </>
  );
};

export default EventPage;
