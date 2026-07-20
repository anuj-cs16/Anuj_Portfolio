import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const followMouse = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(followMouse);
    };

    followMouse();
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  // Hide on touch screen devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Inner Neon Dot */}
      <div
        className={`fixed top-0 left-0 w-3 h-3 bg-[#00d4ff] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00d4ff] transition-transform duration-75 ease-out ${
          isClicked ? 'scale-75 bg-[#a855f7]' : isHovered ? 'scale-150 bg-[#a855f7]' : ''
        }`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
      {/* Outer Glowing Cyber Ring */}
      <div
        className={`fixed top-0 left-0 w-8 h-8 border border-[#00d4ff]/60 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300 ease-out ${
          isHovered
            ? 'w-12 h-12 border-[#a855f7] bg-[#a855f7]/10 shadow-[0_0_25px_rgba(168,85,247,0.5)]'
            : isClicked
            ? 'scale-90 border-[#ec4899]'
            : ''
        }`}
        style={{ transform: `translate3d(${trailing.x}px, ${trailing.y}px, 0)` }}
      />
    </div>
  );
};

export default CustomCursor;
