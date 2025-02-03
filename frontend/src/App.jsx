import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './pages/Home/HomePage';
import HostelPage from './pages/Academics/Hostel';
import PlacementsTracker from './pages/Academics/Placements';
import PrincipalProfile from './pages/Institution/Principal';
import AdminStaff from './pages/Institution/AdminStaff';
import LibraryPage from './pages/Academics/Library';
import AICTE_Courses from './pages/Academics/AICTE_Courses';
import CollegePoliciesPage from './pages/Academics/Admission';
import ManagingCommittee from './pages/Institution/MngCommittee';
import AchievementPage from './pages/OtherPages/AchievementPage';
import SuccessStory from './pages/OtherPages/SuccessStory';
import GallerySection from './pages/Institution/Gallery';
import NotFound from './components/NotFound';
import AboutPage from './pages/Institution/About';
import StudentProfile from './pages/Users/Student';
import Faculty from './pages/Institution/Faculty';
import CollgeMagazines from './pages/OtherPages/Magazines';
import FormsDownload from './pages/OtherPages/FormsDownload';
import MentorsList from './pages/OtherPages/MentorsList';
import ContactPage from './pages/OtherPages/Contact';
import EventPage from './pages/OtherPages/EventPage';
import TPCNewsletter from './pages/OtherPages/TPCNewsletter';
import MandatoryDisclosure from './pages/OtherPages/MandatoryDisclosure';
import EOA from './pages/OtherPages/EOA';
import ScrollToTop from './components/ScrollToTop';
import FacultyProfile from './pages/Users/Faculty';
import MechanicalDepartment from './pages/Departments/Mechanical';
import CSEDepartment from './pages/Departments/CSE';
import AppliedScienceDepartment from './pages/Departments/AppliedSci';
import ArchitecturalDepartment from './pages/Departments/Architect';
import CivilDepartment from './pages/Departments/Civil';
import ElectricalDepartment from './pages/Departments/Electrical';
import MessageBox from './components/MsgBox';
import SafeWorkingEnv from './pages/OtherPages/SafeWorkingEnv';

function App() {
	return (
		<>
			<BrowserRouter>
				<ScrollToTop />
				<Navbar />
				<MessageBox />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/managing-committee" element={<ManagingCommittee />} />
					<Route path="/admission" element={<CollegePoliciesPage />} />
					<Route path="/principal" element={<PrincipalProfile />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/hostel" element={<HostelPage />} />
					<Route path="/library" element={<LibraryPage />} />
					<Route path="/admin-staff" element={<AdminStaff />} />
					<Route path="/placements" element={<PlacementsTracker />} />
					<Route path="/aicte-courses" element={<AICTE_Courses />} />
					<Route path="/events/:eventId" element={<EventPage />} />
					<Route path="/achievements/:achievementId" element={<AchievementPage />} />
					<Route path="/success-story/:storyId" element={<SuccessStory />} />
					<Route path="/gallery" element={<GallerySection />} />
					<Route path="/faculty" element={<Faculty />} />
					<Route path="/faculty/:facultyId" element={<FacultyProfile />} />
					<Route path="/student-profile" element={<StudentProfile />} />
					<Route path="/applied-science" element={<AppliedScienceDepartment />} />
					<Route path="/architectural" element={<ArchitecturalDepartment />} />
					<Route path="/cse" element={<CSEDepartment />} />
					<Route path="/civil" element={<CivilDepartment />} />
					<Route path="/electrical" element={<ElectricalDepartment />} />
					<Route path="/mechanical" element={<MechanicalDepartment />} />
					<Route path="/safe-working-environment" element={<SafeWorkingEnv />} />
					<Route path="/magazines" element={<CollgeMagazines />} />
					<Route path="/forms-download" element={<FormsDownload />} />
					<Route path="/mentors-list" element={<MentorsList />} />
					<Route path="/mandatory-disclosure" element={<MandatoryDisclosure />} />
					<Route path="/tpc-newsletter" element={<TPCNewsletter />} />
					<Route path="/eoa" element={<EOA />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
