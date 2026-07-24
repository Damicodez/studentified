'use client';
import { useState, useEffect } from 'react';
import { Users, TrendingUp, Clock, FileText } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [mentorName, setMentorName] = useState('Mentor');

  useEffect(() => {
    // Safely update the name when component mounts on client
    const updateName = () => setMentorName(localStorage.getItem('mentor_name') || 'Mentor');
    updateName();
    
    // Listen for profile updates to refresh name reactively
    window.addEventListener('profileUpdated', updateName);
    return () => window.removeEventListener('profileUpdated', updateName);
  }, []);

  const stats = [
    { label: 'Total Mentees', value: '128', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Projects', value: '12', icon: TrendingUp, color: 'bg-emerald-500' },
    { label: 'Pending Reviews', value: '5', icon: Clock, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <h1 className="text-4xl font-bold italic-serif">Welcome back, {mentorName}.</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${stat.color} text-white`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm opacity-60">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Insights - Spans 2 columns */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333]">
          <h2 className="text-xl font-bold mb-4 italic-serif italic">Studentified Insights</h2>
          <p className="opacity-70 leading-relaxed mb-6">
            Your mentorship is impacting students across multiple disciplines. Recent data shows a 25% increase in engagement with your shared career roadmaps.
          </p>
          <button className="px-6 py-3 bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] rounded-xl font-medium">View Detailed Report</button>
        </div>

        {/* Quick Actions */}
        <div className="p-8 rounded-3xl bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] flex flex-col justify-between">
          <h2 className="text-xl font-bold italic-serif italic">Quick Actions</h2>
          <div className="space-y-3 mt-6">
            <Link href="/mentors/dashboard/blog">
              <button className="w-full p-4 rounded-xl bg-black/10 dark:bg-black/5 hover:bg-black/20 dark:hover:bg-black/10 transition text-left font-medium">
                + Create New Blog
              </button>
            </Link>
            <button className="w-full p-4 rounded-xl bg-black/10 dark:bg-black/5 hover:bg-black/20 dark:hover:bg-black/10 transition text-left font-medium">
              View All Mentees
            </button>
          </div>
        </div>

        {/* Recent Activity - Spans full width */}
        <div className="lg:col-span-3 p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333]">
          <h2 className="text-xl font-bold mb-6 italic-serif italic">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#2a2a2a]">
                <FileText className="opacity-50" />
                <p>New comment on your blog post: "The Future of Biomedical Engineering"</p>
                <span className="ml-auto text-xs opacity-50">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}