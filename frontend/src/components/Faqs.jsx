import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { faqs } from '../data';

const Faqs = () => {
	const [activeFAQ, setActiveFAQ] = useState(null);

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
