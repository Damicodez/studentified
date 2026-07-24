'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  
  // Defaults to signup (isLogin = false) if mode is not 'login'
  const isLogin = mode === 'login';
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthAction = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (!isLogin) {
        localStorage.setItem('user_name', email.split('@')[0]);
        toast.success("Account created successfully! Please log in.");
        router.push('/auth?mode=login');
      } else {
        localStorage.setItem('is_logged_in', 'true');
        toast.success("Welcome back to Studentified!");
        router.push('/');
        router.refresh();
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 font-sans">
      {/* Left Side: Balanced Illustration & Text */}
      <div className="hidden md:flex flex-col justify-center p-12 bg-[#FAFAF8] text-[#3B3026] relative">
        <div className="absolute top-12 left-12">
          <Link href="/">
            <img src="/studentified 1.jpg" alt="Logo" className="w-16 h-16 rounded-xl" />
          </Link>
        </div>
        
        <div className="flex flex-col items-center text-center space-y-8">
          <img 
            src="/undraw_educator_6dgp.png" 
            alt="Illustration" 
            className="w-full max-w-sm"
          />
          <h1 className="text-4xl italic-serif italic font-medium leading-tight">
            {isLogin ? "Welcome back to" : "Join the future of"} <br /> Studentified.
          </h1>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-8 bg-[#3B3026] text-white">
        <div className="w-full max-w-sm space-y-6">
          <h2 className="text-3xl font-medium italic-serif italic">
            {isLogin ? "Log in" : "Create account"}
          </h2>
          
          <div className="space-y-4">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@student.edu.ng"
              className="w-full px-4 py-3 rounded-lg bg-[#2a231d] border border-[#554a40] focus:ring-2 focus:ring-[#8B4513] outline-none transition"
            />
            <button 
              onClick={handleAuthAction} 
              className="w-full bg-white text-[#3B3026] py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              {loading ? "Processing..." : (isLogin ? "Log in" : "Sign up")}
            </button>
          </div>

          <Link 
            href={isLogin ? "/auth?mode=signup" : "/auth?mode=login"} 
            className="block text-center text-sm underline text-[#D1C8C2] hover:text-white transition"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#3B3026]" />}>
      <AuthContent />
    </Suspense>
  );
}