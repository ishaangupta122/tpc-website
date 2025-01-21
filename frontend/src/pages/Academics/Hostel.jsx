import { useState, useEffect } from 'react';

const STATIC_DATA = {
	boys: [
		{
			title: 'Block A - Pearl House',
			description:
				'Boys hostel has 40 rooms. It is located within the campus with lush green lawns. Hostel fee is ₹25,450 per annum (room rent) + ₹5,000 (refundable security). 24-hour security is provided with guards on rotation duty.',
			capacity: 'The hostel accommodates 120 students in three-seated rooms, totaling 40 rooms.',
			facilities: [
				'Color TV and Newspaper',
				'Table Tennis Room',
				'RO Water Purifier and Water Cooler',
				'Geysers in bathrooms for hot water',
				'Playground',
				'24/7 Water and Electricity supply',
			],
			image: './boys_hostel.jpg',
		},
	],
	girls: [
		{
			title: 'Block B - Sapphire House',
			description:
				'Girls hostel has 10 rooms. It is located within the campus with lush green lawns. Hostel fee is ₹25,450 per annum (room rent) + ₹5,000 (refundable security). 24-hour security is provided with guards on rotation duty.',
			capacity: 'The hostel accommodates 30 students in three-seated rooms, totaling 10 rooms.',
			facilities: [
				'Color TV and Newspaper',
				'Fully Automatic Washing Machine',
				'165 L Capacity Fridge',
				'RO Water Purifier and Water Cooler',
				'Geysers in bathrooms for hot water',
				'Power Backup (Generator)',
				'24/7 Water and Electricity supply',
			],
			image: './girls_hostel.jpg',
		},
	],
};

const HostelPage = () => {
	const [activeTab, setActiveTab] = useState('boys');
	const [hostelData, setHostelData] = useState(STATIC_DATA);
	const [loading, setLoading] = useState(false);

	// Fetch data from an API
	useEffect(() => {
		const fetchHostelData = async () => {
			setLoading(true);
			try {
				// Replace with your API endpoint
				const response = await fetch('https://api.example.com/hostels');
				const data = await response.json();

				// Merge fetched data with STATIC_DATA (fallback to static if fetch fails)
				setHostelData({
					boys: STATIC_DATA.boys,
					girls: STATIC_DATA.girls,
				});
			} catch (error) {
				console.error('Error fetching hostel data:', error);
				// Keep STATIC_DATA if fetch fails
				setHostelData(STATIC_DATA);
			} finally {
				setLoading(false);
			}
		};

		fetchHostelData();
	}, []);

	const renderItems = (items) => {
		return items.map((item, index) => (
			<div
				key={index}
				className="flex flex-col lg:flex-row items-start gap-6 mb-8 bg-[#98002E] rounded-lg shadow-lg p-6">
				<img
					src={item.image}
					alt={item.title}
					className="w-full lg:w-1/2 h-full object-cover rounded-lg"
				/>
				<div className="flex-1">
					<h3 className="text-xl font-bold mb-4 text-[#ffd42a]">{item.title}</h3>
					<p className="text-gray-100 mb-4">
						<span className="font-semibold text-[#ffd42a]">Overview:</span> {item.description}
					</p>
					<p className="text-gray-100 mb-4">
						<span className="font-semibold text-[#ffd42a]">Capacity:</span> {item.capacity}
					</p>
					<div>
						<h4 className="font-semibold text-[#ffd42a]">Facilities:</h4>
						<ul className="list-disc list-inside text-gray-100 space-y-1">
							{item.facilities.map((facility, idx) => (
								<li key={idx}>{facility}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		));
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navigation Tabs */}
			<div className="max-w-7xl mx-auto px-4 sm:px-14 pb-8 pt-20 flex items-center justify-between flex-wrap gap-4">
				<div>
					<h1 className="text-3xl font-bold text-[#98002E]">Hostel Information</h1>
				</div>

				<div className="flex gap-2">
					<button
						onClick={() => setActiveTab('boys')}
						className={`px-6 py-2 rounded-lg font-medium ${
							activeTab === 'boys'
								? 'bg-[#98002E] text-white'
								: 'text-gray-600 bg-gray-200 hover:bg-gray-300'
						}`}>
						Boys Hostels
					</button>
					<button
						onClick={() => setActiveTab('girls')}
						className={`px-6 py-2 rounded-lg font-medium ${
							activeTab === 'girls'
								? 'bg-[#98002E] text-white'
								: 'text-gray-600 bg-gray-200 hover:bg-gray-300'
						}`}>
						Girls Hostels
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-14 py-8">
				{loading ? (
					<p className="text-center text-gray-600">Loading...</p>
				) : (
					<>
						{activeTab === 'boys' && (
							<div>
								<div className="mb-8 w-fit">
									<h1 className="text-3xl font-bold mb-2 text-[#98002E]">Boys Hostel</h1>
									<div className="w-24 h-1 bg-[#FDB714] rounded-full mx-auto"></div>
								</div>
								{renderItems(hostelData.boys)}
							</div>
						)}
						{activeTab === 'girls' && (
							<div>
								<div className="mb-8 w-fit">
									<h1 className="text-3xl font-bold mb-2 text-[#98002E]">Girls Hostel</h1>
									<div className="w-24 h-1 bg-[#FDB714] rounded-full mx-auto"></div>
								</div>
								{renderItems(hostelData.girls)}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default HostelPage;
