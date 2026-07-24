'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  User, 
  PenTool, 
  BarChart3, 
  LogOut, 
  Bell, 
  PanelLeftClose, 
  PanelLeftOpen, 
  X, 
  Menu 
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [initials, setInitials] = useState('');
  const [mentorPic, setMentorPic] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);
  
  // Sidebar state
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse (Icon-only mode)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // Mobile slide-out drawer

  // Function to sync data from localStorage
  const syncProfileData = () => {
    const email = localStorage.getItem('mentor_email');
    const savedPic = localStorage.getItem('mentor_pic');
    
    if (!email) {
      router.push('/mentors');
    } else {
      setInitials(email.charAt(0).toUpperCase());
      setMentorPic(savedPic);
    }

    const notifs = JSON.parse(
      localStorage.getItem('mentor_notifications') || 
      '[{"text": "Welcome to your mentor dashboard!", "time": "1d ago"}]'
    );
    setNotifications(notifs);
  };

  useEffect(() => {
    syncProfileData();
    window.addEventListener('storage', syncProfileData);
    window.addEventListener('profileUpdated', syncProfileData);

    return () => {
      window.removeEventListener('storage', syncProfileData);
      window.removeEventListener('profileUpdated', syncProfileData);
    };
  }, [router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('mentor_email');
    localStorage.removeItem('mentor_name');
    localStorage.removeItem('mentor_pic');
    localStorage.removeItem('mentor_about');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-[#121212] text-black dark:text-white transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Mobile Top Navigation Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-[#333] z-30 sticky top-0 w-full">
        <button 
          onClick={() => setMobileSidebarOpen(true)} 
          className="p-2 rounded-xl bg-gray-100 dark:bg-[#2a2a2a] hover:opacity-80 transition"
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>
        <span className="font-bold italic-serif text-sm">Mentor Dashboard</span>
        <div className="w-8 h-8 rounded-full bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] flex items-center justify-center font-bold text-xs overflow-hidden border border-gray-200 dark:border-[#333]">
          {mentorPic ? <img src={mentorPic} alt="Mentor" className="w-full h-full object-cover" /> : initials}
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)} 
          className="md:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* Responsive Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 z-50 md:z-20 h-screen border-r border-gray-200 dark:border-[#333] bg-white dark:bg-[#1e1e1e] py-6 flex flex-col transition-all duration-300 shrink-0 ${
          // Desktop Sizes
          isCollapsed ? 'md:w-20 md:px-3' : 'md:w-64 md:px-6'
        } ${
          // Mobile Size & Slide Positions
          mobileSidebarOpen 
            ? 'w-72 px-6 translate-x-0 shadow-2xl' 
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        
        {/* Sidebar Header & Controls */}
        <div className={`flex items-center justify-between mb-8 ${isCollapsed ? 'md:justify-center' : ''}`}>
          
          {/* User Info */}
          <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'md:hidden flex' : 'flex'}`}>
            <div className="w-10 h-10 rounded-full bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] flex items-center justify-center font-bold text-lg overflow-hidden shrink-0 border-2 border-gray-100 dark:border-[#333]">
              {mentorPic ? (
                <img src={mentorPic} alt="Mentor" className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="truncate">
              <p className="font-bold text-sm truncate">Mentor</p>
              <p className="text-xs opacity-50">Active</p>
            </div>
          </div>

          {/* Desktop Toggle (Expand / Collapse Icon Mode) */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="hidden md:flex p-2 rounded-xl bg-gray-100 dark:bg-[#2a2a2a] hover:opacity-80 transition shrink-0"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setMobileSidebarOpen(false)} 
            className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-[#2a2a2a] hover:opacity-80 transition"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Notifications Bar */}
        <div className={`mb-6 relative ${isCollapsed ? 'md:flex md:justify-center' : ''}`}>
          <button 
            onClick={() => setShowNotifs(!showNotifs)} 
            className={`p-2.5 rounded-xl bg-gray-100 dark:bg-[#2a2a2a] relative hover:opacity-80 transition flex items-center ${isCollapsed ? 'md:w-auto md:px-2.5' : 'w-full gap-3 px-3'}`}
          >
            <div className="relative shrink-0">
              <Bell size={18} />
              {notifications.length > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>}
            </div>
            <span className={`text-xs font-semibold ${isCollapsed ? 'md:hidden inline' : 'inline'}`}>Notifications</span>
          </button>

          {/* Notifications Dropdown Tray */}
          {showNotifs && (
            <div className="absolute top-12 left-0 w-64 sm:w-72 p-4 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-2xl shadow-2xl z-50 space-y-3">
              <h4 className="font-bold text-sm border-b border-gray-200 dark:border-[#333] pb-2">Live Activity</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map((n, i) => (
                  <div key={i} className="text-xs p-2.5 rounded-xl bg-gray-50 dark:bg-[#2a2a2a] space-y-1">
                    <p className="font-medium">{n.text}</p>
                    <span className="opacity-40 text-[10px]">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2">
          {[
            { name: 'Overview', href: '/mentors/dashboard', icon: Home },
            { name: 'Profile', href: '/mentors/dashboard/profile', icon: User },
            { name: 'Add Blog', href: '/mentors/dashboard/blog', icon: PenTool },
            { name: 'Analytics', href: '/mentors/dashboard/analytics', icon: BarChart3 },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center gap-4 p-3 rounded-xl transition ${
                isCollapsed ? 'md:justify-center' : ''
              } ${
                pathname === item.href 
                  ? 'bg-[#3B3026] text-white dark:bg-white dark:text-[#3B3026]' 
                  : 'opacity-70 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
              }`}
            >
              <item.icon size={20} className="shrink-0" />
              <span className={`text-sm font-medium truncate ${isCollapsed ? 'md:hidden inline' : 'inline'}`}>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          title={isCollapsed ? "Logout" : undefined}
          className={`mt-auto flex items-center gap-4 p-3 opacity-70 hover:text-red-500 transition ${
            isCollapsed ? 'md:justify-center' : ''
          }`}
        >
          <LogOut size={20} className="shrink-0" />
          <span className={`text-sm font-medium truncate ${isCollapsed ? 'md:hidden inline' : 'inline'}`}>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-12 transition-all duration-300">
        {children}
      </main>

    </div>
  );
}