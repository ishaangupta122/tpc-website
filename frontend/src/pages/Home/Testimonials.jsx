import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const testimonials = [
		{
			id: 1,
			name: 'Monika Gupta',
			role: 'Programmer',
			image: './monika.jpg',
			quote:
				'I have been associated with TPC since 2008. To me, it has always been a pleasure to serve the institute.',
		},
		{
			id: 2,
			name: 'Kunnal Thapa',
			role: 'Alumni',
			image: './kunnal.jpg',
			quote:
				'My alma mater, there has been a much better improvement overall after the new building started operating.',
		},
		{
			id: 3,
			name: 'Gurmehak Kaur',
			role: 'Lecturer',
			image: './gurmehak.jpg',
			quote:
				'We take extreme pleasure in getting associated with TPC. We anticipate your extended service for fulfilling our manpower requirements in a long run.',
		},
		{
			id: 4,
			name: 'Arsheen Kaur',
			role: 'Lecturer',
			image: './arsheen.jpg',
			quote:
				'The faculty support and resources available have been instrumental in my academic journey.',
		},
		{
			id: 5,
			name: 'Deepak Batish',
			role: 'Lecturer',
			image: './deepak.jpg',
			quote:
				'The collaborative environment and state-of-the-art facilities make this institution truly special.',
		},
	];

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
	};

	return (
		<section id="testimonials" className="bg-[#FFFFFF] py-24 px-4">
			<div className="max-w-[1400px] mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-emerald-800 mb-4">What Our Community Says</h2>
					<div className="w-28 h-1 bg-[#FDB714] mx-auto rounded-full"></div>
				</div>

				<div className="relative flex items-center">
					{/* Left Button */}
					<button
						onClick={prevSlide}
						className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-blue-50 transition-all"
						aria-label="Previous">
						<ChevronLeft className="w-6 h-6 text-blue-600" />
					</button>

					{/* Cards Container */}
					<div
						className="flex w-full overflow-x-scroll scroll-smooth py-6 lg:mx-4"
						style={{
							scrollbarWidth: 'none',
							msOverflowStyle: 'none',
							WebkitOverflowScrolling: 'touch',
						}}>
						<div className="flex gap-2 px-2 transition-transform duration-500 ease-out">
							{testimonials.map((testimonial) => (
								<div
									key={testimonial.id}
									className=" max-w-[400px] w-[21rem] md:w-[20rem] lg:w-[30rem] ">
									<div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col justify-between">
										<div>
											<Quote className="w-8 h-8 text-emerald-800 mb-4" />
											<blockquote className="text-sm text-gray-600 mb-6 leading-relaxed">
												{testimonial.quote}
											</blockquote>
										</div>

										<div className="mt-auto pt-4 border-t border-gray-300">
											<div className="flex items-center">
												<div className="w-12 h-12 rounded-full overflow-hidden mr-3">
													<img
														src={testimonial.image}
														alt={testimonial.name}
														className="w-full h-full object-cover"
													/>
												</div>
												<div>
													<h4 className="font-semibold text-gray-900 text-sm">
														{testimonial.name}
													</h4>
													<p className="text-xs font-semibold text-emerald-800">
														{testimonial.role}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right Button */}
					<button
						onClick={nextSlide}
						className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-blue-50 transition-all"
						aria-label="Next">
						<ChevronRight className="w-6 h-6 text-blue-600" />
					</button>
				</div>

				{/* Pagination Dots */}
				<div className="flex justify-center mt-8 space-x-2">
					{testimonials.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`w-3 h-3 rounded-full transition-all duration-300 
                ${index === currentIndex ? 'bg-blue-600' : 'bg-blue-200'}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
