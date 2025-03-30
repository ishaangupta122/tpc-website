import { useState } from "react";
import {
  UserPlus,
  PlusCircle,
  Edit,
  Rocket,
  BarChart4,
  Image,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [quickActions] = useState([
    {
      icon: <UserPlus size={24} />,
      label: "Add Faculty",
      to: "/faculty",
      textColor: "text-green-600",
    },
    {
      icon: <PlusCircle size={24} />,
      label: "New Event/Update",
      to: "/events",
      textColor: "text-purple-600",
    },
    {
      icon: <BarChart4 size={24} />,
      label: "New Placement",
      to: "/placements",
      textColor: "text-green-600",
    },
    {
      icon: <Edit size={24} />,
      label: "Add Achievement",
      to: "/achievements",
      textColor: "text-orange-600",
    },
    {
      icon: <Rocket size={24} />,
      label: "Add Success Story",
      to: "/successStory",
      textColor: "text-indigo-600",
    },
    {
      icon: <UserPlus size={24} />,
      label: "Add Committee Member",
      to: "/managing-committee",
      textColor: "text-yellow-600",
    },
    {
      icon: <Image size={24} />,
      label: "Add Gallery Images",
      to: "/gallery",
      textColor: "text-indigo-600",
    },
    {
      icon: <Settings size={24} />,
      label: "Update Admin Credentials",
      to: "/settings",
      textColor: "text-red-600",
    },
  ]);

  return (
    <section className='p-6 space-y-6 max-w-7xl'>
      <div className='flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-800'>
            Welcome, Admin
          </h1>
          <p className='text-neutral-500'>
            {"Manage College Data with Quick Actions"}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='w-full'>
        <div className='bg-white p-6 w-full rounded-lg border border-neutral-200/60'>
          <h2 className='text-lg font-semibold text-neutral-800 mb-4'>
            Quick Actions
          </h2>
          <div className='flex flex-wrap justify-start items-center gap-4'>
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.to}
                className='flex items-center space-x-2 p-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors'>
                <span className={`w-6 h-6 ${action.textColor}`}>
                  {action.icon}
                </span>
                <span className='text-neutral-700'>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
