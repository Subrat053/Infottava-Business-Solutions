import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "./ThemeContext";

const Navbar = ({ onHover, onLeave }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    // { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (theme === "night") {
      document.documentElement.classList.add("night");
    } else {
      document.documentElement.classList.remove("night");
    }
  }, [theme]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50  transition-all duration-500 ${theme === "night" ? "bg-[#4988C4]" : "bg-white"} ${isScrolled ? "glass-dark lg:py-5" : "lg:py-6"
          }`}
      >
        <div className="max-w-7xl h-[60px] lg:h-10 mx-auto px-6  flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="flex items-center gap-2"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            whileHover={{ scale: 1.02 }}
          >
            {/* <span className="text-xl md:text-2xl font-bold">
              <span className="text-neon-blue">Info</span>
              <span className="text-neon-green">tattva</span>
            </span> */}
            <img src="/logo-rmbg.png" alt="InfoTattva Logo" className="w-16 h-16 lg:scale-150 " />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                // className="relative text-[#479c4a] font-semibold text-lg hover:text-[#102C57] transition-colors animated-underline "
                className={`relative font-semibold text-lg transition-colors animated-underline ${theme === "night" ? "text-white" : "text-black"} ${isScrolled
                  ? "text-white hover:text-neon-green "
                  : "text-black hover:text-neon-green "
                  }`}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center ">
          {/* CTA Button */}
          <motion.button
            className={`hidden lg:block text-sm btn-primary`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>

          <motion.button
            onClick={toggleTheme}
            className="hidden lg:relative lg:-right-20  lg:flex  items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 hover:bg-gray-100 night:hover:bg-gray-800 transition-colors mr-4"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === "day" ? (
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm0 10a3 3 0 100-6 3 3 0 000 6zm6-3a1 1 0 110 2h-1a1 1 0 110-2h1zM4 10a1 1 0 110 2H3a1 1 0 110-2h1zm9.657-4.657a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM5.636 14.364a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM14.364 14.364a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM5.636 5.636a1 1 0 010 1.414l-.707.707A1 1 0 013.515 6.343l.707-.707a1 1 0 011.414 0z"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </motion.button>
            </div>
          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              // X Icon when open
              <svg
                className={`w-7 h-7 ${isScrolled ? "text-white" : "text-black"} `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon when closed
              <svg
                className={`w-8 h-8 ${isScrolled ? "text-white" : "text-black"} `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden overflow-hidden"
            style={{ backgroundColor: '#0a0a0f' }}
          >
            {/* Menu Content */}
            <div className="h-full pt-24 pb-8 px-6 flex flex-col" style={{ backgroundColor: '#0a0a0f' }}>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="py-4 px-4 rounded-lg border border-white/10 bg-white/5 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="text-base font-medium text-white">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Bottom Section */}
              <motion.div
                className="pt-6 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <button
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-neon-green/40 to-neon-blue text-dark-950 font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </button>
                <button
                  onClick={toggleTheme}
                  className="w-full py-4 px-6 rounded-xl border border-white/10 bg-white/5 text-white font-semibold flex items-center justify-center gap-2"
                >
                  {theme === "light" ? (
                    <>
                      <svg
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm0 10a3 3 0 100-6 3 3 0 000 6zm6-3a1 1 0 110 2h-1a1 1 0 110-2h1zM4 10a1 1 0 110 2H3a1 1 0 110-2h1zm9.657-4.657a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM5.636 14.364a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM14.364 14.364a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM5.636 5.636a1 1 0 010 1.414l-.707.707A1 1 0 013.515 6.343l.707-.707a1 1 0 011.414 0z"
                        />
                      </svg>

                      Light Mode
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      Dark Mode
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
