import HeroSection from '../../components/HeroSection';

const EventPage = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Events', href: '/achievements' },
	];

	const update = {
		date: 'January 15, 2024',
		title: 'New Research Center Launched',
		image: './boys_hostel.jpg',
		description:
			'NIT Jalandhar hosted an interactive session with media delegates from the Press Information Bureau (PIB), Andhra Pradesh, as part of their press tour to Punjab organized by PIB Andhra Pradesh under the aegis of the Ministry of Information and Broadcasting, Government of India. The tour aimed to enhance public awareness and participation in government policies, promoting better governance. The delegates’ visit to NIT Jalandhar centred on discussions about the implementation of the National Education Policy (NEP) 2020, highlighting its impact and progress. The delegation included two officers from PIB Andhra Pradesh and approximately ten journalists, led by Sh Rajendra Chaudhary, the Additional Director General of PIB Vijaywada. The event was attended by Prof Ajay Bansal (Registrar, NIT Jalandhar), Prof Raman Bedi (Dean Academics), Prof Anish Sachdeva (Dean Student Welfare), Prof Rohit Mehra (Dean Research and Consultancy), Prof Subhas Chander (Dean Planning and Development), Prof Mamta Khosla (Dean Industry and International Affairs) and other faculty members of the Institute.The interaction session commenced with a welcome note from Prof Ajay Bansal, Registrar, who highlighted the role of media in shaping the nation’s future. He further laid down the glory of Punjab’s cultural heritage and the importance of inculcating values from different cultural backgrounds of the nation. He highlighted the recent achievements of NIT Jalandhar in the past year. The Institute has achieved an impressive ranking band of 661-680 in the QS World University Rankings Asia 2025. The Institute’s faculty have excelled in research by publishing papers in renowned journals and bagging funding worth crores. The Institute has also got a funding of Rs 240 crores for infrastructure development under HEFA. The media delegates were felicitated by the faculty members of the Institute. In order to acquaint them with the glorious cultural heritage of Punjab, a Bhangra performance was organized. Sh Rajendra Chaudhary, ADG, PIB Vijaywada addressed the audience and shared his insights about the role of NEP in nurturing the creativity of students. Prof Raman Bedi, Dean Academics of the Institute enlightenment everyone with the initiatives taken by NIT Jalandhar with respect to the policies of NEP. NIT Jalandhar has implemented key initiatives under the National Education Policy to enhance education quality and opportunities. It offers flexible programs like B.Tech with Research, B.Tech with Minors, an Integrated B.Sc.–B.Ed., and an Integrated B.Tech-MBA in collaboration with IIM Amritsar. Direct PhD admissions at IIT Madras and open M.Tech programs for all streams further expand academic pathways. The Institute has signed 29 MoUs with industries and organizations like ISRO, fostering innovation and collaboration. Additionally, students can pursue diplomas and MBAs through a partnership with IIM Visakhapatnam. NIT Jalandhar has undertaken impactful projects aligned with its academic and research goals. A significant initiative includes the development of a robust document image analysis and bilingual recognition system for Gurmukhi and Roman scripts, sponsored by the Ministry of Communication and IT. Research on script identification using deep learning, Indian Sign Language recognition, and image captioning for Indian languages showcases its focus on regional and technological advancements. The interaction session concluded with a vote of thanks by Dr. AK Chaudhary. The media delegates enagged in discussions on different aspects of the National Education Policy (NEP) 2020. Prof. Binod Kumar Kanaujia, Director of NIT Jalandhar, extended his best wishes to the media delegation for their press tour and expressed gratitude for their visit to the Institute.',
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
			<HeroSection imageUrl="./girls_hostel.jpg" title="Latest Events" breadcrumbs={breadcrumbs} />
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
					className="w-full h-[500px] object-cover mb-8 shadow-lg rounded-md"
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

export default EventPage;
