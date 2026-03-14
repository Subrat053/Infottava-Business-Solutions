# Infottava Admin Panel — Feature Plan

> **Based on full codebase analysis of the Infottava Business Solutions website.**
> Current stack: React + Vite (frontend), Node.js/Express + MongoDB (backend at localhost:5000), JWT auth.

---

## Website Sections Identified (What Needs Admin Control)

| Section | Page / Component | Currently Editable via Admin? |
|---|---|---|
| Hero / Home tagline | `Hero.jsx`, `HomePage.jsx` | Partial (Content Manager) |
| Services list | `Services.jsx`, `ServicesPage.jsx` | Partial (Content Manager JSON) |
| About / Mission / Vision / Values | `About.jsx`, `AboutPage.jsx` | Partial |
| Team Members | `About.jsx`, `AboutPage.jsx` | No dedicated UI |
| Stats / Numbers | `Stats.jsx` | No |
| Portfolio / Case Studies | `Portfolio.jsx` | No |
| Testimonials | `Testimonials.jsx` | No |
| Pricing Plans | `Pricing.jsx` (commented out) | No |
| Career / Job Listings | `CareerPage.jsx` | No |
| Blog / News | Not built yet | No |
| Contact Messages | `Contact.jsx` | Yes (ContactMessages.jsx) |
| Media / Images | Assets / uploads | Yes (MediaManager.jsx) |
| Footer Links / Social | `Footer.jsx` | Partial |
| Site Settings & SEO | Global | No |
| Navigation Menu | `Navbar.jsx` | No |

---

## Current Admin Panel State

The admin panel already has these 4 pages:

1. **Dashboard** — Stats cards + recent contacts list
2. **Contact Messages** — View/filter/search messages, update status (new/read/replied/archived)
3. **Content Manager** — Edit DB-backed content keys per section (home, about, services, footer) — raw text/JSON
4. **Media Manager** — Upload images, categorize, paginate

These are a solid foundation. The following sections describe all the features that need to be added or improved.

---

## Feature 1 — Dashboard Upgrades

**Purpose:** Give the admin an at-a-glance view of the entire website's health.

### Cards to Add
- Total Services published
- Total Portfolio projects
- Total Testimonials
- Total Team Members
- Total Job Listings / Applications
- Total Blog Posts (when blog is added)
- New Contact Messages (already exists — keep)

### Widgets to Add
- **Recent Activity Feed** — Last 10 admin actions (who edited what and when)
- **Quick Actions Panel** — One-click shortcuts (Add Service, Add Team Member, Reply to Message, etc.)
- **Today's Stats** — New messages today, new job applications today
- **Website Status** — API health check indicator

---

## Feature 2 — Services Manager

**Purpose:** Full CRUD for the services shown on HomePage, ServicesPage, and ServiceDetailPage without touching JSON manually.

### Fields per Service
| Field | Type |
|---|---|
| Title | Text |
| Slug / ID | Auto-generated |
| Icon (emoji or SVG) | Text / Upload |
| Short Description | Textarea |
| Full Description | Rich Text |
| Feature List | Repeatable text items |
| Gradient Colors | Color picker or preset |
| Cover Image | Media picker |
| Status | Active / Draft |
| Display Order | Drag-and-drop sort |

### Actions
- Add new service
- Edit existing service
- Delete service (with confirmation)
- Reorder services (drag-and-drop)
- Toggle active/inactive (show/hide on site)

---

## Feature 3 — Team Members Manager

**Purpose:** Admin should be able to manage the team section in About page and AboutPage without hardcoded imports.

### Fields per Team Member
| Field | Type |
|---|---|
| Full Name | Text |
| Role / Designation | Text |
| Department | Text |
| Profile Photo | Media picker |
| Short Bio / Description | Textarea |
| LinkedIn URL | URL |
| Email | Email |
| Gradient (card style) | Preset selector |
| Display Order | Number / Drag sort |
| Status | Active / Hidden |

