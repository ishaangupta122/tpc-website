import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Topbar from './Topbar';

const Navbar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState(null);
	const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	const toggleMobileDropdown = (linkName) => {
		setActiveMobileDropdown(
			activeMobileDropdown === linkName ? null : linkName
		);
	};

	// Combined handler for both closing sidebar and dropdown
	const handleLinkClick = () => {
		setIsSidebarOpen(false);
		setActiveDropdown(null);
		setActiveMobileDropdown(null);
	};

	// Desktop dropdown handlers
	const handleMouseEnter = (dropdownName) => {
		setActiveDropdown(dropdownName);
	};

	const handleMouseLeave = () => {
		setActiveDropdown(null);
	};

	// Handle dropdown link clicks
	const handleDropdownLinkClick = () => {
		setActiveDropdown(null);
		setActiveMobileDropdown(null);
	};

	return (
		<div className='sticky top-0 z-50'>
			{/* Topbar */}
			<Topbar />

			{/* Main Navbar */}
			<nav className='bg-white shadow-md'>
				<div className='max-w-7xl mx-auto px-4'>
					<div className='flex items-center justify-between h-24'>
						{/* Logo */}
						<div className='flex items-center h-20 gap-4'>
							<a href='/' className='flex items-center'>
								<img
									src='/tpc-logo.png'
									alt='TPC-Logo'
									className='h-14 xl:h-20 w-auto'
								/>
							</a>
							<div className='h-14 bg-green-800 w-[1px] rounded-lg'></div>
							<Link
								to='https://ndl.iitkgp.ac.in/'
								target='_blank'
								className='flex items-center'
							>
								<img
									src='/ndli_logo.png'
									alt='NDLI-Logo'
									className='h-9 xl:h-12 w-auto '
								/>
							</Link>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={toggleSidebar}
							className='lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500'
						>
							<svg
								className='w-6 h-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
						</button>

						{/* Desktop Navigation */}
						<div className='hidden lg:flex items-center space-x-5 h-full font-medium mr-4'>
							<Link
								to='/'
								onClick={handleDropdownLinkClick}
								className=' text-gray-700 hover:text-emerald-600 transition-colors'
							>
								Home
							</Link>

							{/* Institution Dropdown */}
							<div
								className='relative group  flex items-center'
								onMouseEnter={() => handleMouseEnter('institution')}
								onMouseLeave={handleMouseLeave}
							>
								<button className=' text-gray-700 hover:text-emerald-600 transition-colors flex items-center'>
									Institution
									<ChevronDown className='ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-200' />
								</button>
								<div
									className={`absolute top-full mt-9 left-0 w-56 bg-gradient-to-b from-emerald-800 to-emerald-950 rounded-b-md shadow-lg transition-all duration-200 ${
										activeDropdown === 'institution'
											? 'opacity-100 visible'
											: 'opacity-0 invisible'
									}`}
								>
									<div className='py-2 text-white text-sm font-normal'>
										<Link
											to='/about'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600'
										>
											About Us
										</Link>
										<Link
											to='/principal'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600'
										>
											Principal
										</Link>
										<Link
											to='/faculty'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600'
										>
											Faculty
										</Link>
										<Link
											to='/managing-committee'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600'
										>
											Managing Committee
										</Link>
										<Link
											to='/admin-staff'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600'
										>
											Admin Staff
										</Link>
										<Link
											to='/gallery'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600'
										>
											Gallery
										</Link>
									</div>
								</div>
							</div>

							{/* Academics Dropdown */}
							<div
								className='relative group flex items-center'
								onMouseEnter={() => handleMouseEnter('academics')}
								onMouseLeave={handleMouseLeave}
							>
								<button className='  text-gray-700 hover:text-emerald-600 transition-colors flex items-center'>
									Academics
									<ChevronDown className='ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-200' />
								</button>
								<div
									className={`absolute top-full mt-9 left-0 w-56 bg-gradient-to-b from-emerald-800 to-emerald-950 rounded-b-md shadow-lg transition-all duration-200 ${
										activeDropdown === 'academics'
											? 'opacity-100 visible'
											: 'opacity-0 invisible'
									}`}
								>
									<div className='py-2 text-white text-sm font-normal'>
										<Link
											to='/admission'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600'
										>
											Admission
										</Link>
										<Link
											to='/hostel'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600'
										>
											Hostel
										</Link>
										<Link
											to='/library'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600'
										>
											Library
										</Link>
										<Link
											to='/placements'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600'
										>
											Placements
										</Link>
										<Link
											to='/aicte-courses'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600'
										>
											AICTE Approved Courses
										</Link>
									</div>
								</div>
							</div>

							{/* Departments Dropdown */}
							<div
								className='relative group flex items-center'
								onMouseEnter={() => handleMouseEnter('departments')}
								onMouseLeave={handleMouseLeave}
							>
								<button className=' text-gray-700 hover:text-emerald-600 transition-colors flex items-center'>
									Departments
									<ChevronDown className='ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-200' />
								</button>
								<div
									className={`absolute top-full mt-9 left-0 w-56 bg-gradient-to-b from-emerald-800 to-emerald-950 rounded-b-md shadow-lg transition-all duration-200 ${
										activeDropdown === 'departments'
											? 'opacity-100 visible'
											: 'opacity-0 invisible'
									}`}
								>
									<div className='py-2 text-white text-sm font-normal'>
										<Link
											to='/applied-science'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600'
										>
											Applied Science
										</Link>
										<Link
											to='/architectural'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600'
										>
											Architectural Assitantship
										</Link>
										<Link
											to='/cse'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600'
										>
											Computer Science Engineering
										</Link>
										<Link
											to='/civil'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600'
										>
											Civil Engineering
										</Link>
										<Link
											to='/electrical'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600'
										>
											Electrical Engineering
										</Link>
										<Link
											to='/mechanical'
											onClick={handleDropdownLinkClick}
											className='block px-4 py-2  hover:bg-emerald-50 hover:text-emerald-600'
										>
											Mechanical Engineering
										</Link>
									</div>
								</div>
							</div>
							<Link
								to='/placements'
								className='text-gray-700 hover:text-emerald-600 transition-colors'
							>
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
				}`}
			>
				<div className='flex items-center justify-between p-4 border-b'>
					<Link
						href='/'
						onClick={handleLinkClick}
						className='flex items-center'
					>
						<img src='./tpc-logo.png' alt='Logo' className='h-12 w-auto' />
					</Link>
					<button
						onClick={toggleSidebar}
						className='p-2 rounded-md text-gray-600 hover:bg-gray-100'
					>
						<svg
							className='w-6 h-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>

				<div className='overflow-y-auto h-full pb-20'>
					<div className='px-4 py-2'>
						<Link
							to='/'
							onClick={handleLinkClick}
							className='block py-3 text-base font-medium text-gray-900 hover:text-emerald-600 border-b'
						>
							Home
						</Link>

						{/* Mobile Institution */}
						<div className='border-b'>
							<button
								onClick={() => toggleMobileDropdown('institution')}
								className='flex items-center justify-between w-full py-3 text-base font-medium text-gray-900 hover:text-emerald-600'
							>
								<span>Institution</span>
								<ChevronRight
									className={`w-5 h-5 transition-transform duration-200 ${
										activeMobileDropdown === 'institution' ? 'rotate-90' : ''
									}`}
								/>
							</button>
							<div
								className={`overflow-hidden transition-all duration-200 ${
									activeMobileDropdown === 'institution'
										? 'max-h-96'
										: 'max-h-0'
								}`}
							>
								<div className='pl-4 pb-3 space-y-2 font-medium'>
									<Link
										to='/about'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										About Us
									</Link>
									<Link
										to='/principal'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Principal
									</Link>
									<Link
										to='/faculty'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Faculty
									</Link>
									<Link
										to='/managing-committee'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Managing Committee
									</Link>
									<Link
										to='/admin-staff'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Admin Staff
									</Link>
									<Link
										to='/gallery'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Gallery
									</Link>
								</div>
							</div>
						</div>
						{/* Mobile Academics */}
						<div className='border-b'>
							<button
								onClick={() => toggleMobileDropdown('academics')}
								className='flex items-center justify-between w-full py-3 text-base font-medium text-gray-900 hover:text-emerald-600'
							>
								<span>Academics</span>
								<ChevronRight
									className={`w-5 h-5 transition-transform duration-200 ${
										activeMobileDropdown === 'academics' ? 'rotate-90' : ''
									}`}
								/>
							</button>
							<div
								className={`overflow-hidden transition-all duration-200 ${
									activeMobileDropdown === 'academics' ? 'max-h-96' : 'max-h-0'
								}`}
							>
								<div className='pl-4 pb-3 space-y-2 font-medium'>
									<Link
										to='/admission'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Admission
									</Link>
									<Link
										to='/hostel'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Hostel
									</Link>
									<Link
										to='/library'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Library
									</Link>
									<Link
										to='/placements'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Placements
									</Link>
									<Link
										to='/aicte-courses'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										AICTE Approved Courses
									</Link>
								</div>
							</div>
						</div>
						{/* Mobile Departments */}
						<div className='border-b'>
							<button
								onClick={() => toggleMobileDropdown('departments')}
								className='flex items-center justify-between w-full py-3 text-base font-medium text-gray-900 hover:text-emerald-600'
							>
								<span>Departments</span>
								<ChevronRight
									className={`w-5 h-5 transition-transform duration-200 ${
										activeMobileDropdown === 'departments' ? 'rotate-90' : ''
									}`}
								/>
							</button>
							<div
								className={`overflow-hidden transition-all duration-200 ${
									activeMobileDropdown === 'departments'
										? 'max-h-96'
										: 'max-h-0'
								}`}
							>
								<div className='pl-4 pb-3 space-y-2 font-medium'>
									<Link
										to='/applied-science'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Applied Science
									</Link>
									<Link
										to='/architectural'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Architectural Assistantship
									</Link>
									<Link
										to='/cse'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Computer Science & Engineering
									</Link>
									<Link
										to='/civil'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Civil Engineering
									</Link>
									<Link
										to='/electrical'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Electrical Engineering
									</Link>
									<Link
										to='/mechanical'
										onClick={handleLinkClick}
										className='block py-2  text-gray-600 hover:text-emerald-600'
									>
										Mechanical Engineering
									</Link>
								</div>
							</div>
						</div>
						<Link
							to='/placements'
							onClick={handleLinkClick}
							className='block py-3 text-base font-medium text-gray-900 hover:text-emerald-600 border-b'
						>
							Placements
						</Link>
						{/* Top Navbar Links */}
						<Link
							to='/contact'
							onClick={handleLinkClick}
							className='block py-3 text-base font-medium text-red-500 hover:text-emerald-600 border-b blink-animation'
						>
							Admission Enquiry
						</Link>
						<Link
							to='https://forms.eduqfix.com/thaperolform/add'
							onClick={handleLinkClick}
							target='_blank'
							className='block py-3 text-base font-medium text-red-500 hover:text-emerald-600 border-b blink-animation'
						>
							Online Fee Payment
						</Link>
						<Link
							to='/magazines'
							onClick={handleLinkClick}
							className='block py-3 text-base font-medium text-gray-900 hover:text-emerald-600 border-b'
						>
							College Magazine
						</Link>
						<Link
							to='/mentors-list'
							onClick={handleLinkClick}
							className='block py-3 text-base font-medium text-gray-900 hover:text-emerald-600 border-b'
						>
							List of Mentors
						</Link>
						<Link
							to='/forms-download'
							onClick={handleLinkClick}
							className='block py-3 text-base font-medium text-gray-900 hover:text-emerald-600 border-b'
						>
							Forms Download
						</Link>
						<Link
							to='/mandatory-disclosure'
							onClick={handleLinkClick}
							className='block py-3 text-base font-medium text-gray-900 hover:text-emerald-600 border-b'
						>
							Mandatory Disclosure
						</Link>
						<Link
							to='/tpc-newsletter'
							onClick={handleLinkClick}
							className='block py-3 text-base font-medium text-gray-900 hover:text-emerald-600 border-b'
						>
							TPC Newsletter
						</Link>
					</div>
				</div>
			</div>

			{/* Mobile Backdrop */}
			{isSidebarOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
					onClick={toggleSidebar}
				/>
			)}
		</div>
	);
};

export default Navbar;
