import { useState } from 'react';
import { Search } from 'lucide-react';
import HeroSection from '../../components/HeroSection';

const ManagingCommittee = () => {
	const [searchName, setSearchName] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Management Committee', href: '/management-committee' },
	];

	const communityData = [
		{
			id: 1,
			name: 'Dr. Robert Wilson',
			info: 'Ph.D. in Computer Science | 15+ years in Academia',
			designation: 'Chairman',
		},
		{
			id: 2,
			name: 'Prof. Sarah Mitchell',
			info: 'Ph.D. in Educational Leadership | Former Dean',
			designation: 'Vice Chairman',
		},
		{
			id: 3,
			name: 'Dr. James Chen',
			info: 'Ph.D. in Mathematics | Research Expert',
			designation: 'Secretary',
		},
		{
			id: 4,
			name: 'Prof. Emily Brooks',
			info: 'Ph.D. in Physics | Department Head',
			designation: 'Member',
		},
		{
			id: 5,
			name: 'Dr. Michael Rodriguez',
			info: 'Ph.D. in Engineering | Industry Expert',
			designation: 'Member',
		},
	];

	const filteredData = communityData.filter((member) => {
		const nameMatch = member.name.toLowerCase().includes(searchName.toLowerCase());
		const categoryMatch = selectedCategory === 'all' || member.designation === selectedCategory;
		return nameMatch && categoryMatch;
	});

	const getDesignationColor = (designation) => {
		const colors = {
			Chairman: 'bg-red-100 text-red-800',
			'Vice Chairman': 'bg-purple-100 text-purple-800',
			Secretary: 'bg-green-100 text-green-800',
			Member: 'bg-blue-100 text-blue-800',
		};
		return colors[designation] || 'bg-gray-100 text-gray-800';
	};

	return (
		<>
			<HeroSection
				imageUrl="./rec_gate.jpg"
				title="Management Committee"
				breadcrumbs={breadcrumbs}
			/>
			<div className="flex justify-center items-center ">
				<div className="px-6 lg:px-16 py-6 lg:py-16 max-w-7xl w-full">
					<div className="mb-6 space-y-6">
						<h1 className="text-2xl font-semibold mb-4 uppercase text-green-900">
							Management <span className="text-black">Committee</span>
						</h1>
						<div className="flex flex-col sm:flex-row gap-4">
							{/* Name Search */}
							<div className="relative flex-1">
								<input
									type="text"
									placeholder="Search by name..."
									className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={searchName}
									onChange={(e) => setSearchName(e.target.value)}
								/>
								<Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
							</div>

							{/* Category Dropdown */}
							<select
								className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}>
								<option value="all">All Categories</option>
								<option value="Chairman">Chairman</option>
								<option value="Vice Chairman">Vice Chairman</option>
								<option value="Secretary">Secretary</option>
								<option value="Member">Member</option>
							</select>
						</div>
					</div>

					<div className="border border-gray-200 rounded-lg">
						<div className="overflow-x-auto">
							<table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
								<thead className="bg-gray-100">
									<tr>
										<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
											S. No
										</th>
										<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
											Name
										</th>
										<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
											Basic Information
										</th>
										<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
											Designation
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{filteredData.length > 0 ? (
										filteredData.map((member, index) => (
											<tr key={member.id} className="hover:bg-gray-50 ">
												<td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
												<td className="px-6 py-4">
													<div className="text-sm font-medium text-gray-900">{member.name}</div>
												</td>
												<td className="px-6 py-4">
													<div className="text-sm text-gray-500">{member.info}</div>
												</td>
												<td className="px-6 py-4">
													<span
														className={`px-3 py-1 text-sm font-medium rounded-full ${getDesignationColor(
															member.designation,
														)}`}>
														{member.designation}
													</span>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="4" className="px-6 py-8 text-center text-gray-500">
												<p className="text-base">No results found</p>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ManagingCommittee;
