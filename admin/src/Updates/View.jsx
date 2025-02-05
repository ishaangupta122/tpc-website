import React, { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { fetchUpdates, createUpdate, updateUpdate, deleteUpdate } from '../context/UpdatesContext';

const Updates = () => {
	const [updates, setUpdates] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All Categories');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		id: null,
		title: '',
		tag: '',
		content: '',
		image: '',
		time: '',
	});

	useEffect(() => {
		const getUpdates = async () => {
			try {
				const fetchedUpdates = await fetchUpdates();
				setUpdates(fetchedUpdates);
			} catch (error) {
				console.error('Error fetching updates:', error);
			}
		};

		getUpdates();
	}, []);

	const getUpdates = async () => {
		try {
			const fetchedUpdates = await fetchUpdates();
			setUpdates(fetchedUpdates);
		} catch (error) {
			console.error('Error fetching updates:', error);
		}
	};

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
	};

	const handleDelete = async (id) => {
		try {
			await deleteUpdate(id);
			setUpdates((prev) => prev.filter((update) => update.id !== id));
			getUpdates();
		} catch (error) {
			console.error('Error deleting update:', error);
		}
	};

	const handleOpenDialog = (update = null) => {
		setIsDialogOpen(true);
		if (update) {
			setIsEditing(true);
			setFormData(update);
		} else {
			setIsEditing(false);
			setFormData({ id: null, title: '', tag: '', content: '', image: '' });
		}
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isEditing) {
				await updateUpdate(formData._id, formData);
				setUpdates((prev) => prev.map((update) => (update.id === formData.id ? formData : update)));
			} else {
				const newUpdate = await createUpdate(formData);
				setUpdates((prev) => [newUpdate, ...prev]);
			}
		} catch (error) {
			console.error('Error submitting update:', error);
		}
		getUpdates();
		handleCloseDialog();
	};

	const filteredUpdates = updates.filter((update) => {
		const matchesSearch =
			update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			update.tag.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === 'All Categories' || update.tag === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<section className="p-6 space-y-6 max-w-7xl">
			{/* Header */}
			<div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
				<div>
					<h1 className="text-2xl font-bold text-neutral-800">College Achievements</h1>
					<p className="text-neutral-500">Manage college achievements</p>
				</div>
				<button
					onClick={() => handleOpenDialog()}
					className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
					<Plus className="w-5 h-5" />
					<span className="lg:block hidden">New Achievement</span>
				</button>
			</div>

			{/* Filters */}
			<div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-lg border border-neutral-200/60">
				<div className="flex flex-col sm:flex-row gap-4 flex-grow">
					<div className="relative flex-grow">
						<input
							type="search"
							placeholder="Search by title or tag..."
							className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
							value={searchQuery}
							onChange={handleSearch}
						/>
						<Search className="w-5 h-5 absolute left-3 top-2.5 text-neutral-400" />
					</div>
					<select
						className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
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
				{filteredUpdates.length === 0 ? (
					<div className="bg-white p-6 rounded-lg border border-neutral-200/60 text-center text-neutral-600">
						No updates found matching your search.
					</div>
				) : (
					filteredUpdates.map((update) => (
						<div key={update.id} className="bg-white p-6 rounded-lg border border-neutral-200/60">
							<div className="flex flex-col md:flex-row gap-4">
								<div className="w-full md:w-48 h-48 flex-shrink-0">
									<img
										src={update.image}
										alt={update.title}
										className="w-full h-full object-cover rounded-lg border border-neutral-300"
									/>
								</div>
								<div className="flex-grow">
									<div className="flex items-center space-x-2 mb-2">
										<span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
											{update.tag}
										</span>
									</div>
									<h3 className="text-lg font-semibold text-neutral-800 mb-2">{update.title}</h3>
									<p className="text-neutral-600 mb-4">{update.content}</p>
									<div className="flex items-center space-x-4">
										<button
											className="text-green-600 hover:text-green-800 bg-green-100 p-2 rounded-lg flex items-center space-x-1"
											onClick={() => handleOpenDialog(update)}>
											<Edit2 className="w-4 h-4" />
										</button>
										<button
											className="text-red-600 hover:text-red-800 bg-red-100 p-2 rounded-lg flex items-center space-x-1"
											onClick={() => handleDelete(update._id)}>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			{/* Dialog */}
			{isDialogOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-bold">{isEditing ? 'Edit Update' : 'Add Update'}</h2>
							<button onClick={handleCloseDialog}>
								<X className="w-5 h-5 text-neutral-600" />
							</button>
						</div>
						<form onSubmit={handleSubmit} className="space-y-4">
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleFormChange}
								placeholder="Title"
								className="w-full p-2 border border-neutral-300 rounded-lg"
							/>
							<input
								type="text"
								name="tag"
								value={formData.tag}
								onChange={handleFormChange}
								placeholder="Tag"
								className="w-full p-2 border border-neutral-300 rounded-lg"
							/>
							<textarea
								name="content"
								value={formData.content}
								onChange={handleFormChange}
								placeholder="Content"
								className="w-full p-2 border border-neutral-300 rounded-lg"
								rows="4"
							/>
							<input
								type="file"
								name="image"
								onChange={handleFileChange}
								placeholder="Select Image"
								className="w-full p-2 border border-neutral-300 rounded-lg"
							/>
							<input
								type="time"
								name="time"
								value={formData.time}
								onChange={handleFormChange}
								placeholder="Joined Date"
								required
								className="w-full p-2 border border-gray-300 rounded mb-4"
							/>
							<button
								type="submit"
								className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
								{isEditing ? 'Update' : 'Add'} Update
							</button>
						</form>
					</div>
				</div>
			)}
		</section>
	);
};

export default Updates;
