import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ className, children, ...props }) => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  const baseStyles = 'px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-colors duration-300';
  
  const themeStyles = isGlam
    ? 'bg-primary text-secondary'
    : 'bg-primary/20 text-primary';

  return (
    <div className={twMerge(clsx(baseStyles, themeStyles, className))} {...props}>
      {children}
    </div>
  );
};

export default Badge;
