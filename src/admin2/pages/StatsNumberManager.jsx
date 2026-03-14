import { useState, useRef } from 'react';
import {
  Plus, Edit2, Trash2, GripVertical, Save, X, BarChart2, Hash, Type, Smile
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const MOCK_STATS = [
  {
    id: 1,
    label: "Projects Completed",
    value: 400,
    suffix: "+",
    icon: "📊",
    order: 0
  },
  {
    id: 2,
    label: "Happy Clients",
    value: 250,
    suffix: "+",
    icon: "😊",
    order: 1
  },
  {
    id: 3,
    label: "Expert Team",
    value: 15,
    suffix: "+",
    icon: "👥",
    order: 2
  },
  {
    id: 4,
    label: "Years Experience",
    value: 8,
    suffix: "+",
    icon: "🏆",
    order: 3
  }
];

const initialFormState = {
  label: "",
  value: 0,
  suffix: "",
  icon: "",
};

export default function StatsNumberManager() {
  const [stats, setStats] = useState(MOCK_STATS);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStat, setCurrentStat] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    let _stats = [...stats];
    const draggedItemContent = _stats.splice(dragItem.current, 1)[0];
    _stats.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    _stats = _stats.map((item, index) => ({ ...item, order: index }));
    setStats(_stats);
    toast.success("Order updated");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this stat?")) {
      setStats(stats.filter(s => s.id !== id));
      toast.success("Stat deleted");
    }
  };

  const openEditModal = (stat = null) => {
    if (stat) {
      setFormData({ ...stat });
      setCurrentStat(stat);
    } else {
      setFormData(initialFormState);
      setCurrentStat(null);
    }
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentStat) {
      setStats(stats.map(s => s.id === currentStat.id ? { ...formData, id: currentStat.id } : s));
      toast.success("Stat updated");
    } else {
      const newId = Math.max(...stats.map(s => s.id), 0) + 1;
      setStats([...stats, { ...formData, id: newId, order: stats.length }]);
      toast.success("Stat added");
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Stats & Numbers Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Manage the animated counters on your homepage.</p>
        </div>
        <button
          onClick={() => openEditModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Add New Stat</span>
        </button>
      </div>

      {/* Content List */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-3">
          <AnimatePresence>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                draggable
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                className="bg-gray-50 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow group flex items-center p-4 gap-4"
              >
                <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500">
                  <GripVertical size={20} />
                </div>

                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  {stat.icon}
                </div>

                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
                  <div className="font-semibold text-gray-800">{stat.label}</div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-indigo-600">{stat.value}</span>
                    <span className="text-lg font-semibold text-indigo-500 ml-1">{stat.suffix}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => openEditModal(stat)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(stat.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800">{currentStat ? 'Edit Stat' : 'Add New Stat'}</h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="statForm" onSubmit={handleSave} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <div className="relative">
                      <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="text" required value={formData.label} onChange={(e) => setFormData({ ...formData, label: e.target.value })} className="w-full pl-10 pr-4 py-2 input-style" placeholder="e.g. Projects Completed" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Value / Number</label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="number" required value={formData.value} onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value, 10) || 0 })} className="w-full pl-10 pr-4 py-2 input-style" placeholder="e.g. 400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Suffix</label>
                      <input type="text" value={formData.suffix} onChange={(e) => setFormData({ ...formData, suffix: e.target.value })} className="w-full px-4 py-2 input-style" placeholder="e.g. +" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
                     <div className="relative">
                      <Smile className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="text" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full pl-10 pr-4 py-2 input-style" placeholder="e.g. 📊" />
                    </div>
                  </div>
                </form>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancel</button>
                <button type="submit" form="statForm" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm flex items-center gap-2">
                  <Save size={18} />
                  Save Stat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}