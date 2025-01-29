import HeroSection from '../../components/HeroSection';
import { Book, GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const StudentProfile = () => {
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Student-Profile', href: '/student-profile' },
	];
	const student = {
		name: 'Ishaan Gupta',
		course: 'Computer Science',
		year: '3rd Year',
		studentId: '22052951524',
		email: 'ishaan@gmail.com',
		phone: '+91 XXXXX XXXXX',
		address: '123 Campus Drive, University City',
		gpa: '7.85',
	};

	return (
		<>
			<HeroSection imageUrl="./rec_gate.jpg" title="Student Profile" breadcrumbs={breadcrumbs} />
			<div className="bg-gray-100 px-6 py-16 w-full">
				<div className="flex justify-center w-full">
					<div className="w-fit rounded-lg shadow-lg overflow-hidden">
						{/* Header Section */}
						<div className="p-6 border-b border-gray-300">
							<div className="flex flex-col md:flex-row items-start md:items-center justify-between">
								<div className="flex items-center space-x-4">
									<div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
										<span className="text-2xl font-bold text-green-800">
											{student.name
												.split(' ')
												.map((n) => n[0])
												.join('')}
										</span>
									</div>
									<div>
										<h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
										<p className="text-gray-600">{student.studentId}</p>
									</div>
								</div>
								<div className="mt-4 md:mt-0">
									<span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
										{student.year}
									</span>
								</div>
							</div>
						</div>

						{/* Main Content */}
						<div className="flex flex-col md:flex-row items-start justify-between gap-10 p-6">
							{/* Academic Info */}
							<div className="flex justify-center items-start flex-col gap-4">
								<h2 className="text-xl font-semibold text-green-900">Academic Information</h2>
								<div className="flex items-center space-x-2">
									<Book className="w-4 h-4 text-gray-500" />
									<span className="text-gray-600">Course: </span>
									<span className="font-medium">{student.course}</span>
								</div>
								<div className="flex items-center space-x-2">
									<GraduationCap className="w-4 h-4 text-gray-500" />
									<span className="text-gray-600">GPA: </span>
									<span className="font-medium">{student.gpa}</span>
								</div>
							</div>

							{/* Contact Info */}
							<div className="flex flex-col justify-center items-start gap-4">
								<h2 className="text-xl font-semibold text-green-900">Contact Information</h2>
								<div className="flex items-center space-x-2">
									<Mail className="w-4 h-4 text-gray-500" />
									<span className="text-gray-600">{student.email}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Phone className="w-4 h-4 text-gray-500" />
									<span className="text-gray-600">{student.phone}</span>
								</div>
								<div className="flex items-center space-x-2">
									<MapPin className="w-4 h-4 text-gray-500" />
									<span className="text-gray-600">{student.address}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StudentProfile;
