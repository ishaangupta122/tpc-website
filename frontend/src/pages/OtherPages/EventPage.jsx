import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_API from '../../../BASE_API/config';
import { Loader } from 'lucide-react';
import HeroSection from '../../components/HeroSection';

const EventPage = () => {
	const { eventId } = useParams();
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: event?.title || 'Event Details', href: `/events/${eventId}` },
	];

	const fetchEvent = async () => {
		try {
			const response = await axios.get(`${BASE_API}/events/${eventId}`);
			setEvent(response.data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEvent();
	}, [eventId]);

	if (loading) {
		return (
			<section className="bg-white overflow-hidden flex justify-center items-center py-20">
				<div className="flex flex-col items-center gap-4">
					<Loader className="w-8 h-8 animate-spin text-emerald-900" />
					<p className="text-emerald-900 font-medium">Loading event details...</p>
				</div>
			</section>
		);
	}

	return (
		<>
			<HeroSection imageUrl={'/rec_gate.jpg'} title="Event Details" breadcrumbs={breadcrumbs} />
			<div className="max-w-5xl mx-auto py-16 px-4 md:px-6">
				<div className="mb-8">
					<p className="text-gray-600 mb-2 tracking-wide uppercase text-sm font-medium">
						{event.date}
					</p>
					<h1 className="text-3xl font-medium text-gray-900 mb-6">{event.title}</h1>
				</div>
				<img
					src={event.image}
					alt={event.title}
					className="w-full h-[600px] object-cover object-top mb-8 shadow-lg rounded-md"
				/>
				<p className="text-md text-gray-800 font-normal text-justify space-y-4">
					{event.description}
				</p>
			</div>
		</>
	);
};

export default EventPage;
