import { useState } from 'react';
import HeroSection from '../../components/HeroSection';

const CollegePoliciesPage = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'College Policies', href: '/admission-page' },
	];

	const [policyContent] = useState({
		scholarship: {
			heading: 'Post Matric Scholarships for Scheduled Castes',
			points: [
				'Parent/Guardian income should not exceed Rs. 2,50,000/- per annum',
				'Scholar cannot hold any other scholarship/stipend',
				'Attested copy of Punjab Domicile Certificate required',
			],
		},
		examination: {
			heading: 'Examination Guidelines',
			sections: [
				{
					subheading: 'General Rules',
					points: [
						'Examinations are conducted every semester',
						'Students must submit completed examination forms with requisite fees',
						'Forms must be submitted online through www.pbteched.net',
					],
				},
				{
					subheading: 'Re-evaluation',
					points: [
						'Fee: Rs. 800.00 per subject',
						'Must apply within 10 days of result display',
						'Maximum two subjects allowed across semesters',
						'Cannot apply for both rechecking and re-evaluation in same subject',
					],
				},
				{
					subheading: 'Important Guidelines',
					points: [
						'Maximum course completion period is twice the duration of diploma',
						'Only admit card allowed in examination center',
						'No phones, calculators, or papers allowed',
					],
				},
			],
		},
		attendance: {
			heading: 'Attendance Requirements',
			points: [
				'75% overall attendance required in theory and practical',
				'Minimum 60% attendance required in each subject',
				'5% attendance shortage can be condoned by Principal on medical grounds',
				'Additional 5% condonation possible through Board Secretary',
				'Medical certificates must be submitted within 7 days of return',
			],
		},
		migration: {
			heading: 'Migration Requirements',
			sections: [
				{
					subheading: '3rd Semester Requirements',
					points: ['Must pass 1st semester in first attempt', 'Fee of Rs. 500/- required'],
				},
				{
					subheading: '5th Semester Requirements',
					points: ['Must pass 1st, 2nd & 3rd semester', 'Fee of Rs. 500/- required'],
				},
			],
		},
		tradeChange: {
			heading: 'Trade Change Rules',
			points: [
				'Trade change allowed only in 3rd semester',
				'Must clear 1st semester in first attempt',
				'Application fee: Rs. 500/- (demand draft)',
			],
		},
	});

	// Static policy structure
	const policies = [
		{ id: 'scholarship', title: 'Scholarship Policy' },
		{ id: 'examination', title: 'Examination Policy' },
		{ id: 'attendance', title: 'Attendance Policy' },
		{ id: 'migration', title: 'Migration Policy' },
		{ id: 'tradeChange', title: 'Trade Change Policy' },
	];

	// Toggle state for accordion
	const [openSections, setOpenSections] = useState({
		scholarship: true,
	});

	const toggleSection = (sectionId) => {
		setOpenSections((prev) => ({
			...prev,
			[sectionId]: !prev[sectionId],
		}));
	};

	const renderContent = (content) => {
		if (!content) return null;

		return (
			<div className="space-y-4 text-gray-700">
				{content.heading && <h3 className="font-semibold">{content.heading}</h3>}

				{content.sections ? (
					// Render content with subsections
					<div className="space-y-4">
						{content.sections.map((section, index) => (
							<div key={index}>
								<h4 className="font-semibold mb-2">{section.subheading}</h4>
								<ul className="list-disc pl-5 space-y-2">
									{section.points.map((point, pointIndex) => (
										<li key={pointIndex}>{point}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				) : (
					// Render content with just points
					<ul className="list-disc pl-5 space-y-2">
						{content.points.map((point, index) => (
							<li key={index}>{point}</li>
						))}
					</ul>
				)}
			</div>
		);
	};

	return (
		<>
			<HeroSection imageUrl="./rec_gate.jpg" title="College Policies" breadcrumbs={breadcrumbs} />

			<div className="min-h-screen bg-gray-50 lg:py-16 px-4 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<div className="mb-12">
						<h1 className="text-3xl text-center font-semibold mb-4 uppercase text-emerald-900">
							College <span className="text-black">Guidlines & Policies</span>
						</h1>
						<div className="w-28 h-1 bg-[#FDB714] rounded-full mx-auto"></div>
					</div>

					{policies.map((policy) => (
						<div key={policy.id} className="mb-4 border rounded-lg shadow-sm">
							<button
								className={`w-full px-6 py-4 text-left flex justify-between items-center ${
									openSections[policy.id]
										? 'bg-gradient-to-b from-emerald-800 to-emerald-950'
										: 'bg-white'
								} hover:bg-green-100 transition-colors rounded-t-lg`}
								onClick={() => toggleSection(policy.id)}>
								<h2
									className={`text-xl font-semibold ${
										openSections[policy.id] ? 'text-white' : 'text-emerald-900'
									}`}>
									{policy.title}
								</h2>
								<svg
									className={`w-6 h-6 transform transition-transform ${
										openSections[policy.id] ? 'text-white rotate-180' : 'text-emerald-900'
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							{openSections[policy.id] && (
								<div className="px-6 py-4 bg-white rounded-b-lg">
									{renderContent(policyContent[policy.id])}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default CollegePoliciesPage;
