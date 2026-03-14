import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./NewComponents/header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import CareerPage from "./pages/CareerPage";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop";

// Admin panel
import { AdminAuthProvider } from "./admin/AdminAuthContext";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";
import Dashboard from "./admin/pages/Dashboard";
import ContactMessages from "./admin/pages/ContactMessages";
import ContentManager from "./admin/pages/ContentManager";
import MediaManager from "./admin/pages/MediaManager";

function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* ── Admin routes (no site header/footer) ── */}
        <Route path="/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/contacts" element={<ContactMessages />} />
            <Route path="/admin/content" element={<ContentManager />} />
            <Route path="/admin/media" element={<MediaManager />} />
          </Route>
        </Route>

        {/* ── Public website routes ── */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen">
              <Header />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route
                  path="/services/:serviceId"
                  element={<ServiceDetailPage />}
                />
                <Route path="/career" element={<CareerPage />} />
                <Route path="/careers" element={<Navigate to="/career" replace />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </AdminAuthProvider>
  );
}

export default App;
