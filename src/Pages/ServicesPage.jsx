import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import Footer from "../NewComponents/Footer";
import { SERVICES_DATA } from "../data/servicesData";
import { BRAND_NAME, DEFAULT_OG_IMAGE, buildCanonicalUrl } from "../seo/siteMeta";

const ServicesPage = () => {
  const services = SERVICES_DATA;

  return (
    <div className="min-h-screen bg-white pt-20">
      <Helmet>
        <title>Digital Marketing Services in India | SEO, SMM, PPC | Services | {BRAND_NAME}</title>
        <meta name="description" content="Explore Infottava's services: web & app development, cybersecurity, digital marketing, AI-driven solutions, and more.Explore our digital marketing services including SEO, social media marketing, Google Ads, branding and website development for Indian and international businesses." />
        <meta name="keywords" content="Digital Marketing Services in India, SEO Services India, Social Media Marketing Agency India, PPC Advertising India, Website Development Company India" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Services | ${BRAND_NAME}`} />
        <meta property="og:description" content="Web & app development, cybersecurity, digital marketing, AI services and more." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={BRAND_NAME} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={buildCanonicalUrl('/services')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Services | ${BRAND_NAME}`} />
        <meta name="twitter:description" content="Web & app development, cybersecurity, digital marketing, AI services and more." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <link rel="canonical" href={buildCanonicalUrl('/services')} />
      </Helmet>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": buildCanonicalUrl("/") },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": buildCanonicalUrl("/services") }
          ]
        })}</script>
      </Helmet>
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
              Our Services
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
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center`}
              >
                {/* Image Side */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full lg:w-1/2 relative group cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/services/${service.id}`)
                  }
                >
                  <div className="relative h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <img
                      src={service.image}
                      alt={service.title}
                      width="1200"
                      height="800"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>

                    {/* Icon Display */}
                    <div className="absolute inset-0 flex items-end justify-end">
                      <motion.div
                        animate={{
                          scale: [0.95, 0.75, 0.95],
                          rotate: [0, 2, -2, 0],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="text-8xl md:text-9xl drop-shadow-2xl"
                      >
                        {service.icon}
                      </motion.div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xl md:text-2xl font-bold">
                        View Details
                      </span>
                    </div>

                    {/* Number Badge */}
                    <div className="absolute top-6 left-6 w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/30">
                      <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                        {String(index + 1).padStart(2, "0")}
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
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mr-4 flex-shrink-0`}
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-base font-medium">
                            {feature}
                          </span>
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
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
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
