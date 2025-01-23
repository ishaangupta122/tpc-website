import Testimonials from './Testimonials';
import Carousel from './Carousel';
import PlacementCarousel from './Placements';
import AchievementsSection from './Achievements';
import EventsCarousel from './Events';
import PrincipalCard from './PrincipalCard';
import StaticData from './StaticData';
import PlacementsData from './PlacementData';
import GallerySection from './Gallery';

const HomePage = () => {
	return (
		<>
			<Carousel />
			<EventsCarousel />
			<PrincipalCard />
			<StaticData />
			<AchievementsSection />
			<PlacementsData />
			<GallerySection />
			<PlacementCarousel />
			<Testimonials />
		</>
	);
};

export default HomePage;
