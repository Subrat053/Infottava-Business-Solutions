import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small businesses starting their digital journey",
    price: 999,
    period: "/month",
    features: [
      "SEO Optimization (5 Keywords)",
      "Social Media Management (2 Platforms)",
      "Monthly Performance Report",
      "Email Support",
      "Basic Analytics Dashboard",
    ],
    notIncluded: [
      "PPC Campaign Management",
      "Content Creation",
      "Dedicated Account Manager",
    ],
    color: "from-gray-500 to-gray-600",
    popular: false,
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses seeking comprehensive solutions",
    price: 2499,
    period: "/month",
    features: [
      "SEO Optimization (15 Keywords)",
      "Social Media Management (4 Platforms)",
      "PPC Campaign Management",
      "Content Creation (8 pieces/month)",
      "Weekly Performance Reports",
      "Priority Email & Phone Support",
      "Advanced Analytics Dashboard",
      "Dedicated Account Manager",
    ],
    notIncluded: ["Custom Strategy Sessions"],
    color: "from-neon-green to-neon-blue",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations with complex needs",
    price: "Custom",
    period: "",
    features: [
      "Unlimited SEO Keywords",
      "All Social Media Platforms",
      "Full PPC Management",
      "Unlimited Content Creation",
      "Real-time Reporting Dashboard",
      "24/7 Dedicated Support",
      "Custom Strategy Sessions",
      "Priority Feature Access",
      "White-label Solutions",
      "API Access",
    ],
    notIncluded: [],
    color: "from-neon-purple to-neon-pink",
    popular: false,
  },
];

const Pricing = ({ onHover, onLeave }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="relative py-20 lg:py-28 overflow-hidden"
      ref={containerRef}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-neon-green/5 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-neon-green text-sm mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
          >
            Pricing
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-white">Plans That Scale</span>
            <br />
            <span className="gradient-text">With Your Growth</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 md:mb-8 px-2">
            Choose the perfect plan for your business. All plans include our
            core features with no hidden fees.
          </p>

          {/* Toggle */}
          <motion.div
            className="inline-flex items-center gap-4 p-2 rounded-full glass"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span
              className={`text-sm ${!isAnnual ? "text-white" : "text-gray-400"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 rounded-full bg-dark-800 transition-colors"
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 rounded-full bg-gradient-to-r from-neon-green to-neon-blue"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`text-sm ${isAnnual ? "text-white" : "text-gray-400"}`}
            >
              Annual <span className="text-neon-green">(Save 20%)</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-neon-green to-neon-blue text-dark-950 text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`relative h-full p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl glass overflow-hidden ${
                  plan.popular ? "border border-neon-green/30" : ""
                }`}
              >
                {/* Gradient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Plan Name */}
                <h3
                  className={`text-2xl font-bold mb-2 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
                >
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  {typeof plan.price === "number" ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">
                        ${isAnnual ? Math.floor(plan.price * 0.8) : plan.price}
                      </span>
                      <span className="text-gray-400">{plan.period}</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-white">
                      {plan.price}
                    </div>
                  )}
                  {isAnnual && typeof plan.price === "number" && (
                    <div className="text-sm text-neon-green mt-1">
                      Save ${Math.floor(plan.price * 0.2 * 12)}/year
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-4 rounded-xl font-semibold mb-8 transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-neon-green to-neon-blue text-dark-950 hover:shadow-glow-green"
                      : "border border-white/20 text-white hover:border-neon-green hover:text-neon-green"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </motion.button>

                {/* Features */}
                <div className="space-y-4">
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    What's included:
                  </div>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mt-0.5`}
                      >
                        <svg
                          className="w-3 h-3 text-dark-950"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 opacity-50"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-dark-700 flex items-center justify-center mt-0.5">
                        <svg
                          className="w-3 h-3 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-500 text-sm line-through">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">
            Have questions? Check our{" "}
            <span className="text-neon-green cursor-pointer hover:underline">
              FAQ
            </span>{" "}
            or{" "}
            <span className="text-neon-green cursor-pointer hover:underline">
              contact us
            </span>
          </p>
          <p className="text-gray-500 text-sm">
            All plans come with a 14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
