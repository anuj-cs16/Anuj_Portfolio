import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const Education = () => {
  const educationItems = [
    {
      type: 'Degree',
      title: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
      institution: 'Aravali College of Engineering and Management',
      location: 'Faridabad, Haryana, India',
      status: '3rd Year Undergraduate (Expected 2026)',
      icon: FaGraduationCap,
      color: 'border-[#00d4ff]/40 text-[#00d4ff]',
      details: [
        'Core focus on Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Web Engineering.',
        'Active student lead in technical hackathons and competitive coding circles.',
      ],
    },
    {
      type: 'Certification',
      title: 'Core Java Specialization (8-Week Intensive Training)',
      institution: 'Internshala Trainings',
      location: 'Online Credential',
      status: 'Completed (2025)',
      icon: FaCertificate,
      color: 'border-[#a855f7]/40 text-[#a855f7]',
      details: [
        'Mastered Object-Oriented Programming principles, Exception Handling, Java Collections Framework, Multi-threading, and JDBC.',
        'Built modular Java applications with clean architecture and database connectivity.',
      ],
    },
  ];

  return (
    <section id="education" className="py-20 px-4 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-widest mb-2">
            // 05. ACADEMICS & CREDENTIALS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Education & <span className="gradient-text-cyan-purple">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full mt-4" />
        </div>

        {/* Two-Column Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {educationItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-card glass-card-hover p-8 rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-[#050814] border ${item.color}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#00d4ff] uppercase tracking-wider block">
                          {item.type}
                        </span>
                        <h3 className="text-xl font-bold font-poppins text-slate-100">
                          {item.institution}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-base font-semibold text-slate-200 mb-3 font-poppins">
                    {item.title}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-6">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-[#00d4ff]" /> {item.location}
                    </span>
                    <span className="flex items-center gap-1 text-[#a855f7]">
                      <FaCalendarAlt /> {item.status}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-4">
                    {item.details.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <FaCheckCircle className="text-emerald-400 text-xs mt-1 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Verified Credentials</span>
                  <span className="text-[#00d4ff]">Faridabad, HR</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
