import { useParams } from "react-router-dom";
import HeroSection from "../../components/HeroSection";
import { useEvent } from "../../hooks/useResources";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const EventPage = () => {
  const { eventId } = useParams();
  const { data: event, loading, error, refresh } = useEvent(eventId);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: event?.title || "Event Details", href: `/events/${eventId}` },
  ];

  return (
    <>
      <HeroSection
        imageUrl={"/rec_gate.jpg"}
        title="Event Details"
        breadcrumbs={breadcrumbs}
      />

      {error ? (
        <Error error={error} onRetry={refresh} />
      ) : loading ? (
        <>
          <Loading title="Event Details" />
        </>
      ) : (
        <div className="max-w-5xl mx-auto py-16 px-4 md:px-6">
          <div className="mb-8">
            <p className="text-gray-600 mb-2 tracking-wide uppercase text-sm font-medium">
              {event.date}
            </p>
            <h1 className="detail-title mb-6">
              {event.title}
            </h1>
          </div>
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-[600px] object-cover object-top mb-8 shadow-lg rounded-md"
          />
          <p className="text-md text-gray-800 font-normal text-justify space-y-4">
            {event.description}
          </p>
        </div>
      )}
    </>
  );
};

export default EventPage;
