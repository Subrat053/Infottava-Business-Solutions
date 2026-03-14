import { useState } from 'react';
import {
  Plus, Search, Edit2, Trash2, Shield, User, Mail, Lock,
  Activity, CheckCircle, XCircle, Clock, MoreVertical,
  UserPlus, Key, Eye, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const MOCK_USERS = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@infotattva.com",
    role: "Super Admin",
    status: "active",
    lastLogin: "2 mins ago",
    avatar: "https://i.pravatar.cc/150?u=admin"
  },
  {
    id: 2,
    name: "Sarah Content",
    email: "sarah@infotattva.com",
    role: "Content Editor",
    status: "active",
    lastLogin: "2 hours ago",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 3,
    name: "Mike Support",
    email: "mike@infotattva.com",
    role: "Support Agent",
    status: "inactive",
    lastLogin: "5 days ago",
    avatar: "https://i.pravatar.cc/150?u=mike"
  }
];

const ROLES = [
  { name: "Super Admin", description: "Full access to all features" },
  { name: "Content Editor", description: "Can edit content, services, blog" },
  { name: "Support Agent", description: "Can manage messages and replies" },
  { name: "Viewer", description: "Read-only access to dashboard" }
];

const MOCK_LOGS = [
  { id: 1, userId: 1, action: "Updated Site Settings", time: "10 mins ago" },
  { id: 2, userId: 2, action: "Edited Service: Web Dev", time: "2 hours ago" },
  { id: 3, userId: 1, action: "Invited new user: John", time: "1 day ago" },
  { id: 4, userId: 3, action: "Replied to message #123", time: "5 days ago" },
];

export default function AdminUserManager() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogs, setShowLogs] = useState(null); // userId
  const [searchTerm, setSearchTerm] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Viewer",
    password: ""
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (currentUser) {
      setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...formData } : u));
      toast.success("User updated successfully");
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        status: "active",
        lastLogin: "Never",
        avatar: `https://i.pravatar.cc/150?u=${formData.email}`
      };
      setUsers([...users, newUser]);
      toast.success("Invitation sent to " + formData.email);
    }
    closeModal();
  };

  const openModal = (user = null) => {
    if (user) {
      setFormData({ name: user.name, email: user.email, role: user.role, password: "" });
      setCurrentUser(user);
    } else {
      setFormData({ name: "", email: "", role: "Viewer", password: "" });
      setCurrentUser(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'active' ? 'inactive' : 'active';
        toast.success(`User ${newStatus === 'active' ? 'reactivated' : 'deactivated'}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
      toast.success("User deleted");
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Super Admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Content Editor': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Support Agent': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
       {/* Header */}
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage admin access and permissions.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <UserPlus size={18} />
          <span>Invite User</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Last Login</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className={`text-sm capitalize ${user.status === 'active' ? 'text-green-700' : 'text-gray-500'}`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setShowLogs(user.id)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg" title="Activity Log">
                        <Activity size={18} />
                      </button>
                      <button onClick={() => toggleStatus(user.id)} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg" title={user.status === 'active' ? 'Deactivate' : 'Activate'}>
                        {user.status === 'active' ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <button onClick={() => openModal(user)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-800">
                  {currentUser ? 'Edit User' : 'Invite New User'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <XCircle size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 input-style"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 input-style"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 input-style appearance-none bg-white"
                    >
                      {ROLES.map(role => (
                        <option key={role.name} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-1">
                    {ROLES.find(r => r.name === formData.role)?.description}
                  </p>
                </div>
                
                {currentUser && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Change Password (Optional)</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="password" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 input-style"
                        placeholder="New password..."
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium shadow-sm"
                  >
                    {currentUser ? 'Save Changes' : 'Send Invitation'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Activity Log Drawer */}
      <AnimatePresence>
        {showLogs && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowLogs(null)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-800">Activity Log</h3>
                <button onClick={() => setShowLogs(null)} className="p-2 hover:bg-gray-200 rounded-full">
                  <XCircle size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {MOCK_LOGS.filter(log => log.userId === showLogs).length > 0 ? (
                    MOCK_LOGS.filter(log => log.userId === showLogs).map(log => (
                      <div key={log.id} className="flex gap-3 text-sm">
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-indigo-400 ring-4 ring-indigo-50" />
                        </div>
                        <div>
                          <p className="text-gray-800 font-medium">{log.action}</p>
                          <p className="text-xs text-gray-500">{log.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-8">No activity recorded.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}