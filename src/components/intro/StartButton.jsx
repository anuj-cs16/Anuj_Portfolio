import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const StartButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);

  // Canvas starfield animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      // Adjust star count based on screen size
      const numStars = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.4,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          alpha: Math.random() * 0.7 + 0.3,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        // Smooth twinkle update
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha >= 1) {
          star.alpha = 1;
          star.twinkleDir = -1;
        } else if (star.alpha <= 0.2) {
          star.alpha = 0.2;
          star.twinkleDir = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${star.alpha})`; // Cyan tinted stars
        ctx.shadowBlur = star.radius * 2;
        ctx.shadowColor = '#00d4ff';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for next draw
      });

      // Drifting stars
      stars.forEach((star) => {
        star.y -= 0.12; // Slow upward drift
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050814] overflow-hidden select-none"
    >
      {/* Canvas Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />

      {/* Cyberpunk Vignette & Atmosphere Gradients */}
      <div className="absolute inset-0 radial-darkness pointer-events-none" />
      <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-[#00d4ff]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-[#a855f7]/5 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Interactive Core */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Rotating Ignition Ring */}
        <div
          className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] pointer-events-none transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${isHovered ? 1.06 : 1})`,
          }}
        >
          <div
            className={`w-full h-full rounded-full border-2 border-dashed transition-colors duration-500 ${
              isHovered ? 'dial-ring-hover border-[#00d4ff]/80' : 'dial-ring border-[#00d4ff]/25'
            }`}
          />
        </div>

        {/* Middle Segmented Reverse Ring */}
        <div
          className="absolute w-[180px] h-[180px] md:w-[230px] md:h-[230px] pointer-events-none transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${isHovered ? 1.04 : 1})`,
          }}
        >
          <div
            className={`w-full h-full rounded-full border border-double border-t-[#a855f7]/40 border-b-[#a855f7]/40 border-l-transparent border-r-transparent transition-transform duration-1000 ease-out`}
            style={{
              transform: `rotate(${isHovered ? -180 : 0}deg)`,
            }}
          />
        </div>

        {/* Circular START Button */}
        <motion.button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-[#050814]/90 border-2 border-[#00d4ff]/50 flex flex-col items-center justify-center relative cursor-pointer outline-none transition-all duration-300 glow-pulse-cyan z-10 ${
            isHovered
              ? 'shadow-[0_0_40px_rgba(0,212,255,0.7),0_0_20px_rgba(168,85,247,0.3)] border-[#00d4ff]'
              : 'shadow-[0_0_15px_rgba(0,212,255,0.2)]'
          }`}
        >
          {/* Inner Grid overlay */}
          <div className="absolute inset-0 rounded-full opacity-[0.03] bg-[radial-gradient(#00d4ff_1px,transparent_1px)] [background-size:8px_8px]" />

          {/* Ring highlight shadow inside button */}
          <div className="absolute inset-1 rounded-full border border-white/5 pointer-events-none" />

          {/* Button Text */}
          <span className="text-[#00d4ff] text-xl md:text-2xl font-black tracking-[0.25em] pl-[0.25em] intro-orbitron glow-text-cyan transition-colors duration-300">
            START
          </span>
          <span className="text-[#a855f7]/80 text-[8px] md:text-[9px] tracking-[0.3em] pl-[0.3em] font-semibold mt-1 uppercase transition-colors duration-300">
            SYSTEM INIT
          </span>
        </motion.button>
      </div>

      {/* Under-button Hint */}
      <div className="mt-16 text-center z-10">
        <span className="text-[#00d4ff]/60 text-xs md:text-sm font-semibold tracking-widest uppercase blink-fade intro-orbitron">
          Click to Enter
        </span>
      </div>
    </motion.div>
  );
};

export default StartButton;
