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
import CollegePoliciesPage from './pages/Academics/Admission2';
import ManagingCommittee from './pages/Institution/MngCommittee';

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/admission-page" element={<CollegePoliciesPage />} />
					<Route path="/hostel-page" element={<HostelPage />} />
					<Route path="/principal" element={<PrincipalProfile />} />
					<Route path="/admin-staff" element={<AdminStaff />} />
					<Route path="/managing-committee" element={<ManagingCommittee />} />
					<Route path="/placements-table" element={<PlacementsTracker />} />
					<Route path="/library" element={<LibraryPage />} />
					<Route path="/aicte-courses" element={<AICTE_Courses />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
