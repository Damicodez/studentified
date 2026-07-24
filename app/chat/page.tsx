'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentifiedChat() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: "Hey there! I’m so glad you reached out. What’s on your mind?" }
  ]);

  return (
    <main className="h-screen bg-[#FDFBF7] flex flex-col items-center">
      {/* Header with Logo space */}
      <header className="w-full max-w-2xl p-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center font-bold text-white">S</div>
        <h1 className="text-xl font-medium tracking-tight">Studentified</h1>
      </header>

      {/* Chat Area */}
      <div className="flex-1 w-full max-w-2xl overflow-y-auto p-6">
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`p-4 rounded-2xl max-w-[80%] ${
                m.role === 'assistant' ? 'bg-white shadow-sm border border-[#EADDD3]' : 'bg-[#8B4513] text-white'
              }`}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}