import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../NewComponents/Footer';
// import { onHover, onLeave } from '../components/hoverEffects';

import jp2 from "../assets/team/jp3.png";
import ls from "../assets/team/ls.jpeg";
import sd from "../assets/team/Picture10.png";
import sbd from "../assets/team/sbd.jpeg";
// import sh2 from "../assets/team/sh2.jpg";
import sh2 from "../assets/team/subrat.jpeg";
import srd from "../assets/team/srd4.jpeg";
import gs from "../assets/team/gs.jpeg";
import aa from "../assets/team/aa.jpeg";


const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Infotattva Business Solutions</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Your trusted partner in digital transformation and innovation.
                    </p>
                </motion.div>
            </div>

            {/* Company Story with Image */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Our <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Story</span>
                            </h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Founded with a vision to empower businesses through technology, Infotattva Business Solutions has grown into a leading provider of comprehensive digital solutions. We specialize in transforming ideas into reality with cutting-edge technology and innovative approaches.
                            </p>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Our journey began with a simple mission: to bridge the gap between businesses and technology. Today, we serve clients across multiple industries, delivering solutions that drive growth, efficiency, and innovation.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                With a team of passionate experts and a commitment to excellence, we continue to push boundaries and set new standards in the digital landscape.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative h-[400px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl  shadow-2xl">
                                {/* Animated background elements */}
                                {/* <motion.div
                                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                                    transition={{ duration: 10, repeat: Infinity }}
                                    className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full"
                                /> */}
                                {/* <motion.div
                                    animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                                    transition={{ duration: 12, repeat: Infinity }}
                                    className="absolute bottom-10 right-10 w-40 h-40 bg-white/20 rounded-lg transform rotate-45"
                                /> */}

                                {/* Center content */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        animate={{ y: [-10, 10, -10] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="text-center text-white p-8"
                                    >
                                        <svg className="w-32 h-32 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                        </svg>
                                        <h3 className="text-2xl font-bold mb-2">Since 2024</h3>
                                        <p className="text-lg">Delivering Excellence</p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg"
                        >
                            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-700 leading-relaxed">
                                To empower businesses worldwide with innovative technology solutions that drive growth, enhance efficiency, and create lasting value in the digital age.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg"
                        >
                            <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-700 leading-relaxed">
                                To be the global leader in digital transformation, recognized for innovation, excellence, and our unwavering commitment to client success.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats with Visual Elements */}
            <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: '400+', label: 'Projects Completed', icon: '📊' },
                            { number: '250+', label: 'Happy Clients', icon: '😊' },
                            { number: '15+', label: 'Expert Team', icon: '👥' },
                            { number: '8+', label: 'Years Experience', icon: '🏆' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center text-white"
                            >
                                <div className="text-4xl mb-2">{stat.icon}</div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="text-3xl md:text-4xl font-bold mb-2"
                                >
                                    {stat.number}
                                </motion.div>
                                <div className="text-sm md:text-base text-blue-100">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold mb-4"
                        >
                            Our Leadership
                        </motion.span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Team</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Passionate professionals driving digital innovation and delivering exceptional results
                        </p>
                    </motion.div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Srittam Das",
                                role: "Chief Advisor",
                                image: sd,
                                gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
                                bgGradient: "from-violet-50 to-purple-50",
                                description: "Strategic visionary with 25+ years in digital transformation",
                                linkedin: "#",
                                email: "#"
                            },
                            {
                                name: "Jyoti Prasad Tripathy",
                                role: "Director",
                                image: jp2,
                                gradient: "from-blue-500 via-cyan-500 to-teal-500",
                                bgGradient: "from-blue-50 to-cyan-50",
                                description: "Leading innovation and growth with data-driven strategies",
                                linkedin: "#",
                                email: "#"
                            },
                            {
                                name: "Subhankar Dash",
                                role: "Mern Stack & Flutter Developer",
                                image: sbd,
                                gradient: "from-emerald-500 via-green-500 to-teal-500",
                                bgGradient: "from-emerald-50 to-green-50",
                                description: "Full-stack expert specializing in scalable applications",
                                linkedin: "#",
                                email: "#"
                            },
                            {
                                name: "Gyan Priyadarsan Singh",
                                role: "Mern Stack Developer",
                                image: gs,
                                gradient: "from-orange-500 via-amber-500 to-yellow-500",
                                bgGradient: "from-orange-50 to-amber-50",
                                description: "Backend specialist with expertise in cutting-edge web solutions",
                                linkedin: "#",
                                email: "#"
                            },
                            {
                                name: "Smrutirekha Das",
                                role: "Digital Marketing Specialist",
                                image: srd,
                                gradient: "from-pink-500 via-rose-500 to-red-500",
                                bgGradient: "from-pink-50 to-rose-50",
                                description: "Driving brand growth through SEO and performance marketing",
                                linkedin: "#",
                                email: "#"
                            },
                            {
                                name: "Subrat Hota",
                                role: "FullStack Developer",
                                image: sh2,
                                gradient: "from-indigo-500 via-blue-500 to-purple-500",
                                bgGradient: "from-indigo-50 to-blue-50",
                                description: "Expertise in PHP and Laravel for dynamic web applications",
                                linkedin: "#",
                                email: "hotasubrat057@gmail.com"
                            },
                            {
                                name: "Little Sahu",
                                role: "Frontend Developer",
                                image: ls,
                                gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
                                bgGradient: "from-fuchsia-50 to-pink-50",
                                description: "UI/UX enthusiast crafting best user experiences",
                                linkedin: "#",
                                email: "#"
                            },
                            {
                                name: "Abhay Anand",
                                role: "Flutter Developer",
                                image: aa,
                                gradient: "from-cyan-500 via-sky-500 to-blue-500",
                                bgGradient: "from-cyan-50 to-sky-50",
                                description: "Mobile app specialist building cross-platform experiences",
                                linkedin: "#",
                                email: "#"
                            },
                        ].map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className={`relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full`}>
                                    {/* Gradient background on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${member.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    {/* Content */}
                                    <div className="relative p-6">
                                        {/* Avatar with gradient border */}
                                        <div className="mb-6 flex justify-center">
                                            <div className="relative">
                                                {/* Gradient glow effect */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-110`} />

                                                {/* Gradient border */}
                                                <div className={`relative p-1 bg-gradient-to-br ${member.gradient} rounded-full`}>
                                                    <motion.div
                                                        className="relative w-32 h-32 bg-white rounded-full overflow-hidden"
                                                        whileHover={{ scale: 1.05 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <img
                                                            src={member.image}
                                                            alt={member.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </motion.div>
                                                </div>

                                                {/* Online status indicator */}
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.2 + index * 0.1 }}
                                                    className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-4 border-white shadow-lg"
                                                />
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="text-center mb-4">
                                            <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                                {member.name}
                                            </h4>
                                            <p className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-3`}>
                                                {member.role}
                                            </p>
                                            <p className="text-gray-600 text-xs leading-relaxed">
                                                {member.description}
                                            </p>
                                        </div>

                                        {/* Social Links */}
                                        <div className="flex justify-center gap-2 pt-4 border-t border-gray-100">
                                            <motion.a
                                                href={member.linkedin}
                                                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${member.gradient} bg-opacity-10 hover:bg-opacity-100 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 group/icon`}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </motion.a>
                                            <motion.a
                                                href={`mailto:${member.email}`}
                                                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${member.gradient} bg-opacity-10 hover:bg-opacity-100 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 group/icon`}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </motion.a>
                                        </div>
                                    </div>

                                    {/* Decorative corner gradient */}
                                    <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${member.gradient} rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Team CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center mt-16"
                    >
                        <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 rounded-2xl bg-white shadow-xl border border-gray-100">
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 border-4 border-white shadow-lg" />
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-4 border-white shadow-lg" />
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 border-4 border-white shadow-lg" />
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 border-4 border-white shadow-lg" />
                            </div>
                            <div className="text-left">
                                <p className="text-gray-900 font-semibold text-lg">Join our amazing team!</p>
                                <p className="text-gray-600 text-sm">We're always looking for talented people</p>
                            </div>
                            <Link to="/carrer">
                                <motion.button
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                                >
                                    <span>View Careers</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Ready to Work With Us?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Let's create something amazing together
                        </p>
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all inline-flex items-center"
                            >
                                <span className="mr-2">Get In Touch</span>
                                <motion.svg
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </motion.svg>
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
