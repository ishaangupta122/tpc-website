import { useState } from 'react';
import { Users, Calendar, BarChart2, Bell, UserPlus, PlusCircle, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	const [stats] = useState([
		{
			title: 'Total Faculty',
			value: '124',
			icon: <Users size={24} />,
			bgColor: 'bg-blue-100',
			textColor: 'text-blue-800',
			change: '↑ 12% from last month',
			changeColor: 'text-green-500',
		},
		{
			title: 'Upcoming Events',
			value: '8',
			icon: <Calendar size={24} />,
			bgColor: 'bg-purple-100',
			textColor: 'text-purple-800',
			change: 'Next event in 2 days',
			changeColor: 'text-green-500',
		},
		{
			title: 'Placements',
			value: '85%',
			icon: <BarChart2 size={24} />,
			bgColor: 'bg-green-100',
			textColor: 'text-green-800',
			change: '↑ 5% from last year',
			changeColor: 'text-green-500',
		},
		{
			title: 'New Updates',
			value: '12',
			icon: <Bell size={24} />,
			bgColor: 'bg-red-100',
			textColor: 'text-red-800',
			change: '4 require attention',
			changeColor: 'text-red-500',
		},
	]);

	const [recentActivity] = useState([
		{
			icon: <Users size={24} />,
			title: 'New faculty member added',
			description: 'Dr. Smith joined Computer Science',
			time: '2 hours ago',
			bgColor: 'bg-blue-100',
			textColor: 'text-blue-600',
		},
		{
			icon: <Calendar size={24} />,
			title: 'New event scheduled',
			description: 'Annual Tech Symposium',
			time: '5 hours ago',
			bgColor: 'bg-purple-100',
			textColor: 'text-purple-600',
		},
		{
			icon: <BarChart2 size={24} />,
			title: 'Placement Update',
			description: '15 students placed at Tech Corp',
			time: '1 day ago',
			bgColor: 'bg-green-100',
			textColor: 'text-green-600',
		},
	]);

	const [quickActions] = useState([
		{
			icon: <UserPlus size={24} />,
			label: 'Add Faculty',
			to: '/faculty',
			textColor: 'text-blue-600',
		},
		{
			icon: <PlusCircle size={24} />,
			label: 'New Event',
			to: '/events',
			textColor: 'text-purple-600',
		},
		{
			icon: <BarChart2 size={24} />,
			label: 'New Placement',
			to: '/placements',
			textColor: 'text-green-600',
		},
		{
			icon: <Edit size={24} />,
			label: 'Post Update',
			to: '/updates',
			textColor: 'text-red-600',
		},
		{
			icon: <UserPlus size={24} />,
			label: 'Add Faculty Profile',
			to: '/facultyProfile',
			textColor: 'text-yellow-600',
		},
	]);

	return (
		<section className="p-6 space-y-6 max-w-7xl">
			{/* Header with Welcome and Search */}
			<div className="flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60">
				<div>
					<h1 className="text-2xl font-bold text-neutral-800">Welcome, Admin</h1>
					<p className="text-neutral-500">{"Here's what's happening at your college today"}</p>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<div key={index} className="bg-white p-6 rounded-lg border border-neutral-200/60">
						<div className="flex justify-between items-start">
							<div>
								<p className="text-neutral-500">{stat.title}</p>
								<h3 className="text-2xl font-bold text-neutral-800 mt-1">{stat.value}</h3>
							</div>
							<span className={`${stat.bgColor} ${stat.textColor} p-2 rounded-lg`}>
								{stat.icon}
							</span>
						</div>
						<p className={`${stat.changeColor} text-sm mt-4`}>{stat.change}</p>
					</div>
				))}
			</div>

			{/* Recent Activity and Quick Actions */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Activity */}
				<div className="bg-white p-6 rounded-lg border border-neutral-200/60">
					<h2 className="text-lg font-semibold text-neutral-800 mb-4">Recent Activity</h2>
					<div className="space-y-4">
						{recentActivity.map((activity, index) => (
							<div key={index} className="flex items-start space-x-4">
								<div className={`${activity.bgColor} p-2 rounded-lg`}>
									<span className={`w-6 h-6 ${activity.textColor}`}>{activity.icon}</span>
								</div>
								<div>
									<p className="text-neutral-800">{activity.title}</p>
									<p className="text-sm text-neutral-500">{activity.description}</p>
									<p className="text-xs text-neutral-400 mt-1">{activity.time}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Quick Actions */}
				<div className="bg-white p-6 rounded-lg border border-neutral-200/60">
					<h2 className="text-lg font-semibold text-neutral-800 mb-4">Quick Actions</h2>
					<div className="grid grid-cols-2 gap-4">
						{quickActions.map((action, index) => (
							<Link
								key={index}
								to={action.to}
								className="flex items-center space-x-2 p-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
								<span className={`w-6 h-6 ${action.textColor}`}>{action.icon}</span>
								<span className="text-neutral-700">{action.label}</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
