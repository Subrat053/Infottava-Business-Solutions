import { useState, useRef, useEffect } from 'react';
import { 
  Plus, Search, Edit2, Trash2, GripVertical, 
  CheckCircle, XCircle, Image as ImageIcon, 
  Save, X, ChevronRight, MoreHorizontal,
  LayoutGrid, List as ListIcon, Eye, EyeOff,
  Move, Palette, Type, FileText, ListChecks
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { getServices, saveServices } from '../api';

const GRADIENT_PRESETS = [
  { name: "Blue to Cyan", value: "from-blue-500 to-cyan-400" },
  { name: "Purple to Pink", value: "from-purple-500 to-pink-500" },
  { name: "Orange to Red", value: "from-orange-400 to-red-500" },
  { name: "Green to Emerald", value: "from-green-400 to-emerald-600" },
  { name: "Indigo to Purple", value: "from-indigo-500 to-purple-600" },
  { name: "Pink to Rose", value: "from-pink-500 to-rose-500" },
];

export default function ServiceManager() {
  const [services, setServices] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Drag and Drop state
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const initialFormState = {
    title: "",
    slug: "",
    icon: "",
    shortDescription: "",
    fullDescription: "",
    features: [""],
    gradient: GRADIENT_PRESETS[0].value,
    coverImage: "",
    status: "draft"
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    setServices(getServices());
  }, []);

  const updateAndSaveServices = (newServices) => {
    // Sort by order before saving
    const sortedServices = newServices.sort((a, b) => a.order - b.order);
    setServices(sortedServices);
    saveServices(sortedServices);
  };
  
  // Handlers
  const handleSort = () => {
    let _services = [...services];
    const draggedItemContent = _services.splice(dragItem.current, 1)[0];
    _services.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    
    // Update order index
    _services = _services.map((item, index) => ({ ...item, order: index }));
    updateAndSaveServices(_services);
    toast.success("Order updated successfully");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      updateAndSaveServices(services.filter(s => s.id !== id));
      toast.success("Service deleted");
    }
  };

  const handleToggleStatus = (id) => {
    const newServices = services.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'active' ? 'draft' : 'active';
        toast.success(`Service marked as ${newStatus}`);
        return { ...s, status: newStatus };
      }
      return s;
    });
    updateAndSaveServices(newServices);
  };

  const openEditModal = (service = null) => {
    if (service) {
      setFormData({ ...service });
      setCurrentService(service);
    } else {
      setFormData(initialFormState);
      setCurrentService(null);
    }
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let newServices;
    if (currentService) {
      // Update
      newServices = services.map(s => s.id === currentService.id ? { ...formData, id: currentService.id, order: s.order } : s);
      toast.success("Service updated");
    } else {
      // Create
      const newId = Math.max(...services.map(s => s.id), 0) + 1;
      newServices = [...services, { ...formData, id: newId, order: services.length }];
      toast.success("Service created");
    }
    updateAndSaveServices(newServices);
    setIsEditing(false);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, title, slug });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Services Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your service offerings, descriptions, and features.</p>
        </div>
        <button 
          onClick={() => openEditModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search services..." 
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
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
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

              {/* Image/Icon */}
              <div className={`relative ${viewMode === 'list' ? 'w-16 h-16 rounded-lg' : 'w-full h-48'} overflow-hidden bg-gray-100 flex-shrink-0`}>
                {service.coverImage ? (
                  <img src={service.coverImage} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${service.gradient} flex items-center justify-center text-3xl`}>
                    {service.icon}
                  </div>
                )}
                {/* Overlay Gradient for Grid */}
                {viewMode === 'grid' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                )}
                {/* Icon Badge for Grid */}
                {viewMode === 'grid' && (
                  <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-xl border border-white/30 text-white">
                    {service.icon}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 ${viewMode === 'grid' ? 'p-5' : ''}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{service.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1 mt-1">{service.shortDescription}</p>
                  </div>
                  {viewMode === 'list' && (
                    <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      service.status === 'active' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}>
                      {service.status === 'active' ? 'Active' : 'Draft'}
                    </div>
                  )}
                </div>
                
                {viewMode === 'grid' && (
                  <div className="mt-4 flex items-center justify-between">
                     <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      service.status === 'active' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}>
                      {service.status === 'active' ? 'Active' : 'Draft'}
                    </div>
                    <span className="text-xs text-gray-400">{service.features.length} features</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className={`flex items-center gap-2 ${viewMode === 'grid' ? 'px-5 pb-5 border-t border-gray-100 mt-4 pt-4' : ''}`}>
                <button 
                  onClick={() => handleToggleStatus(service.id)}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title={service.status === 'active' ? 'Deactivate' : 'Activate'}
                >
                  {service.status === 'active' ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button 
                  onClick={() => openEditModal(service)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(service.id)}
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
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800">
                  {currentService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <form id="serviceForm" onSubmit={handleSave} className="space-y-6">
                  
                  {/* Basic Info Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                        <input 
                          type="text" 
                          required
                          value={formData.title}
                          onChange={handleTitleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                          placeholder="e.g. Web Development"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (Auto-generated)</label>
                        <input 
                          type="text" 
                          readOnly
                          value={formData.slug}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji or Text)</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={formData.icon}
                            onChange={(e) => setFormData({...formData, icon: e.target.value})}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. 💻 or 'code'"
                          />
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-xl border border-gray-200">
                            {formData.icon || '?'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
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
                        <div className={`mt-2 h-8 w-full rounded-md bg-gradient-to-r ${formData.gradient}`}></div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={formData.coverImage}
                            onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="https://..."
                          />
                          <button type="button" className="p-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
                            <ImageIcon size={20} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                      <textarea 
                        rows={2}
                        value={formData.shortDescription}
                        onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                        placeholder="Brief summary for cards..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Description (Rich Text)</label>
                      <textarea 
                        rows={6}
                        value={formData.fullDescription}
                        onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono text-sm"
                        placeholder="Detailed description using Markdown..."
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features List</label>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="flex items-center justify-center w-8 h-10 bg-gray-50 text-gray-400 rounded-lg border border-gray-200 text-sm">
                            {index + 1}
                          </div>
                          <input 
                            type="text" 
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Feature description..."
                          />
                          <button 
                            type="button" 
                            onClick={() => removeFeature(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        onClick={addFeature}
                        className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-700 mt-2"
                      >
                        <Plus size={16} />
                        Add Feature
                      </button>
                    </div>
                  </div>

                  {/* Status */}
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
                      {formData.status === 'active' ? 'Active (Visible on site)' : 'Draft (Hidden)'}
                    </span>
                  </div>

                </form>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  form="serviceForm"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Service
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}