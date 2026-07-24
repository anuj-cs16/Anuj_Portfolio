import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // Play powerful car startup sound automatically on mount
    const audio = new Audio('/car-start.mp3');
    audio.volume = 0.5; // Clear, rich volume level (50%)
    audioRef.current = audio;

    // Attempt to play immediately on load
    audio.play().catch((err) => {
      console.warn('[Audio] Autoplay blocked by browser. Please enable site sound permission to play on load:', err.message);
    });

    // Disable scrolling when preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onFinish();
          }, 300);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // 30ms * 100 = 3 seconds loading duration

    return () => {
      clearInterval(timer);
      document.body.style.overflow = originalOverflow;

      // Stop and fade out the audio immediately when loading page finishes
      if (audioRef.current) {
        const audio = audioRef.current;
        let vol = audio.volume;
        const fadeInterval = setInterval(() => {
          if (vol > 0.01) {
            vol -= 0.02;
            if (vol < 0) vol = 0;
            audio.volume = vol;
          } else {
            clearInterval(fadeInterval);
            audio.pause();
            audio.currentTime = 0;
          }
        }, 15);
      }
    };
  }, [onFinish]);

  const getStatusText = (val) => {
    if (val < 25) return 'INITIALIZING CORE SYSTEM...';
    if (val < 50) return 'ESTABLISHING SECURE PROTOCOLS...';
    if (val < 75) return 'LOADING PORTFOLIO ASSETS...';
    if (val < 100) return 'FINALIZING INTERFACE...';
    return 'SYSTEM ONLINE';
  };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[10000] bg-[#050814] flex flex-col items-center justify-center font-poppins px-4"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Cyber Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 cyber-ambient-cyan" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 cyber-ambient-purple" />

      {/* Cyber Logo Core */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="w-24 h-24 border-2 border-dashed border-[#00d4ff]/40 rounded-full animate-spin-slow" />
        <div className="absolute w-16 h-16 border-2 border-[#a855f7] rounded-full animate-pulse-glow" />
        <span className="absolute font-extrabold text-2xl tracking-widest gradient-text-cyan-purple">
          AD
        </span>
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl font-bold tracking-wider text-slate-100 mb-6 text-center"
      >
        ANUJ DUBEY <span className="text-[#00d4ff]">//</span> PORTFOLIO
      </motion.h2>

      {/* Status & Percentage Header */}
      <div className="w-72 md:w-96 flex items-center justify-between text-xs font-mono mb-2">
        <span className="text-[#94a3b8] uppercase tracking-wider">
          {getStatusText(progress)}
        </span>
        <span className="font-bold text-[#00d4ff] text-sm tracking-wider drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]">
          {progress}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-72 md:w-96 h-3 bg-[#0a0e27] border border-[#00d4ff]/30 rounded-full p-0.5 shadow-[0_0_20px_rgba(0,212,255,0.25)] relative overflow-hidden">
        {/* Fill Bar with Gradient and Glowing Tip */}
        <div
          className="h-full bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#00d4ff] rounded-full transition-all duration-75 relative"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer / Glow Tip effect */}
          {progress > 0 && (
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_10px_#ffffff,0_0_15px_#00d4ff]" />
          )}
        </div>
      </div>

      {/* Bottom Subtext Percentage */}
      <p className="mt-4 text-[11px] font-mono text-slate-500 tracking-widest uppercase">
        LOAD PROGRESS: <span className="text-slate-300 font-bold">{progress} / 100</span>
      </p>
    </motion.div>
  );
};

export default Preloader;
