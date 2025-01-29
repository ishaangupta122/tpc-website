const PlacementsData = () => {
	return (
		<div className="relative w-full lg:h-64 h-[70vh] ">
			{/* Background Image Layer */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat h-full w-full"
				style={{
					backgroundImage: `url('./rec_gate.jpg')`,
				}}>
				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-black/60"></div>
			</div>

			{/* Content Layer */}
			<div className="relative h-full flex items-center justify-center">
				<div className="w-full flex space-y-10 lg:justify-between lg:space-y-0 flex-wrap lg:flex-nowrap px-4 md:px-12 max-w-6xl justify-center">
					<div className="text-white font-semibold flex flex-col justify-center items-start">
						<h3 className="text-6xl text-white font-semibold">#TPC</h3>
						<p
							className="text-4xl uppercase text-transparent font-extrabold tracking-wide"
							style={{ WebkitTextStroke: '2px white' }}>
							Placements
						</p>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 text-center lg:gap-x-20 lg:gap-y-10 gap-10 tracking-tighter">
						{/* Companies Visited */}
						<div className="text-white  flex flex-col justify-start lg:items-start items-center ">
							<h3 className="md:text-4xl text-3xl font-medium">30+</h3>
							<p className="uppercase text-md font-normal ">Companies Visited</p>
						</div>
						{/* Students Placed */}
						<div className="text-white  flex flex-col justify-start lg:items-start items-center">
							<h3 className="md:text-4xl text-3xl font-medium">200+</h3>
							<p className=" font-normal text-md uppercase">Students Placed</p>
						</div>
						{/* Faculty */}
						<div className="text-white  flex flex-col justify-start lg:items-start items-center">
							<h3 className="md:text-4xl text-3xl font-medium">10 LPA</h3>
							<p className="font-normal  text-md uppercase">Highest Package</p>
						</div>
						{/* Staff */}
						<div className="text-white  flex flex-col justify-start lg:items-start items-center">
							<h3 className="md:text-4xl text-3xl font-medium">10+</h3>
							<p className=" font-normal text-md uppercase">Start ups</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlacementsData;
