const StaticData = () => {
	return (
		<div className="relative w-full md:h-52 mt-20">
			{/* Background Image Layer */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: `url('./boys_hostel.jpg')`,
				}}>
				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-black/60"></div>
			</div>

			{/* Content Layer */}
			<div className="relative h-full flex items-center justify-center">
				<div className="container mx-auto px-4 py-10 md:py-0">
					<div className="grid grid-cols-1 md:grid-cols-3 space-y-10 md:space-y-0 text-center ">
						{/* Students */}
						<div className="text-white space-y-2 font-medium flex flex-col justify-center items-center">
							<h3 className="md:text-5xl text-4xl">1000+</h3>
							<div className="w-24 bg-emerald-700 rounded-lg h-1"></div>
							<p className="text-md  uppercase font-normal">Students</p>
						</div>

						{/* Faculty */}
						<div className="text-white space-y-2 font-medium flex flex-col justify-center items-center">
							<h3 className="md:text-5xl text-4xl">200+</h3>
							<div className="w-24 bg-emerald-700 rounded-lg h-1"></div>
							<p className="text-md  uppercase font-normal">Faculty & Staff</p>
						</div>

						{/* Departments */}
						<div className="text-white space-y-2 font-medium flex flex-col justify-center items-center">
							<h3 className="md:text-5xl text-4xl">50+</h3>
							<div className="w-24 bg-emerald-700 rounded-lg h-1"></div>
							<p className="text-md  uppercase font-normal">Seminars Done</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StaticData;
