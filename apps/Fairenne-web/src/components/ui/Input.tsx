import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const { mode } = useTheme();
    const isGlam = mode === 'glam';

    const baseStyles = 'w-full px-4 py-3 outline-none transition-colors duration-300';
    
    const themeStyles = isGlam
      ? 'bg-secondary/10 text-secondary placeholder-secondary/50 border border-secondary/30 focus:border-secondary'
      : 'bg-white border-2 border-text/10 text-text focus:border-primary placeholder-text-muted/50 rounded-md';

    return (
      <input
        ref={ref}
        className={twMerge(clsx(baseStyles, themeStyles, className))}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
