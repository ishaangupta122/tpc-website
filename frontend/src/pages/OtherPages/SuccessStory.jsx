import { BookUser, Loader } from 'lucide-react';
import HeroSection from '../../components/HeroSection';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BASE_API from '../../../BASE_API/config';
import axios from 'axios';

const SuccessStory = () => {
	const { storyId } = useParams();
	const [successStory, setSuccessStory] = useState(null);
	const [loading, setLoading] = useState(true);

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: successStory?.title || 'Event Details', href: `/events/${storyId}` },
	];

	const fetchStory = async () => {
		try {
			const response = await axios.get(`${BASE_API}/events/${storyId}`);
			setSuccessStory(response.data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStory();
	}, [storyId]);

	if (loading) {
		return (
			<section className="bg-white overflow-hidden flex justify-center items-center py-20">
				<div className="flex flex-col items-center gap-4">
					<Loader className="w-8 h-8 animate-spin text-emerald-900" />
					<p className="text-emerald-900 font-medium">Loading Success Story details...</p>
				</div>
			</section>
		);
	}

	return (
		<>
			<HeroSection imageUrl="/rec_gate.jpg" title="Success Story" breadcrumbs={breadcrumbs} />
			<div className="mx-4">
				<div className="container bg-gray-100 max-w-5xl mx-auto px-4 md:px-6 py-16 my-10 shadow-lg rounded-lg flex items-start justify-start flex-wrap md:flex-nowrap md:space-x-8">
					<div className="w-full md:w-1/2 mb-5 md:m-0 ">
						<img
							src={successStory.image || '/monika.jpg'}
							alt="Student Success Story"
							className="w-full h-auto rounded-lg object-cover shadow-md"
						/>
					</div>
					<div className="w-full md:w-1/2 ">
						<h2 className="text-3xl font-semibold text-green-900 mb-4 flex items-center">
							{successStory.title}
						</h2>
						<p className="text-gray-700 text-md leading-relaxed">{successStory.description}</p>
						<div className="mt-6 flex items-center text-sm text-gray-500">
							<BookUser className="mr-2" size={20} />
							Class of 2024 | Computer Science
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SuccessStory;
