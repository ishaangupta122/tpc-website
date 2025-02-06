import {
	CalendarDays,
	GraduationCapIcon,
	Images,
	Quote,
	Trophy,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Typewriter from './TypeWriteEffect';

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

	const [quickLinks] = useState([
		{
			icon: <Trophy className='h-12 w-12' />,
			title: 'Achievements',
			href: '#latest-achievements',
		},
		{
			icon: <CalendarDays className='h-12 w-12' />,
			title: 'Events',
			href: '#latest-events',
		},
		{
			icon: <GraduationCapIcon className='h-12 w-12' />,
			title: 'Placements',
			href: '#placements',
		},
		{
			icon: <Images className='h-12 w-12' />,
			title: 'Gallery',
			href: '#gallery',
		},
		{
			icon: <Quote className='h-12 w-12' />,
			title: 'Testimonials',
			href: '#testimonials',
		},
	]);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prevSlide) =>
				prevSlide === slides.length - 1 ? 0 : prevSlide + 1
			);
		}, 2000);

		return () => clearInterval(timer);
	}, []);

	const getCardStyle = (index) => {
		const baseClasses = 'animate-slide-in opacity-0 card-animation';
		if (index % 2 === 0) {
			return `${baseClasses} bg-gradient-to-b from-emerald-50 to-emerald-100 text-black`;
		}
		return `${baseClasses} bg-gradient-to-b from-emerald-800 to-emerald-950 text-white`;
	};

	return (
		<div className='relative w-full h-[90vh] max-h-[600px] mb-10'>
			<div className='absolute inset-0 bg-gradient-to-b from-emerald-800/40 to-emerald-950/20 h-full z-10' />
			<div className='relative w-full overflow-hidden h-full'>
				<div
					className='flex transition-transform duration-500 ease-in-out h-full'
					style={{ transform: `translateX(-${currentSlide * 100}%)` }}
				>
					{slides.map((slide, index) => (
						<div key={index} className='w-full flex-shrink-0 h-full'>
							<div className='relative w-full h-full aspect-[3/1]'>
								<img
									src={slide.image}
									alt={slide.title}
									className='w-full h-full object-cover aspect-[2/1]'
								/>
							</div>
						</div>
					))}
				</div>
				<div className='absolute top-0 left-0 z-20 overflow-hidden w-full flex md:justify-start justify-center items-center flex-col h-full'>
					<div className='flex flex-col gap-4 text-white text-center mt-0 md:mt-[12vh] lg:mt-[20vh] px-3'>
						<span className='welcome-text font-normal tracking-tighter uppercase text-2xl lg:text-3xl xl:text-4xl'>
							Welcome To
						</span>
						<span className='college-name font-medium tracking-wide text-3xl lg:text-4xl xl:text-5xl flex items-start justify-center uppercase'>
							<Quote className='mr-1 rotate-180' />
							<Typewriter text={'Thapar Polytechnic College'} />
							<Quote className='ml-2' />
						</span>
					</div>
				</div>
			</div>
			<div className='absolute -bottom-10 z-20 md:flex hidden items-center justify-center w-full'>
				<div className='grid lg:grid-cols-5 md:grid-cols-2 max-w-5xl'>
					{quickLinks.map((item, index) => (
						<a
							key={index}
							href={item.href}
							style={{ animationDelay: `${index * 200}ms` }}
							className={`flex items-center justify-center md:flex-row lg:flex-col gap-4 py-10 px-14 ${getCardStyle(
								index
							)} min-w-[200px] lg:min-w-[150px] transition-all duration-300 ease-in-out hover:shadow-lg  cursor-pointer ${
								index + 1 === 5 && 'hidden lg:flex'
							}`}
						>
							{item.icon}
							<span className='font-light text-lg uppercase'>{item.title}</span>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default Carousel;
