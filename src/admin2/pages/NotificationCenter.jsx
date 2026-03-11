import { useState } from 'react';
import {
  Bell, Mail, Briefcase, MessageSquare, AlertTriangle, Check, Trash2,
  Settings, Clock, CheckCircle, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'message',
    title: 'New Contact Message',
    message: 'Alice Johnson sent a message regarding "Web Development Inquiry".',
    time: '5 mins ago',
    read: false,
    icon: Mail,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    type: 'job',
    title: 'New Job Application',
    message: 'John Doe applied for "Senior Full Stack Developer".',
    time: '1 hour ago',
    read: false,
    icon: Briefcase,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 3,
    type: 'system',
    title: 'Storage Warning',
    message: 'Media storage is 85% full. Consider upgrading your plan.',
    time: '2 hours ago',
    read: true,
    icon: AlertTriangle,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 4,
    type: 'content',
    title: 'Content Updated',
    message: 'Sarah Content updated the "About Us" page.',
    time: '1 day ago',
    read: true,
    icon: Info,
    color: 'bg-green-100 text-green-600'
  }
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'system'
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    emailAlerts: true,
    dailyDigest: false,
    jobAlerts: true,
    messageAlerts: true
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const clearAll = () => {
    if(window.confirm("Clear all notifications?")) {
      setNotifications([]);
      toast.success("Notifications cleared");
    }
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'system') return n.type === 'system';
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">Stay updated with important alerts and activities.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg border transition-colors ${showSettings ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Email Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Instant Email Alerts</span>
                    <input type="checkbox" checked={settings.emailAlerts} onChange={() => setSettings({...settings, emailAlerts: !settings.emailAlerts})} className="toggle-checkbox" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Daily Digest Summary</span>
                    <input type="checkbox" checked={settings.dailyDigest} onChange={() => setSettings({...settings, dailyDigest: !settings.dailyDigest})} className="toggle-checkbox" />
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Notification Types</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">New Messages</span>
                    <input type="checkbox" checked={settings.messageAlerts} onChange={() => setSettings({...settings, messageAlerts: !settings.messageAlerts})} className="toggle-checkbox" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Job Applications</span>
                    <input type="checkbox" checked={settings.jobAlerts} onChange={() => setSettings({...settings, jobAlerts: !settings.jobAlerts})} className="toggle-checkbox" />
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="flex gap-2">
            {['all', 'unread', 'system'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                  filter === f 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-3 text-sm">
            <button onClick={markAllRead} className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
              <CheckCircle size={16} /> Mark all read
            </button>
            <button onClick={clearAll} className="text-gray-500 hover:text-red-600 font-medium flex items-center gap-1">
              <Trash2 size={16} /> Clear all
            </button>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-4 flex gap-4 hover:bg-gray-50 transition-colors group ${notification.read ? 'opacity-70' : 'bg-indigo-50/30'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                    <notification.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className={`text-sm font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>{notification.title}</h4>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                  <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.read && (
                      <button onClick={() => markAsRead(notification.id)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded" title="Mark as read"><Check size={16} /></button>
                    )}
                    <button onClick={() => deleteNotification(notification.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">
                <Bell size={48} className="mx-auto mb-4 opacity-20" />
                <p>No notifications found</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}