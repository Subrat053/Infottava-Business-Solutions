import { useState, useRef, useCallback } from 'react';
import {
  Search, Upload, Trash2, Folder, Image as ImageIcon,
  Grid, List as ListIcon, MoreVertical, X, Check,
  Info, Crop, Maximize2, FileText, Download, Filter,
  ChevronRight, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const MOCK_FOLDERS = [
  { id: 'all', name: 'All Media', count: 128 },
  { id: 'team', name: 'Team Photos', count: 12 },
  { id: 'portfolio', name: 'Portfolio', count: 45 },
  { id: 'services', name: 'Services', count: 8 },
  { id: 'blog', name: 'Blog Posts', count: 24 },
  { id: 'misc', name: 'Miscellaneous', count: 39 },
];

const MOCK_FILES = [
  { id: 1, name: 'hero-banner.jpg', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', folder: 'misc', size: '2.4 MB', dimensions: '1920x1080', date: '2023-10-01', alt: 'Hero Background', type: 'image/jpeg', usedIn: ['Home Page', 'About Us'] },
  { id: 2, name: 'team-meeting.jpg', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', folder: 'team', size: '1.8 MB', dimensions: '1200x800', date: '2023-10-05', alt: 'Team Meeting', type: 'image/jpeg', usedIn: ['About Us'] },
  { id: 3, name: 'project-alpha.png', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', folder: 'portfolio', size: '3.1 MB', dimensions: '1600x1200', date: '2023-10-12', alt: 'Project Alpha Screenshot', type: 'image/png', usedIn: ['Portfolio/Project Alpha'] },
  { id: 4, name: 'icon-set.svg', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80', folder: 'services', size: '45 KB', dimensions: 'N/A', date: '2023-10-15', alt: 'Service Icons', type: 'image/svg+xml', usedIn: ['Services Page'] },
  { id: 5, name: 'office-space.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', folder: 'misc', size: '4.2 MB', dimensions: '2400x1600', date: '2023-10-20', alt: 'Office Interior', type: 'image/jpeg', usedIn: [] },
];

export default function MediaManagerImprovements() {
  const [files, setFiles] = useState(MOCK_FILES);
  const [currentFolder, setCurrentFolder] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFileDetails, setSelectedFileDetails] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Filter files
  const filteredFiles = files.filter(file => {
    const matchesFolder = currentFolder === 'all' || file.folder === currentFolder;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          file.alt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  // Handlers
  const handleFileSelect = (id, multiSelect) => {
    if (multiSelect) {
      setSelectedFiles(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
    } else {
      const file = files.find(f => f.id === id);
      setSelectedFileDetails(file);
      if (!selectedFiles.includes(id)) {
        setSelectedFiles([id]);
      }
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedFiles.length} files? This cannot be undone.`)) {
      setFiles(files.filter(f => !selectedFiles.includes(f.id)));
      setSelectedFiles([]);
      setSelectedFileDetails(null);
      toast.success('Files deleted successfully');
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      toast.success(`${droppedFiles.length} files queued for upload`);
      // Simulate upload
      setTimeout(() => {
        const newFiles = droppedFiles.map((file, idx) => ({
          id: Date.now() + idx,
          name: file.name,
          url: URL.createObjectURL(file),
          folder: currentFolder === 'all' ? 'misc' : currentFolder,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          dimensions: 'Pending',
          date: new Date().toISOString().split('T')[0],
          alt: '',
          type: file.type,
          usedIn: []
        }));
        setFiles(prev => [...newFiles, ...prev]);
        toast.success('Upload complete');
      }, 1500);
    }
  }, [currentFolder]);

  const updateFileDetails = (id, updates) => {
    setFiles(files.map(f => f.id === id ? { ...f, ...updates } : f));
    if (selectedFileDetails?.id === id) {
      setSelectedFileDetails(prev => ({ ...prev, ...updates }));
    }
    toast.success('Saved changes');
  };

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6"
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-indigo-600/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center text-white border-4 border-white/20 border-dashed m-4"
          >
            <Upload size={64} className="mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold">Drop files to upload</h2>
            <p className="text-indigo-200 mt-2">Upload to {currentFolder === 'all' ? 'Miscellaneous' : MOCK_FOLDERS.find(f => f.id === currentFolder)?.name}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar - Folders */}
      <div className="w-64 flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Folder size={20} className="text-indigo-600" />
            Library
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {MOCK_FOLDERS.map(folder => (
            <button
              key={folder.id}
              onClick={() => setCurrentFolder(folder.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                currentFolder === folder.id 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {folder.id === 'all' ? <Layers size={16} /> : <Folder size={16} />}
                {folder.name}
              </div>
              <span className="text-xs bg-white px-2 py-0.5 rounded-full border border-gray-100 text-gray-400">
                {folder.count}
              </span>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="text-xs text-gray-500 mb-2">Storage Used</div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[65%]" />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>6.5 GB</span>
            <span>10 GB</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4 items-center">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search files..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}><Grid size={18} /></button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}><ListIcon size={18} /></button>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {selectedFiles.length > 0 && (
              <button onClick={handleBulkDelete} className="flex items-center gap-2 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium">
                <Trash2 size={18} />
                <span className="hidden sm:inline">Delete ({selectedFiles.length})</span>
              </button>
            )}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium"
            >
              <Upload size={18} />
              <span>Upload</span>
            </button>
            <input type="file" multiple ref={fileInputRef} className="hidden" onChange={(e) => {
               // Handle file selection same as drop
               const files = Array.from(e.target.files);
               if(files.length) toast.success(`${files.length} files selected`);
            }} />
          </div>
        </div>

        {/* File Grid/List */}
        <div className="flex-1 overflow-y-auto p-4" onClick={() => { setSelectedFileDetails(null); setSelectedFiles([]); }}>
          {filteredFiles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ImageIcon size={64} className="mb-4 opacity-20" />
              <p>No media found in this folder</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" : "space-y-2"}>
              {filteredFiles.map(file => (
                <div 
                  key={file.id}
                  onClick={(e) => { e.stopPropagation(); handleFileSelect(file.id, e.ctrlKey || e.metaKey); }}
                  className={`group relative border rounded-xl overflow-hidden cursor-pointer transition-all ${
                    selectedFiles.includes(file.id) 
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/10' 
                      : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                  } ${viewMode === 'list' ? 'flex items-center p-2 gap-4 h-16' : 'aspect-square'}`}
                >
                  {/* Selection Checkbox */}
                  <div className={`absolute top-2 left-2 z-10 ${selectedFiles.includes(file.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedFiles.includes(file.id) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'}`}>
                      {selectedFiles.includes(file.id) && <Check size={12} className="text-white" />}
                    </div>
                  </div>

                  {/* Image Preview */}
                  <div className={`${viewMode === 'list' ? 'w-12 h-12 rounded-lg' : 'w-full h-full'} overflow-hidden bg-gray-100 relative`}>
                    <img src={file.url} alt={file.alt} className="w-full h-full object-cover" />
                    {viewMode === 'grid' && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    )}
                  </div>

                  {/* File Info */}
                  <div className={viewMode === 'list' ? 'flex-1 min-w-0' : 'absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-2 border-t border-gray-100 translate-y-full group-hover:translate-y-0 transition-transform'}>
                    <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500 truncate">{file.size} • {file.dimensions}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details Panel */}
      <AnimatePresence>
        {selectedFileDetails && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800">File Details</h3>
              <button onClick={() => setSelectedFileDetails(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Preview */}
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center relative group">
                <img src={selectedFileDetails.url} alt={selectedFileDetails.alt} className="max-w-full max-h-full object-contain" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white rounded-full text-gray-700 hover:text-indigo-600" title="View Full"><Maximize2 size={18} /></button>
                  <button className="p-2 bg-white rounded-full text-gray-700 hover:text-indigo-600" title="Crop/Edit"><Crop size={18} /></button>
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">File Name</label>
                  <p className="text-sm text-gray-800 break-all">{selectedFileDetails.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</label>
                    <p className="text-sm text-gray-800">{selectedFileDetails.size}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</label>
                    <p className="text-sm text-gray-800">{selectedFileDetails.type.split('/')[1].toUpperCase()}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dimensions</label>
                    <p className="text-sm text-gray-800">{selectedFileDetails.dimensions}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Uploaded</label>
                    <p className="text-sm text-gray-800">{selectedFileDetails.date}</p>
                  </div>
                </div>
              </div>

              {/* Alt Text Editor */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Alt Text (SEO)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={selectedFileDetails.alt}
                    onChange={(e) => setSelectedFileDetails({...selectedFileDetails, alt: e.target.value})}
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Describe image..."
                  />
                  <button 
                    onClick={() => updateFileDetails(selectedFileDetails.id, { alt: selectedFileDetails.alt })}
                    className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
                  >
                    <Check size={18} />
                  </button>
                </div>
              </div>

              {/* Usage Tracking */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Used In</label>
                {selectedFileDetails.usedIn.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedFileDetails.usedIn.map((place, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                        <FileText size={10} /> {place}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">Not used in any content yet.</p>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
              <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                <Download size={16} /> Download
              </button>
              <button 
                onClick={() => {
                  if(window.confirm('Delete this file?')) {
                    setFiles(files.filter(f => f.id !== selectedFileDetails.id));
                    setSelectedFileDetails(null);
                    toast.success('File deleted');
                  }
                }}
                className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 flex items-center justify-center gap-2"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}