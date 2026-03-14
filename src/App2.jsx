import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./NewComponents/header";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ServicesPage from "./Pages/ServicesPage";
import ServiceDetailPage from "./Pages/ServiceDetailPage";
import CareerPage from "./Pages/CareerPage";
import ContactPage from "./Pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop";
import Admin from "./admin2/Admin";

// Admin panel
// import { AdminAuthProvider } from "./admin/AdminAuthContext";


function App() {
  return (
      <Routes>
        <Route path="/admin/*" element={<Admin/>}/>

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
  );
}

export default App;
