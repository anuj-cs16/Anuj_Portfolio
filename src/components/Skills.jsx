import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaDesktop, FaServer, FaDatabase, FaRobot } from 'react-icons/fa';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Languages',
      icon: FaCode,
      skills: [
        { name: 'Python', level: 100 },
        { name: 'JavaScript (ES6+)', level: 100 },
        { name: 'Core Java', level: 90 },
      ],
    },
    {
      category: 'Frontend Development',
      icon: FaDesktop,
      skills: [
        { name: 'React.js / Next.js', level: 95 },
        { name: 'Tailwind CSS', level: 100 },
        { name: 'HTML5 & CSS3', level: 100 },
        { name: 'Bootstrap / EJS', level: 90 },
      ],
    },
    {
      category: 'Backend Architecture',
      icon: FaServer,
      skills: [
        { name: 'Node.js & Express', level: 85 },
        { name: 'FastAPI / Python', level: 85 },
        { name: 'RESTful APIs', level: 90 },
      ],
    },
    {
      category: 'Databases & Storage',
      icon: FaDatabase,
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'MySQL', level: 85 },
        { name: 'SQLite', level: 85 },
      ],
    },
    {
      category: 'AI-Assisted Engineering',
      icon: FaRobot,
      skills: [
        { name: 'Antigravity / Claude Opus / Agentic Workflows', level: 100 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-widest mb-2">
            // 03. TECHNICAL PROFICIENCY
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Skills & <span className="gradient-text-cyan-purple">Core Competencies</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full mt-4" />
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, catIdx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#a855f7]/20 border border-[#00d4ff]/40 text-[#00d4ff]">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold font-poppins text-slate-100">
                      {cat.category}
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx}>
                        <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-1.5">
                          <span className="font-semibold">{skill.name}</span>
                          <span className="text-[#00d4ff] font-bold">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#050814] rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 + sIdx * 0.1, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-[#a855f7] shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Verified Competency</span>
                  <span className="text-[#a855f7]">MERN Ecosystem</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
