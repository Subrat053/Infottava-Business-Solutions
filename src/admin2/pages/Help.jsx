import { useState } from 'react';
import {
  Search, Globe, MapPin, Clock, Smartphone, Monitor,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_VISITORS = [
  { id: 1, ip: "192.168.1.1", location: "New York, US", device: "Desktop", page: "/services", time: "2 mins ago" },
  { id: 2, ip: "172.16.0.1", location: "London, UK", device: "Mobile", page: "/contact", time: "15 mins ago" },
  { id: 3, ip: "10.0.0.1", location: "Mumbai, IN", device: "Desktop", page: "/", time: "1 hour ago" },
  { id: 4, ip: "192.168.0.101", location: "Sydney, AU", device: "Tablet", page: "/about", time: "3 hours ago" },
  { id: 5, ip: "127.0.0.1", location: "Tokyo, JP", device: "Desktop", page: "/career", time: "5 hours ago" },
];

const MOCK_SEARCHES = [
  { id: 1, query: "web development services", clicks: 150, impressions: 2000, position: 3.5 },
  { id: 2, query: "app developers near me", clicks: 120, impressions: 1500, position: 2.1 },
  { id: 3, query: "infottava business solutions", clicks: 90, impressions: 100, position: 1.0 },
  { id: 4, query: "digital marketing agency", clicks: 60, impressions: 3000, position: 12.4 },
  { id: 5, query: "react js development company", clicks: 45, impressions: 800, position: 5.2 },
];

export default function Help() {
  const [activeTab, setActiveTab] = useState('visitors');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Help & Visitor Insights</h1>
          <p className="text-gray-500 text-sm mt-1">Detailed breakdown of site traffic and search performance.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Site Visitors</p>
            <h3 className="text-3xl font-bold text-indigo-600 mt-1">15,234</h3>
            <p className="text-xs text-green-600 mt-2 flex items-center">
              <span className="font-bold">+12%</span>&nbsp;from last month
            </p>
          </div>
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <Globe size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Google Search Clicks</p>
            <h3 className="text-3xl font-bold text-orange-600 mt-1">8,450</h3>
            <p className="text-xs text-green-600 mt-2 flex items-center">
              <span className="font-bold">+5.3%</span>&nbsp;from last month
            </p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <Search size={24} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-6 pt-4">
        <button
          onClick={() => setActiveTab('visitors')}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === 'visitors' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Visitor Logs
          {activeTab === 'visitors' && <motion.div layoutId="activeTabHelp" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
        </button>
        <button
          onClick={() => setActiveTab('searches')}
          className={`pb-4 px-4 text-sm font-medium transition-colors relative ${activeTab === 'searches' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Search Queries
          {activeTab === 'searches' && <motion.div layoutId="activeTabHelp" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
        </button>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === 'visitors' ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">IP Address</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Device</th>
                  <th className="px-6 py-4 font-semibold">Page</th>
                  <th className="px-6 py-4 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_VISITORS.map((visitor) => (
                  <tr key={visitor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-600">{visitor.ip}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400" /> {visitor.location}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {visitor.device === 'Mobile' ? <Smartphone size={14} className="text-gray-400" /> : <Monitor size={14} className="text-gray-400" />}
                        {visitor.device}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-indigo-600">{visitor.page}</td>
                    <td className="px-6 py-4 text-gray-500 flex items-center gap-2">
                      <Clock size={14} /> {visitor.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Search Query</th>
                  <th className="px-6 py-4 font-semibold">Clicks</th>
                  <th className="px-6 py-4 font-semibold">Impressions</th>
                  <th className="px-6 py-4 font-semibold">Avg. Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_SEARCHES.map((search) => (
                  <tr key={search.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{search.query}</td>
                    <td className="px-6 py-4 text-gray-600">{search.clicks}</td>
                    <td className="px-6 py-4 text-gray-600">{search.impressions}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${search.position <= 3 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {search.position}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-center">
          <button className="text-sm text-gray-500 hover:text-indigo-600 font-medium transition-colors">View All Logs</button>
        </div>
      </div>
    </div>
  );
}