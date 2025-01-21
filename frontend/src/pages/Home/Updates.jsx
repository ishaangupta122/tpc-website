import { MoveRight } from 'lucide-react';
import { useState } from 'react';

const Updates = () => {
	// State for updates and ticker items
	const [updates] = useState([
		{
			id: 1,
			date: '15 March 2024',
			title: 'New Academic Programs',
			description:
				'Launching courses in Artificial Intelligence and Data Science from the upcoming semester.',
			category: 'New',
			image: './image1.jpeg',
		},
		{
			id: 2,
			date: '21 December 2024',
			title: 'Scholarship Opportunities',
			description: 'Increased funding for merit-based scholarships starting this academic year.',
			category: 'Scholarship',
			image: './image2.jpeg',
		},
		{
			id: 3,
			date: '4 November 2024',
			title: 'New Research Center Launch',
			description: 'State-of-the-art AI research facility inaugurated with industry collaboration.',
			category: 'Research',
			image: './image3.jpeg',
		},
	]);

	const [tickerItems] = useState([
		'🎓 Admissions open for 2024-25 academic year',
		'🏆 University ranks #1 in Innovation',
		'📢 Campus recruitment drive starts next week',
		'🌟 New scholarship programs announced',
	]);

	return (
		<section id="latest-updates" className="py-20 bg-[#98002E]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-white mb-2">Latest Updates</h2>
					<div className="w-24 h-1 bg-[#FDB714] mx-auto rounded-lg" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{updates.map((update) => (
						<div
							key={update.id}
							className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
							<div className="relative h-48 bg-[#98002E]/20 border border-b-[6px] border-[#98002E]">
								<img src={update.image} alt={update.title} className="h-full w-full object-cover" />
								<div className="absolute top-4 left-4 font-medium bg-[#98002E]/90 text-white px-3 py-1 rounded-full text-sm">
									{update.category}
								</div>
							</div>
							<div className="p-6">
								<div className="text-sm text-black mb-2">{update.date}</div>
								<h3 className="text-xl font-bold text-[#98002E] mb-3">{update.title}</h3>
								<p className="text-gray-600 mb-16 pb-2">{update.description}</p>
								<a
									href="#"
									className="absolute bottom-[30px] bg-[#98002E] hover:bg-[#98002E]/90 inline-flex items-center px-5 py-3 text-white rounded-3xl">
									Read More
									<MoveRight className="ml-2 " />
								</a>
							</div>
						</div>
					))}
				</div>
				<div className="mt-16 bg-white rounded-xl shadow-md p-4">
					<div className="flex items-center">
						<div className="bg-[#FDB714] text-black font-semibold px-4 py-2 rounded-lg mr-4">
							LATEST
						</div>
						<div className="ticker-wrap overflow-hidden flex-1">
							<div className="ticker animate-ticker">
								{tickerItems.map((item, index) => (
									<span key={index} className="inline-block mr-16 text-gray-900 font-semibold">
										{item}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<style
				dangerouslySetInnerHTML={{
					__html: `
            @keyframes ticker {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(-100%);
              }
            }
            .animate-ticker {
              animation: ticker 20s linear infinite;
            }
            .ticker-wrap {
              white-space: nowrap;
            }
          `,
				}}
			/>
		</section>
	);
};

export default Updates;
