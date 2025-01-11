import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselItems = [
	{
		title: 'Reception Gate of College',
		image: 'http://tpc.ac.in/images/aboutclg.JPG',
		description:
			'Immerse yourself in breathtaking landscapes and discover the beauty of untouched wilderness.',
		tag: 'Campus',
	},
	{
		title: 'NDLI Award of Excellence',
		image: 'http://tpc.ac.in/images/ndli.jpg',
		description:
			'Immerse yourself in breathtaking landscapes and discover the beauty of untouched wilderness.',
		tag: 'Award',
	},
	{
		title: 'Boys Hostel',
		image: 'http://tpc.ac.in/images/tpcgallery/image14.JPG',
		description:
			'Navigate through vibrant cityscapes and uncover hidden gems in metropolitan environments.',
		tag: 'Hostel',
	},
	{
		title: 'Girls Hostel',
		image: 'http://tpc.ac.in/images/tpcgallery/image13.JPG',
		description:
			'Navigate through vibrant cityscapes and uncover hidden gems in metropolitan environments.',
		tag: 'Hostel',
	},
	{
		title: 'College Campus',
		image:
			'https://imgs.search.brave.com/T1lIQy0ZpcBwSXIOOXnpH-IX5iazhf-Jgb2kYHgfutk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sci50/YXJnZXRhZG1pc3Np/b24uY29tL3N0b3Jh/Z2UvaW1nL2NvbGxl/Z2VzLy9JTUctMS00/Nzk3NzY0NzEud2Vi/cA',
		description:
			'Dive deep into rich traditions and explore the diverse cultural tapestry of our world.',
		tag: 'Campus',
	},
];

const Carousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const interval = 5000; // 5 seconds

	const nextSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
	}, []);

	const prevSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
	}, []);

	useEffect(() => {
		const timer = setInterval(nextSlide, interval);
		return () => clearInterval(timer);
	}, [nextSlide]);

	return (
		<div className="w-full bg-gray-100 py-6">
			{/* Container for large screens - side by side layout */}
			<div className="hidden lg:flex gap-8 items-center max-w-7xl mx-auto p-8">
				{/* Modern Description Section */}
				<div className="w-1/3 space-y-6 pr-8">
					<div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
						{carouselItems[currentSlide].tag}
					</div>
					<h2 className="text-4xl font-bold tracking-tight">{carouselItems[currentSlide].title}</h2>
					<p className="text-gray-600 leading-relaxed text-lg">
						{carouselItems[currentSlide].description}
					</p>
				</div>

				{/* Carousel Section */}
				<div className="w-2/3 relative">
					<div className="relative overflow-hidden rounded-2xl shadow-lg">
						<img
							src={carouselItems[currentSlide].image}
							alt={carouselItems[currentSlide].title}
							className="w-full h-[80vh] max-h-[600px] object-cover"
						/>

						{/* Navigation Buttons */}
						<button
							onClick={prevSlide}
							className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors shadow-lg">
							<ChevronLeft className="h-6 w-6" />
						</button>
						<button
							onClick={nextSlide}
							className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors shadow-lg">
							<ChevronRight className="h-6 w-6" />
						</button>

						{/* Indicators on image */}
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
							{carouselItems.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentSlide(index)}
									className={`h-2 rounded-full transition-all duration-300 ${
										currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'
									}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Container for small/tablet screens - carousel only */}
			<div className="lg:hidden w-full p-4">
				<div className="relative overflow-hidden rounded-2xl shadow-lg">
					<img
						src={carouselItems[currentSlide].image}
						alt={carouselItems[currentSlide].title}
						className="w-full h-auto"
					/>

					{/* Mobile Description Overlay */}
					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 md:block hidden">
						<div className="text-white space-y-2 mb-[30px]">
							<div className="inline-block px-2 py-1  bg-white/20 rounded-full text-sm">
								{carouselItems[currentSlide].tag}
							</div>
							<h2 className="text-2xl font-bold">{carouselItems[currentSlide].title}</h2>
							<p className="text-sm text-white/80">{carouselItems[currentSlide].description}</p>
						</div>
					</div>

					{/* Navigation Buttons */}
					<button
						onClick={prevSlide}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors shadow-lg">
						<ChevronLeft className="h-4 w-4" />
					</button>
					<button
						onClick={nextSlide}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors shadow-lg">
						<ChevronRight className="h-4 w-4" />
					</button>

					{/* Indicators on image */}
					<div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex items-center gap-2">
						{carouselItems.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentSlide(index)}
								className={`h-2 rounded-full transition-all duration-300 ${
									currentSlide === index ? 'w-5 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Carousel;
