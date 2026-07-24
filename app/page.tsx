'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import About from '../components/About';
import { Search, Sparkles, BookOpen, Users, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function DynamicHeadline() {
  const [index, setIndex] = useState(0);
  const phrases = [
    "Professional Future.",
    "Career Growth.",
    "Academic Success.",
    "Skill Mastery."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <h1 className="text-2xl sm:text-4xl md:text-6xl font-medium italic-serif italic mb-6 text-[#3B3026] dark:text-[#EAEAEA] leading-tight min-h-[4rem] sm:min-h-[5rem]">
      The Open Path to Your{" "}
      <span className="inline-block text-left">
        <AnimatePresence mode="wait">
          <motion.span
            key={phrases[index]}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="inline-block text-[#3B3026] dark:text-white underline decoration-amber-500/50 underline-offset-4"
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/blog');
    }
  };

  return (
    <main className="relative min-h-screen transition-colors duration-300 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-12 sm:pt-20 md:pt-24 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <DynamicHeadline />
        <p className="text-sm sm:text-base md:text-lg opacity-80 max-w-xl mb-8 sm:mb-12 leading-relaxed">
          Research your career, connect with expert mentors, and unlock opportunities with AI-driven insights tailored to your journey.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-xl sm:max-w-2xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-2xl shadow-xl p-1.5 sm:p-2 flex items-center gap-2">
          <Search className="ml-3 sm:ml-4 opacity-50 shrink-0" size={20} />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask about a career..." 
            className="w-full p-2.5 sm:p-4 bg-transparent outline-none text-sm md:text-base text-[#3B3026] dark:text-white placeholder:text-gray-400" 
          />
          <button type="submit" className="bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm hover:opacity-90 transition shrink-0">
            Search
          </button>
        </form>
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto mt-12 sm:mt-20 md:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 px-4 sm:px-6 pb-16 sm:pb-24">
        {/* Clickable AI Discovery Card routed to /ai */}
        <div 
          onClick={() => router.push('/ai')}
          className="p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1e1e1e] hover:border-[#3B3026] dark:hover:border-white transition-all cursor-pointer group flex flex-col justify-between shadow-sm hover:shadow-md"
        >
          <div>
            <Sparkles className="mb-4 text-[#3B3026] dark:text-white group-hover:scale-110 transition-transform" />
            <h3 className="font-medium mb-2 flex items-center justify-between text-base md:text-lg">
              AI Discovery <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs md:text-sm opacity-70">Get tailored career paths & AI insights.</p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-[#2a2a2a] flex items-center gap-2 text-xs font-semibold opacity-85">
            <span>Chat with Studie</span> <ArrowRight size={12} />
          </div>
        </div>

        {[{ icon: BookOpen, title: "Curated Learning", desc: "Access verified resources." }, { icon: Users, title: "Mentorship", desc: "Connect with leaders." }].map((item, i) => (
          <div key={i} className="p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-[#333] bg-white dark:bg-[#1e1e1e] hover:border-[#3B3026] dark:hover:border-white transition-all shadow-sm">
            <item.icon className="mb-4 text-[#3B3026] dark:text-white" />
            <h3 className="font-medium mb-2 text-base md:text-lg">{item.title}</h3>
            <p className="text-xs md:text-sm opacity-70">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <About />
    </main>
  );
}