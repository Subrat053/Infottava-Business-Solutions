import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Stats from "./components/Stats";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ParticleBackground from "./components/ParticleBackground";

function App() {
  const [loading, setLoading] = useState(true);
  const [cursorVariant, setCursorVariant] = useState("default");
  const mainRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: mainRef,
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const enterCursor = () => setCursorVariant("hover");
  const leaveCursor = () => setCursorVariant("default");

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CustomCursor variant={cursorVariant} />

            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple origin-left z-[100]"
              style={{ scaleX }}
            />

            <ParticleBackground />

            <div ref={mainRef} className="relative z-10">
              <Navbar onHover={enterCursor} onLeave={leaveCursor} />
              <Hero onHover={enterCursor} onLeave={leaveCursor} />
              <Services onHover={enterCursor} onLeave={leaveCursor} />
              <About onHover={enterCursor} onLeave={leaveCursor} />
              <Stats />
              <Portfolio onHover={enterCursor} onLeave={leaveCursor} />
              <Testimonials />
              {/* <Pricing onHover={enterCursor} onLeave={leaveCursor} /> */}
              <Contact onHover={enterCursor} onLeave={leaveCursor} />
              <Footer onHover={enterCursor} onLeave={leaveCursor} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
