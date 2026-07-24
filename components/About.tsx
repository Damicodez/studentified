'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-20 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold italic-serif italic mb-8 sm:mb-12 text-center text-[#3B3026] dark:text-[#EAEAEA]">
        About Studentified
      </h2>
      
      {/* Grid with dynamic heights on mobile and fixed bento heights on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:auto-rows-[240px]">
        
        {/* Large Card */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] flex flex-col justify-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Mission</h3>
          <p className="text-xs sm:text-sm md:text-base opacity-70 leading-relaxed">
            We exist to bridge the gap between academic theory and professional reality. Studentified is built to help you navigate your career path with AI-powered clarity, turning potential into actual professional growth.
          </p>
        </motion.div>

        {/* Small Card */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="p-6 sm:p-8 rounded-3xl bg-[#3B3026] dark:bg-white text-white dark:text-[#3B3026] flex flex-col justify-center"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">AI-Driven</h3>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            Precision insights tailored to your specific academic journey and career goals.
          </p>
        </motion.div>

        {/* Small Card */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] flex flex-col justify-center"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Expert Mentors</h3>
          <p className="text-xs sm:text-sm opacity-70 leading-relaxed">
            Connect with industry leaders who have walked the path you are currently on.
          </p>
        </motion.div>

        {/* Large Card */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] flex flex-col justify-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Curated Growth</h3>
          <p className="text-xs sm:text-sm md:text-base opacity-70 leading-relaxed">
            Every resource, roadmap, and opportunity is verified to ensure you spend your time learning what actually moves the needle in your career.
          </p>
        </motion.div>

      </div>
    </section>
  );
}