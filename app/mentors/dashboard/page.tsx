'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, FileText, Heart, ArrowUpRight, Plus, Sparkles } from 'lucide-react';

export default function OverviewPage() {
  const [mounted, setMounted] = useState(false);
  const [mentorName, setMentorName] = useState('Mentor');
  const [myBlogs, setMyBlogs] = useState<any[]>([]);
  const [stats, setStats] = useState({ followers: 124, likes: 175, posts: 0 });

  const loadOverviewData = () => {
    const savedName = localStorage.getItem('mentor_name') || 'Oladimeji Isaac';
    setMentorName(savedName);

    const customBlogs = JSON.parse(localStorage.getItem('mentor_custom_blogs') || '[]');
    const isFollowing = localStorage.getItem(`following_${savedName}`) === 'true';

    setMyBlogs(customBlogs);
    setStats({
      followers: isFollowing ? 125 : 124,
      likes: 175 + customBlogs.reduce((acc: number, curr: any) => acc + (curr.likes || 0), 0),
      posts: customBlogs.length + 3 // 3 base default posts
    });
  };

  useEffect(() => {
    setMounted(true);
    loadOverviewData();
    window.addEventListener('profileUpdated', loadOverviewData);
    window.addEventListener('storage', loadOverviewData);

    return () => {
      window.removeEventListener('profileUpdated', loadOverviewData);
      window.removeEventListener('storage', loadOverviewData);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-500">
            <Sparkles size={14} /> Verified Campus Mentor
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold italic-serif">Welcome Back, {mentorName}!</h1>
          <p className="text-xs sm:text-sm opacity-60">Here is a summary of your active student reach and recent publications.</p>
        </div>
        <Link 
          href="/mentors/dashboard/blog" 
          className="self-start sm:self-auto px-5 py-3 rounded-xl bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] font-bold text-xs sm:text-sm flex items-center gap-2 hover:opacity-90 transition shrink-0"
        >
          <Plus size={16} /> Create New Blog
        </Link>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] space-y-2">
          <div className="flex justify-between items-center">
            <Users className="opacity-50" size={20} />
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+4.2%</span>
          </div>
          <p className="text-xs sm:text-sm opacity-60">Active Mentees</p>
          <p className="text-2xl sm:text-3xl font-bold">{stats.followers}</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] space-y-2">
          <div className="flex justify-between items-center">
            <Heart className="opacity-50" size={20} />
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+18%</span>
          </div>
          <p className="text-xs sm:text-sm opacity-60">Total Post Likes</p>
          <p className="text-2xl sm:text-3xl font-bold">{stats.likes}</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] space-y-2">
          <div className="flex justify-between items-center">
            <FileText className="opacity-50" size={20} />
            <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">Published</span>
          </div>
          <p className="text-xs sm:text-sm opacity-60">Articles Authored</p>
          <p className="text-2xl sm:text-3xl font-bold">{stats.posts}</p>
        </div>
      </div>

      {/* Main Grid: Publications & Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Blogs */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-bold italic-serif">Your Published Insights</h2>
            <Link href="/blog" className="text-xs font-bold flex items-center gap-1 opacity-70 hover:opacity-100">
              Public Feed <ArrowUpRight size={14} />
            </Link>
          </div>

          {myBlogs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-gray-50 dark:bg-[#2a2a2a] space-y-3">
              <p className="text-sm font-semibold opacity-70">You haven't authored any custom blog posts yet.</p>
              <Link 
                href="/mentors/dashboard/blog" 
                className="inline-block px-4 py-2 text-xs font-bold bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] rounded-xl"
              >
                Publish Your First Post
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myBlogs.map((blog) => (
                <div key={blog.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-[#2a2a2a] flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#3B3026]/10 dark:bg-white/10">
                      {blog.tag}
                    </span>
                    <p className="text-sm font-bold truncate">{blog.title}</p>
                    <p className="text-xs opacity-50 line-clamp-1">{blog.body}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-red-500">♥ {blog.likes || 0}</span>
                    <p className="text-[10px] opacity-40">{blog.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold italic-serif">Quick Workspace</h2>
            <div className="space-y-2">
              <Link href="/mentors/dashboard/profile" className="block p-3 rounded-xl bg-gray-50 dark:bg-[#2a2a2a] text-xs font-semibold hover:opacity-80 transition">
                ✏️ Edit Profile Info & Social Links
              </Link>
              <Link href="/mentors/dashboard/analytics" className="block p-3 rounded-xl bg-gray-50 dark:bg-[#2a2a2a] text-xs font-semibold hover:opacity-80 transition">
                📊 Detailed Mentee Analytics
              </Link>
              <Link href="/ai" className="block p-3 rounded-xl bg-gray-50 dark:bg-[#2a2a2a] text-xs font-semibold hover:opacity-80 transition">
                🤖 Open Studie AI Assistant
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}