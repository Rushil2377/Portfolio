
'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          borderWidth: isPointer ? '1px' : '2px',
          opacity: 0.5
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(77,224,255,0.8)]"
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: isPointer ? 0.5 : 1
        }}
      />
    </div>
  );
}
