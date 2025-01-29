import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import TruncateText from '../../components/TruncateText';

const SuccessStoriesCarousel = () => {
	const successStories = [
		{
			title: 'Global Expansion Success',
			description: 'Achieved 300% growth in international markets within 6 months',
			image: './gurmehak.jpg',
		},
		{
			title: 'Digital Transformation',
			description: 'Modernized legacy systems resulting in 50% operational cost reduction',
			image: './monika.jpg',
		},
		{
			title: 'Customer Success Story',
			description: 'Implemented AI solutions leading to 80% faster processing times',
			image: './arsheen.jpg',
		},
		{
			title: 'Startup Growth Case',
			description: 'Scaled from seed to Series B in 18 months with our platform',
			image: './deepak.jpg',
		},
	];

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
		<div className="w-full lg:w-[35vw]">
			<div className="relative w-full">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold uppercase">
						<span className="text-emerald-900">Success </span> Stories
					</h2>
					<div className="flex gap-2">
						<button
							onClick={handleScrollUp}
							className="p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95">
							<ChevronUp size={24} />
						</button>
						<button
							onClick={handleScrollDown}
							className="p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95">
							<ChevronDown size={24} />
						</button>
					</div>
				</div>

				<div
					id="stories-container"
					ref={containerRef}
					className="flex flex-col gap-4 h-[550px] overflow-y-auto bg-gray-200 p-4 rounded-lg"
					style={{
						scrollBehavior: 'smooth',
						msOverflowStyle: 'none',
						scrollbarWidth: 'none',
					}}>
					{successStories.map((story, index) => (
						<div
							key={index}
							className="flex bg-white rounded-lg shadow-lg overflow-hidden min-h-56 w-full">
							<div className="overflow-hidden rounded-l-lg h-full w-1/2">
								<img
									src={story.image}
									alt={story.title}
									className="h-full w-full object-cover bg-emerald-100"
								/>
							</div>
							<div className="w-1/2 px-3 py-4 flex flex-col gap-4">
								<h2 className="text-md font-semibold text-emerald-900">
									<TruncateText text={story.title} maxLength={30} />
								</h2>
								<p className="text-gray-600 text-xs">
									<TruncateText text={story.description} maxLength={80} />
								</p>
								<a href="/" className="text-emerald-900 text-sm hover:underline">
									Read More
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const AchievementsCarousel = () => {
	const achievements = [
		{
			title: 'Project Launch',
			date: '2024',
			description: 'Successfully launched flagship product with 100k+ users',
			image: './image1.jpeg',
		},
		{
			title: 'Revenue Milestone',
			date: '2023',
			description: 'Achieved $1M ARR within first year of operations',
			image: './rec_gate.jpg',
		},
		{
			title: 'Team Growth',
			date: '2023',
			description: 'Expanded team from 5 to 50 employees globally',
			image: './campus.webp',
		},
		{
			title: 'Market Expansion',
			date: '2022',
			description: 'Entered 5 new international markets',
			image: './girls_hostel.jpg',
		},
		{
			title: 'Industry Award',
			date: '2022',
			description: "Named 'Most Innovative Startup' by TechAwards",
			image: './boys_hostel.jpg',
		},
	];

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
		<div className="relative lg:w-[60vw] w-full">
			<div className="flex items-center mb-6 px-4">
				<h2 className="text-2xl font-semibold flex-grow uppercase">
					<span className="text-emerald-900">College </span>Achievements
				</h2>
				<div className="flex gap-2">
					<button
						onClick={handleScrollLeft}
						className="p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95">
						<ChevronLeft size={24} />
					</button>
					<button
						onClick={handleScrollRight}
						className="p-2 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:bg-gradient-to-b hover:from-emerald-800/95 hover:to-emerald-950/95">
						<ChevronRight size={24} />
					</button>
				</div>
			</div>

			<div
				id="achievements-container"
				ref={containerRef}
				className="flex overflow-x-auto gap-4 h-[550px] scroll-smooth px-4 pb-4"
				style={{
					scrollBehavior: 'smooth',
					msOverflowStyle: 'none',
					scrollbarWidth: 'none',
				}}>
				{achievements.map((achievement, index) => (
					<div
						key={index}
						className="flex-shrink-0 w-full md:w-1/2 h-full bg-white rounded-lg shadow-lg overflow-hidden">
						<img
							src={achievement.image}
							alt={achievement.title}
							className="w-full h-56 object-cover bg-emerald-100"
						/>
						<div className="relative p-6 flex flex-col gap-3 h-full overflow-y-auto">
							<div className="text-sm text-white font-medium mb-2 bg-emerald-800 w-fit px-3 py-1 rounded-xl">
								{achievement.date}
							</div>
							<h3 className="text-xl text-emerald-900 font-bold">
								<TruncateText text={achievement.title} maxLength={30} />
							</h3>
							<p className="text-gray-600 text-sm mb-5">
								<TruncateText text={achievement.description} maxLength={60} />
							</p>
							<a href="/" className="text-emerald-900 text-md w-fit hover:underline">
								Read More
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const AchievementsSection = () => {
	return (
		<div id="achievements" className="flex justify-center w-full py-10 bg-gray-100">
			<div className="w-full max-w-6xl flex justify-between items-start flex-col lg:flex-row gap-7 px-4 md:px-6 py-16">
				<SuccessStoriesCarousel />
				<AchievementsCarousel />
			</div>
		</div>
	);
};
export default AchievementsSection;
