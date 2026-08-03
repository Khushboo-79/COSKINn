import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  index?: number;
}

/**
 * Wraps each home section with scroll-linked 3D effects:
 *  • Entry  – normal document flow until top hits viewport
 *  • Exit   – scales down, blurs, and fades as the next section scrolls up over it
 */
export const ScrollSection: React.FC<ScrollSectionProps> = ({ children, index = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Scale down slightly as it scrolls up (gets covered)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  
  // Smoothly become a rounded card
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['0px', '40px']);
  
  // Blur as it scrolls up
  const blur = useTransform(scrollYProgress, [0, 1], [0, 4]);
  
  // Opacity fade
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div
      ref={ref}
      className="sticky top-0 w-full overflow-hidden"
    >
      <motion.div
        className="w-full h-full origin-top flex flex-col justify-center overflow-hidden"
        style={{
          scale,
          opacity,
          borderRadius,
          filter: useTransform(blur, (b) => `blur(${b}px)`),
          willChange: 'transform, opacity, filter, border-radius',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
