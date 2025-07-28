'use client';

import { useState } from 'react';
import { FaEnvelope, FaLock, FaHospitalAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { easeOut, easeIn } from 'framer-motion';

export default function HospitalLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const endpoint = 'http://localhost:8000/api/login/hospital';
      const payload = { email: form.email, password: form.password };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let result;
      try {
        result = await res.json();
      } catch (jsonErr) {
        console.error('Failed to parse JSON:', jsonErr);
        alert('Invalid response from server.');
        return;
      }

      if (!res.ok) {
        console.error('API error:', result);
        if (result.message && result.message.toLowerCase().includes('invalid credentials')) {
          alert('No account found for this email. Please register first.');
        } else {
          alert(result.message || 'An error occurred.');
        }
        return;
      }

      if (!result.token || !result.role) {
        console.error('Missing token or role in response:', result);
        alert('Login failed: missing token or role.');
        return;
      }
      localStorage.setItem('token', result.token);
      localStorage.setItem('role', result.role);
      router.push(`/dashboard/${result.role}`);
    } catch (err) {
      console.error('Network or unexpected error:', err);
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: easeIn } }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } }
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.main
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-emerald-50 px-4 relative overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-100 blur-3xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-emerald-100 blur-3xl"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
        <motion.div 
          className="relative z-10 bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg rounded-xl p-8 sm:p-10 w-full max-w-md"
          variants={containerVariants}
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-pink-400 to-emerald-500 shadow-md">
              <FaHospitalAlt className="text-3xl text-white" />
            </div>
          </motion.div>
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Hospital Login</h2>
            <p className="text-gray-600">Sign in to manage your hospital account</p>
          </motion.div>
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-5"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="group" variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-pink-500 transition-colors">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="hospital@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all group-hover:border-gray-300 bg-white/80"
                  required
                />
              </div>
            </motion.div>
            <motion.div className="group" variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-pink-500 transition-colors">
                  <FaLock />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all group-hover:border-gray-300 bg-white/80"
                  required
                />
              </div>
            </motion.div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-4 rounded-lg font-medium transition-all ${
                isSubmitting
                  ? 'bg-pink-500/70 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-400 to-emerald-500 hover:from-pink-500 hover:to-emerald-600 text-white shadow-md hover:shadow-pink-200'
              } flex items-center justify-center`}
              variants={itemVariants}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
}
