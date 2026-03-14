import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Settings, Menu, Globe, Users, FolderKanban, MessageSquare, BarChart2, DollarSign, Briefcase, Mail, Image, Map, Bell, ChevronDown, HelpCircle
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    group: "Content",
    items: [
      { name: "Services", href: "/admin/services", icon: Settings },
      { name: "Team", href: "/admin/team", icon: Users },
      { name: "Portfolio", href: "/admin/portfolio", icon: FolderKanban },
      { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
      { name: "Stats", href: "/admin/stats", icon: BarChart2 },
      { name: "Pricing Plans", href: "/admin/pricing", icon: DollarSign },
      { name: "Careers", href: "/admin/career", icon: Briefcase },
      { name: "Contact Messages", href: "/admin/contacts", icon: Mail },
      { name: "Media Manager", href: "/admin/media", icon: Image },
      { name: "Navigation", href: "/admin/navigation", icon: Map },
      { name: "Site Settings", href: "/admin/site-settings", icon: Globe },
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Notifications Center", href: "/admin/notifications", icon: Bell },
      { name: "Analytics & Reports", href: "/admin/analytics", icon: BarChart2 },
      { name: "Help & Insights", href: "/admin/help", icon: HelpCircle }
    ],
  }
];

export default function Sidebar() {
  const linkClass = "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 hover:bg-gray-100";
  const activeLinkClass = "flex items-center gap-3 rounded-lg px-3 py-2 font-semibold text-indigo-600 bg-indigo-50 transition-all";

  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex-shrink-0 hidden md:flex flex-col">

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((section, idx) => (
          <div key={idx}>
            {section.group ? (
              <div className="space-y-1">
                {/* <h3 className="px-3 pt-2 pb-1 text-xs font-semibold uppercase text-gray-400 tracking-wider">{section.group}</h3> */}
                {section.items.map((item) => (
                  <NavLink key={item.name} to={item.href} className={({ isActive }) => isActive ? activeLinkClass : linkClass}>
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            ) : (
              <NavLink to={section.href} end className={({ isActive }) => isActive ? activeLinkClass : linkClass}>
                <section.icon className="h-4 w-4" />
                {section.name}
              </NavLink>
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
          <img src="https://i.pravatar.cc/40?u=admin" alt="Admin" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold text-gray-800 text-sm">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <ChevronDown className="ml-auto h-5 w-5 text-gray-500" />
        </div>
      </div>
    </aside>
  );
}