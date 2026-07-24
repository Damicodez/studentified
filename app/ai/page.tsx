'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Plus, 
  Send, 
  Sparkles, 
  PanelLeftClose, 
  PanelLeftOpen, 
  ArrowLeft,
  Trash2,
  Paperclip,
  X,
  FileText,
  Film,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

function DynamicWelcomeHeader() {
  const [index, setIndex] = useState(0);
  const phrases = [
    "Welcome Oladimeji Isaac, Let's dive in.",
    "What are we working on today?",
    "What is on your mind, Oladimeji?",
    "Ready to build something amazing?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="h-16 flex items-center justify-center text-center px-4">
      <AnimatePresence mode="wait">
        <motion.h2
          key={phrases[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-xl md:text-2xl font-bold italic-serif italic text-[#3B3026] dark:text-[#EAEAEA]"
        >
          {phrases[index]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}

const DEFAULT_CHATS = [
  { 
    id: 1, 
    title: 'Biomedical AI Diagnostics', 
    date: 'Today', 
    messages: [
      { role: 'assistant', content: 'Hello! I am Studie, your Gemma-powered AI collaborator. How can I help you with your biomedical systems, attachments, or diagnostics today?' }
    ] 
  },
  { 
    id: 2, 
    title: 'Next.js Escrow Architecture', 
    date: 'Yesterday', 
    messages: [
      { role: 'assistant', content: 'Let us discuss your secure payment escrow architecture for AgroPadi.' }
    ] 
  },
];

export default function AIChatPage() {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userPic, setUserPic] = useState<string | null>(null);
  
  const [chats, setChats] = useState<any[]>(DEFAULT_CHATS);
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // File Upload State (Max 10 files)
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Prevent Hydration Mismatch by reading localStorage after initial mount
  useEffect(() => {
    setMounted(true);

    const pic = localStorage.getItem('mentor_pic');
    if (pic) setUserPic(pic);

    const savedChats = localStorage.getItem('studie_chats');
    if (savedChats) {
      try {
        const parsed = JSON.parse(savedChats);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setChats(parsed);
          setActiveChatId(parsed[0].id);
        }
      } catch (e) {
        console.error("Failed to parse saved chats from local storage:", e);
      }
    }
  }, []);

  // Save chats to local storage whenever updated
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('studie_chats', JSON.stringify(chats));
    }
  }, [chats, mounted]);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0] || { messages: [] };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (mounted) {
      scrollToBottom();
    }
  }, [activeChat?.messages, loading, mounted]);

  // Handle File Selection with 10-file Limit Validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    if (attachments.length + selectedFiles.length > 10) {
      toast.error("Maximum 10 files allowed per request.");
      return;
    }

    setAttachments(prev => [...prev, ...selectedFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachments.length === 0) || loading) return;

    // Display attachments alongside user message in UI
    const fileNames = attachments.map(f => f.name);
    const attachmentText = fileNames.length > 0 ? `\n\n📎 Attached files (${fileNames.length}): ${fileNames.join(', ')}` : '';
    const userMessageContent = `${input}${attachmentText}`;

    const userMessage = { role: 'user', content: userMessageContent, files: fileNames };
    const updatedMessages = [...activeChat.messages, userMessage];

    const updatedChats = chats.map(chat => {
      if (chat.id === activeChatId) {
        const promptPreview = input.trim() || `Uploaded ${attachments.length} files`;
        const title = chat.title === 'New Conversation' ? promptPreview.substring(0, 25) + '...' : chat.title;
        return { ...chat, title, messages: updatedMessages };
      }
      return chat;
    });

    setChats(updatedChats);
    setInput('');
    setAttachments([]);
    setLoading(true);

    /* =========================================================================
       🤖 MOCK MODE FOR TODAY (Uncomment Bionic API Fetch block below tomorrow)
       ========================================================================= */
    setTimeout(() => {
      const responsePrompt = fileNames.length > 0 
        ? `I have received and parsed your ${fileNames.length} file attachment(s) (${fileNames.join(', ')}). Based on my preliminary analysis, your documents align with your course curriculum requirements!` 
        : `I analyzed your query regarding "${input}". As Studie, your AI guide, I recommend focusing on modular component structures and keeping your state synchronized across your application workflows.`;

      const aiResponse = { 
        role: 'assistant', 
        content: responsePrompt 
      };
      
      const finalizedChats = updatedChats.map(chat => {
        if (chat.id === activeChatId) {
          return { ...chat, messages: [...chat.messages, aiResponse] };
        }
        return chat;
      });

      setChats(finalizedChats);
      setLoading(false);
    }, 1500);

    /* =========================================================================
       🚀 TOMORROW: UNCOMMENT THIS LIVE BIONIC MODEL API BLOCK
       =========================================================================
    try {
      const formData = new FormData();
      formData.append('prompt', input);
      attachments.forEach((file) => formData.append('files', file));

      const response = await fetch('http://127.0.0.1:8080/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gemma-2-2b-it',
          messages: updatedMessages,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const replyContent = data.choices[0]?.message?.content || "No response received from local model.";

      const aiResponse = { role: 'assistant', content: replyContent };
      
      const finalizedChats = updatedChats.map(chat => {
        if (chat.id === activeChatId) {
          return { ...chat, messages: [...chat.messages, aiResponse] };
        }
        return chat;
      });

      setChats(finalizedChats);
    } catch (err) {
      console.error("Local Bionic Server Error:", err);
      toast.error("Could not connect to local Bionic server.");
    } finally {
      setLoading(false);
    }
    ========================================================================= */
  };

  const startNewChat = () => {
    const newChat = { 
      id: Date.now(), 
      title: 'New Conversation', 
      date: 'Just now', 
      messages: [{ role: 'assistant', content: 'Started a fresh session with Studie. What are we working on today?' }] 
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (e: React.MouseEvent, chatId: number) => {
    e.stopPropagation();
    if (chats.length <= 1) {
      toast.error("You must keep at least one chat session.");
      return;
    }
    const filtered = chats.filter(c => c.id !== chatId);
    setChats(filtered);
    if (activeChatId === chatId) {
      setActiveChatId(filtered[0].id);
    }
    toast.success("Chat deleted successfully.");
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon size={14} className="text-blue-500" />;
    if (type.startsWith('video/')) return <Film size={14} className="text-purple-500" />;
    return <FileText size={14} className="text-amber-500" />;
  };

  // Prevent SSR Hydration Mismatch
  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-white dark:bg-[#121212] text-black dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0 -translate-x-full'} transition-all duration-300 border-r border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#181818] flex flex-col justify-between p-4 z-20 shrink-0 overflow-hidden`}>
        <div className="space-y-6 w-64">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-sm font-bold opacity-70 hover:opacity-100 transition">
              <ArrowLeft size={16} /> Back to Homepage
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition">
              <PanelLeftClose size={18} />
            </button>
          </div>

          <button 
            onClick={startNewChat}
            className="w-full flex items-center gap-3 py-3 px-4 rounded-2xl bg-gray-200/70 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#333] font-medium text-sm transition shadow-sm"
          >
            <Plus size={18} /> New Chat with Studie
          </button>

          <div className="space-y-2">
            <p className="text-xs font-bold opacity-50 px-2 uppercase tracking-wider">Recent Chats</p>
            <div className="space-y-1 max-h-[50vh] overflow-y-auto pr-1">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition group ${activeChatId === chat.id ? 'bg-[#3B3026] text-white dark:bg-white dark:text-[#3B3026]' : 'opacity-70 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-[#222]'}`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <MessageSquare size={16} />
                    <span className="truncate">{chat.title}</span>
                  </div>
                  <button 
                    onClick={(e) => deleteChat(e, chat.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-[#333] pt-4 space-y-2 w-64">
          <div className="flex items-center gap-3 px-3 py-2 text-xs font-semibold opacity-60">
            <Sparkles size={14} className="text-amber-500" /> Studie Interface (Interactive Demo)
          </div>
        </div>
      </aside>

      {/* Main Chat Panel */}
      <main className="flex-1 flex flex-col h-full relative">
        
        {/* Top Header */}
        <header className="h-16 border-b border-gray-200 dark:border-[#333] flex items-center justify-between px-6 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1e1e1e] transition">
                <PanelLeftOpen size={18} />
              </button>
            )}
            <h1 className="font-bold italic-serif text-lg tracking-wide">Chat with Studie</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#3B3026] text-white dark:bg-white dark:text-[#3B3026] flex items-center justify-center font-bold text-sm overflow-hidden border border-gray-200 dark:border-[#333]">
              {userPic ? <img src={userPic} alt="User" className="w-full h-full object-cover" /> : 'OI'}
            </div>
          </div>
        </header>

        {/* Dynamic Welcome Greeting Header */}
        <DynamicWelcomeHeader />

        {/* Chat Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full">
          {activeChat?.messages?.map((msg: any, index: number) => (
            <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-9 h-9 rounded-full bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] flex items-center justify-center shrink-0 font-bold">
                  <Sparkles size={18} />
                </div>
              )}
              <div className={`p-5 rounded-3xl max-w-2xl text-sm md:text-base leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-[#3B3026] text-white dark:bg-white dark:text-[#3B3026] rounded-tr-none' : 'bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] rounded-tl-none'}`}>
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-[#333] flex items-center justify-center shrink-0 font-bold text-sm overflow-hidden border border-gray-200 dark:border-[#333]">
                  {userPic ? <img src={userPic} alt="User" className="w-full h-full object-cover" /> : 'OI'}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-4 items-center">
              <div className="w-9 h-9 rounded-full bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] flex items-center justify-center shrink-0 font-bold animate-pulse">
                <Sparkles size={18} />
              </div>
              <div className="p-4 rounded-2xl bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] text-sm opacity-60">
                Studie is analyzing files & thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-4 md:p-6 bg-gradient-to-t from-white dark:from-[#121212] via-white/80 dark:via-[#121212]/80 to-transparent">
          
          <div className="max-w-3xl mx-auto space-y-2">
            
            {/* Attachment File Previews */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-[#333]">
                {attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#444] text-xs font-medium max-w-[200px]">
                    {getFileIcon(file.type)}
                    <span className="truncate">{file.name}</span>
                    <button 
                      type="button" 
                      onClick={() => removeAttachment(idx)} 
                      className="hover:text-red-500 transition ml-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSend} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] shadow-lg">
              
              {/* File Upload Trigger Button */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                multiple 
                accept="application/pdf,image/*,video/*" 
                className="hidden" 
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={attachments.length >= 10 || loading}
                title="Attach PDF, video, or image (Max 10 files)"
                className="p-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-[#2c2c2c] transition opacity-70 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Paperclip size={18} />
              </button>

              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={attachments.length > 0 ? "Ask Studie about these files..." : "Ask Studie anything or attach up to 10 files (PDFs, images, videos)..."}
                className="w-full bg-transparent outline-none px-2 text-sm md:text-base"
              />

              <button 
                type="submit" 
                disabled={(!input.trim() && attachments.length === 0) || loading}
                className={`p-3 rounded-xl transition ${(input.trim() || attachments.length > 0) && !loading ? 'bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026]' : 'bg-gray-200 dark:bg-[#333] opacity-40 cursor-not-allowed'}`}
              >
                <Send size={18} />
              </button>
            </form>

            <div className="flex items-center justify-between px-2 text-[11px] opacity-40">
              <span>Supports PDFs, Videos & Images (Max 10 files)</span>
              <span>Studie AI Assistant • Interactive Demo</span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}