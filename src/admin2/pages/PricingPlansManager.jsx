import { useState } from 'react';
import {
  Plus, Edit2, Trash2, Save, X, Check, Star, ToggleLeft, ToggleRight, PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const MOCK_PLANS = [
  {
    id: 1,
    planName: "Starter",
    price: 29,
    billingCycle: "monthly",
    shortDescription: "For individuals and small teams getting started.",
    features: [
      { text: "10 Projects", available: true },
      { text: "5 GB Storage", available: true },
      { text: "Basic Analytics", available: true },
      { text: "Email Support", available: true },
      { text: "24/7 Support", available: false },
      { text: "Dedicated Account Manager", available: false },
    ],
    ctaLabel: "Choose Starter",
    ctaLink: "#",
    highlighted: false,
    status: "active",
  },
  {
    id: 2,
    planName: "Pro",
    price: 99,
    billingCycle: "monthly",
    shortDescription: "For growing businesses that need more power.",
    features: [
      { text: "Unlimited Projects", available: true },
      { text: "50 GB Storage", available: true },
      { text: "Advanced Analytics", available: true },
      { text: "Priority Email Support", available: true },
      { text: "24/7 Support", available: true },
      { text: "Dedicated Account Manager", available: false },
    ],
    ctaLabel: "Choose Pro",
    ctaLink: "#",
    highlighted: true,
    status: "active",
  },
  {
    id: 3,
    planName: "Enterprise",
    price: 499,
    billingCycle: "monthly",
    shortDescription: "For large organizations with custom needs.",
    features: [
      { text: "Unlimited Projects", available: true },
      { text: "Unlimited Storage", available: true },
      { text: "Advanced Analytics & Reporting", available: true },
      { text: "Phone & Email Support", available: true },
      { text: "24/7 Support", available: true },
      { text: "Dedicated Account Manager", available: true },
    ],
    ctaLabel: "Contact Us",
    ctaLink: "/contact",
    highlighted: false,
    status: "active",
  },
];

const initialFormState = {
  planName: "",
  price: 0,
  billingCycle: "monthly",
  shortDescription: "",
  features: [{ text: "", available: true }],
  ctaLabel: "",
  ctaLink: "#",
  highlighted: false,
  status: "active",
};

export default function PricingPlansManager() {
  const [plans, setPlans] = useState(MOCK_PLANS);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [isSectionEnabled, setIsSectionEnabled] = useState(true);

  const handleDelete = (id) => {
    if (window.confirm("Delete this pricing plan?")) {
      setPlans(plans.filter(p => p.id !== id));
      toast.success("Plan deleted");
    }
  };

  const openEditModal = (plan = null) => {
    if (plan) {
      setFormData({ 
        ...plan,
        features: plan.features.length > 0 ? plan.features : [{ text: "", available: true }]
      });
      setCurrentPlan(plan);
    } else {
      setFormData(initialFormState);
      setCurrentPlan(null);
    }
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const finalData = {
        ...formData,
        features: formData.features.filter(f => f.text.trim() !== '')
    };

    if (currentPlan) {
      setPlans(plans.map(p => p.id === currentPlan.id ? { ...finalData, id: currentPlan.id } : p));
      toast.success("Plan updated");
    } else {
      const newId = Math.max(...plans.map(p => p.id), 0) + 1;
      setPlans([...plans, { ...finalData, id: newId }]);
      toast.success("Plan added");
    }
    setIsEditing(false);
  };

  const handleFeatureChange = (index, key, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index][key] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, { text: "", available: true }] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pricing Plans Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your pricing tiers and features.</p>
        </div>
        <button onClick={() => openEditModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>Add New Plan</span>
        </button>
      </div>

      {/* Master Toggle */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isSectionEnabled ? <ToggleRight size={24} className="text-green-500" /> : <ToggleLeft size={24} className="text-gray-400" />}
          <div>
            <h3 className="font-semibold text-gray-800">Pricing Section Status</h3>
            <p className="text-sm text-gray-500">
              {isSectionEnabled ? "The pricing section is currently visible on your website." : "The pricing section is hidden from your website."}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsSectionEnabled(!isSectionEnabled);
            toast.success(`Pricing section ${!isSectionEnabled ? 'enabled' : 'disabled'}`);
          }}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${isSectionEnabled ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
        >
          {isSectionEnabled ? 'Disable Section' : 'Enable Section'}
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white rounded-2xl shadow-lg border flex flex-col ${plan.highlighted ? 'border-indigo-500 border-2 relative' : 'border-gray-200'}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">Most Popular</div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 text-center">{plan.planName}</h3>
                <p className="text-sm text-gray-500 text-center mt-2">{plan.shortDescription}</p>
                <div className="my-6 text-center">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/{plan.billingCycle}</span>
                </div>
                <button className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors ${plan.highlighted ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}>
                  {plan.ctaLabel}
                </button>
              </div>

              <div className="p-6 flex-1 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-600 mb-4">FEATURES</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      {feature.available ? (
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                      )}
                      <span className={!feature.available ? 'text-gray-400 line-through' : 'text-gray-700'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-b-2xl">
                <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${plan.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  {plan.status === 'active' ? 'Active' : 'Hidden'}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEditModal(plan)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(plan.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
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
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800">{currentPlan ? 'Edit Plan' : 'Add New Plan'}</h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="planForm" onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                      <input type="text" required value={formData.planName} onChange={(e) => setFormData({ ...formData, planName: e.target.value })} className="w-full input-style" placeholder="e.g. Starter" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} className="w-full input-style" placeholder="e.g. 29" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cycle</label>
                        <select value={formData.billingCycle} onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })} className="w-full input-style">
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                    <textarea rows={2} value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full input-style resize-none" placeholder="Brief summary of the plan..." />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <button type="button" onClick={() => handleFeatureChange(index, 'available', !feature.available)} className={`p-2 rounded-lg transition-colors ${feature.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {feature.available ? <Check size={16} /> : <X size={16} />}
                          </button>
                          <input type="text" value={feature.text} onChange={(e) => handleFeatureChange(index, 'text', e.target.value)} className="flex-1 input-style" placeholder="Feature description..." />
                          <button type="button" onClick={() => removeFeature(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                        </div>
                      ))}
                      <button type="button" onClick={addFeature} className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:text-indigo-700 mt-2"><PlusCircle size={16} /> Add Feature</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Label</label>
                      <input type="text" value={formData.ctaLabel} onChange={(e) => setFormData({ ...formData, ctaLabel: e.target.value })} className="w-full input-style" placeholder="e.g. Choose Plan" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Link</label>
                      <input type="text" value={formData.ctaLink} onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })} className="w-full input-style" placeholder="#" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 flex-1">
                      <span className="text-sm font-medium text-gray-700">Status:</span>
                      <button type="button" onClick={() => setFormData({ ...formData, status: formData.status === 'active' ? 'hidden' : 'active' })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.status === 'active' ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className={`text-sm font-medium ${formData.status === 'active' ? 'text-green-600' : 'text-gray-500'}`}>{formData.status === 'active' ? 'Active' : 'Hidden'}</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 flex-1">
                      <span className="text-sm font-medium text-gray-700">Highlighted:</span>
                      <button type="button" onClick={() => setFormData({ ...formData, highlighted: !formData.highlighted })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.highlighted ? 'bg-indigo-500' : 'bg-gray-300'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.highlighted ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className={`text-sm font-medium ${formData.highlighted ? 'text-indigo-600' : 'text-gray-500'}`}>{formData.highlighted ? 'Yes' : 'No'}</span>
                    </div>
                  </div>

                </form>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" form="planForm" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm flex items-center gap-2"><Save size={18} /> Save Plan</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}