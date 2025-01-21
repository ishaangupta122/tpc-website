import { useEffect, useRef, useState } from 'react';

const Placements = () => {
	const scrollRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);

	// Company data with placeholder images
	const companies = [
		{ id: 1, name: 'Accenture', logo: './accenture.jpg' },
		{ id: 2, name: 'Godrej', logo: './godrej.jpg' },
		{ id: 3, name: 'Wipro', logo: './wipro.jpg' },
		{ id: 4, name: 'Larsen & Toubro', logo: './larsen.jpg' },
		{ id: 5, name: 'Schlumberger', logo: './schlumberger.jpg' },
		{ id: 6, name: 'Owens', logo: './owens.jpeg' },
		{ id: 7, name: 'United Spirits', logo: './United_Spirits.jpg' },
		{ id: 8, name: 'Bhushan Steel', logo: './Bhushan_Steel.jpg' },
	];

	// Duplicate companies for seamless loop
	const allCompanies = [...companies, ...companies];

	useEffect(() => {
		const slider = scrollRef.current;
		if (!slider) return;

		// Calculate the duration based on the number of items
		const animationDuration = companies.length * 5; // 5 seconds per item

		// Add animation styles
		slider.style.cssText = `
      animation: scroll ${animationDuration}s linear infinite;
      animation-play-state: running;
    `;

		// Pause animation on hover
		if (isHovered) {
			slider.style.animationPlayState = 'paused';
		}

		return () => {
			if (slider) {
				slider.style.animation = 'none';
			}
		};
	}, [companies.length, isHovered]);

	return (
		<div className="w-full bg-[#98002E]/90 py-12 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 ">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-white mb-2">Our Recruiting Partners</h2>
					<div className="w-24 h-1 bg-[#FDB714] mx-auto rounded-lg" />
				</div>

				<div
					className="relative"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					<style>{`
						@keyframes scroll {
							0% {
								transform: translateX(0);
							}
							100% {
								transform: translateX(-50%);
							}
						}
					`}</style>

					<div className="overflow-hidden">
						<div ref={scrollRef} className="flex gap-4 w-fit  py-2">
							{allCompanies.map((company, index) => (
								<div
									key={`${company.id}-${index}`}
									className="flex-none w-48 p-4 bg-white rounded-lg shadow-sm transition-transform hover:scale-105 duration-300">
									<img
										src={company.logo}
										alt={company.name}
										className="w-full h-24 object-contain"
									/>
									<p className="mt-2 text-center font-bold text-[#98002E] text-sm">
										{company.name}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Placements;
