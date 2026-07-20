import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaEye, FaSpinner, FaCode } from 'react-icons/fa';
import API from '../utils/api';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Full-Stack', 'Web Apps', 'Games', 'Python'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('[Projects] Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => (p.category || '').toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="py-20 px-4 md:px-12 lg:px-24 bg-[#0a0e27]/40 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-widest mb-2">
            // 04. FEATURED WORKS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Software & <span className="gradient-text-cyan-purple">Project Showcase</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full mt-4" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-[#050814] font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'glass-card text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Spinner State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <FaSpinner className="animate-spin text-3xl text-[#00d4ff]" />
            <p className="text-xs font-mono text-slate-400">Fetching projects from MongoDB server...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-white/10 flex flex-col group"
              >
                {/* Image & Overlay */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-[#0a0e27]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#050814]/80 backdrop-blur-md border border-[#00d4ff]/40 text-[10px] font-mono text-[#00d4ff]">
                    {project.category || 'Full-Stack'}
                  </span>

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-3 rounded-full bg-[#00d4ff] text-[#050814] shadow-[0_0_15px_#00d4ff] hover:scale-110 transition-transform"
                      title="Quick View Details"
                    >
                      <FaEye size={16} />
                    </button>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-[#a855f7] text-white shadow-[0_0_15px_#a855f7] hover:scale-110 transition-transform"
                        title="GitHub Repository"
                      >
                        <FaGithub size={16} />
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-emerald-500 text-[#050814] shadow-[0_0_15px_#10b981] hover:scale-110 transition-transform"
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Info Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 font-poppins mb-2 group-hover:text-[#00d4ff] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack?.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded bg-[#050814] border border-white/10 text-[11px] font-mono text-[#00d4ff]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack?.length > 4 && (
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-400">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-mono font-medium text-slate-300 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all flex items-center justify-center gap-2"
                    >
                      <FaCode size={13} /> View Specifications
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;
