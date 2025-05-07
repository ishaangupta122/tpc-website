import ContactPage from "../pages/OtherPages/Contact";
import EventPage from "../pages/OtherPages/EventPage";
import AchievementPage from "../pages/OtherPages/AchievementPage";
import Faculty from "../pages/Institution/Faculty";
import ManagingCommittee from "../pages/Institution/MngCommittee";
import CollegePoliciesPage from "../pages/Academics/Admission";
import PrincipalProfile from "../pages/Institution/Principal";
import AdminStaff from "../pages/Institution/AdminStaff";
import HostelPage from "../pages/Academics/Hostel";
import LibraryPage from "../pages/Academics/Library";
import PlacementsTracker from "../pages/Academics/Placements";
import AICTE_Courses from "../pages/Academics/AICTE_Courses";
import GallerySection from "../pages/Institution/Gallery";
import CollgeMagazines from "../pages/OtherPages/Magazines";
import FormsDownload from "../pages/OtherPages/FormsDownload";
import MentorsList from "../pages/OtherPages/MentorsList";
import MandatoryDisclosure from "../pages/OtherPages/MandatoryDisclosure";
import TPCNewsletter from "../pages/OtherPages/TPCNewsletter";
import EOA from "../pages/OtherPages/EOA";
import SafeWorkingEnv from "../pages/OtherPages/SafeWorkingEnv";
import MechanicalDepartment from "../pages/Departments/Mechanical";
import CSEDepartment from "../pages/Departments/CSE";
import ArchitecturalDepartment from "../pages/Departments/Architectural";
import CivilDepartment from "../pages/Departments/Civil";
import ElectricalDepartment from "../pages/Departments/Electrical";
import AppliedScienceDepartment from "../pages/Departments/AppliedScience";
import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/Institution/About";
import SuccessStory from "../pages/OtherPages/SuccessStory";
import FacultyProfile from "../pages/OtherPages/FacultyProfile";

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
];
