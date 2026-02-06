import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../../public/logo-rmbg.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Career', path: '/career' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-green-400 to-blue-600 backdrop-blur-lg shadow-lg border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 z-50 "
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <img src={logo} alt="Logo"  className='h-[55px] object-contain scale-125 lg:scale-150'/>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all relative font-semibold text-sm ${
                    isActive 
                      ? 'text-white bg-white/20' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="block"
                >
                  {link.name}
                </motion.span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <Link to="/contact" className="hidden lg:block">
            <motion.div
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-white/30 hover:bg-white/70"
              whileHover={{ scale: 1.05}}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors z-50"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-0.5 bg-white rounded-full origin-center"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-full h-0.5 bg-white rounded-full"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-0.5 bg-white rounded-full origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0  w-full sm:w-80 bg-dark-900/98 backdrop-blur-xl border-l border-white/10 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full p-6 pt-24 bg-white">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-2 mb-8  ">
                  {navLinks.map((link, index) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        `group px-4 py-3 rounded-xl transition-all relative overflow-hidden ${
                          isActive ? 'text-blue-500 bg-white/50' : 'text-black-400/60 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="relative z-10 flex items-center justify-between">
                            <span className="text-lg font-medium">{link.name}</span>
                            <svg
                              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                          <div className={`absolute inset-0 bg-gradient-to-r from-neon-green/10 to-neon-blue/10 transition-opacity ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`} />
                        </motion.div>
                      )}
                    </NavLink>
                  ))}
                </nav>

                {/* Mobile CTA Button */}
                <Link to="/contact" onClick={handleNavClick}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className=" px-6 py-3 text-center text-base font-semibold rounded-full bg-gradient-to-r from-green-400 to-orange-500 hover:bg-white w-full"
                  >
                    Get Started
                  </motion.div>
                </Link>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-auto pt-8 border-t border-white/10"
                >
                  {/* <h3 className="text-white font-semibold mb-4">Get in Touch</h3> */}
                  {/* <div className="space-y-3">
                    <a
                      href="mailto:info@infotattva.com"
                      className="flex items-center gap-3 text-gray-400 hover:text-neon-green transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">info@infotattva.com</span>
                    </a>
                    <a
                      href="tel:+911234567890"
                      className="flex items-center gap-3 text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-sm">+91 123 456 7890</span>
                    </a>
                  </div> */}

                  {/* Social Links */}
                  {/* <div className="flex items-center gap-3 mt-6">
                    {[
                      { icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', label: 'Twitter' },
                      { icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', label: 'LinkedIn' },
                      { icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z', label: 'Telegram' },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={social.icon} />
                        </svg>
                      </a>
                    ))}
                  </div> */}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;