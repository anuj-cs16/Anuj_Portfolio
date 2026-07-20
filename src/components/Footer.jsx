import React from 'react';
import { FaHeart, FaChevronUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#050814] py-8 px-4 md:px-12 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Copyright Text */}
        <div className="text-xs font-mono text-slate-400 text-center md:text-left">
          © {new Date().getFullYear()} <span className="text-slate-200 font-semibold">Anuj Dubey</span>. Built with the <span className="text-[#00d4ff]">MERN Stack</span> <FaHeart className="inline text-rose-500 mx-1" />
        </div>

        {/* Center Tagline */}
        <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest hidden sm:block">
          Faridabad, HR <span className="text-[#a855f7]">•</span> India
        </div>

        {/* Right Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl glass-card border border-white/10 text-slate-300 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all flex items-center gap-2 text-xs font-mono"
          title="Scroll to Top"
        >
          <span>Top</span>
          <FaChevronUp size={12} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
