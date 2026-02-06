
import { useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "SEO Optimization",
    description:
      "Dominate search rankings with our advanced SEO strategies. We boost your visibility and drive organic traffic that converts.",
    color: "from-neon-green to-emerald-400",
    features: [
      "Keyword Research",
      "On-Page SEO",
      "Link Building",
      "Technical Audit",
    ],
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
        />
      </svg>
    ),
    title: "Social Media Marketing",
    description:
      "Build your brand presence across all platforms. Engage your audience with compelling content that drives results.",
    color: "from-neon-blue to-cyan-400",
    features: [
      "Content Strategy",
      "Community Management",
      "Paid Campaigns",
      "Analytics",
    ],
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 2a10 10 0 00-10 10c0 5.25 4.25 9.5 9.5 9.5S22 17.25 22 12 17.75 2 12 2z"
        />
      </svg>
    ),
    title: "Cybersecurity",
    description:
      "Protect your digital assets with our comprehensive cybersecurity solutions. We safeguard your data and ensure compliance with industry standards.",
    color: "from-red-500 to-red-700",
    features: [
      "Threat Detection",
      "Incident Response",
      "Compliance Management",
      "Security Awareness Training",
    ],
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 2a10 10 0 00-10 10c0 5.25 4.25 9.5 9.5 9.5S22 17.25 22 12 17.75 2 12 2z"
        />
      </svg>
    ),
    title: "Artificial Intelligence",
    description:
      "Leverage AI to enhance your business processes. Our AI solutions drive efficiency and innovation across various sectors.",
    color: "from-blue-500 to-blue-700",
    features: [
      "Machine Learning",
      "Natural Language Processing",
      "Predictive Analytics",
      "Automation",
    ],
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg>
    ),
    title: "PPC Advertising",
    description:
      "Maximize ROI with targeted pay-per-click campaigns. Every click counts when you partner with our data-driven team.",
    color: "from-neon-purple to-violet-400",
    features: ["Google Ads", "Facebook Ads", "Retargeting", "A/B Testing"],
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Email Marketing",
    description:
      "Create personalized email campaigns that nurture leads and convert customers. Automation meets creativity.",
    color: "from-neon-pink to-rose-400",
    features: ["Drip Campaigns", "Newsletters", "Automation", "Segmentation"],
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
    title: "Analytics & Reporting",
    description:
      "Make informed decisions with comprehensive analytics. Track, measure, and optimize your marketing performance.",
    color: "from-neon-orange to-amber-400",
    features: [
      "Real-time Dashboards",
      "Custom Reports",
      "ROI Tracking",
      "Insights",
    ],
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Web Development",
    description:
      "Stunning, high-performance websites that captivate visitors and convert them into loyal customers.",
    color: "from-emerald-400 to-teal-400",
    features: [
      "Responsive Design",
      "E-commerce",
      "CMS Integration",
      "Performance",
    ],
  },
];

const Services = ({ onHover, onLeave }) => {
  const containerRef = useRef(null);

  return (
    <section id="services" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-neon-green text-sm mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Services
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-white">Solutions That</span>
            <br />
            <span className="gradient-text">Drive Growth</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            Comprehensive digital marketing solutions tailored to elevate your
            brand and achieve your business objectives.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
              className="group relative"
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              <div className="relative h-full p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl glass overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,255,136,0.2)]">
                {/* Gradient Overlay on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-4 md:mb-6`}
                >
                  <div className="w-full h-full rounded-2xl bg-dark-950 flex items-center justify-center text-white">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <motion.div
                  className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1, x: 5 }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.div>

                {/* Border Gradient Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                >
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-20`}
                    style={{ padding: "1px" }}
                  >
                    <div className="w-full h-full rounded-3xl bg-dark-950" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
