import HeroSection from '../../components/HeroSection';

const AboutPage = () => {
	const breadcrumbs = [
		{
			label: 'Home',
			href: '/',
		},
		{ label: 'About', href: '/about' },
	];
	return (
		<>
			<HeroSection imageUrl={'./girls_hostel.jpg'} title={'About Us'} breadcrumbs={breadcrumbs} />
			<div className="flex justify-center">
				<div className="max-w-6xl py-10 px-6">
					{/* About Us */}
					<div className="w-full px-4 md:px-16 mx-auto text-center my-10">
						<h1 className="text-4xl font-semibold text-green-900 mb-4 uppercase">About Us</h1>
						<div className="h-1 bg-[#DFB714] rounded-lg mb-6 w-28 mx-auto"></div>
						<p className="text-gray-600 text-md leading-relaxed">
							Established in 1956 by the visionary Late Lala Karam Chand Thapar, Thapar Polytechnic
							College (TPC) has a rich legacy of excellence in technical education. As part of the
							Thapar Technology Campus, alongside the Thapar Institute of Engineering and Technology
							and the Thapar Centre for Industrial Research & Development, TPC has played a pivotal
							role in shaping future technocrats. With affiliations to the Punjab State Board of
							Technical Education and Industrial Training, Chandigarh, and support as a privately
							managed, government-aided institution, TPC offers 3-year diploma programs in Civil
							Engineering, Electrical Engineering, Mechanical Engineering, Computer Engineering, and
							Architectural Assistantship. Boasting an annual intake of 360 students, TPC has been
							recognized as the Best Polytechnic in the Northern Region twice, in 1999-2000 and
							2005-06, underscoring its commitment to quality education and innovation.
						</p>
					</div>
					<div className="flex flex-wrap lg:flex-nowrap justify-between items-start gap-6 py-10">
						{/* Image */}
						<div className="w-full lg:w-1/2 bg-green-400 rounded-2xl h-[70vh] max-h-[400px] overflow-hidden">
							<img
								src="./rec_gate.jpg"
								alt="Thapar Polytechnic College Entrance"
								className="w-full h-full object-cover object-center"
							/>
						</div>
						{/* Mission and Vision Section */}
						<div className="w-full lg:w-1/2 mx-auto">
							<div className="bg-green-50 shadow-lg rounded-lg p-4">
								<h2 className="text-2xl font-semibold text-green-900 mb-2">Our Mission</h2>
								<div className="border-b-2 border-[#DFB714] mb-4 w-24"></div>
								<ul className="list-disc text-gray-600 mb-4 text-sm space-y-2">
									<li className="ml-2">
										Advance the cause of technical education through innovative teaching and
										learning methodologies.
									</li>
									<li className="ml-2">
										Produce globally competent engineers with entrepreneurial skills and strong
										ethical values.
									</li>
									<li className="ml-2">
										Promote rural development and community service through skill development
										programs and training initiatives.
									</li>
									<li className="ml-2">
										Collaborate with industry partners to address contemporary technical challenges
										and societal needs.
									</li>
								</ul>
								<h2 className="text-2xl font-semibold text-green-900 mb-2">Our Vision</h2>
								<div className="border-b-2 border-[#DFB714] mb-4 w-24"></div>
								<p className="text-gray-600 text-sm leading-relaxed">
									To be a globally recognized leader in technical education, fostering innovation,
									skill development, and societal progress to meet the aspirations of future
									generations.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutPage;
