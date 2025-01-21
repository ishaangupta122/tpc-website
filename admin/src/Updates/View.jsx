import { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

const Updates = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All Categories');
	const [newsData] = useState([
		{
			id: 1,
			tag: 'Featured',
			title: 'College Ranked #1 in Engineering Excellence',
			content:
				'Our college has been ranked #1 in Engineering Excellence by the National Education Board for the third consecutive year...',
			image:
				'https://imgs.search.brave.com/E1fU33Orcmcc3nkSz3VtxSR9wC7y4Jgn2ouUXFa2ncE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9s/YXRlc3QtbmV3cy1z/dWJzY3JpYmUtdXBk/YXRlXzUzODc2LTEy/MDI5OS5qcGc_c2Vt/dD1haXNfaHlicmlk',
		},
		{
			id: 2,
			tag: 'Academic',
			title: 'New Research Center Inauguration',
			content:
				'The new AI Research Center will be inaugurated next week. All faculty members and students are invited to attend...',
			image:
				'https://imgs.search.brave.com/E1fU33Orcmcc3nkSz3VtxSR9wC7y4Jgn2ouUXFa2ncE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9s/YXRlc3QtbmV3cy1z/dWJzY3JpYmUtdXBk/YXRlXzUzODc2LTEy/MDI5OS5qcGc_c2Vt/dD1haXNfaHlicmlk',
		},
		{
			id: 3,
			tag: 'Events',
			title: 'Annual Tech Fest Registration Open',
			content:
				'Register now for the biggest technical festival of the year. Early bird registrations are now open...',
			image:
				'https://imgs.search.brave.com/E1fU33Orcmcc3nkSz3VtxSR9wC7y4Jgn2ouUXFa2ncE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9s/YXRlc3QtbmV3cy1z/dWJzY3JpYmUtdXBk/YXRlXzUzODc2LTEy/MDI5OS5qcGc_c2Vt/dD1haXNfaHlicmlk',
		},
		{
			id: 4,
			tag: 'Achievements',
			title: 'Annual Tech Fest Registration Open',
			content:
				'Register now for the biggest technical festival of the year. Early bird registrations are now open...',
			image:
				'https://imgs.search.brave.com/E1fU33Orcmcc3nkSz3VtxSR9wC7y4Jgn2ouUXFa2ncE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9s/YXRlc3QtbmV3cy1z/dWJzY3JpYmUtdXBk/YXRlXzUzODc2LTEy/MDI5OS5qcGc_c2Vt/dD1haXNfaHlicmlk',
		},
	]);

	const getTagColorClasses = (index) => {
		const colors = ['blue', 'green', 'red', 'purple'];
		const color = colors[index % colors.length];
		const colorClasses = {
			blue: 'bg-blue-100 text-blue-800',
			green: 'bg-green-100 text-green-800',
			red: 'bg-red-100 text-red-800',
			purple: 'bg-purple-100 text-purple-800',
		};
		return colorClasses[color];
	};

	const filteredNews = newsData.filter((news) => {
		const matchesSearch =
			news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			news.tag.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = selectedCategory === 'All Categories' || news.tag === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
	};

	return (
		<section className="p-6 space-y-6 max-w-7xl">
			{/* Header */}
			<div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
				<div>
					<h1 className="text-2xl font-bold text-neutral-800">News & Updates</h1>
					<p className="text-neutral-500">Manage college news and announcements</p>
				</div>
				<button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
					<Plus className="w-5 h-5" />
					<span className="lg:block hidden">Post Update</span>
				</button>
			</div>

			{/* Filters */}
			<div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60">
				<div className="flex flex-col sm:flex-row gap-4 flex-grow">
					<div className="relative flex-grow">
						<input
							type="search"
							placeholder="Search by title or tag..."
							className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
							value={searchQuery}
							onChange={handleSearch}
						/>
						<Search className="w-5 h-5 absolute left-3 top-2.5 text-neutral-400" />
					</div>
					<select
						className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
						value={selectedCategory}
						onChange={handleCategoryChange}>
						<option>All Categories</option>
						<option>Featured</option>
						<option>Academic</option>
						<option>Achievements</option>
						<option>Events</option>
						<option>Admissions</option>
						<option>Placements</option>
					</select>
				</div>
			</div>

			{/* Updates List */}
			<div className="space-y-4">
				{filteredNews.length === 0 ? (
					<div className="bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600">
						No updates found matching your search.
					</div>
				) : (
					filteredNews.map((news, index) => (
						<div key={news.id} className="bg-white p-6 rounded-lg border border-neutral-200/60">
							<div className="flex flex-col md:flex-row gap-4">
								<div className="w-full md:w-48 h-48 flex-shrink-0">
									<img
										src={news.image}
										alt={news.title}
										className="w-full h-full object-cover rounded-lg border border-neutral-300"
									/>
								</div>
								<div className="flex-grow">
									<div className="flex items-center space-x-2 mb-2">
										<span
											className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColorClasses(
												index,
											)}`}>
											{news.tag}
										</span>
									</div>
									<h3 className="text-lg font-semibold text-neutral-800 mb-2">{news.title}</h3>
									<p className="text-neutral-600 mb-4">{news.content}</p>
									<div className="flex items-center space-x-4">
										<button className="text-blue-600 hover:text-blue-800 bg-blue-100 p-2 rounded-lg flex items-center space-x-1">
											<Edit2 className="w-4 h-4" />
										</button>
										<button className="text-red-600 hover:text-red-800 bg-red-100 p-2 rounded-lg flex items-center space-x-1">
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</section>
	);
};

export default Updates;
