import { Outlet } from "react-router-dom";
import { ConfirmDialog } from "primereact/confirmdialog";
import Sidebar from "./Sidebar";

// Sidebar + scrollable page area. Pages render through <Outlet />.
const Layout = () => (
  <div className="flex h-screen overflow-hidden">
    <Sidebar />
    <main className="min-w-0 flex-1 overflow-y-auto bg-[#E5E7EB]">
      <Outlet />
    </main>
    <ConfirmDialog />
  </div>
);

export default Layout;
