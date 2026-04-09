import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Speed of counter
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 100) {
      // Small delay before lifting curtain
      const timeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }} // Smooth curtain lift
    >
      <div className="relative w-full h-full flex flex-col justify-between p-10">
        <div className="flex justify-between text-xs uppercase tracking-widest text-zinc-500">
          <span>Kliksit</span>
          <span>Agency ©2024</span>
        </div>
        
        <div className="flex items-end justify-between">
          <motion.h1 
            className="text-9xl font-bold tracking-tighter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {count}%
          </motion.h1>
           <div className="text-xs uppercase tracking-widest text-zinc-500 text-right">
            Loading Experience
          </div>
        </div>
      </div>
    </motion.div>
  );
};