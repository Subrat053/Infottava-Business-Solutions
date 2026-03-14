/**
 * Mock API using localStorage for data persistence.
 * This simulates a backend for the admin panel.
 */

// --- Helpers ---

const getFromStorage = (key, defaultValue) => {
  try {
    const item = window.localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    // If no item, set the default value in storage
    window.localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage for key "${key}":`, error);
  }
};

// --- Default Data (used to seed localStorage) ---

const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const DEFAULT_SERVICES = [
  {
    id: 1,
    title: "Web Development",
    slug: "web-development",
    icon: "💻",
    shortDescription:
      "Build powerful, scalable web applications with modern technologies.",
    fullDescription:
      "Build powerful, scalable web applications with modern technologies. From responsive websites to complex web platforms, we deliver solutions that drive business growth and enhance user engagement.",
    description:
      "Build powerful, scalable web applications with modern technologies. From responsive websites to complex web platforms, we deliver solutions that drive business growth and enhance user engagement.",
    features: [
      "Responsive Design",
      "SEO Optimized",
      "Fast Performance",
      "Custom CMS Integration",
    ],
    gradient: "from-blue-500 via-blue-600 to-cyan-600",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    status: "active",
    order: 0,
  },
  {
    id: 2,
    title: "App Development",
    slug: "app-development",
    icon: "📱",
    shortDescription:
      "Create stunning native and cross-platform mobile applications for iOS and Android.",
    fullDescription:
      "Create stunning native and cross-platform mobile applications for iOS and Android. Deliver seamless user experiences that keep customers engaged and drive conversions.",
    description:
      "Create stunning native and cross-platform mobile applications for iOS and Android. Deliver seamless user experiences that keep customers engaged and drive conversions.",
    features: [
      "Cross-Platform",
      "Native Performance",
      "Push Notifications",
      "Offline Support",
    ],
    gradient: "from-purple-500 via-purple-600 to-pink-600",
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80",
    status: "active",
    order: 1,
  },
  {
    id: 3,
    title: "Cybersecurity",
    slug: "cybersecurity",
    icon: "🔒",
    shortDescription:
      "Protect your digital assets with comprehensive security solutions.",
    fullDescription:
      "Protect your digital assets with comprehensive security solutions. From threat detection to compliance management, we safeguard your business against evolving cyber threats.",
    description:
      "Protect your digital assets with comprehensive security solutions. From threat detection to compliance management, we safeguard your business against evolving cyber threats.",
    features: [
      "Threat Detection",
      "Compliance Management",
      "Security Audits",
      "24/7 Monitoring",
    ],
    gradient: "from-red-500 via-orange-500 to-yellow-500",
    coverImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
    status: "active",
    order: 2,
  },
  {
    id: 4,
    title: "Digital Marketing",
    slug: "digital-marketing",
    icon: "📊",
    shortDescription:
      "Amplify your online presence with data-driven marketing strategies.",
    fullDescription:
      "Amplify your online presence with data-driven marketing strategies. SEO, social media, PPC, and content marketing solutions designed to grow your brand and increase ROI.",
    description:
      "Amplify your online presence with data-driven marketing strategies. SEO, social media, PPC, and content marketing solutions designed to grow your brand and increase ROI.",
    gradient: "from-green-500 via-emerald-600 to-teal-600",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    features: [
      "SEO & SEM",
      "Social Media Marketing",
      "Content Strategy",
      "Analytics & Reporting",
    ],
    status: "active",
    order: 3,
  },
  {
    id: 5,
    title: "AI Driven Services",
    slug: "ai-driven-services",
    icon: "🤖",
    shortDescription:
      "Harness the power of artificial intelligence and machine learning.",
    fullDescription:
      "Harness the power of artificial intelligence and machine learning. From intelligent chatbots to predictive analytics, transform your business operations with cutting-edge AI solutions.",
    description:
      "Harness the power of artificial intelligence and machine learning. From intelligent chatbots to predictive analytics, transform your business operations with cutting-edge AI solutions.",
    gradient: "from-indigo-500 via-purple-600 to-pink-600",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80",
    features: [
      "Machine Learning",
      "Natural Language Processing",
      "Predictive Analytics",
      "Computer Vision",
    ],
    status: "active",
    order: 4,
  },
  {
    id: 6,
    title: "Game Development",
    slug: "game-development",
    icon: "🎮",
    shortDescription:
      "Design and develop engaging games for mobile, web, and desktop platforms.",
    fullDescription:
      "Design and develop engaging games for mobile, web, and desktop platforms. Create immersive gaming experiences with stunning graphics, smooth gameplay, and innovative mechanics.",
    description:
      "Design and develop engaging games for mobile, web, and desktop platforms. Create immersive gaming experiences with stunning graphics, smooth gameplay, and innovative mechanics.",
    gradient: "from-pink-500 via-rose-600 to-red-600",
    coverImage:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&auto=format&fit=crop&q=80",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&auto=format&fit=crop&q=80",
    features: [
      "2D & 3D Games",
      "Multiplayer Support",
      "Cross-Platform",
      "Game Monetization",
    ],
    status: "active",
    order: 5,
  },
];

const normalizeService = (service, fallbackOrder = 0) => {
  const slug = service.slug || slugify(service.title || service.id || `service-${fallbackOrder + 1}`);
  const description =
    service.description ||
    service.shortDescription ||
    service.fullDescription ||
    "";
  const image = service.image || service.coverImage || "";

  return {
    ...service,
    slug,
    id: typeof service.id === "number" ? service.id : fallbackOrder + 1,
    description,
    shortDescription: service.shortDescription || description,
    fullDescription: service.fullDescription || description,
    image,
    coverImage: service.coverImage || image,
    status: service.status || "active",
    order: Number.isFinite(service.order) ? service.order : fallbackOrder,
  };
};

const mergeServicesWithDefaults = (storedServices) => {
  const normalizedDefaults = DEFAULT_SERVICES.map((service, index) =>
    normalizeService(service, index),
  );

  if (!Array.isArray(storedServices)) {
    return normalizedDefaults;
  }

  const normalizedStored = storedServices.map((service, index) =>
    normalizeService(service, index),
  );

  const storedBySlug = new Map(
    normalizedStored.map((service) => [service.slug, service]),
  );

  const mergedDefaults = normalizedDefaults.map((defaultService, index) => {
    const existingService = storedBySlug.get(defaultService.slug);
    return {
      ...defaultService,
      ...(existingService || {}),
      id: existingService?.id ?? defaultService.id,
      order: index,
    };
  });

  const defaultSlugs = new Set(
    normalizedDefaults.map((service) => service.slug),
  );

  const customServices = normalizedStored
    .filter((service) => !defaultSlugs.has(service.slug))
    .sort((a, b) => a.order - b.order)
    .map((service, index) => ({
      ...service,
      order: mergedDefaults.length + index,
    }));

  return [...mergedDefaults, ...customServices];
};

const DEFAULT_TEAM = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "CEO & Founder",
    department: "Executive",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    bio: "Visionary leader with over 15 years of experience in digital transformation and business strategy.",
    linkedin: "https://linkedin.com",
    email: "alex@infotattva.com",
    gradient: "from-blue-600 to-indigo-600",
    status: "active",
    order: 0,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "CTO",
    department: "Engineering",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    bio: "Tech enthusiast passionate about building scalable architectures and AI-driven solutions.",
    linkedin: "https://linkedin.com",
    email: "sarah@infotattva.com",
    gradient: "from-emerald-500 to-teal-500",
    status: "active",
    order: 1,
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Head of Design",
    department: "Design",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    bio: "Award-winning designer focused on creating intuitive and beautiful user experiences.",
    linkedin: "https://linkedin.com",
    email: "michael@infotattva.com",
    gradient: "from-purple-500 to-pink-500",
    status: "draft",
    order: 2,
  },
];

const DEFAULT_PORTFOLIO = [
  {
    id: 1,
    title: "E-commerce Platform",
    client: "Fashionista Inc.",
    categories: ["Web", "E-commerce"],
    thumbnail:
      "https://images.unsplash.com/photo-1522199755839-a28e8e540b7d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522199755839-a28e8e540b7d?auto=format&fit=crop&w=800&q=80",
    ],
    shortDescription:
      "A modern e-commerce site with a custom CMS and integrated payment gateway.",
    fullCaseStudy: "Full case study text goes here. It supports markdown.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    metrics: [
      { key: "Conversion Rate", value: "+25%" },
      { key: "Page Load Time", value: "-40%" },
    ],
    liveUrl: "https://example.com",
    status: "published",
    featured: true,
    order: 0,
  },
  {
    id: 2,
    title: "Mobile Banking App",
    client: "FinSecure",
    categories: ["App", "Fintech"],
    thumbnail:
      "https://images.unsplash.com/photo-1556742218-6b2b89e2b4a4?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    shortDescription:
      "Secure and intuitive mobile banking application for iOS and Android.",
    fullCaseStudy: "Detailed analysis of the project.",
    technologies: ["Flutter", "Firebase", "Biometric Auth"],
    metrics: [{ key: "User Adoption", value: "100k in 3 months" }],
    liveUrl: "",
    status: "published",
    featured: false,
    order: 1,
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    clientName: "Jane Doe",
    company: "TechCorp",
    designation: "CEO",
    rating: 5,
    review:
      "Infotattva's team delivered an outstanding product. Their expertise and dedication are unmatched. Highly recommended!",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    status: "approved",
    featured: true,
    order: 0,
  },
  {
    id: 2,
    clientName: "John Smith",
    company: "Innovate LLC",
    designation: "Marketing Director",
    rating: 4,
    review:
      "A great experience working with them. They are professional, responsive, and delivered on time.",
    photo:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    status: "approved",
    featured: false,
    order: 1,
  },
];

const DEFAULT_STATS = [
  {
    id: 1,
    label: "Projects Completed",
    value: 400,
    suffix: "+",
    icon: "📊",
    order: 0,
  },
  {
    id: 2,
    label: "Happy Clients",
    value: 250,
    suffix: "+",
    icon: "😊",
    order: 1,
  },
  { id: 3, label: "Expert Team", value: 15, suffix: "+", icon: "👥", order: 2 },
  {
    id: 4,
    label: "Years Experience",
    value: 8,
    suffix: "+",
    icon: "🏆",
    order: 3,
  },
];

const DEFAULT_PRICING = {
  isEnabled: true,
  plans: [
    {
      id: 1,
      planName: "Starter",
      price: 29,
      billingCycle: "monthly",
      shortDescription: "For individuals and small teams getting started.",
      features: [
        { text: "10 Projects", available: true },
        { text: "5 GB Storage", available: true },
        { text: "Basic Analytics", available: true },
        { text: "Email Support", available: true },
        { text: "24/7 Support", available: false },
      ],
      ctaLabel: "Choose Starter",
      ctaLink: "#",
      highlighted: false,
      status: "active",
    },
    {
      id: 2,
      planName: "Pro",
      price: 99,
      billingCycle: "monthly",
      shortDescription: "For growing businesses that need more power.",
      features: [
        { text: "Unlimited Projects", available: true },
        { text: "50 GB Storage", available: true },
        { text: "Advanced Analytics", available: true },
        { text: "Priority Email Support", available: true },
        { text: "24/7 Support", available: true },
      ],
      ctaLabel: "Choose Pro",
      ctaLink: "#",
      highlighted: true,
      status: "active",
    },
  ],
};

const DEFAULT_JOBS = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote / Hybrid",
    experience: "5+ years",
    salary: "$80k - $120k",
    description:
      "We are looking for an experienced Full Stack Developer to join our core team.",
    responsibilities: ["Architect scalable solutions", "Lead code reviews"],
    requirements: ["React & Node.js expert", "AWS experience"],
    deadline: "2024-12-31",
    status: "open",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    location: "On-site",
    experience: "3+ years",
    salary: "$60k - $90k",
    description:
      "Create intuitive and beautiful user experiences for our products.",
    responsibilities: [
      "Create wireframes & prototypes",
      "Conduct user research",
    ],
    requirements: ["Figma mastery", "Portfolio required"],
    deadline: "2024-11-30",
    status: "closed",
  },
];

const DEFAULT_APPLICATIONS = [
  {
    id: 101,
    jobId: 1,
    applicantName: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    resume: "john_resume.pdf",
    status: "new",
    appliedDate: "2024-10-15",
    notes: "",
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
    notes: "Strong technical skills, scheduled technical round.",
  },
];

const DEFAULT_MESSAGES = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    subject: "Inquiry about Web Development",
    message:
      "Hi, I'm interested in your web development services for my startup.",
    date: "2024-10-24T10:30:00",
    status: "unread",
    stage: "lead",
    notes: [],
    isArchived: false,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@company.com",
    subject: "Partnership Opportunity",
    message: "We are looking for a tech partner for our upcoming project.",
    date: "2024-10-23T14:15:00",
    status: "read",
    stage: "prospect",
    notes: [
      {
        text: "Sent initial proposal on 25th Oct",
        date: "2024-10-25T09:00:00",
      },
    ],
    isArchived: false,
  },
];

const DEFAULT_MEDIA = [
  {
    id: 1,
    name: "hero-banner.jpg",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    folder: "misc",
    size: "2.4 MB",
    dimensions: "1920x1080",
    date: "2023-10-01",
    alt: "Hero Background",
    type: "image/jpeg",
    usedIn: ["Home Page", "About Us"],
  },
  {
    id: 2,
    name: "team-meeting.jpg",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    folder: "team",
    size: "1.8 MB",
    dimensions: "1200x800",
    date: "2023-10-05",
    alt: "Team Meeting",
    type: "image/jpeg",
    usedIn: ["About Us"],
  },
];

const DEFAULT_SITE_SETTINGS = {
  company: {
    name: "Infottava Business Solutions",
    tagline: "Transforming businesses through innovative digital solutions.",
    registration: "U62099OD2026OPC052146",
    gst: "21AAICI6330E1Z1",
    logoLight: "",
    logoDark: "",
    favicon: "",
  },
  contact: {
    phone: "+91 9114956222",
    email: "contact@infotattvabusinesssolutions.com",
    supportEmail: "support@infotattva.com",
    whatsapp: "+91 9114956222",
    address: "1010, 4th Floor Rasulgarh, Bhubaneswar, India",
    mapEmbed:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.187587745186!2d85.85604267109483!3d20.292501103528494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190b209f372e11%3A0xde69b3e11e31bc20!2sAnantam%20Residency!5e0!3m2!1sen!2sin!4v1771931660921!5m2!1sen!2sin" ...></iframe>',
  },
  social: {
    linkedin: "https://linkedin.com/company/infotattva",
    instagram: "https://instagram.com/infotattva",
    facebook: "https://facebook.com/infotattva",
    youtube: "",
    twitter: "",
    github: "",
  },
  hours: {
    weekdays: "9:00 AM - 6:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Closed",
  },
  integrations: {
    googleAnalytics: "UA-XXXXXXXXX-X",
    facebookPixel: "",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "admin@infotattva.com",
  },
  advanced: {
    maintenanceMode: false,
    cookieBanner: true,
    cookieText:
      "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
  },
};

const DEFAULT_NAVIGATION = {
  navLinks: [
    { id: 1, name: "Home", path: "/", type: "link", visible: true, order: 0 },
    {
      id: 2,
      name: "About",
      path: "/about",
      type: "link",
      visible: true,
      order: 1,
    },
    {
      id: 3,
      name: "Services",
      path: "/services",
      type: "link",
      visible: true,
      order: 2,
    },
    {
      id: 4,
      name: "Career",
      path: "/career",
      type: "link",
      visible: true,
      order: 3,
    },
    {
      id: 5,
      name: "Contact",
      path: "/contact",
      type: "link",
      visible: true,
      order: 4,
    },
  ],
  ctaBtn: { label: "Get Started", path: "/contact", visible: true },
  footerCols: [
    {
      id: "company",
      title: "Company",
      links: [
        { id: 1, name: "Services", path: "/services" },
        { id: 2, name: "Careers", path: "/career" },
        { id: 3, name: "Contact", path: "/contact" },
        { id: 4, name: "About Us", path: "/about" },
      ],
    },
    {
      id: "services",
      title: "Services",
      links: [
        { id: 1, name: "Web Development", path: "/services/web-development" },
        { id: 2, name: "App Development", path: "/services/app-development" },
        { id: 3, name: "Cybersecurity", path: "/services/cybersecurity" },
        { id: 4, name: "Digital Marketing", path: "/services/digital-marketing" },
        { id: 5, name: "AI Driven Services", path: "/services/ai-driven-services" },
        { id: 6, name: "Game Development", path: "/services/game-development" },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      links: [
        { id: 1, name: "Privacy Policy", path: "/privacy" },
        { id: 2, name: "Terms of Service", path: "/terms" },
      ],
    },
  ],
  socials: [
    {
      id: 1,
      platform: "LinkedIn",
      url: "https://linkedin.com",
      icon: "Linkedin",
    },
    {
      id: 2,
      platform: "Instagram",
      url: "https://instagram.com",
      icon: "Instagram",
    },
    {
      id: 3,
      platform: "Facebook",
      url: "https://facebook.com",
      icon: "Facebook",
    },
  ],
};

const DEFAULT_USERS = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@infotattva.com",
    role: "Super Admin",
    status: "active",
    lastLogin: "2 mins ago",
    avatar: "https://i.pravatar.cc/150?u=admin",
  },
  {
    id: 2,
    name: "Sarah Content",
    email: "sarah@infotattva.com",
    role: "Content Editor",
    status: "active",
    lastLogin: "2 hours ago",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
];

const DEFAULT_NOTIFICATIONS = {
  list: [
    {
      id: 1,
      type: "message",
      title: "New Contact Message",
      message:
        'Alice Johnson sent a message regarding "Web Development Inquiry".',
      time: "5 mins ago",
      read: false,
    },
    {
      id: 2,
      type: "job",
      title: "New Job Application",
      message: 'John Doe applied for "Senior Full Stack Developer".',
      time: "1 hour ago",
      read: false,
    },
  ],
  settings: {
    emailAlerts: true,
    dailyDigest: false,
    jobAlerts: true,
    messageAlerts: true,
  },
};

// --- API Functions ---

export const getServices = () => {
  const storedServices = getFromStorage("services", DEFAULT_SERVICES);
  const mergedServices = mergeServicesWithDefaults(storedServices);

  if (JSON.stringify(storedServices) !== JSON.stringify(mergedServices)) {
    saveToStorage("services", mergedServices);
  }

  return mergedServices;
};
export const saveServices = (services) => saveToStorage("services", services);

export const getTeam = () => getFromStorage("team", DEFAULT_TEAM);
export const saveTeam = (team) => saveToStorage("team", team);

export const getPortfolio = () =>
  getFromStorage("portfolio", DEFAULT_PORTFOLIO);
export const savePortfolio = (portfolio) =>
  saveToStorage("portfolio", portfolio);

export const getTestimonials = () =>
  getFromStorage("testimonials", DEFAULT_TESTIMONIALS);
export const saveTestimonials = (testimonials) =>
  saveToStorage("testimonials", testimonials);

export const getStats = () => getFromStorage("stats", DEFAULT_STATS);
export const saveStats = (stats) => saveToStorage("stats", stats);

export const getPricing = () => getFromStorage("pricing", DEFAULT_PRICING);
export const savePricing = (pricing) => saveToStorage("pricing", pricing);

export const getJobs = () => getFromStorage("jobs", DEFAULT_JOBS);
export const saveJobs = (jobs) => saveToStorage("jobs", jobs);

export const getApplications = () =>
  getFromStorage("applications", DEFAULT_APPLICATIONS);
export const saveApplications = (applications) =>
  saveToStorage("applications", applications);

export const getMessages = () => getFromStorage("messages", DEFAULT_MESSAGES);
export const saveMessages = (messages) => saveToStorage("messages", messages);

export const getMedia = () => getFromStorage("media", DEFAULT_MEDIA);
export const saveMedia = (media) => saveToStorage("media", media);

export const getSiteSettings = () =>
  getFromStorage("siteSettings", DEFAULT_SITE_SETTINGS);
export const saveSiteSettings = (settings) =>
  saveToStorage("siteSettings", settings);

export const getNavigation = () =>
  getFromStorage("navigation", DEFAULT_NAVIGATION);
export const saveNavigation = (navigation) =>
  saveToStorage("navigation", navigation);

export const getUsers = () => getFromStorage("users", DEFAULT_USERS);
export const saveUsers = (users) => saveToStorage("users", users);

export const getNotifications = () =>
  getFromStorage("notifications", DEFAULT_NOTIFICATIONS);
export const saveNotifications = (notifications) =>
  saveToStorage("notifications", notifications);

/**
 * Fetches all content for the public-facing site.
 * In a real app, this would be a single API call.
 */
export const getSiteContent = () => {
  return {
    services: getServices()
      .filter((s) => s.status === "active")
      .sort((a, b) => a.order - b.order)
      .map((service) => {
        const slug = service.slug || slugify(service.title || service.id);
        const description =
          service.description ||
          service.shortDescription ||
          service.fullDescription ||
          "";
        const image = service.image || service.coverImage || "";

        return {
          ...service,
          id: slug,
          slug,
          description,
          shortDescription: service.shortDescription || description,
          fullDescription: service.fullDescription || description,
          image,
          coverImage: service.coverImage || image,
        };
      }),
    team: getTeam()
      .filter((t) => t.status === "active")
      .sort((a, b) => a.order - b.order),
    portfolio: getPortfolio()
      .filter((p) => p.status === "published")
      .sort((a, b) => a.order - b.order),
    testimonials: getTestimonials()
      .filter((t) => t.status === "approved")
      .sort((a, b) => a.order - b.order),
    stats: getStats().sort((a, b) => a.order - b.order),
    pricing: getPricing(),
    jobs: getJobs().filter((j) => j.status === "open"),
    settings: getSiteSettings(),
    navigation: getNavigation(),
  };
};
