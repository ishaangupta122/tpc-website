import { Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ManagingCommittee = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedDesignation, setSelectedDesignation] = useState('');
	const [memberList, setMemberList] = useState([
		{
			id: 1,
			info: 'Committee Member, TIET',
			name: 'Dr. John Smith',
			designation: 'Chairman',
		},
		{
			id: 2,
			info: 'Committee Member, TIET',
			name: 'Dr. Sarah Johnson',
			designation: 'Secretary',
		},
		{
			id: 3,
			info: 'Committee Member, TIET',
			name: 'Prof. Michael Chen',
			designation: 'Member',
		},
		{
			id: 4,
			info: 'Committee Member, TIET',
			name: 'Prof. Michael Chen',
			designation: 'Vice Chairman',
		},
	]);

	const colors = {
		Chairman: 'text-red-800 bg-red-100',
		'Vice Chairman': 'text-purple-800 bg-purple-100',
		Secretary: 'text-green-800 bg-green-100',
		Member: 'text-blue-800 bg-blue-100',
	};

	const filteredMembers = memberList.filter(
		(member) =>
			(member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				member.designation.toLowerCase().includes(searchTerm.toLowerCase())) &&
			(selectedDesignation === '' || member.designation === selectedDesignation),
	);

	return (
		<section id="member-management" className="p-6 space-y-6 max-w-7xl">
			{/* Header */}
			<div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
				<div>
					<h1 className="text-2xl font-bold text-neutral-800">College Management Committee</h1>
					<p className="text-neutral-500">Manage and organize committee members</p>
				</div>
				<button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
					</svg>
					<span className="lg:block hidden">Add New Member</span>
				</button>
			</div>

			{/* Filters and Search */}
			<div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60">
				<div className="relative flex-grow">
					<input
						type="search"
						placeholder="Search member..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
					/>
					<svg
						className="w-5 h-5 absolute left-3 top-2.5 text-neutral-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</div>
				<select
					value={selectedDesignation}
					onChange={(e) => setSelectedDesignation(e.target.value)}
					className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500">
					<option value="">All Designation</option>
					<option value="Chairman">Chairman</option>
					<option value="Vice Chairman">Vice Chairman</option>
					<option value="Secretary">Secretary</option>
					<option value="Member">Member</option>
				</select>
			</div>
			{filteredMembers.length === 0 ? (
				<div className="bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600">
					No updates found matching your search.
				</div>
			) : (
				// member Table
				<div className="bg-white rounded-lg border border-neutral-300 overflow-hidden">
					<div className="overflow-x-auto mx-4 my-4 pb-4">
						<table className="min-w-full divide-y divide-neutral-300">
							<thead className="bg-neutral-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
										S No.
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
										Name
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
										Basic Information
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
										Designation
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-neutral-900 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-neutral-300">
								{filteredMembers.map((member, index) => (
									<tr key={member.id} className="hover:bg-neutral-50 font-medium">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-neutral-900">{index + 1}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-neutral-900">{member.name}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-neutral-900">{member.info}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium ${
													colors[member.designation]
												}`}>
												{member.designation}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<div className="flex space-x-3">
												<button className="text-blue-600 hover:text-blue-900 bg-blue-100 p-2 rounded-lg">
													<Edit2 className="w-4 h-4" />
												</button>
												<button className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-lg">
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</section>
	);
};

export default ManagingCommittee;
