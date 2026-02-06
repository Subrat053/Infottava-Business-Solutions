import { useCallback, useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: null, y: null, radius: 150 });
  const animationRef = useRef(null);

  const init = useCallback((canvas, ctx) => {
    const particleCount = Math.min(
      100,
      Math.floor((canvas.width * canvas.height) / 15000),
    );
    particles.current = [];

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * 0.5;
      const speedY = (Math.random() - 0.5) * 0.5;
      const colors = ["#00ff88", "#00d4ff", "#8b5cf6", "#ff0080"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particles.current.push({
        x,
        y,
        size,
        baseSize: size,
        speedX,
        speedY,
        color,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }, []);

  const animate = useCallback((canvas, ctx) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((particle, index) => {
      // Mouse interaction
      if (mouse.current.x !== null && mouse.current.y !== null) {
        const dx = particle.x - mouse.current.x;
        const dy = particle.y - mouse.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.current.radius) {
          const force =
            (mouse.current.radius - distance) / mouse.current.radius;
          const angle = Math.atan2(dy, dx);
          particle.x += Math.cos(angle) * force * 2;
          particle.y += Math.sin(angle) * force * 2;
          particle.size = particle.baseSize * (1 + force);
        } else {
          particle.size += (particle.baseSize - particle.size) * 0.1;
        }
      }

      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Boundary check
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();

      // Draw connections
      particles.current.forEach((particle2, index2) => {
        if (index !== index2) {
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = ((120 - distance) / 120) * 0.2;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        }
      });
    });

    ctx.globalAlpha = 1;
    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas, ctx);
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    animate(canvas, ctx);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [init, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
};

export default ParticleBackground;
