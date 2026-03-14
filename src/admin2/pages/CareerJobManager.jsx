import { useState } from 'react';
import {
  Plus, Search, Edit2, Trash2, Save, X, Briefcase, MapPin, Clock,
  DollarSign, Calendar, Users, FileText, Download, ChevronDown,
  CheckCircle, XCircle, AlertCircle, MessageSquare, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const MOCK_JOBS = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote / Hybrid",
    experience: "5+ years",
    salary: "$80k - $120k",
    description: "We are looking for an experienced Full Stack Developer to join our core team.",
    responsibilities: ["Architect scalable solutions", "Lead code reviews", "Mentor junior devs"],
    requirements: ["React & Node.js expert", "AWS experience", "System design skills"],
    deadline: "2024-12-31",
    status: "open"
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    location: "On-site",
    experience: "3+ years",
    salary: "$60k - $90k",
    description: "Create intuitive and beautiful user experiences for our products.",
    responsibilities: ["Create wireframes & prototypes", "Conduct user research", "Collaborate with devs"],
    requirements: ["Figma mastery", "Portfolio required", "Understanding of HTML/CSS"],
    deadline: "2024-11-30",
    status: "closed"
  }
];

const MOCK_APPLICATIONS = [
  {
    id: 101,
    jobId: 1,
    applicantName: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    resume: "john_resume.pdf",
    status: "new",
    appliedDate: "2024-10-15",
    notes: ""
  },
  {
    id: 102,
    jobId: 1,
    applicantName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 987 654 321",
    resume: "jane_cv.pdf",
    status: "interview",
    appliedDate: "2024-10-14",
    notes: "Strong technical skills, scheduled technical round."
  }
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Remote", "Internship"];
const APP_STATUSES = ["new", "shortlisted", "interview", "rejected", "hired"];

const initialJobState = {
  title: "",
  department: "",
  type: "Full-time",
  location: "",
  experience: "",
  salary: "",
  description: "",
  responsibilities: [""],
  requirements: [""],
  deadline: "",
  status: "draft"
};

export default function CareerJobManager() {
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'applications'
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [formData, setFormData] = useState(initialJobState);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Job Handlers ---

  const openJobModal = (job = null) => {
    if (job) {
      setFormData({ ...job });
      setCurrentJob(job);
    } else {
      setFormData(initialJobState);
      setCurrentJob(null);
    }
    setIsEditing(true);
  };

  const handleSaveJob = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      responsibilities: formData.responsibilities.filter(r => r.trim() !== ''),
      requirements: formData.requirements.filter(r => r.trim() !== '')
    };

    if (currentJob) {
      setJobs(jobs.map(j => j.id === currentJob.id ? { ...finalData, id: currentJob.id } : j));
      toast.success("Job updated");
    } else {
      const newId = Math.max(...jobs.map(j => j.id), 0) + 1;
      setJobs([...jobs, { ...finalData, id: newId }]);
      toast.success("Job posted");
    }
    setIsEditing(false);
  };

  const handleDeleteJob = (id) => {
    if (window.confirm("Delete this job posting?")) {
      setJobs(jobs.filter(j => j.id !== id));
      toast.success("Job deleted");
    }
  };

  const handleArrayChange = (field, index, value) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field, index) => {
    const newArr = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArr });
  };

  // --- Application Handlers ---

  const handleStatusChange = (appId, newStatus) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleNoteChange = (appId, note) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, notes: note } : app
    ));
  };

  const exportCSV = () => {
    const headers = ["ID", "Applicant Name", "Email", "Phone", "Job Title", "Status", "Applied Date", "Notes"];
    const rows = applications.map(app => [
      app.id,
      `"${app.applicantName}"`,
      app.email,
      app.phone,
      `"${jobs.find(j => j.id === app.jobId)?.title || 'Unknown'}"`,
      app.status,
      app.appliedDate,
      `"${app.notes}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "applications_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported to CSV");
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'shortlisted': return 'bg-purple-100 text-purple-700';
      case 'interview': return 'bg-yellow-100 text-yellow-700';
      case 'hired': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Career & Jobs Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Manage job openings and track applicant status.</p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'jobs' ? (
            <button onClick={() => openJobModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              <Plus size={18} />
              <span>Post New Job</span>
            </button>
          ) : (
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm">
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === 'jobs' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Job Listings
          {activeTab === 'jobs' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === 'applications' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Applications ({applications.length})
          {activeTab === 'applications' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
        {activeTab === 'jobs' ? (
          <div className="p-6 grid gap-6 grid-cols-1 lg:grid-cols-2">
            {jobs.map(job => (
              <div key={job.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow relative group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <Briefcase size={14} /> {job.department} • {job.type}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${job.status === 'open' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {job.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2"><MapPin size={14} /> {job.location}</div>
                  <div className="flex items-center gap-2"><Clock size={14} /> Exp: {job.experience}</div>
                  <div className="flex items-center gap-2"><DollarSign size={14} /> {job.salary || 'Not disclosed'}</div>
                  <div className="flex items-center gap-2"><Calendar size={14} /> Deadline: {job.deadline}</div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button onClick={() => openJobModal(job)} className="flex-1 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">Edit</button>
                  <button onClick={() => handleDeleteJob(job.id)} className="px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {jobs.length === 0 && <div className="col-span-full text-center py-10 text-gray-500">No jobs posted yet.</div>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Applicant</th>
                  <th className="px-6 py-4 font-semibold">Job Role</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Notes</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{app.applicantName}</div>
                      <div className="text-gray-500 text-xs">{app.email}</div>
                      <div className="text-gray-400 text-xs">{app.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{jobs.find(j => j.id === app.jobId)?.title || 'Unknown Job'}</span>
                      <div className="text-xs text-gray-400">{app.appliedDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-xs font-medium border-0 cursor-pointer focus:ring-2 focus:ring-indigo-500 ${getStatusColor(app.status)}`}
                      >
                        {APP_STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <textarea 
                        value={app.notes}
                        onChange={(e) => handleNoteChange(app.id, e.target.value)}
                        placeholder="Add notes..."
                        className="w-full min-w-[200px] text-xs p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 resize-y"
                        rows={2}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">View Resume</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {applications.length === 0 && <div className="text-center py-10 text-gray-500">No applications received yet.</div>}
          </div>
        )}
      </div>

      {/* Job Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800">{currentJob ? 'Edit Job' : 'Post New Job'}</h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <form id="jobForm" onSubmit={handleSaveJob} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full input-style" placeholder="e.g. Senior Developer" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input type="text" required value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full input-style" placeholder="e.g. Engineering" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                        <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full input-style">
                          {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full input-style" placeholder="e.g. Remote" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                          <input type="text" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full input-style" placeholder="e.g. 3+ years" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                          <input type="text" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} className="w-full input-style" placeholder="e.g. $80k - $100k" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                        <input type="date" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} className="w-full input-style" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                    <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full input-style resize-none" placeholder="Overview of the role..." />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
                      {formData.responsibilities.map((item, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input type="text" value={item} onChange={(e) => handleArrayChange('responsibilities', i, e.target.value)} className="flex-1 input-style" placeholder="Add responsibility..." />
                          <button type="button" onClick={() => removeArrayItem('responsibilities', i)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16}/></button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addArrayItem('responsibilities')} className="text-sm text-indigo-600 font-medium flex items-center gap-1"><Plus size={14}/> Add Item</button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                      {formData.requirements.map((item, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input type="text" value={item} onChange={(e) => handleArrayChange('requirements', i, e.target.value)} className="flex-1 input-style" placeholder="Add requirement..." />
                          <button type="button" onClick={() => removeArrayItem('requirements', i)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16}/></button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addArrayItem('requirements')} className="text-sm text-indigo-600 font-medium flex items-center gap-1"><Plus size={14}/> Add Item</button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="input-style w-auto">
                      <option value="draft">Draft</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </form>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                <button type="submit" form="jobForm" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm flex items-center gap-2"><Save size={18} /> Save Job</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}