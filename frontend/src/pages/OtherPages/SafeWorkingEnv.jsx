import { Download } from 'lucide-react';
import HeroSection from '../../components/HeroSection';

const SafeWorkingEnv = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'safe-working-environment', href: '/safe-working-environment' },
	];
	const links = [
		'Sexual harassment of women at workplace (Prevention,prohibition and redressal) Act,2013',
		'Internal Committee',
	];

	return (
		<>
			<HeroSection
				imageUrl="./rec_gate.jpg"
				title="Safe Working Environment"
				breadcrumbs={breadcrumbs}
			/>
			<div className="flex justify-center">
				<div className="flex justify-start w-full max-w-7xl">
					<div className="px-6 py-20 md:px-20">
						<h1 className="text-2xl font-semibold uppercase text-gray-900 mb-2">
							Maintenance of Safe Working Environment{' '}
							<span className="text-emerald-800">for Female Employees at TPC</span>
						</h1>
						<div className="h-[3px] w-32 bg-yellow-500 rounded-lg mb-6"></div>
						<ul className="list-disc list-inside space-y-2">
							{links.map((link) => (
								<li key={link} className="text-emerald-800">
									<a
										href="#"
										className="inline-flex items-center hover:text-blue-600 hover:underline">
										{link}
										<Download className="w-4 h-4 ml-1 inline-block" />
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default SafeWorkingEnv;
