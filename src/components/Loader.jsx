import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-dark-950"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Logo Text */}
        <motion.div
          className="relative mb-8 flex flex-col items-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glow effect behind text */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple animate-pulse" />

          {/* Company Name */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <picture>
              <source srcSet="/logo-rmbg.webp" type="image/webp" />
              <img src="/logo-rmbg.png" alt="InfoTattva Logo" width="96" height="96" loading="eager" className="w-24 h-24 lg:scale-150 mb-4 ml-28 drop-shadow-[0_0_180px_rgba(255,255,255,0.8)] " />
            </picture>
            {/* <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-neon-blue">Info</span>
              <span className="text-neon-green">tattva</span>
            </h1> */}
            <motion.p
              className="text-sm md:text-base text-gray-400 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Business Solutions (OPC) Private Limited
            </motion.p>
          </motion.div>

          {/* Orbiting dots */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-neon-green"
            style={{ top: "50%", left: "0%", marginTop: -6, marginLeft: -30 }}
            animate={{
              x: [0, 100, 200, 100, 0],
              y: [-20, 0, 20, 0, -20],
              opacity: [0.5, 1, 0.5, 1, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-neon-purple"
            style={{ top: "50%", right: "0%", marginTop: -4, marginRight: -30 }}
            animate={{
              x: [0, -100, -200, -100, 0],
              y: [20, 0, -20, 0, 20],
              opacity: [1, 0.5, 1, 0.5, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-sm font-light tracking-widest text-gray-500">
            LOADING
          </span>
          <motion.span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-neon-green"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.span>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mt-6 w-48 h-0.5 bg-dark-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