### Actions
- Add / Edit / Delete team members
- Reorder via drag-and-drop
- Toggle visibility per member

---

## Feature 4 — Portfolio Manager

**Purpose:** Manage case studies and project showcases displayed in the Portfolio section.

### Fields per Portfolio Item
| Field | Type |
|---|---|
| Project Title | Text |
| Client Name | Text |
| Category / Tags | Multi-select (Web, App, SEO, etc.) |
| Thumbnail Image | Media picker |
| Gallery Images | Multiple media picker |
| Short Description | Textarea |
| Full Case Study | Rich Text |
| Technologies Used | Tag input |
| Results / Metrics | Repeatable key-value pairs |
| Live URL | URL |
| Status | Published / Draft |
| Featured | Toggle (show on homepage) |
| Display Order | Drag sort |

### Actions
- Add / Edit / Delete portfolio items
- Filter by category
- Toggle featured on/off

---

## Feature 5 — Testimonials Manager

**Purpose:** Manage client reviews shown in the Testimonials section.

### Fields per Testimonial
| Field | Type |
|---|---|
| Client Name | Text |
| Company / Organization | Text |
| Designation | Text |
| Star Rating | 1–5 stars |
| Review Text | Textarea |
| Client Photo | Media picker |
| Status | Approved / Pending / Hidden |
| Featured | Toggle |
| Display Order | Drag sort |

### Actions
- Add / Edit / Delete testimonials
- Approve or reject testimonials (if submitted from frontend form in future)
- Toggle featured testimonials for homepage

---

## Feature 6 — Stats / Numbers Manager

**Purpose:** The homepage displays animated counters (clients served, projects completed, years, etc.). These should be editable.

### Fields per Stat
| Field | Type |
|---|---|
| Label | Text (e.g., "Projects Completed") |
| Value / Number | Number |
| Suffix | Text (e.g., "+", "k+", "%") |
| Icon | Emoji or SVG |
| Display Order | Number |

### Actions
- Add / Edit / Delete stats
- Reorder display

---

## Feature 7 — Pricing Plans Manager

**Purpose:** The Pricing section is currently commented out. Once it is activated, admin needs full control.

### Fields per Plan
| Field | Type |
|---|---|
| Plan Name | Text (e.g., Starter, Pro, Enterprise) |
| Price | Number |
| Billing Cycle | Monthly / Yearly |
| Short Description | Textarea |
| Feature List | Repeatable items with check/cross |
| CTA Button Label | Text |
| CTA Button Link | URL or anchor |
| Highlighted / Featured | Toggle |
| Status | Active / Hidden |

### Actions
- Add / Edit / Delete pricing plans
- Enable / disable the entire Pricing section from site settings

---

## Feature 8 — Career / Jobs Manager

**Purpose:** The CareerPage.jsx exists but job listings are hardcoded. Admin should be able to post and manage job openings.

### Fields per Job Listing
| Field | Type |
|---|---|
| Job Title | Text |
| Department | Text |
| Job Type | Full-time / Part-time / Contract / Remote |
| Location | Text |
| Experience Required | Text |
| Salary Range | Text (optional) |
| Job Description | Rich Text |
| Responsibilities | Repeatable items |
| Requirements | Repeatable items |
| Application Deadline | Date |
| Status | Open / Closed / Draft |

### Job Applications Inbox
- View submitted applications (name, email, resume, cover letter)
- Status per application: New / Shortlisted / Interview / Rejected / Hired
- Notes field per applicant
- Export applications as CSV

---

## Feature 9 — Blog / News Manager

**Purpose:** Add a blog section to the website for SEO and thought leadership content. Full CMS needed.

