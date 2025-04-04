import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Detect hover state on interactive elements
    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Add hover detection for buttons and links
    document.querySelectorAll('button, a, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      document.querySelectorAll('button, a, [data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  const cursorVariants = {
    default: {
      width: 24,
      height: 24,
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      scale: 1
    },
    hover: {
      width: 48,
      height: 48,
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      backgroundColor: 'rgba(255, 215, 0, 0.2)',
      border: '2px solid rgba(255, 215, 0, 0.8)',
      scale: 1.2
    },
    click: {
      width: 20,
      height: 20,
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      backgroundColor: 'rgba(255, 215, 0, 0.4)',
      border: '2px solid rgba(255, 215, 0, 1)',
      scale: 0.9
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      backgroundColor: 'rgba(255, 215, 0, 1)',
      scale: 1
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      scale: 1.5
    },
    click: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      backgroundColor: 'rgba(255, 0, 0, 1)',
      scale: 0.5
    }
  };

  return (
    <>
      <motion.div
        className="fixed rounded-full pointer-events-none z-50 hidden md:block mix-blend-difference"
        animate={
          isClicking ? 'click' : 
          isHovering ? 'hover' : 'default'
        }
        variants={cursorVariants}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-50 hidden md:block"
        animate={
          isClicking ? 'click' : 
          isHovering ? 'hover' : 'default'
        }
        variants={dotVariants}
        transition={{ type: "spring", stiffness: 1000, damping: 30 }}
      />
    </>
  );
};

export default CustomCursor;