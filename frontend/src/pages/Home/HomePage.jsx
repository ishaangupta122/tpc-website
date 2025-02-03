import Testimonials from './Testimonials';
import Carousel from './Carousel';
import PlacementCarousel from './Placements';
import PrincipalCard from './PrincipalCard';
import StaticData from './StaticData';
import PlacementsData from './PlacementData';
import GallerySection from './Gallery';
import EventsSection from './Events';
import AchievementsCarousel from './Achievements';

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
