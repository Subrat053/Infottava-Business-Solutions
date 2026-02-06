import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed", icon: "📦" },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
  { value: 150, suffix: "M+", label: "Revenue Generated", icon: "💰" },
  { value: 24, suffix: "/7", label: "Support Available", icon: "🎧" },
];

const AnimatedCounter = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span className="gradient-text-animated">
      {count}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  return (
    <section
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
      ref={containerRef}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,255,136,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-neon-green/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-neon-purple/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          onViewportEnter={() => setIsInView(true)}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
            Numbers That <span className="gradient-text">Speak</span> For Us
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto px-2">
            Our track record of success is reflected in the numbers that matter
            most
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="group relative"
            >
              <div className="relative p-3 sm:p-5 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl glass text-center overflow-hidden">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <motion.div
                  className="text-xl sm:text-2xl md:text-4xl mb-1 sm:mb-3"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {stat.icon}
                </motion.div>

                {/* Number */}
                <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-0.5 sm:mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={isInView}
                  />
                </div>

                {/* Label */}
                <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm lg:text-base leading-tight">
                  {stat.label}
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-4 right-4 w-16 h-16 border border-neon-green/30 rounded-lg rotate-45 transform origin-top-right" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 md:mt-20 overflow-hidden"
        >
          <div className="flex whitespace-nowrap">
            <motion.div
              className="flex items-center gap-6 sm:gap-8 md:gap-12 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white/5"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-6 sm:gap-8 md:gap-12">
                  <span>DIGITAL MARKETING</span>
                  <span className="text-neon-green/20">★</span>
                  <span>SEO EXPERTS</span>
                  <span className="text-neon-purple/20">★</span>
                  <span>GROWTH PARTNERS</span>
                  <span className="text-neon-blue/20">★</span>
                  <span>BRAND BUILDERS</span>
                  <span className="text-neon-pink/20">★</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
