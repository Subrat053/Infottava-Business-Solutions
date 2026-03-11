import { useState } from 'react';
import {
  Search, Download, Trash2, Archive, Mail,
  MessageSquare, Send, Paperclip, Settings, X, FileText, Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const MOCK_MESSAGES = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    subject: "Inquiry about Web Development",
    message: "Hi, I'm interested in your web development services for my startup. Can we schedule a call to discuss the requirements?",
    date: "2024-10-24T10:30:00",
    status: "unread",
    stage: "lead",
    notes: [],
    isArchived: false
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@company.com",
    subject: "Partnership Opportunity",
    message: "We are looking for a tech partner for our upcoming project. Let's connect.",
    date: "2024-10-23T14:15:00",
    status: "read",
    stage: "prospect",
    notes: [{ text: "Sent initial proposal on 25th Oct", date: "2024-10-25T09:00:00" }],
    isArchived: false
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@gmail.com",
    subject: "Spam Message",
    message: "Buy cheap crypto now!!!",
    date: "2024-10-22T09:00:00",
    status: "read",
    stage: "spam",
    notes: [],
    isArchived: false
  }
];

const REPLY_TEMPLATES = [
  { id: 1, name: "General Inquiry", subject: "Re: Your Inquiry", body: "Hi {name},\n\nThanks for reaching out! We'd love to discuss your project. When are you available for a quick call?\n\nBest,\nInfotattva Team" },
  { id: 2, name: "Pricing Question", subject: "Re: Pricing Information", body: "Hi {name},\n\nThanks for your interest. Our pricing depends on the scope of the project. Could you provide more details?\n\nBest,\nInfotattva Team" },
];

const STAGES = ["lead", "prospect", "client", "spam"];

