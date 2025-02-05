import { useState } from 'react';
import { Home, Users, Calendar, Briefcase, Settings, User, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeLink, setActiveLink] = useState('/dashboard');

	const menuItems = [
		{ id: 1, name: 'Dashboard', to: '/', icon: Home },
		{ id: 2, name: 'Faculty List', to: '/faculty', icon: Users },
		{ id: 3, name: 'Faculty Profile', to: '/facultyProfile', icon: User },
		{ id: 4, name: 'Events & Updates', to: '/events', icon: Calendar },
		{ id: 5, name: 'Achievements', to: '/updates', icon: Trophy },
		{ id: 6, name: 'Placements', to: '/placements', icon: Briefcase },
		{ id: 7, name: 'Managing Committee', to: '/managing-committee', icon: Users },
		{ id: 8, name: 'Settings', to: '/settings', icon: Settings },
	];

	const handleNavigation = (path) => {
		setActiveLink(path);
		setIsOpen(false);
	};

	return (
		<div className="flex flex-col lg:flex-row h-full">
			{/* Sidebar for Desktop */}
			<div className="hidden lg:flex flex-col w-64 bg-white shadow-lg border-r border-neutral-200">
				{/* Logo Section */}
				<div className="p-4 flex flex-col items-start">
					<img src="tpc-logo.png" alt="Logo" className="h-16 w-auto" />
				</div>
				{/* Menu Items */}
				<div className="flex flex-col overflow-y-auto my-4">
					{menuItems.map((item) => (
						<Link
							key={item.id}
							to={item.to}
							onClick={() => handleNavigation(item.to)}
							className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-neutral-100 ${
								activeLink === item.to ? 'bg-green-100 text-green-600' : 'text-neutral-600'
							}`}>
							<item.icon className="w-5 h-5 mr-3" />
							{item.name}
						</Link>
					))}
				</div>
				{/* Profile Section */}
				{/* <div className="mt-auto p-4 border-t border-neutral-200">
					<div className="flex items-center space-x-3">
						<img
							src="profile-pic.jpg"
							alt="Profile"
							className="h-10 w-10 rounded-full object-cover"
						/>
						<div>
							<p className="text-sm font-medium text-neutral-800">Admin User</p>
							<p className="text-xs text-neutral-500">admin@college.edu</p>
						</div>
					</div>
				</div> */}
			</div>

			{/* Top Navbar for Mobile */}
			<div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200 px-4 flex items-center justify-between lg:hidden z-40">
				<button
					type="button"
					className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200"
					onClick={() => setIsOpen(!isOpen)}
					aria-controls="mobile-menu"
					aria-expanded={isOpen}>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				<img src="tpc-logo.png" alt="Logo" className="h-10 w-auto mx-auto" />
			</div>

			{/* Sidebar for Mobile */}
			{isOpen && (
				<div className="fixed inset-0 z-50 lg:hidden">
					<div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
					<div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
						<div className="p-4 flex items-center justify-between">
							<img src="tpc-logo.png" alt="Logo" className="h-16" />
							<button
								type="button"
								className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200"
								onClick={() => setIsOpen(false)}>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						{menuItems.map((item) => (
							<Link
								key={item.id}
								to={item.to}
								onClick={() => handleNavigation(item.to)}
								className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-neutral-100 ${
									activeLink === item.to ? 'bg-green-100 text-green-600' : 'text-neutral-600'
								}`}>
								<item.icon className="w-5 h-5 mr-3" />
								{item.name}
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
