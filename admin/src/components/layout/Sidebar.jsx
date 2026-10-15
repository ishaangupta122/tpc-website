import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../../app/navigation";
import { useAuth } from "../../context";

const NavLinks = ({ onNavigate }) => {
  const { pathname } = useLocation();
  return NAV_ITEMS.map((item) => (
    <Link
      key={item.to}
      to={item.to}
      onClick={onNavigate}
      className={`flex items-center px-4 py-3 font-medium space-x-2 ${
        pathname === item.to
          ? "bg-green-100 text-green-600 hover:bg-green-100"
          : "hover:bg-gray-100 text-gray-700"
      }`}>
      <item.icon className="w-5 h-5" />
      <span>{item.name}</span>
    </Link>
  ));
};

const AdminBadge = () => {
  const { user } = useAuth();
  return (
    <div className="p-4 border-t border-neutral-300 flex items-center">
      <img
        src="/default_user_img.jpeg"
        alt="User"
        className="w-10 h-10 rounded-full"
      />
      <div className="ml-3 min-w-0">
        <p className="text-sm font-medium text-gray-700">{user?.name || "Admin"}</p>
        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Desktop sidebar */}
      <nav className="hidden lg:flex flex-col w-64 bg-white shadow-lg border-r border-neutral-200">
        <div className="p-2 border-b border-neutral-300">
          <img src="/tpc-logo.png" alt="Logo" className="h-16 w-auto" />
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavLinks />
        </div>
        <AdminBadge />
      </nav>

      {/* Mobile menu */}
      <button
        type="button"
        aria-label="Toggle menu"
        className="lg:hidden fixed top-4 right-4 z-20 p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-10 bg-neutral-800/80 backdrop-blur-lg"
          onClick={() => setIsOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col">
            <div className="p-4 border-b border-neutral-300">
              <div className="text-2xl font-bold text-gray-800">Menu</div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <NavLinks onNavigate={() => setIsOpen(false)} />
            </div>
            <AdminBadge />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
