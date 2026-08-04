import React from 'react';

interface ScrollSectionProps {
  children: React.ReactNode;
  index?: number;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({ children, index = 0 }) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};
