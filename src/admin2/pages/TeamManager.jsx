import { useState, useRef } from 'react';
import {
  Plus, Search, Edit2, Trash2, GripVertical,
  Image as ImageIcon, Save, X, LayoutGrid, List as ListIcon,
  Eye, EyeOff, Linkedin, Mail, User, Briefcase, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const MOCK_TEAM = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "CEO & Founder",
    department: "Executive",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    bio: "Visionary leader with over 15 years of experience in digital transformation and business strategy.",
    linkedin: "https://linkedin.com",
    email: "alex@infotattva.com",
    gradient: "from-blue-600 to-indigo-600",
    status: "active",
    order: 0
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "CTO",
    department: "Engineering",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bio: "Tech enthusiast passionate about building scalable architectures and AI-driven solutions.",
    linkedin: "https://linkedin.com",
    email: "sarah@infotattva.com",
    gradient: "from-emerald-500 to-teal-500",
    status: "active",
    order: 1
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Head of Design",
    department: "Design",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    bio: "Award-winning designer focused on creating intuitive and beautiful user experiences.",
    linkedin: "https://linkedin.com",
    email: "michael@infotattva.com",
    gradient: "from-purple-500 to-pink-500",
    status: "draft",
    order: 2
  }
];

const GRADIENT_PRESETS = [
  { name: "Blue to Indigo", value: "from-blue-600 to-indigo-600" },
  { name: "Emerald to Teal", value: "from-emerald-500 to-teal-500" },
  { name: "Purple to Pink", value: "from-purple-500 to-pink-500" },
  { name: "Orange to Red", value: "from-orange-400 to-red-500" },
  { name: "Cyan to Blue", value: "from-cyan-400 to-blue-500" },
  { name: "Rose to Purple", value: "from-rose-500 to-purple-600" },
];

export default function TeamManager() {
  const [members, setMembers] = useState(MOCK_TEAM);
  const [viewMode, setViewMode] = useState('list');
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    image: "",
    bio: "",
    linkedin: "",
    email: "",
    gradient: GRADIENT_PRESETS[0].value,
    status: "draft"
  });

  const handleSort = () => {
    let _members = [...members];
    const draggedItemContent = _members.splice(dragItem.current, 1)[0];
    _members.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    _members = _members.map((item, index) => ({ ...item, order: index }));
    setMembers(_members);
    toast.success("Order updated");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this team member?")) {
      setMembers(members.filter(m => m.id !== id));
      toast.success("Member deleted");
    }
  };

  const handleToggleStatus = (id) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        const newStatus = m.status === 'active' ? 'draft' : 'active';
        toast.success(newStatus === 'active' ? "Member activated" : "Member hidden");
        return { ...m, status: newStatus };
      }
      return m;
    }));
  };

  const openEditModal = (member = null) => {
    if (member) {
      setFormData({ ...member });
      setCurrentMember(member);
    } else {
      setFormData({
        name: "",
        role: "",
        department: "",
        image: "",
        bio: "",
        linkedin: "",
        email: "",
        gradient: GRADIENT_PRESETS[0].value,
        status: "draft"
      });
      setCurrentMember(null);
    }
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentMember) {
      setMembers(members.map(m => m.id === currentMember.id ? { ...formData, id: currentMember.id } : m));
      toast.success("Member updated");
    } else {
      const newId = Math.max(...members.map(m => m.id), 0) + 1;
      setMembers([...members, { ...formData, id: newId, order: members.length }]);
      toast.success("Member added");
    }
    setIsEditing(false);
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Team Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your team members, roles, and profiles.</p>
        </div>
        <button
          onClick={() => openEditModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <ListIcon size={18} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-3"}>
        <AnimatePresence>
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              draggable={viewMode === 'list'}
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group ${
                viewMode === 'list' ? 'flex items-center p-4 gap-4' : 'flex flex-col'
              }`}
            >
              {/* Drag Handle (List only) */}
              {viewMode === 'list' && (
                <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500">
                  <GripVertical size={20} />
                </div>
              )}

              {/* Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-16 h-16 rounded-full' : 'w-full h-64'} overflow-hidden bg-gray-100 flex-shrink-0`}>
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-2xl font-bold`}>
                    {member.name.charAt(0)}
                  </div>
                )}
                {/* Overlay for Grid */}
                {viewMode === 'grid' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 ${viewMode === 'grid' ? 'p-5 -mt-12 relative z-10' : ''}`}>
                 {viewMode === 'grid' && (
                    <div className={`w-16 h-1 bg-gradient-to-r ${member.gradient} mb-4 rounded-full`}></div>
                 )}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-bold text-gray-800 ${viewMode === 'grid' ? 'text-xl' : 'text-lg'}`}>{member.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium mt-0.5">
                        <Briefcase size={14} />
                        {member.role}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Building2 size={12} />
                        {member.department}
                    </div>
                  </div>
                  {viewMode === 'list' && (
                    <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      member.status === 'active'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}>
                      {member.status === 'active' ? 'Active' : 'Hidden'}
                    </div>
                  )}
                </div>

                {viewMode === 'grid' && (
                  <div className="mt-4 flex items-center justify-between">
                     <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      member.status === 'active'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}>
                      {member.status === 'active' ? 'Active' : 'Hidden'}
                    </div>
                    <div className="flex gap-2">
                        {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600"><Linkedin size={16} /></a>}
                        {member.email && <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-indigo-600"><Mail size={16} /></a>}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className={`flex items-center gap-2 ${viewMode === 'grid' ? 'px-5 pb-5 border-t border-gray-100 mt-4 pt-4' : ''}`}>
                <button
                  onClick={() => handleToggleStatus(member.id)}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title={member.status === 'active' ? 'Hide' : 'Activate'}
                >
                  {member.status === 'active' ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={() => openEditModal(member)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800">
                  {currentMember ? 'Edit Team Member' : 'Add Team Member'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="teamForm" onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                placeholder="John Doe"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role / Designation</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                type="text"
                                required
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                placeholder="e.g. Senior Developer"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                type="text"
                                value={formData.department}
                                onChange={(e) => setFormData({...formData, department: e.target.value})}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                placeholder="e.g. Engineering"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                            <div className="flex gap-2">
                                <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                placeholder="https://..."
                                />
                                <button type="button" className="p-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
                                <ImageIcon size={20} className="text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gradient Theme</label>
                            <select
                                value={formData.gradient}
                                onChange={(e) => setFormData({...formData, gradient: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            >
                                {GRADIENT_PRESETS.map(preset => (
                                <option key={preset.value} value={preset.value}>{preset.name}</option>
                                ))}
                            </select>
                            <div className={`mt-2 h-2 w-full rounded-full bg-gradient-to-r ${formData.gradient}`}></div>
                        </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
                    <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                        placeholder="Brief description..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                        <div className="relative">
                            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="https://linkedin.com/in/..."
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="email@example.com"
                            />
                        </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, status: formData.status === 'active' ? 'draft' : 'active'})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        formData.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className={`text-sm font-medium ${formData.status === 'active' ? 'text-green-600' : 'text-gray-500'}`}>
                      {formData.status === 'active' ? 'Active (Visible)' : 'Hidden (Draft)'}
                    </span>
                  </div>

                </form>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="teamForm"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Member
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}