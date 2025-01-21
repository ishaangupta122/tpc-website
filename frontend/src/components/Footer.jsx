import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaLinkedin,
	FaEnvelope,
	FaPhone,
} from 'react-icons/fa';

const Footer = () => {
	const quickLinks = [
		{ title: 'About Us', link: '#' },
		{ title: 'Admissions', link: '#' },
		{ title: 'Academics', link: '#' },
		{ title: 'Faculty', link: '#' },
	];

	const researchLinks = [
		{ title: 'Contact', link: '#' },
		{ title: 'Research', link: '#' },
		{ title: 'Campus Life', link: '#' },
		{ title: 'Privacy Policy', link: '#' },
	];
	const socialLinks = [
		{ icon: <FaFacebook className="w-6 h-6" />, link: '#', label: 'Facebook' },
		{ icon: <FaTwitter className="w-6 h-6" />, link: '#', label: 'Twitter' },
		{ icon: <FaInstagram className="w-6 h-6" />, link: '#', label: 'Instagram' },
		{ icon: <FaLinkedin className="w-6 h-6" />, link: '#', label: 'LinkedIn' },
	];

	return (
		<footer className="bg-black text-white ">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Logo Section */}
					<div className="col-span-1 md:col-span-2 lg:col-span-1">
						<div className="flex items-center justify-start gap-2 flex-wrap ">
							<img src="http://tpc.ac.in/images/logo.png" alt="College Logo" className="h-12 " />
							<h1 className="text-md font-bold">Thapar Polytechnic College</h1>
						</div>
						<p className="mt-4 text-gray-400">
							Empowering minds, shaping futures, and fostering excellence in education since 1950.
						</p>
					</div>

					{/* Quick Links */}
					<div className="text-left md:text-center ">
						<h2 className="text-lg font-semibold mb-4">Quick Links</h2>
						<ul className="space-y-2">
							{quickLinks.map((link, index) => (
								<li key={index}>
									<a
										href={link.link}
										className="text-gray-400 hover:text-white transition-colors duration-300">
										{link.title}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Resources */}
					<div className="text-left md:text-center">
						<h2 className="text-lg font-semibold mb-4">Resources</h2>
						<ul className="space-y-2">
							{researchLinks.map((link, index) => (
								<li key={index}>
									<a
										href={link.link}
										className="text-gray-400 hover:text-white transition-colors duration-300">
										{link.title}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div className="md:flex flex-col items-center justify-start">
						<h2 className="text-lg font-semibold mb-4">Contact Us</h2>
						<div className="text-gray-400 space-y-2">
							<p>Thapar Polytechnic College,</p>
							<p>147001 - Patiala, Punjab</p>
							<p className="flex justify-start items-center gap-2 flex-wrap">
								<FaPhone />
								+91 17523-65554
							</p>
							<p className="flex justify-start items-center gap-2 ">
								<FaEnvelope /> principaltpc@thapar.edu
							</p>
						</div>
					</div>
				</div>

				{/* Social Links */}
				<div className="mt-8 pt-8 border-t border-gray-700">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
						<div className="flex space-x-6">
							{socialLinks.map((social, index) => (
								<a
									key={index}
									href={social.link}
									aria-label={social.label}
									className="text-gray-400 hover:text-white transition-colors duration-300">
									{social.icon}
								</a>
							))}
						</div>
						<div className="text-gray-400 text-sm text-center">
							© 2025 Thapar Polytechnic College. All rights reserved.
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
