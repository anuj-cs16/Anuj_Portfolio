import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaUserShield, FaLock, FaEnvelope, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Admin authentication successful!', {
        style: { background: '#0a0e27', color: '#00d4ff', border: '1px solid #00d4ff' },
      });
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050814] flex items-center justify-center p-4 relative font-sans overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 cyber-ambient-cyan pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 cyber-ambient-purple pointer-events-none" />

      {/* Back to Home button */}
      <Link
        to="/"
        className="absolute top-6 left-6 px-4 py-2 rounded-xl glass-card border border-white/10 text-xs font-mono text-slate-300 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all flex items-center gap-2"
      >
        <FaArrowLeft size={12} /> Back to Portfolio
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-md glass-card p-8 rounded-2xl border border-[#00d4ff]/30 shadow-[0_0_40px_rgba(0,212,255,0.2)] relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#a855f7]/20 border border-[#00d4ff]/40 flex items-center justify-center text-[#00d4ff] mb-4 shadow-[0_0_20px_rgba(0,212,255,0.3)]">
            <FaUserShield size={28} />
          </div>
          <h1 className="text-2xl font-bold font-poppins text-slate-100 mb-1">
            Admin Portal Access
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Sign in with administrative credentials
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">
              Admin Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anujdubey162005@gmail.com"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#050814] border border-white/10 text-slate-100 text-sm focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff] transition-all font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-neon-cyan py-3.5 rounded-xl font-bold font-poppins text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin text-lg" /> Verifying...
              </>
            ) : (
              'Authenticate & Access'
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] font-mono text-slate-400">
            Default Seed Admin: <span className="text-[#00d4ff]">anujdubey162005@gmail.com</span> / <span className="text-[#a855f7]">admin123456</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
