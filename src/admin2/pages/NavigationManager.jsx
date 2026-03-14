import { useState, useRef } from 'react';
import {
  Plus, Edit2, Trash2, GripVertical, Save, X, Eye, EyeOff,
  Menu, LayoutTemplate, Link as LinkIcon, ExternalLink,
  Facebook, Twitter, Instagram, Linkedin, Youtube, Github,
  Columns, Globe, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const INITIAL_NAV_LINKS = [
  { id: 1, name: 'Home', path: '/', type: 'link', visible: true, order: 0 },
  { id: 2, name: 'About', path: '/about', type: 'link', visible: true, order: 1 },
  { id: 3, name: 'Services', path: '/services', type: 'link', visible: true, order: 2 },
  { id: 4, name: 'Career', path: '/career', type: 'link', visible: true, order: 3 },
  { id: 5, name: 'Contact', path: '/contact', type: 'link', visible: true, order: 4 },
];

const INITIAL_CTA = {
  label: 'Get Started',
  path: '/contact',
  visible: true
};

const INITIAL_FOOTER_COLS = [
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 1, name: 'Services', path: '/services' },
      { id: 2, name: 'Careers', path: '/career' },
      { id: 3, name: 'Contact', path: '/contact' },
      { id: 4, name: 'About Us', path: '/about' },
    ]
  },
  {
    id: 'services',
    title: 'Services',
    links: [
      { id: 1, name: 'Web Development', path: '/services/web-development' },
      { id: 2, name: 'App Development', path: '/services/app-development' },
      { id: 3, name: 'Cybersecurity', path: '/services/cybersecurity' },
      { id: 4, name: 'Digital Marketing', path: '/services/digital-marketing' },
    ]
  },
  {
    id: 'resources',
    title: 'Resources',
    links: [
      { id: 1, name: 'Privacy Policy', path: '/privacy' },
      { id: 2, name: 'Terms of Service', path: '/terms' },
    ]
  }
];

