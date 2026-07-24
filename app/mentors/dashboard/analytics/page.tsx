'use client';
import { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, Activity, ArrowUpRight, Heart } from 'lucide-react';

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [followersCount, setFollowersCount] = useState(124);
  const [totalLikes, setTotalLikes] = useState(175);

  useEffect(() => {
    setMounted(true);
    const updateStats = () => {
      const mentorName = localStorage.getItem('mentor_name') || 'Oladimeji Isaac';
      const isFollowing = localStorage.getItem(`following_${mentorName}`) === 'true';
      setFollowersCount(isFollowing ? 125 : 124);
    };
    updateStats();
    window.addEventListener('profileUpdated', updateStats);
    return () => window.removeEventListener('profileUpdated', updateStats);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-4xl font-bold italic-serif">Mentor Analytics</h1>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Real-Time Followers', value: followersCount, change: '+4.2%', icon: Users },
          { label: 'Total Post Likes', value: totalLikes, change: '+18%', icon: Heart },
          { label: 'Engagement Rate', value: '88.4%', change: '+4.2%', icon: TrendingUp },
          { label: 'Satisfaction Score', value: '4.9/5.0', change: '+0.1', icon: Award },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] space-y-2">
            <div className="flex justify-between items-center">
              <stat.icon className="opacity-50" size={20} />
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="text-sm opacity-60">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Growth Graph Placeholder */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold italic-serif italic">Mentee Growth & Activity</h2>
            <select className="bg-gray-50 dark:bg-[#2a2a2a] border border-[#444] rounded-xl px-4 py-2 text-sm outline-none">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          
          {/* Visual Graph Mockup */}
          <div className="h-64 w-full flex items-end justify-between gap-3 pt-8 px-4 bg-gray-50 dark:bg-[#2a2a2a]/50 rounded-2xl border border-gray-100 dark:border-[#333]">
            {[40, 65, 45, 80, 55, 95, 75, 85, 60, 90, 100, 85].map((val, idx) => (
              <div key={idx} className="w-full bg-[#3B3026] dark:bg-white rounded-t-lg transition-all hover:opacity-80" style={{ height: `${val}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-xs opacity-50 px-2">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
          </div>
        </div>

        {/* Breakdown / Categories */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] flex flex-col justify-between">
          <h2 className="text-xl font-bold italic-serif italic">Mentorship Focus</h2>
          <div className="space-y-4 my-6">
            {[
              { category: 'Software Engineering', percent: '45%', color: 'bg-blue-500' },
              { category: 'Biomedical Innovations', percent: '25%', color: 'bg-emerald-500' },
              { category: 'UI/UX & Branding', percent: '20%', color: 'bg-amber-500' },
              { category: 'Career Roadmapping', percent: '10%', color: 'bg-purple-500' },
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">{item.category}</span>
                  <span className="font-bold">{item.percent}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: item.percent }}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:opacity-80 transition">
            Download Analytics Report <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}