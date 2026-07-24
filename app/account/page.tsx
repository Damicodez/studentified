'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Import router
import Navbar from '../../components/Navbar';
import { Camera, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function AccountPage() {
  const router = useRouter(); // Initialize router
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(localStorage.getItem('user_name') || '');
    setEmail(localStorage.getItem('user_email') || '');
    setProfilePic(localStorage.getItem('profile_pic'));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image is too large (max 2MB)');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePic(base64String);
        localStorage.setItem('profile_pic', base64String);
        toast.success('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_email', email);
    
    toast.success('Account details updated successfully!');
    
    // Redirect to landing page after a brief delay so the toast is seen
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <main className="min-h-screen transition-colors duration-300">
      <Navbar />
      <div className="max-w-xl mx-auto mt-12 p-8 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-3xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-8">Account Settings</h1>

        <div className="flex flex-col items-center mb-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative w-32 h-32 mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-[#333] border-4 border-gray-100 dark:border-[#444] cursor-pointer group"
          >
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera className="text-white" />
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
          <p className="text-sm opacity-60">Upload a profile picture</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Full Name</label>
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] outline-none focus:border-[#3B3026] dark:focus:border-white transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Email Address</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] outline-none focus:border-[#3B3026] dark:focus:border-white transition"
            />
          </div>
          
          <button 
            onClick={handleSave}
            className="w-full py-4 bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition active:scale-[0.98]"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}