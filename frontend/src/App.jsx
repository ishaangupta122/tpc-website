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
import EventPage from './pages/Institution/EventPage';
import AchievementPage from './pages/OtherPages/AchievementPage';
import SuccessStory from './pages/OtherPages/SuccessStory';
import GallerySection from './pages/Institution/Gallery';
import NotFound from './components/NotFound';
import AboutPage from './pages/Institution/About';
import StudentProfile from './pages/Users/Student';
import DepartmentPage from './pages/Departments/CSE';
import Faculty from './pages/Institution/Faculty';
import CollgeMagazines from './pages/OtherPages/Magazines';
import FormsDownload from './pages/OtherPages/FormsDownload';
import MentorsList from './pages/OtherPages/MentorsList';
import ContactPage from './pages/OtherPages/Contact';

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/" element={<HomePage />} />
					<Route path="/admission" element={<CollegePoliciesPage />} />
					<Route path="/hostel" element={<HostelPage />} />
					<Route path="/principal" element={<PrincipalProfile />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/admin-staff" element={<AdminStaff />} />
					<Route path="/managing-committee" element={<ManagingCommittee />} />
					<Route path="/placements" element={<PlacementsTracker />} />
					<Route path="/library" element={<LibraryPage />} />
					<Route path="/aicte-courses" element={<AICTE_Courses />} />
					<Route path="/events" element={<EventPage />} />
					<Route path="/achievements" element={<AchievementPage />} />
					<Route path="/success-story" element={<SuccessStory />} />
					<Route path="/gallery" element={<GallerySection />} />
					<Route path="/faculty" element={<Faculty />} />
					<Route path="/student-profile" element={<StudentProfile />} />
					<Route path="/cse" element={<DepartmentPage />} />
					<Route path="/magazines" element={<CollgeMagazines />} />
					<Route path="/forms-download" element={<FormsDownload />} />
					<Route path="/mentors-list" element={<MentorsList />} />
					<Route path="/contact" element={<ContactPage />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
