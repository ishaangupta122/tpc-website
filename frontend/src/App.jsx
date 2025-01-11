import './App.css';
import Carousel from './components/Carousel';
import EventsSection from './components/Events';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Placements from './components/Placements';
import Testimonials from './components/Testimonials';
import Updates from './components/Updates';

function App() {
	return (
		<>
			<Navbar />
			<Carousel />
			<Updates />
			<EventsSection />
			<Placements />
			<Testimonials />
			<Footer />
		</>
	);
}

export default App;
