'use client';
import { useState, useRef } from 'react';
import { ImagePlus, Send, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AddBlogPage() {
  const [blogData, setBlogData] = useState({ title: '', tag: '', body: '', links: '' });
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    if (!blogData.title || !blogData.body) {
      toast.error("Please fill in the title and body!");
      return;
    }

    const mentorName = localStorage.getItem('mentor_name') || 'Oladimeji Isaac';
    const mentorPic = localStorage.getItem('mentor_pic');

    const newPost = {
      id: Date.now(),
      title: blogData.title,
      tag: blogData.tag || 'Career',
      body: blogData.body,
      mentorName: mentorName,
      mentorRole: 'Verified Campus Mentor',
      mentorPic: mentorPic,
      date: 'Just now',
      likes: 0,
      liked: false
    };

    const existingCustomBlogs = JSON.parse(localStorage.getItem('mentor_custom_blogs') || '[]');
    const updatedCustomBlogs = [newPost, ...existingCustomBlogs];
    localStorage.setItem('mentor_custom_blogs', JSON.stringify(updatedCustomBlogs));

    const existingNotifs = JSON.parse(localStorage.getItem('mentor_notifications') || '[]');
    localStorage.setItem('mentor_notifications', JSON.stringify([
      { text: `Successfully published new blog: "${blogData.title.substring(0, 20)}..."`, time: 'Just now' },
      ...existingNotifs
    ]));

    toast.success("Blog published successfully!");
    setBlogData({ title: '', tag: '', body: '', links: '' });
    setImage(null);

    window.dispatchEvent(new Event('profileUpdated'));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-4xl font-bold italic-serif">Create New Blog</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-4 sm:p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] space-y-4 sm:space-y-6">
          <input 
            value={blogData.title} 
            onChange={(e) => setBlogData({...blogData, title: e.target.value})} 
            placeholder="Blog Title (e.g. Breaking Into Tech as an African Undergrad)" 
            className="w-full p-3 sm:p-4 text-base sm:text-xl font-bold rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#333] outline-none" 
          />
          <input 
            value={blogData.tag} 
            onChange={(e) => setBlogData({...blogData, tag: e.target.value})} 
            placeholder="Category Tag (e.g. Career)" 
            className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#333] outline-none" 
          />
          <textarea 
            value={blogData.body} 
            onChange={(e) => setBlogData({...blogData, body: e.target.value})} 
            placeholder="Write your wisdom here..." 
            className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#333] h-48 sm:h-64 outline-none resize-none" 
          />
        </div>
        <div className="space-y-6">
          <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333]">
            <h3 className="font-bold mb-4">Add Media</h3>
            <div onClick={() => fileInputRef.current?.click()} className="w-full h-40 sm:h-48 border-2 border-dashed border-gray-300 dark:border-[#444] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition">
              {image ? (
                <div className="relative w-full h-full">
                  <img src={image} alt="Upload preview" className="w-full h-full object-cover rounded-2xl" />
                  <button onClick={(e) => {e.stopPropagation(); setImage(null)}} className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white"><X size={16}/></button>
                </div>
              ) : (
                <><ImagePlus size={32} className="opacity-50" /><span className="text-xs sm:text-sm opacity-50 mt-2">Upload Image</span></>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
          </div>
          <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333]">
            <h3 className="font-bold mb-4">Additional Links</h3>
            <input value={blogData.links} onChange={(e) => setBlogData({...blogData, links: e.target.value})} placeholder="https://..." className="w-full p-3 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#333] mb-4" />
            <button onClick={handlePublish} className="w-full py-3.5 sm:py-4 bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition">
              <Send size={18} /> Publish Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}