### Fields per Blog Post
| Field | Type |
|---|---|
| Title | Text |
| Slug | Auto-generated / Editable |
| Author | Select admin user or free text |
| Category | Select / Create |
| Tags | Tag input |
| Featured Image | Media picker |
| Excerpt / Summary | Textarea |
| Full Content | Rich Text Editor (WYSIWYG) |
| Meta Title | Text |
| Meta Description | Textarea |
| Status | Draft / Published / Scheduled |
| Published Date | Date-time |
| Featured Post | Toggle |

### Actions
- Add / Edit / Delete blog posts
- Schedule publish date
- Filter by category, status, author
- Preview before publishing

---

## Feature 10 — Contact Messages Improvements

**Current:** View, filter, status update, search messages.

### New Features to Add
- **Reply from Admin Panel** — Send email reply directly from within the message view
- **Reply Templates** — Pre-saved email reply templates (common inquiries)
- **Notes / Internal Comments** — Admin can add internal notes to a message (not visible to client)
- **Lead Stage Tagging** — Tag messages as Lead / Prospect / Client / Spam
- **Export** — Download contacts as CSV / Excel
- **Bulk Actions** — Select multiple messages → mark as read, archive, delete in bulk
- **Email Notification** — Alert admin via email when a new message arrives
- **Auto-Reply on Submit** — Send automated acknowledgment email to the sender

---

## Feature 11 — Media Manager Improvements

**Current:** Upload, categorize (team, portfolio, services, hero, testimonials, misc), paginate.

### New Features to Add
- **Folder / Album View** — Organize media into virtual folders
- **Image Search** — Search by filename or alt text
- **Bulk Delete** — Select multiple files and delete at once
- **Usage Tracking** — Show which content items are using a particular image
- **Image Details Panel** — Preview, dimensions, file size, upload date, used-in info
- **Alt Text Editor** — Edit alt text inline for SEO
- **Image Crop / Resize** — Basic image manipulation before saving
- **Drag-and-drop Upload** — Multi-file drag-and-drop upload zone

---

## Feature 12 — SEO & Meta Tags Manager

**Purpose:** Control page-level SEO settings for all public pages without touching code.

### Settings per Page
| Field | Type |
|---|---|
| Page | Select (Home, About, Services, Contact, Blog, etc.) |
| Meta Title | Text (60 char limit hint) |
| Meta Description | Textarea (160 char limit hint) |
| Keywords | Tag input |
| Canonical URL | URL |
| OG Title | Text |
| OG Description | Textarea |
| OG Image | Media picker |
| Twitter Card Type | Select |
| Index / No-Index | Toggle |

### Global SEO
- robots.txt editor
- Sitemap.xml generation and download
- Google Site Verification tag
- Google Analytics Measurement ID setting

---

## Feature 13 — Site Settings Manager

**Purpose:** Central place to manage global website configuration.

### Sections
| Setting | Fields |
|---|---|
| **Company Info** | Name, tagline, phone, email, address, registration number |
| **Social Media Links** | LinkedIn, Instagram, Facebook, YouTube, Twitter/X, GitHub |
| **Logo & Favicon** | Upload logo (light/dark variants), favicon |
| **Contact Details** | WhatsApp number, support email, business email |
| **Google Maps** | Embed code or coordinates for contact page map |
| **Business Hours** | Days and time ranges |
| **Cookie Banner** | Enable/disable, banner text editor |
| **Maintenance Mode** | Toggle — shows maintenance page to public |
| **Analytics** | Google Analytics ID, Facebook Pixel ID |
| **SMTP / Email Config** | SMTP host, port, user for sending emails |

---

## Feature 14 — Navigation Menu Manager

**Purpose:** Control navbar links, footer links, and page visibility without code changes.

