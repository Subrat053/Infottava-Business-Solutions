import { useEffect, useState } from "react";
import { useAdminAuth } from "../AdminAuthContext";
import { invalidateContentCache } from "../../hooks/useSiteContent";
import { apiUrl } from "../../config/api";

const SECTIONS = ["home", "about", "services", "footer"];
const API = apiUrl("/api/admin/content");

export default function ContentManager() {
  const { token } = useAdminAuth();
  const [content, setContent] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [editing, setEditing] = useState(null); // { item, value, error }
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState(null);
  const [msg, setMsg] = useState("");

  const authHeaders = { Authorization: `Bearer ${token}` };

  const fetchContent = async () => {
    const params = activeSection ? `?section=${activeSection}` : "";
    const res = await fetch(`${API}${params}`, { headers: authHeaders });
    const data = await res.json();
    if (data.success) setContent(data.data);
  };

  useEffect(() => {
    fetchContent();
  }, [activeSection]);

  const handleSave = async () => {
    if (!editing) return;
    // Validate JSON if needed
    if (editing.item.type === "json") {
      try {
        JSON.parse(editing.value);
      } catch {
        setEditing((p) => ({ ...p, error: "Invalid JSON" }));
        return;
      }
    }
    setSaving(true);
    const res = await fetch(`${API}/${editing.item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify({ value: editing.value }),
    });
    const data = await res.json();
    if (data.success) {
      setContent((prev) =>
        prev.map((c) => (c._id === data.data._id ? data.data : c)),
      );
      setEditing(null);
      invalidateContentCache();
      flash("✅ Saved and site content refreshed.");
    } else {
      flash("❌ " + data.message);
    }
    setSaving(false);
  };

  const handleCreate = async () => {
    if (!newItem?.section || !newItem?.key || newItem?.value === undefined)
      return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify(newItem),
    });
    const data = await res.json();
    if (data.success) {
      setContent((prev) => [...prev, data.data]);
      setNewItem(null);
      invalidateContentCache();
      flash("✅ Content item created.");
    } else {
      flash("❌ " + data.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this content item?")) return;
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    if ((await res.json()).success) {
      setContent((prev) => prev.filter((c) => c._id !== id));
      invalidateContentCache();
      flash("✅ Deleted.");
    }
  };

  const flash = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  };

  const grouped = content.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Content Manager</h1>
        <button
          onClick={() =>
            setNewItem({
              section: "",
              key: "",
              value: "",
              type: "text",
              label: "",
            })
          }
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          + Add Item
        </button>
      </div>

      {msg && (
        <div className="mb-4 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm">
          {msg}
        </div>
      )}

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-800 pb-4">
        {["", ...SECTIONS].map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeSection === s
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            {s ? s.charAt(0).toUpperCase() + s.slice(1) : "All Sections"}
          </button>
        ))}
      </div>

      {/* New item form */}
      {newItem && (
        <div className="bg-gray-900 border border-purple-700 rounded-xl p-6 mb-6">
          <h3 className="text-white font-semibold mb-4">New Content Item</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-gray-400 text-xs block mb-1">
                Section
              </label>
              <select
                value={newItem.section}
                onChange={(e) =>
                  setNewItem((p) => ({ ...p, section: e.target.value }))
                }
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
              >
                <option value="">Select section</option>
                {SECTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">Key</label>
              <input
                type="text"
                value={newItem.key}
                onChange={(e) =>
                  setNewItem((p) => ({ ...p, key: e.target.value }))
                }
                placeholder="e.g. mainHeading"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">
                Label (display name)
              </label>
              <input
                type="text"
                value={newItem.label}
                onChange={(e) =>
                  setNewItem((p) => ({ ...p, label: e.target.value }))
                }
                placeholder="e.g. Main Heading"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">Type</label>
              <select
                value={newItem.type}
                onChange={(e) =>
                  setNewItem((p) => ({ ...p, type: e.target.value }))
                }
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
              >
                {["text", "richtext", "json", "number", "boolean"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="text-gray-400 text-xs block mb-1">Value</label>
            <textarea
              value={
                typeof newItem.value === "object"
                  ? JSON.stringify(newItem.value, null, 2)
                  : newItem.value
              }
              onChange={(e) =>
                setNewItem((p) => ({ ...p, value: e.target.value }))
              }
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none font-mono"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Create
            </button>
            <button
              onClick={() => setNewItem(null)}
              className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Content grouped by section */}
      {Object.entries(grouped).map(([section, items]) => (
        <div key={section} className="mb-8">
          <h2 className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-3">
            {section}
          </h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-500">
                  <th className="text-left px-4 py-3 font-medium w-48">
                    Label / Key
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Value</th>
                  <th className="text-left px-4 py-3 font-medium w-32">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="border-b border-gray-800/50">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">
                        {item.label || item.key}
                      </p>
                      {item.label && (
                        <p className="text-gray-500 text-xs">{item.key}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editing?.item._id === item._id ? (
                        <div>
                          <textarea
                            value={editing.value}
                            onChange={(e) =>
                              setEditing((p) => ({
                                ...p,
                                value: e.target.value,
                                error: null,
                              }))
                            }
                            rows={item.type === "json" ? 8 : 3}
                            className={`w-full bg-gray-800 border ${
                              editing.error
                                ? "border-red-500"
                                : "border-purple-600"
                            } text-white rounded-lg px-3 py-2 text-sm focus:outline-none font-mono`}
                          />
                          {editing.error && (
                            <p className="text-red-400 text-xs mt-1">
                              {editing.error}
                            </p>
                          )}
                          {item.type === "json" && (
                            <p className="text-gray-500 text-xs mt-1">
                              Edit as JSON array or object
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-300 line-clamp-2 font-mono text-xs">
                          {item.type === "json"
                            ? (() => {
                                try {
                                  const v = JSON.parse(
                                    typeof item.value === "string"
                                      ? item.value
                                      : JSON.stringify(item.value),
                                  );
                                  return Array.isArray(v)
                                    ? `[${v.length} items]`
                                    : "{object}";
                                } catch {
                                  return String(item.value);
                                }
                              })()
                            : String(item.value)}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editing?.item._id === item._id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            disabled={saving}
                            className="text-green-400 hover:text-green-300 text-xs disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditing(null)}
                            className="text-gray-400 hover:text-gray-300 text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setEditing({
                                item,
                                value:
                                  typeof item.value === "object"
                                    ? JSON.stringify(item.value, null, 2)
                                    : String(item.value),
                              })
                            }
                            className="text-purple-400 hover:text-purple-300 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            Del
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {content.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg mb-2">No content items yet.</p>
          <p className="text-sm">
            Click "+ Add Item" to create your first content entry.
          </p>
        </div>
      )}
    </div>
  );
}
