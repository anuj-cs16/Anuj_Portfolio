import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaTag, FaLayerGroup } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-[#050814]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl glass-card rounded-2xl border border-[#00d4ff]/40 overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.3)] max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0a0e27]/90">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00d4ff]" />
              <h3 className="text-xl font-bold font-poppins text-slate-100">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-all"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Project Banner Image */}
            <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-white/10 relative">
              <img
                src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#050814]/80 backdrop-blur-md border border-[#00d4ff]/40 text-xs font-mono text-[#00d4ff]">
                {project.category || 'Featured'}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider mb-2">
                Project Overview & Architecture
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-mono text-[#a855f7] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <FaTag size={12} /> Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-[#050814] border border-[#00d4ff]/30 text-xs font-mono text-slate-200 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Links */}
          <div className="p-5 border-t border-white/10 bg-[#0a0e27]/90 flex items-center justify-end gap-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon-purple px-5 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2"
              >
                <FaGithub size={14} /> Repository Code
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon-cyan px-5 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2"
              >
                <FaExternalLinkAlt size={12} /> Live Preview
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
