import { useEffect, useState } from "react";
import { useAdminAuth } from "../AdminAuthContext";

const STATUS_COLORS = {
  new: "bg-blue-900/40 text-blue-300 border-blue-700",
  read: "bg-gray-700 text-gray-300 border-gray-600",
  replied: "bg-green-900/40 text-green-300 border-green-700",
  archived: "bg-gray-800 text-gray-500 border-gray-700",
};

export default function ContactMessages() {
  const { token } = useAdminAuth();
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 15 });
    if (filter) params.append("status", filter);
    if (search) params.append("search", search);

    const res = await fetch(
      `http://localhost:5000/api/contact/admin?${params}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const data = await res.json();
    if (data.success) {
      setContacts(data.data);
      setPagination(data.pagination);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, [page, filter]);

  const handleView = async (contact) => {
    setSelected(contact);
    if (contact.status === "new") {
      await fetch(`http://localhost:5000/api/contact/admin/${contact._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts((prev) =>
        prev.map((c) => (c._id === contact._id ? { ...c, status: "read" } : c)),
      );
    }
  };

  const handleStatusChange = async (id, status) => {
    const res = await fetch(`http://localhost:5000/api/contact/admin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) {
      setContacts((prev) => prev.map((c) => (c._id === id ? data.data : c)));
      if (selected?._id === id) setSelected(data.data);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    const res = await fetch(`http://localhost:5000/api/contact/admin/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if ((await res.json()).success) {
      setContacts((prev) => prev.filter((c) => c._id !== id));
      if (selected?._id === id) setSelected(null);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Contact Messages</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-1">
          {["", "new", "read", "replied", "archived"].map((s) => (
            <button
              key={s}
              onClick={() => {
                setFilter(s);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                filter === s
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-48">
          <input
            type="text"
            placeholder="Search name, email, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchContacts()}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 space-y-2">
          {loading ? (
            <p className="text-gray-500 text-sm py-4 text-center">Loading...</p>
          ) : contacts.length === 0 ? (
            <p className="text-gray-500 text-sm py-4 text-center">
              No messages found.
            </p>
          ) : (
            contacts.map((c) => (
              <div
                key={c._id}
                onClick={() => handleView(c)}
                className={`cursor-pointer p-4 rounded-xl border transition ${
                  selected?._id === c._id
                    ? "bg-purple-900/30 border-purple-600"
                    : "bg-gray-900 border-gray-800 hover:border-gray-600"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p
                      className={`font-medium truncate ${c.status === "new" ? "text-white" : "text-gray-300"}`}
                    >
                      {c.name}
                    </p>
                    <p className="text-gray-500 text-xs truncate">{c.email}</p>
                    {(c.phone || c.service || c.budget) && (
                      <p className="text-gray-600 text-xs truncate">
                        {[c.phone, c.service || c.budget]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded text-xs border ${STATUS_COLORS[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                  {c.message}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-between items-center pt-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="text-sm text-gray-400 hover:text-white disabled:opacity-40"
              >
                ← Prev
              </button>
              <span className="text-gray-500 text-xs">
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

        {/* Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-white text-lg font-semibold">
                    {selected.name}
                  </h2>
                </div>
                <button
                  onClick={() => handleDelete(selected._id)}
                  className="text-red-400 hover:text-red-300 text-sm px-3 py-1 border border-red-800 rounded-lg hover:bg-red-900/20 transition"
                >
                  Delete
                </button>
              </div>

              {/* All contact fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <InfoRow label="Email" value={selected.email} />
                {selected.phone && (
                  <InfoRow label="Phone" value={selected.phone} />
                )}
                {selected.company && (
                  <InfoRow label="Company" value={selected.company} />
                )}
                {(selected.service || selected.budget) && (
                  <InfoRow
                    label="Service Interest"
                    value={selected.service || selected.budget}
                  />
                )}
              </div>

              <div className="mb-1">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                  Message
                </p>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
              </div>

              <div className="mb-4" />

              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-gray-500 text-sm">Set status:</span>
                {["new", "read", "replied", "archived"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(selected._id, s)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                      selected.status === s
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <p className="text-gray-600 text-xs mt-4">
                Received: {new Date(selected.createdAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 flex items-center justify-center">
              <p className="text-gray-500 text-sm">
                Select a message to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="bg-gray-800/60 rounded-lg px-4 py-3">
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-gray-200 text-sm break-all">{value}</p>
    </div>
  );
}
