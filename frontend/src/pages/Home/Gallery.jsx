import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Minus, MoveRight, Plus, X } from 'lucide-react';

const GallerySection = () => {
	const [activeFAQ, setActiveFAQ] = useState(null);
	const [previewIndex, setPreviewIndex] = useState(null);
	const [gridColumns, setGridColumns] = useState(3);

	const images = [
		'./boys_hostel.jpg',
		'./girls_hostel.jpg',
		'./rec_gate.jpg',
		'./campus.webp',
		'./image1.jpeg',
		'./image3.jpeg',
		'./image2.jpeg',
		'./ndli_award.jpg',
		'./principal.jpeg',
	];

	const faqs = [
		{
			question: 'What programs does the college offer?',
			answer:
				'We offer a variety of undergraduate and postgraduate programs in engineering, sciences, and humanities.',
		},
		{
			question: 'How can I apply for admission?',
			answer: 'You can apply online through our official website or visit the admissions office.',
		},
		{
			question: 'Does the college provide hostel facilities?',
			answer: 'Yes, we offer hostel facilities for both boys and girls with modern amenities.',
		},
		{
			question: 'What are the campus facilities?',
			answer:
				'We offer state-of-the-art laboratories, library, sports complex, and modern hostel facilities.',
		},
		{
			question: 'What are the campus facilities?',
			answer:
				'We offer state-of-the-art laboratories, library, sports complex, and modern hostel facilities.',
		},
		{
			question: 'What are the campus facilities?',
			answer:
				'We offer state-of-the-art laboratories, library, sports complex, and modern hostel facilities.',
		},
	];

	useEffect(() => {
		const handleResize = () => {
			setGridColumns(window.innerWidth < 1024 ? 2 : 3);
		};

		// Set initial grid columns
		handleResize();

		// Add event listener
		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const handleEscKey = (event) => {
			if (event.key === 'Escape' && previewIndex !== null) {
				setPreviewIndex(null);
			}
		};

		window.addEventListener('keydown', handleEscKey);
		return () => window.removeEventListener('keydown', handleEscKey);
	}, [previewIndex]);

	const toggleFAQ = (index) => {
		setActiveFAQ(activeFAQ === index ? null : index);
	};

	const handlePreview = (index) => setPreviewIndex(index);
	const closePreview = () => setPreviewIndex(null);
	const showPrevious = () => setPreviewIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
	const showNext = () => setPreviewIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

	const displayedImages = gridColumns === 2 ? images.slice(0, 6) : images.slice(0, 9);

	return (
		<section id="gallery" className="py-24 bg-slate-100">
			<div className="container mx-auto px-4 md:px-10 flex justify-between flex-wrap lg:flex-nowrap gap-8">
				{/* FAQ Section */}
				<div className="w-full lg:w-[40%]">
					<h2 className="text-2xl font-semibold uppercase text-green-900 mb-8">
						FAQ<span className="text-black">s</span>
					</h2>
					<div className="space-y-4">
						{faqs.map((faq, index) => (
							<div
								key={index}
								onClick={() => toggleFAQ(index)}
								className={`border cursor-pointer rounded-lg p-4 shadow-sm transition-all duration-300 
									${
										activeFAQ === index
											? 'bg-green-50 border-green-700'
											: 'bg-white border-gray-200 hover:bg-green-50'
									}`}>
								<div className="flex justify-between items-center cursor-pointer">
									<h3 className="text-sm font-semibold text-green-800 ">{faq.question}</h3>
									{activeFAQ === index ? (
										<Minus className="text-green-800" />
									) : (
										<Plus className="text-green-800" />
									)}
								</div>
								{activeFAQ === index && (
									<p className="text-sm text-gray-600 mt-3 pl-2 border-l-2 border-green-700">
										{faq.answer}
									</p>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Gallery Section */}
				<div className="w-full  lg:w-[60%]">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-2xl font-semibold uppercase text-green-900 ">
							College<span className="text-black"> Gallery</span>
						</h2>
						<a
							href="/gallery"
							className="flex gap-1 items-center text-green-900 hover:underline text-sm font-medium">
							View All{' '}
							<span>
								<MoveRight />
							</span>
						</a>
					</div>
					<div className={`grid grid-cols-${gridColumns} gap-2`}>
						{displayedImages.map((img, index) => (
							<div
								key={index}
								className="group relative overflow-hidden rounded-sm shadow-md cursor-pointer"
								onClick={() => handlePreview(index)}>
								<img
									src={img}
									alt={`Campus Image ${index + 1}`}
									className={
										' h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105 bg-green-200/50'
									}
								/>
								<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Image Preview Modal */}
			{previewIndex !== null && (
				<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
					<button
						className="absolute top-6 right-10 text-white hover:bg-white/20 text-3xl font-light"
						onClick={closePreview}>
						<X className="h-8 w-8" />
					</button>
					<button
						className="absolute left-5 text-white text-4xl hover:bg-white/20 rounded-full p-2"
						onClick={showPrevious}>
						<ChevronLeft className="h-8 w-8" />
					</button>
					<img
						src={images[previewIndex]}
						alt={`Preview Image ${previewIndex + 1}`}
						className="max-w-[80vw] md:max-w-4xl md:max-h-[85vh] rounded-lg shadow-2xl text-white"
					/>
					<button
						className="absolute right-5 text-white text-4xl hover:bg-white/20 rounded-full p-2"
						onClick={showNext}>
						<ChevronRight className="h-8 w-8" />
					</button>
				</div>
			)}
		</section>
	);
};

export default GallerySection;
