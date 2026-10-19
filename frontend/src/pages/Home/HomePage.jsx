import Carousel from '../../components/Carousel';
import AchievementsSection from '../../components/Achievements';
import GallerySection from '../../components/Gallery';
import PlacementCarousel from '../../components/Placements';
import PrincipalCard from '../../components/PrincipalCard';
import StaticData from '../../components/StaticData';
import Testimonials from '../../components/Testimonials';
import EventsUpdates from '../../components/EventsUpdates';

const HomePage = () => {
	return (
		<>
			<Carousel />
			<EventsUpdates />
			<PrincipalCard />
			<StaticData />
			<AchievementsSection />
			<GallerySection />
			<PlacementCarousel />
			<Testimonials />
		</>
	);
};

export default HomePage;
