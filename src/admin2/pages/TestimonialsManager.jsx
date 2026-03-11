import { useState, useRef } from 'react';
import {
  Plus, Search, Edit2, Trash2, GripVertical, Star,
  Save, X, CheckCircle, ThumbsUp, ThumbsDown, XCircle, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const MOCK_TESTIMONIALS = [
  {
    id: 1,
    clientName: "Jane Doe",
    company: "TechCorp",
    designation: "CEO",
    rating: 5,
    review: "Infotattva's team delivered an outstanding product. Their expertise and dedication are unmatched. Highly recommended!",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    status: "approved",
    featured: true,
    order: 0
  },
  {
    id: 2,
    clientName: "John Smith",
    company: "Innovate LLC",
    designation: "Marketing Director",
    rating: 4,
    review: "A great experience working with them. They are professional, responsive, and delivered on time. We saw a significant boost in our metrics.",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    status: "approved",
    featured: false,
    order: 1
  },
  {
    id: 3,
    clientName: "Emily White",
    company: "Solutions Co.",
    designation: "Project Manager",
    rating: 5,
    review: "The project was handled with extreme professionalism. I was impressed by their communication and the quality of the final product.",
    photo: "",
    status: "pending",
    featured: false,
    order: 2
  }
];

const StarRating = ({ rating, setRating, readOnly = false }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          whileHover={!readOnly ? { scale: 1.2, y: -2 } : {}}
          whileTap={!readOnly ? { scale: 0.9 } : {}}
          onClick={() => !readOnly && setRating(star)}
          className={`${readOnly ? '' : 'cursor-pointer'}`}
        >
          <Star
            size={24}
            className={`transition-colors ${
              rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

const initialFormState = {
  clientName: "",
  company: "",
  designation: "",
  rating: 5,
  review: "",
  photo: "",
  status: "pending",
  featured: false,
};

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState(MOCK_TESTIMONIALS);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const [formData, setFormData] = useState(initialFormState);

  const handleSort = () => {
    let _testimonials = [...testimonials];
    const draggedItemContent = _testimonials.splice(dragItem.current, 1)[0];
    _testimonials.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    _testimonials = _testimonials.map((item, index) => ({ ...item, order: index }));
    setTestimonials(_testimonials);
    toast.success("Order updated");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this testimonial?")) {
      setTestimonials(testimonials.filter(t => t.id !== id));
      toast.success("Testimonial deleted");
    }
  };

  const handleToggleFeatured = (id) => {
    setTestimonials(testimonials.map(t => {
      if (t.id === id) {
        toast.success(t.featured ? "Removed from featured" : "Added to featured");
        return { ...t, featured: !t.featured };
      }
      return t;
    }));
  };

  const handleStatusChange = (id, newStatus) => {
    setTestimonials(testimonials.map(t => {
      if (t.id === id) {
        toast.success(`Status changed to ${newStatus}`);
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  const openEditModal = (testimonial = null) => {
    if (testimonial) {
      setFormData({ ...testimonial });
      setCurrentTestimonial(testimonial);
    } else {
      setFormData(initialFormState);
      setCurrentTestimonial(null);
    }
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentTestimonial) {
      setTestimonials(testimonials.map(t => t.id === currentTestimonial.id ? { ...formData, id: currentTestimonial.id } : t));
      toast.success("Testimonial updated");
    } else {
      const newId = Math.max(...testimonials.map(t => t.id), 0) + 1;
      setTestimonials([...testimonials, { ...formData, id: newId, order: testimonials.length }]);
      toast.success("Testimonial added");
    }
    setIsEditing(false);
  };

  const filteredTestimonials = testimonials.filter(t =>
    t.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusProps = (status) => {
    switch (status) {
      case 'approved':
        return { icon: CheckCircle, color: 'bg-green-50 text-green-700 border-green-200' };
      case 'pending':
        return { icon: Clock, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
      case 'hidden':
        return { icon: XCircle, color: 'bg-red-50 text-red-700 border-red-200' };
      default:
        return { icon: Clock, color: 'bg-gray-50 text-gray-600 border-gray-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Testimonials Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Manage client reviews and ratings.</p>
        </div>
        <button onClick={() => openEditModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search by client or company..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
        </div>
      </div>

      {/* Content List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTestimonials.map((testimonial, index) => {
            const statusProps = getStatusProps(testimonial.status);
            return (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                draggable
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                className="bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow group flex items-start p-4 gap-4"
              >
                <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 pt-1">
                  <GripVertical size={20} />
                </div>

                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  {testimonial.photo ? (
                    <img src={testimonial.photo} alt={testimonial.clientName} className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      {testimonial.clientName.charAt(0)}
                    </div>
                  )}
                  {testimonial.featured && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white" title="Featured">
                      <Star size={14} className="text-white fill-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{testimonial.clientName}</h3>
                      <p className="text-sm text-gray-500">{testimonial.designation}, {testimonial.company}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusProps.color}`}>
                      <statusProps.icon size={14} />
                      {testimonial.status}
                    </div>
                  </div>
                  <StarRating rating={testimonial.rating} readOnly={true} />
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2 italic">"{testimonial.review}"</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleStatusChange(testimonial.id, 'approved')} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve"><ThumbsUp size={16} /></button>
                    <button onClick={() => handleStatusChange(testimonial.id, 'hidden')} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hide"><ThumbsDown size={16} /></button>
                    <button onClick={() => handleToggleFeatured(testimonial.id)} className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors" title="Toggle Featured"><Star size={16} /></button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEditModal(testimonial)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(testimonial.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800">{currentTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="testimonialForm" onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                      <input type="text" required value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} className="w-full input-style" placeholder="e.g. Jane Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full input-style" placeholder="e.g. TechCorp" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                      <input type="text" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="w-full input-style" placeholder="e.g. CEO" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Client Photo URL</label>
                      <input type="text" value={formData.photo} onChange={(e) => setFormData({ ...formData, photo: e.target.value })} className="w-full input-style" placeholder="https://..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
                    <textarea rows={4} required value={formData.review} onChange={(e) => setFormData({ ...formData, review: e.target.value })} className="w-full input-style resize-none" placeholder="Write the client's review here..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Star Rating</label>
                      <StarRating rating={formData.rating} setRating={(r) => setFormData({ ...formData, rating: r })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full input-style">
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="hidden">Hidden</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Featured on Homepage:</span>
                    <button type="button" onClick={() => setFormData({ ...formData, featured: !formData.featured })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${formData.featured ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.featured ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className={`text-sm font-medium ${formData.featured ? 'text-yellow-600' : 'text-gray-500'}`}>{formData.featured ? 'Yes' : 'No'}</span>
                  </div>
                </form>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancel</button>
                <button type="submit" form="testimonialForm" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm flex items-center gap-2"><Save size={18} /> Save Testimonial</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}