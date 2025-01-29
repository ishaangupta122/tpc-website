import HeroSection from '../../components/HeroSection';

const AchievementPage = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Achievements', href: '/achievements' },
	];

	const update = {
		date: 'Dec 15, 2024',
		title: 'NDLI Award from Nation Digital Library of India.',
		image: './ndli_award.jpg',
		description:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis laboriosam optio enim beatae. Beatae distinctio est ducimus, assumenda numquam repellendus hic, incidunt pariatur corrupti quis maiores similique earum error? Harum, cum, quia natus sunt, a aliquam obcaecati maxime quam labore modi hic esse et qui rerum quos iste ab nostrum omnis nobis aperiam unde odio rem in! Itaque perferendis dolorem atque nostrum, expedita quidem cumque, excepturi hic dolorum vitae corrupti aut inventore! Possimus harum maxime ullam saepe neque repudiandae, vero soluta id obcaecati inventore, iure et dolore consequatur velit suscipit nesciunt doloremque placeat? In iure vitae debitis sit quos dolores fugit, saepe, nihil ipsam nisi velit ullam eligendi adipisci iusto officia quaerat architecto distinctio quod quas. Ex explicabo, optio eaque necessitatibus laboriosam dolorem labore velit earum rerum aut magnam id assumenda dolorum sunt fugiat saepe sit unde deserunt est consectetur perspiciatis iure numquam. Suscipit, provident aliquam! Explicabo iure quod cum dolore accusamus dolor ipsum dolorem culpa repellendus voluptatibus! Molestias provident nam dolores. Non debitis, eligendi ex quidem fugit reiciendis quae iste aut ipsum saepe iure officiis illo. Quam ullam placeat ex porro quaerat. Nostrum voluptates, numquam culpa veritatis labore voluptate maiores distinctio deserunt nulla quasi dolorum, debitis est doloremque expedita id quia commodi. Vel consequuntur odit necessitatibus, quas repudiandae vero dolorum, quae id, porro repellat aliquam labore. Sed voluptatum dolor corrupti molestiae fugiat nam, asperiores, porro facere ipsam vel similique cumque velit eligendi beatae saepe quisquam perspiciatis rerum temporibus necessitatibus. Eaque aperiam inventore laboriosam consequatur nisi magni eum quae blanditiis animi ullam, nostrum suscipit, amet quibusdam. Dolorum neque corporis iure ad recusandae nemo ratione facere quae, ex distinctio tenetur unde repellat dolores! Architecto corporis officia reprehenderit laudantium qui itaque quia nulla saepe incidunt eum unde rerum, repellat neque vitae repudiandae vel ad dolores? Voluptate est cumque voluptates nesciunt, optio reprehenderit?',
	};

	const splitDescription = (text) => {
		const totalLength = text.length;
		const splitPoints = [
			Math.floor(totalLength * 0.25),
			Math.floor(totalLength * 0.5),
			Math.floor(totalLength * 0.75),
		];

		const findNearestSentenceEnd = (position) => {
			const forwardSearch = text.indexOf('.', position);
			const backwardSearch = text.lastIndexOf('.', position);
			return forwardSearch !== -1 ? forwardSearch : backwardSearch;
		};

		const paragraphs = splitPoints.map((point, index) => {
			const start = index === 0 ? 0 : findNearestSentenceEnd(point) + 2;
			const end =
				index === splitPoints.length - 1
					? text.length
					: findNearestSentenceEnd(splitPoints[index + 1]);

			return text.slice(start, end).trim() + '.';
		});

		return paragraphs;
	};

	const paragraphs = splitDescription(update.description);

	return (
		<>
			<HeroSection
				imageUrl="./boys_hostel.jpg"
				title="Latest Achievements"
				breadcrumbs={breadcrumbs}
			/>
			<div className="max-w-5xl mx-auto py-16 px-4 md:px-6">
				<div className="mb-8">
					<p className="text-gray-600 mb-2 tracking-wide uppercase text-sm font-medium">
						{update.date}
					</p>
					<h1 className="text-3xl font-medium text-gray-900 mb-6">{update.title}</h1>
				</div>
				<img
					src={update.image}
					alt={update.title}
					className="w-full h-[600px] object-cover object-top mb-8 shadow-lg rounded-md"
				/>
				<div className="text-md text-gray-800 font-normal text-justify space-y-4">
					{paragraphs.map((paragraph, index) => (
						<p key={index}>{paragraph}.</p>
					))}
				</div>
			</div>
		</>
	);
};

export default AchievementPage;
