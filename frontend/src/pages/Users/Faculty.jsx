import { useEffect, useState } from 'react';
import HeroSection from '../../components/HeroSection';
import { Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BASE_API from '../../../BASE_API/config';

const FacultyProfile = () => {
	const { facultyId } = useParams();
	const [loading, setLoading] = useState(true);

	const [faculty, setFaculty] = useState({});

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Faculty', href: '/faculty' },
		{ label: faculty?.name || 'Faculty Profile', href: `/faculty/${facultyId}` },
	];

	const fetchFacultyProfile = async () => {
		try {
			const response = await axios.get(`${BASE_API}/faculty/${facultyId}`);
			setFaculty(response.data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFacultyProfile();
	}, [facultyId]);

	if (loading) {
		return (
			<section className="bg-white overflow-hidden flex justify-center items-center py-20">
				<div className="flex flex-col items-center gap-4">
					<Loader className="w-8 h-8 animate-spin text-emerald-900" />
					<p className="text-emerald-900 font-medium">Loading Faculty Profile...</p>
				</div>
			</section>
		);
	}

	return (
		<>
			<HeroSection imageUrl="/rec_gate.jpg" title="Faculty Profile" breadcrumbs={breadcrumbs} />

			<div className="flex items-center w-full flex-col px-4 md:px-16">
				<section className="py-16 max-w-7xl w-full md:w-fit">
					<div className="mb-6 text-center md:text-left">
						<h1 className="text-2xl font-semibold uppercase text-green-900 ">
							Faculty <span className="text-black">Details</span>
						</h1>
					</div>

					<div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full p-4 md:p-6 border-2 border-green-800 rounded-lg shadow-lg max-w-4xl">
						{/* Image Section */}
						<div className="flex-shrink-0 text-center mb-4 md:mb-0 md:mr-6">
							<img
								src={faculty.image}
								alt="Profile"
								className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover border-2 border-green-800 mx-auto"
								loading="lazy"
							/>
						</div>

						{/* Table Section */}
						<div key={facultyId} className="flex-grow w-full">
							<div className="bg-gradient-to-b from-emerald-800 to-emerald-950 text-white px-4 sm:px-6 py-3 md:py-4 rounded-lg mb-4 text-center md:text-left">
								<h2 className="text-lg font-medium">{faculty.name}</h2>
							</div>

							<table className="w-full text-sm">
								<tbody>
									{[
										[
											'Email',
											<a
												key="email"
												className="text-green-800 break-words underline"
												href={`mailto:${faculty.email}`}>
												{faculty.email}
											</a>,
										],
										['Phone', faculty.phone],
										['Department', faculty.department],
										['Designation', faculty.designation],
										['Joined Date', faculty.joinedDate],
										['Experience', faculty.experience + ' years'],
									].map(([label, value], index) => (
										<tr key={index} className="border-b border-gray-300 last:border-none">
											<td className="py-2 text-green-800 font-medium pr-4">{label}:</td>
											<td className="py-2 text-gray-800 font-normal break-words">{value}</td>
										</tr>
									))}
									<tr>
										<td className="py-2 text-green-800 font-medium align-top pr-4">Education:</td>
										<td className="py-2 text-gray-800 font-normal">
											<ul className="list-disc list-inside space-y-2">
												{faculty.education.map((edu, index) => (
													<li key={index}>{edu}</li>
												))}
											</ul>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default FacultyProfile;
