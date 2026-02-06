import { useRef, useState } from "react";
import { motion } from "framer-motion";

const Contact = ({ onHover, onLeave }) => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", company: "", budget: "", message: "" });

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Visit Us",
      details: [
        "1010, 4th Floor Rasulgarh,",
        "Bhubaneswar, India",
      ],
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email Us",
      details: ["contact@infotattvabusinesssolutions.com"],
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
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Call Us",
      details: ["+91 9114956222"],
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 overflow-hidden"
      ref={containerRef}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
        <motion.div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-neon-orange/5 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 lg:mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-neon-blue text-sm mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Contact Us
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-white">Ready to Start Your</span>
            <br />
            <span className="gradient-text">Growth Journey?</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            Let's discuss how we can help transform your digital presence and
            achieve your business goals together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-4 sm:p-6 md:p-8"
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="John Doe"
                    required
                    onFocus={onHover}
                    onBlur={onLeave}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="john@company.com"
                    required
                    onFocus={onHover}
                    onBlur={onLeave}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="Company Inc."
                    onFocus={onHover}
                    onBlur={onLeave}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base focus:border-neon-blue focus:outline-none transition-colors"
                    onFocus={onHover}
                    onBlur={onLeave}
                  >
                    <option value="" className="bg-dark-900">
                      Select budget
                    </option>
                    <option value="<5k" className="bg-dark-900">
                      Less than $5,000
                    </option>
                    <option value="5k-15k" className="bg-dark-900">
                      $5,000 - $15,000
                    </option>
                    <option value="15k-50k" className="bg-dark-900">
                      $15,000 - $50,000
                    </option>
                    <option value=">50k" className="bg-dark-900">
                      More than $50,000
                    </option>
                  </select>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder-gray-500 focus:border-neon-blue focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project and goals..."
                  required
                  onFocus={onHover}
                  onBlur={onLeave}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-neon-green to-neon-blue text-dark-950 relative overflow-hidden"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="w-5 h-5 border-2 border-dark-950 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Sending...
                  </span>
                ) : submitted ? (
                  <span className="flex items-center justify-center gap-2">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Message Sent!
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-start gap-3 sm:gap-4"
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-neon-orange to-neon-blue flex items-center justify-center flex-shrink-0">
                  <span className="text-white [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                    {info.icon}
                  </span>
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-semibold text-sm sm:text-base mb-1">
                    {info.title}
                  </h4>
                  {info.details.map((detail, i) => (
                    <p
                      key={i}
                      className="text-gray-400 text-xs sm:text-sm break-all sm:break-normal"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              <h4 className="text-white font-semibold text-sm sm:text-base mb-3 sm:mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3 sm:gap-4">
                {[
                  "facebook",
                  "twitter",
                  "instagram",
                  "linkedin",
                  "youtube",
                ].map((social) => (
                  <motion.a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}
                  >
                    <span className="capitalize text-xs">
                      {social[0].toUpperCase()}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div> */}

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-orange via-neon-blue to-neon-green opacity-90" />
              <div className="relative p-4 sm:p-6 text-center">
                <h4 className="text-white font-bold text-lg sm:text-xl mb-2">
                  Want a Free Consultation?
                </h4>
                <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">
                  Schedule a 30-minute call with our experts
                </p>
                <motion.button
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl bg-dark-950 text-white text-sm sm:text-base font-semibold hover:bg-dark-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                >
                  Book Now - It's Free
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
