// src/components/StarBackground.jsx
import { useEffect, useRef } from "react";

const COLORS = [
  "#FFD166", // yellow
  "#06D6A0", // green
  "#118AB2", // blue
  "#EF476F", // pink
  "#8338EC", // purple
];

export default function StarBackground() {
  const canvasRef = useRef(null);
  const stars = useRef([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const starCount = 80;
  const maxLineDist = 120; // max distance to draw a line between stars

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinitialize stars after resize
      stars.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 3, // medium size
        dx: Math.random() * 0.1 - 0.05,
        dy: Math.random() * 0.1 - 0.05,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };
    
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      // Fill background
      ctx.fillStyle = "#f3f4f6"; // light background to match site
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw constellation lines
      for (let i = 0; i < stars.current.length; i++) {
        for (let j = i + 1; j < stars.current.length; j++) {
          const starA = stars.current[i];
          const starB = stars.current[j];
          const dx = starA.x - starB.x;
          const dy = starA.y - starB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxLineDist) {
            ctx.save();
            ctx.globalAlpha = 0.08 * (1 - dist / maxLineDist); // softer, lighter
            ctx.strokeStyle = "#000"; // subtle gray for light bg
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(starA.x, starA.y);
            ctx.lineTo(starB.x, starB.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Draw stars
      stars.current.forEach((star) => {
        star.x += star.dx;
        star.y += star.dy;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw colored star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw mouse-following circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = "#b983ff";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#b983ff";
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 0.7;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.restore();

      requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
