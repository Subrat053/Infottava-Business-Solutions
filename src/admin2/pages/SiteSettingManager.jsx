import { useState } from 'react';
import {
  Save, Globe, Share2, MapPin, Shield,
  Server, Upload, Facebook, Instagram, Linkedin, Youtube, Twitter, Github,
  Building, Phone, Mail, Clock, ToggleLeft, ToggleRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function SiteSettingManager() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    company: {
      name: "Infottava Business Solutions",
      tagline: "Transforming businesses through innovative digital solutions.",
      registration: "U62099OD2026OPC052146",
      gst: "21AAICI6330E1Z1",
      logoLight: "",
      logoDark: "",
      favicon: ""
    },
    contact: {
      phone: "+91 9114956222",
      email: "contact@infotattvabusinesssolutions.com",
      supportEmail: "support@infotattva.com",
      whatsapp: "+91 9114956222",
      address: "1010, 4th Floor Rasulgarh, Bhubaneswar, India",
      mapEmbed: '<iframe src="..." ...></iframe>'
    },
    social: {
      linkedin: "https://linkedin.com/company/infotattva",
      instagram: "https://instagram.com/infotattva",
      facebook: "https://facebook.com/infotattva",
      youtube: "",
      twitter: "",
      github: ""
    },
    hours: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    },
    integrations: {
      googleAnalytics: "UA-XXXXXXXXX-X",
      facebookPixel: "",
      smtpHost: "smtp.gmail.com",
      smtpPort: "587",
      smtpUser: "admin@infotattva.com"
    },
    advanced: {
      maintenanceMode: false,
      cookieBanner: true,
      cookieText: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies."
    }
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!");
    }, 1000);
  };

  const updateSetting = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'general', label: 'General Info', icon: Building },
    { id: 'contact', label: 'Contact & Location', icon: MapPin },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'integrations', label: 'Integrations', icon: Server },
    { id: 'advanced', label: 'Advanced', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Site Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage global configuration, contact info, and integrations.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                  activeTab === tab.id 
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50 border-transparent'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
          >
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Company Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input 
                      type="text" 
                      value={settings.company.name}
                      onChange={(e) => updateSetting('company', 'name', e.target.value)}
                      className="w-full input-style"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                    <input 
                      type="text" 
                      value={settings.company.tagline}
                      onChange={(e) => updateSetting('company', 'tagline', e.target.value)}
                      className="w-full input-style"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Registration No. (CIN)</label>
                    <input 
                      type="text" 
                      value={settings.company.registration}
                      onChange={(e) => updateSetting('company', 'registration', e.target.value)}
                      className="w-full input-style"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                    <input 
                      type="text" 
                      value={settings.company.gst}
                      onChange={(e) => updateSetting('company', 'gst', e.target.value)}
                      className="w-full input-style"
                    />
                  </div>
                </div>

                <h3 className="text-md font-semibold text-gray-800 mt-8 mb-4">Branding</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Logo (Light)', 'Logo (Dark)', 'Favicon'].map((label, idx) => (
                    <div key={idx} className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                      <Upload className="text-gray-400 mb-2" size={24} />
                      <span className="text-sm font-medium text-gray-600">{label}</span>
                      <span className="text-xs text-gray-400 mt-1">Click to upload</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Contact Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="text" value={settings.contact.phone} onChange={(e) => updateSetting('contact', 'phone', e.target.value)} className="w-full pl-10 pr-4 py-2 input-style" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={18} />
                      <input type="text" value={settings.contact.whatsapp} onChange={(e) => updateSetting('contact', 'whatsapp', e.target.value)} className="w-full pl-10 pr-4 py-2 input-style" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Public Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="email" value={settings.contact.email} onChange={(e) => updateSetting('contact', 'email', e.target.value)} className="w-full pl-10 pr-4 py-2 input-style" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="email" value={settings.contact.supportEmail} onChange={(e) => updateSetting('contact', 'supportEmail', e.target.value)} className="w-full pl-10 pr-4 py-2 input-style" />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                  <textarea rows={3} value={settings.contact.address} onChange={(e) => updateSetting('contact', 'address', e.target.value)} className="w-full input-style resize-none" />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed Code</label>
                  <textarea rows={3} value={settings.contact.mapEmbed} onChange={(e) => updateSetting('contact', 'mapEmbed', e.target.value)} className="w-full input-style font-mono text-xs text-gray-600" placeholder="<iframe src=...>" />
                </div>

                <h3 className="text-md font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2"><Clock size={18}/> Business Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Mon - Fri</label>
                    <input type="text" value={settings.hours.weekdays} onChange={(e) => updateSetting('hours', 'weekdays', e.target.value)} className="w-full input-style" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Saturday</label>
                    <input type="text" value={settings.hours.saturday} onChange={(e) => updateSetting('hours', 'saturday', e.target.value)} className="w-full input-style" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Sunday</label>
                    <input type="text" value={settings.hours.sunday} onChange={(e) => updateSetting('hours', 'sunday', e.target.value)} className="w-full input-style" />
                  </div>
                </div>
              </div>
            )}

            {/* Social Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Social Media Links</h2>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { key: 'linkedin', icon: Linkedin, color: 'text-blue-700' },
                    { key: 'facebook', icon: Facebook, color: 'text-blue-600' },
                    { key: 'instagram', icon: Instagram, color: 'text-pink-600' },
                    { key: 'twitter', icon: Twitter, color: 'text-sky-500' },
                    { key: 'youtube', icon: Youtube, color: 'text-red-600' },
                    { key: 'github', icon: Github, color: 'text-gray-800' },
                  ].map((social) => (
                    <div key={social.key} className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center ${social.color}`}>
                        <social.icon size={20} />
                      </div>
                      <input 
                        type="url" 
                        placeholder={`https://${social.key}.com/...`}
                        value={settings.social[social.key]}
                        onChange={(e) => updateSetting('social', social.key, e.target.value)}
                        className="flex-1 input-style"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Third-Party Integrations</h2>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Google Analytics ID</label>
                      <input type="text" value={settings.integrations.googleAnalytics} onChange={(e) => updateSetting('integrations', 'googleAnalytics', e.target.value)} className="w-full input-style" placeholder="UA-XXXXXXXXX-X" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Pixel ID</label>
                      <input type="text" value={settings.integrations.facebookPixel} onChange={(e) => updateSetting('integrations', 'facebookPixel', e.target.value)} className="w-full input-style" placeholder="1234567890" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">SMTP Configuration (Email)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                      <input type="text" value={settings.integrations.smtpHost} onChange={(e) => updateSetting('integrations', 'smtpHost', e.target.value)} className="w-full input-style" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
                      <input type="text" value={settings.integrations.smtpPort} onChange={(e) => updateSetting('integrations', 'smtpPort', e.target.value)} className="w-full input-style" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP User</label>
                      <input type="text" value={settings.integrations.smtpUser} onChange={(e) => updateSetting('integrations', 'smtpUser', e.target.value)} className="w-full input-style" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Password</label>
                      <input type="password" placeholder="••••••••" className="w-full input-style" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Advanced Settings</h2>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    <h3 className="font-semibold text-gray-800">Maintenance Mode</h3>
                    <p className="text-sm text-gray-500">Enable this to show a "Under Maintenance" page to visitors.</p>
                  </div>
                  <button 
                    onClick={() => updateSetting('advanced', 'maintenanceMode', !settings.advanced.maintenanceMode)}
                    className={`transition-colors ${settings.advanced.maintenanceMode ? 'text-indigo-600' : 'text-gray-400'}`}
                  >
                    {settings.advanced.maintenanceMode ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">Cookie Consent Banner</h3>
                      <p className="text-sm text-gray-500">Show a cookie consent popup to new visitors.</p>
                    </div>
                    <button 
                      onClick={() => updateSetting('advanced', 'cookieBanner', !settings.advanced.cookieBanner)}
                      className={`transition-colors ${settings.advanced.cookieBanner ? 'text-indigo-600' : 'text-gray-400'}`}
                    >
                      {settings.advanced.cookieBanner ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                    </button>
                  </div>
                  {settings.advanced.cookieBanner && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Banner Text</label>
                      <textarea 
                        rows={2} 
                        value={settings.advanced.cookieText} 
                        onChange={(e) => updateSetting('advanced', 'cookieText', e.target.value)} 
                        className="w-full input-style resize-none bg-white" 
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}