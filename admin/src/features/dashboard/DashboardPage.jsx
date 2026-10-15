import {
  BarChart4,
  Bell,
  Calendar,
  FileText,
  Image,
  Rocket,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  useAchievements,
  useCommittee,
  useDocuments,
  useEvents,
  useFaculty,
  useGallery,
  useNotices,
  usePlacements,
  useSuccessStories,
} from "../../context";
import { useAuth } from "../../context";
import PageContainer from "../../components/ui/PageContainer";

// One entry per admin page. `useCount` returns { count, loading, error }.
const useCountOf = (useResource, pick = (r) => r.items.length) => {
  const resource = useResource();
  return {
    count: pick(resource),
    loading: resource.loading,
    error: resource.error,
  };
};

const SECTIONS = [
  {
    label: "Faculty",
    action: "Add Faculty",
    to: "/faculty",
    icon: UserPlus,
    color: "text-green-600 bg-green-100",
    useCount: () => useCountOf(useFaculty),
  },
  {
    label: "Events",
    action: "Add Event",
    to: "/events",
    icon: Calendar,
    color: "text-purple-600 bg-purple-100",
    useCount: () => useCountOf(useEvents),
  },
  {
    label: "Achievements",
    action: "Add Achievement",
    to: "/achievements",
    icon: Trophy,
    color: "text-orange-600 bg-orange-100",
    useCount: () => useCountOf(useAchievements),
  },
  {
    label: "Success Stories",
    action: "Add Success Story",
    to: "/success-stories",
    icon: Rocket,
    color: "text-indigo-600 bg-indigo-100",
    useCount: () => useCountOf(useSuccessStories),
  },
  {
    label: "Placement Records",
    action: "Add Placement",
    to: "/placements",
    icon: BarChart4,
    color: "text-emerald-600 bg-emerald-100",
    useCount: () => useCountOf(usePlacements, (r) => r.rows.length),
  },
  {
    label: "Committee Members",
    action: "Add Committee Member",
    to: "/managing-committee",
    icon: Users,
    color: "text-yellow-600 bg-yellow-100",
    useCount: () => useCountOf(useCommittee),
  },
  {
    label: "Gallery Images",
    action: "Add Gallery Image",
    to: "/gallery",
    icon: Image,
    color: "text-sky-600 bg-sky-100",
    useCount: () => useCountOf(useGallery),
  },
  {
    label: "Notices",
    action: "Add Notice",
    to: "/notices",
    icon: Bell,
    color: "text-red-600 bg-red-100",
    useCount: () => useCountOf(useNotices),
  },
  {
    label: "Documents",
    action: "Add Document",
    to: "/documents",
    icon: FileText,
    color: "text-teal-600 bg-teal-100",
    useCount: () => useCountOf(useDocuments),
  },
];

const StatCard = ({ section }) => {
  const { count, loading, error } = section.useCount();
  const Icon = section.icon;
  return (
    <Link
      to={section.to}
      className="flex items-center gap-4 p-4 bg-white border border-neutral-200/60 rounded-lg hover:shadow-md hover:border-neutral-300 transition">
      <span className={`p-3 rounded-lg ${section.color}`}>
        <Icon size={24} />
      </span>
      <div>
        <p className="text-2xl font-bold text-neutral-800">
          {error ? "–" : loading ? "…" : count}
        </p>
        <p className="text-sm text-neutral-500">{section.label}</p>
      </div>
    </Link>
  );
};

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <PageContainer>
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">
            Welcome, {user?.name || "Admin"}
          </h1>
          <p className="text-neutral-500">
            Manage College Data with Quick Actions
          </p>
        </div>
        <button
          className="bg-red-600 text-white px-4 py-2 font-semibold rounded-md cursor-pointer mr-2 hover:bg-red-500 transition-colors"
          type="button"
          onClick={handleLogout}>
          Log Out
        </button>
      </div>

      {/* Overview: a live count for every page */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-800 mb-3">
          Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((section) => (
            <StatCard key={section.to} section={section} />
          ))}
        </div>
      </div>

      {/* Quick actions: jump to a page to add something */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200/60">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          {SECTIONS.map((section) => (
            <Link
              key={section.to}
              to={section.to}
              className="flex items-center space-x-2 p-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
              <span className={`w-6 h-6 ${section.color.split(" ")[0]}`}>
                <section.icon size={24} />
              </span>
              <span className="text-neutral-700">{section.action}</span>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
