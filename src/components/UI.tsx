import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("bg-surface rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-border-subtle p-5", className)} {...props}>
    {children}
  </div>
);

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'danger' }) => {
  const variants = {
    primary: "bg-navy text-white hover:bg-navy/90 shadow-sm",
    secondary: "bg-gold text-navy hover:bg-gold/90 shadow-sm",
    outline: "bg-white border border-navy text-navy hover:bg-navy hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button 
      className={cn(
        "px-5 py-3.5 rounded-lg font-bold text-sm transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string, error?: string }) => (
  <div className="space-y-1.5 flex-1">
    {label && <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>}
    <input 
      className={cn(
        "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all font-medium text-navy",
        error && "border-red-500 focus:ring-red-500/10"
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
  </div>
);
