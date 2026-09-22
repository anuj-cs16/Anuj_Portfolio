import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const skillCategories = [
  {
    number: '01',
    category: 'Languages',
    subtitle: 'Python, JavaScript (ES6+), Core Java Principles',
    skillsList: ['Python (100%)', 'JavaScript (ES6+) (100%)', 'Core Java (OOP)'],
  },
  {
    number: '02',
    category: 'Frontend Development',
    subtitle: 'HTML5, CSS3, React.js, Tailwind CSS, Modern UI Systems',
    skillsList: ['HTML5 (100%)', 'CSS3 (100%)', 'React.js (100%)', 'Tailwind CSS (100%)'],
  },
  {
    number: '03',
    category: 'Backend Architecture',
    subtitle: 'Node.js, Express.js, REST APIs, Microservice Routing',
    skillsList: ['Node.js (75%)', 'Express.js (75%)', 'RESTful APIs', 'Authentication'],
  },
  {
    number: '04',
    category: 'Databases & Storage',
    subtitle: 'MongoDB, MySQL, Mongoose ODM, Relational Queries',
    skillsList: ['MongoDB (75%)', 'MySQL (85%)', 'Schema Optimization', 'Data Models'],
  },
  {
    number: '05',
    category: 'AI-Assisted Engineering',
    subtitle: 'Antigravity, Claude Opus 4.8, Emergent AI Workflows & Prompt Systems',
    skillsList: ['Antigravity / AGY (100%)', 'Claude Opus 4.8 (100%)', 'LLM Development'],
  },
];

const Expertise = () => {
  return (
    <section id="skills" className="py-28 px-6 md:px-12 lg:px-20 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-3">
              03 / TECHNICAL PROFICIENCY
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold font-display tracking-tight text-neutral-900 dark:text-neutral-100">
              SKILLS & EXPERTISE.
            </h2>
          </div>
          <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
            // VERIFIED CORE COMPETENCIES
          </p>
        </div>

        {/* Large Typography Rows */}
        <div className="border-t border-neutral-200 dark:border-neutral-800">
          {skillCategories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group py-8 sm:py-10 border-b border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-neutral-200/30 dark:hover:bg-neutral-900/30 px-4 transition-all duration-300 hover-trigger cursor-pointer"
            >
              {/* Left Side: Number & Large Title */}
              <div className="flex items-center gap-6 sm:gap-10">
                <span className="text-sm font-mono text-neutral-400 dark:text-neutral-500 font-semibold">
                  {item.number}
                </span>
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-neutral-900 dark:text-neutral-100 group-hover:translate-x-4 transition-transform duration-300 tracking-tight">
                  {item.category}
                </h3>
              </div>

              {/* Right Side: Subtitle, Skills Badges & Arrow Icon */}
              <div className="flex items-center gap-8 justify-between md:justify-end">
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors font-normal">
                    {item.subtitle}
                  </p>
                  <div className="flex gap-2 justify-end mt-2">
                    {item.skillsList.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 flex items-center justify-center group-hover:border-neutral-900 dark:group-hover:border-neutral-100 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100 group-hover:text-white dark:group-hover:text-neutral-900 transition-all duration-300 shrink-0">
                  <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;
