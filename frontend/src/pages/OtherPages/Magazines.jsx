import { Download } from 'lucide-react';
import HeroSection from '../../components/HeroSection';

const CollgeMagazines = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Magazines', href: '/magazines' },
	];
	const links = [
		'College Magazine 2020',
		'College Magazine 2021',
		'College Magazine 2022',
		'College Magazine 2023',
		'College Magazine 2024',
		'College Magazine 2025',
	];

	return (
		<>
			<HeroSection imageUrl="./rec_gate.jpg" title="College Magazines" breadcrumbs={breadcrumbs} />
			<div className="max-w-2xl  p-6 md:p-20">
				<h1 className="text-2xl font-semibold uppercase text-gray-900 mb-2">
					College <span className="text-emerald-800">Magazines</span>
				</h1>
				<div className="h-[3px] w-32 bg-yellow-500 rounded-lg mb-6"></div>
				<ul className="list-disc list-inside space-y-2">
					{links.map((link) => (
						<li key={link} className="text-emerald-800">
							<a href="#" className="inline-flex items-center hover:text-blue-600 hover:underline">
								{link}
								<Download className="w-4 h-4 ml-1 inline-block" />
							</a>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default CollgeMagazines;
