import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaDownload, FaArrowRight, FaCode, FaRocket } from 'react-icons/fa';

const Hero = () => {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden px-4 md:px-12 lg:px-24">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[500px] md:h-[500px] cyber-ambient-cyan -z-10" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-72 h-72 md:w-[500px] md:h-[500px] cyber-ambient-purple -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Intro Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#00d4ff]/40 mb-6 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            <FaRocket className="text-[#00d4ff] text-xs" />
            <span className="text-xs font-mono text-[#00d4ff] tracking-wider uppercase">
              Full-Stack Developer & Innovator
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-slate-100 tracking-tight leading-none mb-4">
            Hi, I'm <span className="gradient-text-cyan-purple">Anuj</span>
          </h1>

          {/* Dynamic Typewriter Subheading */}
          <div className="h-12 sm:h-14 flex items-center text-xl sm:text-3xl font-semibold font-poppins text-slate-300 mb-6">
            <span className="text-[#00d4ff] font-mono mr-3">&gt;</span>
            <span className="text-[#a855f7]">
              <Typewriter
                words={[
                  'Software Developer',
                  'Full-Stack Web Developer',
                  'Full-Stack MERN Developer',
                  'AI-Assisted Engineer',
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
            I create real-world software solutions — from live POS systems to AI-assisted web apps. Passionate about clean code and shipping products that matter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToProjects}
              className="btn-neon-cyan px-7 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 cursor-pointer"
            >
              View My Work <FaArrowRight size={14} />
            </button>
            <a
              href="/cv.pdf"
              download="Anuj_Dubey_CV.pdf"
              className="btn-neon-purple px-7 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 cursor-pointer"
            >
              <FaDownload size={14} /> Download CV
            </a>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-lg">
            <div>
              <span className="text-2xl sm:text-3xl font-bold font-poppins text-[#00d4ff] block">
                6+
              </span>
              <span className="text-xs text-slate-400 font-mono">Clients Serviced</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold font-poppins text-[#a855f7] block">
                5x
              </span>
              <span className="text-xs text-slate-400 font-mono">Hackathon Winner</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold font-poppins text-emerald-400 block">
                100%
              </span>
              <span className="text-xs text-slate-400 font-mono">Live Systems Shipped</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Glowing Cyber Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative -translate-y-2 lg:-translate-y-6"
        >
          {/* Animated Neon Rings */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            {/* Ring 1 - Spinning Cyan */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00d4ff]/40 animate-spin-slow" />
            
            {/* Ring 2 - Pulsing Purple Glow */}
            <div className="absolute inset-4 rounded-full border-2 border-[#a855f7]/60 shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse-glow" />

            {/* Profile Graphic Container */}
            <div className="w-60 h-60 sm:w-68 sm:h-68 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#0a0e27] via-[#050814] to-[#11183c] border-2 border-[#00d4ff]/80 p-2 overflow-hidden shadow-[0_0_40px_rgba(0,212,255,0.3)] relative group">
              <img
                src="/anuj-profile.jpg"
                alt="Anuj Dubey"
                style={{ objectPosition: '50% 10%' }}
                className="w-full h-full object-cover rounded-full transition-all duration-500 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Floating Tech Badge */}
            <div className="absolute -bottom-2 -right-2 glass-card px-4 py-2 rounded-xl border border-[#00d4ff]/50 shadow-[0_0_15px_rgba(0,212,255,0.3)] flex items-center gap-2 animate-float-slow">
              <FaCode className="text-[#00d4ff]" />
              <span className="text-xs font-mono font-semibold text-slate-200">MERN Stack Pro</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
