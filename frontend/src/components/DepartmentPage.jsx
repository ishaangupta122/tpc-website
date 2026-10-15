import { useMemo } from "react";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import { formatDate } from "../utils/formatDate";
import { useAchievements } from "../hooks/useResources";
import { USE_MOCK_DATA } from "../config/env";
import { mockDepartmentAchievements } from "../data/mockData";

// Shared styles so every card and heading on the page matches.
const cardClass =
  "bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden";
const cardBodyClass = "p-6 md:p-8";
const bodyTextClass = "text-sm text-gray-600 text-justify";

// Section heading: green word + black word, uppercase.
const SectionHeading = ({ first, second }) => (
  <h2 className="section-title mb-6">
    {first} <span className="text-black">{second}</span>
  </h2>
);

const DepartmentPage = ({
  name,
  category,
  basePath,
  heroImage,
  about,
  hod,
  achievements: ownAchievements,
}) => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: name, href: basePath },
  ];
  const { data: allUpdates } = useAchievements();

  // Server achievements for this department; falls back to the static list
  // while mock mode is on and the server has none (see data/mockData.js).
  const achievementList = useMemo(() => {
    const own = allUpdates.filter((item) => item.category === category);
    if (own.length > 0 || !USE_MOCK_DATA) return own;
    return ownAchievements || mockDepartmentAchievements;
  }, [allUpdates, category, ownAchievements]);

  return (
    <>
      <HeroSection
        imageUrl={heroImage}
        title={name}
        breadcrumbs={breadcrumbs}
      />

      <div className="bg-white">
        <div className="site-container py-10 md:py-14">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* About the department */}
              <article className={`${cardClass} ${cardBodyClass}`}>
                <SectionHeading first="About the" second="Department" />
                <div className={`space-y-4 ${bodyTextClass}`}>
                  {about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>

              {/* Head of department (only when the college site names one) */}
              {hod && (
                <article className={`${cardClass} ${cardBodyClass}`}>
                  <SectionHeading first="Head of" second="Department" />
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <img
                      src={hod.image}
                      alt={hod.name}
                      className="w-32 h-32 shrink-0 rounded-full object-cover border-2 border-green-800"
                      loading="lazy"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="card-title">{hod.name}</h3>
                      <p className="text-sm font-medium">
                        ({hod.designation || "Head of Department"})
                      </p>
                      <p className={`mt-4 ${bodyTextClass}`}>{hod.bio}</p>
                    </div>
                  </div>
                </article>
              )}
            </div>

            {/* Achievements: matches the height of the left column on large
                screens and scrolls inside, so a long list never stretches the page */}
            <aside className="lg:col-span-4 lg:relative lg:min-h-[300px]">
              <div className={`${cardClass} ${cardBodyClass} flex flex-col lg:absolute lg:inset-0`}>
                <SectionHeading first="Department" second="Achievements" />
                {achievementList.length === 0 && (
                  <p className="text-sm text-gray-600">No achievements available.</p>
                )}
                <ul className="flex-1 min-h-0 max-h-[480px] lg:max-h-none overflow-y-auto pr-2 divide-y divide-gray-200">
                  {achievementList.map((achievement) => (
                    <li key={achievement._id} className="py-5 first:pt-0 last:pb-0">
                      <Link
                        to={`${basePath}/achievements/${achievement._id}`}
                        className="group block">
                        {achievement.date && (
                          <span className="block text-xs font-medium text-emerald-800 mb-1">
                            {formatDate(achievement.date)}
                          </span>
                        )}
                        <span className="block text-sm font-semibold text-black group-hover:text-emerald-800 transition-colors duration-150">
                          {achievement.title}
                        </span>
                        {achievement.description && (
                          <span className="mt-1 text-sm text-gray-600 line-clamp-3">
                            {achievement.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </>
  );
};

export default DepartmentPage;
