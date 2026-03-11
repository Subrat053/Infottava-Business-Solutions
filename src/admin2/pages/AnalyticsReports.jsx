import { useState } from 'react';
import {
  BarChart2, TrendingUp, Users, Clock, Globe, FileText, Download,
  Calendar, ChevronDown, ArrowUp, ArrowDown, PieChart, Activity,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const MOCK_STATS = [
  { title: "Total Visitors", value: "12,450", change: "+12%", trend: "up", icon: Users, color: "bg-blue-500" },
  { title: "Bounce Rate", value: "42.3%", change: "-5%", trend: "down", icon: Activity, color: "bg-purple-500" }, // down is good for bounce rate
  { title: "Avg. Session", value: "2m 45s", change: "+8%", trend: "up", icon: Clock, color: "bg-green-500" },
  { title: "Conversions", value: "3.2%", change: "+1.5%", trend: "up", icon: TrendingUp, color: "bg-orange-500" },
];

const TOP_PAGES = [
  { path: "/", title: "Home", views: "5,230", unique: "4,100" },
  { path: "/services", title: "Services", views: "3,120", unique: "2,800" },
  { path: "/about", title: "About Us", views: "2,450", unique: "1,900" },
  { path: "/contact", title: "Contact", views: "1,890", unique: "1,500" },
  { path: "/career", title: "Careers", views: "980", unique: "850" },
];

const TRAFFIC_SOURCES = [
  { source: "Organic Search", percentage: 45, color: "bg-blue-500" },
  { source: "Direct", percentage: 25, color: "bg-green-500" },
  { source: "Social Media", percentage: 20, color: "bg-purple-500" },
  { source: "Referral", percentage: 10, color: "bg-orange-500" },
];

const GEO_DATA = [
  { country: "India", percentage: 60 },
  { country: "United States", percentage: 20 },
  { country: "United Kingdom", percentage: 10 },
  { country: "Others", percentage: 10 },
];

export default function AnalyticsReports() {
  const [dateRange, setDateRange] = useState('30d');

  const handleExport = (reportType) => {
    toast.success(`Generating ${reportType} report...`);
    setTimeout(() => {
      toast.success("Download started");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Overview of website performance and user engagement.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
          <Calendar size={16} className="text-gray-500 ml-2" />
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none py-1 pr-2 cursor-pointer"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 3 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_STATS.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                (stat.trend === 'up' && stat.title !== 'Bounce Rate') || (stat.trend === 'down' && stat.title === 'Bounce Rate')
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {stat.trend === 'up' ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Overview (Mock Chart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Traffic Overview</h3>
            <button className="text-indigo-600 text-sm font-medium hover:underline">View Full Report</button>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-full bg-indigo-50 rounded-t-lg relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 80 + 20}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400 px-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">Traffic Sources</h3>
          <div className="space-y-6">
            {TRAFFIC_SOURCES.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">{source.source}</span>
                  <span className="text-gray-900 font-bold">{source.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${source.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-full rounded-full ${source.color}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Most Visited Pages</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-semibold">Page Title</th>
                  <th className="px-6 py-3 font-semibold text-right">Views</th>
                  <th className="px-6 py-3 font-semibold text-right">Unique</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TOP_PAGES.map((page, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{page.title}</div>
                      <div className="text-xs text-gray-500">{page.path}</div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-700">{page.views}</td>
                    <td className="px-6 py-4 text-right text-gray-500">{page.unique}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Geographic & Reports */}
        <div className="space-y-6">
          {/* Geo Distribution */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Globe size={18} className="text-indigo-600" /> Geographic Distribution
            </h3>
            <div className="space-y-3">
              {GEO_DATA.map((geo, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{geo.country}</span>
                  <span className="text-sm font-bold text-indigo-600">{geo.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Export Reports */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-xl shadow-lg text-white">
            <h3 className="font-bold text-lg mb-2">Generate Reports</h3>
            <p className="text-indigo-100 text-sm mb-6">Download detailed CSV reports for offline analysis.</p>
            <div className="space-y-3">
              <button 
                onClick={() => handleExport('Leads')}
                className="w-full flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
              >
                <span className="text-sm font-medium flex items-center gap-2"><FileText size={16} /> Monthly Leads Report</span>
                <Download size={16} />
              </button>
              <button 
                onClick={() => handleExport('Applications')}
                className="w-full flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
              >
                <span className="text-sm font-medium flex items-center gap-2"><Briefcase size={16} /> Job Applications Summary</span>
                <Download size={16} />
              </button>
              <button 
                onClick={() => handleExport('Content History')}
                className="w-full flex items-center justify-between px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
              >
                <span className="text-sm font-medium flex items-center gap-2"><Clock size={16} /> Content Update History</span>
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}