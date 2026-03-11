import { useState, useRef } from 'react';
import {
  Plus, Search, Edit2, Trash2, GripVertical, Star, Image as ImageIcon,
  Save, X, Eye, EyeOff, Link as LinkIcon, Tag, Layers, Zap, PlusCircle,
  BarChart2, ExternalLink, Briefcase, FolderKanban
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const MOCK_PORTFOLIO = [
  {
    id: 1,
    title: "E-commerce Platform",
    client: "Fashionista Inc.",
    categories: ["Web", "E-commerce"],
    thumbnail: "https://images.unsplash.com/photo-1522199755839-a28e8e540b7d?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1522199755839-a28e8e540b7d?auto=format&fit=crop&w=800&q=80"],
    shortDescription: "A modern e-commerce site with a custom CMS and integrated payment gateway.",
    fullCaseStudy: "Full case study text goes here. It supports markdown.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    metrics: [
      { key: "Conversion Rate", value: "+25%" },
      { key: "Page Load Time", value: "-40%" }
    ],
    liveUrl: "https://example.com",
    status: "published",
    featured: true,
    order: 0
  },
  {
    id: 2,
    title: "Mobile Banking App",
    client: "FinSecure",
    categories: ["App", "Fintech"],
    thumbnail: "https://images.unsplash.com/photo-1556742218-6b2b89e2b4a4?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    shortDescription: "Secure and intuitive mobile banking application for iOS and Android.",
    fullCaseStudy: "Detailed analysis of the project.",
    technologies: ["Flutter", "Firebase", "Biometric Auth"],
    metrics: [{ key: "User Adoption", value: "100k in 3 months" }],
    liveUrl: "",
    status: "published",
    featured: false,
    order: 1
  },
  {
    id: 3,
    title: "SEO Overhaul",
    client: "Legal Eagles",
    categories: ["SEO", "Marketing"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    shortDescription: "Comprehensive SEO strategy that doubled organic traffic.",
    fullCaseStudy: "From keyword research to technical SEO.",
    technologies: ["Ahrefs", "SEMrush", "Google Analytics"],
    metrics: [{ key: "Organic Traffic", value: "+120%" }],
    liveUrl: "https://example.com",
    status: "draft",
    featured: false,
    order: 2
  }
];

const ALL_CATEGORIES = ["Web", "App", "SEO", "E-commerce", "Fintech", "Marketing", "UI/UX"];

const initialFormState = {
  title: "",
  client: "",
  categories: [],
  thumbnail: "",
  gallery: [""],
  shortDescription: "",
  fullCaseStudy: "",
  technologies: [""],
  metrics: [{ key: "", value: "" }],
  liveUrl: "",
  status: "draft",
  featured: false,
};

