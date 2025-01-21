import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Clock, MapPin } from 'lucide-react';

const EventsCalendar = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');

	const initialEvents = [
		{
			id: 1,
			date: 'OCT 1',
			title: 'Tech Symposium',
			time: '9:00 AM',
			location: 'Main Auditorium',
			description:
				'Join us for a day-long symposium featuring cutting-edge technological innovations and industry experts.',
			category: 'Technical',
		},
		{
			id: 2,
			date: 'OCT 3',
			title: 'Workshop on AI',
			time: '2:00 PM',
			location: 'Lab 101',
			description:
				'Hands-on workshop covering the fundamentals of artificial intelligence and machine learning applications.',
			category: 'Workshop',
		},
		{
			id: 3,
			date: 'OCT 5',
			title: 'Career Fair',
			time: '10:00 AM',
			location: 'College Ground',
			description:
				'Annual career fair with top companies offering internships and full-time positions.',
			category: 'Career',
		},
		{
			id: 4,
			date: 'OCT 5',
			title: 'Career Fair',
			time: '10:00 AM',
			location: 'College Ground',
			description:
				'Annual career fair with top companies offering internships and full-time positions.',
			category: 'Career',
		},
	];

	const colorClasses = [
		'bg-blue-100 text-blue-800',
		'bg-green-100 text-green-800',
		'bg-purple-100 text-purple-800',
		'bg-red-100 text-red-800',
	];

	const filteredEvents = initialEvents.filter(
		(event) =>
			(event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
			(selectedCategory === '' || event.category === selectedCategory),
	);

	return (
		<section id="events-calendar" className="p-6 space-y-6 max-w-7xl">
			{/* Header */}
			<div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
				<div>
					<h1 className="text-2xl font-bold text-neutral-800">Events Calendar</h1>
					<p className="text-neutral-500">Manage and schedule college events</p>
				</div>
				<button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
					<Plus className="w-5 h-5" />
					<span className="lg:block hidden">Add New Event</span>
				</button>
			</div>

			{/* Filters and Search */}
			<div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60">
				<div className="relative flex-grow">
					<input
						type="search"
						placeholder="Search events..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
					/>
					<Search className="w-5 h-5 absolute left-3 top-2.5 text-neutral-400" />
				</div>
				<select
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
					className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500">
					<option value="">All Categories</option>
					<option value="Technical">Technical</option>
					<option value="Workshop">Workshop</option>
					<option value="Career">Career</option>
					<option value="Cultural">Cultural</option>
					<option value="Sports">Sports</option>
				</select>
			</div>

			{/* Upcoming Events List */}
			{filteredEvents.length === 0 ? (
				<div className="bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600">
					No events found matching your search.
				</div>
			) : (
				<div className="space-y-4">
					{filteredEvents.map((event, index) => (
						<div
							key={event.id}
							className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
							<div className="flex items-start space-x-4">
								<div
									className={`w-16 h-12 flex items-center justify-center ${
										colorClasses[index % colorClasses.length]
									} rounded-lg px-4 sm:px-0`}>
									<span className="text-sm font-semibold ">{event.date}</span>
								</div>
								<div className="space-y-2">
									<h4 className="text-xl font-semibold text-neutral-800">{event.title}</h4>
									<div className="space-y-1">
										<div className="flex items-center text-sm text-neutral-500">
											<Clock className="w-4 h-4 mr-2" />
											<span>{event.time}</span>
										</div>
										<div className="flex items-center text-sm text-neutral-500">
											<MapPin className="w-4 h-4 mr-2" />
											<span>{event.location}</span>
										</div>
									</div>
									<p className="text-sm text-neutral-600 max-w-xl">{event.description}</p>
								</div>
							</div>
							<div className="flex space-x-2 ml-4">
								<button className="p-2 text-blue-600 hover:text-blue-800 bg-blue-100 rounded-lg transition-colors">
									<Edit2 className="w-5 h-5" />
								</button>
								<button className="p-2 text-red-600 hover:text-red-800 bg-red-100 rounded-lg transition-colors">
									<Trash2 className="w-5 h-5" />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default EventsCalendar;
