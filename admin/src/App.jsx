import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/Login";
import Placements from "./Placements/View";
import EventsCalendar from "./Events/Events";
import Sidebar from "./components/Sidebar";
import ManagingCommittee from "./MngCommittee.jsx/Member";
import Achievements from "./Achievements/Achievements";
import FacultyList from "./Faculty/Faculty";
import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Settings/Settings";
import SuccessStory from "./SuccessStory/SuccessStory";

// Dummy authentication status
const isAuthenticated = localStorage.getItem("auth") === "true";

const ProtectedRoute = ({ element }) => {
  return isAuthenticated ? element : <Navigate to='/login' />;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto bg-[#E5E7EB]'>
          <Routes>
            <Route
              path='/'
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route path='/login' element={<AdminLogin />} />
            <Route
              path='/faculty'
              element={<ProtectedRoute element={<FacultyList />} />}
            />
            <Route
              path='/achievements'
              element={<ProtectedRoute element={<Achievements />} />}
            />
            <Route
              path='/events'
              element={<ProtectedRoute element={<EventsCalendar />} />}
            />
            <Route
              path='/successStory'
              element={<ProtectedRoute element={<SuccessStory />} />}
            />
            <Route
              path='/placements'
              element={<ProtectedRoute element={<Placements />} />}
            />
            <Route
              path='/managing-committee'
              element={<ProtectedRoute element={<ManagingCommittee />} />}
            />
            <Route
              path='/settings'
              element={<ProtectedRoute element={<Settings />} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
