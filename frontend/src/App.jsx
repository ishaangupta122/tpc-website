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
import AchievementPage from './pages/Institution/AchievementPage';
import SuccessStory from './pages/Institution/SuccessStory';
import GallerySection from './pages/Institution/Gallery';
import NotFound from './components/NotFound';
import AboutPage from './pages/Institution/About';

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/" element={<HomePage />} />
					<Route path="/admission-page" element={<CollegePoliciesPage />} />
					<Route path="/hostel-page" element={<HostelPage />} />
					<Route path="/principal" element={<PrincipalProfile />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/admin-staff" element={<AdminStaff />} />
					<Route path="/managing-committee" element={<ManagingCommittee />} />
					<Route path="/placements-table" element={<PlacementsTracker />} />
					<Route path="/library" element={<LibraryPage />} />
					<Route path="/aicte-courses" element={<AICTE_Courses />} />
					<Route path="/events" element={<EventPage />} />
					<Route path="/achievements" element={<AchievementPage />} />
					<Route path="/success-story" element={<SuccessStory />} />
					<Route path="/gallery" element={<GallerySection />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
