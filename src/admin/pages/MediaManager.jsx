import { useEffect, useState, useRef } from "react";
import { useAdminAuth } from "../AdminAuthContext";

const CATEGORIES = [
  "team",
  "portfolio",
  "services",
  "hero",
  "testimonials",
  "misc",
];

export default function MediaManager() {
  const { token } = useAdminAuth();
  const [media, setMedia] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    category: "misc",
    altText: "",
    file: null,
  });
  const [msg, setMsg] = useState("");
  const fileRef = useRef();

  const API = "http://localhost:5000";

  const fetchMedia = async () => {
    const params = new URLSearchParams({ page, limit: 24 });
    if (category) params.append("category", category);
    const res = await fetch(`${API}/api/admin/media?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setMedia(data.data);
      setPagination(data.pagination);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [page, category]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadForm.file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("image", uploadForm.file);
    fd.append("category", uploadForm.category);
    fd.append("altText", uploadForm.altText);

    const res = await fetch(`${API}/api/admin/media/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const data = await res.json();
    if (data.success) {
      setMedia((prev) => [data.data, ...prev]);
      setUploadForm({ category: "misc", altText: "", file: null });
      if (fileRef.current) fileRef.current.value = "";
      flash("✅ Image uploaded.");
    } else {
      flash("❌ " + data.message);
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image? This cannot be undone.")) return;
    const res = await fetch(`${API}/api/admin/media/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if ((await res.json()).success) {
      setMedia((prev) => prev.filter((m) => m._id !== id));
      flash("✅ Image deleted.");
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(`${API}${url}`);
    flash("📋 URL copied to clipboard.");
  };

  const flash = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Media Manager</h1>

      {msg && (
        <div className="mb-4 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm">
          {msg}
        </div>
      )}

      {/* Upload form */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Upload Image</h2>
        <form
          onSubmit={handleUpload}
          className="flex flex-wrap gap-3 items-end"
        >
          <div>
            <label className="text-gray-400 text-xs block mb-1">
              File (max 5MB)
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setUploadForm((p) => ({ ...p, file: e.target.files[0] }))
              }
              className="text-sm text-gray-300 file:bg-purple-600 file:border-0 file:text-white file:px-3 file:py-1.5 file:rounded-lg file:cursor-pointer"
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1">Category</label>
            <select
              value={uploadForm.category}
              onChange={(e) =>
                setUploadForm((p) => ({ ...p, category: e.target.value }))
              }
              className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1">Alt Text</label>
            <input
              type="text"
              value={uploadForm.altText}
              onChange={(e) =>
                setUploadForm((p) => ({ ...p, altText: e.target.value }))
              }
              placeholder="Describe the image"
              className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none w-56"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white text-sm px-5 py-2 rounded-lg transition"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => {
              setCategory(c);
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              category === c
                ? "bg-purple-600 border-purple-500 text-white"
                : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"
            }`}
          >
            {c || "All"}
          </button>
        ))}
      </div>

      {/* Grid */}
      {media.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p>No images in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {media.map((m) => (
            <div
              key={m._id}
              className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition"
            >
              <div className="aspect-square bg-gray-800 overflow-hidden">
                <img
                  src={`${API}${m.url}`}
                  alt={m.altText || m.originalname}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-2">
                <p className="text-gray-400 text-xs truncate">
                  {m.originalname}
                </p>
                <p className="text-gray-600 text-xs">{m.category}</p>
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={() => copyUrl(m.url)}
                    title="Copy URL"
                    className="flex-1 text-xs text-purple-400 hover:text-purple-300 bg-gray-800 hover:bg-gray-700 rounded py-1 transition"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleDelete(m._id)}
                    title="Delete"
                    className="text-xs text-red-400 hover:text-red-300 bg-gray-800 hover:bg-gray-700 rounded px-2 py-1 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="text-sm text-gray-400 hover:text-white disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-gray-500 text-sm">
            {page} / {pagination.pages}
          </span>
          <button
            disabled={page === pagination.pages}
            onClick={() => setPage((p) => p + 1)}
            className="text-sm text-gray-400 hover:text-white disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
