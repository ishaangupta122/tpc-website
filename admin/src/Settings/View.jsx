import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Settings = () => {
	const [formData, setFormData] = useState({
		name: 'Admin User',
		email: 'admin@college.edu',
		phone: '+91 XXXXX-XXXXX',
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	const [showPassword, setShowPassword] = useState({
		currentPassword: false,
		newPassword: false,
		confirmPassword: false,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const togglePasswordVisibility = (field) => {
		setShowPassword({
			...showPassword,
			[field]: !showPassword[field],
		});
	};

	const settingsSections = [
		{
			title: 'Profile Settings',
			content: (
				<div className="space-y-6">
					<div className="flex items-center justify-between space-x-4">
						<img
							src="https://avatar.iran.liara.run/public"
							alt="Profile"
							className="w-20 h-20 rounded-lg transition-opacity duration-300 opacity-100"
							loading="lazy"
						/>
						<div>
							<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
								Change Photo
							</button>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{[
							{ label: 'Name', name: 'name', type: 'text' },
							{ label: 'Email', name: 'email', type: 'email' },
							{ label: 'Phone', name: 'phone', type: 'tel' },
						].map((field, index) => (
							<div key={index}>
								<label className="block text-sm font-medium text-neutral-700 mb-2">
									{field.label}
								</label>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name]}
									onChange={handleInputChange}
									className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
								/>
							</div>
						))}
					</div>

					<div className="flex justify-end">
						<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
							Save Changes
						</button>
					</div>
				</div>
			),
		},
		{
			title: 'Change Password',
			content: (
				<div className="mt-6 space-y-6">
					{[
						{ label: 'Current Password', name: 'currentPassword', placeholder: '••••••••' },
						{ label: 'New Password', name: 'newPassword', placeholder: '••••••••' },
						{ label: 'Confirm New Password', name: 'confirmPassword', placeholder: '••••••••' },
					].map((field, index) => (
						<div key={index}>
							<label className="block text-sm font-medium text-neutral-700 mb-2">
								{field.label}
							</label>
							<div className="relative">
								<input
									type={showPassword[field.name] ? 'text' : 'password'}
									name={field.name}
									placeholder={field.placeholder}
									value={formData[field.name]}
									onChange={handleInputChange}
									className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-blue-500"
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-3 flex items-center"
									onClick={() => togglePasswordVisibility(field.name)}>
									{showPassword[field.name] ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>
					))}
					<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
						Update Password
					</button>
				</div>
			),
		},
	];

	return (
		<section id="settings" className="p-6 space-y-6 max-w-7xl">
			{/* Header */}
			<div className="bg-white p-4 rounded-lg border border-neutral-200/60">
				<h1 className="text-2xl font-bold text-neutral-800">Settings</h1>
				<p className="text-neutral-500">Manage your account and application preferences</p>
			</div>

			{/* Settings Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{/* Profile Settings */}
				<div className="col-span-2">
					<div className="bg-white rounded-lg border border-neutral-200/60">
						<div className="p-6">
							<h2 className="text-lg font-semibold text-neutral-800 mb-4">
								{settingsSections[0].title}
							</h2>
							{settingsSections[0].content}
						</div>
					</div>
				</div>

				{/* Quick Settings */}
				<div className="space-y-6">
					<div className="bg-white rounded-lg border border-neutral-200/60">
						<div className="p-6">
							<h2 className="text-lg font-semibold text-neutral-800 mb-4">
								{settingsSections[1].title}
							</h2>
							{settingsSections[1].content}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Settings;
