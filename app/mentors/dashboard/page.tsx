'use client';
import { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import { Camera, Save, Edit3, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const yearOptions = [
  { value: '1', label: '1st Year' },
  { value: '2', label: '2nd Year' },
  { value: '3', label: '3rd Year' },
  { value: '4', label: '4th Year' },
  { value: '5', label: '5th Year' },
];

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', about: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setProfilePic(localStorage.getItem('mentor_pic'));
    setFormData({
      name: localStorage.getItem('mentor_name') || '',
      email: localStorage.getItem('mentor_email') || '',
      about: localStorage.getItem('mentor_about') || ''
    });
  }, []);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('mentor_name', formData.name);
      localStorage.setItem('mentor_email', formData.email);
      localStorage.setItem('mentor_about', formData.about);
      
      setIsLoading(false);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
      window.dispatchEvent(new Event('profileUpdated'));
    }, 1000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProfilePic(base64);
        localStorage.setItem('mentor_pic', base64);
        toast.success('Profile picture updated!');
        window.dispatchEvent(new Event('profileUpdated'));
      };
      reader.readAsDataURL(file);
    }
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: '#2a2a2a',
      borderRadius: '0.75rem',
      padding: '0.25rem 0.5rem',
      borderColor: '#444',
      borderWidth: '1px',
      color: '#fff',
      boxShadow: 'none',
    }),
    menu: (base: any) => ({ ...base, backgroundColor: '#2a2a2a' }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? '#3B3026' : '#2a2a2a',
      color: '#fff',
    }),
    singleValue: (base: any) => ({ ...base, color: '#fff' })
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-4xl font-bold italic-serif">Mentor Profile</h1>
        <button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={isLoading}
          className="w-full sm:w-auto bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : isEditing ? <Save size={18} /> : <Edit3 size={18} />}
          {isLoading ? 'Loading...' : isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-4 sm:p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] space-y-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div 
              onClick={() => isEditing && fileInputRef.current?.click()}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 dark:bg-[#2a2a2a] flex items-center justify-center border-4 border-gray-100 dark:border-[#333] relative overflow-hidden shrink-0 ${isEditing ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
            >
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="opacity-50" />
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            <h2 className="text-lg sm:text-2xl font-bold">Update Account Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input disabled={!isEditing} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="p-3.5 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] outline-none disabled:opacity-50" />
            <input disabled={!isEditing} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email Address" className="p-3.5 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] outline-none disabled:opacity-50" />
            
            <div className="md:col-span-2">
              {mounted ? (
                <Select options={yearOptions} styles={customStyles} placeholder="Select Mentorship Category" isDisabled={!isEditing} />
              ) : (
                <div className="p-4 rounded-xl bg-[#2a2a2a] border border-[#444] text-gray-500 text-sm">Loading...</div>
              )}
            </div>
            
            <textarea disabled={!isEditing} value={formData.about} onChange={(e) => setFormData({...formData, about: e.target.value})} placeholder="About you..." className="md:col-span-2 p-3.5 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] h-32 outline-none disabled:opacity-50" />
          </div>
        </div>

        <div className="p-4 sm:p-8 rounded-3xl bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] space-y-4 sm:space-y-6">
          <h3 className="font-bold text-base sm:text-lg italic-serif italic">Social Presence</h3>
          <input disabled={!isEditing} placeholder="LinkedIn URL" className="w-full p-3.5 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] outline-none disabled:opacity-50" />
          <input disabled={!isEditing} placeholder="Twitter/X Handle" className="w-full p-3.5 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] outline-none disabled:opacity-50" />
          <input disabled={!isEditing} placeholder="Portfolio/Website" className="w-full p-3.5 sm:p-4 text-sm sm:text-base rounded-xl bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#444] outline-none disabled:opacity-50" />
        </div>
      </div>
    </div>
  );
}