import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../AdminAuthContext";

function StatusBadge({ status }) {
  const colors = {
    new: "bg-blue-900/40 text-blue-300",
    read: "bg-gray-700 text-gray-300",
    replied: "bg-green-900/40 text-green-300",
    archived: "bg-gray-800 text-gray-500",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status] || colors.read}`}>
      {status}
    </span>
  );
}

function StatCard({ label, value, icon, accent, to }) {
  return (
    <Link to={to} className={`block bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-${accent}-500/60 transition group`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold text-white">{value ?? "—"}</p>
        </div>
        <span className={`text-2xl p-2 rounded-lg bg-${accent}-900/30 group-hover:bg-${accent}-900/50 transition`}>{icon}</span>
      </div>
    </Link>
  );
}

function QuickActionCard({ title, desc, icon, to, accent }) {
  return (
    <Link to={to} className={`flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-${accent}-500/60 transition group`}>
      <span className={`text-3xl p-3 rounded-xl bg-${accent}-900/30 group-hover:bg-${accent}-900/50 transition`}>{icon}</span>
      <div>
        <p className="text-white font-semibold">{title}</p>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
      <span className="ml-auto text-gray-600 group-hover:text-white transition">→</span>
    </Link>
  );
}

export default function Dashboard() {
  const { token } = useAdminAuth();
  const [contactStats, setContactStats] = useState(null);
  const [recentContacts, setRecentContacts] = useState([]);
  const [contentCount, setContentCount] = useState(null);
  const [mediaCount, setMediaCount] = useState(null);
  const [sectionDates, setSectionDates] = useState({});

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch("http://localhost:5000/api/contact/admin/stats", { headers }).then(r => r.json()),
      fetch("http://localhost:5000/api/contact/admin?limit=5", { headers }).then(r => r.json()),
      fetch("http://localhost:5000/api/admin/content", { headers }).then(r => r.json()),
      fetch("http://localhost:5000/api/admin/media", { headers }).then(r => r.json()),
    ]).then(([statsData, contactsData, contentData, mediaData]) => {
      if (statsData.success) setContactStats(statsData.data);
      if (contactsData.success) setRecentContacts(contactsData.data);
      if (contentData.success) {
        setContentCount(contentData.data.length);
        // Build latest-edit dates per section
        const dates = {};
        contentData.data.forEach(item => {
          const d = new Date(item.updatedAt);
          if (!dates[item.section] || d > dates[item.section]) dates[item.section] = d;
        });
        setSectionDates(dates);
      }
      if (mediaData.success) setMediaCount(mediaData.data.length);
    });
  }, [token]);

  const getCount = (status) => contactStats?.stats.find(s => s._id === status)?.count ?? 0;
  const fmtDate = (d) => d ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never';

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Welcome back — here's your site overview.</p>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard label="Total Messages" value={contactStats?.total}    icon="✉️"  accent="purple" to="/admin/contacts" />
        <StatCard label="New (Unread)"   value={getCount("new")}         icon="🔔"  accent="blue"   to="/admin/contacts" />
        <StatCard label="Replied"        value={getCount("replied")}      icon="✅"  accent="green"  to="/admin/contacts" />
        <StatCard label="Archived"       value={getCount("archived")}     icon="🗂️" accent="gray"   to="/admin/contacts" />
        <StatCard label="Content Items"  value={contentCount}             icon="📝"  accent="yellow" to="/admin/content" />
        <StatCard label="Media Files"    value={mediaCount}               icon="🖼️" accent="pink"   to="/admin/media" />
      </div>

      {/* Quick Actions */}
      <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-3">Quick Actions</h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <QuickActionCard title="Manage Messages"  desc="View and reply to contact form submissions" icon="✉️"  accent="purple" to="/admin/contacts" />
        <QuickActionCard title="Edit Content"     desc="Update text and data across all site pages" icon="📝"  accent="blue"   to="/admin/content" />
        <QuickActionCard title="Manage Media"     desc="Upload, organise and delete site images"    icon="🖼️" accent="pink"   to="/admin/media" />
      </div>

      {/* Site Sections */}
      <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-3">Site Sections</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {["home", "about", "services", "footer"].map(section => (
          <Link key={section} to={`/admin/content`}
            className="bg-gray-900 border border-gray-800 hover:border-purple-500/60 rounded-xl p-4 transition group"
          >
            <p className="text-white font-semibold capitalize mb-1">{section}</p>
            <p className="text-gray-500 text-xs">Last edited: {fmtDate(sectionDates[section])}</p>
            <p className="text-purple-400 text-xs mt-2 group-hover:text-purple-300">Edit section →</p>
          </Link>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Recent Messages</h2>
          <Link to="/admin/contacts" className="text-purple-400 hover:text-purple-300 text-sm">View all →</Link>
        </div>
        {recentContacts.length === 0 ? (
          <p className="text-gray-500 text-sm py-4 text-center">No messages yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left pb-3 font-medium">Name</th>
                <th className="text-left pb-3 font-medium">Email</th>
                <th className="text-left pb-3 font-medium">Service</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-left pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentContacts.map(c => (
                <tr key={c._id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-3 text-white">{c.name}</td>
                  <td className="py-3 text-gray-400">{c.email}</td>
                  <td className="py-3 text-gray-400">{c.service || "—"}</td>
                  <td className="py-3"><StatusBadge status={c.status} /></td>
                  <td className="py-3 text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


// const StatCard = ({ label, value, color, to }) => (
//   <Link
//     to={to}
//     className={`block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-${color}-500 transition`}
//   >
//     <p className="text-gray-400 text-sm mb-1">{label}</p>
//     <p className="text-3xl font-bold text-white">{value}</p>
//   </Link>
// );

// export default function Dashboard() {
//   const { token } = useAdminAuth();
//   const [stats, setStats] = useState(null);
//   const [recentContacts, setRecentContacts] = useState([]);

//   useEffect(() => {
//     const headers = { Authorization: `Bearer ${token}` };

//     Promise.all([
//       fetch("http://localhost:5000/api/contact/admin/stats", { headers }).then(
//         (r) => r.json(),
//       ),
//       fetch("http://localhost:5000/api/contact/admin?limit=5", {
//         headers,
//       }).then((r) => r.json()),
//     ]).then(([statsData, contactsData]) => {
//       if (statsData.success) setStats(statsData.data);
//       if (contactsData.success) setRecentContacts(contactsData.data);
//     });
//   }, [token]);

//   const getCount = (status) =>
//     stats?.stats.find((s) => s._id === status)?.count ?? 0;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
//       <p className="text-gray-400 text-sm mb-8">
//         Welcome back! Here's what's happening.
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <StatCard
//           label="Total Messages"
//           value={stats?.total ?? "—"}
//           color="purple"
//           to="/admin/contacts"
//         />
//         <StatCard
//           label="New (Unread)"
//           value={getCount("new")}
//           color="blue"
//           to="/admin/contacts?status=new"
//         />
//         <StatCard
//           label="Replied"
//           value={getCount("replied")}
//           color="green"
//           to="/admin/contacts?status=replied"
//         />
//         <StatCard
//           label="Archived"
//           value={getCount("archived")}
//           color="gray"
//           to="/admin/contacts?status=archived"
//         />
//       </div>

//       <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-white font-semibold">Recent Messages</h2>
//           <Link
//             to="/admin/contacts"
//             className="text-purple-400 hover:text-purple-300 text-sm"
//           >
//             View all →
//           </Link>
//         </div>

//         {recentContacts.length === 0 ? (
//           <p className="text-gray-500 text-sm py-4 text-center">
//             No messages yet.
//           </p>
//         ) : (
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-gray-500 border-b border-gray-800">
//                 <th className="text-left pb-3 font-medium">Name</th>
//                 <th className="text-left pb-3 font-medium">Email</th>
//                 <th className="text-left pb-3 font-medium">Status</th>
//                 <th className="text-left pb-3 font-medium">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentContacts.map((c) => (
//                 <tr
//                   key={c._id}
//                   className="border-b border-gray-800/50 hover:bg-gray-800/30"
//                 >
//                   <td className="py-3 text-white">{c.name}</td>
//                   <td className="py-3 text-gray-400">{c.email}</td>
//                   <td className="py-3">
//                     <StatusBadge status={c.status} />
//                   </td>
//                   <td className="py-3 text-gray-500">
//                     {new Date(c.createdAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const colors = {
//     new: "bg-blue-900/40 text-blue-300",
//     read: "bg-gray-700 text-gray-300",
//     replied: "bg-green-900/40 text-green-300",
//     archived: "bg-gray-800 text-gray-500",
//   };
//   return (
//     <span
//       className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status] || colors.read}`}
//     >
//       {status}
//     </span>
//   );
// }
