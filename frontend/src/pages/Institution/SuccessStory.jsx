import { BookUser } from 'lucide-react';
import HeroSection from '../../components/HeroSection';

const SuccessStory = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Success Story', href: '/success-story' },
	];
	return (
		<>
			<HeroSection imageUrl="./rec_gate.jpg" title="Success Story" breadcrumbs={breadcrumbs} />
			<div className="mx-4">
				<div className="container bg-gray-100 max-w-5xl mx-auto px-4 md:px-6 py-16 my-10 shadow-lg rounded-lg flex items-start justify-start flex-wrap md:flex-nowrap md:space-x-8">
					<div className="w-full md:w-1/2 mb-5 md:m-0 ">
						<img
							src="./monika.jpg"
							alt="Student Success Story"
							className="w-full h-auto rounded-lg object-cover shadow-md"
						/>
					</div>
					<div className="w-full md:w-1/2 ">
						<h2 className="text-3xl font-semibold text-green-900 mb-4 flex items-center">
							Lorem ipsum dolor sit amet.
						</h2>
						<p className="text-gray-700 text-md leading-relaxed">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos facilis sunt illo
							officiis quidem delectus saepe voluptatibus recusandae itaque veritatis iusto,
							accusantium, aliquam obcaecati dolorem repellendus dolore ea minus. Assumenda totam
							laudantium mollitia distinctio excepturi nulla officiis vitae tempore atque vel
							perspiciatis libero, culpa delectus quasi accusantium dicta qui animi corporis ea
							voluptatibus! Maiores quod veniam, nisi id beatae atque quos eligendi corporis hic,
							nihil consectetur dolo.
						</p>
						<div className="mt-6 flex items-center text-sm text-gray-500">
							<BookUser className="mr-2" size={20} />
							Class of 2024 | Computer Science
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SuccessStory;
