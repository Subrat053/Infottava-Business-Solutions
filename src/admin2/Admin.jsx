import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ServiceManager from "./pages/ServiceManager";
import TeamManager from "./pages/TeamManager";
import PortfolioManager from "./pages/PortfolioManager";
import TestimonialsManager from "./pages/TestimonialsManager";
import StatsNumberManager from "./pages/StatsNumberManager";
import PricingPlansManager from "./pages/PricingPlansManager";
import CareerJobManager from "./pages/CareerJobManager";
import ContactMessageImprovements from "./pages/ContactMessageImprovements";
import MediaManagerImprovements from "./pages/MediaManagerImprovements";
import SiteSettingManager from "./pages/SiteSettingManager";
import NavigationManager from "./pages/NavigationManager";
import AdminUserManager from "./pages/AdminUserManager";
import NotificationCenter from "./pages/NotificationCenter";
import AnalyticsReports from "./pages/AnalyticsReports";
import Help from "./pages/Help";

const Admin = () => {
    return (
        <div className="bg-gray-100 h-screen flex flex-col overflow-hidden">
            <Header />
            <div className='flex flex-1 overflow-hidden relative'>
                <Sidebar />
                <main className='flex-1 overflow-y-auto overflow-x-hidden'>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        <Routes>
                            <Route index element={<Dashboard />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="services" element={<ServiceManager />}/>
                            <Route path="team" element={<TeamManager />}/>
                            <Route path="portfolio" element={<PortfolioManager />}/>
                            <Route path="testimonials" element={<TestimonialsManager />}/>
                            <Route path="stats" element={<StatsNumberManager />}/>
                            <Route path="pricing" element={<PricingPlansManager />}/>
                            <Route path="career" element={<CareerJobManager />}/>
                            <Route path="contacts" element={<ContactMessageImprovements />}/>
                            <Route path="media" element={<MediaManagerImprovements />}/>
                            <Route path="site-settings" element={<SiteSettingManager />}/>
                            <Route path="navigation" element={<NavigationManager />}/>
                            <Route path="users" element={<AdminUserManager />}/>
                            <Route path="notifications" element={<NotificationCenter />}/>
                            <Route path="analytics" element={<AnalyticsReports />}/>
                            <Route path="help" element={<Help />}/>
                        </Routes>
                    </div>
                </main>
            </div>

        </div>
    );
};

export default Admin;