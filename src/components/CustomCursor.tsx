import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Detect hover state on interactive elements
    const handleMouseOver = (e) => {
      // Check if the element or its parent has specific classes to ignore
      if (e.target.closest('.cursor-ignore')) {
        return;
      }
      setIsHovering(true);
    };
    
    const handleMouseOut = () => setIsHovering(false);
    
    // Hide cursor when it leaves the window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    
    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  const cursorVariants = {
    default: {
      width: 32,
      height: 32,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '2px solid rgba(255, 255, 255, 0.9)',
      scale: 1,
      opacity: isVisible ? 1 : 0
    },
    hover: {
      width: 56,
      height: 56,
      x: mousePosition.x - 28,
      y: mousePosition.y - 28,
      backgroundColor: 'rgba(255, 215, 0, 0.3)',
      border: '3px solid rgba(255, 215, 0, 0.9)',
      scale: 1.2,
      opacity: isVisible ? 1 : 0
    },
    click: {
      width: 24,
      height: 24,
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      backgroundColor: 'rgba(255, 215, 0, 0.5)',
      border: '3px solid rgba(255, 215, 0, 1)',
      scale: 0.9,
      opacity: isVisible ? 1 : 0
    }
  };

  const dotVariants = {
    default: {
      width: 6,
      height: 6,
      x: mousePosition.x - 3,
      y: mousePosition.y - 3,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      scale: 1,
      opacity: isVisible ? 1 : 0
    },
    hover: {
      width: 10,
      height: 10,
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
      backgroundColor: 'rgba(255, 215, 0, 1)',
      scale: 1.5,
      opacity: isVisible ? 1 : 0
    },
    click: {
      width: 8,
      height: 8,
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      backgroundColor: 'rgba(255, 75, 75, 1)',
      scale: 0.8,
      opacity: isVisible ? 1 : 0
    }
  };

  // Return null if on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        /* Hide default cursor on body when custom cursor is active */
        body:not(.cursor-default) {
          cursor: none !important;
        }
        
        /* Show default cursor on specific elements */
        .cursor-default, input, textarea, select, [data-custom-cursor="false"] {
          cursor: default !important;
        }
      `}</style>
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9999] hidden sm:block mix-blend-difference"
        animate={
          isClicking ? 'click' : 
          isHovering ? 'hover' : 'default'
        }
        variants={cursorVariants}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed rounded-full pointer-events-none z-[9999] hidden sm:block"
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