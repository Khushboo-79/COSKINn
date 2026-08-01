import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  index?: number;
}

/**
 * Wraps each home section with scroll-linked 3D effects:
 *  • Entry  – section rises from below with a 3D perspective tilt
 *  • Exit   – blurs + fades as it scrolls out to the top
 */
export const ScrollSection: React.FC<ScrollSectionProps> = ({ children, index = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Entry: 0 → 0.25 of scroll progress
  const entryY = useTransform(scrollYProgress, [0, 0.25], [40, 0]);
  const entryRotateX = useTransform(scrollYProgress, [0, 0.25], [8, 0]);
  const entryScale = useTransform(scrollYProgress, [0, 0.25], [0.96, 1]);
  const entryOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Exit: 0.7 → 1.0 of scroll progress
  const exitY = useTransform(scrollYProgress, [0.7, 1], [0, -30]);
  const exitScale = useTransform(scrollYProgress, [0.7, 1], [1, 0.98]);
  const exitOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.3]);
  const exitBlur = useTransform(scrollYProgress, [0.7, 1], [0, 8]);

  // Spring physics for smooth feel
  const springY = useSpring(entryY, { stiffness: 60, damping: 20 });
  const springRotateX = useSpring(entryRotateX, { stiffness: 60, damping: 20 });
  const springScale = useSpring(entryScale, { stiffness: 60, damping: 20 });

  return (
    <div
      ref={ref}
      style={{ perspective: '1400px', perspectiveOrigin: '50% 30%' }}
    >
      <motion.div
        style={{
          y: springY,
          rotateX: springRotateX,
          scale: springScale,
          opacity: entryOpacity,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity, filter',
        }}
      >
        {/* Exit layer – separate motion.div to avoid spring fighting exit */}
        <motion.div
          style={{
            y: exitY,
            scale: exitScale,
            opacity: exitOpacity,
            filter: useTransform(exitBlur, (b) => `blur(${b}px)`),
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};
