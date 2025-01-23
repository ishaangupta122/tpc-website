import { MoveRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

const EventsCarousel = () => {
	const [events] = useState([
		{
			id: 1,
			date: ['15', 'Mar 2024'],
			title: 'New Academic Programs',
			description:
				'Launching courses in Artificial Intelligence and Data Science from the upcoming semester.',
			image: './image1.jpeg',
		},
		{
			id: 2,
			date: ['15', 'Mar 2024'],
			title: 'Scholarship Opportunities',
			description: 'Increased funding for merit-based scholarships starting this academic year.',
			image: './image2.jpeg',
		},
		{
			id: 3,
			date: ['15', 'Mar 2024'],
			title: 'New Research Center Launch',
			description: 'State-of-the-art AI research facility inaugurated with industry collaboration.',
			image: './image3.jpeg',
		},
		{
			id: 4,
			date: ['15', 'Mar 2024'],
			title: 'Campus Expansion',
			description: 'New facilities being added to accommodate growing student population.',
			image: './boys_hostel.jpg',
		},
		{
			id: 5,
			date: ['15', 'Mar 2024'],
			title: 'International Partnership',
			description: 'New exchange programs established with leading global universities.',
			image: './girls_hostel.jpg',
		},
	]);

	const scrollRef = useRef(null);
	const [activeButton, setActiveButton] = useState(null);

	const scroll = (direction) => {
		if (scrollRef.current && !activeButton) {
			setActiveButton(direction);

			const container = scrollRef.current;
			const cardWidth = container.offsetWidth / 3;
			const scrollAmount = cardWidth * 3;
			const maxScroll = container.scrollWidth - container.offsetWidth;

			let newScroll;
			if (direction === 'next') {
				newScroll = Math.min(container.scrollLeft + scrollAmount, maxScroll);
			} else {
				newScroll = Math.max(container.scrollLeft - scrollAmount, 0);
			}

			container.scrollTo({
				left: newScroll,
				behavior: 'smooth',
			});

			setTimeout(() => {
				setActiveButton(null);
			}, 800);
		}
	};

	return (
		<section
			id="latest-events"
			className="bg-white overflow-hidden flex justify-center items-start py-10">
			<div className="max-w-6xl mx-6 px-6 py-10 my-10 bg-gray-100 rounded-3xl container">
				{/* Heading And Buttons */}
				<div className="w-full flex justify-between items-center mb-8 px-2">
					<div className="text-left w-fit">
						<h2 className="text-4xl font-medium text-green-900">Latest Events</h2>
					</div>
					<div className="flex gap-2">
						<button
							onClick={() => scroll('prev')}
							disabled={activeButton === 'prev'}
							className="p-2 rounded-full bg-[#143429] text-white hover:bg-[#324E44] transition-colors disabled:opacity-50">
							<ChevronLeft className="w-6 h-6" />
						</button>
						<button
							onClick={() => scroll('next')}
							disabled={activeButton === 'next'}
							className="p-2 rounded-full bg-[#143429] text-white hover:bg-[#324E44] transition-colors disabled:opacity-50">
							<ChevronRight className="w-6 h-6" />
						</button>
					</div>
				</div>

				{/* Carousel */}
				<div
					ref={scrollRef}
					className="flex gap-2 overflow-x-auto scroll-smooth"
					style={{
						scrollbarWidth: 'none',
						msOverflowStyle: 'none',
						WebkitOverflowScrolling: 'touch',
					}}>
					{events.map((event) => (
						<div key={event.id} className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 px-2 py-5">
							<div className="bg-white rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative h-full">
								<div className="relative h-40 bg-[#143429]/20 rounded-t-md overflow-hidden border-b-[4px] border-green-900">
									<img src={event.image} alt={event.title} className="h-full w-full object-cover" />
									<div className="flex flex-col text-center absolute top-0 left-4 font-medium bg-gradient-to-b from-[#324E44]/90 to-[#143429]/90 text-white px-3 py-1 rounded-b-lg">
										<span className="text-3xl">{event.date[0]}</span>
										<span className="text-sm">{event.date[1]}</span>
									</div>
								</div>
								<div className="p-4 pb-24 rounded-b-md">
									<h3 className="text-lg font-semibold text-green-900 mb-3">{event.title}</h3>
									<p className="text-gray-600 text-sm">{event.description}</p>
									<a
										href="#"
										className="absolute bottom-0 left-0 right-0 h-14 rounded-b-md overflow-hidden bg-gradient-to-b from-[#324E44] to-[#143429] hover:underline inline-flex items-center justify-center py-4 text-white">
										Read More
										<MoveRight className="ml-2" />
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default EventsCarousel;
