import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin, FaInstagram, FaSpinner } from 'react-icons/fa';
import API from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/messages', formData);
      toast.success(res.data?.message || 'Message transmitted successfully! Anuj will reply soon.', {
        duration: 5000,
        style: {
          background: '#0a0e27',
          color: '#00d4ff',
          border: '1px solid #00d4ff',
        },
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      title: 'Email Address',
      value: 'anujdubey162005@gmail.com',
      href: 'mailto:anujdubey162005@gmail.com',
      icon: FaEnvelope,
      color: 'text-[#00d4ff]',
    },
    {
      title: 'Phone / WhatsApp',
      value: '+91 9711140933',
      href: 'tel:+919711140933',
      icon: FaPhone,
      color: 'text-[#a855f7]',
    },
    {
      title: 'Location',
      value: 'Faridabad, Haryana, India',
      href: 'https://maps.google.com/?q=Faridabad,Haryana',
      icon: FaMapMarkerAlt,
      color: 'text-emerald-400',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-widest mb-2">
            // 07. GET IN TOUCH
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Let's Build <span className="gradient-text-cyan-purple">Something Great</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Info Cards & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-poppins text-slate-100 mb-3">
                Contact Information
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you have an upcoming project, want to discuss software architecture, or explore full-time / internship opportunities — feel free to reach out!
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {contactCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.a
                    key={idx}
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="glass-card glass-card-hover p-4 rounded-xl border border-white/10 flex items-center gap-4 block"
                  >
                    <div className={`p-3 rounded-xl bg-[#050814] border border-white/10 ${card.color}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        {card.title}
                      </span>
                      <span className="text-sm font-semibold text-slate-200 font-mono hover:text-[#00d4ff] transition-colors">
                        {card.value}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Icons Bar */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider block mb-4">
                Connect Across Networks:
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/anuj-cs16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl glass-card border border-white/10 text-slate-300 hover:text-[#00d4ff] hover:border-[#00d4ff] hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/anuj-dubey-511b55313/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl glass-card border border-white/10 text-slate-300 hover:text-[#00d4ff] hover:border-[#00d4ff] hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/anuj_16dubey/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl glass-card border border-white/10 text-slate-300 hover:text-[#a855f7] hover:border-[#a855f7] hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card p-8 rounded-2xl border border-white/10 relative shadow-[0_0_30px_rgba(0,212,255,0.1)]"
          >
            <h3 className="text-2xl font-bold font-poppins text-slate-100 mb-6 flex items-center gap-2">
              <FaPaperPlane className="text-[#00d4ff] text-xl" />
              Send a Direct Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    Your Name <span className="text-[#00d4ff]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    Your Email <span className="text-[#00d4ff]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full-Time Opportunity / Project Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Message <span className="text-[#00d4ff]">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Type your message here..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-neon-cyan py-4 rounded-xl font-bold font-poppins text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" /> Dispatching...
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={15} /> Submit Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
