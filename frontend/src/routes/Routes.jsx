import { lazy } from "react";
import { departments } from "../data/departments";
import { DOCUMENT_PAGES } from "../data/documentPages";

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
const DepartmentPage = lazy(() => import("../components/DepartmentPage"));
const DocumentPage = lazy(() => import("../pages/OtherPages/DocumentPage"));
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const AboutPage = lazy(() => import("../pages/Institution/About"));
const DepartmentCustomPage = lazy(() => import("../pages/Departments/DepartmentCustomPage"));
const SuccessStory = lazy(() => import("../pages/OtherPages/SuccessStory"));
const FacultyProfile = lazy(() => import("../pages/OtherPages/FacultyProfile"));
// Development-only: not even bundled into production builds.
const StatesPreview = import.meta.env.DEV
  ? lazy(() => import("../pages/Dev/StatesPreview"))
  : null;

const departmentRoutes = Object.entries(departments).flatMap(([key, department]) => {
  const path = department.basePath;
  return [
    { path, element: <DepartmentPage {...department} deptKey={key} /> },
    { path: `${path}/pages/:slug`, element: <DepartmentCustomPage deptKey={key} /> },
    { path: `${path}/achievements/:achievementId`, element: <AchievementPage /> },
    { path: `${path}/events/:eventId`, element: <EventPage /> },
  ];
});

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
  { path: "/success-story/:storyId", element: <SuccessStory /> },
  { path: "/events/:eventId", element: <EventPage /> },
  { path: "/achievements/:achievementId", element: <AchievementPage /> },
  ...DOCUMENT_PAGES.map((page) => ({ path: page.path, element: <DocumentPage {...page} /> })),
  ...departmentRoutes, // Merge Department-Specific Routes Dynamically
  // Development-only gallery of the loading / error / empty states.
  ...(import.meta.env.DEV
    ? [{ path: "/states-preview", element: <StatesPreview /> }]
    : []),
];
