import { useState } from 'react';
import { Home, Users, Calendar, Bell, Briefcase, Settings, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeLink, setActiveLink] = useState('/dashboard');

	const menuItems = [
		{ id: 1, name: 'Dashboard', to: '/', icon: Home },
		{ id: 2, name: 'Faculty List', to: '/faculty', icon: Users },
		{ id: 3, name: 'Faculty Profile', to: '/facultyProfile', icon: User },
		{ id: 4, name: 'Events', to: '/events', icon: Calendar },
		{ id: 5, name: 'Updates', to: '/updates', icon: Bell },
		{ id: 6, name: 'Placements', to: '/placements', icon: Briefcase },
		{ id: 7, name: 'Managing Committee', to: '/managing-committee', icon: Users },
		{ id: 8, name: 'Settings', to: '/settings', icon: Settings },
	];

	const handleNavigation = (path) => {
		setActiveLink(path);
		setIsOpen(false);
	};

	return (
		<>
			<div className="lg:pl-64 pt-16 lg:pt-0">
				{/* Top Navbar for Mobile */}
				<div
					className={`lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200/60 px-8 flex items-center z-40 justify-between ${
						isOpen ? 'hidden' : 'block'
					}`}>
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
					<div className="flex items-center justify-center gap-2 ml-5">
						<img src="tpc-logo.png" alt="" className="h-16 " />
						<span className="text-lg font-bold text-red-700">Admin</span>
					</div>
				</div>

				{/* Desktop Sidebar */}
				<nav className="hidden lg:block fixed left-0 top-0 w-64 h-screen bg-white border-r border-neutral-200/60">
					<div className="px-3 py-4">
						<img src="tpc-logo.png" alt="logo" className="h-16 mb-8" />
						<div className="space-y-1 h-[60vh] mb-20 overflow-y-auto p-3">
							{menuItems.map((item) => (
								<Link
									key={item.id}
									to={item.to}
									onClick={() => handleNavigation(item.to)}
									className={`nav-link flex items-center w-full px-4 py-3 rounded-lg hover:bg-neutral-100 ${
										activeLink === item.to ? 'bg-blue-50 text-blue-600' : 'text-neutral-600'
									}`}>
									<item.icon className="w-5 h-5 mr-3" />
									{item.name}
									{activeLink === item.to && <ChevronRight className="ml-auto w-5 h-5" />}
								</Link>
							))}
						</div>
					</div>

					{/* Bottom Profile Section */}
					<div className="absolute bottom-0 w-full  h-20 border-t border-neutral-200/60">
						<div className="px-6 py-4">
							<Link
								to={'/settings'}
								onClick={() => handleNavigation('/settings')}
								className="flex items-center w-full">
								<img
									src="https://avatar.iran.liara.run/public"
									alt="Admin"
									className="w-10 h-10 rounded-full transition-opacity duration-300 opacity-100"
									loading="lazy"
								/>
								<div className="ml-3">
									<p className="text-sm font-medium text-neutral-700">Admin User</p>
									<p className="text-xs text-neutral-500">admin@college.edu</p>
								</div>
							</Link>
						</div>
					</div>
				</nav>

				{/* Mobile Menu Overlay */}
				{isOpen && (
					<div className="lg:hidden fixed inset-0 z-50">
						{/* Overlay Background */}
						<div
							className="fixed inset-0 bg-black bg-opacity-50"
							onClick={() => setIsOpen(false)}
						/>

						{/* Mobile Sidebar */}
						<div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
							<div className="px-3 py-4">
								<div className="flex items-center justify-between gap-2 mb-8">
									<img src="tpc-logo.png" alt="" className="h-16 " />
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

								<div className="space-y-1 overflow-y-auto max-h-[70vh] p-3">
									{menuItems.map((item) => (
										<Link
											key={item.id}
											to={item.to}
											onClick={() => handleNavigation(item.to)}
											className={`nav-link flex items-center w-full px-4 py-3 rounded-lg hover:bg-neutral-100 ${
												activeLink === item.to ? 'bg-blue-50 text-blue-600' : 'text-neutral-600'
											}`}>
											<item.icon className="w-5 h-5 mr-3" />
											{item.name}
											{activeLink === item.to && <ChevronRight className="ml-auto w-5 h-5" />}
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Navbar;
