import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "E-commerce Revolution",
    category: "SEO & PPC",
    description:
      "Increased online sales by 340% through strategic SEO and targeted PPC campaigns.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    stats: { growth: "340%", traffic: "150K", roi: "450%" },
    color: "from-neon-green to-emerald-500",
  },
  {
    id: 2,
    title: "SaaS Brand Launch",
    category: "Social Media",
    description:
      "Built a community of 100K+ followers and generated $2M in first-year revenue.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    stats: { growth: "100K", traffic: "2M", roi: "380%" },
    color: "from-neon-blue to-cyan-500",
  },
  {
    id: 3,
    title: "Healthcare Digital Transformation",
    category: "Full Service",
    description:
      "Complete digital overhaul resulting in 5x patient inquiries and brand recognition.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    stats: { growth: "500%", traffic: "80K", roi: "290%" },
    color: "from-neon-purple to-violet-500",
  },
  {
    id: 4,
    title: "Fintech Startup Growth",
    category: "PPC & Email",
    description:
      "Scaled user acquisition from 1K to 50K monthly active users in 6 months.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    stats: { growth: "5000%", traffic: "50K", roi: "520%" },
    color: "from-neon-pink to-rose-500",
  },
  {
    id: 5,
    title: "Luxury Real Estate",
    category: "Content & SEO",
    description:
      "Positioned as market leader with 200% increase in qualified leads.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    stats: { growth: "200%", traffic: "35K", roi: "310%" },
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 6,
    title: "EdTech Platform",
    category: "Full Service",
    description:
      "Achieved 1M+ course enrollments through integrated digital strategy.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    stats: { growth: "1M+", traffic: "500K", roi: "680%" },
    color: "from-teal-500 to-emerald-500",
  },
];

const categories = [
  "All",
  "SEO & PPC",
  "Social Media",
  "Full Service",
  "PPC & Email",
  "Content & SEO",
];

const Portfolio = ({ onHover, onLeave }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const containerRef = useRef(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative py-20 lg:py-28 overflow-hidden"
      ref={containerRef}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
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
            Our Portfolio
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-white">Success Stories That</span>
            <br />
            <span className="gradient-text">Inspire Action</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            Explore our portfolio of transformative digital marketing campaigns
            that delivered exceptional results for our clients.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-neon-green to-neon-blue text-dark-950"
                  : "glass text-gray-300 hover:text-white"
              }`}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
                onMouseEnter={() => {
                  setHoveredProject(project.id);
                  onHover();
                }}
                onMouseLeave={() => {
                  setHoveredProject(null);
                  onLeave();
                }}
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                  {/* Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Category Badge */}
                    <motion.span
                      className={`self-start px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.color} text-dark-950 mb-4`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        hoveredProject === project.id
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                    >
                      {project.category}
                    </motion.span>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-green group-hover:to-neon-blue transition-all duration-300">
                      {project.title}
                    </h3>
                    <motion.p
                      className="text-gray-400 text-sm mb-4"
                      initial={{ opacity: 0 }}
                      animate={
                        hoveredProject === project.id
                          ? { opacity: 1 }
                          : { opacity: 0 }
                      }
                    >
                      {project.description}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        hoveredProject === project.id
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 0.1 }}
                    >
                      <div className="text-center">
                        <div className="text-neon-green font-bold">
                          {project.stats.growth}
                        </div>
                        <div className="text-gray-500 text-xs">Growth</div>
                      </div>
                      <div className="text-center">
                        <div className="text-neon-blue font-bold">
                          {project.stats.traffic}
                        </div>
                        <div className="text-gray-500 text-xs">Traffic</div>
                      </div>
                      <div className="text-center">
                        <div className="text-neon-purple font-bold">
                          {project.stats.roi}
                        </div>
                        <div className="text-gray-500 text-xs">ROI</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* View Project Button */}
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      hoveredProject === project.id
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center`}
                    >
                      <svg
                        className="w-5 h-5 text-dark-950"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.button
            className="btn-outline"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
