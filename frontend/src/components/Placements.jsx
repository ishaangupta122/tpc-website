import { useEffect, useRef } from 'react';

const Placements = () => {
	const scrollRef = useRef(null);

	// Company data with placeholder images
	const companies = [
		{ id: 1, name: 'Accenture', logo: 'http://tpc.ac.in/images/placement-accenture.jpg' },
		{
			id: 2,
			name: 'Godrej',
			logo: 'http://tpc.ac.in/images/placement-company-godrej.jpg',
		},
		{ id: 3, name: 'Wipro', logo: 'http://tpc.ac.in/images/placement-company-wipro.jpg' },
		{
			id: 4,
			name: 'Larsen & Toubro',
			logo: 'http://tpc.ac.in/images/placement-L&T-Ltd.jpg',
		},
		{ id: 5, name: 'Schlumberger', logo: 'http://tpc.ac.in/images/placement-schlumberger.jpg' },
		{ id: 6, name: 'Owens', logo: 'http://tpc.ac.in/images/placement-owens.jpeg' },
		{
			id: 7,
			name: 'United Spirits',
			logo: 'http://tpc.ac.in/images/placement-United-Spirits-Ltd.jpg',
		},
		{
			id: 8,
			name: 'Next Gen Corp',
			logo: 'http://tpc.ac.in/images/placement-Bhushan-Steel-Ltd.jpg',
		},
	];

	useEffect(() => {
		const scrollContainer = scrollRef.current;
		let animationFrameId;
		let scrollPosition = 0;

		const scroll = () => {
			scrollPosition += 1;

			if (scrollPosition >= scrollContainer.scrollWidth / 2) {
				scrollPosition = 0;
			}

			scrollContainer.scrollLeft = scrollPosition;
			animationFrameId = requestAnimationFrame(scroll);
		};

		animationFrameId = requestAnimationFrame(scroll);

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div className="w-full bg-[#E5F7F8] py-12">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Our Recuriting Partners</h2>
					<div className="w-24 h-1 bg-blue-600 mx-auto rounded-lg" />
				</div>

				<div className="relative overflow-hidden">
					<div ref={scrollRef} className="flex gap-4 overflow-x-hidden whitespace-nowrap">
						{/* First set of images */}
						{companies.map((company) => (
							<div key={company.id} className="flex-none w-48 p-4 bg-white rounded-lg shadow-sm">
								<img src={company.logo} alt={company.name} className="w-full h-24 object-contain" />
								<p className="mt-2 text-center font-semibold text-gray-600 text-sm">
									{company.name}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Placements;
