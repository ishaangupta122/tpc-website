import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const Faqs = () => {
	const [activeFAQ, setActiveFAQ] = useState(null);
	const faqs = [
		{
			question: 'What programs does the college offer?',
			answer:
				'We offer a variety of undergraduate and postgraduate programs in engineering, sciences, and humanities.',
		},
		{
			question: 'How can I apply for admission?',
			answer:
				'You can apply online through our official website or visit the admissions office.',
		},
		{
			question: 'Does the college provide hostel facilities?',
			answer:
				'Yes, we offer hostel facilities for both boys and girls with modern amenities.',
		},
		{
			question: 'What are the campus facilities?',
			answer:
				'We offer state-of-the-art laboratories, library, sports complex, and modern hostel facilities.',
		},
		{
			question: 'Whom to contact for admission related queries?',
			answer: '75088-55997, 90563-40134 OR tpcadmissions@thapar.edu',
		},
	];

	const toggleFAQ = (index) => {
		setActiveFAQ(activeFAQ === index ? null : index);
	};

	return (
		<>
			<div className='w-full lg:w-[40%]'>
				<h2 className='text-2xl font-semibold uppercase text-emerald-900 mb-8'>
					FAQ<span className='text-black'>s</span>
				</h2>
				<div className='space-y-4'>
					{faqs.map((faq, index) => (
						<div
							key={index}
							onClick={() => toggleFAQ(index)}
							className={`border cursor-pointer rounded-lg p-4 shadow-sm transition-all duration-300 
									${
										activeFAQ === index
											? 'bg-emerald-50 border-emerald-700'
											: 'bg-white border-gray-200 hover:bg-emerald-50'
									}`}
						>
							<div className='flex justify-between items-center cursor-pointer'>
								<h3 className='text-sm font-semibold text-emerald-800 '>
									{faq.question}
								</h3>
								{activeFAQ === index ? (
									<Minus className='text-emerald-800' />
								) : (
									<Plus className='text-emerald-800' />
								)}
							</div>
							{activeFAQ === index && (
								<p className='text-sm text-gray-600 mt-3 pl-2 border-l-2 border-emerald-700'>
									{faq.answer}
								</p>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Faqs;
