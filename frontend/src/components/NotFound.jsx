import HeroSection from './HeroSection';

const NotFound = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: '404 Not Found', href: '/' },
	];
	return (
		<>
			<HeroSection imageUrl="./rec_gate.jpg" title="404 Not Found" breadcrumbs={breadcrumbs} />
		</>
	);
};

export default NotFound;
