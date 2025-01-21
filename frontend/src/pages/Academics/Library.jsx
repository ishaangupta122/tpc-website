import { useState, useEffect } from 'react';

const LibraryPage = () => {
	const [faculty, setFaculty] = useState(null);
	const [error, setError] = useState(null);

	// Static data fallback
	const staticFaculty = {
		name: 'Seema Sharma',
		title: 'Assistant Librarian',
		email: 'seemarn72@yahoo.co.in',
		phone: '+91 XXXXX-XXXXX',
		designation: 'Assistant Librarian',
		joinedDate: 'August 09, 2012',
		education: ['M.Phil (Library)', 'M.Lib', 'B.Lib'],
		experience: '19 Years',
		image: 'https://avatar.iran.liara.run/public',
	};

	useEffect(() => {
		fetch('https://api.example.com/faculty?designation=Assistant Librarian')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Failed to fetch faculty data.');
				}
				return response.json();
			})
			.then((data) => {
				setFaculty(data[0]);
			})
			.catch(() => {
				setError('');
			});
	}, []);

	const displayedFaculty = faculty || staticFaculty;

	return (
		<div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
			<div className="max-w-7xl w-full">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-3xl font-bold text-[#98002E] mb-2">Polytechnic Library</h1>
					<div className="w-24 h-1 bg-[#FDB714] mx-auto rounded-full"></div>

					<p className="text-lg text-gray-700 mt-4">
						A temple of learning and a lighthouse in the spread of knowledge.
					</p>
				</div>

				{/* Main Content */}
				<div className="grid lg:grid-cols-2 gap-5 items-start justify-center">
					{/* Image Section */}
					<div className="flex justify-center">
						<img
							src="https://imgs.search.brave.com/-f8aCLURNC-a-cl5xjMqN7f4AgqvMp4Lf7q1rUaH2KQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9vbGQtdW5pdmVy/c2l0eS1saWJyYXJ5/LWZhY3VsdHktZ2Vv/Z3JhcGh5LWhpc3Rv/cnlfMTM2ODc1LTQ2/Ni5qcGc_c2VtdD1h/aXNfaHlicmlk"
							alt="Polytechnic Library"
							className="rounded-lg shadow-lg w-full max-w-lg object-cover h-[80vh] max-h-[600px]"
						/>
					</div>

					{/* Description Section */}
					<div className="text-gray-800">
						<h2 className="text-2xl font-semibold text-[#98002E] mb-4">About Our Library</h2>
						<p className="text-base leading-7 mb-4">
							The library is a temple of learning, a lighthouse, and a chief agency in the spread of
							knowledge. Our polytechnic library boasts an open access system, an uncommon feature
							compared to the closed shelf system prevalent in other Northern Region Polytechnics.
						</p>
						<p className="text-base leading-7 mb-4">
							Managed efficiently by an Assistant Librarian and an attendant, the library provides
							excellent services to staff and students alike. The Student Aid Books facility
							benefits a large number of students every year.
						</p>
						<p className="text-base leading-7 mb-4">
							Currently, the library houses 3,566 titles, comprising 16,800 volumes. It is
							continually updated with the latest editions of books, technical and non-technical
							magazines, and journals covering all branches of study. Approximately 16,162 books are
							issued and consulted annually, showcasing its extensive usage.
						</p>
						<p className="text-base leading-7 mb-4">
							A large number of students visit the library daily to gain expertise in their
							respective fields, making it a cornerstone of academic excellence in our institution.
						</p>
					</div>
				</div>

				{/* Enhanced Faculty Section */}
				<div className="mt-20 bg-[#98002E] rounded-xl shadow-lg py-4 sm:py-16 px-4">
					<div className="max-w-3xl mx-auto">
						<div className="text-center mb-10">
							<h2 className="text-3xl font-bold text-white mb-2">Meet Our Faculty</h2>
							<div className="w-24 h-1 bg-[#FDB714] mx-auto rounded-full"></div>
							<p className="mt-4 text-gray-100 max-w-2xl mx-auto">
								{`Our library is managed by dedicated professionals who are committed to fostering an
								environment of learning and intellectual growth. Meet the expert behind our
								library's success.`}
							</p>
						</div>

						{error && <p className="text-red-600 text-center mb-6">{error}</p>}

						<div className="flex justify-center">
							<div className="bg-white rounded-lg shadow-lg overflow-hidden w-full lg:w-fit">
								{/* Faculty Profile Card - Keeping the original implementation */}
								<div className="bg-gradient-to-r from-yellow-400 to-[#FDB714] text-white px-6 py-4">
									<div className="flex items-center gap-4">
										<img
											src={displayedFaculty.image}
											alt="Profile"
											className="w-20 h-20 rounded-full object-cover border-4 border-white"
											loading="lazy"
										/>
										<div>
											<h2 className="text-xl font-bold text-black">{displayedFaculty.name}</h2>
											<p className="text-sm font-medium text-black">{displayedFaculty.title}</p>
										</div>
									</div>
								</div>

								<div className="p-6 space-y-2 text-sm">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2">
										<div>
											<h3 className="text-gray-500 font-semibold">Email:</h3>
											<p className="text-gray-800 font-medium">{displayedFaculty.email}</p>
										</div>
										<div>
											<h3 className="text-gray-500 font-semibold">Phone:</h3>
											<p className="text-gray-800 font-medium">{displayedFaculty.phone}</p>
										</div>
										<div>
											<h3 className="text-gray-500 font-semibold">Designation:</h3>
											<p className="text-gray-800 font-medium">{displayedFaculty.designation}</p>
										</div>
										<div>
											<h3 className="text-gray-500 font-semibold">Joined Date:</h3>
											<p className="text-gray-800 font-medium">{displayedFaculty.joinedDate}</p>
										</div>
										<div>
											<h3 className="text-gray-500 font-semibold">Experience:</h3>
											<p className="text-gray-800 font-medium">{displayedFaculty.experience}</p>
										</div>
									</div>

									<div>
										<h3 className="text-gray-500 mb-2 font-semibold">Education:</h3>
										<ul className="space-y-1 list-disc list-inside">
											{displayedFaculty.education.map((edu, index) => (
												<li key={index} className="text-gray-800 font-medium">
													{edu}
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LibraryPage;
