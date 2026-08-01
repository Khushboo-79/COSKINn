import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'solid', 
  children, 
  ...props 
}) => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300';
  
  const variants = {
    solid: isGlam 
      ? 'bg-secondary text-primary hover:bg-white shadow-md' 
      : 'bg-primary text-white hover:bg-accent shadow-md shadow-primary/20',
    outline: isGlam 
      ? 'border border-secondary text-secondary hover:bg-secondary/10' 
      : 'border border-primary text-primary hover:bg-primary/10',
    ghost: isGlam 
      ? 'text-secondary hover:bg-secondary/10' 
      : 'text-primary hover:bg-primary/10',
  };

  return (
    <button 
      className={twMerge(clsx(baseStyles, variants[variant], className))} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
