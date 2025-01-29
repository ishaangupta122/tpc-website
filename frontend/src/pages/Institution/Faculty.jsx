import { useState } from 'react';
import { Search } from 'lucide-react';
import HeroSection from '../../components/HeroSection';

const Faculty = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Faculty', href: '/faculty' },
	];

	const [facultyList] = useState([
		{
			id: 1,
			name: 'Dr. John Smith',
			title: 'Professor, Computer Science Engineering',
			email: 'john.smith@college.edu',
			phone: '+91 XXXXX-XXXXX',
			designation: 'Superintendent',
			department: 'Computer Science Engineering',
			joinedDate: 'September 15, 2018',
			education: [
				'Ph.D. in Computer Science',
				'M.S. in Computer Science',
				'B.Tech in Computer Science',
			],
			experience: '23 Years',
			image: 'https://avatar.iran.liara.run/public',
		},
		{
			id: 2,
			name: 'Dr. Sarah Johnson',
			title: 'Associate Professor, Electrical Engineering',
			email: 'sarah.johnson@college.edu',
			phone: '+91 XXXXX-XXXXX',
			designation: 'Clerk',
			department: 'Civil Engineering',
			joinedDate: 'August 20, 2019',
			education: ['Ph.D. in Physics', 'M.S. in Physics', 'B.S. in Physics'],
			experience: '23 Years',
			image: 'https://avatar.iran.liara.run/public',
		},
		{
			id: 3,
			name: 'Dr. Michael Chen',
			title: 'Assistant Professor, Civil Engineering',
			email: 'michael.chen@college.edu',
			phone: '+91 XXXXX-XXXXX',
			designation: 'PA to Principal',
			department: 'Mechanical Engineering',
			joinedDate: 'January 10, 2020',
			education: ['Ph.D. in Mathematics', 'M.S. in Mathematics', 'B.S. in Mathematics'],
			experience: '23 Years',
			image: 'https://avatar.iran.liara.run/public',
		},
		{
			id: 4,
			name: 'Dr. Michael Chen',
			title: 'Assistant Professor, Civil Engineering',
			email: 'michael.chen@college.edu',
			phone: '+91 XXXXX-XXXXX',
			designation: 'Jr. Asstt.',
			department: 'Electrical Engineering',
			joinedDate: 'January 10, 2020',
			education: ['Ph.D. in Mathematics', 'M.S. in Mathematics', 'B.S. in Mathematics'],
			experience: '23 Years',
			image: 'https://avatar.iran.liara.run/public',
		},
		{
			id: 5,
			name: 'Dr. Michael Chen',
			title: 'Assistant Professor, Civil Engineering',
			email: 'michael.chen@college.edu',
			phone: '+91 XXXXX-XXXXX',
			designation: 'Sr. Asstt.',
			department: 'Architechural Assistantship',
			joinedDate: 'January 10, 2020',
			education: ['Ph.D. in Mathematics', 'M.S. in Mathematics', 'B.S. in Mathematics'],
			experience: '23 Years',
			image: 'https://avatar.iran.liara.run/public',
		},
	]);

	const [searchQuery, setSearchQuery] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState('');

	const departments = [
		'All',
		'Applied Science',
		'Computer Science Engineering',
		'Civil Engineering',
		'Mechanical Engineering',
		'Electrical Engineering',
		'Architechural Assitantship',
	];

	const filteredFaculty = facultyList.filter((faculty) => {
		const matchesSearch =
			faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			faculty.department.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesDepartment =
			!selectedDepartment ||
			selectedDepartment === 'All' ||
			faculty.department === selectedDepartment;
		return matchesSearch && matchesDepartment;
	});

	return (
		<>
			<HeroSection imageUrl="./rec_gate.jpg" title="Faculty" breadcrumbs={breadcrumbs} />

			<div className="flex items-center flex-col">
				<section className="px-6 lg:px-16 py-6 lg:py-16  max-w-7xl">
					<div className="mb-6 space-y-6">
						<h1 className="text-2xl font-semibold mb-4 uppercase text-green-900">
							College <span className="text-black">Faculty</span>
						</h1>
						{/* Filters and Search */}
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="relative flex-1">
								<input
									type="search"
									placeholder="Search faculty..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<Search className="w-5 h-5 absolute left-3 top-2.5 text-neutral-400" />
							</div>
							<select
								value={selectedDepartment}
								onChange={(e) => setSelectedDepartment(e.target.value)}
								className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
								<option value="">All Departments</option>
								{departments
									.filter((designation) => designation !== 'All')
									.map((designation) => (
										<option key={designation} value={designation}>
											{designation}
										</option>
									))}
							</select>
						</div>
					</div>
					{/* Faculty List */}
					{filteredFaculty.length === 0 ? (
						<div className="bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600">
							No faculty members found matching your search.
						</div>
					) : (
						<div className="flex items-center justify-center w-full ">
							<div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full gap-x-4 gap-y-6 justify-items-center ">
								{filteredFaculty.map((faculty) => (
									<div
										key={faculty.id}
										className="bg-white rounded-lg shadow-lg overflow-hidden w-full lg:w-fit">
										{/* Header Section */}
										<div className="bg-gradient-to-b from-emerald-800 to-emerald-950 text-white px-6 py-4">
											<div className="flex items-center gap-4">
												<img
													src={faculty.image}
													alt="Profile"
													className="w-20 h-20 rounded-full object-cover border-4 border-white"
													loading="lazy"
												/>
												<div>
													<h2 className="text-lg font-semibold ">{faculty.name}</h2>
													<p className="text-sm font-normal">{faculty.title}</p>
												</div>
											</div>
										</div>

										{/* Details Section */}
										<div className="p-6 space-y-2 text-sm">
											<div className="flex gap-2 justify-start items-center">
												<h3 className=" text-gray-500 font-semibold">Email:</h3>
												<p className="text-gray-800 font-medium">{faculty.email}</p>
											</div>
											{/* Email */}
											{/* Phone */}
											<div className="flex gap-2 justify-start items-center">
												<h3 className=" text-gray-500  font-semibold">Phone:</h3>
												<p className="text-gray-800 font-medium">{faculty.phone}</p>
											</div>
											{/* Designation */}
											<div className="flex gap-2 justify-start items-center">
												<h3 className=" text-gray-500  font-semibold">Designation:</h3>
												<p className="text-gray-800 font-medium">{faculty.department}</p>
											</div>
											{/* Joined Date */}
											<div className="flex gap-2 justify-start items-center">
												<h3 className=" text-gray-500 font-semibold">Joined Date:</h3>
												<p className="text-gray-800  font-medium">{faculty.joinedDate}</p>
											</div>
											{/* Experience */}
											<div className="flex gap-2 justify-start items-center">
												<h3 className=" text-gray-500  font-semibold">Experience:</h3>
												<p className="text-gray-800 font-medium">{faculty.experience}</p>
											</div>
											{/* Education Section */}
											<div className="text-sm">
												<h3 className=" text-gray-500 mb-2  font-semibold">Education:</h3>
												<ul className="space-y-1 list-disc list-inside">
													{faculty.education.map((edu, index) => (
														<li key={index} className="text-gray-800 font-medium ">
															{edu}
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</section>
			</div>
		</>
	);
};

export default Faculty;
