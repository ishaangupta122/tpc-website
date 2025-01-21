import { useState } from 'react';
import { Trash2, Search, Plus, Edit2 } from 'lucide-react';

const FacultyProfile = () => {
	const [facultyList] = useState([
		{
			id: 1,
			name: 'Dr. John Smith',
			title: 'Professor, Computer Science Engineering',
			email: 'john.smith@college.edu',
			phone: '+1 (555) 123-4567',
			department: 'Computer Science Engineering',
			designation: 'Lecturer',
			joinedDate: 'September 15, 2018',
			education: [
				'Ph.D. in Computer Science, MIT (2015)',
				'M.S. in Computer Science, Stanford University (2012)',
				'B.Tech in Computer Science, IIT Delhi (2010)',
			],
			experience: '23 Years',
			image: 'https://avatar.iran.liara.run/public',
		},
		{
			id: 2,
			name: 'Dr. Sarah Johnson',
			title: 'Associate Professor, Electrical Engineering',
			email: 'sarah.johnson@college.edu',
			phone: '+1 (555) 234-5678',
			department: 'Electrical Engineering',
			designation: 'HOD EE',
			joinedDate: 'August 20, 2019',
			education: [
				'Ph.D. in Physics, Caltech (2016)',
				'M.S. in Physics, UC Berkeley (2013)',
				'B.S. in Physics, MIT (2011)',
			],
			experience: '23 Years',
			image: 'https://avatar.iran.liara.run/public',
		},
		{
			id: 3,
			name: 'Dr. Michael Chen',
			title: 'Assistant Professor, Civil Engineering',
			email: 'michael.chen@college.edu',
			phone: '+1 (555) 345-6789',
			department: 'Civil Engineering',
			designation: 'Professor',
			joinedDate: 'January 10, 2020',
			education: [
				'Ph.D. in Mathematics, Harvard (2017)',
				'M.S. in Mathematics, Princeton (2014)',
				'B.S. in Mathematics, Yale (2012)',
			],
			experience: '23 Years',
			image: 'https://avatar.iran.liara.run/public',
		},
	]);

	const [searchQuery, setSearchQuery] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState('');

	const departments = [
		'All',
		'Admin Staff',
		'Applied Science',
		'Computer Science Engineering',
		'Electrical Engineering',
		'Civil Engineering',
		'Architectural Assistantship',
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

	const handleEdit = (id) => {
		console.log('Edit profile', id);
	};

	const handleDelete = (id) => {
		console.log('Delete profile', id);
	};

	return (
		<section className="p-6 space-y-6 max-w-7xl">
			{/* Header */}
			<div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
				<div>
					<h1 className="text-2xl font-bold text-neutral-800">Faculty Profiles</h1>
					<p className="text-neutral-500">Manage and view faculty information</p>
				</div>
				<button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
					<Plus className="w-5 h-5" />
					<span className="lg:block hidden">Add New Faculty</span>
				</button>
			</div>

			{/* Filters and Search */}
			<div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60">
				<div className="relative flex-grow">
					<input
						type="search"
						placeholder="Search faculty..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
					/>
					<Search className="w-5 h-5 absolute left-3 top-2.5 text-neutral-400" />
				</div>
				<select
					value={selectedDepartment}
					onChange={(e) => setSelectedDepartment(e.target.value)}
					className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500">
					<option value="">All Departments</option>
					{departments
						.filter((dept) => dept !== 'All')
						.map((dept) => (
							<option key={dept} value={dept}>
								{dept}
							</option>
						))}
				</select>
			</div>

			{/* Faculty List */}
			{filteredFaculty.length === 0 ? (
				<div className="bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600">
					No faculty members found matching your search.
				</div>
			) : (
				filteredFaculty.map((faculty) => (
					<div key={faculty.id} className="flex justify-center w-full">
						<div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-3xl">
							{/* Header Section */}
							<div className="bg-gradient-to-r from-[#de265d] to-[#98002E] text-white px-6 py-4">
								<div className="flex items-center gap-4">
									<img
										src={faculty.image}
										alt="Profile"
										className="w-20 h-20 rounded-full object-cover border-4 border-white"
										loading="lazy"
									/>

									<div className="flex-grow">
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
											<div className="mr-3">
												<h2 className="text-xl font-bold text-neutral-100">{faculty.name}</h2>
												<p className="text-neutral-100">{faculty.title}</p>
											</div>
											<div className="flex gap-3">
												<button
													onClick={() => handleEdit(faculty.id)}
													className="flex items-center space-x-2 p-2 text-blue-600 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
													<Edit2 className="w-4 h-4" />
													{/* <span>Edit Profile</span> */}
												</button>
												<button
													onClick={() => handleDelete(faculty.id)}
													className="flex items-center space-x-2 p-2 rounded-lg text-red-600 bg-gray-100 hover:bg-gray-200 transition-colors">
													<Trash2 className="w-4 h-4" />
													{/* <span>Delete</span> */}
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Details Section */}
							<div className="flex xl:flex-nowrap flex-wrap items-start justify-between gap-6 py-8 px-10">
								<div className="text-sm space-y-2">
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
									<div className="flex gap-2 justify-start items-center">
										<h3 className=" text-gray-500  font-semibold">Department:</h3>
										<p className="text-gray-800 font-medium">{faculty.department}</p>
									</div>
									{/* Designation */}
									<div className="flex gap-2 justify-start items-center">
										<h3 className=" text-gray-500  font-semibold">Designation:</h3>
										<p className="text-gray-800 font-medium">{faculty.designation}</p>
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
								</div>
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
					</div>
				))
			)}
		</section>
	);
};

export default FacultyProfile;
