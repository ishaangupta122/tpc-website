import { useState, useEffect } from "react";
import {
  Home,
  Users,
  Calendar,
  Settings,
  Trophy,
  Menu,
  X,
  Rocket,
  Image,
  BarChart4,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", to: "/", icon: Home },
    { name: "Faculty List", to: "/faculty", icon: Users },
    { name: "Events & Updates", to: "/events", icon: Calendar },
    { name: "Achievements", to: "/achievements", icon: Trophy },
    { name: "Success Story", to: "/successStory", icon: Rocket },
    { name: "Placements", to: "/placements", icon: BarChart4 },
    {
      name: "Managing Committee",
      to: "/managing-committee",
      icon: Users,
    },
    { name: "Gallery", to: "/gallery", icon: Image },

    { name: "Settings", to: "/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col w-64 bg-white shadow-lg border-r border-neutral-200">
        <div className="p-2 border-b border-neutral-300">
          <img src="tpc-logo.png" alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Scrollable Links Section */}
        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center px-4 py-3 font-medium space-x-2 ${
                location.pathname === item.to
                  ? "bg-green-100 text-green-600 hover:bg-green-100"
                  : "hover:bg-gray-100 text-gray-700"
              }`}>
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Admin Credentials - Fixed at Bottom */}
        <div className="p-4 border-t border-neutral-300 flex items-center">
          <img
            src="/default_user_img.jpeg"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Admin</p>
            <p className="text-xs text-gray-500">tpcadmin@mail.com</p>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 right-4 z-20 p-2 rounded-md bg-gray-100 text-gray-700  hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-10 bg-neutral-800/80 backdrop-blur-lg"
          onClick={() => setIsOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col">
            <div className="p-4 border-b border-neutral-300">
              <div className="text-2xl font-bold text-gray-800">Menu</div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center px-4 py-3 font-medium space-x-2 ${
                    location.pathname === item.to
                      ? "bg-green-100 text-green-600 hover:bg-green-100"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setIsOpen(false)}>
                  <item.icon className="w-5 h-5" /> <span>{item.name}</span>{" "}
                </Link>
              ))}
            </div>

            <div className="p-2 border-t border-neutral-300 flex items-center">
              <img
                src="/default_user_img.jpeg"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin</p>
                <p className="text-xs text-gray-500">tpcadmin@mail.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
