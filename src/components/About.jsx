import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import jp2 from "../assets/team/jp3.png";
import ls from "../assets/team/ls.jpeg";
import sd from "../assets/team/Picture10.png";
import sbd from "../assets/team/sbd.jpeg";
import sh2 from "../assets/team/sh2.jpg";
import srd from "../assets/team/srd4.jpeg";
import gs from "../assets/team/gs.jpeg";
import aa from "../assets/team/aa.jpeg";


const About = ({ onHover, onLeave }) => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("mission");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const tabs = [
    { id: "mission", label: "Our Mission" },
    { id: "vision", label: "Our Vision" },
    { id: "values", label: "Our Values" },
  ];

  const tabContent = {
    mission: {
      title: "Empowering Digital Success",
      description:
        "At Infotattva Business Solutions, our mission is to empower businesses with innovative digital marketing strategies that drive measurable growth. We believe in creating lasting partnerships built on transparency, expertise, and exceptional results.",
      highlights: [
        "Deliver ROI-focused marketing solutions",
        "Build long-term client relationships",
        "Stay ahead of digital trends",
        "Provide transparent reporting & analytics",
      ],
    },
    vision: {
      title: "Leading Digital Transformation",
      description:
        "We envision becoming the most trusted digital marketing partner for businesses across India and beyond. Our goal is to set new standards in digital excellence while helping our clients achieve unprecedented growth.",
      highlights: [
        "Become India's top digital agency",
        "Pioneer innovative marketing techniques",
        "Create global digital success stories",
        "Shape the future of digital marketing",
      ],
    },
    values: {
      title: "Principles That Guide Us",
      description:
        "Our core values define who we are and how we work. They are the foundation of our company culture and guide every decision we make for our clients and team.",
      highlights: [
        "Integrity in every interaction",
        "Innovation that drives results",
        "Excellence as our standard",
        "Client success is our success",
      ],
    },
  };

  const stats = [
    {
      number: "8+",
      label: "Years of Excellence",
      color: "from-neon-green to-neon-blue",
    },
    {
      number: "200+",
      label: "Projects Delivered",
      color: "from-neon-blue to-neon-purple",
    },
    {
      number: "150+",
      label: "Happy Clients",
      color: "from-violet-800 to-violet-200",
    },
    {
      number: "15+",
      label: "Expert Team",
      color: "from-purple-900 to-purple-400",
    },
  ];

  const expertise = [
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      title: "SEO Excellence",
      description: "Dominate search rankings with data-driven SEO strategies",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      title: "Performance Marketing",
      description: "Maximize ROI with targeted ad campaigns across platforms",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
          />
        </svg>
      ),
      title: "Social Media",
      description: "Build engaged communities and amplify brand presence",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      description: "Create stunning, high-converting digital experiences",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Content Marketing",
      description: "Engage audiences with compelling content strategies",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Analytics & Insights",
      description: "Make informed decisions with comprehensive data analysis",
    },
  ];

  const certifications = [
    { 
      name: "Google Partner", 
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" fill="#FFC107"/>
          <path d="M24 8l-14 8v16l14 8 14-8V16l-14-8z" fill="#FFD54F"/>
          <path d="M24 12l-10 6v12l10 6 10-6V18l-10-6z" fill="#FFECB3"/>
          <circle cx="24" cy="24" r="6" fill="#FF6F00"/>
        </svg>
      )
    },
    { 
      name: "Meta Business Partner", 
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="8" width="32" height="32" rx="4" fill="#1877F2"/>
          <g fill="#fff">
            <rect x="12" y="12" width="6" height="6" rx="1"/>
            <rect x="21" y="12" width="6" height="6" rx="1"/>
            <rect x="30" y="12" width="6" height="6" rx="1"/>
            <rect x="12" y="21" width="6" height="6" rx="1"/>
            <rect x="21" y="21" width="6" height="6" rx="1" fill="#FF6B6B"/>
            <rect x="30" y="21" width="6" height="6" rx="1" fill="#4ECDC4"/>
            <rect x="12" y="30" width="6" height="6" rx="1" fill="#FFE66D"/>
            <rect x="21" y="30" width="6" height="6" rx="1"/>
            <rect x="30" y="30" width="6" height="6" rx="1"/>
          </g>
        </svg>
      )
    },
    { 
      name: "HubSpot Certified", 
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="#FF7A59" opacity="0.2"/>
          <circle cx="24" cy="24" r="14" fill="#FF7A59"/>
          <circle cx="24" cy="20" r="4" fill="#fff"/>
          <circle cx="18" cy="28" r="2" fill="#fff"/>
          <circle cx="30" cy="28" r="2" fill="#fff"/>
          <path d="M20 32a4 4 0 008 0" stroke="#fff" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    { 
      name: "SEMrush Certified", 
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="4" fill="#FF622D" opacity="0.2"/>
          <rect x="10" y="28" width="6" height="12" rx="1" fill="#FF622D"/>
          <rect x="21" y="20" width="6" height="20" rx="1" fill="#FF622D"/>
          <rect x="32" y="12" width="6" height="28" rx="1" fill="#FF622D"/>
          <circle cx="13" cy="22" r="3" fill="#4ECDC4"/>
          <circle cx="24" cy="14" r="3" fill="#4ECDC4"/>
          <circle cx="35" cy="8" r="3" fill="#4ECDC4"/>
        </svg>
      )
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 lg:py-28 overflow-hidden"
      ref={containerRef}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-neon-purple/5 blur-3xl"
          style={{ y: imageY }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-neon-green/5 blur-3xl"
          style={{ y: textY }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/50 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-neon-green text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            About Infotattva Business Solutions
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-white">Your Trusted Partner for</span>
            <br />
            <span className="gradient-text">Digital Excellence</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            Infotattva Business Solutions is a full-service digital marketing
            agency dedicated to helping businesses thrive in the digital
            landscape. We combine innovation, expertise, and passion to deliver
            exceptional results.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="relative group"
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
              />
              <div className="relative glass rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-white/20 transition-all duration-300">
                <div
                  className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 sm:mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission/Vision/Values Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 lg:mb-16"
        >
          <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Tab Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-10">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "btn-primary text-dark-950"
                      : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-10 items-center"
              >
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    {tabContent[activeTab].title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {tabContent[activeTab].description}
                  </p>
                  <ul className="space-y-3">
                    {tabContent[activeTab].highlights.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-neon-green to-neon-blue" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 via-neon-blue/20 to-neon-purple/20 rounded-2xl blur-2xl" />
                  <div className="relative bg-white/5 rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {certifications.map((cert, index) => (
                        <motion.div
                          key={cert.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 rounded-xl bg-dark-900/60 hover:bg-dark-800/80 transition-all duration-300 border border-white/5 hover:border-white/20"
                          onMouseEnter={onHover}
                          onMouseLeave={onLeave}
                        >
                          <div className="flex-shrink-0">
                            {cert.icon}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-300 text-center font-medium leading-tight">
                            {cert.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Our Expertise Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Our <span className="gradient-text">Expertise</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We offer comprehensive digital marketing solutions tailored to
              your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group glass rounded-2xl p-6 hover:border-blue-300 transition-all duration-300"
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
              >
                <div className="w-12 p-3 rounded-md flex items-center justify-center text-green-400 mb-4 group-hover:from-neon-green group-hover:to-neon-blue bg-gradient-to-r from-neon-green to-neon-blue group-hover:text-dark-950 transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 lg:mt-20"
        >
          <div className="text-center mb-12 lg:mb-16">
            <motion.span
              className="inline-block px-4 py-2 rounded-full glass text-neon-blue text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Leadership
            </motion.span>
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Meet Our <span className="gradient-text">Expert Team</span>
            </h3>
            <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
              Passionate professionals driving digital innovation and delivering exceptional results
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Srittam Das",
                role: "Chief Advisor ",
                image: sd,
                gradient: "from-purple-500 to-pink-500",
                description: "Strategic visionary with 25+ years in digital transformation",
                linkedin: "#",
                email: "#"
              },
              {
                name: "Jyoti Prasad Tripathy",
                role: "Director",
                image: jp2,
                gradient: "from-blue-500 to-cyan-500",
                description: "Leading innovation and growth with data-driven strategies",
                linkedin: "#",
                email: "#"
              },
              {
                name: "Subhankar Dash",
                role: "Mern Stack & Flutter Developer",
                image: sbd,
                gradient: "from-green-500 to-emerald-500",
                description: "Full-stack expert specializing in scalable applications",
                linkedin: "#",
                email: "#"
              },
              {
                name: "Gyan Priyadarsan Singh",
                role: "Mern Stack Developer",
                image: gs,
                gradient: "from-orange-500 to-red-500",
                description: "Backend specialist with expertise in cutting-edge web solutions.",
                linkedin: "#",
                email: "#"
              },
              {
                name: "Smrutirekha Das",
                role: "Digital Marketing Specialist",
                image: srd,
                gradient: "from-indigo-500 to-purple-500",
                description: "Driving brand growth through SEO, social media, and performance marketing excellence",
                linkedin: "#",
                email: "#"
              },
              {
                name: "Subrat Hota",
                role: "FullStack Developer",
                image: sh2,
                gradient: "from-pink-500 to-rose-500",
                description: "Expertise in PHP and Laravel for dynamic web applications interactions with seamless frontend stacks",
                linkedin: "#",
                email: "hotasubrat057@gmail.com"
              },
              {
                name: "Little Sahu",
                role: "Frontend Developer",
                image: ls,
                gradient: "from-pink-500 to-rose-500",
                description: "UI/UX enthusiast crafting best user experiences with modern frontend technologies",
                linkedin: "#",
                email: "#"
              },
              {
                name: "Abhay Anand",
                role: "Flutter Developer",
                image: aa,
                gradient: "from-teal-500 to-blue-500",
                description: "Mobile app specialist building seamless cross-platform experiences for Android and iOS",
                linkedin: "#",
                email: "#"
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
              >
                <div className="relative glass rounded-2xl p-6 hover:border-white/20 transition-all duration-500 overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative">
                    {/* Avatar */}
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                        <motion.div
                          className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-3xl font-bold shadow-2xl`}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={member.image || sd}
                            alt={member.name}
                            width="128"
                            height="128"
                            onError={(e) => {
                              if (e.currentTarget.dataset.fallbackApplied) return;
                              e.currentTarget.dataset.fallbackApplied = "true";
                              e.currentTarget.src = sd;
                            }}
                            className="w-32 h-32 rounded-full object-cover"
                          />
                        </motion.div>
                        {/* Status indicator */}
                        <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-900 shadow-lg" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="text-center mb-4">
                      <h4 className="text-xl font-bold text-white mb-1 group-hover:text-neon-green transition-colors duration-300">
                        {member.name}
                      </h4>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-3`}>
                        {member.role}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {member.description}
                      </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3 pt-4 border-t border-white/5">
                      <motion.a
                        href={member.linkedin}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-neon-blue transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </motion.a>
                      <motion.a
                        href={member.email}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-neon-green transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Decorative corner element */}
                <div className={`absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              </motion.div>
            ))}
          </div>

          {/* Team CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass border border-white/10">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-dark-900" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-dark-900" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 border-2 border-dark-900" />
              </div>
              <p className="text-gray-300">
                <span className="text-white font-semibold">Join our team</span> – We're always looking for talented people
              </p>
              <motion.a
                href="#contact"
                className="ml-2 text-neon-green hover:text-neon-blue transition-colors font-medium"
                whileHover={{ x: 3 }}
              >
                Get in touch →
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Why Choose Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 lg:mt-16"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 opacity-90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative px-4 py-8 sm:px-8 sm:py-12 lg:px-16 lg:py-16 text-center">
              <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-dark-950 mb-3 sm:mb-4">
                Ready to Transform Your Digital Presence?
              </h3>
              <p className="text-dark-950/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
                Let's discuss how Infotattva Business Solutions can help you achieve your business
                goals with our proven digital marketing strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#contact"
                  className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-dark-950 text-white text-sm sm:text-base font-semibold hover:bg-dark-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                >
                  Get Free Consultation
                </motion.a>
                <motion.a
                  href="#portfolio"
                  className="px-8 py-4 rounded-xl bg-white/20 text-dark-950 font-semibold hover:bg-white/30 transition-colors border border-dark-950/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                >
                  View Our Work
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
