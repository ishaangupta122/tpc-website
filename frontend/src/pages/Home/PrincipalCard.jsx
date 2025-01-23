import { MoveRight } from 'lucide-react';

const PrincipalCard = () => {
	return (
		<>
			<div className="flex justify-center items-center md:m-10 mx-3 my-10 ">
				<div className="flex lg:flex-row flex-col lg:gap-4 gap-10 p-4 bg-gray-100 items-center justify-between w-[90vw] rounded-2xl max-w-5xl">
					<div className="bg-white h-60 rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden p-2 shadow-md shadow-black/30">
						<img
							src="./principal.jpeg"
							alt="principal"
							className="h-full w-full object-cover aspect-[2/1] rounded-tr-[4rem] rounded-bl-[4rem] shadow-md shadow-black/30"
						/>
					</div>
					<div className="flex flex-col lg:w-[60%] w-full gap-2">
						<h1 className="font-bold text-3xl">
							<span className="text-green-800">{`Principal's `}</span>
							<span className="">Message</span>
						</h1>
						<p className="text-md font-normal ">Dr. Ankush Kansal</p>
						<p className="text-sm font-normal text-gray-600">
							India today is an emerging economic power. Since the economic liberalization, industry
							has seen significant growth and the country has successfully leveraged its engineering
							skills to build a formidable manufacturing sector. The continued improvement in
							industrial infrastructure coupled with favourable policies and thrust from the
							Government are expected to help sustain the growth momentum in manufacturing.
						</p>
						<a
							href="/principal"
							className="text-green-800 w-fit flex items-center justify-center gap-1 hover:underline">
							Read More
							<MoveRight />
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default PrincipalCard;
