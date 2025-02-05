import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './Dashboard/View';
import FacultyManagement from './Faculty/View';
import Updates from './Updates/View';
import EventsCalendar from './Events/View';
import Settings from './Settings/View';
import FacultyProfile from './Faculty/Profile';
import AdminLogin from './components/Login';
import AdminSignup from './components/Signup';
import ManagingCommittee from './MngCommittee.jsx/View';
import { FacultyProvider } from './context/FacultyContext';
import { useState } from 'react';
import Placements from './Placements/View';
// Dummy authentication status
const isAuthenticated = localStorage.getItem('auth') === 'true';

const ProtectedRoute = ({ element }) => {
	return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
	return (
		<BrowserRouter>
			<FacultyProvider>
				<div className="flex h-screen overflow-hidden">
					<Navbar />
					<main className="flex-1 overflow-y-auto bg-[#E5E7EB]">
						<Routes>
							<Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
							<Route path="/login" element={<AdminLogin />} />
							<Route path="/signup" element={<AdminSignup />} />
							<Route path="/faculty" element={<ProtectedRoute element={<FacultyManagement />} />} />
							<Route
								path="/facultyProfile"
								element={<ProtectedRoute element={<FacultyProfile />} />}
							/>
							<Route path="/updates" element={<ProtectedRoute element={<Updates />} />} />
							<Route path="/events" element={<ProtectedRoute element={<EventsCalendar />} />} />
							<Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
							<Route path="/placements" element={<ProtectedRoute element={<Placements />} />} />
							<Route
								path="/managing-committee"
								element={<ProtectedRoute element={<ManagingCommittee />} />}
							/>
						</Routes>
					</main>
				</div>
			</FacultyProvider>
		</BrowserRouter>
	);
};

export default App;
