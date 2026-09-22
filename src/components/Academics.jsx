import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Trophy, Medal, Star } from 'lucide-react';

const educationItems = [
  {
    type: 'Degree',
    title: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
    institution: 'Aravali College of Engineering and Management',
    location: 'Faridabad, Haryana, India',
    status: '3rd Year Undergraduate (Expected 2026)',
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
    details: [
      'Mastered Object-Oriented Programming principles, Exception Handling, Java Collections Framework, Multi-threading, and JDBC.',
      'Built modular Java applications with clean architecture and database connectivity.',
    ],
  },
];

const achievementsItems = [
  {
    title: 'Winner of 10 Hackathons',
    subtitle: 'Includes 1 National Level Victory (15+ Participated)',
    description: 'Secured 1st place in 10 competitive hackathons out of 15+ participated, prototyping full-stack software solutions under strict time constraints.',
    icon: Trophy,
  },
  {
    title: 'Smart India Hackathon (SIH)',
    subtitle: '1st Place — Internal Campus Round',
    description: 'Lead developer for the winning SIH team, designing an innovative software architecture for government problem statements.',
    icon: Medal,
  },
  {
    title: 'Hackathon Coordinator',
    subtitle: 'Technical Event Organizer & Mentor',
    description: 'Organized & coordinated campus-wide hackathons, mentoring junior developers in full-stack architecture and git workflows.',
    icon: Award,
  },
];

const Academics = () => {
  return (
    <section id="education" className="py-28 px-6 md:px-12 lg:px-20 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-3">
              05 / ACADEMICS & HONORS
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold font-display tracking-tight text-neutral-900 dark:text-neutral-100">
              EDUCATION & ACHIEVEMENTS.
            </h2>
          </div>
          <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
            // CREDENTIALS & RECOGNITION
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Education & Credentials (6 Cols) */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-2xl font-bold font-display text-neutral-900 dark:text-neutral-100 flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <GraduationCap size={24} />
              <span>Academic Credentials</span>
            </h3>

            <div className="space-y-6">
              {educationItems.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-[#F7F7F5] dark:bg-[#141416] space-y-4"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                        {edu.type}
                      </span>
                      <h4 className="text-xl font-bold font-display text-neutral-900 dark:text-neutral-100">
                        {edu.institution}
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 text-[10px] font-mono text-neutral-500">
                      {edu.status}
                    </span>
                  </div>

                  <h5 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 font-display">
                    {edu.title}
                  </h5>

                  <ul className="space-y-2">
                    {edu.details.map((point, pIdx) => (
                      <li key={pIdx} className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed flex items-start gap-2">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Achievements & Hackathons (6 Cols) */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-2xl font-bold font-display text-neutral-900 dark:text-neutral-100 flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <Trophy size={24} />
              <span>Key Achievements</span>
            </h3>

            <div className="space-y-6">
              {achievementsItems.map((ach, idx) => {
                const Icon = ach.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-[#F7F7F5] dark:bg-[#141416] space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-900 dark:text-neutral-100 flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold font-display text-neutral-900 dark:text-neutral-100">
                          {ach.title}
                        </h4>
                        <span className="text-xs font-mono text-neutral-500 block">
                          {ach.subtitle}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal pt-1">
                      {ach.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Academics;
