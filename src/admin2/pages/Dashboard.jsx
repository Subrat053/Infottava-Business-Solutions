import {
  Puzzle, Briefcase, MessageSquare, Users, Book, Mail, Zap,
  PlusCircle, UserPlus, Clock, ShieldCheck, ArrowUpRight, FileText, Globe, Search
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Reusable Stat Card Component
const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
    </div>
  );
};

// Reusable Quick Action Component
const QuickAction = ({ title, icon: Icon, to }) => {
  return (
    <NavLink to={to} className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
      <Icon className="h-6 w-6 text-indigo-600 mr-4" />
      <span className="font-semibold text-gray-700">{title}</span>
      <ArrowUpRight className="h-5 w-5 text-gray-400 ml-auto" />
    </NavLink>
  );
};

// Reusable Activity Item Component
const ActivityItem = ({ user, action, time }) => {
  return (
    <li className="py-3 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{user}</span> {action}
        </p>
      </div>
      <p className="text-sm text-gray-500">{time}</p>
    </li>
  );
};

export default function Dashboard() {
  // This data would come from your API
  const stats = [
    { title: "Website Visitors", value: "15.2k", icon: Globe, color: "bg-indigo-500" },
    { title: "Google Searches", value: "8.4k", icon: Search, color: "bg-yellow-500" },
    { title: "Services Published", value: 12, icon: Puzzle, color: "bg-blue-500" },
    { title: "Portfolio Projects", value: 25, icon: Briefcase, color: "bg-purple-500" },
    { title: "Total Testimonials", value: 8, icon: MessageSquare, color: "bg-green-500" },
    { title: "Team Members", value: 15, icon: Users, color: "bg-orange-500" },
    { title: "Job Listings", value: 4, icon: FileText, color: "bg-red-500" },
    { title: "New Messages", value: 3, icon: Mail, color: "bg-teal-500" },
    { title: "Blog Posts", value: 42, icon: Book, color: "bg-pink-500" },
  ];

  const quickActions = [
    { title: "Add New Service", icon: PlusCircle, to: "/admin/services" },
    { title: "Add Team Member", icon: UserPlus, to: "/admin/team" },
    { title: "Reply to Message", icon: MessageSquare, to: "/admin/contacts" },
  ];

  const recentActivity = [
    { user: "Admin User", action: "updated the 'About Us' page.", time: "2m ago" },
    { user: "Jane Doe", action: "added a new portfolio project 'Project X'.", time: "1h ago" },
    { user: "Admin User", action: "published a new blog post.", time: "3h ago" },
    { user: "John Smith", action: "replied to a contact message.", time: "1d ago" },
    { user: "Admin User", action: "added a new service 'Cloud Solutions'.", time: "2d ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="mt-1 text-gray-500">Welcome back, Admin! Here's a summary of your website's activity.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
          <ShieldCheck size={16} />
          <span>API Status: Healthy</span>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Widgets Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Quick Actions Panel */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recentActivity.map((item, index) => (
                <ActivityItem key={index} {...item} />
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-700 flex items-center"><Clock size={18} className="mr-2 text-gray-500"/> Today's Stats</h3>
              <div className="mt-4 flex justify-around">
                  <div className="text-center">
                      <p className="text-3xl font-bold text-indigo-600">7</p>
                      <p className="text-sm text-gray-500">New Messages</p>
                  </div>
                  <div className="text-center">
                      <p className="text-3xl font-bold text-indigo-600">2</p>
                      <p className="text-sm text-gray-500">Job Applications</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}