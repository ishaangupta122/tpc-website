import { ChevronRight } from 'lucide-react';

const HeroSection = ({ imageUrl, title, breadcrumbs }) => {
	return (
		<>
			<div className="">
				<div className="relative">
					{/* Full-width hero image */}
					<div className="w-full h-52 relative">
						<img
							src={imageUrl}
							alt="Page Background"
							className="absolute inset-0 w-full h-full object-cover"
						/>
						{/* Overlay to improve text readability */}
						<div className="absolute inset-0 bg-black bg-opacity-60"></div>

						{/* Centered title */}
						<div className="absolute inset-0 flex items-center justify-start px-10">
							<h1 className="text-5xl font-semibold text-white ml-10 uppercase">{title}</h1>
						</div>
					</div>
				</div>
				{/* Breadcrumb navigation */}
				<div className="flex w-full bg-gray-200 px-20 py-2 items-center">
					{breadcrumbs.map((breadcrumb, index) => (
						<span key={index} className="flex items-center">
							<a
								href={breadcrumb.href}
								className={`text-lg font-medium ${
									index === breadcrumbs.length - 1 ? 'text-green-800' : ''
								}`}>
								{breadcrumb.label}
							</a>
							{index < breadcrumbs.length - 1 && <ChevronRight />}
						</span>
					))}
				</div>
			</div>
		</>
	);
};

export default HeroSection;