export default function ContactMessageImprovements() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("all");
  
  // Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    emailNotification: true,
    autoReply: false
  });

  // Reply State
  const [replySubject, setReplySubject] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [internalNote, setInternalNote] = useState("");

  // --- Handlers ---

  const handleSelectMessage = (id) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter(mId => mId !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(messages.map(m => m.id));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedMessages.length === 0) return;
    
    let updatedMessages = [...messages];
    if (action === 'delete') {
      if (!window.confirm(`Delete ${selectedMessages.length} messages?`)) return;
      updatedMessages = updatedMessages.filter(m => !selectedMessages.includes(m.id));
      toast.success(`Deleted ${selectedMessages.length} messages`);
    } else if (action === 'read') {
      updatedMessages = updatedMessages.map(m => selectedMessages.includes(m.id) ? { ...m, status: 'read' } : m);
      toast.success(`Marked ${selectedMessages.length} messages as read`);
    } else if (action === 'archive') {
      updatedMessages = updatedMessages.map(m => selectedMessages.includes(m.id) ? { ...m, isArchived: true } : m);
      toast.success(`Archived ${selectedMessages.length} messages`);
    }
    setMessages(updatedMessages);
    setSelectedMessages([]);
  };

  const handleExport = () => {
    const headers = ["ID", "Name", "Email", "Subject", "Date", "Status", "Stage"];
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...messages.map(m => [m.id, `"${m.name}"`, m.email, `"${m.subject}"`, m.date, m.status, m.stage].join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contacts_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported to CSV");
  };

  const openMessage = (msg) => {
    setCurrentMessage(msg);
    setReplySubject(`Re: ${msg.subject}`);
    setReplyBody("");
    // Mark as read
    if (msg.status === 'unread') {
      setMessages(messages.map(m => m.id === msg.id ? { ...m, status: 'read' } : m));
    }
  };

  const applyTemplate = (templateId) => {
    const template = REPLY_TEMPLATES.find(t => t.id === parseInt(templateId));
    if (template && currentMessage) {
      setReplySubject(template.subject);
      setReplyBody(template.body.replace("{name}", currentMessage.name));
    }
  };

  const sendReply = () => {
    if (!replyBody.trim()) return toast.error("Message cannot be empty");
    toast.success(`Reply sent to ${currentMessage.email}`);
    setReplyBody("");
    // In a real app, this would call an API
  };

  const addNote = () => {
    if (!internalNote.trim()) return;
    const newNote = { text: internalNote, date: new Date().toISOString() };
    const updatedMessages = messages.map(m => 
      m.id === currentMessage.id 
        ? { ...m, notes: [...m.notes, newNote] } 
        : m
    );
    setMessages(updatedMessages);
    setCurrentMessage({ ...currentMessage, notes: [...currentMessage.notes, newNote] });
    setInternalNote("");
    toast.success("Note added");
  };

  const updateStage = (newStage) => {
    const updatedMessages = messages.map(m => 
      m.id === currentMessage.id ? { ...m, stage: newStage } : m
    );
    setMessages(updatedMessages);
    setCurrentMessage({ ...currentMessage, stage: newStage });
    toast.success(`Stage updated to ${newStage}`);
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || m.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      {/* Header & Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
          <p className="text-gray-500 text-sm mt-1">Manage inquiries, leads, and support requests.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowSettings(!showSettings)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
            <Settings size={20} />
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border border-gray-200 rounded-xl p-4 overflow-hidden"
          >
            <h3 className="font-semibold text-gray-800 mb-3">Message Settings</h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${settings.emailNotification ? 'bg-indigo-600' : 'bg-gray-300'}`} onClick={() => setSettings({...settings, emailNotification: !settings.emailNotification})}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${settings.emailNotification ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm text-gray-700">Email Notifications to Admin</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${settings.autoReply ? 'bg-indigo-600' : 'bg-gray-300'}`} onClick={() => setSettings({...settings, autoReply: !settings.autoReply})}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${settings.autoReply ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm text-gray-700">Auto-Reply to Sender</span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Message List */}
        <div className={`flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden ${currentMessage ? 'hidden lg:flex lg:w-1/3' : 'w-full'}`}>
          {/* List Toolbar */}
          <div className="p-4 border-b border-gray-200 flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <select 
                  value={filterStage}
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Stages</option>
                  {STAGES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              {selectedMessages.length > 0 && (
                <div className="flex items-center gap-1">
                  <button onClick={() => handleBulkAction('read')} className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Mark Read"><Check size={18}/></button>
                  <button onClick={() => handleBulkAction('archive')} className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded" title="Archive"><Archive size={18}/></button>
                  <button onClick={() => handleBulkAction('delete')} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 size={18}/></button>
                </div>
              )}
            </div>
          </div>

          {/* List Items */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Mail size={48} className="mb-2 opacity-20" />
                <p>No messages found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredMessages.map((msg) => (
                  <div 
                    key={msg.id}
                    onClick={() => openMessage(msg)}
                    className={`group flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${currentMessage?.id === msg.id ? 'bg-indigo-50/50' : ''} ${msg.status === 'unread' ? 'bg-white' : 'bg-gray-50/30'}`}
                  >
                    <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedMessages.includes(msg.id)}
                        onChange={() => handleSelectMessage(msg.id)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm truncate ${msg.status === 'unread' ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                          {msg.name}
                        </h4>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                          {new Date(msg.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={`text-sm truncate mb-1 ${msg.status === 'unread' ? 'text-gray-800' : 'text-gray-600'}`}>
                        {msg.subject}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide border ${
                          msg.stage === 'lead' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          msg.stage === 'prospect' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                          msg.stage === 'client' ? 'bg-green-50 text-green-700 border-green-100' :
                          'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {msg.stage}
                        </span>
                        {msg.notes.length > 0 && <FileText size={12} className="text-gray-400" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Detail View */}
        <AnimatePresence mode="wait">
          {currentMessage ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-[2] bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden"
            >
              {/* Detail Header */}
              <div className="p-6 border-b border-gray-200 flex justify-between items-start bg-gray-50/30">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{currentMessage.subject}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{currentMessage.name}</span>
                    <span>&lt;{currentMessage.email}&gt;</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    value={currentMessage.stage}
                    onChange={(e) => updateStage(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
                  >
                    {STAGES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                  <button onClick={() => setCurrentMessage(null)} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Detail Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="prose max-w-none text-gray-700 mb-8">
                  <p className="whitespace-pre-wrap">{currentMessage.message}</p>
                </div>

                {/* Internal Notes Section */}
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100 mb-8">
                  <h4 className="text-sm font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    <FileText size={16} /> Internal Notes (Private)
                  </h4>
                  <div className="space-y-3 mb-3">
                    {currentMessage.notes.map((note, idx) => (
                      <div key={idx} className="text-sm bg-white p-2 rounded border border-yellow-100 text-gray-600">
                        {note.text}
                        <div className="text-[10px] text-gray-400 mt-1">{new Date(note.date).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={internalNote}
                      onChange={(e) => setInternalNote(e.target.value)}
                      placeholder="Add a private note..."
                      className="flex-1 px-3 py-2 text-sm border border-yellow-200 rounded-lg focus:outline-none focus:border-yellow-400"
                      onKeyDown={(e) => e.key === 'Enter' && addNote()}
                    />
                    <button onClick={addNote} className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200">Add</button>
                  </div>
                </div>

                {/* Reply Section */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">Reply to {currentMessage.name}</h3>
                    <select 
                      onChange={(e) => applyTemplate(e.target.value)}
                      className="text-sm border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none"
                    >
                      <option value="">Insert Template...</option>
                      {REPLY_TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                      placeholder="Subject"
                    />
                    <textarea 
                      rows={6}
                      value={replyBody}
                      onChange={(e) => setReplyBody(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 resize-none font-sans"
                      placeholder="Write your reply here..."
                    />
                    <div className="flex justify-end gap-3">
                      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium flex items-center gap-2">
                        <Paperclip size={16} /> Attach
                      </button>
                      <button onClick={sendReply} className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm flex items-center gap-2">
                        <Send size={16} /> Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="hidden lg:flex flex-[2] bg-gray-50 rounded-xl border border-gray-200 border-dashed items-center justify-center text-gray-400 flex-col gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <MessageSquare size={32} className="opacity-50" />
              </div>
              <p>Select a message to view details</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}