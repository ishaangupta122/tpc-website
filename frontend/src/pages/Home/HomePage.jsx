import Carousel from '../../components/Carousel';
import EventsSection from '../../components/Events';
import GallerySection from '../../components/Gallery';
import PlacementCarousel from '../../components/Placements';
import PrincipalCard from '../../components/PrincipalCard';
import StaticData from '../../components/StaticData';
import Testimonials from '../../components/Testimonials';
import AchievementsCarousel from '../../components/Achievements';
import PlacementsData from '../../components/PlacementData';

const HomePage = () => {
	return (
		<>
			<Carousel />
			<AchievementsCarousel />
			<PrincipalCard />
			<StaticData />
			<EventsSection />
			<PlacementsData />
			<GallerySection />
			<PlacementCarousel />
			<Testimonials />
		</>
	);
};

export default HomePage;
