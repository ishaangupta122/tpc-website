import { CalendarDays, GraduationCapIcon, Images, Quote, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

const Carousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [
		{
			image: './boys_hostel.jpg',
			title: 'Slide 1',
			description: 'Description for slide 1',
		},
		{
			image: './girls_hostel.jpg',
			title: 'Slide 2',
			description: 'Description for slide 2',
		},
		{
			image: './campus.webp',
			title: 'Slide 3',
			description: 'Description for slide 3',
		},
	];

	const [tickerItems] = useState([
		'🎓 Admissions open for 2024-25 academic year',
		'🏆 University ranks #1 in Innovation',
		'📢 Campus recruitment drive starts next week',
		'🌟 New scholarship programs announced',
	]);

	const [quickLinks] = useState([
		{
			icon: <CalendarDays className="h-8 w-8" />,
			title: 'Events',
			href: '#latest-events',
		},
		{
			icon: <Trophy className="h-8 w-8" />,
			title: 'Achievements',
			href: '#achievements',
		},
		{
			icon: <GraduationCapIcon className="h-8 w-8" />,
			title: 'Placements',
			href: '#placements',
		},
		{
			icon: <Images className="h-8 w-8" />,
			title: 'Gallery',
			href: '#gallery',
		},
		{
			icon: <Quote className="h-8 w-8" />,
			title: 'Testimonials',
			href: '#testimonials',
		},
	]);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
		}, 3000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="relative w-full h-[110vh] max-h-[800px]">
			{/* Gradient background */}
			<div className="absolute inset-0 bg-gradient-to-b from-[#324E44]/80 to-[#143429]/20 h-full z-10" />
			{/* Carousel container */}
			<div className="relative w-full overflow-hidden h-full">
				<div
					className="flex transition-transform duration-500 ease-in-out h-full"
					style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
					{slides.map((slide, index) => (
						<div key={index} className="w-full flex-shrink-0 h-full">
							<div className="relative w-full h-full aspect-[3/1]">
								<img
									src={slide.image}
									alt={slide.title}
									className="w-full h-full object-cover aspect-[2/1]"
								/>
							</div>
						</div>
					))}
				</div>
				{/* Centered Content */}
				<div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 overflow-hidden w-full flex justify-center items-center flex-col h-full">
					<div className="flex flex-col space-y-16 md:space-y-14  max-w-[100vw] md:px-16 px-4">
						{/* Heading */}
						<div className=" text-white z-20 drop-shadow-lg text-center mt-4 mb-0 lg:mb-[12vh]">
							<div className="flex flex-col gap-4 ">
								<span className="font-light tracking-tighter text-2xl lg:text-xl xl:text-3xl">
									Welcome To
								</span>
								<span
									className="font-medium text-white tracking-wide text-3xl lg:text-2xl xl:text-4xl flex items-start justify-center"
									style={{
										textShadow: '10px 0 10px rgba(0, 0, 0, 0.5)',
									}}>
									<Quote className="mr-1 rotate-180" />
									{`Thapar Polytechnic College`}
									<Quote className="ml-2" />
								</span>
							</div>
						</div>
						{/* Latest Updates */}
						<div className="bg-slate-100 rounded-xl shadow-md max-w-4xl">
							<div className="flex items-center h-11">
								<div className="bg-gradient-to-b from-[#324E44] to-[#143429] text-white font-semibold h-full rounded-lg mr-4 flex justify-center items-center px-4">
									<span className="md:text-xl text-lg font-light">Latest Updates</span>
								</div>
								<div className="ticker-wrap overflow-hidden flex-1 h-full flex items-center">
									<div className="ticker animate-ticker whitespace-nowrap">
										{tickerItems.map((item, index) => (
											<span key={index} className="inline-block mr-16 text-gray-900 font-normal">
												{item}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
						{/* Cards */}
						<div className="md:flex hidden items-center justify-center w-full ">
							<div className="grid lg:grid-cols-5 md:grid-cols-2 gap-3 max-w-5xl">
								{quickLinks.map((item, index) => (
									<a
										key={index}
										href={item.href}
										className={`flex items-center justify-center rounded-lg md:flex-row lg:flex-col gap-3 bg-slate-100 text-green-900 py-4 px-2 hover:bg-gradient-to-b from-[#324E44] to-[#143429] min-w-[200px] lg:min-w-[150px] hover:text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 cursor-pointer ${
											index + 1 === 5 && 'hidden lg:flex'
										}`}>
										{item.icon}
										<span className="font-light text-sm uppercase">{item.title}</span>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Carousel;