### Navbar Manager
- Add / remove / reorder nav links
- Internal anchor (#section) or page route (/about)
- Show / hide items based on page
- CTA button label and link

### Footer Manager
- Edit all 4 footer link columns (Services, Company, Resources, Connect)
- Add / remove / rename links per column
- Social media icons and URLs

---

## Feature 15 — Admin User Management

**Purpose:** Support multiple admin users with different access levels.

### User Roles
| Role | Access |
|---|---|
| **Super Admin** | Full access — all features including user management |
| **Content Editor** | Can edit content, media, blog, services, team — cannot manage users or settings |
| **Support Agent** | Contact messages only — read and reply |
| **Viewer** | Read-only access to dashboard and analytics |

### Features
- Invite new admin via email
- Change password
- Deactivate / reactivate user accounts
- Activity log per user (who changed what and when)
- Last login timestamp

---

## Feature 16 — Notifications Center

**Purpose:** Keep admins informed of important events without leaving the panel.

### Notification Types
- New contact message received
- New job application submitted
- New testimonial submitted (if future frontend form)
- Content item updated by another admin
- Media storage usage threshold warning

### Settings
- In-app notification bell with unread count
- Per-notification email toggle
- Daily digest email option

---

## Feature 17 — Analytics & Reports (Optional / Phase 2)

**Purpose:** Basic reporting without needing to open Google Analytics separately.

### Embedded Reports
- Page traffic overview (via Google Analytics Data API)
- Top traffic sources
- Most visited pages
- Geographic distribution of visitors
- Conversion rate from contact form submissions

### Generated Reports
- Monthly contact leads report (CSV export)
- Job applications summary export
- Content update history report

---

## Implementation Priority Roadmap

| Priority | Feature | Effort |
|---|---|---|
| **P1 — Critical** | Services Manager | Medium |
| **P1 — Critical** | Team Members Manager | Medium |
| **P1 — Critical** | Site Settings Manager | Medium |
| **P1 — Critical** | Contact Messages — Reply & Export | Low |
| **P2 — High** | Portfolio Manager | Medium |
| **P2 — High** | Testimonials Manager | Low |
| **P2 — High** | Stats / Numbers Manager | Low |
| **P2 — High** | Career / Jobs Manager | High |
| **P2 — High** | Navigation Menu Manager | Medium |
| **P3 — Medium** | Blog / News Manager | High |
| **P3 — Medium** | Pricing Plans Manager | Low |
| **P3 — Medium** | SEO & Meta Tags Manager | Medium |
| **P3 — Medium** | Admin User Management (Roles) | High |
| **P4 — Low** | Media Manager Improvements | Medium |
| **P4 — Low** | Notifications Center | Medium |
| **P4 — Low** | Analytics & Reports | High |

---

## Suggested Admin Sidebar Structure (Final)

```
📊  Dashboard
─────────────────────
📄  Content
    ├── Site Settings
    ├── Navigation Menu
    └── SEO & Meta Tags
─────────────────────
🧩  Sections
    ├── Services
    ├── Team Members
    ├── Portfolio
    ├── Testimonials
    ├── Stats / Numbers
    └── Pricing Plans
─────────────────────
✉️  Leads & Engagement
    ├── Contact Messages
    └── Newsletter Subscribers
─────────────────────
💼  Careers
    ├── Job Listings
    └── Applications
─────────────────────
📝  Blog
    ├── Posts
    └── Categories & Tags
─────────────────────
🖼️  Media Manager
─────────────────────
👥  Admin Users
─────────────────────
🔔  Notifications
```

---

## Tech Notes for Implementation

- **Rich Text Editor:** Use [TipTap](https://tiptap.dev/) or [Quill](https://quilljs.com/) — both have React wrappers
- **Drag-and-drop Sorting:** Use `@dnd-kit/sortable` (already compatible with React 18)
- **Image Upload:** Cloudinary free tier or store in MongoDB GridFS — current local approach needs to scale
- **Email Sending (Reply from admin):** Use Nodemailer with existing SMTP config on backend
- **Role-Based Auth:** Extend existing JWT payload to include `role` field; add middleware guards per route
- **Form Validation:** Use `react-hook-form` + `zod` for all admin forms
- **State Management:** React Query (`@tanstack/react-query`) for server state — eliminates manual fetch/useEffect patterns
