import React, { useRef, useState, useCallback, useEffect } from 'react';

/**
 * SpatialCard
 * VisionOS-inspired 3D spatial interactive card with dynamic perspective tilt,
 * cursor-following specular sheen, and z-axis depth layering.
 */
export default function SpatialCard({
  children,
  className = '',
  maxTilt = 10,
  glare = true,
  depth = 20,
  onClick,
  style = {},
  as: Component = 'div',
  ...rest
}) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener?.('change', handler);
    return () => mediaQuery.removeEventListener?.('change', handler);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isReducedMotion || !cardRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (-(y - 0.5) * maxTilt).toFixed(2);
      const tiltY = ((x - 0.5) * maxTilt).toFixed(2);

      el.style.setProperty('--spatial-rotate-x', `${tiltX}deg`);
      el.style.setProperty('--spatial-rotate-y', `${tiltY}deg`);
      el.style.setProperty('--spatial-mouse-x', `${(x * 100).toFixed(1)}%`);
      el.style.setProperty('--spatial-mouse-y', `${(y * 100).toFixed(1)}%`);
      el.style.setProperty('--spatial-depth-z', `${depth}px`);
    });
  }, [maxTilt, depth, isReducedMotion]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--spatial-rotate-x', '0deg');
      el.style.setProperty('--spatial-rotate-y', '0deg');
      el.style.setProperty('--spatial-depth-z', '0px');
    }
  };

  return (
    <Component
      ref={cardRef}
      className={`spatial-card ${isHovered ? 'spatial-card--hovered' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={style}
      {...rest}
    >
      <div className="spatial-card__inner">
        {children}
        {glare && (
          <div 
            className="spatial-card__glare" 
            aria-hidden="true" 
          />
        )}
      </div>
    </Component>
  );
}
