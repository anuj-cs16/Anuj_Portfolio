import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { ArrowRight, Mail, Phone, MapPin, Github, Linkedin, Instagram, Send, Loader2 } from 'lucide-react';
import API from '../utils/api';

const ContactCTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      toast.success(res.data?.message || 'Message transmitted successfully! Anuj will reply soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsFormOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-20 border-t border-neutral-200 dark:border-neutral-800 bg-[#F2F2EF] dark:bg-[#09090A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            07 / CONTACT & COLLABORATION
          </span>
          <div className="h-[1px] flex-1 bg-neutral-300 dark:bg-neutral-800" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Dramatic Big Typography Heading (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <h2 className="text-5xl sm:text-7xl xl:text-8xl font-extrabold font-display tracking-tighter leading-[0.92] text-neutral-900 dark:text-neutral-100 mb-8">
              LET'S BUILD <br />
              <span className="text-neutral-400 dark:text-neutral-600 italic font-light">SOMETHING</span> <br />
              GREAT.
            </h2>

            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-md font-normal leading-relaxed mb-10">
              Whether you have an upcoming project, want to discuss software architecture, or explore full-time / internship opportunities — feel free to reach out!
            </p>

            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-8 py-5 rounded-full bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 font-medium text-base flex items-center gap-4 hover:bg-neutral-800 dark:hover:bg-white transition-all shadow-md group hover-trigger cursor-pointer"
            >
              <span>{isFormOpen ? 'Close Form' : 'Start a Conversation'}</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Right Side: Direct Contacts & Interactive Form Drawer (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Direct Details Box */}
            <div className="p-8 rounded-3xl bg-[#F7F7F5] dark:bg-[#141416] border border-neutral-300 dark:border-neutral-800 space-y-6 shadow-sm">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                  DIRECT EMAIL
                </span>
                <a
                  href="mailto:anujdubey162005@gmail.com"
                  className="text-lg sm:text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 hover:underline"
                >
                  anujdubey162005@gmail.com
                </a>
              </div>

              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                  PHONE / WHATSAPP
                </span>
                <a
                  href="tel:+919711140933"
                  className="text-base font-mono text-neutral-800 dark:text-neutral-200 hover:underline"
                >
                  +91 9711140933
                </a>
              </div>

              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                  LOCATION
                </span>
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  Faridabad, Haryana, India
                </p>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-4">
                <a
                  href="https://github.com/anuj-cs16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/anuj-dubey-511b55313/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/anuj_16dubey/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            {/* Expandable Interactive Form */}
            {isFormOpen && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="p-8 rounded-3xl bg-[#F7F7F5] dark:bg-[#141416] border border-neutral-300 dark:border-neutral-800 space-y-4 shadow-xl"
              >
                <h4 className="text-lg font-bold font-display text-neutral-900 dark:text-neutral-100">
                  Send Direct Message
                </h4>

                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email *"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject (Full-Time Opportunity / Project)"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Type your message here... *"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-100 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-white transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Dispatching...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Submit Message
                    </>
                  )}
                </button>
              </motion.form>
            )}

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
