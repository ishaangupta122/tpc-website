import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Navbar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState(null);
	const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	const toggleMobileDropdown = (linkName) => {
		setActiveMobileDropdown(activeMobileDropdown === linkName ? null : linkName);
	};

	// Enhanced navigation links with both dropdown and normal links
	const navLinks = [
		{
			name: 'Institution',
			type: 'dropdown',
			dropdownItems: [
				{ name: 'About Us', link: 'about' },
				{ name: 'Managing Committee', link: 'managing-committee' },
				{ name: 'Admin Staff', link: 'admin-staff' },
				{ name: 'Principal', link: 'principal' },
				{ name: 'Gallery', link: 'gallery' },
			],
		},
		{
			name: 'Academics',
			type: 'dropdown',
			dropdownItems: [
				{ name: 'Admission', link: 'admission-page' },
				{ name: 'Hostel', link: 'hostel-page' },
				{ name: 'Library', link: 'library' },
				{ name: 'Placements', link: 'placements-table' },
				{ name: 'AICTE Approved Courses', link: 'aicte-courses' },
			],
		},
		{
			name: 'Departments',
			type: 'dropdown',
			dropdownItems: [
				{ name: 'Applied Science', link: 'applied-science' },
				{ name: 'Computer Science Engineering', link: 'cse' },
				{ name: 'Civil Engineering', link: 'civil' },
				{ name: 'Mechanical Engineering', link: 'mechanical' },
				{ name: 'Electrical Engineering', link: 'electrical' },
				{ name: 'Architectural Assistantship', link: 'architectural' },
			],
		},
		{
			name: 'Faculty',
			type: 'dropdown',
			dropdownItems: [
				{ name: 'Applied Science', link: 'applied-science-faculty' },
				{ name: 'Computer Science Engineering', link: 'cse-faculty' },
				{ name: 'Civil Engineering', link: 'civil-faculty' },
				{ name: 'Mechanical Engineering', link: 'mechanical-faculty' },
				{ name: 'Electrical Engineering', link: 'electrical-faculty' },
				{ name: 'Architectural Assistantship', link: 'architectural-faculty' },
			],
		},
		{
			name: 'Placements',
			link: 'placements-table',
			type: 'normal',
		},
		{
			name: 'Contact',
			link: 'contact',
			type: 'normal',
		},
	];

	return (
		<nav className="bg-gradient-to-b from-[#324E44] to-[#143429] sticky top-0 z-50 shadow-lg">
			<div className="max-w-screen-xl flex items-center justify-between mx-auto h-[90px] px-4 md:px-8">
				{/* Logo Section */}
				<a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src="./tpc-logo.png" alt="Logo" className="h-12 md:h-16" />
				</a>

				{/* Mobile Menu Button */}
				<button
					onClick={toggleSidebar}
					type="button"
					className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200">
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

				{/* Desktop Navigation with Mixed Links */}
				<div className="hidden lg:flex items-center  xl:mr-6 lg:mr-0 h-full">
					{navLinks.map((link) => (
						<div
							key={link.name}
							className={`relative h-full group ${
								link.type === 'dropdown' ? 'cursor-pointer' : ''
							}`}
							onMouseEnter={() => link.type === 'dropdown' && setActiveDropdown(link.name)}
							onMouseLeave={() => link.type === 'dropdown' && setActiveDropdown(null)}>
							<Link
								to={link.link}
								className="flex items-center space-x-1 text-sm font-normal text-white hover:text-gray-200 uppercase  h-full px-3">
								<span>{link.name}</span>
								{link.type === 'dropdown' && (
									<ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
								)}
							</Link>

							{/* Desktop Dropdown Menu - Only for dropdown type */}
							{link.type === 'dropdown' && (
								<div
									className={`absolute left-1/2 -translate-x-1/2  w-52 bg-white rounded-md shadow-lg transition-all duration-200 ease-in-out ${
										activeDropdown === link.name
											? 'opacity-100 visible translate-y-0'
											: 'opacity-0 invisible -translate-y-2'
									}`}>
									<div className="py-2 px-1">
										{link.dropdownItems?.map((item) => (
											<Link
												key={item.name}
												to={item.link}
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-800 transition-colors duration-150 rounded-md">
												{item.name}
											</Link>
										))}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Mobile Sidebar */}
			<div
				className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 w-[280px] overflow-y-auto ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				}`}>
				<div className="flex items-center justify-between px-4 py-4 border-b">
					<a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
						<img src="./tpc-logo.png" alt="Logo" className="h-10" />
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

				{/* Mobile Navigation Links */}
				<div className="flex flex-col px-4 py-2">
					{navLinks.map((link) => (
						<div key={link.name} className="border-b border-gray-100 last:border-b-0">
							<div
								className="flex items-center justify-between py-3 cursor-pointer"
								onClick={() => link.type === 'dropdown' && toggleMobileDropdown(link.name)}>
								<Link
									to={link.link}
									className="text-gray-900 hover:text-[#98002E] uppercase text-sm font-medium"
									onClick={(e) => {
										if (link.type === 'dropdown') {
											e.stopPropagation();
										}
									}}>
									{link.name}
								</Link>
								{link.type === 'dropdown' && (
									<ChevronRight
										className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
											activeMobileDropdown === link.name ? 'rotate-90' : ''
										}`}
									/>
								)}
							</div>
							{/* Mobile Dropdown Items - Only for dropdown type */}
							{link.type === 'dropdown' && (
								<div
									className={`overflow-hidden transition-all duration-200 ease-in-out ${
										activeMobileDropdown === link.name ? 'max-h-64' : 'max-h-0'
									}`}>
									<div className="pb-3 pl-4 space-y-2">
										{link.dropdownItems?.map((item) => (
											<Link
												key={item.name}
												to={item.link}
												className="block py-1.5 text-sm text-gray-600 hover:text-[#98002E]">
												{item.name}
											</Link>
										))}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Backdrop for Mobile Sidebar */}
			{isSidebarOpen && (
				<div
					onClick={toggleSidebar}
					className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"></div>
			)}
		</nav>
	);
};

export default Navbar;
