import { Download, ExternalLink } from 'lucide-react';
import HeroSection from '../../components/HeroSection';
import { Link } from 'react-router-dom';

const MandatoryDisclosure = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Mandatory-Disclosure', href: '/mandatory-disclosure' },
	];
	const links = [
		'Mandatory Disclosure (Annexure-10)',
		'Staff Service Rules',
		'Anti Ragging Committee',
		'Internal Complaint Committee',
		'Grievance Redressal Committee',
		'Internal Quality Assurance Cell',
		'SC/ST Prevention of Atrocities Committee',
		'NBA Accreditation Status',
	];

	return (
		<div>
			<HeroSection
				imageUrl="./rec_gate.jpg"
				title="Mandatory Disclosure"
				breadcrumbs={breadcrumbs}
			/>
			<div className="flex justify-center">
				<div className="flex justify-start w-full max-w-7xl">
					<div className="px-6 py-20 md:px-20">
						<h1 className="text-2xl font-semibold uppercase text-gray-900 mb-2">
							Mandatory <span className="text-emerald-800">Disclosure</span>
						</h1>
						<div className="h-[3px] w-32 bg-yellow-500 rounded-lg mb-6"></div>
						<ul className="list-disc list-inside space-y-2">
							<li className="text-emerald-800">
								<Link
									to={'/eoa'}
									className="inline-flex items-center hover:text-blue-600 hover:underline">
									EOA for the last 10 years
									<ExternalLink className="w-4 h-4 ml-1 inline-block" />
								</Link>
							</li>
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
		</div>
	);
};

export default MandatoryDisclosure;