const INITIAL_SOCIALS = [
  { id: 1, platform: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { id: 2, platform: 'Instagram', url: 'https://instagram.com', icon: Instagram },
  { id: 3, platform: 'Facebook', url: 'https://facebook.com', icon: Facebook },
];

export default function NavigationManager() {
  const [activeTab, setActiveTab] = useState('navbar');
  
  // Navbar State
  const [navLinks, setNavLinks] = useState(INITIAL_NAV_LINKS);
  const [ctaBtn, setCtaBtn] = useState(INITIAL_CTA);
  
  // Footer State
  const [footerCols, setFooterCols] = useState(INITIAL_FOOTER_COLS);
  const [socials, setSocials] = useState(INITIAL_SOCIALS);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null); // { type: 'nav'|'footerLink', parentId?, data }
  const [formData, setFormData] = useState({ name: '', path: '' });

  // Drag Refs
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // --- Navbar Handlers ---

  const handleNavSort = () => {
    let _navLinks = [...navLinks];
    const draggedItemContent = _navLinks.splice(dragItem.current, 1)[0];
    _navLinks.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    _navLinks = _navLinks.map((item, index) => ({ ...item, order: index }));
    setNavLinks(_navLinks);
    toast.success("Menu order updated");
  };

  const toggleNavVisibility = (id) => {
    setNavLinks(navLinks.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  const deleteNavLink = (id) => {
    if(window.confirm('Remove this menu item?')) {
      setNavLinks(navLinks.filter(l => l.id !== id));
      toast.success("Menu item removed");
    }
  };

  // --- Footer Handlers ---

  const addFooterLink = (colId) => {
    setEditItem({ type: 'footerLink', parentId: colId, data: null });
    setFormData({ name: '', path: '' });
    setIsEditing(true);
  };

  const deleteFooterLink = (colId, linkId) => {
    setFooterCols(footerCols.map(col => {
      if (col.id === colId) {
        return { ...col, links: col.links.filter(l => l.id !== linkId) };
      }
      return col;
    }));
    toast.success("Link removed");
  };

  // --- Common Edit Handlers ---

  const openEditModal = (type, data, parentId = null) => {
    setEditItem({ type, parentId, data });
    setFormData({ name: data?.name || '', path: data?.path || '' });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    if (editItem.type === 'nav') {
      if (editItem.data) {
        // Update existing nav
        setNavLinks(navLinks.map(l => l.id === editItem.data.id ? { ...l, ...formData } : l));
        toast.success("Menu item updated");
      } else {
        // Add new nav
        const newId = Math.max(...navLinks.map(l => l.id), 0) + 1;
        setNavLinks([...navLinks, { id: newId, ...formData, visible: true, order: navLinks.length, type: 'link' }]);
        toast.success("Menu item added");
      }
    } else if (editItem.type === 'footerLink') {
      setFooterCols(footerCols.map(col => {
        if (col.id === editItem.parentId) {
          if (editItem.data) {
            // Update existing footer link
            return {
              ...col,
              links: col.links.map(l => l.id === editItem.data.id ? { ...l, ...formData } : l)
            };
          } else {
            // Add new footer link
            const newId = Math.max(...col.links.map(l => l.id), 0) + 1;
            return {
              ...col,
              links: [...col.links, { id: newId, ...formData }]
            };
          }
        }
        return col;
      }));
      toast.success("Footer link saved");
    }

    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Navigation Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Control your website's main menu and footer links.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('navbar')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === 'navbar' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Menu size={18} />
          Navbar Menu
          {activeTab === 'navbar' && <motion.div layoutId="activeTabNav" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
        </button>
        <button
          onClick={() => setActiveTab('footer')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${activeTab === 'footer' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <LayoutTemplate size={18} />
          Footer Columns
          {activeTab === 'footer' && <motion.div layoutId="activeTabNav" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm min-h-[500px] p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'navbar' ? (
            <motion.div
              key="navbar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Navbar Links */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Main Menu Items</h3>
                  <button 
                    onClick={() => openEditModal('nav', null)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 text-sm font-medium"
                  >
                    <Plus size={16} /> Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <div 
                      key={link.id}
                      draggable
                      onDragStart={() => (dragItem.current = index)}
                      onDragEnter={() => (dragOverItem.current = index)}
                      onDragEnd={handleNavSort}
                      onDragOver={(e) => e.preventDefault()}
                      className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-200 rounded-lg group hover:shadow-sm transition-all"
                    >
                      <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                        <GripVertical size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{link.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <LinkIcon size={10} /> {link.path}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleNavVisibility(link.id)} className={`p-2 rounded-lg ${link.visible ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'}`}>
                          {link.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button onClick={() => openEditModal('nav', link)} className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => deleteNavLink(link.id)} className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button Config */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Call to Action Button</h3>
                <div className="flex items-center gap-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                  <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                    <ExternalLink size={24} />
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Button Label</label>
                      <input 
                        type="text" 
                        value={ctaBtn.label}
                        onChange={(e) => setCtaBtn({...ctaBtn, label: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Link URL</label>
                      <input 
                        type="text" 
                        value={ctaBtn.path}
                        onChange={(e) => setCtaBtn({...ctaBtn, path: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Visible</label>
                    <button 
                      onClick={() => setCtaBtn({...ctaBtn, visible: !ctaBtn.visible})}
                      className={`w-12 h-6 rounded-full p-1 transition-colors ${ctaBtn.visible ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${ctaBtn.visible ? 'translate-x-6' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="footer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Footer Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {footerCols.map(col => (
                  <div key={col.id} className="border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                      <div className="font-bold text-gray-700 flex items-center gap-2">
                        <Columns size={16} /> {col.title}
                      </div>
                      <button onClick={() => addFooterLink(col.id)} className="text-indigo-600 hover:text-indigo-800 text-xs font-medium flex items-center gap-1">
                        <Plus size={14} /> Add Link
                      </button>
                    </div>
                    <div className="p-2 space-y-1 flex-1 bg-white">
                      {col.links.map(link => (
                        <div key={link.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group">
                          <div className="text-sm text-gray-600">
                            <div className="font-medium">{link.name}</div>
                            <div className="text-xs text-gray-400">{link.path}</div>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEditModal('footerLink', link, col.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={14} /></button>
                            <button onClick={() => deleteFooterLink(col.id, link.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      ))}
                      {col.links.length === 0 && <div className="text-center py-4 text-gray-400 text-sm">No links</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Social Media Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {socials.map(social => (
                    <div key={social.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                        <social.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">{social.platform}</div>
                        <input 
                          type="text" 
                          value={social.url}
                          onChange={(e) => {
                            const newSocials = socials.map(s => s.id === social.id ? { ...s, url: e.target.value } : s);
                            setSocials(newSocials);
                          }}
                          className="w-full text-xs text-gray-500 bg-transparent border-none p-0 focus:ring-0 truncate"
                          placeholder="https://..."
                        />
                      </div>
                      <a href={social.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-600">
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
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
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-800">
                  {editItem.data ? 'Edit Link' : 'Add New Link'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full input-style"
                    placeholder="e.g. About Us"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination URL / Path</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      required
                      value={formData.path}
                      onChange={(e) => setFormData({...formData, path: e.target.value})}
                      className="w-full pl-9 pr-4 py-2 input-style"
                      placeholder="e.g. /about or https://..."
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium shadow-sm"
                  >
                    Save Link
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}