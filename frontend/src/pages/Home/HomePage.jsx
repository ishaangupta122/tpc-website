import Carousel from '../../components/Carousel';
import EventsSection from '../../components/Events';
import GallerySection from '../../components/Gallery';
import PlacementCarousel from '../../components/Placements';
import PrincipalCard from '../../components/PrincipalCard';
import StaticData from '../../components/StaticData';
import Testimonials from '../../components/Testimonials';
import AchievementsCarousel from '../../components/Achievements';

const HomePage = () => {
	return (
		<>
			<Carousel />
			<AchievementsCarousel />
			<PrincipalCard />
			<StaticData />
			<EventsSection />
			<GallerySection />
			<PlacementCarousel />
			<Testimonials />
		</>
	);
};

export default HomePage;
