import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'glass',
  padding = 'p-6',
  animate = false
}) => {
  const variants = {
    glass: 'bg-white/20 backdrop-blur-glass border border-white/30 shadow-glass',
    neumorphic: 'bg-gray-100 shadow-neumorphic',
    solid: 'bg-white shadow-lg',
  };

  return (
    <div 
      className={`
        ${variants[variant]} 
        ${padding} 
        rounded-xl 
        ${animate ? 'transform transition duration-500 hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;