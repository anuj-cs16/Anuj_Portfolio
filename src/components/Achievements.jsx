import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaBullseye, FaAward, FaStar } from 'react-icons/fa';

const Achievements = () => {
  const achievements = [
    {
      title: 'Winner of 10 Hackathons',
      subtitle: 'Includes 1 National Level Victory (15+ Participated)',
      description: 'Secured 1st place in 10 competitive hackathons out of 15+ participated, prototyping full-stack software solutions under strict time constraints.',
      icon: FaTrophy,
      glowColor: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:border-amber-400/60',
      badgeColor: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
    },
    {
      title: 'Smart India Hackathon (SIH)',
      subtitle: '1st Place — Internal Campus Round',
      description: 'Lead developer for the winning SIH team, designing an innovative software architecture for government problem statements.',
      icon: FaMedal,
      glowColor: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:border-[#00d4ff]/60',
      badgeColor: 'bg-[#00d4ff]/10 border-[#00d4ff]/40 text-[#00d4ff]',
    },
    {
      title: 'Hackathon Coordinator',
      subtitle: 'Technical Event Organizer & Mentor',
      description: 'Organized & coordinated campus-wide hackathons, mentoring junior developers in full-stack architecture and git workflows.',
      icon: FaBullseye,
      glowColor: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:border-[#a855f7]/60',
      badgeColor: 'bg-[#a855f7]/10 border-[#a855f7]/40 text-[#a855f7]',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-12 lg:px-24 bg-[#0a0e27]/40 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-widest mb-2">
            // 06. HONORS & RECOGNITION
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Key <span className="gradient-text-cyan-purple">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full mt-4" />
        </div>

        {/* Trophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`glass-card p-8 rounded-2xl border border-white/10 flex flex-col justify-between transition-all duration-300 ${item.glowColor} group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-[#050814] border border-white/10 text-amber-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                      <Icon size={28} />
                    </div>
                    <span className={`px-3 py-1 rounded-full border text-[11px] font-mono ${item.badgeColor}`}>
                      Top Honor
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-poppins text-slate-100 mb-1 group-hover:text-[#00d4ff] transition-colors">
                    {item.title}
                  </h3>
                  <h4 className="text-xs font-mono text-[#a855f7] mb-4">
                    {item.subtitle}
                  </h4>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-amber-400">
                    <FaStar size={12} /> Awarded
                  </span>
                  <span>Excellence</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
