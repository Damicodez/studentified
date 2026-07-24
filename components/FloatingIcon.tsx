'use client';
import { motion } from 'framer-motion';

export default function FloatingIcon() {
  return (
    <motion.div
      className="absolute top-[20%] right-[10%] text-6xl opacity-[0.1] pointer-events-none"
      animate={{
        y: [0, -30, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* You can replace this with an SVG or icon later */}
      🎓
    </motion.div>
  );
}