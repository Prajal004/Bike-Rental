import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
}) => {
  const baseStyles = 'rounded-lg font-semibold transition-all duration-200 flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[#4CAF50] text-white hover:bg-[#388E3C] shadow-md',
    secondary: 'bg-[#78909C] text-white hover:bg-[#546E7A]',
    danger: 'bg-[#E53935] text-white hover:bg-[#C62828]',
    outline: 'border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F5E9]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3.5 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};
