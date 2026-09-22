import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';

const AboutStatement = () => {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'B.Tech CSE Undergrad',
      detail: '3rd Year Student @ Aravali College of Engineering & Management, Faridabad',
    },
    {
      icon: Code2,
      title: 'Software Engineer',
      detail: 'Architecting custom web applications & servicing client businesses end-to-end',
    },
    {
      icon: Trophy,
      title: 'Hackathon Champion',
      detail: 'Winner of 10 hackathons (15+ participated), including 1 at the national level',
    },
    {
      icon: Sparkles,
      title: 'AI-Assisted Engineer',
      detail: 'Advanced user of Antigravity, Claude, & LLM-driven development workflows',
    },
  ];

  return (
    <section id="about" className="py-28 px-6 md:px-12 lg:px-20 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Section Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            01 / PHILOSOPHY & OBJECTIVE
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Main Large Editorial Statement (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.12] text-neutral-900 dark:text-neutral-100 mb-8">
              "Architecting Real-World Software at the intersection of code, design and motion."
            </h2>
          </motion.div>

          {/* Secondary Supporting Text & Details (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6 lg:pt-3 text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed font-normal"
          >
            <p>
              Third-year B.Tech CSE student with hands-on experience building and shipping real-world software. Seeking a full-time role or internship in software development to apply strong fundamentals in Python, MERN stack, and AI-assisted engineering.
            </p>

            <div className="p-5 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 text-xs font-mono text-neutral-700 dark:text-neutral-300 space-y-1">
              <div><span className="font-bold text-neutral-900 dark:text-neutral-100">Location:</span> Faridabad, Haryana, India</div>
              <div><span className="font-bold text-neutral-900 dark:text-neutral-100">Focus:</span> Scalable MERN Systems, High-Performance Web Apps & Automation</div>
            </div>
          </motion.div>

        </div>

        {/* 4 Pillars Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#F7F7F5] dark:bg-[#141416] hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-900 dark:text-neutral-100 flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-lg font-bold font-display text-neutral-900 dark:text-neutral-100 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutStatement;
