import { useContext, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeContext } from "./ThemeContext";

const Hero = ({ onHover, onLeave }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  };

  useEffect(() => {
      if (theme === "night") {
        document.documentElement.classList.add("night");
      } else {
        document.documentElement.classList.remove("night");
      }
    }, [theme]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-neon-green/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-neon-purple/10 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-blue/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-sm text-gray-300">
            #1 Digital Marketing Agency in India
          </span>
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden">
          <motion.h1
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 leading-tight"
          >
            <span className="text-white">Transform Your</span>
            <br />
            <span className="gradient-text-animated">Digital Presence</span>
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-6 md:mb-8 px-2"
        >
          We craft data-driven strategies that amplify your brand, drive
          conversions, and deliver measurable results. Ready to dominate your
          market?
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 md:mb-16 px-4"
        >
          <motion.a
            href="#contact"
            className="btn-primary"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start Your Journey
            <svg
              className="inline-block ml-2 w-5 h-5"
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
            </svg>
          </motion.a>
          <motion.a
            href="#portfolio"
            className="btn-outline"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Our Work
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border-2 border-gray-600 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 rounded-full bg-neon-green"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-20 w-20 h-20 hidden lg:block"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full morph-shape opacity-50" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-20 w-16 h-16 hidden lg:block"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="w-full h-full rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple opacity-50" />
      </motion.div>
    </section>
  );
};

export default Hero;
