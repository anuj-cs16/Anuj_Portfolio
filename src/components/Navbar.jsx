import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#050814]/80 backdrop-blur-md border-b border-white/5 py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#a855f7] p-[1.5px] shadow-[0_0_15px_rgba(0,212,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] transition-all duration-300">
            <div className="w-full h-full bg-[#050814] rounded-[10px] flex items-center justify-center font-extrabold text-lg text-slate-100 font-poppins">
              AD
            </div>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-slate-100 block group-hover:text-[#00d4ff] transition-colors">
              Anuj Dubey
            </span>
            <span className="text-[10px] font-mono text-[#00d4ff] uppercase tracking-wider block -mt-1">
              Full-Stack MERN Developer
            </span>
          </div>
        </Link>

        {/* Center Pill Badge - Hireable Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-[#00d4ff]/30 text-xs font-mono text-slate-300 shadow-[0_0_10px_rgba(0,212,255,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Available for Full-time Roles & Internships
        </div>

        {/* Right Social Links */}
        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="https://github.com/anuj-cs16"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-[#00d4ff] hover:bg-white/5 transition-all"
            aria-label="GitHub Profile"
          >
            <FaGithub size={19} />
          </a>
          <a
            href="https://www.linkedin.com/in/anuj-dubey-511b55313/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-[#00d4ff] hover:bg-white/5 transition-all"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={19} />
          </a>
          <a
            href="https://www.instagram.com/anuj_16dubey/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-[#a855f7] hover:bg-white/5 transition-all"
            aria-label="Instagram Profile"
          >
            <FaInstagram size={19} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
