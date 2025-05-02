import React from 'react';

const variants = {
  primary: 'bg-green-600 hover:bg-green-700 text-white',
  secondary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  error: 'bg-red-600 hover:bg-red-700 text-white',
  accent: 'bg-lime-500 hover:bg-lime-600 text-white',
  glass: 'bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30',
  outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
  neumorphic: 'bg-gray-100 shadow-neumorphic hover:shadow-neumorphic-inset text-gray-800',
};

const sizes = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-5 text-base',
  lg: 'py-3 px-6 text-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        rounded-xl transition-all duration-300 font-medium
        transform hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;