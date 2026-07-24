'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [initials, setInitials] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const name = localStorage.getItem('user_name');
    if (name) setInitials(name.charAt(0).toUpperCase());
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smooth scroll handler
  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#about');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_name');
    setInitials(null);
    setShowDropdown(false);
    router.push('/auth?mode=signup');
  };

  if (!mounted) return null;

  return (
    <nav className="relative w-full px-4 md:px-8 py-4 sm:py-6 flex items-center justify-between z-50 overflow-hidden">
      
      {/* Background Glow Logo - Hidden on mobile to prevent text overlapping */}
      <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none z-0">
        <img 
          src={theme === 'dark' ? "/studentified4-removebg-preview.png" : "/studentified3.jpg"} 
          alt="Glow Logo" 
          className="w-28 sm:w-32 animate-pulse opacity-20" 
        />
      </div>

      {/* Brand Title */}
      <div className="z-10 shrink-0">
        <Link href="/" className="text-base sm:text-xl md:text-2xl italic-serif italic font-bold tracking-widest transition-colors">
          STUDENTIFIED
        </Link>
      </div>

      {/* Menu Actions */}
      <div className="z-10 flex items-center gap-3 sm:gap-6 md:gap-10 text-[11px] sm:text-xs md:text-sm uppercase tracking-wider sm:tracking-widest font-medium">
        <button 
          onClick={handleScrollToAbout}
          className="hover:opacity-60 transition uppercase cursor-pointer"
        >
          About
        </button>
        
        <Link href="/mentors" className="hover:opacity-60 transition">Mentors</Link>
        
        {initials ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] flex items-center justify-center font-bold text-xs"
            >
              {initials}
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-xl shadow-xl py-2 z-50">
                <Link href="/account" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition">Account</Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth?mode=signup" className="hover:opacity-60 transition">Signup</Link>
        )}

        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-1 hover:opacity-60 transition shrink-0">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}