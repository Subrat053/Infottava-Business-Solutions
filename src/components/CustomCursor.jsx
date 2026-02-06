import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = ({ variant }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(0, 255, 136, 0.3)",
      mixBlendMode: "difference",
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(0, 255, 136, 0.15)",
      mixBlendMode: "difference",
    },
  };

  // Hide custom cursor on mobile/touch devices
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        variants={variants}
        animate={variant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-green pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35,
        }}
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Trailing effect */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-3 h-3 rounded-full bg-neon-green/20 pointer-events-none z-[9998] hidden md:block"
          animate={{
            x: mousePosition.x - 6,
            y: mousePosition.y - 6,
          }}
          transition={{
            type: "spring",
            stiffness: 150 - i * 20,
            damping: 20 + i * 5,
          }}
          style={{ opacity: isVisible ? 0.3 - i * 0.05 : 0 }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
