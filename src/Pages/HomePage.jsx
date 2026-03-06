import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../NewComponents/Footer";
import video from "../assets/Motion_Graphics.mp4";
import { useSiteContent, g, gj } from "../hooks/useSiteContent";

const DEFAULT_SERVICES = [
  {
    id: "web-development",
    title: "WEB DEVELOPMENT",
    icon: "💻",
    description:
      "Build powerful, scalable web applications with modern technologies. From responsive websites to complex web platforms, we deliver solutions that drive business growth.",
    gradient: "from-blue-500 via-blue-600 to-cyan-600",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "app-development",
    title: "APP DEVELOPMENT",
    icon: "📱",
    description:
      "Create stunning native and cross-platform mobile applications for iOS and Android. Deliver seamless user experiences that keep customers engaged.",
    gradient: "from-purple-500 via-purple-600 to-pink-600",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cybersecurity",
    title: "CYBERSECURITY",
    icon: "🔒",
    description:
      "Protect your digital assets with comprehensive security solutions. From threat detection to compliance management, we safeguard your business.",
    gradient: "from-red-500 via-orange-500 to-yellow-500",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "digital-marketing",
    title: "DIGITAL MARKETING",
    icon: "📊",
    description:
      "Amplify your online presence with data-driven marketing strategies. SEO, social media, PPC, and content marketing to grow your brand.",
    gradient: "from-green-500 via-emerald-600 to-teal-600",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "ai-driven-services",
    title: "AI DRIVEN SERVICES",
    icon: "🤖",
    description:
      "Harness the power of artificial intelligence and machine learning. From chatbots to predictive analytics, transform your business with AI.",
    gradient: "from-indigo-500 via-purple-600 to-pink-600",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "game-development",
    title: "GAME DEVELOPMENT",
    icon: "🎮",
    description:
      "Design and develop engaging games for mobile, web, and desktop. Create immersive gaming experiences with stunning graphics and smooth gameplay.",
    gradient: "from-pink-500 via-rose-600 to-red-600",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=80",
  },
];

const DEFAULT_STATS = [
  { number: "400+", label: "Projects Completed" },
  { number: "250+", label: "Happy Clients" },
  { number: "15+", label: "Expert Team" },
  { number: "8+", label: "Years Experience" },
];

const DEFAULT_WHY = [
  {
    title: "Expert Team",
    desc: "50+ certified professionals with diverse expertise",
  },
  {
    title: "Proven Track Record",
    desc: "500+ successful projects across industries",
  },
  {
    title: "Cutting-Edge Technology",
    desc: "Latest tools and frameworks for optimal results",
  },
  {
    title: "24/7 Support",
    desc: "Round-the-clock assistance for your peace of mind",
  },
];

const HomePage = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const c = useSiteContent();

  const services = gj(c, "services", "list", DEFAULT_SERVICES);
  const stats = gj(c, "home", "stats", DEFAULT_STATS);
  const whyPoints = gj(c, "home", "whyPoints", DEFAULT_WHY);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating circles */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, 40, 0],
              x: [0, -30, 0],
              rotate: [360, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"
          />

          {/* Small floating dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              className="absolute w-4 h-4 bg-blue-500 rounded-full blur-sm"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}

          {/* Geometric shapes */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-32 h-32 border-4 border-blue-300/30 rounded-lg"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/3 right-1/3 w-24 h-24 border-4 border-green-300/30 rounded-full"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-green-500 to-cyan-500 bg-clip-text text-transparent">
                {g(c, "home", "heroHeading1", "Transform Your")}
              </span>
              <br />
              <span className="text-gray-900">
                {g(c, "home", "heroHeading2", "Digital Future")}
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {g(
                c,
                "home",
                "heroSubtext",
                "Empowering businesses with innovative solutions in Digital Marketing, Web Development, Cybersecurity, and AI-Driven Services",
              )}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {g(c, "home", "heroCTA1", "Get Started")}
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all border-2 border-gray-200"
                >
                  {g(c, "home", "heroCTA2", "Explore Services")}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-blue-100 text-xs md:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {g(c, "home", "servicesHeading", "Our Services")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {g(
                c,
                "home",
                "servicesSubtext",
                "Comprehensive solutions tailored to elevate your business in the digital age",
              )}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() =>
                  (window.location.href = `/services/${service.id}`)
                }
              >
                <div
                  className={`relative h-full bg-gradient-to-br ${service.gradient} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center min-h-[420px]`}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex flex-col items-center flex-1">
                    {/* Icon */}
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 text-6xl">
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-4 uppercase tracking-wide">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/90 leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* CTA Button */}
                    <Link to={`/services/${service.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold text-sm uppercase tracking-wide shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all"
                      >
                        Learn More
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {g(
                  c,
                  "home",
                  "whyHeading",
                  "Why Choose Infotattva Business Solutions?",
                )}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {g(
                  c,
                  "home",
                  "whySubtext",
                  "We combine innovation, expertise, and dedication to deliver exceptional results that drive your business forward.",
                )}
              </p>

              <div className="space-y-6">
                {whyPoints.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="w-full rounded-2xl">
              <video
                src={video}
                autoPlay
                loop
                muted
                className="rounded-2xl"
              ></video>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-green-500 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {g(c, "home", "ctaHeading", "Ready to Transform Your Business?")}
            </h2>
            <p className="text-lg text-blue-100 mb-10">
              {g(
                c,
                "home",
                "ctaSubtext",
                "Let's discuss how we can help you achieve your digital goals",
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  {g(c, "home", "ctaCTA1", "Start Your Project")}
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
                >
                  {g(c, "home", "ctaCTA2", "Learn More About Us")}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
