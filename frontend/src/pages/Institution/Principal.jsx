import { Linkedin, Twitter, Mail, Phone, Clock, InstagramIcon } from 'lucide-react';

const PrincipalProfile = () => {
	const achievements = [
		{
			title: 'Infrastructure Development',
			points: [
				'Maintaining quality infrastructure with fully equipped workshops and labs',
				'Excellent sports facilities and modern classrooms in green surroundings',
			],
		},
		{
			title: 'Academic Excellence',
			points: [
				'Offering Diploma in seven branches of Engineering since 1956',
				'Co-located with renowned Thapar University in a lush green campus',
			],
		},
		{
			title: 'Student Development',
			points: [
				'Focus on industry-oriented engineering knowledge and scientific skills',
				'Strong emphasis on English communication and problem-solving techniques',
			],
		},
		{
			title: 'Career Pathways',
			points: [
				'Supporting progression to undergraduate engineering studies',
				'Facilitating industry placements for diploma graduates',
			],
		},
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Profile Section */}
			<div className="container mx-auto px-4 py-12">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Left Column - Image and Contact Info */}
					<div className="lg:w-1/2 flex flex-col gap-6">
						<div className="h-[80vh] max-h-[600px] rounded-lg overflow-hidden shadow-lg">
							<img
								src="./principal.jpeg"
								alt="Principal, Thapar Polytechnic College"
								className="w-full rounded-lg shadow-lg h-full object-cover"
							/>
						</div>
						{/* Contact Info - Hidden on mobile, visible on lg screens */}
						<div className="hidden lg:block bg-yellow-50 rounded-lg p-6 shadow-md">
							<h3 className="text-xl font-bold mb-4 text-yellow-600">Contact Information</h3>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Mail className="text-yellow-600" />
									<span>principal@thaparpolytechnic.ac.in</span>
								</div>
								<div className="flex items-center gap-3">
									<Phone className="text-yellow-600" />
									<span>Office: (0175) XXX-XXXX</span>
								</div>
								<div className="flex items-center gap-3">
									<Clock className="text-yellow-600" />
									<span>Office Hours: Monday-Friday, 9:00 AM - 5:00 PM</span>
								</div>
							</div>
							<div className="flex gap-4 mt-6">
								<a href="#" className="text-emerald-900 hover:text-emerald-800">
									<InstagramIcon size={24} />
								</a>
								<a href="#" className="text-emerald-900 hover:text-emerald-800">
									<Twitter size={24} />
								</a>
								<a href="#" className="text-emerald-900 hover:text-emerald-800">
									<Linkedin size={24} />
								</a>
							</div>
						</div>
					</div>

					{/* Right Column - Message and Contact Info for mobile */}
					<div className="lg:w-1/2">
						<h2 className="text-3xl font-bold mb-4 text-emerald-900">Message from the Principal</h2>
						<h2 className="text-lg font-normal mb-4 text-black italic">- Dr. Ankush Kansal</h2>
						<div className="text-gray-700 space-y-4">
							<p>
								India today is an emerging economic power. Since the economic liberalization,
								industry has seen significant growth and the country has successfully leveraged its
								engineering skills to build a formidable manufacturing sector. The continued
								improvement in industrial infrastructure coupled with favourable policies and thrust
								from the Government are expected to help sustain the growth momentum in
								manufacturing.
							</p>
							<p>
								Diploma engineers with practical and skills-oriented training along with supervisory
								skills have a major role to ensure quality and volume of production in manufacturing
								sector. Thapar Polytechnic College Patiala is one of the oldest and most reputed
								Polytechnics of Punjab imparting technical education upto Diploma in seven branches
								of Engineering.
							</p>
							<p>
								Established since 1956 and co-located with the renowned Thapar University in a lush
								green campus, the College offers a very conducive environment for learning and
								overall growth. We aim to provide students with industry or job related engineering
								knowledge, scientific skills, sound knowledge of English to communicate in the field
								and ability to apply problem solving techniques.
							</p>
							<p>
								We have quality infrastructure with fully equipped workshops, labs, library,
								excellent sports facilities, class rooms and hostels in green and clean surroundings
								providing a healthy academic environment both for students and faculty. Our well
								qualified and dedicated faculty is focused on imparting high quality education and
								mentoring for the students for them to become successful technocrats and worthy
								citizens of our country.
							</p>
							<p>
								I am looking forward for a purposeful participation and whole hearted co-operation
								from students and teachers in building this institution stronger.
							</p>
						</div>

						{/* Contact Info - Visible only on mobile/tablet */}
						<div className="lg:hidden bg-yellow-50 rounded-lg p-6 my-6 shadow-lg">
							<h3 className="text-xl font-bold mb-4 text-yellow-600">Contact Information</h3>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Mail className="text-yellow-600" />
									<span>principal@thaparpolytechnic.ac.in</span>
								</div>
								<div className="flex items-center gap-3">
									<Phone className="text-yellow-600" />
									<span>Office: (0175) XXX-XXXX</span>
								</div>
								<div className="flex items-center gap-3">
									<Clock className="text-yellow-600" />
									<span>Office Hours: Monday-Friday, 9:00 AM - 5:00 PM</span>
								</div>
							</div>
							<div className="flex gap-4 mt-4">
								<a href="#" className="text-emerald-900 hover:text-emerald-800">
									<InstagramIcon size={24} />
								</a>
								<a href="#" className="text-emerald-900 hover:text-emerald-800">
									<Twitter size={24} />
								</a>
								<a href="#" className="text-emerald-900 hover:text-emerald-800">
									<Linkedin size={24} />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Achievements Section */}
			<div className="bg-gray-50 py-12">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-emerald-900 mb-4 text-center">Key Highlights</h2>
					<div className="w-28 h-1 bg-[#FDB714] mx-auto rounded-full mb-10"></div>
					<div className="grid md:grid-cols-2 gap-6">
						{achievements.map((achievement, index) => (
							<div
								key={index}
								className="bg-gradient-to-b from-emerald-800 to-emerald-950 text-white rounded-lg p-6 shadow-md hover:-translate-y-1 transition-transform duration-300">
								<h3 className="text-xl font-medium mb-4 text-[#ffd42a]">{achievement.title}</h3>
								<ul className="space-y-2 px-2">
									{achievement.points.map((point, idx) => (
										<li key={idx} type="disc" className="text-gray-100">
											{point}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrincipalProfile;
