const Updates = () => {
	return (
		<>
			<htmlcode>
				<div id="root">
					<section id="latest-updates" className="py-20 bg-white">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="text-center mb-16">
								<h2 className="text-4xl font-bold text-gray-900 mb-4 ">Latest Updates</h2>
								<div className="w-24 h-1 bg-blue-600 mx-auto rounded-lg" />
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								{/* Update Card 1 */}
								<div className="bg-white  rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ">
									<div className="relative h-48 bg-blue-100 ">
										<div className="absolute top-4 left-4 bg-blue-600  text-white px-3 py-1 rounded-full text-sm">
											Research
										</div>
									</div>
									<div className="p-6">
										<div className="text-sm text-gray-500  mb-2">15 March 2024</div>
										<h3 className="text-xl font-semibold text-gray-900 mb-3">
											New Research Center Launch
										</h3>
										<p className="text-gray-600  mb-4">
											State-of-the-art AI research facility inaugurated with industry collaboration.
										</p>
										<a href="#" className="text-blue-600  hover:underline inline-flex items-center">
											Read More
											<svg
												className="w-4 h-4 ml-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</a>
									</div>
								</div>

								{/*  */}
								<div className="bg-white  rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ">
									<div className="relative h-48 bg-blue-100 ">
										<div className="absolute top-4 left-4 bg-blue-600  text-white px-3 py-1 rounded-full text-sm">
											Research
										</div>
									</div>
									<div className="p-6">
										<div className="text-sm text-gray-500  mb-2">15 March 2024</div>
										<h3 className="text-xl font-semibold text-gray-900 mb-3">
											New Research Center Launch
										</h3>
										<p className="text-gray-600  mb-4">
											State-of-the-art AI research facility inaugurated with industry collaboration.
										</p>
										<a href="#" className="text-blue-600  hover:underline inline-flex items-center">
											Read More
											<svg
												className="w-4 h-4 ml-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</a>
									</div>
								</div>
								{/*  */}
								<div className="bg-white  rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ">
									<div className="relative h-48 bg-blue-100 ">
										<div className="absolute top-4 left-4 bg-blue-600  text-white px-3 py-1 rounded-full text-sm">
											Research
										</div>
									</div>
									<div className="p-6">
										<div className="text-sm text-gray-500  mb-2">15 March 2024</div>
										<h3 className="text-xl font-semibold text-gray-900 mb-3">
											New Research Center Launch
										</h3>
										<p className="text-gray-600  mb-4">
											State-of-the-art AI research facility inaugurated with industry collaboration.
										</p>
										<a href="#" className="text-blue-600  hover:underline inline-flex items-center">
											Read More
											<svg
												className="w-4 h-4 ml-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</a>
									</div>
								</div>
							</div>
							{/* Quick Updates Ticker */}
							<div className="mt-16 bg-white rounded-xl shadow-md p-4">
								<div className="flex items-center">
									<div className="bg-red-600 text-white px-4 py-2 rounded-lg mr-4">LATEST</div>
									<div className="ticker-wrap overflow-hidden flex-1">
										<div className="ticker animate-ticker">
											<span className="inline-block mr-16 text-gray-900 font-semibold">
												🎓 Admissions open for 2024-25 academic year
											</span>
											<span className="inline-block mr-16 text-gray-900  font-semibold">
												🏆 University ranks #1 in Innovation
											</span>
											<span className="inline-block mr-16 text-gray-900  font-semibold">
												📢 Campus recruitment drive starts next week
											</span>
											<span className="inline-block mr-16 text-gray-900  font-semibold">
												🌟 New scholarship programs announced
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<style
						dangerouslySetInnerHTML={{
							__html:
								'\n\t\t\t\t\t@keyframes ticker {\n\t\t\t\t\t\t0% {\n\t\t\t\t\t\t\ttransform: translateX(100%);\n\t\t\t\t\t\t}\n\t\t\t\t\t\t100% {\n\t\t\t\t\t\t\ttransform: translateX(-100%);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t.animate-ticker {\n\t\t\t\t\t\tanimation: ticker 20s linear infinite;\n\t\t\t\t\t}\n\n\t\t\t\t\t.ticker-wrap {\n\t\t\t\t\t\twhite-space: nowrap;\n\t\t\t\t\t}\n\t\t\t\t',
						}}
					/>
				</div>
			</htmlcode>
		</>
	);
};

export default Updates;
