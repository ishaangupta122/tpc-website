import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const validateEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const validatePassword = (password) => {
		const hasNumber = /\d/.test(password);
		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
		const isLongEnough = password.length >= 8;

		return hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar && isLongEnough;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		setErrors((prev) => ({
			...prev,
			[name]: '',
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let newErrors = {};
		let isValid = true;

		if (!formData.email) {
			newErrors.email = 'Email is required';
			isValid = false;
		} else if (!validateEmail(formData.email)) {
			newErrors.email = 'Please enter a valid email';
			isValid = false;
		}

		if (!formData.password) {
			newErrors.password = 'Password is required';
			isValid = false;
		} else if (!validatePassword(formData.password)) {
			newErrors.password =
				'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character';
			isValid = false;
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = 'Please confirm your password';
			isValid = false;
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
			isValid = false;
		}

		setErrors(newErrors);
		setFormData({
			email: '',
			password: '',
			confirmPassword: '',
		});

		if (isValid) {
			console.log('Form submitted:', formData);
		}
	};

	return (
		<div className="min-h-screen bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-10">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="text-center text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
				<p className="text-center text-gray-600 text-sm">Login to your admin account</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg mx-4">
				<div className="bg-white py-8 px-4 shadow-lg shadow-blue-100/50 sm:rounded-xl sm:px-10 border border-blue-50">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email Address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									placeholder="john@example.com"
									autoComplete="email"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
									value={formData.email}
									onChange={handleChange}
								/>
								{errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="mt-1 relative">
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="••••••••"
									autoComplete="new-password"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
									value={formData.password}
									onChange={handleChange}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
								{errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
							</div>
						</div>

						<div>
							<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
								Confirm Password
							</label>
							<div className="mt-1 relative">
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder="••••••••"
									autoComplete="new-password"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
									value={formData.confirmPassword}
									onChange={handleChange}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
									{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
								{errors.confirmPassword && (
									<p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
								)}
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02]">
								Sign in
							</button>
						</div>
						<div className="w-full flex items-center gap-2 justify-end pt-4">
							<p className="">{`Don't have an account ?`}</p>
							<Link
								to={'/signup'}
								className="flex gap-2 items-center font-semibold text-blue-600 hover:underline">
								Signup
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
