import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../NewComponents/Footer';

const ServicesPage = () => {
  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      icon: '💻',
      description: 'Build powerful, scalable web applications with modern technologies. From responsive websites to complex web platforms, we deliver solutions that drive business growth and enhance user engagement.',
      gradient: 'from-blue-500 via-blue-600 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Performance', 'Custom CMS Integration']
    },
    {
      id: 'app-development',
      title: 'App Development',
      icon: '📱',
      description: 'Create stunning native and cross-platform mobile applications for iOS and Android. Deliver seamless user experiences that keep customers engaged and drive conversions.',
      gradient: 'from-purple-500 via-purple-600 to-pink-600',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80',
      features: ['Cross-Platform', 'Native Performance', 'Push Notifications', 'Offline Support']
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: '🔒',
      description: 'Protect your digital assets with comprehensive security solutions. From threat detection to compliance management, we safeguard your business against evolving cyber threats.',
      gradient: 'from-red-500 via-orange-500 to-yellow-500',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
      features: ['Threat Detection', 'Compliance Management', 'Security Audits', '24/7 Monitoring']
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      icon: '📊',
      description: 'Amplify your online presence with data-driven marketing strategies. SEO, social media, PPC, and content marketing solutions designed to grow your brand and increase ROI.',
      gradient: 'from-green-500 via-emerald-600 to-teal-600',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      features: ['SEO & SEM', 'Social Media Marketing', 'Content Strategy', 'Analytics & Reporting']
    },
    {
      id: 'ai-driven-services',
      title: 'AI Driven Services',
      icon: '🤖',
      description: 'Harness the power of artificial intelligence and machine learning. From intelligent chatbots to predictive analytics, transform your business operations with cutting-edge AI solutions.',
      gradient: 'from-indigo-500 via-purple-600 to-pink-600',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80',
      features: ['Machine Learning', 'Natural Language Processing', 'Predictive Analytics', 'Computer Vision']
    },
    {
      id: 'game-development',
      title: 'Game Development',
      icon: '🎮',
      description: 'Design and develop engaging games for mobile, web, and desktop platforms. Create immersive gaming experiences with stunning graphics, smooth gameplay, and innovative mechanics.',
      gradient: 'from-pink-500 via-rose-600 to-red-600',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&auto=format&fit=crop&q=80',
      features: ['2D & 3D Games', 'Multiplayer Support', 'Cross-Platform', 'Game Monetization']
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to elevate your business in the digital age
            </p>
          </motion.div>

          {/* Alternating Layout */}
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
              >
                {/* Image Side */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="w-full lg:w-1/2 relative group cursor-pointer"
                  onClick={() => window.location.href = `/services/${service.id}`}
                >
                  <div className="relative h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    
                    {/* Icon Display */}
                    <div className="absolute inset-0 flex items-end justify-end">
                      <motion.div
                        animate={{ 
                          scale: [0.95, 0.75, 0.95],
                          rotate: [0, 2, -2, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="text-8xl md:text-9xl drop-shadow-2xl"
                      >
                        {service.icon}
                      </motion.div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xl md:text-2xl font-bold">View Details</span>
                    </div>

                    {/* Number Badge */}
                    <div className="absolute top-6 left-6 w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/30">
                      <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex items-center text-gray-700"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mr-4 flex-shrink-0`}>
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-base font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Arrow CTA */}
                    <Link to={`/services/${service.id}`}>
                      <motion.div
                        whileHover={{ x: 10 }}
                        className="inline-flex items-center text-blue-600 font-semibold text-lg group cursor-pointer"
                      >
                        <span className="mr-3">Explore More</span>
                        <motion.svg
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-blue-100 mb-10">
              Let's discuss how we can help transform your business
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-xl"
              >
                Contact Us Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
