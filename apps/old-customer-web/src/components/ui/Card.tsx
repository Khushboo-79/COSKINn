import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  const baseStyles = 'group flex flex-col relative rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl';
  
  const themeStyles = isGlam
    ? 'border-primary/20 bg-background/50'
    : 'border-text/5 bg-surface';

  return (
    <div className={twMerge(clsx(baseStyles, themeStyles, className))} {...props}>
      {children}
    </div>
  );
};

export default Card;
