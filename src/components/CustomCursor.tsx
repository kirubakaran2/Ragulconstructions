import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const pulse = keyframes`
  from { transform: translate(-50%, -50%) scale(1); }
  to { transform: translate(-50%, -50%) scale(0.8); }
`;

const clickEffect = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(2.5); }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
`;

// Styled components
const CursorDiv = styled.div`
  position: fixed;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: transparent;
  pointer-events: none;
  z-index: 111;
  border: 1px solid yellow;
  transform: translate(-50%, -50%);
  will-change: transform;
  animation: ${pulse} 0.5s infinite alternate;
  
  &.expand {
    border: 1px solid yellow;
    animation: ${clickEffect} 0.5s forwards;
  }
`;

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const cursorRef = useRef(null);
  const frameRef = useRef();
  const prevPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Use requestAnimationFrame for smoother animation
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      frameRef.current = requestAnimationFrame(() => {
        // Only update if position changed significantly to reduce re-renders
        if (Math.abs(e.clientX - prevPosRef.current.x) > 2 || 
            Math.abs(e.clientY - prevPosRef.current.y) > 2) {
          setPosition({ x: e.clientX, y: e.clientY });
          prevPosRef.current = { x: e.clientX, y: e.clientY };
          
          // Direct DOM manipulation for the cursor position
          if (cursorRef.current) {
            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY}px`;
          }
        }
      });
    };

    const handleMouseDown = () => {
      setClicked(true);
      const timer = setTimeout(() => setClicked(false), 500);
      return () => clearTimeout(timer);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // Hide on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <CursorDiv 
        ref={cursorRef}
        className={clicked ? 'expand' : ''}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: position.x === 0 ? 0 : 1 // Hide initially until first mouse move
        }}
      />
    </>
  );
};

export default Cursor;