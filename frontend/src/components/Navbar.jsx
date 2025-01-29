import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, User, Users } from 'lucide-react';

const Navbar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState(null);
	const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
	const toggleMobileDropdown = (linkName) => {
		setActiveMobileDropdown(activeMobileDropdown === linkName ? null : linkName);
	};

	return (
		<div className="sticky top-0 z-50">
			{/* Top Navbar */}
			<div className="hidden lg:block bg-gradient-to-b from-emerald-800 to-emerald-950 border-b">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex items-center justify-between h-14">
						<div className="flex items-center space-x-6">
							<Link
								to="/admission-enquiry"
								className="flex flex-col justify-center items-center text-sm text-white hover:text-emerald-100 transition-colors"
								style={{ animation: 'blink 1s steps(2, start) infinite' }}>
								<span className="">+91 XXXXX XXXXX</span>
								Admission Enquiry
								<style>
									{`
    @keyframes blink {
      50%, 100% { opacity: 1; }
      0% { opacity: 0; }
    }
  `}
								</style>
							</Link>
							<Link
								to="/magazines"
								className="text-sm text-white hover:text-emerald-100 transition-colors">
								College Magazine
							</Link>
							<Link
								to="/mentors-list"
								className="text-sm text-white hover:text-emerald-100 transition-colors">
								List of Mentors
							</Link>
							<Link
								to="/forms-download"
								className="text-sm text-white hover:text-emerald-100 transition-colors">
								Forms Download
							</Link>
							<Link
								to="/contact"
								className="text-sm text-white hover:text-emerald-100 transition-colors">
								Feedback Form
							</Link>
						</div>

						{/* Login Dropdown */}
						<div className="relative group z-50">
							<button className="flex items-center font-semibold space-x-2 bg-white text-emerald-800 px-2 rounded-md hover:bg-emerald-100 transition-colors py-1">
								<span>Login</span>
								<ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
							</button>
							<div className="absolute right-0 w-fit mt-1 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-emerald-100">
								<Link
									to="/student-login"
									className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors">
									<User className="w-4 h-4 text-emerald-600" />
									<span>Student</span>
								</Link>
								<Link
									to="/faculty-login"
									className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors">
									<Users className="w-4 h-4 text-emerald-600" />
									<span>Faculty</span>
								</Link>
								<Link
									to="/alumni-login"
									className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition-colors">
									<User className="w-4 h-4 text-emerald-600" />
									<span>Alumni</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Navbar */}
			<nav className="bg-white shadow-md">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex items-center justify-between h-20">
						{/* Logo */}
						<Link to="/" className="flex items-center">
							<img src="./tpc-logo.png" alt="Logo" className="h-16 w-auto" />
						</Link>

						{/* Mobile Menu Button */}
						<button
							onClick={toggleSidebar}
							className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
							<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>

						{/* Desktop Navigation */}
						<div className="hidden lg:flex items-center space-x-2 h-full">
							<Link
								to="/"
								className="px-4 py-2 font-medium text-gray-700 hover:text-emerald-600 transition-colors">
								Home
							</Link>

							{/* Institution Dropdown */}
							<div
								className="relative group h-full flex items-center"
								onMouseEnter={() => setActiveDropdown('institution')}
								onMouseLeave={() => setActiveDropdown(null)}>
								<button className="px-4 py-2 font-medium text-gray-700 hover:text-emerald-600 transition-colors flex items-center">
									Institution
									<ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
								</button>
								<div
									className={`absolute top-full left-0 w-56 bg-gradient-to-b from-emerald-800 to-emerald-950 rounded-b-md shadow-lg transition-all duration-200 ${
										activeDropdown === 'institution' ? 'opacity-100 visible' : 'opacity-0 invisible'
									}`}>
									<div className="py-2  text-white text-sm">
										<Link
											to="/about"
											className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600">
											About Us
										</Link>
										<Link
											to="/principal"
											className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600">
											Principal
										</Link>
										<Link
											to="/faculty"
											className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600">
											Faculty
										</Link>
										<Link
											to="/managing-committee"
											className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600">
											Managing Committee
										</Link>
										<Link
											to="/gallery"
											className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600">
											Gallery
										</Link>
									</div>
								</div>
							</div>

							{/* Academics Dropdown */}
							<div
								className="relative group h-full flex items-center"
								onMouseEnter={() => setActiveDropdown('academics')}
								onMouseLeave={() => setActiveDropdown(null)}>
								<button className="px-4 py-2 font-medium text-gray-700 hover:text-emerald-600 transition-colors flex items-center">
									Academics
									<ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
								</button>
								<div
									className={`absolute top-full left-0 w-56 bg-gradient-to-b from-emerald-800 to-emerald-950 rounded-b-md shadow-lg transition-all duration-200 ${
										activeDropdown === 'academics' ? 'opacity-100 visible' : 'opacity-0 invisible'
									}`}>
									<div className="py-2 text-white text-sm">
										<Link
											to="/admission"
											className="block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600">
											Admission
										</Link>
										<Link
											to="/hostel"
											className="block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600">
											Hostel
										</Link>
										<Link
											to="/library"
											className="block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600">
											Library
										</Link>
										<Link
											to="/placements"
											className="block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600">
											Placements
										</Link>
										<Link
											to="/aicte-courses"
											className="block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600">
											AICTE Approved Courses
										</Link>
									</div>
								</div>
							</div>

							{/* Departments Dropdown */}
							<div
								className="relative group h-full flex items-center"
								onMouseEnter={() => setActiveDropdown('departments')}
								onMouseLeave={() => setActiveDropdown(null)}>
								<button className="px-4 py-2 font-medium text-gray-700 hover:text-emerald-600 transition-colors flex items-center">
									Departments
									<ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
								</button>
								<div
									className={`absolute top-full left-0 w-56 bg-gradient-to-b from-emerald-800 to-emerald-950 rounded-b-md shadow-lg transition-all duration-200 ${
										activeDropdown === 'departments' ? 'opacity-100 visible' : 'opacity-0 invisible'
									}`}>
									<div className="py-2 text-white text-sm">
										<Link
											to="/applied-science"
											className="block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600">
											Applied Science
										</Link>
										<Link
											to="/cse"
											className="block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600">
											Computer Science Engineering
										</Link>
										<Link
											to="/civil"
											className="block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600">
											Civil Engineering
										</Link>
										<Link
											to="/mechanical"
											className="block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600">
											Mechanical Engineering
										</Link>
										<Link
											to="/electrical"
											className="block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600">
											Electrical Engineering
										</Link>
										<Link
											to="/architectural"
											className="block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600">
											Architectural Assitantship
										</Link>
									</div>
								</div>
							</div>

							<Link
								to="/placements"
								className="px-4 py-2 font-medium text-gray-700 hover:text-emerald-600 transition-colors">
								Placements
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 w-full sm:w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				}`}>
				<div className="flex items-center justify-between p-4 border-b">
					<Link to="/" className="flex items-center">
						<img src="./tpc-logo.png" alt="Logo" className="h-12 w-auto" />
					</Link>
					<button
						onClick={toggleSidebar}
						className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
						<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div className="overflow-y-auto h-full pb-20">
					<div className="px-4 py-2">
						<Link
							to="/"
							className="block py-3 text-base font-medium text-gray-900 hover:text-emerald-600 border-b">
							Home
						</Link>

						{/* Mobile Institution */}
						<div className="border-b">
							<button
								onClick={() => toggleMobileDropdown('institution')}
								className="flex items-center justify-between w-full py-3 text-base font-medium text-gray-900 hover:text-emerald-600">
								<span>Institution</span>
								<ChevronRight
									className={`w-5 h-5 transition-transform duration-200 ${
										activeMobileDropdown === 'institution' ? 'rotate-90' : ''
									}`}
								/>
							</button>
							<div
								className={`overflow-hidden transition-all duration-200 ${
									activeMobileDropdown === 'institution' ? 'max-h-96' : 'max-h-0'
								}`}>
								<div className="pl-4 pb-3 space-y-2">
									<Link
										to="/about"
										className="block py-2 text-sm text-gray-600 hover:text-emerald-600">
										About Us
									</Link>
									<Link
										to="/principal"
										className="block py-2 text-sm text-gray-600 hover:text-emerald-600">
										Principal
									</Link>
									<Link
										to="/faculty"
										className="block py-2 text-sm text-gray-600 hover:text-emerald-600">
										Faculty
									</Link>
									<Link
										to="/managing-committee"
										className="block py-2 text-sm text-gray-600 hover:text-emerald-600">
										Managing Committee
									</Link>
									<Link
										to="/gallery"
										className="block py-2 text-sm text-gray-600 hover:text-emerald-600">
										Gallery
									</Link>
								</div>
							</div>
						</div>

						{/* Rest of mobile menu items following the same pattern... */}
						{/* Add similar blocks for Academics and Departments */}

						<Link
							to="/placements"
							className="block py-3 text-base font-medium text-gray-900 hover:text-emerald-600 border-b">
							Placements
						</Link>
					</div>
				</div>
			</div>

			{/* Mobile Backdrop */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={toggleSidebar}
				/>
			)}
		</div>
	);
};

export default Navbar;
