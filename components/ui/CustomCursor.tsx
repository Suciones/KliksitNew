import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from './CursorContext';

export const CustomCursor: React.FC = () => {
  const { cursorType } = useCursor();
  
  // Use MotionValues to track mouse position directly without triggering React re-renders
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Add spring physics for smooth movement
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
  const moveCursor = (e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };
  
  window.addEventListener('mousemove', moveCursor);

  // LOGIC: Hide system cursor ONLY when over a project
  if (cursorType === 'project') {
    document.body.style.cursor = 'none';
  } else {
    document.body.style.cursor = 'auto';
  }

  return () => {
    window.removeEventListener('mousemove', moveCursor);
    document.body.style.cursor = 'auto'; // Reset on cleanup
  };
}, [cursorType]); // Add cursorType to the dependency array

  const variants = {
  default: {
    opacity: 0, // Hide the custom cursor completely
    scale: 0,   // Shrink it so it doesn't accidentally catch clicks
    transition: { duration: 0.2 }
  },
  project: {
    opacity: 1,
    scale: 1,
    height: 80,
    width: 120,
    backgroundColor: "rgba(255, 255, 255, 1)",
    mixBlendMode: "difference" as const,
  }

};

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] rounded-full pointer-events-none flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%"
      }}
      variants={variants}
      animate={cursorType}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 15, 
        mass: 0.1 
      }}
    >
      {cursorType === 'project' && (
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-black text-sm font-bold uppercase tracking-widest"
        >
          View
        </motion.span>
      )}
    </motion.div>
  );
};