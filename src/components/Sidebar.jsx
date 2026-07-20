import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaLaptopCode, FaProjectDiagram, FaGraduationCap, FaEnvelope } from 'react-icons/fa';

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'about', label: 'About', icon: FaUser },
    { id: 'skills', label: 'Skills', icon: FaLaptopCode },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'contact', label: 'Contact', icon: FaEnvelope },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Floating Left Sidebar */}
      <aside className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 p-3 rounded-2xl glass-card border border-white/10 shadow-[0_0_20px_rgba(0,212,255,0.15)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`group relative p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-[#00d4ff]/20 to-[#a855f7]/20 border border-[#00d4ff]/60 text-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              aria-label={item.label}
            >
              <Icon size={20} />
              
              {/* Tooltip on hover */}
              <span className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#0a0e27] border border-[#00d4ff]/40 rounded-lg text-xs font-mono text-[#00d4ff] opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                {item.label}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Mobile Bottom Dock Navbar */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-2 rounded-full glass-card border border-white/10 shadow-[0_0_25px_rgba(0,212,255,0.25)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`p-3 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-[#050814] shadow-[0_0_15px_rgba(0,212,255,0.6)]'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
              aria-label={item.label}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
