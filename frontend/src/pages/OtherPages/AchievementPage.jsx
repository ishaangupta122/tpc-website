import HeroSection from "../../components/HeroSection";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAchievementsById } from "../../context/AchievementsContext";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const AchievementPage = () => {
  const { achievementId } = useParams();
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    {
      label: achievement?.title || "Achievements Details",
      href: `/achievements/${achievementId}`,
    },
  ];

  const fetchAchievement = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAchievementsById(achievementId);
      setAchievement(data);
    } catch (err) {
      setError(err.message || "Failed to fetch achievement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievement();
  }, [achievementId]);

  if (loading) {
    return;
  }

  return (
    <>
      <HeroSection
        imageUrl="/boys_hostel.jpg"
        title="Latest Achievements"
        breadcrumbs={breadcrumbs}
      />

      {error ? (
        <Error error={error} />
      ) : loading ? (
        <>
          <Loading title="Achievement Details" />
        </>
      ) : (
        <div className="max-w-5xl mx-auto py-16 px-4 md:px-6">
          <div className="mb-8">
            <p className="text-gray-600 mb-2 tracking-wide uppercase text-sm font-medium">
              {achievement.category}
            </p>
            <h1 className="text-3xl font-medium text-gray-900 mb-6">
              {achievement.title}
            </h1>
          </div>
          <img
            src={achievement.image}
            alt={achievement.title}
            className="w-full h-[600px] object-cover object-top mb-8 shadow-lg rounded-md"
          />
          <p className="text-md text-gray-800 font-normal text-justify space-y-4">
            {achievement.description}
          </p>
        </div>
      )}
    </>
  );
};

export default AchievementPage;
