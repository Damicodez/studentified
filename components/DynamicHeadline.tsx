'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DynamicHeadline() {
  const [index, setIndex] = useState(0);
  const phrases = [
    "Professional Future.", // Longest phrase
    "Career Growth.",
    "Academic Success.",
    "Skill Mastery."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="h-20 md:h-24 text-3xl md:text-6xl font-medium italic-serif italic mb-6 text-[#3B3026] dark:text-[#EAEAEA]">
      The Open Path to Your{" "}
      <span className="inline-block min-w-[380px] md:min-w-[450px] text-left">
        <AnimatePresence mode="wait">
          <motion.span
            key={phrases[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}