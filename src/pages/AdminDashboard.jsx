import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  FaFolderOpen,
  FaEnvelope,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaSignOutAlt,
  FaHome,
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
  FaSpinner,
  FaChartLine,
} from 'react-icons/fa';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'messages'

  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Add / Edit Project Modal state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    techStack: '',
    category: 'Full-Stack',
    githubLink: '',
    liveLink: '',
    featured: true,
  });
  const [savingProject, setSavingProject] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [projRes, msgRes] = await Promise.all([
        API.get('/projects'),
        API.get('/messages'),
      ]);
      setProjects(projRes.data);
      setMessages(msgRes.data);
    } catch (err) {
      console.error('[Dashboard Error]', err);
      toast.error('Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncGitHub = async () => {
    setSyncing(true);
    const toastId = toast.loading('Syncing with GitHub...');
    try {
      const res = await API.post('/projects/github-sync');
      if (res.data.success) {
        toast.success(
          `Sync complete! Found ${res.data.totalReposFound} repos, synced ${res.data.newProjectsSynced} new projects.`,
          { id: toastId, duration: 5000 }
        );
        // Refresh project list to show the new synced projects
        const projRes = await API.get('/projects');
        setProjects(projRes.data);
      } else {
        toast.error(res.data.message || 'Sync failed', { id: toastId });
      }
    } catch (err) {
      console.error('[GitHub Sync Frontend Error]', err);
      toast.error(
        err.response?.data?.message || err.message || 'Failed to sync with GitHub',
        { id: toastId }
      );
    } finally {
      setSyncing(false);
    }
  };

  // Open modal for new project
  const handleOpenAdd = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      image: '',
      techStack: '',
      category: 'Full-Stack',
      githubLink: 'https://github.com/anuj-cs16',
      liveLink: '',
      featured: true,
    });
    setShowProjectModal(true);
  };

  // Open modal for editing existing project
  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title || '',
      description: project.description || '',
      image: project.image || '',
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
      category: project.category || 'Full-Stack',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      featured: project.featured ?? true,
    });
    setShowProjectModal(true);
  };

  // Submit Project Form (Add or Edit)
  const handleSaveProject = async (e) => {
    e.preventDefault();
    setSavingProject(true);
    try {
      const payload = {
        ...projectForm,
        techStack: projectForm.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      };

      if (editingProject) {
        const res = await API.put(`/projects/${editingProject._id}`, payload);
        toast.success('Project updated successfully!');
        setProjects(projects.map((p) => (p._id === editingProject._id ? res.data : p)));
      } else {
        const res = await API.post('/projects', payload);
        toast.success('Project created successfully!');
        setProjects([res.data, ...projects]);
      }
      setShowProjectModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSavingProject(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await API.delete(`/projects/${id}`);
      toast.success('Project deleted');
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete project');
    }
  };

  // Mark Message as Read
  const handleMarkRead = async (id) => {
    try {
      const res = await API.patch(`/messages/${id}/read`);
      setMessages(messages.map((m) => (m._id === id ? res.data : m)));
      toast.success('Marked as read');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete message entry?')) return;
    try {
      await API.delete(`/messages/${id}`);
      setMessages(messages.filter((m) => m._id !== id));
      toast.success('Message deleted');
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 font-sans p-4 md:p-8">
      {/* Header Bar */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#a855f7] p-[1.5px] shadow-[0_0_15px_rgba(0,212,255,0.3)]">
            <div className="w-full h-full bg-[#050814] rounded-[10px] flex items-center justify-center font-extrabold text-[#00d4ff]">
              AD
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold font-poppins text-slate-100 flex items-center gap-2">
              Admin Control Center
              <span className="px-2 py-0.5 rounded bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[10px] font-mono text-[#00d4ff]">
                Live Portal
              </span>
            </h1>
            <p className="text-xs font-mono text-slate-400">
              Authenticated as: {user?.email || 'admin'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-xl glass-card border border-white/10 text-xs font-mono text-slate-300 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all flex items-center gap-1.5"
          >
            <FaHome size={14} /> View Main Site
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-400 hover:bg-rose-500 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FaSignOutAlt size={14} /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Metric Cards Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Total Projects
              </span>
              <span className="text-3xl font-extrabold font-poppins text-[#00d4ff]">
                {projects.length}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30">
              <FaFolderOpen size={24} />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Total Contact Inquiries
              </span>
              <span className="text-3xl font-extrabold font-poppins text-[#a855f7]">
                {messages.length}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/30">
              <FaEnvelope size={24} />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Unread Messages
              </span>
              <span className="text-3xl font-extrabold font-poppins text-emerald-400">
                {unreadMessagesCount}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <FaChartLine size={24} />
            </div>
          </div>
        </div>

        {/* Tab Switcher & Header Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-[#050814] shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'glass-card text-slate-400 hover:text-slate-200'
              }`}
            >
              <FaFolderOpen size={14} /> Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer relative ${
                activeTab === 'messages'
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-[#050814] shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                  : 'glass-card text-slate-400 hover:text-slate-200'
              }`}
            >
              <FaEnvelope size={14} /> Messages ({messages.length})
              {unreadMessagesCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          </div>

          {activeTab === 'projects' && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSyncGitHub}
                disabled={syncing}
                className="px-4 py-2.5 rounded-xl bg-slate-800/85 hover:bg-slate-700/85 border border-white/10 text-xs font-mono text-slate-300 hover:text-[#00d4ff] hover:border-[#00d4ff]/40 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title="Sync public GitHub repositories to portfolio"
              >
                {syncing ? (
                  <FaSpinner className="animate-spin text-[#00d4ff]" size={12} />
                ) : (
                  <FaGithub size={13} className="text-[#a855f7]" />
                )}
                {syncing ? 'Syncing...' : 'Sync GitHub'}
              </button>
              <button
                onClick={handleOpenAdd}
                className="btn-neon-cyan px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer"
              >
                <FaPlus size={12} /> Add New Project
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {loading ? (
              <div className="py-12 text-center font-mono text-slate-400 text-xs flex justify-center items-center gap-2">
                <FaSpinner className="animate-spin text-[#00d4ff]" /> Loading projects...
              </div>
            ) : projects.length === 0 ? (
              <div className="glass-card p-12 text-center rounded-2xl text-slate-400 font-mono text-sm">
                No projects registered yet. Click "Add New Project" to create one.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-40 rounded-xl overflow-hidden mb-4 border border-white/10 relative">
                        <img
                          src={proj.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-[#050814]/80 text-[10px] font-mono text-[#00d4ff]">
                          {proj.category || 'Full-Stack'}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-100 font-poppins mb-1">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {proj.techStack?.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-[#050814] rounded text-[10px] font-mono text-[#00d4ff]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenEdit(proj)}
                          className="p-2 rounded-lg bg-[#00d4ff]/10 text-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#050814] transition-all"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj._id)}
                          className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                          title="Delete"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>

                      <div className="flex gap-2 text-xs font-mono">
                        {proj.githubLink && (
                          <a
                            href={proj.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-[#a855f7]"
                          >
                            <FaGithub size={16} />
                          </a>
                        )}
                        {proj.liveLink && (
                          <a
                            href={proj.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-[#00d4ff]"
                          >
                            <FaExternalLinkAlt size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MESSAGES MANAGEMENT */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="glass-card p-12 text-center rounded-2xl text-slate-400 font-mono text-sm">
                No contact form submissions recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`glass-card p-6 rounded-2xl border transition-all ${
                      msg.read ? 'border-white/5 opacity-80' : 'border-[#00d4ff]/40 shadow-[0_0_15px_rgba(0,212,255,0.15)]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-white/10">
                      <div>
                        <span className="text-base font-bold text-slate-100 font-poppins mr-3">
                          {msg.name}
                        </span>
                        <span className="text-xs font-mono text-[#00d4ff]">
                          &lt;{msg.email}&gt;
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-slate-400">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                        {!msg.read && (
                          <button
                            onClick={() => handleMarkRead(msg._id)}
                            className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center gap-1 hover:bg-emerald-500 hover:text-[#050814] transition-all cursor-pointer"
                          >
                            <FaCheck size={10} /> Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          className="p-1.5 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                          title="Delete message"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-[#a855f7] mb-2">
                      Subject: {msg.subject || 'General Inquiry'}
                    </div>

                    <p className="text-sm text-slate-200 leading-relaxed bg-[#050814]/80 p-4 rounded-xl border border-white/5 font-sans">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ADD / EDIT PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-[#050814]/85 backdrop-blur-md">
          <div className="w-full max-w-xl glass-card rounded-2xl border border-[#00d4ff]/40 p-6 shadow-[0_0_40px_rgba(0,212,255,0.3)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-lg font-bold font-poppins text-slate-100">
                {editingProject ? 'Edit Project Details' : 'Create New Portfolio Project'}
              </h3>
              <button
                onClick={() => setShowProjectModal(false)}
                className="text-slate-400 hover:text-rose-400"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  required
                  placeholder="e.g. Flashbill POS"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <select
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none"
                >
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="Web Apps">Web Apps</option>
                  <option value="Games">Games</option>
                  <option value="Python">Python</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description *</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  required
                  rows={3}
                  placeholder="Comprehensive description of the software architecture..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                  placeholder="React, Node.js, Express, MongoDB, Tailwind"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">GitHub Link</label>
                  <input
                    type="text"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2.5 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Live Demo Link</label>
                  <input
                    type="text"
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2.5 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProject}
                  className="btn-neon-cyan px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer"
                >
                  {savingProject ? <FaSpinner className="animate-spin" /> : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
