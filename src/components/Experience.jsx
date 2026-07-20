import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaExternalLinkAlt } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      role: 'Lead Software Engineer',
      company: 'Forge Web',
      location: 'Faridabad, Haryana, India',
      period: 'Feb 2024 – Present',
      description: 'Delivered web development and software automation solutions tailored for local SMBs and client businesses.',
      highlights: [
        'Built & launched Flashbill POS — an offline-first restaurant billing application serving active paying clients.',
        'Serviced 6 business clients end-to-end with high satisfaction and zero downtime.',
        'Developed custom WhatsApp automation tools & lead generation web applications.',
        'Managed client requirement gathering, full-stack architectural design, and deployment pipelines.',
      ],
      tags: ['React', 'Node.js', 'Electron', 'SQLite', 'WhatsApp API', 'Express'],
    },
  ];

  return (
    <section className="py-20 px-4 md:px-12 lg:px-24 bg-[#0a0e27]/40 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-widest mb-2">
            // 02. WORK EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Entrepreneurial <span className="gradient-text-cyan-purple">Track Record</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full mt-4" />
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-8 border-l-2 border-[#00d4ff]/30 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              {/* Timeline Cyber Node */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#050814] border-2 border-[#00d4ff] flex items-center justify-center group-hover:scale-125 group-hover:border-[#a855f7] transition-all shadow-[0_0_15px_rgba(0,212,255,0.6)]">
                <div className="w-2 h-2 rounded-full bg-[#00d4ff] group-hover:bg-[#a855f7]" />
              </div>

              {/* Glass Card Content */}
              <div className="glass-card glass-card-hover p-6 md:p-8 rounded-2xl border border-white/10 relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-100 font-poppins flex items-center gap-2">
                      <FaBriefcase className="text-[#00d4ff] text-lg" />
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#a855f7] mt-1">
                      <span className="flex items-center gap-1">
                        <FaBuilding /> {exp.company}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <FaMapMarkerAlt /> {exp.location}
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/40 text-xs font-mono text-[#00d4ff]">
                    <FaCalendarAlt /> {exp.period}
                  </div>
                </div>

                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                  {exp.description}
                </p>

                <h4 className="text-xs font-mono uppercase text-[#00d4ff] tracking-wider mb-3">
                  Key Achievements & Deliverables:
                </h4>

                <ul className="space-y-2.5 mb-6">
                  {exp.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-3 text-xs md:text-sm text-slate-300">
                      <span className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                        <FaCheck size={10} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-[#0a0e27] border border-white/10 text-xs font-mono text-[#00d4ff]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
