import { useState, useEffect, useRef } from 'react';
import {
	ChevronUp,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Loader,
} from 'lucide-react';
import TruncateText from '../../components/TruncateText';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BASE_API from '../../../BASE_API/config';

const SuccessStoriesCarousel = () => {
	const [loading, setLoading] = useState(true);
	const [successStories, setSuccessStories] = useState([]);

	const fetchStories = async () => {
		try {
			setLoading(true);
			const response = await axios.get(`${BASE_API}/events`, {
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: 5000,
			});
			setSuccessStories(response.data);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStories();
	}, []);

	const containerRef = useRef(null);

	const handleScrollUp = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ top: -150, behavior: 'smooth' });
		}
	};

	const handleScrollDown = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ top: 150, behavior: 'smooth' });
		}
	};

	return (
		<div className='w-full lg:w-[35vw]'>
			<div className='relative w-full'>
				<div className='flex items-center justify-between mb-6'>
					<h2 className='text-2xl font-semibold uppercase'>
						<span className='text-emerald-900'>Success </span> Stories
					</h2>
					<div className='flex gap-2'>
						<button
							onClick={handleScrollUp}
							className='p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95'
						>
							<ChevronUp size={24} />
						</button>
						<button
							onClick={handleScrollDown}
							className='p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95'
						>
							<ChevronDown size={24} />
						</button>
					</div>
				</div>

				{/* Carousel or Loading State */}
				{loading ? (
					<div className='flex justify-center items-center min-h-[400px]'>
						<div className='flex flex-col items-center gap-4'>
							<Loader className='w-8 h-8 animate-spin text-emerald-900' />
							<p className='text-emerald-900 font-medium'>
								Loading Success Stories...
							</p>
						</div>
					</div>
				) : (
					<div
						id='stories-container'
						ref={containerRef}
						className='flex flex-col gap-4 h-[550px] overflow-y-auto bg-gray-200 p-4 rounded-lg'
						style={{
							scrollBehavior: 'smooth',
							msOverflowStyle: 'none',
							scrollbarWidth: 'none',
						}}
					>
						{successStories.map((story, index) => (
							<div
								key={index}
								className='flex bg-white rounded-lg shadow-lg  min-h-56 w-full'
							>
								<div className='overflow-hidden rounded-l-lg h-full w-1/2'>
									<img
										src={story.image}
										alt={story.title}
										className='h-full w-full object-cover bg-emerald-100'
									/>
								</div>
								<div className='w-1/2 px-3 py-4 flex flex-col gap-4'>
									<div className='text-sm font-semibold text-emerald-900'>
										<TruncateText text={story.title} maxLength={20} />
									</div>
									<div className='text-gray-600 text-xs'>
										<TruncateText text={story.description} maxLength={80} />
									</div>
									<Link
										to={`/success-story/${story._id}`}
										className='text-emerald-900 text-sm hover:underline'
									>
										Read More
									</Link>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

const EventsCarousel = () => {
	const [loading, setLoading] = useState(true);
	const [events, setEvents] = useState([]);

	const fetchEvents = async () => {
		try {
			setLoading(true);
			const response = await axios.get(`${BASE_API}/events`, {
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: 5000,
			});
			console.log(response.data);
			setEvents(response.data);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	const containerRef = useRef(null);

	const handleScrollLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
		}
	};

	const handleScrollRight = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
		}
	};

	return (
		<div className='relative lg:w-[60vw] w-full'>
			<div className='flex items-center mb-6 px-4'>
				<h2 className='text-2xl font-semibold flex-grow uppercase'>
					<span className='text-emerald-900'>Latest </span>Events
				</h2>
				<div className='flex gap-2'>
					<button
						onClick={handleScrollLeft}
						className='p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95'
					>
						<ChevronLeft size={24} />
					</button>
					<button
						onClick={handleScrollRight}
						className='p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95'
					>
						<ChevronRight size={24} />
					</button>
				</div>
			</div>

			{/* Carousel or Loading State */}
			{loading ? (
				<div className='flex justify-center items-center min-h-[400px]'>
					<div className='flex flex-col items-center gap-4'>
						<Loader className='w-8 h-8 animate-spin text-emerald-900' />
						<p className='text-emerald-900 font-medium'>Loading Events...</p>
					</div>
				</div>
			) : (
				<div
					id='latest-events'
					ref={containerRef}
					className='flex bg-gray-200 rounded-lg overflow-x-auto gap-4 h-[550px] scroll-smooth p-4'
					style={{
						scrollBehavior: 'smooth',
						msOverflowStyle: 'none',
						scrollbarWidth: 'none',
					}}
				>
					{events.map((event, index) => (
						<div
							key={index}
							className='flex-shrink-0 w-full md:w-1/2 h-full bg-white rounded-lg shadow-lg overflow-hidden'
						>
							<img
								src={event.image}
								alt={event.title}
								className='w-full h-56 object-cover bg-emerald-100'
							/>
							<div className='relative p-6 flex flex-col gap-3 h-full overflow-y-auto'>
								<div className='text-sm text-white font-medium mb-2 bg-emerald-800 w-fit px-3 py-1 rounded-xl'>
									{event.date}
								</div>
								<div className='text-xl text-emerald-900 font-bold'>
									<TruncateText text={event.title} maxLength={20} />
								</div>
								<div className='text-gray-600 text-sm mb-4'>
									<TruncateText text={event.description} maxLength={60} />
								</div>
								<Link
									to={`/events/${event._id}`}
									className='text-emerald-900 text-md w-fit hover:underline'
								>
									Read More
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

const EventsSection = () => {
	return (
		<div
			id='achievements'
			className='flex justify-center w-full py-10 bg-gray-100'
		>
			<div className='w-full max-w-6xl flex justify-between items-start flex-col lg:flex-row gap-7 px-4 md:px-6 py-16'>
				<SuccessStoriesCarousel />
				<EventsCarousel />
			</div>
		</div>
	);
};

export default EventsSection;
