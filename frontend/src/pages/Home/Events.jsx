import { useState, useEffect } from 'react';

const EventsSection = () => {
	const [events, setEvents] = useState([]);
	// const colors = ['blue', 'green', 'purple'];

	useEffect(() => {
		const fetchEvents = async () => {
			const data = [
				{
					date: '15 MARCH 2024',
					time: '10:00 AM - 4:00 PM',
					venue: 'Tech Auditorium, Block A',
					title: 'Tech Symposium 2024',
					description:
						'Annual technical festival featuring workshops, competitions, and guest lectures.',
					buttonText: 'Read More',
				},
				{
					date: '22 MARCH 2024',
					time: '12:00 PM - 3:00 PM',
					venue: 'Virtual Event (Zoom)',
					title: 'Global Alumni Meet',
					description:
						'Connect with alumni from around the world in this virtual networking event.',
					buttonText: 'Read More',
				},
				{
					date: '5 APRIL 2024',
					time: '9:00 AM - 6:00 PM',
					venue: 'International Conference Center',
					title: 'Research Conference',
					description: 'International conference on emerging technologies and innovation.',
					buttonText: 'Read More',
				},
				{
					date: '12 APRIL 2024',
					time: '1:00 PM - 8:00 PM',
					venue: 'Main Campus Grounds',
					title: 'Cultural Fest',
					description:
						'Annual cultural celebration featuring performances, art exhibitions, and competitions.',
					buttonText: 'Read More',
				},
			];
			setEvents(data);
		};

		fetchEvents();
	}, []);

	// Function to map color to Tailwind classes
	// const getColorClasses = (color) => {
	// 	switch (color) {
	// 		case 'blue':
	// 			return {
	// 				text: 'text-[#98002E]',
	// 				bg: 'bg-[#98002E]',
	// 				hover: 'hover:bg-[#98002E]/90',
	// 				border: 'border-[#98002E]',
	// 			};
	// 		case 'green':
	// 			return {
	// 				text: 'text-green-600',
	// 				bg: 'bg-green-600',
	// 				hover: 'hover:bg-green-700',
	// 				border: 'border-green-600',
	// 			};
	// 		case 'purple':
	// 			return {
	// 				text: 'text-purple-600',
	// 				bg: 'bg-purple-600',
	// 				hover: 'hover:bg-purple-700',
	// 				border: 'border-purple-600',
	// 			};
	// 		default:
	// 			return {};
	// 	}
	// };

	return (
		<section id="events" className="py-20 bg-gradient-to-b from-gray-50 to-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-[#98002E] mb-2">Upcoming Events</h2>
					<div className="w-24 h-1 bg-[#FDB714] mx-auto rounded-lg"></div>
				</div>

				{/* Events Timeline */}
				<div className="relative">
					{/* Timeline Line */}
					<div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#FDB714]"></div>

					{/* Event Items */}
					<div className="space-y-12">
						{events.map((event, index) => {
							// Determine the color based on the index
							// const color = colors[index % colors.length];
							// const colorClasses = getColorClasses(color);

							return (
								<div
									key={index}
									className={`relative flex flex-col md:flex-row ${
										index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
									} items-center`}>
									<div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
										<div className={`p-6 rounded-lg shadow-lg border-t-4 border-[#98002E]`}>
											<div className={`text-black text-sm font-semibold mb-2`}>{event.date}</div>
											<h3 className="text-[#98002E] text-xl font-bold mb-2">{event.title}</h3>
											<p className="text-gray-600">{event.description}</p>

											{/* New Event Time and Venue */}
											<div className="mt-2">
												<p className="text-sm text-gray-600">
													<strong>Time:</strong> {event.time}
												</p>
												<p className="text-sm text-gray-600">
													<strong>Venue:</strong> {event.venue}
												</p>
											</div>

											<button
												className={`mt-4 bg-[#98002E] hover:bg-[#98002E]/90 text-white px-4 py-2 rounded-lg text-sm font-medium`}>
												{event.buttonText}
											</button>
										</div>
									</div>
									<div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-7 h-7 rounded-full bg-[#FDB714] border-4 border-gray-50"></div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Calendar Link */}
				<div className="text-center mt-16">
					<button className="bg-[#98002E] hover:bg-[#98002E]/90 text-white font-bold py-3 px-8 rounded-lg flex items-center mx-auto ">
						<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
						</svg>
						View Full Calendar
					</button>
				</div>
			</div>
		</section>
	);
};

export default EventsSection;
