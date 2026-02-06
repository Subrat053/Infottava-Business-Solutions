import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../NewComponents/Footer';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();

  const serviceDetails = {
    'web-development': {
      title: 'Web Development',
      tagline: 'Build Powerful Digital Experiences',
      description: 'Transform your vision into reality with cutting-edge web development. We create responsive, scalable, and high-performing web applications that drive business growth.',
      hero: 'From simple websites to complex web platforms, we deliver solutions built with modern technologies and best practices.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80',
      features: [
        {
          title: 'Responsive Design',
          description: 'Mobile-first approach ensuring perfect display across all devices and screen sizes',
          icon: '📱'
        },
        {
          title: 'Modern Frameworks',
          description: 'Built with React, Next.js, Vue.js and other cutting-edge technologies',
          icon: '⚡'
        },
        {
          title: 'SEO Optimized',
          description: 'Search engine optimization integrated from the ground up',
          icon: '🔍'
        },
        {
          title: 'Scalable Architecture',
          description: 'Cloud-native solutions that grow with your business',
          icon: '☁️'
        },
        {
          title: 'API Integration',
          description: 'Seamless connection with third-party services and APIs',
          icon: '🔌'
        },
        {
          title: 'Performance Focused',
          description: 'Optimized for speed, delivering lightning-fast user experiences',
          icon: '🚀'
        }
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'MongoDB'],
      process: [
        'Discovery & Requirements',
        'Design & Prototyping',
        'Development & Testing',
        'Deployment & Launch',
        'Maintenance & Support'
      ],
      benefits: [
        'Enhanced online presence',
        'Improved user engagement',
        'Increased conversion rates',
        'Better search rankings',
        'Scalable infrastructure',
        '24/7 availability'
      ]
    },
    'app-development': {
      title: 'App Development',
      tagline: 'Mobile Solutions That Drive Results',
      description: 'Create exceptional mobile experiences for iOS and Android. Our expert team delivers feature-rich, high-performance apps that users love.',
      hero: 'From concept to launch, we build mobile applications that engage users and drive business success.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80',
      features: [
        {
          title: 'Cross-Platform Development',
          description: 'Build once, deploy everywhere with React Native and Flutter',
          icon: '📲'
        },
        {
          title: 'Native Performance',
          description: 'Smooth, fast experiences optimized for each platform',
          icon: '⚡'
        },
        {
          title: 'Push Notifications',
          description: 'Keep users engaged with timely, relevant notifications',
          icon: '🔔'
        },
        {
          title: 'Offline Functionality',
          description: 'Core features work even without internet connection',
          icon: '📡'
        },
        {
          title: 'Secure Payments',
          description: 'Integrated payment gateways with top-level security',
          icon: '💳'
        },
        {
          title: 'Analytics Integration',
          description: 'Track user behavior and app performance in real-time',
          icon: '📊'
        }
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS Amplify', 'Redux', 'SQLite'],
      process: [
        'Ideation & Planning',
        'UI/UX Design',
        'Development & Testing',
        'App Store Submission',
        'Updates & Maintenance'
      ],
      benefits: [
        'Direct customer access',
        'Increased engagement',
        'Better user experience',
        'Push notification reach',
        'Offline availability',
        'Brand loyalty building'
      ]
    },
    'cybersecurity': {
      title: 'Cybersecurity',
      tagline: 'Protect Your Digital Assets',
      description: 'Comprehensive cybersecurity solutions to safeguard your business. From threat detection to compliance management, we protect what matters most.',
      hero: 'Stay ahead of cyber threats with proactive security measures and expert guidance.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
      features: [
        {
          title: 'Threat Detection',
          description: 'Real-time monitoring and detection of security threats',
          icon: '🛡️'
        },
        {
          title: 'Data Encryption',
          description: 'End-to-end encryption for sensitive business data',
          icon: '🔐'
        },
        {
          title: 'Compliance Management',
          description: 'Ensure adherence to GDPR, HIPAA, and other regulations',
          icon: '✅'
        },
        {
          title: 'Vulnerability Assessment',
          description: 'Regular security audits to identify and fix weaknesses',
          icon: '🔍'
        },
        {
          title: 'Incident Response',
          description: '24/7 emergency response to security incidents',
          icon: '🚨'
        },
        {
          title: 'Security Training',
          description: 'Employee training to prevent social engineering attacks',
          icon: '👥'
        }
      ],
      technologies: ['Firewall Systems', 'SIEM Tools', 'Penetration Testing', 'DDoS Protection', 'SSL/TLS', 'VPN', 'IDS/IPS', 'Antivirus'],
      process: [
        'Security Assessment',
        'Risk Analysis',
        'Implementation',
        'Monitoring & Testing',
        'Continuous Improvement'
      ],
      benefits: [
        'Protected business data',
        'Regulatory compliance',
        'Reduced risk exposure',
        'Enhanced customer trust',
        'Business continuity',
        'Peace of mind'
      ]
    },
    'digital-marketing': {
      title: 'Digital Marketing',
      tagline: 'Amplify Your Online Presence',
      description: 'Drive growth with data-driven digital marketing strategies. From SEO to social media, we help you reach the right audience and achieve measurable results.',
      hero: 'Grow your brand, generate leads, and boost conversions with comprehensive digital marketing solutions.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      features: [
        {
          title: 'SEO Services',
          description: 'Improve search rankings and drive organic traffic',
          icon: '🔍'
        },
        {
          title: 'Social Media Marketing',
          description: 'Engage audiences across all major social platforms',
          icon: '📱'
        },
        {
          title: 'PPC Advertising',
          description: 'Targeted paid campaigns on Google Ads and social media',
          icon: '💰'
        },
        {
          title: 'Content Marketing',
          description: 'Create compelling content that resonates with your audience',
          icon: '✍️'
        },
        {
          title: 'Email Marketing',
          description: 'Build and nurture customer relationships through email',
          icon: '📧'
        },
        {
          title: 'Analytics & Reporting',
          description: 'Track performance and make data-driven decisions',
          icon: '📊'
        }
      ],
      technologies: ['Google Ads', 'Facebook Ads', 'Google Analytics', 'SEMrush', 'Mailchimp', 'Hootsuite', 'HubSpot', 'Ahrefs'],
      process: [
        'Market Research',
        'Strategy Development',
        'Campaign Setup',
        'Content Creation',
        'Launch & Monitor',
        'Optimize & Scale'
      ],
      benefits: [
        'Increased brand awareness',
        'Higher conversion rates',
        'Better customer insights',
        'Cost-effective advertising',
        'Measurable ROI',
        'Competitive advantage'
      ]
    },
    'ai-driven-services': {
      title: 'AI Driven Services',
      tagline: 'Harness the Power of Artificial Intelligence',
      description: 'Transform your business with cutting-edge AI and machine learning solutions. From chatbots to predictive analytics, we make AI work for you.',
      hero: 'Automate processes, gain insights, and stay ahead with intelligent AI-powered solutions.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80',
      features: [
        {
          title: 'Machine Learning',
          description: 'Custom ML models for predictive analytics and automation',
          icon: '🤖'
        },
        {
          title: 'Natural Language Processing',
          description: 'Intelligent chatbots and text analysis systems',
          icon: '💬'
        },
        {
          title: 'Computer Vision',
          description: 'Image recognition and visual data processing',
          icon: '👁️'
        },
        {
          title: 'Predictive Analytics',
          description: 'Forecast trends and make data-driven decisions',
          icon: '📈'
        },
        {
          title: 'Process Automation',
          description: 'Automate repetitive tasks with intelligent systems',
          icon: '⚙️'
        },
        {
          title: 'AI Consulting',
          description: 'Expert guidance on AI strategy and implementation',
          icon: '💡'
        }
      ],
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Scikit-learn', 'Python', 'Keras', 'Hugging Face', 'AWS SageMaker'],
      process: [
        'Use Case Analysis',
        'Data Collection',
        'Model Development',
        'Training & Testing',
        'Deployment',
        'Monitoring & Optimization'
      ],
      benefits: [
        'Increased efficiency',
        'Better decision making',
        'Reduced operational costs',
        'Enhanced customer experience',
        'Competitive edge',
        'Scalable automation'
      ]
    },
    'game-development': {
      title: 'Game Development',
      tagline: 'Create Engaging Gaming Experiences',
      description: 'Bring your game ideas to life with our expert development team. From casual mobile games to immersive multiplayer experiences, we deliver games that captivate players.',
      hero: 'Design, develop, and launch successful games for mobile, web, and desktop platforms.',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&auto=format&fit=crop&q=80',
      features: [
        {
          title: '2D & 3D Games',
          description: 'Beautiful graphics and smooth animations for any genre',
          icon: '🎮'
        },
        {
          title: 'Multiplayer Support',
          description: 'Real-time multiplayer and social gaming features',
          icon: '👥'
        },
        {
          title: 'Cross-Platform',
          description: 'Deploy games on mobile, web, and desktop platforms',
          icon: '🌐'
        },
        {
          title: 'Game Monetization',
          description: 'Integrate ads, in-app purchases, and premium features',
          icon: '💵'
        },
        {
          title: 'Physics & AI',
          description: 'Realistic physics engines and intelligent game AI',
          icon: '🧠'
        },
        {
          title: 'Cloud Integration',
          description: 'Save progress, leaderboards, and achievements',
          icon: '☁️'
        }
      ],
      technologies: ['Unity', 'Unreal Engine', 'Godot', 'Phaser', 'Three.js', 'WebGL', 'C#', 'C++'],
      process: [
        'Concept & Design',
        'Prototyping',
        'Development',
        'Art & Animation',
        'Testing & Balancing',
        'Launch & Support'
      ],
      benefits: [
        'Engaging user experiences',
        'Revenue generation',
        'Brand entertainment',
        'Community building',
        'Viral potential',
        'Long-term retention'
      ]
    }
  };

  const service = serviceDetails[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-24">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/services" className="text-gray-500 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-blue-600 font-semibold">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-cyan-500 to-green-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl md:text-2xl mb-8 font-light">{service.tagline}</p>
            <p className="text-lg max-w-3xl mx-auto mb-10">{service.hero}</p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl"
              >
                Get Started Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600">{service.description}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process & Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Process */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Process</h2>
              <div className="space-y-4">
                {service.process.map((step, index) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="text-base font-medium text-gray-800">{step}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Benefits</h2>
              <div className="space-y-4">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      {/* <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50"> */}
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience the Difference</h2>
            <p className="text-lg text-gray-600">See how our solutions can transform your business</p>
          </motion.div> */}

          {/* <div className="grid md:grid-cols-3 gap-8"> */}
            {/* Visualization Card 1 */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-5 right-5 w-20 h-20 border-4 border-white/30 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-5 left-5 w-16 h-16 bg-white/30 rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-white text-center"
                >
                  <svg className="w-24 h-24 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 7H7v6h6V7z" />
                    <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-semibold">Innovative Design</p>
                </motion.div>
              </div>
            </motion.div> */}

            {/* Visualization Card 2 */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative h-64 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.div
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-10 left-10 w-12 h-12 bg-white/30 rounded-full"
              />
              <motion.div
                animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute bottom-10 right-10 w-16 h-16 bg-white/30 rounded-lg transform rotate-45"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-white text-center"
                >
                  <svg className="w-24 h-24 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-semibold">Fast Performance</p>
                </motion.div>
              </div>
            </motion.div> */}

            {/* Visualization Card 3 */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative h-64 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-8 right-8 w-14 h-14 border-4 border-white/30 rounded-lg"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-8 left-8 w-12 h-12 bg-white/30 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="text-white text-center"
                >
                  <svg className="w-24 h-24 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-semibold">Secure & Reliable</p>
                </motion.div>
              </div>
            </motion.div> */}
          {/* </div> */}
        {/* </div> */}
      {/* </section> */}

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Technologies We Use</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="px-5 py-2 bg-white rounded-full text-gray-800 text-sm font-medium shadow-md hover:shadow-lg transition-all"
              >
                {tech}
              </span>
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
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Let's discuss your project and bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-xl"
                >
                  Contact Us
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
                >
                  View All Services
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

export default ServiceDetailPage;
