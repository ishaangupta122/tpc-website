import HeroSection from "../../components/HeroSection";
import { useParams } from "react-router-dom";
import { useAchievement } from "../../hooks/useResources";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import DetailContent from "../../components/DetailContent";
import { formatDate } from "../../utils/formatDate";

const AchievementPage = () => {
  const { achievementId } = useParams();
  const { data: achievement, loading, error, refresh } = useAchievement(achievementId);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    {
      label: achievement?.title || "Achievements Details",
      href: `/achievements/${achievementId}`,
    },
  ];

  return (
    <>
      <HeroSection
        imageUrl="/boys_hostel.jpg"
        title="Latest Achievements"
        breadcrumbs={breadcrumbs}
      />

      {error ? (
        <Error error={error} onRetry={refresh} />
      ) : loading ? (
        <Loading title="Achievement Details" />
      ) : (
        <DetailContent
          backTo="/#achievements"
          backLabel="All achievements"
          eyebrow={[formatDate(achievement.date), achievement.category]
            .filter(Boolean)
            .join("  •  ")}
          title={achievement.title}
          image={achievement.image}
          description={achievement.description}
          blocks={achievement.blocks}
        />
      )}
    </>
  );
};

export default AchievementPage;
