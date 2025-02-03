import { Loader } from 'lucide-react';
import HeroSection from '../../components/HeroSection';
import axios from 'axios';
import BASE_API from '../../../BASE_API/config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AchievementPage = () => {
	const { achievementId } = useParams();
	const [achievement, setAchievement] = useState(null);
	const [loading, setLoading] = useState(true);

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: achievement?.title || 'Achievements Details', href: `/achievements/${achievementId}` },
	];

	const fetchAchievement = async () => {
		try {
			const response = await axios.get(`${BASE_API}/events/${achievementId}`);
			setAchievement(response.data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAchievement();
	}, [achievementId]);

	if (loading) {
		return (
			<section className="bg-white overflow-hidden flex justify-center items-center py-20">
				<div className="flex flex-col items-center gap-4">
					<Loader className="w-8 h-8 animate-spin text-emerald-900" />
					<p className="text-emerald-900 font-medium">Loading Achievement details...</p>
				</div>
			</section>
		);
	}

	return (
		<>
			<HeroSection
				imageUrl="/boys_hostel.jpg"
				title="Latest Achievements"
				breadcrumbs={breadcrumbs}
			/>
			<div className="max-w-5xl mx-auto py-16 px-4 md:px-6">
				<div className="mb-8">
					<p className="text-gray-600 mb-2 tracking-wide uppercase text-sm font-medium">
						{achievement.date}
					</p>
					<h1 className="text-3xl font-medium text-gray-900 mb-6">{achievement.title}</h1>
				</div>
				<img
					src={achievement.image}
					alt={achievement.title}
					className="w-full h-[600px] object-cover object-top mb-8 shadow-lg rounded-md"
				/>
				<p className="text-md text-gray-800 font-normal text-justify space-y-4">
					{achievement.description}
				</p>
			</div>
		</>
	);
};

export default AchievementPage;
