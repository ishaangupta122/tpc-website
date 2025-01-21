import { useState, useEffect } from 'react';

const STATIC_DATA = [
	{
		id: 'scholarships',
		title: 'Scholarships Policy',
		content: [
			{
				category: 'Merit-Based Scholarships',
				items: [
					{
						title: 'Academic Excellence Scholarship',
						description: '100% tuition waiver for students with CGPA above 3.8',
						points: [
							'Minimum 3.8 CGPA requirement',
							'Available for all disciplines',
							'Renewable each semester based on performance',
						],
					},
					{
						title: 'Department Merit Scholarship',
						description: '50% tuition waiver for top 5% students in each department',
						points: [
							'Departmental ranking based',
							'Semester-wise evaluation',
							'Includes book allowance',
						],
					},
				],
			},
			{
				category: 'Need-Based Financial Aid',
				items: [
					{
						title: 'Family Income Based Support',
						description: 'Variable support based on family income assessment',
						points: [
							'Income verification required',
							'25% to 75% fee waiver',
							'Annual renewal process',
						],
					},
				],
			},
		],
	},
	{
		id: 'examination',
		title: 'Examination Policy',
		content: [
			{
				category: 'Examination Process',
				items: [
					{
						title: 'Examination Form Submission',
						points: [
							'Submit the completed examination forms to the Principal along with the required fee.',
							'Fee will be entered online in the board website by the concerned staff of the Institute.',
						],
					},
					{
						title: 'Examination Frequency',
						points: ['Examination is conducted every semester.'],
					},
				],
			},
			{
				category: 'Re-evaluation & Rechecking',
				items: [
					{
						title: 'Re-evaluation',
						points: [
							'Fee for re-evaluation is Rs.800.00 per subject.',
							'Re-evaluation is permissible for a maximum of two subjects in one or two semesters.',
							'Re-evaluation is not allowed if the student has more than two reappear subjects.',
							'Students who applied for rechecking cannot apply for re-evaluation in the same subject.',
							'No re-evaluation after the stipulated period.',
						],
					},
					{
						title: 'Rechecking',
						points: [
							'Rechecking fee is Rs.150.00 per subject.',
							'No limit on the number of subjects for rechecking.',
							'Rechecking application must be submitted within 10 days from the date of result display.',
						],
					},
				],
			},
			{
				category: 'Completion & Improvement',
				items: [
					{
						title: 'Improvement of Division',
						points: [
							'One percent of total theory marks may be given for improving division.',
							'Grace marks may be deducted from the total grace marks given for improvement of the division.',
							'Students from the 2004 batch onwards can apply.',
							'No fee charged for applying.',
							'Submit an application with photocopies of all semester DMCs, original Transcript, and Diploma Certificate.',
						],
					},
					{
						title: 'Completion Time Limit',
						points: [
							'The maximum permissible period for completion of the diploma course is twice the duration of the course (e.g., a 3-year diploma should be completed in a maximum of 6 years).',
						],
					},
				],
			},
			{
				category: 'Examination Center Guidelines',
				items: [
					{
						title: 'Required Documents and Prohibited Items',
						points: [
							'Candidates must carry the admit card issued by the Board.',
							'No paper, cell phones, or scientific calculators allowed in the examination center.',
						],
					},
				],
			},
			{
				category: 'Detention',
				items: [
					{
						title: 'Reasons for Detention',
						points: [
							'Shortage of attendance.',
							'Non-appearance in any paper from a lower examination.',
						],
					},
				],
			},
		],
	},
	{
		id: 'migration',
		title: 'Migration Policy',
		content: [
			{
				category: 'Requirements',
				items: [
					{
						title: 'Eligibility Criteria',
						description: 'Basic requirements for migration between departments',
						points: [
							'Minimum CGPA of 2.5',
							'Completion of at least one semester',
							'No pending disciplinary actions',
							'Available seats in desired department',
						],
					},
				],
			},
			{
				category: 'Documentation',
				items: [
					{
						title: 'Required Documents',
						description: 'Essential paperwork for migration process',
						points: [
							'Migration application form',
							'No-objection certificate',
							'Academic transcripts',
							'Character certificate',
						],
					},
					{
						title: 'Processing Time',
						description: 'Standard timeline for migration requests',
						points: [
							'Initial processing: 1-2 weeks',
							'Department review: 1 week',
							'Final approval: 1 week',
							'Total duration: 3-4 weeks',
						],
					},
				],
			},
		],
	},
	{
		id: 'attendance',
		title: 'Attendance Policy',
		content: [
			{
				category: 'Requirements',
				items: [
					{
						title: 'General Requirements',
						description: 'Mandatory attendance criteria for all students',
						points: [
							'Minimum 75% attendance required in all courses',
							'Attendance below 75% results in exam disqualification',
							'Monthly attendance reports shared with parents',
							'Biometric attendance system implementation',
						],
					},
					{
						title: 'Monitoring System',
						description: 'Attendance tracking and reporting',
						points: [
							'Daily attendance recording',
							'Weekly reports generation',
							'Automated alert system for low attendance',
							'Parent portal access for monitoring',
						],
					},
				],
			},
			{
				category: 'Leave Policy',
				items: [
					{
						title: 'Types of Leave',
						description: 'Various categories of approved absences',
						points: [
							'Medical leave (with valid documentation)',
							'Personal leave (max 2 weeks per semester)',
							'Sports and cultural participation leave',
							'Emergency leave',
						],
					},
					{
						title: 'Leave Application Process',
						description: 'Steps for requesting and approval of leave',
						points: [
							'Submit application before leave period',
							'Provide supporting documents',
							'Obtain faculty advisor approval',
							'Final approval from department head',
						],
					},
				],
			},
		],
	},
	{
		id: 'trade',
		title: 'Trade Change Policy',
		content: [
			{
				category: 'Guidelines',
				items: [
					{
						title: 'Eligibility & Requirements',
						description: 'Criteria for trade/branch change',
						points: [
							'Completion of first year with minimum 3.0 CGPA',
							'No pending backlog subjects',
							'Subject to seat availability',
							'One-time change policy',
						],
					},
					{
						title: 'Application Process',
						description: 'Step-by-step procedure for trade change',
						points: [
							'Submit application to academic office',
							'Obtain recommendation from current department',
							'Approval from receiving department',
							'Final approval from Dean of Academics',
							'Payment of prescribed fee',
						],
					},
				],
			},
			{
				category: 'Important Deadlines',
				items: [
					{
						title: 'Timeline',
						description: 'Key dates for trade change process',
						points: [
							'Application submission: First week of semester',
							'Department review: Second week',
							'Final decision: Third week',
							'Completion of transfer: Before mid-semester',
						],
					},
					{
						title: 'Special Considerations',
						description: 'Additional factors in trade change',
						points: [
							'Merit-based priority system',
							'Department-specific requirements',
							'Credit transfer policies',
							'Adjustment period provisions',
						],
					},
				],
			},
		],
	},
];

