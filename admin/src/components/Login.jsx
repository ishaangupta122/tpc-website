import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const dummyCredentials = {
		email: 'karmansingharora01@gmail.com',
		password: '12345',
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		setErrors(''); // Reset errors on change
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate credentials
		if (
			formData.email === dummyCredentials.email &&
			formData.password === dummyCredentials.password
		) {
			// Redirect to dashboard on successful login
			localStorage.setItem('auth', 'true')
			navigate('/');
		} else {
			setErrors('Invalid email or password');
		}
	};

	return (
		<div className="min-h-screen bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-10">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="text-center text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
				<p className="text-center text-gray-600 text-sm">Login to your admin account</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg mx-4">
				<div className="bg-white py-8 px-4 shadow-lg shadow-green-100/50 sm:rounded-xl sm:px-10 border border-green-50">
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
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
									value={formData.email}
									onChange={handleChange}
								/>
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
									autoComplete="current-password"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all pr-10"
									value={formData.password}
									onChange={handleChange}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>

						{errors && <p className="text-red-600 text-sm">{errors}</p>}

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-[1.02]">
								Sign in
							</button>
						</div>
						{/* <div className="w-full flex items-center gap-2 justify-end pt-4">
							<p className="">{`Don't have an account ?`}</p>
							<Link
								to={'/signup'}
								className="flex gap-2 items-center font-semibold text-green-600 hover:underline">
								Signup
							</Link>
						</div> */}
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
