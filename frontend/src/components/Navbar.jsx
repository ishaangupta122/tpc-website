import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Toggle the sidebar
	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	// Dynamic navigation links
	const navLinks = [
		{ name: 'Admissions', Link: 'admission-page' },
		{ name: 'Placements', Link: 'placements-table' },
		{ name: 'Hostel', Link: 'hostel-page' },
		{ name: 'Library', Link: 'library' },
		{ name: 'Committee', Link: 'managing-committee' },
		{ name: 'Principal', Link: 'principal' },
		{ name: 'Admin Staff', Link: 'admin-staff' },
	];

	return (
		<nav className="bg-white border-gray-200 sticky top-0 z-50 shadow-lg">
			<div className="max-w-screen-xl flex items-center justify-between mx-auto py-4 px-8">
				{/* Logo Section */}
				<a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src="./tpc-logo.png" alt="Logo" className="h-16" />
				</a>

				{/* Mobile Menu Button */}
				<button
					onClick={toggleSidebar}
					type="button"
					className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
					<span className="sr-only">Open main menu</span>
					<svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg>
				</button>

				{/* Desktop Navigation */}
				<div className="hidden lg:flex md:items-center md:space-x-8 mr-8">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							to={link.Link}
							className="text-sm font-medium text-gray-900 hover:text-[#98002E] uppercase">
							{link.name}
						</Link>
					))}
				</div>
			</div>

			{/* Sidebar for Mobile View */}
			<div
				className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-4/5 max-w-[350px] ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				}`}>
				<div className="flex items-center justify-between px-6 py-4 border-b">
					<a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
						<img src="./tpc-logo.png" alt="Logo" className="h-12" />
					</a>
					<button
						onClick={toggleSidebar}
						className="text-gray-500 hover:text-gray-700 focus:outline-none">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<ul className="flex flex-col mt-4 space-y-4 px-6">
					{navLinks.map((link) => (
						<li key={link.name}>
							<Link
								to={link.Link}
								className="block py-2 text-gray-900 hover:text-[#98002E] uppercase font-medium">
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</div>

			{/* Backdrop for Sidebar */}
			{isSidebarOpen && (
				<div
					onClick={toggleSidebar}
					className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>
			)}
		</nav>
	);
};

export default Navbar;
