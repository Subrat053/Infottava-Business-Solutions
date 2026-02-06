import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../../public/logo-rmbg.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Company: [
            { name: "Services", path: "/services" },
            { name: "Careers", path: "/carrer" },
            { name: "Contact", path: "/contact" },
            { name: "About Us", path: "/about" },
        ],
        Services: [
            { name: "Web Development", path: "/services/web-development" },
            { name: "App Development", path: "/services/app-development" },
            { name: "Cybersecurity", path: "/services/cybersecurity" },
            { name: "Digital Marketing", path: "/services/digital-marketing" },
            { name: "AI Driven Services", path: "/services/ai-driven-services" },
            { name: "Game Development", path: "/services/game-development" },
        ],
        
        Resources: [
            { name: "Privacy Policy", path: "#" },
            { name: "Terms of Service", path: "#" },
            { name: "Cookie Policy", path: "#" },
            { name: "Sitemap", path: "#" },
        ],
        // Connect: [
        //     { name: "LinkedIn", path: "#" },
        //     { name: "Instagram", path: "#" },
        //     { name: "Facebook", path: "#" },
        //     { name: "YouTube", path: "#" },
        // ],
    };

    return (
        <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pt-20 pb-8 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            {/* Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-12 ">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 ">
                        {/* <Link to="/" className="inline-block mb-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">I</span>
                                </div>
                                <div>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                        Infotattva 
                                    </span>
                                    <p className="text-xs text-gray-400">Business Solutions</p>
                                </div>
                            </motion.div>
                        </Link> */}
                        <div className="flex p-2 rounded-lg items-start gap-3 mt-2 mb-6">
                            <img src={logo} alt="Infotattva Logo" className="h-20 shadow-sm bg-gray-400/50 rounded-lg" />
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mt-1.5">
                                Transforming businesses through innovative digital solutions. Your success is our mission.
                            </p>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-3">
                            <h4 className="text-white font-semibold text-sm">Stay Updated</h4>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-300 text-white placeholder-gray-500 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-2 lg:px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-orange-400 text-white font-semibold text-[12px] lg:text-sm shadow-lg hover:shadow-xl transition-all"
                                >
                                    Subscribe
                                </motion.button>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-3 text-center lg:text-left mt-2 lg:ml-12">
                        {/* Link Columns */}
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h4 className="text-white font-semibold text-base mb-4">{category}</h4>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                to={link.path}
                                                className="text-gray-400 text-sm hover:text-blue-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Media & Contact */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-gray-800">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm">Follow us:</span>
                        <div className="flex gap-3">
                            {[
                                { icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", label: "LinkedIn" },
                                { icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z", label: "Instagram" },
                                { icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", label: "Facebook" },
                                // { icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z", label: "YouTube" },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-500 flex items-center justify-center transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a href="mailto:contact@infotattvabusinesssolutions.com" className="text-gray-400 text-sm hover:text-blue-400 transition-colors">
                            contact@infotattvabusinesssolutions.com
                        </a>
                        <span className="hidden sm:inline text-gray-600">|</span>
                        <a href="tel:+919114956222" className="text-gray-400 text-sm hover:text-blue-400 transition-colors">
                            +91 9114956222
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800">
                    <div className="text-gray-200 text-[11px] lg:text-sm text-center md:text-left">
                        © {currentYear} Infotattva Business Solutions (OPC) Pvt. Ltd. All rights reserved.
                    </div>

                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <span>CIN:</span>
                        <span className="text-blue-400 font-mono">U62099OD2026OPC052146</span>
                    </div>

                    {/* <div className="flex gap-6">
                        <a href="#" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
                            Terms of Service
                        </a>
                    </div> */}
                </div>
            </div>

            {/* WhatsApp Contact Button with Pulse Animation */}
            <motion.div
                className="fixed bottom-8 right-8 z-50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {/* Pulsing Ring Effect */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-green-500"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 0, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Button */}
                <motion.a
                    href="https://wa.me/919114956222?text=Hi%20Infotattva%20Business%20Solutions!%20I'm%20interested%20in%20your%20services%20and%20would%20like%20to%20know%20more."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center shadow-2xl hover:shadow-green-400/60"
                    whileHover={{
                        scale: 1.15,
                        rotate: [0, -10, 10, -10, 0],
                        transition: { rotate: { duration: 0.5 } }
                    }}
                    whileTap={{ scale: 0.9 }}
                    // animate={{
                    //     y: [0, -8, 0],
                    // }}
                    transition={{
                        y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                >
                    {/* Inner glow */}
                    <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-sm"></div>

                    {/* WhatsApp Icon - Higher Resolution */}
                    <svg
                        className="w-9 h-9 text-white relative z-10 drop-shadow-lg"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.73 5.47 2.01 7.78L.07 31.12l7.51-1.97c2.2 1.14 4.68 1.79 7.42 1.79 8.84 0 16-7.16 16-16S24.84 0 16 0zm9.45 22.54c-.39 1.09-2.27 2-3.12 2.13-.84.13-1.68.38-5.64-1.21-5.08-2.03-8.35-7.15-8.6-7.48-.25-.33-2.05-2.73-2.05-5.21s1.3-3.7 1.76-4.2c.46-.5 1-0.63 1.33-.63.33 0 .67.01.96.02.31.01.72-.12 1.13.86.41.99 1.4 3.42 1.52 3.67.12.25.21.54.04.87-.17.33-.25.54-.5.83-.25.29-.52.65-.75.87-.25.25-.51.52-.22.99.29.46 1.3 2.14 2.79 3.46 1.91 1.7 3.53 2.23 4.03 2.48.5.25.79.21 1.08-.13.29-.33 1.25-1.46 1.58-1.96.33-.5.67-.42 1.13-.25.46.17 2.94 1.38 3.44 1.63.5.25.84.38.96.58.12.21.12 1.21-.27 2.29z" />
                    </svg>

                    {/* Notification Badge */}
                    <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                    >
                        <span className="text-white text-xs font-bold">1</span>
                    </motion.div>
                </motion.a>
            </motion.div>
        </footer>
    );
};

export default Footer;
