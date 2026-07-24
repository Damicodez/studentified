'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="fixed top-0 right-0 h-full w-12 z-[100] flex flex-col items-center py-4 pointer-events-none">
      <motion.div 
        style={{ scaleY }} 
        className="w-1 bg-[#3B3026] dark:bg-white origin-top"
      />
      <div className="mt-auto mb-4">
        {/* Your Brain Logo */}
        <img src="/your-brain-logo.png" className="w-8 h-8" alt="logo" />
      </div>
    </div>
  );
}