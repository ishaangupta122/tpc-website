import { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const PlacementsTracker = () => {
	const [placementData] = useState({
		2024: [
			{
				department: 'Computer Science',
				approvedIntake: 120,
				companiesVisited: 30,
				studentsPlaced: 23,
				avgPackage: '13.2',
			},
			{
				department: 'Electronics',
				approvedIntake: 90,
				companiesVisited: 25,
				studentsPlaced: 18,
				avgPackage: '11.5',
			},
			{
				department: 'Mechanical',
				approvedIntake: 100,
				companiesVisited: 20,
				studentsPlaced: 15,
				avgPackage: '9.8',
			},
		],
		2023: [
			{
				department: 'Computer Science',
				approvedIntake: 110,
				companiesVisited: 28,
				studentsPlaced: 20,
				avgPackage: '12.5',
			},
			{
				department: 'Electronics',
				approvedIntake: 85,
				companiesVisited: 22,
				studentsPlaced: 16,
				avgPackage: '10.8',
			},
			{
				department: 'Civil',
				approvedIntake: 95,
				companiesVisited: 15,
				studentsPlaced: 12,
				avgPackage: '8.5',
			},
		],
		2022: [
			{
				department: 'Computer Science',
				approvedIntake: 110,
				companiesVisited: 28,
				studentsPlaced: 20,
				avgPackage: '12.5',
			},
			{
				department: 'Electronics',
				approvedIntake: 85,
				companiesVisited: 22,
				studentsPlaced: 16,
				avgPackage: '10.8',
			},
			{
				department: 'Civil',
				approvedIntake: 95,
				companiesVisited: 15,
				studentsPlaced: 12,
				avgPackage: '8.5',
			},
		],
	});

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedYear, setSelectedYear] = useState('');
	const filteredData = Object.entries(placementData)
		.sort((a, b) => Number(b[0]) - Number(a[0])) // Sort by year in decreasing order
		.filter(([year]) => (selectedYear ? year === selectedYear : true))
		.map(([year, departments]) => [
			year,
			departments.filter((dept) =>
				dept.department.toLowerCase().includes(searchTerm.toLowerCase()),
			),
		])
		.filter(([, departments]) => departments.length > 0);

	return (
		<section className="p-6 space-y-6 max-w-7xl">
			{/* Header */}
			<div className="bg-white rounded-lg shadow-sm border border-neutral-200/60 overflow-hidden">
				<div className="flex justify-between items-center p-4">
					<div>
						<h1 className="text-2xl font-bold text-neutral-800">Placements Tracker</h1>
						<p className="text-neutral-500">Monitor and manage student placements</p>
					</div>
					<button
						onClick={() => console.log('Add record clicked')}
						className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
						<Plus className="w-5 h-5" />
						<span className="lg:block hidden">Add Placement Record</span>
					</button>
				</div>
			</div>

			{/* Filters */}
			<div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60">
				<div className="relative flex-grow">
					<input
						type="search"
						placeholder="Search department..."
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
					value={selectedYear}
					onChange={(e) => setSelectedYear(e.target.value)}
					className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500">
					<option value="">All Years</option>
					{Object.keys(placementData)
						.sort((a, b) => Number(b) - Number(a))
						.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
				</select>
			</div>

			{/* Results */}
			{filteredData.length === 0 ? (
				<div className="bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600">
					No updates found matching your search.
				</div>
			) : (
				filteredData.map(([year, departments]) => (
					<div
						key={year}
						className="bg-white rounded-lg shadow-sm border border-neutral-200/60 overflow-hidden">
						<div className="p-6">
							<h2 className="text-lg font-semibold text-neutral-800 mb-4">{year} Placements</h2>
							<div className="overflow-x-auto pb-6">
								<table className="min-w-full divide-y divide-neutral-200">
									<thead className="bg-neutral-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
												Department
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
												Approved Intake
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
												No. Companies Visited
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
												Students Placed
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
												Average Package
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-neutral-200">
										{departments.map((dept) => (
											<tr
												key={`${year}-${dept.department}`}
												className="hover:bg-neutral-50 font-medium">
												<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
													{dept.department}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
													{dept.approvedIntake}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
													{dept.companiesVisited}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
													{dept.studentsPlaced}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
													₹ {dept.avgPackage} LPA
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
													<div className="flex space-x-3">
														<button
															onClick={() => console.log(`Edit ${dept.department}`)}
															className="text-blue-600 hover:text-blue-900 bg-blue-100 p-2 rounded-lg inline-flex items-center">
															<Edit2 className="w-4 h-4" />
														</button>
														<button
															onClick={() => console.log(`Delete ${dept.department}`)}
															className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-lg inline-flex items-center">
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
					</div>
				))
			)}
		</section>
	);
};

export default PlacementsTracker;
