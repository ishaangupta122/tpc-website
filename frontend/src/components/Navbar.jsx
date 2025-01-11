import { useState } from 'react';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<nav className="bg-white border-gray-200 sticky top-0 z-50 shadow-lg">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-8">
				{/* Logo Section */}
				<a href="/" className="flex items-center space-x-3 rtl:space-x-reverse border border-black">
					<img src="./tpc-logo.png" alt="Logo" className="h-16" />
				</a>

				<div className="flex md:order-2">
					<button
						onClick={toggleMenu}
						type="button"
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
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
				</div>

				{/* Navigation Links */}
				<div
					className={`items-center justify-between ${
						isMenuOpen ? 'block' : 'hidden'
					} w-full md:flex md:w-auto md:order-1`}>
					{/* Navigation Menu */}
					<ul className="flex flex-col text-sm p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 uppercase">
								Home
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 uppercase">
								Instituion
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 uppercase">
								Academics
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 uppercase">
								Departments
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 uppercase">
								Placements
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 uppercase">
								Faculty
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
