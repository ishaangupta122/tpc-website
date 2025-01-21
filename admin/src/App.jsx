import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './Dashboard/View';
import FacultyManagement from './Faculty/View';
import Updates from './Updates/View';
import EventsCalendar from './Events/View';
import PlacementsTracker from './Placements/View';
import Settings from './Settings/View';
import FacultyProfile from './Faculty/Profile';
import AdminLogin from './components/Login';
import AdminSignup from './components/Signup';
import ManagingCommittee from './MngCommittee.jsx/View';

const App = () => {
	return (
		<BrowserRouter>
			<div className="flex h-screen overflow-hidden">
				<Navbar />
				<main className="flex-1 overflow-y-auto bg-[#E5E7EB]">
					<Routes>
						<Route path="/login" element={<AdminLogin />} />
						<Route path="/signup" element={<AdminSignup />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/faculty" element={<FacultyManagement />} />
						<Route path="/facultyProfile" element={<FacultyProfile />} />
						<Route path="/updates" element={<Updates />} />
						<Route path="/events" element={<EventsCalendar />} />
						<Route path="/placements" element={<PlacementsTracker />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/managing-committee" element={<ManagingCommittee />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
};

export default App;
