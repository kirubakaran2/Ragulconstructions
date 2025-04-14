import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const innerCursorRef = useRef(null);
  const outerCursorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is touch-enabled or has a small screen
    const checkIfMobile = () => {
      return window.matchMedia('(pointer: coarse)').matches || 
             window.innerWidth < 768;
    };

    setIsMobile(checkIfMobile());

    const handleResize = () => {
      setIsMobile(checkIfMobile());
    };

    window.addEventListener('resize', handleResize);

    if (isMobile) return; // Don't set up cursor effects for mobile

    const inner = innerCursorRef.current;
    const outer = outerCursorRef.current;

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      if (inner && outer) {
        inner.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        outer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const addHover = () => {
      if (inner && outer) {
        inner.style.width = '70px';
        inner.style.height = '70px';
        inner.style.marginLeft = '-35px';
        inner.style.marginTop = '-35px';
        inner.style.opacity = '0.3';

        outer.style.opacity = '0';
      }
    };

    const removeHover = () => {
      if (inner && outer) {
        inner.style.width = '6px';
        inner.style.height = '6px';
        inner.style.marginLeft = '0';
        inner.style.marginTop = '0';
        inner.style.opacity = '1';

        outer.style.opacity = '0.5';
      }
    };

    const hoverables = document.querySelectorAll('a, button, input, textarea, select, label, .hover-target');

    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    document.addEventListener('mousemove', moveCursor);

    // Show cursor when component mounts
    if (inner && outer) {
      inner.style.visibility = 'visible';
      outer.style.visibility = 'visible';
    }

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const commonStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    borderRadius: '50%',
    transform: 'translateZ(0)',
    visibility: 'hidden',
    zIndex: 10000000,
  };

  // Don't render anything on mobile
  if (isMobile) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <div
        ref={outerCursorRef}
        style={{
          ...commonStyle,
          width: '30px',
          height: '30px',
          marginLeft: '-12px',
          marginTop: '-12px',
          border: '1px solid gold',
          boxSizing: 'border-box',
          opacity: 0.5,
          transition: 'all 0.08s ease-out',
          zIndex: 10000000,
        }}
      />
      <div
        ref={innerCursorRef}
        style={{
          ...commonStyle,
          width: '6px',
          height: '6px',
          backgroundColor: 'gold',
          zIndex: 10000001,
          transition:
            'width 0.3s ease-in-out, height 0.3s ease-in-out, margin 0.3s ease-in-out, opacity 0.3s ease-in-out',
        }}
      />
    </>
  );
};

export default CustomCursor;