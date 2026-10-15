import { lazy } from "react";

// Pages are code-split: each one is downloaded the first time it is visited.
const ContactPage = lazy(() => import("../pages/OtherPages/Contact"));
const EventPage = lazy(() => import("../pages/OtherPages/EventPage"));
const AchievementPage = lazy(() => import("../pages/OtherPages/AchievementPage"));
const Faculty = lazy(() => import("../pages/Institution/Faculty"));
const ManagingCommittee = lazy(() => import("../pages/Institution/MngCommittee"));
const CollegePoliciesPage = lazy(() => import("../pages/Academics/Admission"));
const PrincipalProfile = lazy(() => import("../pages/Institution/Principal"));
const AdminStaff = lazy(() => import("../pages/Institution/AdminStaff"));
const HostelPage = lazy(() => import("../pages/Academics/Hostel"));
const LibraryPage = lazy(() => import("../pages/Academics/Library"));
const PlacementsTracker = lazy(() => import("../pages/Academics/Placements"));
const AICTE_Courses = lazy(() => import("../pages/Academics/AICTE_Courses"));
const GallerySection = lazy(() => import("../pages/Institution/Gallery"));
const CollgeMagazines = lazy(() => import("../pages/OtherPages/Magazines"));
const FormsDownload = lazy(() => import("../pages/OtherPages/FormsDownload"));
const MentorsList = lazy(() => import("../pages/OtherPages/MentorsList"));
const MandatoryDisclosure = lazy(() => import("../pages/OtherPages/MandatoryDisclosure"));
const TPCNewsletter = lazy(() => import("../pages/OtherPages/TPCNewsletter"));
const EOA = lazy(() => import("../pages/OtherPages/EOA"));
const SafeWorkingEnv = lazy(() => import("../pages/OtherPages/SafeWorkingEnv"));
const MechanicalDepartment = lazy(() => import("../pages/Departments/Mechanical"));
const CSEDepartment = lazy(() => import("../pages/Departments/CSE"));
const ArchitecturalDepartment = lazy(() => import("../pages/Departments/Architectural"));
const CivilDepartment = lazy(() => import("../pages/Departments/Civil"));
const ElectricalDepartment = lazy(() => import("../pages/Departments/Electrical"));
const AppliedScienceDepartment = lazy(() => import("../pages/Departments/AppliedScience"));
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const AboutPage = lazy(() => import("../pages/Institution/About"));
const SuccessStory = lazy(() => import("../pages/OtherPages/SuccessStory"));
const FacultyProfile = lazy(() => import("../pages/OtherPages/FacultyProfile"));
// Development-only: not even bundled into production builds.
const StatesPreview = import.meta.env.DEV
  ? lazy(() => import("../pages/Dev/StatesPreview"))
  : null;

const departments = [
  { path: "/mechanical", component: <MechanicalDepartment /> },
  { path: "/cse", component: <CSEDepartment /> },
  { path: "/architectural", component: <ArchitecturalDepartment /> },
  { path: "/civil", component: <CivilDepartment /> },
  { path: "/electrical", component: <ElectricalDepartment /> },
  { path: "/applied-science", component: <AppliedScienceDepartment /> },
];

const departmentRoutes = departments.flatMap(({ path, component }) => [
  { path, element: component },
  { path: `${path}/achievements/:achievementId`, element: <AchievementPage /> },
  { path: `${path}/events/:eventId`, element: <EventPage /> },
]);

export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/faculty", element: <Faculty /> },
  { path: "/faculty/:facultyId", element: <FacultyProfile /> },
  { path: "/managing-committee", element: <ManagingCommittee /> },
  { path: "/admission", element: <CollegePoliciesPage /> },
  { path: "/principal", element: <PrincipalProfile /> },
  { path: "/admin-staff", element: <AdminStaff /> },
  { path: "/hostel", element: <HostelPage /> },
  { path: "/library", element: <LibraryPage /> },
  { path: "/placements", element: <PlacementsTracker /> },
  { path: "/aicte-courses", element: <AICTE_Courses /> },
  { path: "/gallery", element: <GallerySection /> },
  { path: "/magazines", element: <CollgeMagazines /> },
  { path: "/forms-download", element: <FormsDownload /> },
  { path: "/mentors-list", element: <MentorsList /> },
  { path: "/mandatory-disclosure", element: <MandatoryDisclosure /> },
  { path: "/tpc-newsletter", element: <TPCNewsletter /> },
  { path: "/eoa", element: <EOA /> },
  { path: "/safe-working-environment", element: <SafeWorkingEnv /> },
  { path: "/success-story/:storyId", element: <SuccessStory /> },
  { path: "/events/:eventId", element: <EventPage /> },
  { path: "/achievements/:achievementId", element: <AchievementPage /> },
  ...departmentRoutes, // Merge Department-Specific Routes Dynamically
  // Development-only gallery of the loading / error / empty states.
  ...(import.meta.env.DEV
    ? [{ path: "/states-preview", element: <StatesPreview /> }]
    : []),
];
