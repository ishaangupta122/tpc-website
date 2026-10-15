import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppProviders from "./AppProviders";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";
import LoginPage from "../features/auth/LoginPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import FacultyPage from "../features/faculty/FacultyPage";
import EventsPage from "../features/events/EventsPage";
import AchievementsPage from "../features/achievements/AchievementsPage";
import SuccessStoriesPage from "../features/success-stories/SuccessStoriesPage";
import PlacementsPage from "../features/placements/PlacementsPage";
import CommitteePage from "../features/committee/CommitteePage";
import GalleryPage from "../features/gallery/GalleryPage";
import NoticesPage from "../features/notices/NoticesPage";
import DocumentsPage from "../features/documents/DocumentsPage";

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="faculty" element={<FacultyPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="success-stories" element={<SuccessStoriesPage />} />
            <Route path="placements" element={<PlacementsPage />} />
            <Route path="managing-committee" element={<CommitteePage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="notices" element={<NoticesPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            {/* Old bookmark */}
            <Route path="successStory" element={<Navigate to="/success-stories" replace />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AppProviders>
);

export default App;
