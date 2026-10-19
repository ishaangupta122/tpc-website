import { useParams } from "react-router-dom";
import HeroSection from "../../components/HeroSection";
import { useEvent } from "../../hooks/useResources";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import DetailContent from "../../components/DetailContent";
import { formatDate } from "../../utils/formatDate";

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
        <Loading title="Event Details" />
      ) : (
        <DetailContent
          backTo="/#events"
          backLabel="All events"
          eyebrow={[formatDate(event.date), event.category]
            .filter(Boolean)
            .join("  •  ")}
          title={event.title}
          image={event.image}
          description={event.description}
          blocks={event.blocks}
        />
      )}
    </>
  );
};

export default EventPage;
