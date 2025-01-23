import { useState } from 'react';
import { Search } from 'lucide-react';
import HeroSection from '../../components/HeroSection';

const PlacementsTracker = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Placements', href: '/placements-tabel' },
	];

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
		.sort((a, b) => Number(b[0]) - Number(a[0]))
		.filter(([year]) => (selectedYear ? year === selectedYear : true))
		.map(([year, departments]) => [
			year,
			departments.filter((dept) =>
				dept.department.toLowerCase().includes(searchTerm.toLowerCase()),
			),
		])
		.filter(([, departments]) => departments.length > 0);

	return (
		<>
			<HeroSection imageUrl="./rec_gate.jpg" title="College Placements" breadcrumbs={breadcrumbs} />

			<div className="flex justify-center items-center ">
				<div className="p-6 px-4 sm:px-14 my-10 max-w-7xl w-full">
					<div className="mb-6 space-y-6">
						<h1 className="text-2xl font-semibold uppercase text-green-900">
							College <span className="text-black">Placements</span>
						</h1>
						<div className="flex flex-col sm:flex-row gap-4">
							<div className="relative flex-1">
								<input
									type="search"
									placeholder="Search department..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
							</div>

							<select
								value={selectedYear}
								onChange={(e) => setSelectedYear(e.target.value)}
								className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
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
					</div>

					{filteredData.length === 0 ? (
						<div className="border-2 border-gray-200 rounded-lg">
							<div className="px-6 py-8 text-center text-gray-500">
								<p className="text-base">No results found</p>
							</div>
						</div>
					) : (
						filteredData.map(([year, departments]) => (
							<div key={year} className="mb-8">
								<h3 className="text-lg font-bold text-gray-800 mb-4">{year} Placements</h3>
								<div className="border border-gray-200 rounded-lg">
									<div className="overflow-x-auto">
										<table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
											<thead className="bg-gray-100">
												<tr>
													<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
														Department
													</th>
													<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
														Approved Intake
													</th>
													<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
														No. Companies Visited
													</th>
													<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
														Students Placed
													</th>
													<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
														Average Package
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-200">
												{departments.map((dept) => (
													<tr key={`${year}-${dept.department}`} className="hover:bg-gray-50">
														<td className="px-6 py-4 text-sm font-medium text-gray-900">
															{dept.department}
														</td>
														<td className="px-6 py-4 text-sm text-gray-500">
															{dept.approvedIntake}
														</td>
														<td className="px-6 py-4 text-sm text-gray-500">
															{dept.companiesVisited}
														</td>
														<td className="px-6 py-4 text-sm text-gray-500">
															{dept.studentsPlaced}
														</td>
														<td className="px-6 py-4 text-sm text-gray-500">
															₹ {dept.avgPackage} LPA
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
				</div>
			</div>
		</>
	);
};

export default PlacementsTracker;