export default function PortfolioManager() {
  const [projects, setProjects] = useState(MOCK_PORTFOLIO);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const [formData, setFormData] = useState(initialFormState);

  const handleSort = () => {
    let _projects = [...projects];
    const draggedItemContent = _projects.splice(dragItem.current, 1)[0];
    _projects.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    _projects = _projects.map((item, index) => ({ ...item, order: index }));
    setProjects(_projects);
    toast.success("Order updated");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this project? This cannot be undone.")) {
      setProjects(projects.filter(p => p.id !== id));
      toast.success("Project deleted");
    }
  };

  const handleToggleFeatured = (id) => {
    setProjects(projects.map(p => {
      if (p.id === id) {
        toast.success(p.featured ? "Removed from featured" : "Added to featured");
        return { ...p, featured: !p.featured };
      }
      return p;
    }));
  };

  const openEditModal = (project = null) => {
    if (project) {
      setFormData({
        ...initialFormState,
        ...project,
        gallery: project.gallery.length > 0 ? project.gallery : [""],
        technologies: project.technologies.length > 0 ? project.technologies : [""],
        metrics: project.metrics.length > 0 ? project.metrics : [{ key: "", value: "" }],
      });
      setCurrentProject(project);
    } else {
      setFormData(initialFormState);
      setCurrentProject(null);
    }
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      gallery: formData.gallery.filter(url => url.trim() !== ''),
      technologies: formData.technologies.filter(tech => tech.trim() !== ''),
      metrics: formData.metrics.filter(m => m.key.trim() !== '' && m.value.trim() !== ''),
    };

    if (currentProject) {
      setProjects(projects.map(p => p.id === currentProject.id ? { ...finalData, id: currentProject.id } : p));
      toast.success("Project updated");
    } else {
      const newId = Math.max(...projects.map(p => p.id), 0) + 1;
      setProjects([...projects, { ...finalData, id: newId, order: projects.length }]);
      toast.success("Project created");
    }
    setIsEditing(false);
  };

  const handleArrayChange = (field, index, value) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const addArrayItem = (field, item) => {
    setFormData({ ...formData, [field]: [...formData[field], item] });
  };

  const removeArrayItem = (field, index) => {
    const newArr = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArr });
  };

  const handleMetricChange = (index, keyOrValue, value) => {
    const newMetrics = [...formData.metrics];
    newMetrics[index][keyOrValue] = value;
    setFormData({ ...formData, metrics: newMetrics });
  };

  const handleCategoryToggle = (category) => {
    const newCategories = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category];
    setFormData({ ...formData, categories: newCategories });
  };

  const filteredProjects = projects
    .filter(p => categoryFilter === 'all' || p.categories.includes(categoryFilter))
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Portfolio Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your case studies and project showcases.</p>
        </div>
        <button onClick={() => openEditModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
        </div>
        <div className="relative w-full sm:w-56">
          <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
            <option value="all">All Categories</option>
            {ALL_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              draggable
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden group flex flex-col"
            >
              <div className="relative">
                <div className="absolute top-2 right-2 z-10 flex gap-2">
                  <button onClick={() => handleToggleFeatured(project.id)} className={`p-2 rounded-full transition-colors ${project.featured ? 'bg-yellow-400 text-white hover:bg-yellow-500' : 'bg-white/50 backdrop-blur-sm text-gray-600 hover:bg-white'}`} title={project.featured ? "Featured" : "Mark as featured"}>
                    <Star size={16} />
                  </button>
                </div>
                <img src={project.thumbnail} alt={project.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="font-bold text-white text-lg">{project.title}</h3>
                  <p className="text-sm text-gray-200 flex items-center gap-1.5"><Briefcase size={14} /> {project.client}</p>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.categories.map(cat => <span key={cat} className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">{cat}</span>)}
                </div>
                <p className="text-sm text-gray-600 flex-1">{project.shortDescription}</p>
                <div className={`mt-4 px-2.5 py-1 rounded-full text-xs font-medium border self-start ${project.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  {project.status}
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500">
                  <GripVertical size={20} />
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEditModal(project)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={18} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800">{currentProject ? 'Edit Project' : 'Add New Project'}</h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="portfolioForm" onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                        <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full input-style" placeholder="e.g. Corporate Website Redesign" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                        <input type="text" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} className="w-full input-style" placeholder="e.g. Acme Corporation" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                        <input type="url" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} className="w-full input-style" placeholder="https://example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image URL</label>
                        <input type="text" required value={formData.thumbnail} onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} className="w-full input-style" placeholder="https://.../image.jpg" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {ALL_CATEGORIES.map(cat => (
                        <button type="button" key={cat} onClick={() => handleCategoryToggle(cat)} className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${formData.categories.includes(cat) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                      <textarea rows={2} value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full input-style resize-none" placeholder="A brief summary for cards..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Case Study (Markdown supported)</label>
                      <textarea rows={6} value={formData.fullCaseStudy} onChange={(e) => setFormData({ ...formData, fullCaseStudy: e.target.value })} className="w-full input-style font-mono text-sm" placeholder="## The Challenge..." />
                    </div>
                  </div>

                  {/* Repeatable Fields */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
                      {formData.gallery.map((url, index) => (
                        <div key={index} className="flex gap-2">
                          <input type="text" value={url} onChange={(e) => handleArrayChange('gallery', index, e.target.value)} className="flex-1 input-style" placeholder="Image URL..." />
                          <button type="button" onClick={() => removeArrayItem('gallery', index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addArrayItem('gallery', '')} className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-700 mt-2"><PlusCircle size={16} /> Add Image</button>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Technologies Used</label>
                      {formData.technologies.map((tech, index) => (
                        <div key={index} className="flex gap-2">
                          <input type="text" value={tech} onChange={(e) => handleArrayChange('technologies', index, e.target.value)} className="flex-1 input-style" placeholder="e.g. React" />
                          <button type="button" onClick={() => removeArrayItem('technologies', index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addArrayItem('technologies', '')} className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-700 mt-2"><PlusCircle size={16} /> Add Technology</button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Results / Metrics</label>
                    {formData.metrics.map((metric, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input type="text" value={metric.key} onChange={(e) => handleMetricChange(index, 'key', e.target.value)} className="flex-1 input-style" placeholder="Metric Name (e.g. ROI)" />
                        <input type="text" value={metric.value} onChange={(e) => handleMetricChange(index, 'value', e.target.value)} className="flex-1 input-style" placeholder="Value (e.g. +200%)" />
                        <button type="button" onClick={() => removeArrayItem('metrics', index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('metrics', { key: '', value: '' })} className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-700 mt-2"><PlusCircle size={16} /> Add Metric</button>
                  </div>

                  {/* Status & Featured Toggles */}
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 flex-1">
                      <span className="text-sm font-medium text-gray-700">Status:</span>
                      <button type="button" onClick={() => setFormData({ ...formData, status: formData.status === 'published' ? 'draft' : 'published' })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${formData.status === 'published' ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.status === 'published' ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className={`text-sm font-medium ${formData.status === 'published' ? 'text-green-600' : 'text-gray-500'}`}>{formData.status === 'published' ? 'Published' : 'Draft'}</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 flex-1">
                      <span className="text-sm font-medium text-gray-700">Featured:</span>
                      <button type="button" onClick={() => setFormData({ ...formData, featured: !formData.featured })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${formData.featured ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.featured ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className={`text-sm font-medium ${formData.featured ? 'text-yellow-600' : 'text-gray-500'}`}>{formData.featured ? 'Featured on Homepage' : 'Not Featured'}</span>
                    </div>
                  </div>

                </form>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancel</button>
                <button type="submit" form="portfolioForm" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm flex items-center gap-2"><Save size={18} /> Save Project</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}