const AdmissionsPage = () => {
	const [sections, setSections] = useState([]);
	const [activeTab, setActiveTab] = useState('scholarships');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch('/api/admissions-data');
			if (!response.ok) throw new Error('Failed to fetch');
			const data = await response.json();
			setSections(data);
		} catch (err) {
			console.log('Using static data:', err);
			setSections(STATIC_DATA);
		} finally {
			setLoading(false);
		}
	};

	const getBackgroundColor = (sectionId) => {
		switch (sectionId) {
			case 'scholarships':
				return 'bg-blue-50';
			case 'examination':
				return 'bg-slate-200/60';
			case 'migration':
				return 'bg-green-50';
			case 'attendance':
				return 'bg-yellow-50';
			case 'trade':
				return 'bg-purple-100/60';
			default:
				return 'bg-gray-100';
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-xl">Loading...</div>
			</div>
		);
	}

	return (
		<>
			<div className="max-w-7xl mx-auto px-4 sm:px-14 pb-8 pt-20 flex items-center justify-center xl:justify-between flex-wrap gap-4 ">
				{/* Header */}
				<h1 className="text-3xl font-bold">Admissions Information</h1>
				<div className="bg-white w-fit flex">
					<div className="flex gap-2 flex-wrap justify-center">
						{sections.map((section) => (
							<button
								key={section.id}
								onClick={() => setActiveTab(section.id)}
								className={`px-4 py-2 rounded-lg ${
									activeTab === section.id
										? 'bg-blue-600 text-white'
										: 'text-gray-600 bg-gray-100 hover:bg-gray-200'
								}`}>
								{section.title}
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="min-h-screen bg-gray-50 px-10">
				{/* Main Content */}
				<div className="max-w-7xl mx-auto px-4 py-8">
					{sections.map((section) => (
						<div key={section.id} className={activeTab === section.id ? 'block' : 'hidden'}>
							<h2 className="text-2xl font-bold mb-6">{section.title}</h2>

							{section.content.map((contentSection, idx) => (
								<div key={idx} className="mb-8">
									<h3 className="text-xl font-semibold mb-4 pb-2 border-b">
										{contentSection.category}
									</h3>

									<div className="space-y-4">
										{contentSection.items.map((item, itemIdx) => (
											<div
												key={itemIdx}
												className={`p-4 rounded-lg ${getBackgroundColor(section.id)}`}>
												<h4 className="font-semibold">{item.title}</h4>
												{item.description && (
													<p className="text-gray-600 mt-2">{item.description}</p>
												)}
												<ul className="mt-2 space-y-1">
													{item.points.map((point, pointIdx) => (
														<li key={pointIdx} className="text-gray-600">
															• {point}
														</li>
													))}
												</ul>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					))}

					{/* Help Section */}
					<div className="mt-8 bg-gray-800 text-white rounded-lg p-6">
						<h2 className="text-xl font-bold mb-4">Need Assistance?</h2>
						<p className="mb-4">Our admissions team is here to help you.</p>
						<div className="flex gap-4">
							<button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
								Contact Admissions
							</button>
							<button className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100">
								Download Guidelines
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdmissionsPage;
