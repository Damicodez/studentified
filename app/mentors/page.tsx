'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function MentorsLogin() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('mentor_email', email);
      localStorage.setItem('mentor_name', email.split('@')[0]);
      router.push('/mentors/dashboard');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] transition-colors duration-300 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">Mentor Portal</h1>
        <p className="opacity-70 mb-8 text-sm">Sign in to manage your mentorship journey.</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="mentor@studentified.com" className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] outline-none" />
          <button type="submit" className="w-full py-4 bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90">
            Enter Dashboard <ArrowRight size={18} />
          </button>
        </form>
      </motion.div>
    </main>
  );
}