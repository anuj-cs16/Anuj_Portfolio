import React from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaCodeBranch, FaCheckCircle, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const highlights = [
    {
      icon: FaUserGraduate,
      title: 'B.Tech CSE Undergrad',
      detail: '3rd Year Student @ Aravali College of Engineering & Management, Faridabad',
      color: 'text-[#00d4ff]',
    },
    {
      icon: FaCodeBranch,
      title: 'Software Engineer',
      detail: 'Architecting custom web applications & servicing client businesses end-to-end',
      color: 'text-[#a855f7]',
    },
    {
      icon: FaCheckCircle,
      title: 'Hackathon Champion',
      detail: 'Winner of 10 hackathons (15+ participated), including 1 at the national level',
      color: 'text-emerald-400',
    },
    {
      icon: FaLightbulb,
      title: 'AI-Assisted Engineer',
      detail: 'Advanced user of Antigravity, Claude, & LLM-driven development workflows',
      color: 'text-amber-400',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-widest mb-2">
            // 01. ABOUT ME
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Architecting <span className="gradient-text-cyan-purple">Real-World Software</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Objective Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card p-8 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden shadow-[0_0_20px_rgba(0,212,255,0.1)]"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00d4ff]/10 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-2xl font-bold text-slate-100 mb-4 font-poppins flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#00d4ff] animate-pulse" />
              Career Objective & Vision
            </h3>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
              Third-year B.Tech CSE student with hands-on experience building and shipping real-world software. Seeking a full-time role or internship in software development to apply strong fundamentals in Python, MERN stack, and AI-assisted engineering.
            </p>

            <div className="p-4 rounded-xl bg-[#050814]/80 border border-[#00d4ff]/30 text-sm font-mono text-slate-300 leading-relaxed">
              <span className="text-[#00d4ff] font-bold">Location:</span> Faridabad, Haryana, India <br />
              <span className="text-[#a855f7] font-bold">Focus:</span> Scalable MERN Systems, High-Performance Web Apps & Automation
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card glass-card-hover p-5 rounded-xl border border-white/5 flex flex-col items-start"
                >
                  <Icon className={`${item.color} text-2xl mb-3`} />
                  <h4 className="text-base font-bold text-slate-100 mb-1 font-poppins">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    {item.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
