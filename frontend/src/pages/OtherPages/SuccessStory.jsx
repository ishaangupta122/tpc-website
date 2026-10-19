import HeroSection from "../../components/HeroSection";
import { useParams } from "react-router-dom";
import { useSuccessStory } from "../../hooks/useResources";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import DetailContent from "../../components/DetailContent";

const SuccessStory = () => {
  const { storyId } = useParams();
  const { data: successStory, loading, error, refresh } = useSuccessStory(storyId);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    {
      label: successStory?.title || "Success Story Details",
      href: `/success-story/${storyId}`,
    },
  ];

  return (
    <>
      <HeroSection
        imageUrl="/rec_gate.jpg"
        title="Success Story"
        breadcrumbs={breadcrumbs}
      />
      {error ? (
        <Error error={error} onRetry={refresh} />
      ) : loading ? (
        <Loading title="Success Story Details" />
      ) : (
        <DetailContent
          backTo="/#events"
          backLabel="All success stories"
          title={successStory.title}
          image={successStory.image}
          description={successStory.description}
          blocks={successStory.blocks}
        />
      )}
    </>
  );
};

export default SuccessStory;
