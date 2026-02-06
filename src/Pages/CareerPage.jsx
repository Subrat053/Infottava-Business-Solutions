import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../NewComponents/Footer';

const CareerPage = () => {
  const openPositions = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote / Hybrid',
      type: 'Full-time',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'On-site',
      type: 'Full-time',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Mobile App Developer',
      department: 'Engineering',
      location: 'Hybrid',
      type: 'Full-time',
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

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
            Join Our <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Team</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Build your career with innovative projects and talented professionals.
          </p>
        </motion.div>
      </div>

      {/* Culture Section with Image */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-[400px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl overflow-hidden shadow-2xl">
                {/* Animated elements */}
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute top-10 left-10 w-20 h-20 bg-white/30 rounded-xl"
                />
                <motion.div
                  animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute bottom-10 right-10 w-24 h-24 bg-white/30 rounded-full"
                />
                <motion.div
                  animate={{ x: [0, 30, 0] }}
                  transition={{ duration: 7, repeat: Infinity }}
                  className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/30 rounded-lg transform -translate-y-1/2"
                />
                
                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center text-white">
                    <motion.svg
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-32 h-32 mx-auto mb-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </motion.svg>
                    <h3 className="text-2xl font-bold mb-2">20+ Team Members</h3>
                    <p className="text-lg">Collaborative & Innovative</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Culture</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                At Infotattva Business Solutions, we believe in fostering a culture of innovation, collaboration, and continuous growth. Our team is our greatest asset, and we're committed to providing an environment where everyone can thrive.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join a diverse team of passionate professionals who are shaping the future of technology and making a real impact for clients worldwide.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '💼', label: 'Flexible Work' },
                  { icon: '🎓', label: 'Learning & Growth' },
                  { icon: '🏥', label: 'Health Benefits' },
                  { icon: '🎉', label: 'Team Events' }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-lg text-center"
                  >
                    <div className="text-3xl mb-2">{benefit.icon}</div>
                    <p className="text-sm font-semibold text-gray-900">{benefit.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">Positions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Explore exciting opportunities to grow your career
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${position.gradient} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                    {index + 1}
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    {position.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{position.title}</h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    {position.department}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {position.location}
                  </div>
                </div>

                <Link to="/contact">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-blue-600 font-semibold"
                  >
                    <span className="mr-2">Apply Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Don't See Your Role?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              We're always looking for talented individuals. Send us your resume!
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all inline-flex items-center"
              >
                <span className="mr-2">Submit Your Resume</span>
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

export default CareerPage;
