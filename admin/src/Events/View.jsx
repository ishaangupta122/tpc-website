import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Clock, MapPin, X } from 'lucide-react';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../context/EventContext';

const EventsCalendar = () => {
	const [events, setEvents] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [currentEvent, setCurrentEvent] = useState(null);
	const [newEvent, setNewEvent] = useState({
		title: '',
		description: '',
		date: '',
		time: '',
		location: '',
		category: '',
	});

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		const data = await getAllEvents();
		setEvents(data);
	};

	const handleAddEvent = async () => {
		await createEvent(newEvent);
		fetchEvents();
		setIsAddDialogOpen(false);
		setNewEvent({
			title: '',
			description: '',
			date: '',
			time: '',
			location: '',
			category: '',
		});
	};

	const handleEditEvent = async () => {
		await updateEvent(currentEvent._id, currentEvent);
		fetchEvents();
		setIsEditDialogOpen(false);
		setCurrentEvent(null);
	};

	const handleDelete = async (id) => {
		await deleteEvent(id);
		fetchEvents();
	};

	const handleEditClick = (event) => {
		setCurrentEvent(event);
		setIsEditDialogOpen(true);
	};

	const filteredEvents = events.filter(
		(event) =>
			(event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
			(selectedCategory === '' || event.category === selectedCategory),
	);

	return (
		<section id="events-calendar" className="p-6 space-y-6 max-w-7xl">
			<div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
				<div>
					<h1 className="text-2xl font-bold text-neutral-800">Events & Updates</h1>
					<p className="text-neutral-500">Manage and schedule college events & updates</p>
				</div>
				<button
					onClick={() => setIsAddDialogOpen(true)}
					className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
					<Plus className="w-5 h-5" />
					<span className="lg:block hidden">Add New Event</span>
				</button>
			</div>

			<div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60">
				<div className="relative flex-grow">
					<input
						type="search"
						placeholder="Search events..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
					/>
					<Search className="w-5 h-5 absolute left-3 top-2.5 text-neutral-400" />
				</div>
				<select
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
					className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500">
					<option value="">All Categories</option>
					<option value="Technical">Technical</option>
					<option value="Workshop">Workshop</option>
					<option value="Career">Career</option>
					<option value="Cultural">Cultural</option>
					<option value="Sports">Sports</option>
				</select>
			</div>

			{filteredEvents.length === 0 ? (
				<div className="bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600">
					No events found matching your search.
				</div>
			) : (
				<div className="space-y-4">
					{filteredEvents.map((event) => (
						<div
							key={event.id}
							className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
							<div className="flex items-start space-x-4">
								<div className="w-16 h-12 flex items-center justify-center bg-green-100 text-green-800 rounded-lg px-4 sm:px-0">
									<span className="text-sm font-semibold">{event.date}</span>
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
								<button
									onClick={() => handleEditClick(event)}
									className="p-2 text-green-600 hover:text-green-800 bg-green-100 rounded-lg transition-colors">
									<Edit2 className="w-5 h-5" />
								</button>
								<button
									onClick={() => handleDelete(event._id)}
									className="p-2 text-red-600 hover:text-red-800 bg-red-100 rounded-lg transition-colors">
									<Trash2 className="w-5 h-5" />
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{isAddDialogOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg space-y-4 w-96">
						<div className="flex justify-between items-center">
							<h2 className="text-lg font-bold">Add New Event</h2>
							<button
								onClick={() => setIsAddDialogOpen(false)}
								className="text-neutral-500 hover:text-neutral-700">
								<X className="w-5 h-5" />
							</button>
						</div>
						<input
							type="text"
							placeholder="Event Title"
							value={newEvent.title}
							onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
						/>
						<textarea
							placeholder="Event Description"
							value={newEvent.description}
							onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
						/>
						<input
							type="date"
							value={newEvent.date}
							onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
						/>
						<input
							type="time"
							value={newEvent.time}
							onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
						/>
						<input
							type="text"
							placeholder="Location"
							value={newEvent.location}
							onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
						/>
						<select
							value={newEvent.category}
							onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg">
							<option value="">Select Category</option>
							<option value="Technical">Technical</option>
							<option value="Workshop">Workshop</option>
							<option value="Career">Career</option>
							<option value="Cultural">Cultural</option>
							<option value="Sports">Sports</option>
						</select>
						<button
							onClick={handleAddEvent}
							className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
							Add Event
						</button>
					</div>
				</div>
			)}

			{isEditDialogOpen && currentEvent && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg space-y-4 w-96">
						<div className="flex justify-between items-center">
							<h2 className="text-lg font-bold">Edit Event</h2>
							<button
								onClick={() => setIsEditDialogOpen(false)}
								className="text-neutral-500 hover:text-neutral-700">
								<X className="w-5 h-5" />
							</button>
						</div>
						<input
							type="text"
							placeholder="Event Title"
							value={currentEvent.title}
							onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
						/>
						<textarea
							placeholder="Event Description"
							value={currentEvent.description}
							onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
						/>
						<input
							type="date"
							value={currentEvent.date}
							onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
						/>
						<input
							type="time"
							value={currentEvent.time}
							onChange={(e) => setCurrentEvent({ ...currentEvent, time: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
						/>
						<input
							type="text"
							placeholder="Location"
							value={currentEvent.location}
							onChange={(e) => setCurrentEvent({ ...currentEvent, location: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
						/>
						<select
							value={currentEvent.category}
							onChange={(e) => setCurrentEvent({ ...currentEvent, category: e.target.value })}
							className="w-full px-4 py-2 border border-neutral-300 rounded-lg">
							<option value="">Select Category</option>
							<option value="Technical">Technical</option>
							<option value="Workshop">Workshop</option>
							<option value="Career">Career</option>
							<option value="Cultural">Cultural</option>
							<option value="Sports">Sports</option>
						</select>
						<button
							onClick={handleEditEvent}
							className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
							Save Changes
						</button>
					</div>
				</div>
			)}
		</section>
	);
};

export default EventsCalendar;
