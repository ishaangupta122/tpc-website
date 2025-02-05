import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Settings = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	const [showPassword, setShowPassword] = useState({
		currentPassword: false,
		newPassword: false,
		confirmPassword: false,
	});

	const [loading, setLoading] = useState(true);

	// Fetch user data from API
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch('http://localhost:3000/users/678e1af82244a66c11e36d36'); // Replace with your API URL
				if (!response.ok) throw new Error('Failed to fetch user data');
				const data = await response.json();
				setFormData((prev) => ({
					...prev,
					name: data.name,
					email: data.email,
					phone: data.phone,
				}));
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchUserData();
	}, []);

	// Handle form input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Toggle password visibility
	const togglePasswordVisibility = (field) => {
		setShowPassword({
			...showPassword,
			[field]: !showPassword[field],
		});
	};

	// Update profile settings
	const handleProfileUpdate = async () => {
		try {
			const response = await fetch('http://localhost:3000/users', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
				}),
			});
			if (!response.ok) throw new Error('Failed to update profile');
			alert('Profile updated successfully!');
		} catch (error) {
			console.error(error.message);
		}
	};

	// Update password
	const handlePasswordUpdate = async () => {
		if (formData.newPassword !== formData.confirmPassword) {
			alert('New password and confirm password do not match');
			return;
		}
		try {
			const response = await fetch('http://localhost:3000/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					
					email: formData.email,
				}),
			});
			if (!response.ok) throw new Error('Failed to update password');
			alert('Password updated successfully!');
		} catch (error) {
			console.error(error.message);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

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
								Profile Settings
							</h2>
							<div className="space-y-6">
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
												className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
											/>
										</div>
									))}
								</div>
								<div className="flex justify-end">
									<button
										className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
										onClick={handleProfileUpdate}>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Change Password */}
				<div className="space-y-6">
					<div className="bg-white rounded-lg border border-neutral-200/60">
						<div className="p-6">
							<h2 className="text-lg font-semibold text-neutral-800 mb-4">
								Change Password
							</h2>
							<div className="mt-6 space-y-6">
								{[
									{ label: 'Email', name: 'email', placeholder: 'email...' },
								].map((field, index) => (
									<div key={index}>
										<label className="block text-sm font-medium text-neutral-700 mb-2">
											{field.label}
										</label>
										<div className="relative">
											<input
												type='text'
												name={field.name}
												placeholder={field.placeholder}
												value={formData[field.name]}
												onChange={handleInputChange}
												className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
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
								<button
									className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
									onClick={handlePasswordUpdate}>
									Update Password
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Settings;
