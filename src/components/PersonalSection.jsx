import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Sparkles, Award, Terminal, CheckCircle2 } from 'lucide-react';

const PersonalSection = () => {
  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            06 / PERSONAL PROFILE & BACKGROUND
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Profile Image with Editorial Frame (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-neutral-300 dark:border-neutral-800 shadow-xl group">
              <img
                src="/anuj-profile.jpg"
                alt="Anuj Dubey"
                style={{ objectPosition: '50% 10%' }}
                className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-neutral-900/10 dark:bg-neutral-900/20" />

              {/* Status Badge Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-black/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-900 dark:text-neutral-100 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Roles & Internships</span>
                </div>
                <span className="text-neutral-400">Faridabad, IN</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Editorial Biography & Facts (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                BIOGRAPHY & OBJECTIVE
              </span>
              <h3 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
                Anuj Dubey
              </h3>
              <p className="text-sm font-mono text-neutral-500 uppercase tracking-wider mt-1">
                Full-Stack MERN Developer & AI-Assisted Engineer
              </p>
            </div>

            <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
              Third-year B.Tech CSE student at Aravali College of Engineering and Management with hands-on experience building and shipping real-world software. Seeking a full-time role or internship in software development to apply strong fundamentals in Python, MERN stack, and AI-assisted engineering.
            </p>

            {/* Structured Detail Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  <MapPin size={14} className="text-neutral-900 dark:text-neutral-100" />
                  <span>LOCATION</span>
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Faridabad, Haryana, India
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  <Sparkles size={14} className="text-neutral-900 dark:text-neutral-100" />
                  <span>CURRENT FOCUS</span>
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Scalable MERN Systems & Automation
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  <Award size={14} className="text-neutral-900 dark:text-neutral-100" />
                  <span>ACCOLADES</span>
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  10x Hackathon Champion (SIH Lead)
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  <Terminal size={14} className="text-neutral-900 dark:text-neutral-100" />
                  <span>AVAILABILITY</span>
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Full-Time Roles & Internships
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PersonalSection;
