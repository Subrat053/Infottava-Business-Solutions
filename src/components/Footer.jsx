import { motion } from "framer-motion";

const Footer = ({ onHover, onLeave }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      "SEO Optimization",
      "Social Media",
      // "PPC Advertising",
      "Content Marketing",
      "Email Marketing",
      "Web Development",
    ],
    Company: [
      "About Us",
      "Careers",
      // "Case Studies",
      "Blog",
      // "Press Kit",
      "Partners",
    ],
    Resources: [
      // "Documentation",
      // "Help Center",
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Sitemap",
    ],
    Connect: [
      // "Twitter",
      "LinkedIn",
      "Instagram",
      "Facebook",
      "YouTube",
      // "Discord",
    ],
  };

  return (
    <footer className="relative pt-16 sm:pt-20 md:pt-24 pb-6 sm:pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 mb-10 sm:mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <motion.a
              href="#home"
              className="inline-flex flex-col mb-4 sm:mb-6"
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                <span className="text-neon-blue">Info</span>
                <span className="text-neon-green">tattva</span>
              </span>
              <span className="text-xs text-gray-500">
                Business Solutions (OPC) Pvt. Ltd.
              </span>
            </motion.a>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 max-w-xs leading-relaxed">
              Transforming businesses through innovative digital marketing
              strategies. Your success is our mission.
            </p>
            {/* Newsletter */}
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:border-neon-green focus:outline-none transition-colors"
                onFocus={onHover}
                onBlur={onLeave}
              />
              <motion.button
                className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-neon-green to-neon-blue text-dark-950 font-semibold text-xs sm:text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
              >
                Subscribe
              </motion.button>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={category} className="min-w-0">
              <h4 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">{category}</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-gray-400 text-xs sm:text-sm hover:text-neon-green transition-colors inline-block truncate max-w-full"
                      onMouseEnter={onHover}
                      onMouseLeave={onLeave}
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Awards & Certifications */}
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">
                Trusted & Certified
              </h4>
              <p className="text-gray-400 text-sm">
                Award-winning agency with global recognition
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 md:gap-6">
              {[
                "Google Partner",
                "Meta Business",
                "HubSpot",
                "Semrush",
                "Clutch Top",
              ].map((cert) => (
                <motion.div
                  key={cert}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 text-gray-300 text-xs sm:text-sm font-medium"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(0,255,136,0.1)",
                  }}
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                >
                  {cert}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-4 sm:gap-5 pt-6 sm:pt-8 border-t border-white/5">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <motion.a
              href="#"
              className="text-gray-400 text-xs sm:text-sm hover:text-neon-green transition-colors"
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              Privacy
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 text-xs sm:text-sm hover:text-neon-green transition-colors"
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              Terms
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 text-xs sm:text-sm hover:text-neon-green transition-colors"
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              Cookies
            </motion.a>
          </div>
          
          <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
            CIN{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-neon-pink"
            >
              -
            </motion.span>{" "}
            U62099OD2026OPC052146
          </div>
          <div className="text-gray-500 text-[10px] sm:text-xs text-center">
            © {currentYear} Infotattva Business Solutions (OPC) Pvt. Ltd. All
            rights reserved.
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-neon-green to-neon-blue flex items-center justify-center z-50 shadow-glow-green"
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <svg
          className="w-6 h-6 text-dark-950"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;
