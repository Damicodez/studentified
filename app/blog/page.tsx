'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Heart, ArrowLeft, Tag, Calendar, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';
  const postIdParam = searchParams.get('id');
  
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(postIdParam ? Number(postIdParam) : null);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const initialBlogs = [
    {
      id: 1,
      title: 'After Your Final Year... What Next? A Blueprint for Surviving the Real World',
      tag: 'Career & Life',
      body: 'Graduation is coming, and the pressure is real. Here is how to transition smoothly from university structures into tech, engineering, or corporate landscapes without losing your mind.',
      mentorName: 'Oladimeji Isaac',
      mentorRole: 'Lead Biomedical Engineer & Software Dev',
      mentorPic: null,
      date: '2 hours ago',
      likes: 42,
    },
    {
      id: 2,
      title: 'How I Survived First Year Stress: GPA, Social Life & Late-Night Coding',
      tag: 'Campus Survival',
      body: 'The shock from secondary school to university can break you if you are not prepared. Learn time-blocking secrets, how to handle toxic roommates, and why your mental health matters more than an A.',
      mentorName: 'Adeniyi Ade',
      mentorRole: 'Senior Fullstack Architect',
      mentorPic: null,
      date: 'Yesterday',
      likes: 118,
    },
    {
      id: 3,
      title: 'Balancing Code and Coursework: How to Build Startups While in School',
      tag: 'Software',
      body: 'Building full-stack apps and managing heavy engineering modules like thermodynamics and fluid mechanics is brutal. Here is my exact productivity framework to stay on top of both.',
      mentorName: 'Oladimeji Isaac',
      mentorRole: 'Lead Biomedical Engineer & Software Dev',
      mentorPic: null,
      date: '3 days ago',
      likes: 76,
    },
    {
      id: 4,
      title: 'Mastering Minimalist Brand Identity & Graphic Design Portfolios',
      tag: 'Graphic Design',
      body: 'Landing freelance clients as a student requires more than just raw talent. Discover how typography pairing, minimalist layouts, and agency branding under BELAC can set you apart.',
      mentorName: 'Yetzer Studio',
      mentorRole: 'Creative Brand Director',
      mentorPic: null,
      date: '4 days ago',
      likes: 64,
    },
    {
      id: 5,
      title: 'The Ultimate Guide to Landing Remote Tech Internships from Campus',
      tag: 'Internships',
      body: 'You do not need to live in Silicon Valley or major tech hubs to score a high-paying remote gig. Here is how to optimize your LinkedIn, GitHub, and cold outreach strategy.',
      mentorName: 'Adeniyi Ade',
      mentorRole: 'Senior Fullstack Architect',
      mentorPic: null,
      date: '5 days ago',
      likes: 95,
    },
    {
      id: 6,
      title: 'Cope With Exam Burnout: Practical Hacks for Heavy Semester Schedules',
      tag: 'Mental Health',
      body: 'When past question banks are endless and night classes are draining, your brain hits a wall. Use these neuroscience-backed revision breaks to retain info 3x faster.',
      mentorName: 'Oladimeji Isaac',
      mentorRole: 'Lead Biomedical Engineer & Software Dev',
      mentorPic: null,
      date: '1 week ago',
      likes: 53,
    },
    {
      id: 7,
      title: 'Why Networking on Campus Matters More Than Your Test Scores',
      tag: 'Networking',
      body: 'Your classmates and local tech communities (like GDG) are your future co-founders and employers. Stop studying in isolation and start building meaningful professional networks.',
      mentorName: 'Yetzer Studio',
      mentorRole: 'Creative Brand Director',
      mentorPic: null,
      date: '1 week ago',
      likes: 81,
    },
    {
      id: 8,
      title: 'Navigating Group Projects Without Doing All the Work Yourself',
      tag: 'Campus Survival',
      body: 'The classic group project nightmare: one person does everything while others disappear. Here is how to delegate effectively, set boundaries, and keep your sanity intact.',
      mentorName: 'Adeniyi Ade',
      mentorRole: 'Senior Fullstack Architect',
      mentorPic: null,
      date: '2 weeks ago',
      likes: 67,
    },
    {
      id: 9,
      title: 'Building Your First AI-Integrated Web Application in 2026',
      tag: 'Software',
      body: 'Step-by-step technical breakdown of integrating Next.js apps with Gemini APIs, managing state, and deploying scalable tools for institutional or marketplace use cases.',
      mentorName: 'Oladimeji Isaac',
      mentorRole: 'Lead Biomedical Engineer & Software Dev',
      mentorPic: null,
      date: '2 weeks ago',
      likes: 104,
    },
    {
      id: 10,
      title: 'Financial Discipline for University Students: How to Budget Your Allowance',
      tag: 'Finance',
      body: 'Between data subscriptions, handouts, food, and social events, student finances vanish fast. Here is a realistic zero-stress budget template that actually works in school.',
      mentorName: 'Yetzer Studio',
      mentorRole: 'Creative Brand Director',
      mentorPic: null,
      date: '3 weeks ago',
      likes: 88,
    }
  ];

  const [blogs, setBlogs] = useState<any[]>(initialBlogs);

  // Load custom published blogs and persisted likes from localStorage on mount & events
  const loadBlogs = () => {
    const customBlogs = JSON.parse(localStorage.getItem('mentor_custom_blogs') || '[]');
    const savedLikes = JSON.parse(localStorage.getItem('blog_likes_map') || '{}');
    const savedLikedState = JSON.parse(localStorage.getItem('blog_liked_status') || '{}');

    // Combine custom blogs at the very top so newest appear first
    const allBase = [...customBlogs, ...initialBlogs];
    
    const processed = allBase.map((b: any) => ({
      ...b,
      likes: savedLikes[b.id] !== undefined ? savedLikes[b.id] : (b.likes || 0),
      liked: savedLikedState[b.id] || false
    }));

    setBlogs(processed);
  };

  useEffect(() => {
    loadBlogs();
    window.addEventListener('profileUpdated', loadBlogs);
    window.addEventListener('storage', loadBlogs);
    return () => {
      window.removeEventListener('profileUpdated', loadBlogs);
      window.removeEventListener('storage', loadBlogs);
    };
  }, []);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  useEffect(() => {
    const id = searchParams.get('id');
    setSelectedPostId(id ? Number(id) : null);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/blog?q=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push('/blog');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    router.push('/blog');
  };

  const toggleLike = (id: number) => {
    const updated = blogs.map(blog => {
      if (blog.id === id) {
        const newLiked = !blog.liked;
        const newLikes = newLiked ? blog.likes + 1 : blog.likes - 1;
        
        if (newLiked) {
          const existingNotifs = JSON.parse(localStorage.getItem('mentor_notifications') || '[]');
          localStorage.setItem('mentor_notifications', JSON.stringify([
            { text: `Someone liked your post "${blog.title.substring(0, 25)}..."`, time: 'Just now' },
            ...existingNotifs
          ]));
        }

        return { ...blog, liked: newLiked, likes: newLikes };
      }
      return blog;
    });

    setBlogs(updated);

    const likesMap: any = {};
    const likedStatusMap: any = {};
    updated.forEach(b => {
      likesMap[b.id] = b.likes;
      likedStatusMap[b.id] = b.liked;
    });
    localStorage.setItem('blog_likes_map', JSON.stringify(likesMap));
    localStorage.setItem('blog_liked_status', JSON.stringify(likedStatusMap));
  };

  const openPost = (id: number) => {
    setSelectedPostId(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', String(id));
    router.push(`/blog?${params.toString()}`);
  };

  const closePost = () => {
    setSelectedPostId(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('id');
    router.push(`/blog?${params.toString()}`);
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.mentorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activePost = blogs.find(b => b.id === selectedPostId);

  const openMentorProfile = (blog: any) => {
    const isFollowed = localStorage.getItem(`following_${blog.mentorName}`) === 'true';
    const baseFollowers = 124;
    setFollowing(isFollowed);
    setFollowerCount(isFollowed ? baseFollowers + 1 : baseFollowers);

    setSelectedMentor({
      name: blog.mentorName,
      role: blog.mentorRole || 'Verified Campus Mentor',
      pic: blog.mentorPic,
      postsCount: blogs.filter(b => b.mentorName === blog.mentorName).length,
      totalLikes: blogs.filter(b => b.mentorName === blog.mentorName).reduce((acc, curr) => acc + curr.likes, 0),
      blogs: blogs.filter(b => b.mentorName === blog.mentorName)
    });
  };

  const toggleFollow = () => {
    if (!selectedMentor) return;
    const newState = !following;
    setFollowing(newState);
    const newCount = newState ? followerCount + 1 : followerCount - 1;
    setFollowerCount(newCount);

    localStorage.setItem(`following_${selectedMentor.name}`, String(newState));
    
    const existingNotifs = JSON.parse(localStorage.getItem('mentor_notifications') || '[]');
    if (newState) {
      localStorage.setItem('mentor_notifications', JSON.stringify([
        { text: `New follower: A student started following you!`, time: 'Just now' },
        ...existingNotifs
      ]));
      toast.success(`You are now following ${selectedMentor.name}`);
    } else {
      toast.info(`Unfollowed ${selectedMentor.name}`);
    }
    window.dispatchEvent(new Event('profileUpdated'));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-black dark:text-white p-8 md:p-16 space-y-12 transition-colors duration-300 relative">
      
      {/* Navigation Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition">
          <ArrowLeft size={16} /> Back to Homepage
        </Link>
        {selectedPostId && (
          <button onClick={closePost} className="flex items-center gap-2 text-sm font-bold bg-gray-100 dark:bg-[#2a2a2a] px-4 py-2 rounded-xl hover:opacity-80 transition">
            ← Back to All Blogs
          </button>
        )}
      </div>

      {/* Single Blog Full View */}
      {activePost ? (
        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] space-y-8 animate-in fade-in duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-[#3B3026]/10 dark:bg-white/10 text-[#3B3026] dark:text-white">
                <Tag size={12} /> {activePost.tag}
              </span>
              <span className="flex items-center gap-1 text-xs opacity-50">
                <Calendar size={12} /> {activePost.date}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{activePost.title}</h1>
          </div>

          <div className="border-t border-gray-200 dark:border-[#333] pt-6 flex items-center justify-between">
            <div onClick={() => openMentorProfile(activePost)} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-[#3B3026] text-white dark:bg-white dark:text-[#3B3026] flex items-center justify-center font-bold text-lg overflow-hidden">
                {activePost.mentorPic ? <img src={activePost.mentorPic} className="w-full h-full object-cover" /> : activePost.mentorName.charAt(0)}
              </div>
              <div>
                <p className="font-bold group-hover:underline">{activePost.mentorName}</p>
                <p className="text-xs opacity-50">{activePost.mentorRole || 'Verified Mentor'}</p>
              </div>
            </div>

            <button 
              onClick={() => toggleLike(activePost.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition ${activePost.liked ? 'bg-red-500/10 text-red-500' : 'bg-gray-200 dark:bg-[#2a2a2a] opacity-80 hover:opacity-100'}`}
            >
              <Heart size={18} className={activePost.liked ? 'fill-red-500 text-red-500' : ''} />
              <span>{activePost.likes} Likes</span>
            </button>
          </div>

          <div className="prose dark:prose-invert max-w-none opacity-85 leading-relaxed text-base md:text-lg space-y-6 pt-4 border-t border-gray-200 dark:border-[#333]">
            <p>{activePost.body}</p>
          </div>
        </div>
      ) : (
        <>
          {/* Search Header */}
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold italic-serif">Explore Career Insights</h1>
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 p-2 rounded-2xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333]">
              <Search className="ml-3 opacity-50" size={20} />
              <input 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search campus survival, career, software, design..." 
                className="w-full bg-transparent outline-none px-2 text-sm md:text-base"
              />
              {searchTerm && (
                <button type="button" onClick={clearSearch} className="text-xs px-3 py-1 opacity-60 hover:opacity-100">
                  Clear
                </button>
              )}
              <button type="submit" className="px-6 py-3 bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] rounded-xl font-bold transition">
                Search
              </button>
            </form>
          </div>

          {/* Blog Grid Results */}
          <div className="max-w-6xl mx-auto">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <h2 className="text-2xl font-bold italic-serif">Oops! We couldn't find what you searched about.</h2>
                <p className="opacity-60">Try searching for other campus topics like "First Year", "Final Year", or "Software".</p>
                <button onClick={clearSearch} className="px-6 py-2 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl text-sm font-bold">
                  View All Posts
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredBlogs.map((blog) => (
                  <div key={blog.id} className="p-8 rounded-3xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-[#3B3026]/10 dark:bg-white/10 text-[#3B3026] dark:text-white">
                          <Tag size={12} /> {blog.tag}
                        </span>
                        <span className="flex items-center gap-1 text-xs opacity-50">
                          <Calendar size={12} /> {blog.date}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold">{blog.title}</h2>
                      <p className="opacity-70 leading-relaxed line-clamp-2">{blog.body}</p>
                      
                      <button 
                        onClick={() => openPost(blog.id)} 
                        className="flex items-center gap-1 text-sm font-semibold opacity-80 hover:opacity-100 pt-2 transition text-emerald-600 dark:text-emerald-400"
                      >
                        Read More <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-[#333] flex items-center justify-between">
                      <div onClick={() => openMentorProfile(blog)} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-[#3B3026] text-white dark:bg-white dark:text-[#3B3026] flex items-center justify-center font-bold overflow-hidden">
                          {blog.mentorPic ? <img src={blog.mentorPic} className="w-full h-full object-cover" /> : blog.mentorName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold group-hover:underline">{blog.mentorName}</p>
                          <p className="text-xs opacity-50">Mentor Profile</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => toggleLike(blog.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${blog.liked ? 'bg-red-500/10 text-red-500' : 'bg-gray-200 dark:bg-[#2a2a2a] opacity-70 hover:opacity-100'}`}
                      >
                        <Heart size={16} className={blog.liked ? 'fill-red-500 text-red-500' : ''} />
                        <span>{blog.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Mentor Profile Modal View with Real-Time Followers */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-3xl max-w-2xl w-full p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button onClick={() => setSelectedMentor(null)} className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-[#2a2a2a] hover:opacity-80">✕</button>
            
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#3B3026] text-white dark:bg-white dark:text-[#3B3026] flex items-center justify-center text-2xl font-bold overflow-hidden">
                {selectedMentor.pic ? <img src={selectedMentor.pic} className="w-full h-full object-cover" /> : selectedMentor.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{selectedMentor.name}</h2>
                <p className="opacity-65 text-sm">{selectedMentor.role}</p>
                <div className="flex gap-4 text-xs font-semibold pt-2 opacity-80">
                  <span>{followerCount} Followers</span>
                  <span>•</span>
                  <span>{selectedMentor.postsCount} Posts</span>
                  <span>•</span>
                  <span>{selectedMentor.totalLikes} Total Likes</span>
                </div>
              </div>
              <button 
                onClick={toggleFollow}
                className={`ml-auto px-6 py-2.5 rounded-xl font-bold text-sm transition ${following ? 'bg-gray-200 dark:bg-[#2a2a2a] text-black dark:text-white' : 'bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026]'}`}
              >
                {following ? 'Following' : '+ Follow'}
              </button>
            </div>

            <div className="border-t border-gray-200 dark:border-[#333] pt-6 space-y-4">
              <h3 className="font-bold italic-serif italic text-lg">Published Articles by {selectedMentor.name}</h3>
              <div className="space-y-3">
                {selectedMentor.blogs.map((b: any) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-[#2a2a2a] space-y-1">
                    <p className="font-bold text-sm">{b.title}</p>
                    <p className="text-xs opacity-60 line-clamp-1">{b.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PublicBlogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading insights...</div>}>
      <BlogContent />
    </Suspense>
  );
}